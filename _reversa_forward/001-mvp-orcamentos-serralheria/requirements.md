# Requirements: MVP da Aplicação SPA de Orçamentos para Serralheria

> Identificador: `001-mvp-orcamentos-serralheria`  
> Data: `2026-09-24`  
> Pasta de especificações de entrada: `_reversa_sdd/`  
> Confidência: 🟡 PLANEJADO (Greenfield SDD)  

---

## 1. Resumo executivo

Entrega uma aplicação web SPA (Single Page Application) completa para proprietários de oficinas de serralheria, permitindo orçar estruturas metálicas em menos de 5 minutos com quantificação paramétrica exata de barras de 6 metros (considerando perda de corte kerf), precificação transparente de insumos e margem de lucro blindada, exportação de proposta formal em PDF e geração de mensagem pronta para envio no WhatsApp.

---

## 2. Contexto a partir das especificações SDD

| Fonte | Trecho relevante | Confidência |
|---|---|:---:|
| `_reversa_sdd/prd.md#4-escopo-in` | Escopo do MVP: Catálogo paramétrico, cálculo de barras 6m, insumos, BDI, PDF, WhatsApp e LocalStorage | 🟡 |
| `_reversa_sdd/personas.md#persona-1` | Persona Valdir: Proprietário e serralheiro operacional, foco em usabilidade mobile ágil e sem burocracia | 🟡 |
| `_reversa_sdd/sdd/motor-calculo-estruturas.md#6-requisitos-funcionais` | Algoritmo First-Fit Decreasing com kerf de 3mm e templates de 5 tipologias estruturais | 🟡 |
| `_reversa_sdd/sdd/precificacao-e-custos.md#6-requisitos-funcionais` | Composição de custo de barras + consumíveis + pintura + mão de obra + margem líquida | 🟡 |
| `_reversa_sdd/sdd/propostas-e-compartilhamento.md#6-requisitos-funcionais` | Geração client-side de PDF diagramado em A4 e link direto wa.me para WhatsApp | 🟡 |
| `_reversa_sdd/sdd/gestao-orcamentos-e-presets.md#6-requisitos-funcionais` | Gestão de status, catálogo de presets pré-carregados e rotinas de backup/importação JSON | 🟡 |

---

## 3. Personas e cenários de uso

| Persona | Objetivo | Cenário-chave |
|---|---|---|
| Valdir (Proprietário e Serralheiro Operacional) | Calcular materiais e emitir orçamento no celular em menos de 3 minutos | Recebe pedido de cotação de portão no WhatsApp, abre o sistema, digita as medidas, obtém a quantidade de barras e custos, e envia a proposta em PDF e mensagem formatada imediatamente. |

---

## 4. Regras de negócio novas ou alteradas

1. **RN-01:** O cálculo linear de perfis deve agrupar as peças obrigatoriamente em barras comerciais padrão de 6000mm, subtraindo a espessura de corte (kerf de 3mm padrão) a cada corte realizado. 🟡
2. **RN-02:** O número total de barras de 6 metros compradas no orçamento deve ser sempre um número inteiro arredondado para cima por perfil. 🟡
3. **RN-03:** A precificação deve incluir compulsoriamente taxa proporcional de consumíveis (solda/discos) e pintura base para evitar propostas com margem negativa por esquecimento de custos. 🟡
4. **RN-04:** O preço final de venda deve aplicar a margem de lucro líquida configurada pelo usuário, protegendo a lucratividade estipulada para a oficina. 🟡
5. **RN-05:** Os dados de orçamentos, tabelas de preços e configurações devem persistir 100% no cliente (client-side via LocalStorage), sem necessidade de servidor backend ou banco em nuvem no MVP. 🟡
6. **RN-06:** O sistema deve oferecer exportação e importação de backup em arquivo JSON a qualquer momento para resguardar os dados do usuário. 🟡

---

## 5. Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de aceite | Confidência |
|---|---|:---:|---|:---:|
| RF-01 | O sistema deve disponibilizar templates paramétricos para Portão Basculante, Portão Deslizante, Grade, Corrimão e Cobertura Metálica. | Must | Usuário seleciona o tipo e o formulário renderiza as medidas e perfis pertinentes. | 🟡 |
| RF-02 | O sistema deve calcular a lista de cortes e o número exato de barras de 6 metros necessárias aplicando First Fit Decreasing com kerf de corte. | Must | Resultado exibe o quantitativo inteiro de barras de 6m e o percentual de aproveitamento de sobras. | 🟡 |
| RF-03 | O sistema deve compor o custo total somando materiais, consumíveis de solda/corte, pintura, mão de obra e taxa de frete. | Must | Alterações nas horas de mão de obra ou no preço das barras recalcula o custo em menos de 50ms. | 🟡 |
| RF-04 | O sistema deve calcular o preço de venda final aplicando a margem de lucro desejada e exibir o lucro líquido projetado em R$. | Must | Exibição clara do lucro em reais antes da emissão da proposta. | 🟡 |
| RF-05 | O sistema deve compilar e disponibilizar para download a Proposta Técnica em PDF diagramada em folha A4 com memorial descritivo e dados da oficina. | Must | O PDF é gerado e baixado no navegador sem dependência de rede em menos de 2s. | 🟡 |
| RF-06 | O sistema deve gerar texto comercial formatado e botão com link direto para o WhatsApp do cliente via `https://wa.me/`. | Must | Ao clicar, o WhatsApp abre com o número do cliente e texto orçamentário pré-preenchido. | 🟡 |
| RF-07 | O sistema deve exibir painel de controle dos orçamentos com filtro e alteração de status (Aberto, Enviado, Aprovado, Em Produção, Concluído, Recusado). | Must | Transições de status são salvas instantaneamente no LocalStorage. | 🟡 |
| RF-08 | O sistema deve carregar presets de fábrica de perfis e materiais mais comuns e permitir edição rápida ou adição de novos itens. | Must | Na primeira abertura, o usuário já conta com catálogo padrão preenchido com preços médios de referência. | 🟡 |
| RF-09 | O sistema deve permitir exportar e importar arquivo de backup JSON contendo todos os dados e orçamentos da aplicação. | Must | Arquivo JSON exportado pode ser importado com sucesso restaurando 100% dos dados. | 🟡 |

---

## 6. Requisitos Não Funcionais

| Tipo | Requisito | Evidência ou justificativa | Confidência |
|---|---|---|:---:|
| Desempenho | Recálculo reativo instantâneo (< 50ms) ao alterar qualquer medida ou preço na tela | Arquitetura SPA client-side sem chamadas síncronas de rede | 🟡 |
| Portabilidade | Interface responsiva otimizada para smartphones (mobile-first) e desktops | Uso predominante por serralheiros no chão da oficina pelo celular | 🟡 |
| Segurança & Privacidade | Armazenamento local exclusivo no dispositivo (zero transmissão de dados para servidores terceiros) | Garantia de privacidade e funcionamento sem custos de hospedagem de dados | 🟡 |
| Resiliência | Recuperação íntegra de dados mesmo após fechamento da aba ou navegador | LocalStorage gerenciado com validação de schema e backup JSON | 🟡 |

---

## 7. Critérios de Aceitação

```gherkin
Cenário: Emissão rápida de orçamento completo de portão basculante
  Dado que Valdir abre a aplicação no celular
  E seleciona o modelo "Portão Basculante" com medidas 3000mm x 2200mm
  E define o requadro em Metalon 50x30 e preenchimento em Metalon 20x20
  Quando ele revisa a composição de custos com margem de 40%
  Então o sistema exibe a quantidade exata de barras de 6 metros a comprar
  E permite baixar a proposta em PDF e disparar o orçamento para o WhatsApp do cliente em menos de 3 minutos

Cenário: Prevenção contra prejuízo por esquecimento de custos
  Dado que o usuário monta uma estrutura metálica
  Quando o cálculo financeiro é executado
  Então o sistema inclui automaticamente a cota de consumíveis (solda/discos) e pintura base
  E impede a geração de orçamento sem margem de lucro definida
```

---

## 8. Prioridade MoSCoW

| Item | MoSCoW | Justificativa |
|---|:---:|---|
| RF-01 (Templates paramétricos) | Must | Funcionalidade básica para entrada rápida de medidas |
| RF-02 (Cálculo de barras de 6m com kerf) | Must | Core de valor do sistema para evitar erro de compra de materiais |
| RF-03 (Composição de custos e insumos) | Must | Evita prejuízo financeiro e esquecimento de despesas |
| RF-04 (Margem de lucro) | Must | Garante a viabilidade econômica de cada proposta |
| RF-05 (PDF formal da proposta) | Must | Eleva a percepção de profissionalismo da oficina |
| RF-06 (Disparo para WhatsApp) | Must | Canal principal de fechamento com clientes de serralheria |
| RF-07 (Painel de orçamentos) | Must | Permite acompanhar o andamento das propostas |
| RF-08 (Presets de perfis e materiais) | Must | Reduz o atrito de configuração inicial para novos usuários |
| RF-09 (Backup JSON) | Must | Protege contra perda de dados em limpeza de cache do navegador |

---

## 9. Esclarecimentos

Nenhuma dúvida impeditiva em aberto. Todas as especificações técnicas, geométricas e financeiras foram previamente delimitadas e aprovadas nas 4 specs SDD do projeto.

---
Gerado por reversa-requirements em 2026-09-24T08:11:00-03:00  
Feature: `001-mvp-orcamentos-serralheria`
