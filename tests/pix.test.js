import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularCRC16, gerarPayloadPix, extrairPercentualEntrada, gerarDadosPixEntrada } from '../src/core/pix.js';

test('calcularCRC16: deve calcular CRC16-CCITT de acordo com o padrão Pix', () => {
  // Teste padrão com payload parcial Pix
  const texto = '00020126360014br.gov.bcb.pix0114+55119876543215204000053039865802BR5918Serralheria Modelo6009SAO PAULO62070503***6304';
  const crc = calcularCRC16(texto);
  assert.equal(crc.length, 4);
  assert.match(crc, /^[0-9A-F]{4}$/);
});

test('gerarPayloadPix: deve montar string BR Code com todos os campos obrigatórios', () => {
  const payload = gerarPayloadPix({
    chavePix: '11987654321',
    nomeRecebedor: 'Serralheria JRV',
    cidade: 'São Paulo',
    valor: 450.50,
    txid: 'ORC101'
  });

  assert.ok(payload.startsWith('000201'));
  assert.ok(payload.includes('br.gov.bcb.pix'));
  assert.ok(payload.includes('11987654321'));
  assert.ok(payload.includes('450.50'));
  assert.ok(payload.includes('ORC101'));
  assert.equal(payload.slice(-4), calcularCRC16(payload.slice(0, -4)));
});

test('extrairPercentualEntrada: deve identificar porcentagens no texto comercial', () => {
  assert.equal(extrairPercentualEntrada('50% de sinal no pedido + 50% na entrega'), 50);
  assert.equal(extrairPercentualEntrada('Entrada de 30% e restante em 3x'), 30);
  assert.equal(extrairPercentualEntrada('À vista com desconto'), 50); // fallback padrão
});

test('gerarDadosPixEntrada: deve calcular valor de entrada e gerar QR Code', () => {
  const dados = gerarDadosPixEntrada({
    chavePix: 'pix@oficina.com',
    nomeRecebedor: 'Oficina do Aço',
    cidade: 'Curitiba',
    valorTotal: 2000.00,
    entradaOuPercentual: '50% de sinal',
    txid: '102'
  });

  assert.ok(dados);
  assert.equal(dados.valorTotal, 2000.00);
  assert.equal(dados.valorEntrada, 1000.00);
  assert.equal(dados.percentualEntrada, 50);
  assert.ok(dados.payloadPix.length > 50);
  assert.ok(dados.dataUrl.startsWith('data:image/'));
});
