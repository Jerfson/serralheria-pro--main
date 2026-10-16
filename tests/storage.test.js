import { test } from 'node:test';
import assert from 'node:assert/strict';
import { StorageService } from '../src/core/storage.js';

test('StorageService: deve listar catalogo padrao', () => {
  const cat = StorageService.getCatalogo();
  assert.ok(Array.isArray(cat));
  assert.ok(cat.length >= 12);
});

test('StorageService: deve cadastrar, atualizar preco, reajustar e excluir material', () => {
  // 1. Cadastro
  const novo = {
    id: 'teste_metalon_80x40',
    categoria: 'metalon',
    nome: 'Metalon 80x40 Chapa 16',
    dimensaoTexto: '80x40mm',
    unidadeMedida: 'barra_6m',
    precoUnitarioPadrao: 100.00,
    densidadeLinearKgM: 2.50
  };

  StorageService.addMaterial(novo);
  let encontrado = StorageService.getMaterialById('teste_metalon_80x40');
  assert.ok(encontrado);
  assert.equal(encontrado.precoUnitarioPadrao, 100.00);

  // 2. Atualizar Preço individual
  StorageService.updatePrecoMaterial('teste_metalon_80x40', 120.00);
  encontrado = StorageService.getMaterialById('teste_metalon_80x40');
  assert.equal(encontrado.precoUnitarioPadrao, 120.00);

  // 2.1 Atualizar cadastro completo (updateMaterial)
  StorageService.updateMaterial('teste_metalon_80x40', {
    nome: 'Metalon 80x40 Chapa 14 Reforçado',
    precoUnitarioPadrao: 150.00,
    dimensaoTexto: '80x40x2.0mm'
  });
  encontrado = StorageService.getMaterialById('teste_metalon_80x40');
  assert.equal(encontrado.nome, 'Metalon 80x40 Chapa 14 Reforçado');
  assert.equal(encontrado.precoUnitarioPadrao, 150.00);

  // 3. Reajuste em Massa (+10% na categoria metalon)
  const res = StorageService.reajustarPrecos(10, 'metalon');
  assert.ok(res.afetados >= 1);
  encontrado = StorageService.getMaterialById('teste_metalon_80x40');
  assert.equal(encontrado.precoUnitarioPadrao, 165.00);

  // 4. Excluir material
  StorageService.deleteMaterial('teste_metalon_80x40');
  encontrado = StorageService.getMaterialById('teste_metalon_80x40');
  assert.equal(encontrado, null);
});

test('StorageService: deve salvar e recuperar orcamento com memorialPintura e condicoes comerciais personalizadas', () => {
  const orcamentoTeste = {
    cliente: { nome: 'Carlos Silva', telefone: '11999998888' },
    estrutura: { tipo: 'grade_tubular' },
    financeiro: { precoVendaFinal: 1200 },
    memorialPintura: 'Aplicação de fundo protetor anticorrosivo (Zarcão). Acabamento final/pintura definitiva por conta do cliente.',
    memorialMaoDeObra: 'Fabricação e esquadrejamento em oficina especializada. Instalação e chumbamento no local por conta do pedreiro/cliente.',
    condicoes: {
      formaPagamento: '50% entrada e 50% na entrega',
      prazoEntrega: '10 dias úteis',
      garantia: '12 meses'
    }
  };

  const salvo = StorageService.saveOrcamento(orcamentoTeste);
  assert.ok(salvo.id);
  assert.equal(salvo.memorialPintura, 'Aplicação de fundo protetor anticorrosivo (Zarcão). Acabamento final/pintura definitiva por conta do cliente.');
  assert.equal(salvo.memorialMaoDeObra, 'Fabricação e esquadrejamento em oficina especializada. Instalação e chumbamento no local por conta do pedreiro/cliente.');
  assert.equal(salvo.condicoes?.prazoEntrega, '10 dias úteis');

  const recuperado = StorageService.getOrcamentoById(salvo.id);
  assert.ok(recuperado);
  assert.equal(recuperado.memorialPintura, 'Aplicação de fundo protetor anticorrosivo (Zarcão). Acabamento final/pintura definitiva por conta do cliente.');
});

