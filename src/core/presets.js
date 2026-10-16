/**
 * Catálogo padrão de materiais (Presets) e configurações iniciais da Serralheria.
 * Baseado no mercado siderúrgico brasileiro (barras de 6000mm e consumíveis padrão).
 */

export const DEFAULT_PRESETS = [
  {
    id: 'metalon_50x30_18',
    categoria: 'metalon',
    nome: 'Metalon 50x30 Chapa 18 (1.20mm)',
    descricao: 'Tubo retangular em aço carbono para requadros e estruturas médias',
    dimensaoTexto: '50x30mm',
    unidadeMedida: 'barra_6m',
    precoUnitarioPadrao: 110.00,
    densidadeLinearKgM: 1.45
  },
  {
    id: 'metalon_40x40_18',
    categoria: 'metalon',
    nome: 'Metalon 40x40 Chapa 18 (1.20mm)',
    descricao: 'Tubo quadrado para colunas, postes e portões',
    dimensaoTexto: '40x40mm',
    unidadeMedida: 'barra_6m',
    precoUnitarioPadrao: 105.00,
    densidadeLinearKgM: 1.45
  },
  {
    id: 'metalon_30x20_18',
    categoria: 'metalon',
    nome: 'Metalon 30x20 Chapa 18 (1.20mm)',
    descricao: 'Tubo retangular leve para travessas e esquadrias',
    dimensaoTexto: '30x20mm',
    unidadeMedida: 'barra_6m',
    precoUnitarioPadrao: 65.00,
    densidadeLinearKgM: 0.90
  },
  {
    id: 'metalon_20x20_18',
    categoria: 'metalon',
    nome: 'Metalon 20x20 Chapa 18 (1.20mm)',
    descricao: 'Tubo quadrado para preenchimento de grades e portões',
    dimensaoTexto: '20x20mm',
    unidadeMedida: 'barra_6m',
    precoUnitarioPadrao: 52.00,
    densidadeLinearKgM: 0.72
  },
  {
    id: 'cantoneira_1_18',
    categoria: 'cantoneira',
    nome: 'Cantoneira 1" x 1/8" (25.4 x 3.17mm)',
    descricao: 'Perfil L para abas, reforços e trilhos',
    dimensaoTexto: '25.4x3.17mm',
    unidadeMedida: 'barra_6m',
    precoUnitarioPadrao: 78.00,
    densidadeLinearKgM: 1.20
  },
  {
    id: 'barra_chata_1_18',
    categoria: 'barra_chata',
    nome: 'Barra Chata 1" x 1/8" (25.4 x 3.17mm)',
    descricao: 'Barra chata para travamento, acabamento e detalhes',
    dimensaoTexto: '25.4x3.17mm',
    unidadeMedida: 'barra_6m',
    precoUnitarioPadrao: 62.00,
    densidadeLinearKgM: 0.63
  },
  {
    id: 'tubo_redondo_1_12_18',
    categoria: 'tubo_redondo',
    nome: 'Tubo Redondo 1.1/2" Chapa 18 (38.1mm)',
    descricao: 'Tubo redondo para corrimão de escada e parapeitos',
    dimensaoTexto: 'Ø 38.1mm',
    unidadeMedida: 'barra_6m',
    precoUnitarioPadrao: 88.00,
    densidadeLinearKgM: 1.10
  },
  {
    id: 'eletrodo_6013_25',
    categoria: 'insumo_solda',
    nome: 'Eletrodo Revestido AWS E6013 2.5mm (Kg)',
    descricao: 'Eletrodo azul para serralheria em geral e chapas finas',
    dimensaoTexto: 'Ø 2.5mm',
    unidadeMedida: 'kg',
    precoUnitarioPadrao: 28.00
  },
  {
    id: 'disco_corte_4_5',
    categoria: 'insumo_solda',
    nome: 'Disco de Corte Fino 4.1/2" x 1.0mm',
    descricao: 'Disco de corte rápido para esmerilhadeira',
    dimensaoTexto: '115 x 1.0mm',
    unidadeMedida: 'disco',
    precoUnitarioPadrao: 6.50
  },
  {
    id: 'disco_desbaste_4_5',
    categoria: 'insumo_solda',
    nome: 'Disco de Desbaste 4.1/2" x 6.0mm',
    descricao: 'Disco de desbaste e nivelamento de cordões de solda',
    dimensaoTexto: '115 x 6.0mm',
    unidadeMedida: 'disco',
    precoUnitarioPadrao: 9.00
  },
  {
    id: 'primer_anticorrosivo',
    categoria: 'pintura',
    nome: 'Fundo Primer Zarcão / Cinza (Galão 3.6L)',
    descricao: 'Tinta protetiva anticorrosiva de aderência inicial',
    dimensaoTexto: 'Galão 3.6L',
    unidadeMedida: 'litro',
    precoUnitarioPadrao: 24.00
  },
  {
    id: 'esmalte_sintetico_preto',
    categoria: 'pintura',
    nome: 'Tinta Esmalte Sintético Preto Brilhante/Fosco',
    descricao: 'Acabamento final de alta durabilidade para serralheria',
    dimensaoTexto: 'Galão 3.6L',
    unidadeMedida: 'litro',
    precoUnitarioPadrao: 32.00
  },
  {
    id: 'roldana_portao_75',
    categoria: 'acessorio',
    nome: 'Par de Roldanas em U com Rolamento 75mm (3")',
    descricao: 'Kit para portão deslizante com parafuso e bucha',
    dimensaoTexto: 'Ø 75mm',
    unidadeMedida: 'unidade',
    precoUnitarioPadrao: 45.00
  },
  {
    id: 'fechadura_bico_papagaio',
    categoria: 'acessorio',
    nome: 'Fechadura Bico de Papagaio para Portão',
    descricao: 'Fechadura de sobrepor ou embutir em perfil tubular',
    dimensaoTexto: 'Standard',
    unidadeMedida: 'unidade',
    precoUnitarioPadrao: 65.00
  }
];

export const DEFAULT_CONFIG = {
  nomeFantasia: 'Serralheria Modelo',
  telefoneContato: '(11) 98765-4321',
  cidadeEstado: 'São Paulo - SP',
  chavePix: 'pix@serralheriamodelo.com.br',
  valorHoraMaoDeObra: 50.00,
  margemLucroPadrao: 40, // 40%
  kerfCortePadraoMm: 3, // 3mm por corte de serra
  validadeOrcamentoDias: 15, // 15 dias de validade
  taxaFretePadrao: 80.00,
  condicoesFormaPagamento: '50% de sinal no pedido + 50% na retirada/entrega.',
  condicoesPrazoEntrega: '15 a 20 dias úteis a contar da aprovação do sinal.',
  condicoesGarantia: '12 meses para soltura de soldas e funcionamento estrutural.',
  memorialPintura: 'Aplicação de fundo protetor anticorrosivo (Zarcão). Acabamento final/pintura definitiva por conta do cliente.',
  memorialMaoDeObra: 'Fabricação e esquadrejamento em oficina especializada. Instalação e chumbamento no local por conta do pedreiro/cliente.'
};

export const STRUCTURE_TEMPLATES = [
  {
    id: 'portao_basculante',
    nome: 'Portão Basculante',
    descricao: 'Portão que abre para cima com auxílio de contrapesos e colunas laterais',
    icone: 'door-closed',
    perfilRequadroSugerido: 'metalon_50x30_18',
    perfilPreenchimentoSugerido: 'metalon_20x20_18',
    larguraPadraoMm: 3000,
    alturaPadraoMm: 2200,
    espacamentoPadraoMm: 120,
    horasMaoDeObraSugerida: 12,
    requerAcessorios: true
  },
  {
    id: 'portao_deslizante',
    nome: 'Portão Deslizante (Correr)',
    descricao: 'Portão que corre lateralmente sobre trilho e roldanas inferiores',
    icone: 'move-horizontal',
    perfilRequadroSugerido: 'metalon_50x30_18',
    perfilPreenchimentoSugerido: 'metalon_20x20_18',
    larguraPadraoMm: 3500,
    alturaPadraoMm: 2200,
    espacamentoPadraoMm: 120,
    horasMaoDeObraSugerida: 8,
    requerAcessorios: true
  },
  {
    id: 'grade',
    nome: 'Grade de Proteção',
    descricao: 'Grade fixa com requadro perimetral e barras verticais espaçadas',
    icone: 'shield',
    perfilRequadroSugerido: 'metalon_30x20_18',
    perfilPreenchimentoSugerido: 'metalon_20x20_18',
    larguraPadraoMm: 2000,
    alturaPadraoMm: 1200,
    espacamentoPadraoMm: 100,
    horasMaoDeObraSugerida: 4,
    requerAcessorios: false
  },
  {
    id: 'corrimao',
    nome: 'Corrimão / Guarda-corpo',
    descricao: 'Corrimão linear com tubo superior e montantes de fixação',
    icone: 'grip-horizontal',
    perfilRequadroSugerido: 'tubo_redondo_1_12_18',
    perfilPreenchimentoSugerido: 'metalon_20x20_18',
    larguraPadraoMm: 3000,
    alturaPadraoMm: 1000,
    espacamentoPadraoMm: 150,
    horasMaoDeObraSugerida: 5,
    requerAcessorios: false
  },
  {
    id: 'cobertura',
    nome: 'Cobertura Metálica Simples',
    descricao: 'Estrutura de telhado para garagem ou área externa com caibros e terças',
    icone: 'umbrella',
    perfilRequadroSugerido: 'metalon_50x30_18',
    perfilPreenchimentoSugerido: 'metalon_30x20_18',
    larguraPadraoMm: 4000,
    alturaPadraoMm: 3000,
    espacamentoPadraoMm: 800,
    horasMaoDeObraSugerida: 10,
    requerAcessorios: false
  }
];
