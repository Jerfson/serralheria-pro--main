/**
 * Motor Paramétrico de Cálculo de Estruturas Metálicas e Otimização de Barras
 * Algoritmo: First-Fit Decreasing (FFD) com compensação de serra (kerf)
 * Padrão comercial: Barras inteiras de 6000mm
 */

/**
 * Empacotamento linear de peças em barras de 6 metros.
 * @param {Array<{tamanhoMm: number, quantidade: number, identificador: string}>} listaPecas
 * @param {number} [barraTamanhoMm=6000] - Tamanho comercial padrão da barra em mm
 * @param {number} [kerfMm=3] - Perda do disco de serra por corte em mm
 */
export function otimizarCorteBarras(listaPecas, barraTamanhoMm = 6000, kerfMm = 3) {
  if (!Array.isArray(listaPecas) || listaPecas.length === 0) {
    return {
      barrasNecessarias: 0,
      barras: [],
      sobraTotalMm: 0,
      metragemLinearTotalMm: 0,
      aproveitamentoPercentual: 0
    };
  }

  // 1. Desdobrar e ordenar todas as peças em ordem decrescente
  const pecasIndividuais = [];
  let metragemLinearTotalMm = 0;

  for (const item of listaPecas) {
    const tam = Number(item.tamanhoMm) || 0;
    const qtd = Number(item.quantidade) || 0;
    if (tam <= 0 || qtd <= 0) continue;

    if (tam > barraTamanhoMm) {
      throw new Error(`Peça ${item.identificador || ''} (${tam}mm) excede o tamanho máximo de uma barra comercial (${barraTamanhoMm}mm). É necessária emenda.`);
    }

    for (let i = 0; i < qtd; i++) {
      pecasIndividuais.push({
        tamanhoMm: tam,
        identificador: item.identificador || 'peça'
      });
      metragemLinearTotalMm += tam;
    }
  }

  pecasIndividuais.sort((a, b) => b.tamanhoMm - a.tamanhoMm);

  // 2. First-Fit Decreasing: alocar cada peça na primeira barra que a comportar
  const barras = []; // cada barra: { espacoLivreMm, pecas: [], cortesCount: 0 }

  for (const peca of pecasIndividuais) {
    let alocada = false;

    for (const barra of barras) {
      // O espaço necessário é o tamanho da peça + o kerf do corte
      const espacoNecessario = peca.tamanhoMm + kerfMm;

      if (barra.espacoLivreMm >= espacoNecessario) {
        barra.pecas.push(peca);
        barra.espacoLivreMm -= espacoNecessario;
        barra.cortesCount += 1;
        alocada = true;
        break;
      }
    }

    if (!alocada) {
      // Abre nova barra de 6000mm
      const novaBarra = {
        numeroBarra: barras.length + 1,
        tamanhoNominalMm: barraTamanhoMm,
        espacoLivreMm: barraTamanhoMm - (peca.tamanhoMm + kerfMm),
        pecas: [peca],
        cortesCount: 1
      };
      barras.push(novaBarra);
    }
  }

  const barrasNecessarias = barras.length;
  const sobraTotalMm = barras.reduce((total, b) => total + Math.max(0, b.espacoLivreMm), 0);
  const capacidadeTotalMm = barrasNecessarias * barraTamanhoMm;
  const aproveitamentoPercentual = capacidadeTotalMm > 0
    ? Math.round(((metragemLinearTotalMm / capacidadeTotalMm) * 100) * 10) / 10
    : 0;

  return {
    barrasNecessarias,
    barras,
    sobraTotalMm,
    metragemLinearTotalMm,
    aproveitamentoPercentual
  };
}

/**
 * Desdobra a geometria de uma estrutura metálica e calcula as barras necessárias.
 * @param {Object} params
 */
export function calcularEstruturaCompleta(params) {
  const {
    tipo = 'portao_deslizante',
    larguraMm = 3000,
    alturaMm = 2200,
    profundidadeMm = 0,
    perfilRequadroId = 'metalon_50x30_18',
    perfilPreenchimentoId = 'metalon_20x20_18',
    espacamentoMm = 120,
    kerfMm = 3,
    quantidade = 1
  } = params;

  const qtdUnidades = Math.max(1, Math.floor(Number(quantidade) || 1));

  // Validação de segurança física
  if (larguraMm < 400 || larguraMm > 15000) {
    throw new Error('Largura informada está abaixo do limite mínimo (400mm) ou acima do máximo (15000mm).');
  }
  if (alturaMm < 400 || alturaMm > 6000) {
    throw new Error('Altura informada está abaixo do limite mínimo (400mm) ou acima do máximo (6000mm).');
  }

  const pecasRequadro = [];
  const pecasPreenchimento = [];
  let areaM2 = ((larguraMm * alturaMm) / 1_000_000) * qtdUnidades;

  switch (tipo) {
    case 'portao_basculante':
    case 'portao_deslizante': {
      // Requadro perimetral: 2 horizontais + 2 verticais
      // Para portão de correr, adicionamos aba inferior para roldana (travessa extra inferior)
      const travessasQtd = (tipo === 'portao_deslizante' ? 3 : 2) * qtdUnidades;
      pecasRequadro.push({ tamanhoMm: larguraMm, quantidade: travessasQtd, identificador: 'Travessa Horizontal Requadro' });
      pecasRequadro.push({ tamanhoMm: alturaMm, quantidade: 2 * qtdUnidades, identificador: 'Coluna Vertical Requadro' });

      // Preenchimento vertical interno
      // Desconta espessura de 50mm de cada lado do requadro
      const larguraUtilMm = Math.max(100, larguraMm - 100);
      const alturaUtilMm = Math.max(100, alturaMm - 100);
      const passoMm = espacamentoMm + 20; // vão + largura do metalon 20x20
      const qtdBarrasVerticais = Math.max(1, Math.floor(larguraUtilMm / passoMm)) * qtdUnidades;

      pecasPreenchimento.push({
        tamanhoMm: alturaUtilMm,
        quantidade: qtdBarrasVerticais,
        identificador: 'Barra Vertical Interna'
      });
      break;
    }

    case 'grade': {
      // Requadro simples: 2 horizontais + 2 laterais
      pecasRequadro.push({ tamanhoMm: larguraMm, quantidade: 2 * qtdUnidades, identificador: 'Travessa Grade' });
      pecasRequadro.push({ tamanhoMm: alturaMm, quantidade: 2 * qtdUnidades, identificador: 'Montante Grade' });

      const larguraUtilMm = Math.max(100, larguraMm - 60);
      const alturaUtilMm = Math.max(100, alturaMm - 60);
      const passoMm = espacamentoMm + 20;
      const qtdBarras = Math.max(1, Math.floor(larguraUtilMm / passoMm)) * qtdUnidades;

      pecasPreenchimento.push({
        tamanhoMm: alturaUtilMm,
        quantidade: qtdBarras,
        identificador: 'Palanque / Barra Grade'
      });
      break;
    }

    case 'corrimao': {
      // Tubo superior (corrimão)
      pecasRequadro.push({ tamanhoMm: larguraMm, quantidade: 1 * qtdUnidades, identificador: 'Tubo Superior Corrimão' });

      // Montantes de fixação a cada ~1000mm
      const qtdMontantes = (Math.max(2, Math.ceil(larguraMm / 1000) + 1)) * qtdUnidades;
      pecasRequadro.push({ tamanhoMm: alturaMm, quantidade: qtdMontantes, identificador: 'Montante de Fixação' });

      // Barras horizontais de proteção intermediárias (2 barras)
      pecasPreenchimento.push({ tamanhoMm: larguraMm, quantidade: 2 * qtdUnidades, identificador: 'Longarina Intermediária' });
      break;
    }

    case 'cobertura': {
      // Vigas mestras longitudinais (2 vigas)
      pecasRequadro.push({ tamanhoMm: larguraMm, quantidade: 2 * qtdUnidades, identificador: 'Viga Mestra Principal' });

      // Terças / caibros transversais a cada espacamentoMm (ex: 800mm)
      const qtdTercas = (Math.max(2, Math.ceil(larguraMm / (espacamentoMm || 800)) + 1)) * qtdUnidades;
      pecasPreenchimento.push({ tamanhoMm: alturaMm, quantidade: qtdTercas, identificador: 'Terça / Caibro Telhado' });
      break;
    }

    default:
      throw new Error(`Tipo de estrutura desconhecido: ${tipo}`);
  }

  // Otimização de barras de 6m
  const resultadoRequadro = otimizarCorteBarras(pecasRequadro, 6000, kerfMm);
  const resultadoPreenchimento = otimizarCorteBarras(pecasPreenchimento, 6000, kerfMm);

  const totalBarras6m = resultadoRequadro.barrasNecessarias + resultadoPreenchimento.barrasNecessarias;
  const metragemTotalMm = resultadoRequadro.metragemLinearTotalMm + resultadoPreenchimento.metragemLinearTotalMm;
  const capacidadeGeralMm = totalBarras6m * 6000;
  const aproveitamentoGeralPercentual = capacidadeGeralMm > 0
    ? Math.round(((metragemTotalMm / capacidadeGeralMm) * 100) * 10) / 10
    : 0;

  return {
    tipo,
    quantidade: qtdUnidades,
    dimensoes: { larguraMm, alturaMm, profundidadeMm, espacamentoMm, kerfMm, quantidade: qtdUnidades, areaM2: Math.round(areaM2 * 100) / 100 },
    pecasRequadro,
    pecasPreenchimento,
    requadro: {
      perfilId: perfilRequadroId,
      ...resultadoRequadro
    },
    preenchimento: {
      perfilId: perfilPreenchimentoId,
      ...resultadoPreenchimento
    },
    totalBarras6m,
    metragemTotalMm,
    aproveitamentoGeralPercentual
  };
}

/**
 * Consolida múltiplos itens de estruturas diferentes em um lote integrado de barras de 6m.
 * Agrupa todas as peças que usam o mesmo perfil (ID) e roda a otimização conjunta de corte FFD.
 * @param {Array<Object>} itensLista - Array com os resultados de calcularEstruturaCompleta para cada item
 * @param {number} [kerfMm=3]
 */
export function calcularLoteItensMultiplos(itensLista = [], kerfMm = 3) {
  if (!Array.isArray(itensLista) || itensLista.length === 0) {
    return {
      totalBarras6m: 0,
      metragemTotalMm: 0,
      aproveitamentoGeralPercentual: 0,
      perfisConsolidados: [],
      itens: []
    };
  }

  // Agrupamento de peças por ID de perfil metálico
  const mapaPerfis = new Map();

  for (const item of itensLista) {
    const perfilReq = item.requadro?.perfilId;
    const perfilPre = item.preenchimento?.perfilId;

    if (perfilReq && item.pecasRequadro) {
      if (!mapaPerfis.has(perfilReq)) mapaPerfis.set(perfilReq, []);
      mapaPerfis.get(perfilReq).push(...item.pecasRequadro);
    }

    if (perfilPre && item.pecasPreenchimento) {
      if (!mapaPerfis.has(perfilPre)) mapaPerfis.set(perfilPre, []);
      mapaPerfis.get(perfilPre).push(...item.pecasPreenchimento);
    }
  }

  const perfisConsolidados = [];
  let totalBarras6m = 0;
  let metragemTotalMm = 0;

  for (const [perfilId, pecas] of mapaPerfis.entries()) {
    const resultadoOtimizacao = otimizarCorteBarras(pecas, 6000, kerfMm);
    totalBarras6m += resultadoOtimizacao.barrasNecessarias;
    metragemTotalMm += resultadoOtimizacao.metragemLinearTotalMm;

    perfisConsolidados.push({
      perfilId,
      ...resultadoOtimizacao
    });
  }

  const capacidadeGeralMm = totalBarras6m * 6000;
  const aproveitamentoGeralPercentual = capacidadeGeralMm > 0
    ? Math.round(((metragemTotalMm / capacidadeGeralMm) * 100) * 10) / 10
    : 0;

  return {
    totalBarras6m,
    metragemTotalMm,
    aproveitamentoGeralPercentual,
    perfisConsolidados,
    itens: itensLista
  };
}
