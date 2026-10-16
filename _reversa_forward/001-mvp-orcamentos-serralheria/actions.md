# Actions: MVP da Aplicação SPA de Orçamentos para Serralheria

> Identificador: `001-mvp-orcamentos-serralheria`  
> Data: `2026-09-24`  
> Roadmap: `_reversa_forward/001-mvp-orcamentos-serralheria/roadmap.md`  

---

## Resumo

| Métrica | Valor |
|---|---|
| Total de ações | 13 |
| Paralelizáveis (`[//]`) | 6 |
| Maior cadeia de dependência | 5 (T001 → T005 → T006 → T010 → T011) |

---

## Fase 1, Preparação

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|---|---|---|---|---|:---:|:---:|
| T001 | Criar estrutura base de pastas e catálogo de presets padrão de perfis (metalon, cantoneira, insumos) | - | `[//]` | `src/core/presets.js` | 🟢 | `[X]` |
| T002 | Implementar camada de persistência `Storage` com Repository pattern sobre LocalStorage, CRUD de orçamentos, catálogo e exportação/importação de backup JSON | T001 | - | `src/core/storage.js` | 🟢 | `[X]` |

---

## Fase 2, Testes

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|---|---|---|---|---|:---:|:---:|
| T003 | Criar testes automatizados para o algoritmo First-Fit Decreasing de corte de barras de 6000mm com compensação de kerf | T001 | `[//]` | `tests/calculator.test.js` | 🟢 | `[X]` |
| T004 | Criar testes automatizados para a fórmula de custos de insumos, consumíveis, mão de obra e formação de preço BDI | T001 | `[//]` | `tests/pricing.test.js` | 🟢 | `[X]` |

---

## Fase 3, Núcleo

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|---|---|---|---|---|:---:|:---:|
| T005 | Implementar motor paramétrico de desdobramento de estruturas (portão basculante/deslizante, grade, corrimão, cobertura) e empacotamento linear de barras de 6m | T001, T003 | - | `src/core/calculator.js` | 🟢 | `[X]` |
| T006 | Implementar motor financeiro de precificação: custo de barras, rateio de solda/discos, pintura, mão de obra e margem de lucro líquida | T001, T004 | - | `src/core/pricing.js` | 🟢 | `[X]` |
| T007 | Implementar gerador vetorial de Proposta Comercial em PDF em folha A4 com memorial descritivo e dados da oficina via jsPDF | T001 | `[//]` | `src/core/pdf.js` | 🟢 | `[X]` |
| T008 | Implementar sintetizador de mensagem comercial formatada para WhatsApp e link de abertura direta wa.me com sanitização de telefone | T001 | `[//]` | `src/core/whatsapp.js` | 🟢 | `[X]` |

---

## Fase 4, Integração

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|---|---|---|---|---|:---:|:---:|
| T009 | Criar estrutura da interface SPA responsiva (HTML5, Tailwind CSS, ícones Lucide) com navegação em abas e modais | T001 | `[//]` | `index.html` | 🟢 | `[X]` |
| T010 | Implementar controlador da UI vinculando os formulários reativos ao motor de cálculo de barras e precificação em tempo real | T002, T005, T006, T009 | - | `src/ui/app.js` | 🟢 | `[X]` |
| T011 | Integrar ações de emissão de proposta (download do PDF e disparo via WhatsApp) e controle de status do orçamento no painel | T007, T008, T010 | - | `src/ui/app.js` | 🟢 | `[X]` |

---

## Fase 5, Polimento

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|---|---|---|---|---|:---:|:---:|
| T012 | Implementar tela de catálogo de preços (edição inline de valores de perfis/insumos) e botões de exportação/importação de backup JSON | T002, T010 | - | `src/ui/app.js` | 🟢 | `[X]` |
| T013 | Adicionar alertas visuais (toasts), validação de campos obrigatórios, tratamento de edge cases e documentação de uso no README | T010, T011, T012 | - | `README.md` | 🟢 | `[X]` |

---

## Notas de execução

Reservado para anotações do agente de codificação `/reversa-coding`.

---

## Histórico de alterações

| Data | Alteração | Autor |
|---|---|---|
| 2026-09-24 | Versão inicial gerada por `/reversa-to-do` com 13 ações atômicas | reversa-to-do |
