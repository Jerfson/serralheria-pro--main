/**
 * Testes Unitários: Motor Financeiro de Custos e Formação de Preço
 * Executável via Node.js nativo (node --test)
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { calcularComposicaoPreco } from '../src/core/pricing.js';

test('calcularComposicaoPreco: deve calcular custos diretos e preço de venda com margem de 40%', () => {
  const dadosEstrutura = {
    requadro: {
      perfilId: 'metalon_50x30_18',
      barrasNecessarias: 3,
      metragemLinearTotalMm: 10400
    },
    preenchimento: {
      perfilId: 'metalon_20x20_18',
      barrasNecessarias: 5,
      metragemLinearTotalMm: 24000
    },
    tipo: 'portao_deslizante',
    areaM2: 7.7
  };

  const catalogoPrecos = [
    { id: 'metalon_50x30_18', precoUnitarioPadrao: 110.00 },
    { id: 'metalon_20x20_18', precoUnitarioPadrao: 52.00 },
    { id: 'roldana_portao_75', precoUnitarioPadrao: 45.00 },
    { id: 'fechadura_bico_papagaio', precoUnitarioPadrao: 65.00 }
  ];

  const configFinanceira = {
    valorHoraMaoDeObra: 50.00,
    horasMaoDeObra: 8,
    taxaFrete: 80.00,
    margemLucroPercentual: 40 // 40% de margem sobre a venda
  };

  const resultado = calcularComposicaoPreco(dadosEstrutura, configFinanceira, catalogoPrecos);

  // Custo esperado de barras: 3 x 110 = 330 + 5 x 52 = 260 => 590
  assert.equal(resultado.custoMateriaisBarras, 590.00);

  // Mão de obra esperada: 8 x 50 = 400
  assert.equal(resultado.custoMaoDeObraTotal, 400.00);

  // Frete esperado: 80
  assert.equal(resultado.custoFrete, 80.00);

  // Consumíveis e pintura devem ter valores positivos calculados
  assert.ok(resultado.custoInsumosConsumiveis > 0, 'Consumíveis devem ser calculados');
  assert.ok(resultado.custoPintura > 0, 'Pintura deve ser calculada');

  // Preço de venda deve ser estritamente maior que o custo direto
  assert.ok(resultado.precoVendaFinal > resultado.custoTotalDireto, 'Preço de venda deve superar custo direto');

  // Lucro líquido em R$ deve ser positivo
  assert.ok(resultado.lucroLiquidoEstimado > 0, 'Lucro líquido projetado deve ser positivo');

  // Proporção de margem de lucro calculada: lucro / precoVenda deve bater ~40%
  const margemEfetiva = (resultado.lucroLiquidoEstimado / resultado.precoVendaFinal) * 100;
  assert.ok(Math.abs(margemEfetiva - 40) < 0.5, 'Margem líquida efetiva deve bater aproximadamente 40%');
});

test('calcularComposicaoPreco: rejeição de margem inválida (>= 100% ou < 0%)', () => {
  const dadosEstrutura = {
    requadro: { perfilId: 'metalon_50x30_18', barrasNecessarias: 1 },
    preenchimento: { perfilId: 'metalon_20x20_18', barrasNecessarias: 1 },
    areaM2: 2.0
  };

  assert.throws(() => {
    calcularComposicaoPreco(dadosEstrutura, { margemLucroPercentual: 100 }, []);
  }, /Margem de lucro inválida/);

  assert.throws(() => {
    calcularComposicaoPreco(dadosEstrutura, { margemLucroPercentual: -10 }, []);
  }, /Margem de lucro inválida/);
});

test('calcularComposicaoPreco: deve respeitar valores manuais de insumos, pintura, acessorios e frete', () => {
  const dadosEstrutura = {
    requadro: { perfilId: 'perfil_a', barrasNecessarias: 1 },
    preenchimento: { perfilId: 'perfil_b', barrasNecessarias: 0 }
  };
  const catalogo = [
    { id: 'perfil_a', precoUnitarioPadrao: 130.00 }
  ];
  const configManual = {
    custoInsumosConsumiveis: 21.16,
    custoPintura: 25.00,
    custoAcessorios: 0.00,
    custoMaoDeObraTotal: 400.00,
    custoFrete: 80.00,
    margemLucroPercentual: 10
  };

  const resultado = calcularComposicaoPreco(dadosEstrutura, configManual, catalogo);

  assert.equal(resultado.custoMateriaisBarras, 130.00);
  assert.equal(resultado.custoInsumosConsumiveis, 21.16);
  assert.equal(resultado.custoPintura, 25.00);
  assert.equal(resultado.custoAcessorios, 0.00);
  assert.equal(resultado.custoMaoDeObraTotal, 400.00);
  assert.equal(resultado.custoFrete, 80.00);
  assert.equal(resultado.custoTotalDireto, 656.16);
  assert.equal(resultado.margemLucroPercentual, 10);
  assert.equal(resultado.precoVendaFinal, 729.07);
  assert.equal(resultado.lucroLiquidoEstimado, 72.91);
});

test('calcularComposicaoPrecoLote: deve consolidar custos manuais definidos individualmente por item', async () => {
  const { calcularComposicaoPrecoLote, calcularCustosSugeridosItem } = await import('../src/core/pricing.js');

  const item1 = {
    tipo: 'grade_tubular',
    quantidade: 2,
    comprimentoTotalPerfisMm: 20000,
    dimensoes: { areaM2: 3.0 },
    custos: {
      insumos: 35.00,
      pintura: 40.00,
      ferragens: 0.00,
      maoObra: 300.00,
      frete: 0.00
    }
  };

  const item2 = {
    tipo: 'portao_social',
    quantidade: 1,
    comprimentoTotalPerfisMm: 12000,
    dimensoes: { areaM2: 2.2 },
    custos: {
      insumos: 25.00,
      pintura: 30.00,
      ferragens: 65.00,
      maoObra: 250.00,
      frete: 80.00
    }
  };

  const dadosLote = {
    perfisConsolidados: [
      { perfilId: 'metalon_50x30_18', barrasNecessarias: 4, metragemLinearTotalMm: 22000 }
    ],
    itens: [item1, item2],
    metragemTotalMm: 32000
  };

  const catalogo = [
    { id: 'metalon_50x30_18', precoUnitarioPadrao: 100.00 }
  ];

  const resultado = calcularComposicaoPrecoLote(dadosLote, { margemLucroPercentual: 40 }, catalogo);

  // Barras: 4 x 100 = 400
  assert.equal(resultado.custoMateriaisBarras, 400.00);
  // Insumos somados: 35 + 25 = 60
  assert.equal(resultado.custoInsumosConsumiveis, 60.00);
  // Pintura somada: 40 + 30 = 70
  assert.equal(resultado.custoPintura, 70.00);
  // Ferragens somadas: 0 + 65 = 65
  assert.equal(resultado.custoAcessorios, 65.00);
  // Mão de obra somada: 300 + 250 = 550
  assert.equal(resultado.custoMaoDeObraTotal, 550.00);
  // Frete somado: 0 + 80 = 80
  assert.equal(resultado.custoFrete, 80.00);
  // Total Direto: 400 + 60 + 70 + 65 + 550 + 80 = 1225.00
  assert.equal(resultado.custoTotalDireto, 1225.00);
  // Preço de venda com 40% margem: 1225 / 0.6 = 2041.67
  assert.equal(resultado.precoVendaFinal, 2041.67);

  // Testa também calcularCustosSugeridosItem
  const sugestaoItem = calcularCustosSugeridosItem(item1, { valorHoraMaoDeObra: 50 }, catalogo);
  assert.ok(sugestaoItem.insumos > 0);
  assert.ok(sugestaoItem.pintura > 0);
  assert.equal(sugestaoItem.ferragens, 0); // grade não tem roldana/fechadura
  assert.ok(sugestaoItem.maoObra > 0);
});

