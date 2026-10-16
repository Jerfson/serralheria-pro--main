import { gerarDadosPixEntrada } from './pix.js';

export function gerarPropostaPDF(orcamento, configOficina) {
  const jsPDF = typeof window !== 'undefined' && window.jspdf && window.jspdf.jsPDF
    ? window.jspdf.jsPDF
    : null;

  if (!jsPDF) {
    // Fallback: se a biblioteca CDN falhar, emite impressão via janela HTML limpa
    imprimirViaHtml(orcamento, configOficina);
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let y = 18;

  // ─── Cabeçalho da Serralheria ──────────────────────────────
  doc.setFillColor(30, 41, 59); // Slate-800
  doc.rect(margin, y, contentWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text((configOficina.nomeFantasia || 'SERRALHERIA').toUpperCase(), margin + 6, y + 9);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const contatoLinha = `WhatsApp: ${configOficina.telefoneContato || ''}  |  Localidade: ${configOficina.cidadeEstado || ''}`;
  doc.text(contatoLinha, margin + 6, y + 16);

  if (configOficina.chavePix) {
    doc.text(`Chave Pix para Sinal: ${configOficina.chavePix}`, margin + 6, y + 21);
  }

  y += 30;

  // ─── Dados da Proposta e Cliente ────────────────────────────
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`PROPOSTA COMERCIAL #${orcamento.numeroSequencial || '101'}`, margin, y);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  const dataFormatada = new Date(orcamento.dataCriacaoIso || Date.now()).toLocaleDateString('pt-BR');
  doc.text(`Data: ${dataFormatada}  |  Validade: 15 dias`, margin + contentWidth - 45, y);

  y += 4;
  doc.setDrawColor(203, 213, 225); // Slate-300
  doc.line(margin, y, margin + contentWidth, y);
  y += 6;

  // Bloco Cliente
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('CLIENTE:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${orcamento.cliente?.nome || 'Cliente'}  (${orcamento.cliente?.telefone || 'Telefone não informado'})`, margin + 20, y);

  if (orcamento.cliente?.enderecoObra) {
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('LOCAL:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(orcamento.cliente.enderecoObra, margin + 20, y);
  }

  y += 10;

  // ─── Memorial Descritivo dos Itens ──────────────────────────
  doc.setFillColor(241, 245, 249); // Slate-100
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text('MEMORIAL DESCRITIVO / ESPECIFICAÇÃO TÉCNICA', margin + 4, y + 5);

  y += 11;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  const itens = Array.isArray(orcamento.itens) && orcamento.itens.length > 0
    ? orcamento.itens
    : [orcamento.estrutura || {}];

  itens.forEach((it, idx) => {
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    const nomeTipo = (it.tipo || 'Estrutura Metálica').replace(/_/g, ' ').toUpperCase();
    const qtd = Number(it.quantidade) || 1;
    const tituloItem = `${idx + 1}. ${qtd > 1 ? `${qtd}x ` : ''}${nomeTipo}`;
    doc.text(tituloItem, margin, y);

    y += 4.5;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);

    const largMm = Number(it.dimensoes?.larguraMm || it.larguraMm) || 0;
    const altMm = Number(it.dimensoes?.alturaMm || it.alturaMm) || 0;
    const dimTexto = `• Dimensões: ${largMm}mm de largura x ${altMm}mm de altura (${(largMm / 1000).toFixed(2)}m x ${(altMm / 1000).toFixed(2)}m)`;
    doc.text(dimTexto, margin + 4, y);
    y += 4.5;

    const perfilReq = (it.requadro?.perfilId || it.perfilRequadroId || 'Metalon').replace(/_/g, ' ');
    const perfilPre = (it.preenchimento?.perfilId || it.perfilPreenchimentoId || 'Metalon').replace(/_/g, ' ');
    doc.text(`• Requadro: ${perfilReq} | Preenchimento: ${perfilPre}`, margin + 4, y);
    y += 6;
  });

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);

  const textoPintura = orcamento.memorialPintura || configOficina.memorialPintura || 'Aplicação de fundo protetor anticorrosivo (Zarcão). Acabamento final por conta do cliente.';
  const textoMaoObra = orcamento.memorialMaoDeObra || configOficina.memorialMaoDeObra || 'Fabricação e esquadrejamento em oficina especializada. Instalação e chumbamento no local por conta do pedreiro/cliente.';

  doc.text(`• Tratamento e Pintura: ${textoPintura}`, margin + 4, y);
  y += 4.5;
  doc.text(`• Mão de Obra e Instalação: ${textoMaoObra}`, margin + 4, y);
  y += 8;

  // ─── Resumo Financeiro e Condições ──────────────────────────
  const condicoes = orcamento.condicoes || {};
  const formaPag = condicoes.formaPagamento !== undefined 
    ? condicoes.formaPagamento 
    : (configOficina.condicoesFormaPagamento || '50% de sinal no pedido + 50% na conclusão da instalação.');
  const prazoEnt = condicoes.prazoEntrega !== undefined 
    ? condicoes.prazoEntrega 
    : (configOficina.condicoesPrazoEntrega || '15 a 20 dias úteis a contar da aprovação do sinal.');
  const garantia = condicoes.garantia !== undefined 
    ? condicoes.garantia 
    : (configOficina.condicoesGarantia || '12 meses para soltura de soldas e funcionamento estrutural.');

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 28, 'FD');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('CONDIÇÕES COMERCIAIS:', margin + 4, y + 6);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`• Forma de Pagamento: ${formaPag || 'A combinar'}`, margin + 4, y + 12);
  doc.text(`• Prazo de Fabricação e Entrega: ${prazoEnt || 'A combinar'}`, margin + 4, y + 17);
  doc.text(`• Garantia: ${garantia || 'Sem garantia adicional'}`, margin + 4, y + 22);

  y += 34;

  // Destaque do Valor Total
  doc.setFillColor(15, 23, 42); // Fundo escuro
  doc.rect(margin, y, contentWidth, 14, 'F');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('VALOR TOTAL DO INVESTIMENTO:', margin + 6, y + 9);

  const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(orcamento.financeiro?.precoVendaFinal || 0);

  doc.setFontSize(14);
  doc.text(valorFormatado, margin + contentWidth - 45, y + 9);

  const qtdUnica = Number(orcamento.estrutura?.quantidade) || 1;
  const totalItensCount = Array.isArray(orcamento.itens) && orcamento.itens.length > 0 ? orcamento.itens.length : 1;
  if (totalItensCount === 1 && qtdUnica > 1) {
    const valorUnitario = (orcamento.financeiro?.precoVendaFinal || 0) / qtdUnica;
    const unitarioFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorUnitario);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(`(${qtdUnica}x de ${unitarioFormatado} cada)`, margin + 6, y + 13);
  }

  y += 20;

  // ─── Box de QR Code Pix para Sinal / Entrada ────────────────
  const condPix = orcamento.condicoes || {};
  const formaPagPix = condPix.formaPagamento !== undefined 
    ? condPix.formaPagamento 
    : (configOficina.condicoesFormaPagamento || '50%');

  const chavePixConfig = configOficina.chavePix || '';
  if (chavePixConfig) {
    const dadosPix = gerarDadosPixEntrada({
      chavePix: chavePixConfig,
      nomeRecebedor: configOficina.nomeFantasia,
      cidade: configOficina.cidadeEstado,
      valorTotal: orcamento.financeiro?.precoVendaFinal || 0,
      entradaOuPercentual: formaPagPix,
      txid: String(orcamento.numeroSequencial || '101')
    });

    if (dadosPix && dadosPix.dataUrl) {
      const boxHeight = 28;
      doc.setFillColor(248, 250, 252); // Slate-50
      doc.setDrawColor(203, 213, 225); // Slate-300
      doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, 'FD');

      const qrSize = 22;
      try {
        doc.addImage(dadosPix.dataUrl, 'PNG', margin + 3, y + 3, qrSize, qrSize);
      } catch (e) {
        console.warn('Erro ao inserir QR Code Pix no PDF:', e);
      }

      const textX = margin + qrSize + 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text('PAGAMENTO DO SINAL / ENTRADA VIA PIX', textX, y + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text('Para aprovação imediata do pedido, escaneie o QR Code ao lado pelo app do seu banco.', textX, y + 11);

      const valEntradaFmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dadosPix.valorEntrada);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(2, 132, 199); // Sky-600
      doc.text(`Valor da Entrada (${dadosPix.percentualEntrada}%): ${valEntradaFmt}`, textX, y + 17);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(`Chave Pix: ${dadosPix.chavePix}  |  Favorecido: ${configOficina.nomeFantasia || 'Serralheria'}`, textX, y + 23);

      y += boxHeight + 8;
    } else {
      y += 10;
    }
  } else {
    y += 10;
  }

  // ─── Assinaturas ───────────────────────────────────────────
  const colWidth = 70;
  const col1X = margin + 10;
  const col2X = margin + contentWidth - colWidth - 10;

  doc.setDrawColor(148, 163, 184);
  doc.line(col1X, y, col1X + colWidth, y);
  doc.line(col2X, y, col2X + colWidth, y);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(configOficina.nomeFantasia || 'Responsável Serralheria', col1X + 8, y + 5);
  doc.text('Aceite do Cliente', col2X + 20, y + 5);

  // Download do arquivo de forma segura em browsers
  const nomeClienteLimpo = (orcamento.cliente?.nome || 'cliente').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Proposta_${orcamento.numeroSequencial || '101'}_${nomeClienteLimpo}.pdf`;

  try {
    const blob = doc.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    setTimeout(() => {
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(blobUrl);
    }, 250);
  } catch (errSave) {
    console.warn('Fallback doc.save nativo:', errSave);
    doc.save(filename);
  }
}

function imprimirViaHtml(orcamento, configOficina) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(orcamento.financeiro?.precoVendaFinal || 0);

  const itens = Array.isArray(orcamento.itens) && orcamento.itens.length > 0 
    ? orcamento.itens 
    : [orcamento.estrutura || {}];

  const itensHtml = itens.map((it, idx) => {
    const nome = (it.tipo || 'Estrutura').replace(/_/g, ' ');
    const qtd = it.quantidade || 1;
    const larg = it.dimensoes?.larguraMm || it.larguraMm || 0;
    const alt = it.dimensoes?.alturaMm || it.alturaMm || 0;
    return `<li><b>${qtd}x ${nome}</b> — ${larg}mm x ${alt}mm</li>`;
  }).join('');

  let pixHtml = '';
  if (configOficina.chavePix) {
    const condPix = orcamento.condicoes || {};
    const formaPagPix = condPix.formaPagamento || configOficina.condicoesFormaPagamento || '50%';
    const dadosPix = gerarDadosPixEntrada({
      chavePix: configOficina.chavePix,
      nomeRecebedor: configOficina.nomeFantasia,
      cidade: configOficina.cidadeEstado,
      valorTotal: orcamento.financeiro?.precoVendaFinal || 0,
      entradaOuPercentual: formaPagPix,
      txid: String(orcamento.numeroSequencial || '101')
    });
    if (dadosPix) {
      const valEntradaFmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dadosPix.valorEntrada);
      pixHtml = `
        <div style="display:flex;align-items:center;gap:16px;border:1px solid #cbd5e1;padding:12px;border-radius:8px;margin-top:20px;background:#f8fafc;">
          <img src="${dadosPix.dataUrl}" style="width:90px;height:90px;" alt="QR Code Pix" />
          <div>
            <h4 style="margin:0 0 4px 0;font-size:13px;color:#0f172a;">Pagamento do Sinal / Entrada via Pix</h4>
            <p style="margin:2px 0;font-size:11px;color:#334155;">Valor da Entrada (${dadosPix.percentualEntrada}%): <b>${valEntradaFmt}</b></p>
            <p style="margin:2px 0;font-size:11px;color:#64748b;">Chave Pix: <b>${dadosPix.chavePix}</b></p>
          </div>
        </div>
      `;
    }
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <title>Proposta Comercial #${orcamento.numeroSequencial}</title>
      <style>
        body { font-family: sans-serif; margin: 30px; color: #1e293b; }
        .header { background: #0f172a; color: white; padding: 20px; border-radius: 6px; }
        .title { font-size: 20px; font-weight: bold; }
        .section { margin-top: 25px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; }
        .total { background: #0f172a; color: white; padding: 15px; font-size: 20px; font-weight: bold; margin-top: 30px; text-align: right; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">${configOficina.nomeFantasia || 'SERRALHERIA'}</div>
        <div>Telefone / WhatsApp: ${configOficina.telefoneContato || ''}</div>
      </div>
      <div class="section">
        <h3>Proposta #${orcamento.numeroSequencial} - Cliente: ${orcamento.cliente?.nome}</h3>
        <p>Telefone: ${orcamento.cliente?.telefone || '-'}</p>
        <h4>Itens da Obra:</h4>
        <ul>${itensHtml}</ul>
      </div>
      <div class="total">Valor Total: ${valorFormatado}</div>
      ${pixHtml}
      <script>window.print();</script>
    </body>
    </html>
  `);
  printWindow.document.close();
}
