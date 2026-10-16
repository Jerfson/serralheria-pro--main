# Roadmap: MVP da Aplicação SPA de Orçamentos para Serralheria

> Identificador: `001-mvp-orcamentos-serralheria`  
> Data: `2026-09-24`  
> Requirements: `_reversa_forward/001-mvp-orcamentos-serralheria/requirements.md`  
> Confidência: 🟡 PLANEJADO (Greenfield SDD)  

---

## 1. Resumo da abordagem

A solução é projetada como uma Single Page Application (SPA) client-side nativa, modular, ultra-leve e reativa. A arquitetura desacopla a interface de usuário do motor de regras de negócio através de módulos ES6 puros (`calculator.js`, `pricing.js`, `storage.js`, `pdf.js`, `whatsapp.js`), garantindo que todos os cálculos de barras de 6 metros, rateio de insumos e precificação ocorram em memória em menos de 50ms, sem qualquer latência de rede. A persistência é gerenciada localmente via LocalStorage com carga automática de presets brasileiros de serralheria e proteção contra perda de dados via rotinas de backup JSON.

---

## 2. Princípios aplicados

| Princípio | Como a feature se relaciona | Status |
|---|---|:---:|
| Zero Backend Overhead (Leveza e Custo Zero) | Execução 100% no navegador sem exigir infraestrutura de nuvem, banco de dados ou servidor dedicado | Respeita |
| Precisão Paramétrica Industrial | Quantificação fundamentada no corte real de barras comerciais fechadas de 6000mm com kerf de 3mm | Respeita |
| Usabilidade Mobile-First para Chão de Oficina | Interface responsiva e direta para operação ágil com uma mão pelo celular | Respeita |
| Privacidade Local Integral | Retenção exclusiva de contatos e valores no dispositivo do cliente | Respeita |

---

## 3. Decisões técnicas

| ID | Decisão | Justificativa | Alternativas descartadas | Confidência |
|---|---|---|---|:---:|
| D-01 | Arquitetura SPA Vanilla JS (ES Modules) com Tailwind CSS e Lucide Icons | Máxima velocidade de execução, zero tempo de build, inicialização em < 50ms e portabilidade imediata em qualquer hospedagem estática | React/Vite com Node.js (descartado pelo overhead de compilação para o escopo inicial) | 🟢 |
| D-02 | Algoritmo First-Fit Decreasing com compensação de serra (kerf de 3mm) | Empacotamento linear eficiente com complexidade O(n log n), minimizando sobras de corte em barras comerciais de 6m | Busca exaustiva NP-completa (muito lenta) ou soma métrica ingênua (gera falta de barras) | 🟢 |
| D-03 | Persistência local estruturada via Web Storage API (LocalStorage) com Repository Pattern | Permite uso offline completo na oficina sem autenticação ou custos de servidor | Backend REST com PostgreSQL/Firebase (descartado pelo usuário por complexidade e custo) | 🟢 |
| D-04 | Geração de propostas PDF no navegador com jsPDF | Autonomia total client-side sem depender de serviços externos de renderização | Puppeteer em servidor (dependência de backend externa cara e lenta) | 🟢 |
| D-05 | Integração WhatsApp via protocolo direto `https://wa.me/` com codificação URL | Disparo imediato e gratuito para o WhatsApp Web ou aplicativo mobile sem custos de API oficial | API Cloud do WhatsApp da Meta (paga, complexa e burocrática para serralherias) | 🟢 |

---

## 4. Premissas

| Premissa | Origem (`requirements.md`) | Risco se errada |
|---|---|---|
| A espessura do disco de corte padrão de 3mm (kerf) é suficiente para a maioria das serras de fita e policortes da oficina | `requirements.md#4-rn-01` | Mínimo: o sistema permite ao usuário ajustar o kerf de 1mm a 6mm nas configurações avançadas |
| O catálogo padrão de 15 presets (metalon 20x20, 30x20, 50x30, cantoneiras, chapas) cobre mais de 80% das obras residenciais de serralheria | `requirements.md#5-rf-08` | Baixo: o usuário pode adicionar e salvar qualquer novo perfil personalizado |

---

## 5. Delta arquitetural

| Componente | Arquivo de origem nas specs | Tipo de mudança | Resumo |
|---|---|---|---|
| `motor-calculo-estruturas` | `_reversa_sdd/sdd/motor-calculo-estruturas.md` | componente-novo | Módulo `src/core/calculator.js` com desdobramento geométrico e corte First-Fit |
| `precificacao-e-custos` | `_reversa_sdd/sdd/precificacao-e-custos.md` | componente-novo | Módulo `src/core/pricing.js` com rateio de solda, pintura, mão de obra e margem líquida |
| `propostas-e-compartilhamento` | `_reversa_sdd/sdd/propostas-e-compartilhamento.md` | componente-novo | Módulos `src/core/pdf.js` e `src/core/whatsapp.js` para PDF e link wa.me |
| `gestao-orcamentos-e-presets` | `_reversa_sdd/sdd/gestao-orcamentos-e-presets.md` | componente-novo | Módulo `src/core/storage.js` com persistência LocalStorage, presets e backup JSON |
| `interface-spa` | `_reversa_sdd/prd.md` | componente-novo | Arquivos `index.html` e `src/ui/app.js` orquestrando a experiência visual |

---

## 6. Delta no modelo de dados

- Resumo das mudanças: Definição dos schemas de `OrcamentoRegistro`, `CatalogoMaterialPreset`, `ParametrosEstrutura` e `ConfiguracaoOficina` persistidos em chaves dedicadas no LocalStorage (`serralheria_orcamentos_v1`, `serralheria_catalogo_v1`, `serralheria_config_v1`).
- Detalhe completo em: `_reversa_forward/001-mvp-orcamentos-serralheria/data-delta.md`

---

## 7. Delta de contratos externos

Não há chamadas de API externa de rede para servidores remotos (arquitetura 100% client-side offline). O único contrato externo é o protocolo de esquema de URL do WhatsApp (`https://wa.me/55...`).

---

## 8. Plano de migração

Como o projeto é greenfield (novo do zero), não há migração de banco legado. O sistema implementa migração automática na inicialização: caso não encontre presets no LocalStorage, inicializa a base de fábrica sem atrito.

---

## 9. Riscos e mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|---|---|---|---|
| Limpeza acidental de cache pelo usuário no navegador | Alto | Média | Botão proeminente de "Exportar Backup (JSON)" no cabeçalho e confirmação antes de ações destrutivas |
| Variação no rendimento de tinta e eletrodos por oficina | Médio | Média | Coeficientes de consumíveis configuráveis no painel de configurações |
| Bloqueio de pop-up no clique de abertura do WhatsApp | Baixo | Média | Fallback com botão secundário de "Copiar Mensagem" para colar na conversa |

---

## 10. Critério de pronto

- [ ] Todos os módulos de cálculo (`calculator.js`, `pricing.js`, `storage.js`, `pdf.js`, `whatsapp.js`) implementados e testados
- [ ] Interface SPA responsiva (`index.html` + `app.js`) com visualização instantânea de barras, custos e margem
- [ ] Geração e download funcional de Proposta em PDF em folha A4 com memorial descritivo
- [ ] Abertura imediata do WhatsApp com mensagem comercial estruturada
- [ ] Exportação e importação de arquivo JSON de backup operando perfeitamente
- [ ] Todas as ações de `actions.md` marcadas `[X]`

---
Gerado por reversa-plan em 2026-09-24T08:12:00-03:00  
Feature: `001-mvp-orcamentos-serralheria`
