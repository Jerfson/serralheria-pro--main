/**
 * Testes Unitários: Motor Paramétrico de Cálculo de Estruturas e Barras de 6m
 * Executável via Node.js nativo (node --test)
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { otimizarCorteBarras, calcularEstruturaCompleta, calcularLoteItensMultiplos } from '../src/core/calculator.js';

test('otimizarCorteBarras: deve empacotar peças respeitando limite de 6000mm e kerf', () => {
  // 4 peças de 1450mm com kerf de 3mm
  // Peça 1: 1450 + 3 = 1453mm (resta 4547mm)
  // Peça 2: 1450 + 3 = 1453mm (resta 3094mm)
  // Peça 3: 1450 + 3 = 1453mm (resta 1641mm)
  // Peça 4: 1450 + 3 = 1453mm (resta 188mm)
  // Todas as 4 peças cabem em 1 única barra de 6000mm!
  const pecas = [
    { tamanhoMm: 1450, quantidade: 4, identificador: 'travessas' }
  ];

  const resultado = otimizarCorteBarras(pecas, 6000, 3);

  assert.equal(resultado.barrasNecessarias, 1, 'Deveria caber exatamente em 1 barra de 6m');
  assert.ok(resultado.sobraTotalMm > 0, 'Deveria haver sobra positiva');
  assert.ok(resultado.aproveitamentoPercentual > 90, 'Aproveitamento deve ser superior a 90%');
});

test('otimizarCorteBarras: deve abrir nova barra quando exceder 6000mm com kerf', () => {
  // 5 peças de 1450mm: as 4 primeiras consomem 5812mm, a 5ª exige uma segunda barra
  const pecas = [
    { tamanhoMm: 1450, quantidade: 5, identificador: 'colunas' }
  ];

  const resultado = otimizarCorteBarras(pecas, 6000, 3);

  assert.equal(resultado.barrasNecessarias, 2, 'Deveria exigir 2 barras comerciais de 6m');
});

test('calcularEstruturaCompleta: deve desdobrar e quantificar portão deslizante corretamente', () => {
  const params = {
    tipo: 'portao_deslizante',
    larguraMm: 3000,
    alturaMm: 2200,
    perfilRequadroId: 'metalon_50x30_18',
    perfilPreenchimentoId: 'metalon_20x20_18',
    espacamentoMm: 120,
    kerfMm: 3
  };

  const resultado = calcularEstruturaCompleta(params);

  assert.ok(resultado.requadro.barrasNecessarias >= 2, 'Requadro de 3x2.2m consome ao menos 2 barras de 6m');
  assert.ok(resultado.preenchimento.barrasNecessarias >= 4, 'Preenchimento vertical consome ao menos 4 barras');
  assert.ok(resultado.totalBarras6m >= 6, 'Total geral de barras do portão deve ser >= 6');
  assert.ok(resultado.aproveitamentoGeralPercentual > 70, 'Aproveitamento geral deve ser superior a 70%');
});

test('calcularEstruturaCompleta: validação de medidas mínimas de segurança', () => {
  assert.throws(() => {
    calcularEstruturaCompleta({
      tipo: 'grade',
      larguraMm: 100, // Menor que o mínimo de 400mm
      alturaMm: 1000
    });
  }, /Largura informada está abaixo do limite mínimo/);
});

test('calcularEstruturaCompleta: deve calcular lote de múltiplas grades iguais com otimização conjunta', () => {
  const params1Grade = {
    tipo: 'grade',
    larguraMm: 1200,
    alturaMm: 1000,
    espacamentoMm: 120,
    perfilRequadroId: 'metalon_40x40_18',
    perfilPreenchimentoId: 'metalon_20x20_18',
    quantidade: 1
  };

  const res1 = calcularEstruturaCompleta(params1Grade);
  assert.equal(res1.quantidade, 1);
  assert.equal(res1.dimensoes.areaM2, 1.2);

  const params4Grades = {
    ...params1Grade,
    quantidade: 4
  };

  const res4 = calcularEstruturaCompleta(params4Grades);
  assert.equal(res4.quantidade, 4);
  assert.equal(res4.dimensoes.areaM2, 4.8);
  assert.ok(res4.totalBarras6m >= res1.totalBarras6m, '4 grades devem exigir ao menos as barras de 1 grade');
  assert.ok(res4.metragemTotalMm >= res1.metragemTotalMm * 3.9, 'Metragem total deve multiplicar por 4');
});

test('calcularLoteItensMultiplos: deve consolidar peças de portão e grades com otimização de barras por perfil', () => {
  const item1Portao = calcularEstruturaCompleta({
    tipo: 'portao_deslizante',
    larguraMm: 3000,
    alturaMm: 2200,
    perfilRequadroId: 'metalon_50x30_18',
    perfilPreenchimentoId: 'metalon_20x20_18',
    quantidade: 1
  });

  const item2Grades = calcularEstruturaCompleta({
    tipo: 'grade',
    larguraMm: 1500,
    alturaMm: 1200,
    perfilRequadroId: 'metalon_50x30_18',
    perfilPreenchimentoId: 'metalon_20x20_18',
    quantidade: 3
  });

  const lote = calcularLoteItensMultiplos([item1Portao, item2Grades], 3);

  assert.ok(lote.totalBarras6m > 0, 'Deve calcular barras totais do lote');
  assert.equal(lote.perfisConsolidados.length, 2, 'Deve ter agrupado nos perfis metalon_50x30_18 e metalon_20x20_18');
  assert.ok(lote.aproveitamentoGeralPercentual > 60, 'Aproveitamento geral do lote deve ser superior a 60%');
});
