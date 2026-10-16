# Guia de Onboarding e Validação da Feature

> Identificador: `001-mvp-orcamentos-serralheria`  
> Data: `2026-09-24`  
> Feature: `_reversa_forward/001-mvp-orcamentos-serralheria/requirements.md`  

---

## 1. Como Executar a Aplicação

A aplicação foi desenvolvida com arquitetura Single Page Application (SPA) client-side nativa. Não requer instalação de servidores pesados nem compilações demoradas.

### Opção A: Execução Direta no Navegador
- Dê um duplo-clique no arquivo `index.html` na raiz do projeto (ou arraste-o para uma janela do Google Chrome, Edge, Safari ou Firefox no computador ou celular).

### Opção B: Servidor Estático Local (Opcional)
Se preferir rodar via HTTP local:
```bash
npx serve .
# ou
python -m http.server 3000
```
Acesse `http://localhost:3000` no seu navegador.

---

## 2. Roteiro Passo a Passo de Teste e Validação

### Passo 1: Inicialização e Verificação de Presets
1. Abra a aplicação.
2. Observe que o painel inicial carrega instantaneamente sem erros de console.
3. Clique na aba **"Catálogo / Preços"**:
   - Confirme que os perfis padrão mais usados (Metalon 50x30, 40x40, 30x20, 20x20, cantoneiras, eletrodos, discos e tintas) já estão listados com preços médios sugeridos.
   - Edite o preço de uma barra (ex: mude Metalon 50x30 de R$ 110,00 para R$ 115,00) e salve.

### Passo 2: Configuração Inicial da Serralheria
1. Acesse a aba **"Configurações"**.
2. Preencha os dados da sua oficina:
   - **Nome Fantasia:** *Serralheria Modelo*
   - **Telefone / WhatsApp:** *(11) 98765-4321*
   - **Cidade - UF:** *São Paulo - SP*
   - **Chave Pix:** *seuemail@exemplo.com*
3. Clique em **"Salvar Configurações"**.

### Passo 3: Criação do Primeiro Orçamento (Portão Deslizante)
1. Clique no botão **"Novo Orçamento"**.
2. No formulário de estrutura:
   - **Cliente:** *Carlos Alberto*
   - **Telefone:** *(11) 99887-7665*
   - **Tipo de Estrutura:** *Portão Deslizante*
   - **Largura:** *3500 mm* (3,5 metros)
   - **Altura:** *2200 mm* (2,2 metros)
   - **Perfil do Requadro:** *Metalon 50x30*
   - **Perfil do Preenchimento:** *Metalon 20x20*
   - **Espaçamento entre barras:** *120 mm*
3. Observe o bloco de **"Plano de Corte e Barras de 6m"**:
   - O sistema calcula automaticamente a quantidade exata de barras de 6 metros para o requadro e para o preenchimento, aplicando a compensação de 3mm do disco de corte (*kerf*).

### Passo 4: Formação de Preço e Margem de Lucro
1. No bloco financeiro:
   - Veja o custo direto das barras totalizado.
   - Veja o rateio automático de consumíveis (solda/discos) e pintura base.
   - Insira *8 horas* de mão de obra e *R$ 80,00* de frete.
   - Defina a margem de lucro em *40%*.
2. O sistema exibe o **Preço Final de Venda** e o **Lucro Líquido em Reais** com clareza instantânea.
3. Clique em **"Salvar Orçamento"**.

### Passo 5: Emissão da Proposta PDF e Disparo no WhatsApp
1. No orçamento recém-salvo, clique no botão **"Emitir Proposta"**:
2. Clique em **"Baixar PDF"**:
   - O arquivo PDF diagramado em folha A4 com os dados da oficina, memorial descritivo dos itens e valor total é baixado imediatamente no seu dispositivo.
3. Clique em **"Enviar WhatsApp"**:
   - Uma nova aba do WhatsApp abre com o número do cliente e a mensagem comercial elegante, com resumo da estrutura, valores e condições pré-formatados para envio com 1 clique.

### Passo 6: Gestão de Status e Backup de Segurança
1. Volte ao painel principal:
   - Altere o status do orçamento de *"Enviado"* para *"Aprovado"*.
   - Duplique o orçamento para criar uma variação rapidamente.
2. Acesse a aba **"Configurações / Backup"**:
   - Clique em **"Exportar Backup Completo"** e baixe o arquivo `.json`.
   - Limpe os dados de teste e clique em **"Importar Backup"** selecionando o arquivo JSON: confirme que 100% dos dados foram restaurados perfeitamente.

---
Gerado por reversa-plan em 2026-09-24T08:14:00-03:00
