# Regression Watch: 001-mvp-orcamentos-serralheria

> Identificador da Feature: `001-mvp-orcamentos-serralheria`  
> Data: 2026-09-24  
> Âncora: Greenfield (`prd.md` + specs em `_reversa_sdd/sdd/`)  

---

## 1. Watch Principal

*Cenário greenfield: Não há regras pré-existentes confirmadas com selo 🟢 extraídas de código legado anterior. O watch principal permanece vazio até que uma extração `/reversa` sobre o novo código confirme as regras implementadas.*

| ID | Origem (arquivo, seção) | Regra esperada após mudança | Tipo de verificação | Sinal de violação |
|---|---|---|---|---|
| - | - | - | - | - |

---

## 2. Histórico de Re-extrações

*Esta seção será preenchida pelos agentes do Reversa quando for executado `/reversa` ou `/reversa-sync` para validar o código recém-criado.*

---

## 3. Arquivadas

*Nenhum item arquivado.*

---

## 4. Observações (Requisitos Implementados a Vigiar em Futuras Extrações)

Itens derivados das especificações SDD que deverão ser confirmados como 🟢 após re-extração:

- **W001:** O motor de corte linear em `src/core/calculator.js` deve manter a compensação do kerf (padrão 3mm) e cálculo em barras de 6000mm.
- **W002:** O cálculo financeiro em `src/core/pricing.js` deve manter a inclusão compulsória de rateio de consumíveis de solda e pintura para blindar margem.
- **W003:** A persistência em `src/core/storage.js` deve garantir que os orçamentos, catálogo e configurações persistam íntegros no LocalStorage com suporte a backup JSON.
- **W004:** A emissão de propostas em `src/core/pdf.js` e `src/core/whatsapp.js` deve operar de forma 100% client-side sem dependência de serviços remotos.

---
Gerado por reversa-coding em 2026-09-24T10:45:00-03:00
