# Impacto no Projeto: 001-mvp-orcamentos-serralheria

> Data: 2026-09-24  
> Identificador da Feature: `001-mvp-orcamentos-serralheria`  
> Âncora: `_reversa_sdd/prd.md` + especificações em `_reversa_sdd/sdd/`  
> Estado da Política: `allowLegacyEdits: true` com caminhos liberados em `allowedPaths` (`index.html`, `README.md`, `src/**`, `tests/**`)  

---

## 1. Contexto Greenfield

Feature greenfield, sem código legado pré-existente no projeto. Todos os componentes foram criados a partir das especificações de requisitos e engenharia reversa do SDD.

---

## 2. Arquivos Criados e Mapeamento de Componentes

| Arquivo Criado | Componente SDD Correspondente | Tipo de Impacto | Severidade | Justificativa |
|---|---|---|:---:|---|
| `src/core/presets.js` | `_reversa_sdd/sdd/gestao-orcamentos-e-presets.md` | componente-novo | LOW | Catálogo padrão brasileiro de perfis tubulares, cantoneiras e consumíveis de serralheria |
| `src/core/storage.js` | `_reversa_sdd/sdd/gestao-orcamentos-e-presets.md` | componente-novo | MEDIUM | Camada de persistência LocalStorage, CRUD de orçamentos e rotinas de backup/importação JSON |
| `src/core/calculator.js` | `_reversa_sdd/sdd/motor-calculo-estruturas.md` | componente-novo | HIGH | Motor de cálculo paramétrico e algoritmo First-Fit Decreasing com kerf de corte em barras de 6m |
| `src/core/pricing.js` | `_reversa_sdd/sdd/precificacao-e-custos.md` | componente-novo | HIGH | Motor financeiro: rateio de consumíveis (solda/discos), pintura, mão de obra e margem de lucro BDI |
| `src/core/pdf.js` | `_reversa_sdd/sdd/propostas-e-compartilhamento.md` | componente-novo | MEDIUM | Geração client-side de proposta formal em folha A4 com memorial descritivo via jsPDF |
| `src/core/whatsapp.js` | `_reversa_sdd/sdd/propostas-e-compartilhamento.md` | componente-novo | MEDIUM | Sintetizador de mensagem comercial e link direto wa.me com sanitização de telefone |
| `index.html` | `_reversa_sdd/prd.md` | componente-novo | HIGH | Shell da Single Page Application responsiva com Tailwind CSS e ícones Lucide |
| `src/ui/app.js` | `_reversa_sdd/prd.md` | componente-novo | HIGH | Controlador da UI conectando formulários reativos, visualizadores de barras e modais |
| `tests/calculator.test.js` | `_reversa_sdd/sdd/motor-calculo-estruturas.md` | componente-novo | LOW | Suíte de testes unitários automatizados do motor de corte linear de 6000mm |
| `tests/pricing.test.js` | `_reversa_sdd/sdd/precificacao-e-custos.md` | componente-novo | LOW | Suíte de testes unitários automatizados da composição financeira e margem |
| `README.md` | `_reversa_sdd/prd.md` | componente-novo | LOW | Documentação completa de execução, arquitetura e rastreabilidade SDD |

---

## 3. Diff Conceitual por Componente

- **`motor-calculo-estruturas`:** Implementou o First-Fit Decreasing com dedução de kerf (3mm) e desdobramento paramétrico de 5 tipologias (portão deslizante/basculante, grade, corrimão e cobertura).
- **`precificacao-e-custos`:** Estabeleceu a fórmula de custo direto (barras, ferragens, consumíveis proporcionais e pintura) e aplicou divisor de margem de lucro líquida sobre a venda.
- **`propostas-e-compartilhamento`:** Disponibilizou geração de PDF em folha A4 sem dependência de servidor e integração direta com WhatsApp.
- **`gestao-orcamentos-e-presets`:** Implementou o ciclo de vida completo de orçamentos (Kanban de status), persistência isolada e rotina de backup JSON.

---

## 4. Regras Preservadas

*Projeto greenfield: nenhuma regra legada pré-existente.*

---

## 5. Regras Modificadas

*Projeto greenfield: nenhuma regra legada pré-existente.*

---
Gerado por reversa-coding em 2026-09-24T10:45:00-03:00
