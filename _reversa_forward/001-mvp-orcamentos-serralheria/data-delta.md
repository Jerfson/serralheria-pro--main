# Delta de Dados: Schemas e Estruturas de Armazenamento Local

> Identificador: `001-mvp-orcamentos-serralheria`  
> Data: `2026-09-24`  
> Feature: `_reversa_forward/001-mvp-orcamentos-serralheria/requirements.md`  

---

## 1. Visão Geral do Armazenamento

A persistência do sistema é estruturada sobre a Web Storage API (`localStorage`), dividida em 3 chaves independentes com versionamento de schema para assegurar isolamento, performance e facilidade de migração:

1. `serralheria_orcamentos_v1`: Coleção dos orçamentos gerados na aplicação.
2. `serralheria_catalogo_v1`: Catálogo de perfis metálicos, chapas e insumos com preços unitários.
3. `serralheria_config_v1`: Configurações operacionais da oficina (nome fantasia, telefone, taxas).

---

## 2. Schema: `serralheria_orcamentos_v1`

Armazena um array JSON de objetos no formato:

```typescript
interface OrcamentoItem {
  id: string; // UUID v4
  numeroSequencial: number; // Ex: 101, 102...
  dataCriacaoIso: string; // ISO 8601
  dataAtualizacaoIso: string; // ISO 8601
  status: 'aberto' | 'enviado' | 'aprovado' | 'em_producao' | 'concluido' | 'recusado';
  cliente: {
    nome: string;
    telefone: string;
    enderecoObra?: string;
  };
  estrutura: {
    tipo: 'portao_basculante' | 'portao_deslizante' | 'grade' | 'corrimao' | 'cobertura';
    larguraMm: number;
    alturaMm: number;
    profundidadeMm?: number;
    perfilRequadroId: string;
    perfilPreenchimentoId: string;
    espacamentoMm: number;
    kerfMm: number;
  };
  corteResultado: {
    barrasRequadroQtd: number;
    barrasPreenchimentoQtd: number;
    aproveitamentoPercentual: number;
    detalhesCorte: Array<{
      perfilId: string;
      barrasNecessarias: number;
      sobraTotalMm: number;
    }>;
  };
  financeiro: {
    custoMateriaisBarras: number;
    custoInsumosConsumiveis: number;
    custoPintura: number;
    horasMaoDeObra: number;
    custoMaoDeObraTotal: number;
    custoFrete: number;
    custoTotalDireto: number;
    margemLucroPercentual: number;
    precoVendaFinal: number;
    lucroLiquidoEstimado: number;
  };
  condicoesComerciais: {
    prazoEntregaDias: number;
    validadeDias: number;
    formaPagamento: string;
    observacoes?: string;
  };
}
```

---

## 3. Schema: `serralheria_catalogo_v1`

Array JSON de materiais pré-carregados (presets de fábrica) e customizados pelo usuário:

```typescript
interface MaterialItem {
  id: string; // Ex: 'metalon_50x30_18'
  categoria: 'metalon' | 'tubo_redondo' | 'cantoneira' | 'barra_chata' | 'insumo_solda' | 'pintura' | 'acessorio';
  nome: string; // Ex: "Metalon 50x30 chapa 18"
  descricao: string; // "Perfil retangular em aço carbono"
  dimensaoTexto: string; // "50x30mm"
  unidadeMedida: 'barra_6m' | 'kg' | 'unidade' | 'litro' | 'disco';
  precoUnitarioPadrao: number; // Ex: 110.00
  densidadeLinearKgM?: number; // Para estimativa de peso opcional
}
```

### Presets Padrão Inicializados
- `metalon_50x30_18`: Metalon 50x30 Chapa 18 (Barra 6m) — R$ 110,00
- `metalon_40x40_18`: Metalon 40x40 Chapa 18 (Barra 6m) — R$ 105,00
- `metalon_30x20_18`: Metalon 30x20 Chapa 18 (Barra 6m) — R$ 65,00
- `metalon_20x20_18`: Metalon 20x20 Chapa 18 (Barra 6m) — R$ 52,00
- `cantoneira_1_18`: Cantoneira 1" x 1/8" (Barra 6m) — R$ 78,00
- `barra_chata_1_18`: Barra Chata 1" x 1/8" (Barra 6m) — R$ 62,00
- `eletrodo_6013_25`: Eletrodo Serralheiro 6013 2.5mm (Kg) — R$ 28,00
- `disco_corte_4_5`: Disco de Corte Fino 4.1/2" (Unidade) — R$ 6,50
- `disco_desbaste_4_5`: Disco de Desbaste 4.1/2" (Unidade) — R$ 9,00
- `primer_anticorrosivo`: Fundo Primer Cinza (Galão 3.6L) — R$ 85,00
- `esmalte_sintetico_preto`: Tinta Esmalte Sintético Preto (Galão 3.6L) — R$ 115,00
- `roldana_portao_75`: Roldana em U para Portão 75mm (Par) — R$ 45,00
- `fechadura_bico_papagaio`: Fechadura Bico de Papagaio (Unidade) — R$ 65,00

---

## 4. Schema: `serralheria_config_v1`

Objeto JSON de configurações gerais:

```typescript
interface ConfiguracaoOficina {
  nomeFantasia: string; // Ex: "Serralheria JRV"
  telefoneContato: string; // Ex: "(11) 99999-8888"
  cidadeEstado: string; // Ex: "São Paulo - SP"
  chavePix: string; // Chave Pix para sinal
  valorHoraMaoDeObra: number; // Padrão: 50.00
  margemLucroPadrao: number; // Padrão: 40 (%)
  kerfCortePadraoMm: number; // Padrão: 3 (mm)
  validadeOrcamentoDias: number; // Padrão: 15 (dias)
}
```

---

## 5. Schema do Arquivo de Backup JSON

Formato consolidado para importação e exportação completa:

```json
{
  "versaoExportacao": "1.0",
  "dataGeracaoIso": "2026-09-24T08:14:00-03:00",
  "sistema": "sistema-seralheria",
  "dados": {
    "orcamentos": [ ... ],
    "catalogo": [ ... ],
    "configuracao": { ... }
  }
}
```

---
Gerado por reversa-plan em 2026-09-24T08:14:00-03:00
