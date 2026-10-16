/**
 * Motor Financeiro de Composição de Custos, Insumos e Formação de Preço (BDI)
 */

function roundMoeda(val) {
  return Math.round((Number(val) + Number.EPSILON) * 100) / 100;
}

/**
 * Calcula a composição de custos detalhada e o preço final de venda com margem de lucro.
 * @param {Object} dadosEstrutura
 * @param {Object} configFinanceira
 * @param {Array} catalogoPrecos
 */
export function calcularComposicaoPreco(dadosEstrutura, configFinanceira = {}, catalogoPrecos = []) {
  const margemLucroPercentual = Number(configFinanceira.margemLucroPercentual ?? 40);

  if (isNaN(margemLucroPercentual) || margemLucroPercentual < 0 || margemLucroPercentual >= 95) {
    throw new Error(`Margem de lucro inválida: ${margemLucroPercentual}%. Deve estar entre 0% e 94.9%.`);
  }

  const horasMaoDeObra = Number(configFinanceira.horasMaoDeObra ?? 8);
  const valorHoraMaoDeObra = Number(configFinanceira.valorHoraMaoDeObra ?? 50.00);
  const taxaFrete = Number(configFinanceira.taxaFrete ?? 80.00);

  // Helper para buscar preço de material no catálogo
  function buscarPreco(id, fallback = 0) {
    if (!id) return fallback;
    const item = catalogoPrecos.find(m => m.id === id);
    return item ? Number(item.precoUnitarioPadrao) || fallback : fallback;
  }

  // 1. Custo das Barras de Metalon / Perfis
  const perfilRequadroId = dadosEstrutura.requadro?.perfilId;
  const precoBarraRequadro = buscarPreco(perfilRequadroId, 110.00);
  const barrasRequadroQtd = Number(dadosEstrutura.requadro?.barrasNecessarias) || 0;
  const custoRequadro = barrasRequadroQtd * precoBarraRequadro;

  const perfilPreenchimentoId = dadosEstrutura.preenchimento?.perfilId;
  const precoBarraPreenchimento = buscarPreco(perfilPreenchimentoId, 52.00);
  const barrasPreenchimentoQtd = Number(dadosEstrutura.preenchimento?.barrasNecessarias) || 0;
  const custoPreenchimento = barrasPreenchimentoQtd * precoBarraPreenchimento;

  const custoMateriaisBarras = roundMoeda(custoRequadro + custoPreenchimento);

  // 2. Acessórios e Ferragens
  let custoAcessorios = 0;
  if (configFinanceira.custoAcessorios !== undefined && configFinanceira.custoAcessorios !== null) {
    custoAcessorios = Number(configFinanceira.custoAcessorios) || 0;
  } else {
    const tipo = dadosEstrutura.tipo || '';
    if (tipo.includes('portao')) {
      const precoRoldana = buscarPreco('roldana_portao_75', 45.00);
      const precoFechadura = buscarPreco('fechadura_bico_papagaio', 65.00);
      custoAcessorios += (precoRoldana + precoFechadura);
    }
  }
  custoAcessorios = roundMoeda(custoAcessorios);

  // 3. Rateio de Insumos e Consumíveis (Solda e Corte)
  let custoInsumosConsumiveis = 0;
  if (configFinanceira.custoInsumosConsumiveis !== undefined && configFinanceira.custoInsumosConsumiveis !== null) {
    custoInsumosConsumiveis = Number(configFinanceira.custoInsumosConsumiveis) || 0;
  } else {
    const metragemLinearTotalMm = (Number(dadosEstrutura.requadro?.metragemLinearTotalMm) || 0) +
                                  (Number(dadosEstrutura.preenchimento?.metragemLinearTotalMm) || 0);
    const metrosLineares = metragemLinearTotalMm / 1000;
    custoInsumosConsumiveis = Math.max(15.00, metrosLineares * 2.00);
  }
  custoInsumosConsumiveis = roundMoeda(custoInsumosConsumiveis);

  // 4. Rateio de Pintura (Primer anticorrosivo e Tinta de acabamento)
  let custoPintura = 0;
  if (configFinanceira.custoPintura !== undefined && configFinanceira.custoPintura !== null) {
    custoPintura = Number(configFinanceira.custoPintura) || 0;
  } else {
    const areaM2 = Number(dadosEstrutura.dimensoes?.areaM2 || dadosEstrutura.areaM2) || 2.0;
    custoPintura = Math.max(25.00, areaM2 * 14.00);
  }
  custoPintura = roundMoeda(custoPintura);

  // 5. Mão de Obra Produtiva
  let custoMaoDeObraTotal = 0;
  if (configFinanceira.custoMaoDeObraTotal !== undefined && configFinanceira.custoMaoDeObraTotal !== null) {
    custoMaoDeObraTotal = Number(configFinanceira.custoMaoDeObraTotal) || 0;
  } else {
    custoMaoDeObraTotal = horasMaoDeObra * valorHoraMaoDeObra;
  }
  custoMaoDeObraTotal = roundMoeda(custoMaoDeObraTotal);

  // 6. Custos Indiretos / Frete
  const custoFreteFinal = roundMoeda(configFinanceira.custoFrete ?? taxaFrete);

  // Custo Total Direto da Obra
  const custoTotalDireto = roundMoeda(
    custoMateriaisBarras +
    custoAcessorios +
    custoInsumosConsumiveis +
    custoPintura +
    custoMaoDeObraTotal +
    custoFreteFinal
  );

  // 7. Formação de Preço com Margem Líquida sobre a Venda (Markup divisor)
  // PreçoVenda = Custo / (1 - Margem/100)
  const fatorDivisor = 1 - (margemLucroPercentual / 100);
  const precoVendaFinal = roundMoeda(custoTotalDireto / fatorDivisor);
  const lucroLiquidoEstimado = roundMoeda(precoVendaFinal - custoTotalDireto);

  return {
    custoMateriaisBarras,
    detalheBarras: {
      requadro: { perfilId: perfilRequadroId, barras: barrasRequadroQtd, precoUnitario: precoBarraRequadro, subtotal: roundMoeda(custoRequadro) },
      preenchimento: { perfilId: perfilPreenchimentoId, barras: barrasPreenchimentoQtd, precoUnitario: precoBarraPreenchimento, subtotal: roundMoeda(custoPreenchimento) }
    },
    custoAcessorios,
    custoInsumosConsumiveis,
    custoPintura,
    horasMaoDeObra,
    valorHoraMaoDeObra,
    custoMaoDeObraTotal,
    custoFrete: custoFreteFinal,
    custoTotalDireto,
    margemLucroPercentual,
    precoVendaFinal,
    lucroLiquidoEstimado
  };
}

/**
 * Calcula a composição de custos e formação de preço para um lote com múltiplos itens.
 * Suporta consolidação de perfis e soma ou substituição manual dos custos indiretos.
 * @param {Object} dadosLote - Retorno de calcularLoteItensMultiplos
 * @param {Object} configFinanceira - Configurações e/ou valores manuais
 * @param {Array} catalogoPrecos - Catálogo de preços base
 */
export function calcularComposicaoPrecoLote(dadosLote, configFinanceira = {}, catalogoPrecos = []) {
  const margemLucroPercentual = Number(configFinanceira.margemLucroPercentual ?? 40);

  if (isNaN(margemLucroPercentual) || margemLucroPercentual < 0 || margemLucroPercentual >= 95) {
    throw new Error(`Margem de lucro inválida: ${margemLucroPercentual}%. Deve estar entre 0% e 94.9%.`);
  }

  function buscarPreco(id, fallback = 0) {
    if (!id) return fallback;
    const item = catalogoPrecos.find(m => m.id === id);
    return item ? Number(item.precoUnitarioPadrao) || fallback : fallback;
  }

  // 1. Custo dos Perfis / Barras Comerciais de 6m
  let custoMateriaisBarras = 0;
  const detalhePerfis = [];

  const perfis = dadosLote.perfisConsolidados || [];
  for (const perfil of perfis) {
    const precoUnitario = buscarPreco(perfil.perfilId, 85.00);
    const subtotal = roundMoeda(perfil.barrasNecessarias * precoUnitario);
    custoMateriaisBarras += subtotal;
    detalhePerfis.push({
      perfilId: perfil.perfilId,
      barras: perfil.barrasNecessarias,
      precoUnitario,
      subtotal
    });
  }
  custoMateriaisBarras = roundMoeda(custoMateriaisBarras);

  // 2. Acessórios e Ferragens
  let custoAcessorios = 0;
  if (configFinanceira.custoAcessorios !== undefined && configFinanceira.custoAcessorios !== null) {
    custoAcessorios = Number(configFinanceira.custoAcessorios) || 0;
  } else {
    let temCustoItem = false;
    let somaItem = 0;
    for (const item of (dadosLote.itens || [])) {
      if (item.custos && item.custos.ferragens !== undefined) {
        somaItem += Number(item.custos.ferragens) || 0;
        temCustoItem = true;
      }
    }
    if (temCustoItem) {
      custoAcessorios = somaItem;
    } else {
      for (const item of (dadosLote.itens || [])) {
        const tipo = item.tipo || '';
        const qtd = Number(item.quantidade) || 1;
        if (tipo.includes('portao')) {
          const precoRoldana = buscarPreco('roldana_portao_75', 45.00);
          const precoFechadura = buscarPreco('fechadura_bico_papagaio', 65.00);
          custoAcessorios += (precoRoldana + precoFechadura) * qtd;
        }
      }
    }
  }
  custoAcessorios = roundMoeda(custoAcessorios);

  // 3. Insumos Consumíveis
  let custoInsumosConsumiveis = 0;
  if (configFinanceira.custoInsumosConsumiveis !== undefined && configFinanceira.custoInsumosConsumiveis !== null) {
    custoInsumosConsumiveis = Number(configFinanceira.custoInsumosConsumiveis) || 0;
  } else {
    let temCustoItem = false;
    let somaItem = 0;
    for (const item of (dadosLote.itens || [])) {
      if (item.custos && item.custos.insumos !== undefined) {
        somaItem += Number(item.custos.insumos) || 0;
        temCustoItem = true;
      }
    }
    if (temCustoItem) {
      custoInsumosConsumiveis = somaItem;
    } else {
      const metrosLineares = (dadosLote.metragemTotalMm || 0) / 1000;
      custoInsumosConsumiveis = Math.max(25.00, metrosLineares * 2.00);
    }
  }
  custoInsumosConsumiveis = roundMoeda(custoInsumosConsumiveis);

  // 4. Pintura
  let custoPintura = 0;
  if (configFinanceira.custoPintura !== undefined && configFinanceira.custoPintura !== null) {
    custoPintura = Number(configFinanceira.custoPintura) || 0;
  } else {
    let temCustoItem = false;
    let somaItem = 0;
    for (const item of (dadosLote.itens || [])) {
      if (item.custos && item.custos.pintura !== undefined) {
        somaItem += Number(item.custos.pintura) || 0;
        temCustoItem = true;
      }
    }
    if (temCustoItem) {
      custoPintura = somaItem;
    } else {
      let areaM2Total = 0;
      for (const item of (dadosLote.itens || [])) {
        areaM2Total += Number(item.dimensoes?.areaM2 || item.areaM2) || 1.5;
      }
      custoPintura = Math.max(35.00, areaM2Total * 14.00);
    }
  }
  custoPintura = roundMoeda(custoPintura);

  // 5. Mão de Obra
  let custoMaoDeObraTotal = 0;
  if (configFinanceira.custoMaoDeObraTotal !== undefined && configFinanceira.custoMaoDeObraTotal !== null) {
    custoMaoDeObraTotal = Number(configFinanceira.custoMaoDeObraTotal) || 0;
  } else {
    let temCustoItem = false;
    let somaItem = 0;
    for (const item of (dadosLote.itens || [])) {
      if (item.custos && item.custos.maoObra !== undefined) {
        somaItem += Number(item.custos.maoObra) || 0;
        temCustoItem = true;
      }
    }
    if (temCustoItem) {
      custoMaoDeObraTotal = somaItem;
    } else {
      const horasPorItem = (dadosLote.itens || []).reduce((acc, it) => {
        const horasBase = it.tipo?.includes('portao') ? 8 : 4;
        return acc + (horasBase * (Number(it.quantidade) || 1));
      }, 0);
      const horasFinais = Math.max(6, horasPorItem);
      const valorHora = Number(configFinanceira.valorHoraMaoDeObra ?? 50.00);
      custoMaoDeObraTotal = horasFinais * valorHora;
    }
  }
  custoMaoDeObraTotal = roundMoeda(custoMaoDeObraTotal);

  // 6. Frete
  let custoFreteFinal = 0;
  if (configFinanceira.custoFrete !== undefined && configFinanceira.custoFrete !== null) {
    custoFreteFinal = roundMoeda(Number(configFinanceira.custoFrete) || 0);
  } else {
    let temCustoItem = false;
    let somaItem = 0;
    for (const item of (dadosLote.itens || [])) {
      if (item.custos && item.custos.frete !== undefined) {
        somaItem += Number(item.custos.frete) || 0;
        temCustoItem = true;
      }
    }
    if (temCustoItem && somaItem > 0) {
      custoFreteFinal = roundMoeda(somaItem);
    } else {
      custoFreteFinal = roundMoeda(configFinanceira.taxaFrete ?? 80.00);
    }
  }

  // Custo Total Direto
  const custoTotalDireto = roundMoeda(
    custoMateriaisBarras +
    custoAcessorios +
    custoInsumosConsumiveis +
    custoPintura +
    custoMaoDeObraTotal +
    custoFreteFinal
  );

  // Preço Final
  const fatorDivisor = 1 - (margemLucroPercentual / 100);
  const precoVendaFinal = roundMoeda(custoTotalDireto / fatorDivisor);
  const lucroLiquidoEstimado = roundMoeda(precoVendaFinal - custoTotalDireto);

  return {
    custoMateriaisBarras,
    detalhePerfis,
    custoAcessorios,
    custoInsumosConsumiveis,
    custoPintura,
    custoMaoDeObraTotal,
    custoFrete: custoFreteFinal,
    custoTotalDireto,
    margemLucroPercentual,
    precoVendaFinal,
    lucroLiquidoEstimado
  };
}

/**
 * Calcula os custos diretos sugeridos para um item individual (insumos, pintura, ferragens, mão de obra, frete).
 * @param {Object} item - Estrutura calculada
 * @param {Object} config - Configurações financeiras da oficina
 * @param {Array} catalogo - Catálogo de materiais e preços
 * @returns {Object} { insumos, pintura, ferragens, maoObra, frete }
 */
export function calcularCustosSugeridosItem(item = {}, config = {}, catalogo = []) {
  const qtd = Math.max(1, Number(item.quantidade) || 1);
  const tipo = item.tipo || '';

  function buscarPreco(id, fallback = 0) {
    if (!id || !Array.isArray(catalogo)) return fallback;
    const mat = catalogo.find(m => m.id === id);
    return mat ? Number(mat.precoUnitarioPadrao) || fallback : fallback;
  }

  // 1. Insumos (solda, discos)
  const metrosLineares = ((item.comprimentoTotalPerfisMm || 0) * qtd) / 1000;
  const insumos = roundMoeda(Math.max(15.00 * qtd, metrosLineares * 2.00));

  // 2. Pintura (fundo primer / zarcão)
  const areaM2 = (Number(item.dimensoes?.areaM2 || item.areaM2) || 1.5) * qtd;
  const pintura = roundMoeda(Math.max(20.00 * qtd, areaM2 * 14.00));

  // 3. Ferragens / Acessórios
  let ferragens = 0;
  if (tipo.includes('portao')) {
    const precoRoldana = buscarPreco('roldana_portao_75', 45.00);
    const precoFechadura = buscarPreco('fechadura_bico_papagaio', 65.00);
    ferragens = roundMoeda((precoRoldana + precoFechadura) * qtd);
  }

  // 4. Mão de Obra
  const horasBase = tipo.includes('portao') ? 8 : 4;
  const valorHora = Number(config.valorHoraMaoDeObra ?? 50.00);
  const maoObra = roundMoeda(horasBase * qtd * valorHora);

  // 5. Frete (0 no item individual para não duplicar frete fechado da entrega, permitindo inclusão manual se for por peça)
  const frete = 0;

  return {
    insumos,
    pintura,
    ferragens,
    maoObra,
    frete
  };
}

