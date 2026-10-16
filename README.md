# Serralheria Pro — Sistema de Orçamentos e Corte de Barras de 6m

> Aplicação web SPA (Single Page Application) desenvolvida para proprietários de serralheria, focada na rápida elaboração de orçamentos precisos, cálculo paramétrico de corte de barras comerciais de 6 metros, controle de desperdício (kerf), formação de preço com BDI e emissão de propostas para WhatsApp e PDF.

---

## 🚀 Principais Funcionalidades

1. **Calculador Paramétrico de Estruturas:**
   - Templates pré-configurados para: **Portão Basculante**, **Portão Deslizante**, **Grade de Proteção**, **Corrimão** e **Cobertura Metálica**.
   - Entrada de medidas milimétricas e cálculo automático do número exato de barras comerciais fechadas de 6.000 mm a comprar na distribuidora.
   - Algoritmo de empacotamento linear **First-Fit Decreasing (FFD)** com dedução do disco de corte de serra (*kerf* de 3mm padrão).
   - Indicador visual da metragem total de perfis e percentual de aproveitamento / sobra de material.

2. **Motor de Precificação e BDI (Margem Blindada):**
   - Rateio compulsório de consumíveis (eletrodos/arame de solda e discos de corte/desbaste).
   - Cálculo automático de fundo primer e pintura esmalte com base na área superficial.
   - Custo de mão de obra em horas produtivas e taxa de frete.
   - Aplicação de Margem de Lucro configurável (Markup divisor sobre a venda), exibindo o preço de venda e o lucro líquido real em R$.

3. **Compartilhamento Ágil de Propostas:**
   - **Proposta em PDF A4:** Gerada 100% no cliente via jsPDF, com cabeçalho da oficina, memorial descritivo dos itens, memorial de ferragens e condições comerciais de pagamento.
   - **Envio Direto no WhatsApp:** Sintetiza mensagem comercial elegante com emojis, valores e link direto `https://wa.me/` para disparo com 1 clique.

4. **Painel de Gestão e Armazenamento 100% Local:**
   - Controle de status das propostas: *Em Aberto*, *Enviado*, *Aprovado*, *Em Produção*, *Concluído* e *Recusado*.
   - Duplicação ágil de orçamentos anteriores para acelerar cotações semelhantes.
   - Catálogo de preços de perfis e materiais com valores médios de referência do mercado brasileiro.
   - Persistência em `localStorage` com botões de **Exportar Backup (JSON)** e **Importar Backup (JSON)**.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, JavaScript Moderno (ES6 Modules), Tailwind CSS (CDN), Lucide Icons (CDN).
- **Geração de PDF:** jsPDF (Client-Side).
- **Testes Automatizados:** Test Runner Nativo do Node.js (`node:test` e `node:assert/strict`).
- **Arquitetura:** SPA pura, 100% offline-ready, sem necessidade de servidores backend ou bancos de dados externos.

---

## 📦 Como Executar

### 1. Execução Direta no Navegador
Dê um duplo clique no arquivo `index.html` ou arraste-o para o Google Chrome, Microsoft Edge, Firefox ou Safari.

### 2. Execução via Servidor Local (Opcional)
Se preferir rodar através de um servidor HTTP local:
```bash
# Com Node.js:
npx serve .

# Ou com Python:
python -m http.server 3000
```
Abra `http://localhost:3000` no seu navegador.

---

## 🧪 Como Rodar os Testes Automatizados

A aplicação inclui suíte de testes unitários para os algoritmos matemáticos de corte e formação de preço:

```bash
node --test tests/*.test.js
```

---

## 📐 Especificações Reversa (Spec-Driven Development)

Este software foi projetado e documentado através do framework **Reversa**:

- [`_reversa_sdd/newproject-brief.md`](_reversa_sdd/newproject-brief.md) — Brief original do projeto.
- [`_reversa_sdd/ideation.md`](_reversa_sdd/ideation.md) — Brainstorm estruturado da dor e métricas de sucesso.
- [`_reversa_sdd/personas.md`](_reversa_sdd/personas.md) — Mapeamento do usuário *Valdir* (proprietário operacional).
- [`_reversa_sdd/prd.md`](_reversa_sdd/prd.md) — Product Requirements Document completo do sistema.
- [`_reversa_sdd/sdd/motor-calculo-estruturas.md`](_reversa_sdd/sdd/motor-calculo-estruturas.md) — Spec SDD do motor de corte (Score: 100/100).
- [`_reversa_sdd/sdd/precificacao-e-custos.md`](_reversa_sdd/sdd/precificacao-e-custos.md) — Spec SDD da precificação BDI (Score: 100/100).
- [`_reversa_sdd/sdd/propostas-e-compartilhamento.md`](_reversa_sdd/sdd/propostas-e-compartilhamento.md) — Spec SDD do PDF e WhatsApp (Score: 100/100).
- [`_reversa_sdd/sdd/gestao-orcamentos-e-presets.md`](_reversa_sdd/sdd/gestao-orcamentos-e-presets.md) — Spec SDD do LocalStorage e Presets (Score: 100/100).

---

## 📄 Licença

Este projeto é disponibilizado sob a licença MIT.
