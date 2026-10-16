/**
 * Módulo de Pagamento Pix e Geração de QR Code (Padrão Banco Central / EMVCo)
 * Permite que o cliente pague o sinal / entrada escaneando o QR Code na proposta.
 */

import qrcode from './qrcode.min.js';

/**
 * Calcula o CRC16-CCITT (polinômio 0x1021, valor inicial 0xFFFF)
 * Padrão exigido pelo Banco Central do Brasil para BR Code.
 * @param {string} str - String a ser calculada
 * @returns {string} Hexadecimal de 4 caracteres em maiúsculas
 */
export function calcularCRC16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Formata um campo no padrão TLV (Type-Length-Value / EMVCo)
 * @param {string} id - Código do campo (2 dígitos)
 * @param {string} valor - Conteúdo do campo
 * @returns {string} Campo formatado
 */
function formatarCampoEMV(id, valor) {
  const tam = String(valor.length).padStart(2, '0');
  return `${id}${tam}${valor}`;
}

/**
 * Remove acentuação e caracteres especiais para compatibilidade com o padrão Pix.
 */
function normalizarTexto(txt = '', maxLen = 25) {
  return txt
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .slice(0, maxLen);
}

/**
 * Gera a string Pix Copia e Cola (BR Code Estático)
 * @param {Object} params
 * @param {string} params.chavePix - Chave Pix (CPF, CNPJ, Telefone, E-mail ou Aleatória)
 * @param {string} [params.nomeRecebedor] - Nome da Serralheria / Recebedor (máx 25 chars)
 * @param {string} [params.cidade] - Cidade do recebedor (máx 15 chars)
 * @param {number} [params.valor] - Valor do Pix em reais (opcional)
 * @param {string} [params.txid] - Identificador da transação (máx 25 chars)
 * @returns {string} String do Pix Copia e Cola
 */
export function gerarPayloadPix({ chavePix, nomeRecebedor = 'Serralheria', cidade = 'SAO PAULO', valor = 0, txid = '***' }) {
  const chave = (chavePix || '').trim();
  if (!chave) return '';

  const nome = normalizarTexto(nomeRecebedor || 'Serralheria', 25) || 'Serralheria';
  const cid = normalizarTexto(cidade || 'SAO PAULO', 15) || 'SAO PAULO';
  const tx = (txid || '***').replace(/[^a-zA-Z0-9]/g, '').slice(0, 25) || '***';

  // 00: Payload Format Indicator = '01'
  let payload = formatarCampoEMV('00', '01');

  // 26: Merchant Account Information
  //   00: GUI = 'br.gov.bcb.pix'
  //   01: Chave Pix
  const gui = formatarCampoEMV('00', 'br.gov.bcb.pix');
  const key = formatarCampoEMV('01', chave);
  payload += formatarCampoEMV('26', gui + key);

  // 52: Merchant Category Code = '0000'
  payload += formatarCampoEMV('52', '0000');

  // 53: Transaction Currency = '986' (BRL)
  payload += formatarCampoEMV('53', '986');

  // 54: Transaction Amount (se houver valor > 0)
  if (valor && Number(valor) > 0) {
    const valorStr = Number(valor).toFixed(2);
    payload += formatarCampoEMV('54', valorStr);
  }

  // 58: Country Code = 'BR'
  payload += formatarCampoEMV('58', 'BR');

  // 59: Merchant Name
  payload += formatarCampoEMV('59', nome);

  // 60: Merchant City
  payload += formatarCampoEMV('60', cid);

  // 62: Additional Data Field (TXID)
  //   05: Reference Label
  const refLabel = formatarCampoEMV('05', tx);
  payload += formatarCampoEMV('62', refLabel);

  // 63: CRC16 (inicia com '6304' para cálculo)
  payload += '6304';
  const crc = calcularCRC16(payload);
  return payload + crc;
}

/**
 * Converte a matriz do QR Code em um PNG Data URL de alta fidelidade
 * @param {Object} qr - Instância do qrcode-generator
 * @param {number} [cellSize=4] - Tamanho de cada módulo em pixels
 * @param {number} [margin=2] - Margem de respiro
 * @returns {string} Data URL do PNG ou GIF
 */
export function qrcodeParaDataUrl(qr, cellSize = 4, margin = 2) {
  if (typeof document !== 'undefined') {
    const count = qr.getModuleCount();
    const size = count * cellSize + margin * 2 * cellSize;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Fundo branco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Módulos pretos
    ctx.fillStyle = '#000000';
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          ctx.fillRect(
            c * cellSize + margin * cellSize,
            r * cellSize + margin * cellSize,
            cellSize,
            cellSize
          );
        }
      }
    }
    return canvas.toDataURL('image/png');
  }

  return qr.createDataURL(cellSize, margin);
}

/**
 * Extrai a porcentagem de entrada a partir do texto de forma de pagamento
 * Ex: "50% de sinal no pedido" => 50
 * Ex: "Entrada de 30% + saldo na entrega" => 30
 * @param {string} textoFormaPagamento
 * @returns {number} Porcentagem (entre 1 e 100)
 */
export function extrairPercentualEntrada(textoFormaPagamento = '') {
  if (!textoFormaPagamento) return 50;
  const match = textoFormaPagamento.match(/(\d{1,2})\s*%/);
  if (match && match[1]) {
    const num = Number(match[1]);
    if (num > 0 && num <= 100) return num;
  }
  return 50;
}

/**
 * Gera o QR Code Pix completo (imagem e payload copia-e-cola)
 * @param {Object} params
 * @param {string} params.chavePix - Chave Pix
 * @param {string} [params.nomeRecebedor] - Nome da serralheria
 * @param {string} [params.cidade] - Cidade
 * @param {number} [params.valorTotal] - Valor total da proposta
 * @param {number|string} [params.entradaOuPercentual] - Valor exato da entrada ou string de forma de pagamento
 * @param {string} [params.txid] - ID do orçamento
 * @returns {Object|null} { payloadPix, dataUrl, valorEntrada, percentualEntrada, chavePix }
 */
export function gerarDadosPixEntrada({
  chavePix,
  nomeRecebedor = 'Serralheria Modelo',
  cidade = 'Sao Paulo',
  valorTotal = 0,
  entradaOuPercentual = null,
  txid = 'ORC'
}) {
  const chave = (chavePix || '').trim();
  if (!chave) return null;

  let valorEntrada = 0;
  let percentualEntrada = 50;

  if (typeof entradaOuPercentual === 'number' && entradaOuPercentual > 0) {
    valorEntrada = entradaOuPercentual;
    if (valorTotal > 0) {
      percentualEntrada = Math.round((valorEntrada / valorTotal) * 100);
    }
  } else {
    percentualEntrada = extrairPercentualEntrada(String(entradaOuPercentual || ''));
    valorEntrada = Number(((valorTotal * percentualEntrada) / 100).toFixed(2));
  }

  const payloadPix = gerarPayloadPix({
    chavePix: chave,
    nomeRecebedor,
    cidade,
    valor: valorEntrada,
    txid
  });

  // Gera o QR Code com correção de erro M (Medium, 15%)
  const qr = qrcode(0, 'M');
  qr.addData(payloadPix, 'Byte');
  qr.make();

  const dataUrl = qrcodeParaDataUrl(qr, 5, 2);

  return {
    chavePix: chave,
    valorTotal,
    valorEntrada,
    percentualEntrada,
    payloadPix,
    dataUrl
  };
}
