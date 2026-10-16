# Investigação Técnica: Algoritmos de Corte, Precificação e Arquitetura SPA

> Identificador: `001-mvp-orcamentos-serralheria`  
> Data: `2026-09-24`  
> Feature: `_reversa_forward/001-mvp-orcamentos-serralheria/requirements.md`  

---

## 1. Otimização de Corte Linear (1D Bin Packing com Kerf)

### Contexto de Mercado
No Brasil, o padrão comercial de distribuição de perfis tubulares (metalon), cantoneiras, barras chatas e vigas leves comercializados por distribuidores de siderúrgicas (Gerdau, ArcelorMittal, Usiminas) é estritamente de **6.000 mm (6 metros)** por barra.

### O Problema do Disco de Corte (Kerf)
Cada corte efetuado em serra policorte ou serra de fita remove material equivalente à espessura do disco abrasivo ou lâmina (geralmente entre 2,5mm e 3,2mm). Em uma barra cortada em 20 pedaços de 290mm:
- Medida nominal dos pedaços: 20 x 290mm = 5.800mm (parece caber em 6.000mm com sobra teórica de 200mm).
- Perda real de kerf (19 cortes x 3mm): 57mm.
- Sobra real restante: 143mm.

Se o algoritmo ignorasse o kerf, pedaços maiores no limite físico resultariam em falta de material na prática da oficina.

### Algoritmo Escolhido: First Fit Decreasing (FFD) com Kerf
1. Ordenar a lista de pedaços em ordem decrescente de tamanho.
2. Para cada pedaço, tentar alocar na primeira barra de 6.000mm aberta que tenha espaço disponível (tamanho do pedaço + 3mm de corte).
3. Se nenhuma barra aberta comportar o pedaço, abrir uma nova barra comercial de 6.000mm.
4. Complexidade computacional: `O(n log n)`, executando em menos de 5ms para estruturas com até 200 pedaços no navegador do celular.

---

## 2. Composição de Custos e Formação de Preço (Serralheria)

### Estrutura de Custos da Oficina
Um erro clássico é aplicar multiplicadores empíricos (como "custo do ferro x 2.5"). O modelo adotado decompõe:
1. **Custos Diretos de Materiais:**
   - Quantidade inteira de barras de 6m x Preço unitário da barra.
2. **Custos Diretos de Insumos (Consumíveis):**
   - Eletrodos / arame MIG: estimado por metro linear de estrutura soldada (média 1 eletrodo a cada 1,5m de perfil montado).
   - Discos de corte e desbaste: estimado por quantidade de cortes (1 disco de corte fino a cada ~40 cortes em metalon chapa 18/16).
   - Primer e acabamento: estimado por m² de área de contato superficial (1 litro de primer cobre ~8 a 10 m² com demão única).
3. **Mão de Obra Produtiva:**
   - Horas estimadas (corte + montagem/ponteamento + solda contínua + acabamento + pintura + instalação externa) x Taxa horária da oficina.
4. **Custos Indiretos e Logística:**
   - Taxa de transporte / frete de entrega da peça acabada.
5. **Formação de Preço e BDI (Margem Líquida):**
   - Preço de Venda = Custo Total / (1 - (Margem% / 100))  
   *(garante que a margem seja uma porcentagem real sobre o faturamento).*

---

## 3. Geração Client-Side de PDF

### Comparativo de Bibliotecas
- **html2canvas + jsPDF:** Gera PDF como captura de imagem. Desvantagens: arquivo muito pesado (2-5MB), texto não selecionável e borrado no zoom.
- **jsPDF (API Vetorial Nativa):** Gera PDF diretamente com comandos de desenho vetorial (`doc.text`, `doc.rect`, `doc.line`, `doc.table`). Vantagens: arquivo minúsculo (< 50KB), texto 100% nítido e selecionável, download em menos de 100ms.
- **Decisão:** jsPDF via API nativa vetorial com layout padronizado em A4.

---

## 4. Integração com WhatsApp

### Especificação de Protocolo
- Formato: `https://wa.me/55{DDD}{NUMERO}?text={MENSAGEM_CODIFICADA}`.
- Sanitização de entrada: regex `/\D/g` para remover parênteses, traços e espaços. Validação de comprimento para 10 ou 11 dígitos no Brasil.
- Tratamento de caracteres especiais: codificação via `encodeURIComponent()` para suporte a emojis (ex: 🚪, 📐, 💰, 🛠️) e quebras de linha (`%0A`).

---
Gerado por reversa-plan em 2026-09-24T08:13:00-03:00
