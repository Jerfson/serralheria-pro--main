/**
 * Módulo de Integração com WhatsApp (Geração de Mensagem e Link Direto wa.me)
 */

import { gerarDadosPixEntrada } from './pix.js';

/**
 * Sanitiza o número de telefone para o padrão internacional do WhatsApp (55 + DDD + Número).
 * @param {string} telefoneBruto
 * @returns {string} Telefone normalizado com 12 ou 13 dígitos
 */
export function normalizarTelefoneWhatsapp(telefoneBruto) {
  if (!telefoneBruto) return '';
  let limpo = telefoneBruto.replace(/\D/g, '');

  // Se o usuário digitou sem o código do Brasil (ex: 11987654321 com 10 ou 11 dígitos)
  if (limpo.length === 10 || limpo.length === 11) {
    limpo = '55' + limpo;
  }

  return limpo;
}

/**
 * Sintetiza o texto comercial formatado para WhatsApp com negritos (*texto*) e emojis.
 * @param {Object} orcamento
 * @param {Object} configOficina
 * @returns {string} Mensagem pronta para envio
 */
export function formatarMensagemWhatsapp(orcamento, configOficina) {
  const clienteNome = orcamento.cliente?.nome || 'Cliente';
  const oficinaNome = configOficina.nomeFantasia || 'Nossa Serralheria';
  const numOrc = orcamento.numeroSequencial || '101';

  const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(orcamento.financeiro?.precoVendaFinal || 0);

  const linhas = [
    `Olá, *${clienteNome}*! Tudo bem? 👋`,
    ``,
    `Aqui é da *${oficinaNome}*. Conforme combinamos, segue a proposta orçamentária para o seu projeto:`,
    ``,
    `📋 *ORÇAMENTO #${numOrc}*`
  ];

  const itens = Array.isArray(orcamento.itens) && orcamento.itens.length > 0 
    ? orcamento.itens 
    : [orcamento.estrutura || {}];

  if (itens.length > 1) {
    linhas.push(`🛠️ *ITENS INCLUSOS NA OBRA (${itens.length} itens):*`);
    itens.forEach((it, idx) => {
      const qtd = Number(it.quantidade) || 1;
      const tipoNome = (it.tipo || 'Estrutura')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      const largM = (Number(it.dimensoes?.larguraMm || it.larguraMm) || 0) / 1000;
      const altM = (Number(it.dimensoes?.alturaMm || it.alturaMm) || 0) / 1000;
      linhas.push(`  *${idx + 1}.* ${qtd}x ${tipoNome} (${largM.toFixed(2)}m x ${altM.toFixed(2)}m)`);
    });
  } else {
    const it = itens[0] || {};
    const qtd = Number(it.quantidade) || 1;
    const tipoFormatado = (it.tipo || 'Estrutura Metálica')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    const largM = (Number(it.dimensoes?.larguraMm || it.larguraMm) || 0) / 1000;
    const altM = (Number(it.dimensoes?.alturaMm || it.alturaMm) || 0) / 1000;
    const itemTexto = qtd > 1 ? `${qtd}x ${tipoFormatado}` : tipoFormatado;
    linhas.push(`🛠️ *Item:* ${itemTexto}`);
    linhas.push(`📐 *Dimensões ${qtd > 1 ? '(por peça)' : ''}:* ${largM.toFixed(2)}m de largura x ${altM.toFixed(2)}m de altura`);
  }

  const textoPintura = orcamento.memorialPintura || configOficina.memorialPintura || 'Aplicação de fundo protetor anticorrosivo (Zarcão)';
  const textoMaoObra = orcamento.memorialMaoDeObra || configOficina.memorialMaoDeObra || 'Fabricação especializada em oficina (instalação/chumbamento por conta do pedreiro)';

  linhas.push(`🔩 *Pintura / Acabamento:* ${textoPintura}`);
  linhas.push(`⚡ *Mão de Obra:* ${textoMaoObra}`);
  const cond = orcamento.condicoes || {};
  const formaPag = cond.formaPagamento !== undefined 
    ? cond.formaPagamento 
    : (configOficina.condicoesFormaPagamento || '50% de sinal + saldo na entrega/instalação');
  const prazoEnt = cond.prazoEntrega !== undefined 
    ? cond.prazoEntrega 
    : (configOficina.condicoesPrazoEntrega || '15 a 20 dias úteis');
  const validade = cond.validade !== undefined 
    ? cond.validade 
    : `${configOficina.validadeOrcamentoDias || 15} dias`;
  const garantia = cond.garantia !== undefined 
    ? cond.garantia 
    : (configOficina.condicoesGarantia || '12 meses');

  linhas.push(`💰 *Valor Total do Pedido:* *${valorFormatado}*`);
  if (formaPag) linhas.push(`💳 *Condições:* ${formaPag}`);
  if (prazoEnt) linhas.push(`⏳ *Prazo de Fabricação:* ${prazoEnt}`);
  if (garantia) linhas.push(`🛡️ *Garantia:* ${garantia}`);
  if (validade) linhas.push(`📅 *Validade da Proposta:* ${validade}`);

  // Se houver chave Pix configurada, adiciona chave e Pix Copia e Cola da Entrada
  if (configOficina.chavePix) {
    const dadosPix = gerarDadosPixEntrada({
      chavePix: configOficina.chavePix,
      nomeRecebedor: configOficina.nomeFantasia,
      cidade: configOficina.cidadeEstado,
      valorTotal: orcamento.financeiro?.precoVendaFinal || 0,
      entradaOuPercentual: formaPag,
      txid: String(orcamento.numeroSequencial || '101')
    });
    if (dadosPix) {
      const valEntradaFmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dadosPix.valorEntrada);
      linhas.push(``);
      linhas.push(`🔑 *PAGAMENTO DO SINAL / ENTRADA (${dadosPix.percentualEntrada}%):*`);
      linhas.push(`• *Valor da Entrada:* ${valEntradaFmt}`);
      linhas.push(`• *Chave Pix:* ${dadosPix.chavePix}`);
      linhas.push(`• *Código Pix Copia e Cola:*`);
      linhas.push(`${dadosPix.payloadPix}`);
    }
  }

  linhas.push(``);
  linhas.push(`Podemos agendar a fabricação do seu pedido? Qualquer dúvida estou à disposição aqui no WhatsApp! 🤝`);

  return linhas.join('\n');
}

/**
 * Gera a URL completa do wa.me e abre no navegador do cliente.
 * @param {Object} orcamento
 * @param {Object} configOficina
 * @returns {{ url: string, telefone: string, texto: string }}
 */
export function dispararWhatsapp(orcamento, configOficina) {
  const telefone = normalizarTelefoneWhatsapp(orcamento.cliente?.telefone);
  const texto = formatarMensagemWhatsapp(orcamento, configOficina);
  const textoEncoded = encodeURIComponent(texto);

  const url = telefone
    ? `https://wa.me/${telefone}?text=${textoEncoded}`
    : `https://wa.me/?text=${textoEncoded}`;

  if (typeof window !== 'undefined') {
    window.open(url, '_blank');
  }

  return { url, telefone, texto };
}
