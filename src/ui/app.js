/**
 * Controlador da Interface SPA (UI Controller)
 * Conecta eventos visuais aos motores de cálculo, persistência e emissão.
 */

import { StorageService } from '../core/storage.js';
import { calcularEstruturaCompleta, calcularLoteItensMultiplos } from '../core/calculator.js';
import { calcularComposicaoPreco, calcularComposicaoPrecoLote, calcularCustosSugeridosItem } from '../core/pricing.js';
import { gerarPropostaPDF } from '../core/pdf.js';
import { formatarMensagemWhatsapp, dispararWhatsapp } from '../core/whatsapp.js';
import { STRUCTURE_TEMPLATES, DEFAULT_PRESETS } from '../core/presets.js';
import { gerarDadosPixEntrada } from '../core/pix.js';

class AppController {
  constructor() {
    this.abaAtiva = 'orcamentos';
    this.filtroStatus = 'todos';
    this.termoBusca = '';
    this.tipologiaAtivaId = 'portao_deslizante';
    this.orcamentoEmEdicaoId = null;
    this.orcamentoModal = null;
    this.dadosPixAtual = null;
    this.ultimoCalculo = null;
    this.itensOrcamento = []; // Lista de estruturas (carrinho de itens)
    this.filtroCatalogoCategoria = 'todos';
    this.termoBuscaCatalogo = '';
  }

  init() {
    StorageService.init();

    this.renderizarTipologias();
    this.renderizarSelectsPerfis();
    this.carregarConfiguracoesNaTela();
    this.renderizarListaOrcamentos();
    this.renderizarTabelaCatalogo();
    this.recalcularEmTempoReal();

    this.mudarAba('orcamentos');
    this.atualizarIcones();
  }

  atualizarIcones() {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }

  mostrarToast(mensagem, tipo = 'sucesso') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const bgCor = tipo === 'erro' ? 'bg-rose-600' : 'bg-slate-900';
    const icone = tipo === 'erro' ? 'alert-triangle' : 'check-circle';

    toast.className = `flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-white text-xs font-semibold ${bgCor} pointer-events-auto transition transform translate-y-2 opacity-0 duration-200`;
    toast.innerHTML = `
      <i data-lucide="${icone}" class="w-4 h-4 text-sky-400"></i>
      <span>${mensagem}</span>
    `;

    container.appendChild(toast);
    this.atualizarIcones();

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-x-4');
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  // ─── Navegação em Abas ─────────────────────────────────────

  mudarAba(nomeAba) {
    this.abaAtiva = nomeAba;
    const abas = ['orcamentos', 'novo', 'catalogo', 'config'];

    abas.forEach(aba => {
      const el = document.getElementById(`aba-${aba}`);
      const btnDesktop = document.getElementById(`nav-btn-${aba}`);

      if (el) {
        if (aba === nomeAba) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }

      if (btnDesktop) {
        if (aba === nomeAba) {
          btnDesktop.className = 'nav-tab px-3 py-2 rounded-md text-sm font-bold bg-slate-800 text-white shadow-sm';
        } else {
          btnDesktop.className = 'nav-tab px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors';
        }
      }
    });

    if (nomeAba === 'orcamentos') {
      this.renderizarListaOrcamentos();
    } else if (nomeAba === 'catalogo') {
      this.renderizarTabelaCatalogo();
    } else if (nomeAba === 'config') {
      this.carregarConfiguracoesNaTela();
    }

    this.atualizarIcones();
  }

  // ─── Tipologias e Selects de Perfis ────────────────────────

  renderizarTipologias() {
    const container = document.getElementById('tipologia-selector');
    if (!container) return;

    container.innerHTML = STRUCTURE_TEMPLATES.map(tpl => {
      const ativa = tpl.id === this.tipologiaAtivaId;
      const borda = ativa ? 'border-sky-600 bg-sky-50/70 text-sky-950 font-bold' : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700';

      return `
        <button type="button" onclick="window.app.selecionarTipologia('${tpl.id}')" class="flex flex-col items-center justify-center p-3 rounded-xl border-2 text-center transition ${borda}">
          <i data-lucide="${tpl.icone || 'box'}" class="w-6 h-6 mb-1 text-sky-600"></i>
          <span class="text-xs leading-tight">${tpl.nome}</span>
        </button>
      `;
    }).join('');

    this.atualizarIcones();
  }

  selecionarTipologia(tipoId) {
    this.tipologiaAtivaId = tipoId;
    const tpl = STRUCTURE_TEMPLATES.find(t => t.id === tipoId);
    if (!tpl) return;

    // Aplica medidas padrão sugeridas
    const largInput = document.getElementById('campo-largura-mm');
    const altInput = document.getElementById('campo-altura-mm');
    const espInput = document.getElementById('campo-espacamento-mm');
    const horasInput = document.getElementById('campo-horas-trabalho');

    if (largInput) largInput.value = tpl.larguraPadraoMm;
    if (altInput) altInput.value = tpl.alturaPadraoMm;
    if (espInput) espInput.value = tpl.espacamentoPadraoMm;
    if (horasInput) horasInput.value = tpl.horasMaoDeObraSugerida;

    // Seleciona os perfis sugeridos
    const reqSelect = document.getElementById('campo-perfil-requadro');
    const preSelect = document.getElementById('campo-perfil-preenchimento');
    if (reqSelect) reqSelect.value = tpl.perfilRequadroSugerido;
    if (preSelect) preSelect.value = tpl.perfilPreenchimentoSugerido;

    this.renderizarTipologias();
    this.recalcularCustosSugeridosItemAtual(true);
    this.recalcularEmTempoReal(true);
  }

  renderizarSelectsPerfis() {
    const catalogo = StorageService.getCatalogo();
    const perfis = catalogo.filter(m => m.unidadeMedida === 'barra_6m');

    const optionsHtml = perfis.map(m => `
      <option value="${m.id}">${m.nome} — R$ ${m.precoUnitarioPadrao.toFixed(2)}/barra</option>
    `).join('');

    const reqSelect = document.getElementById('campo-perfil-requadro');
    const preSelect = document.getElementById('campo-perfil-preenchimento');

    if (reqSelect) reqSelect.innerHTML = optionsHtml;
    if (preSelect) preSelect.innerHTML = optionsHtml;

    // Defaults
    if (reqSelect) reqSelect.value = 'metalon_50x30_18';
    if (preSelect) preSelect.value = 'metalon_20x20_18';
  }

  // ─── Recálculo Reativo em Tempo Real ───────────────────────

  // ─── Gerenciamento de Múltiplos Itens (Carrinho) ────────────

  obterItemFormularioAtual() {
    const qtdInput = document.getElementById('campo-quantidade');
    const quantidade = Math.max(1, Math.floor(Number(qtdInput?.value) || 1));
    const larguraMm = Number(document.getElementById('campo-largura-mm')?.value) || 3000;
    const alturaMm = Number(document.getElementById('campo-altura-mm')?.value) || 2200;
    const espacamentoMm = Number(document.getElementById('campo-espacamento-mm')?.value) || 120;
    const perfilRequadroId = document.getElementById('campo-perfil-requadro')?.value || 'metalon_50x30_18';
    const perfilPreenchimentoId = document.getElementById('campo-perfil-preenchimento')?.value || 'metalon_20x20_18';
    const config = StorageService.getConfig();

    return calcularEstruturaCompleta({
      tipo: this.tipologiaAtivaId,
      quantidade,
      larguraMm,
      alturaMm,
      espacamentoMm,
      perfilRequadroId,
      perfilPreenchimentoId,
      kerfMm: config.kerfCortePadraoMm || 3
    });
  }

  recalcularCustosSugeridosItemAtual(forcar = false) {
    const inputInsumos = document.getElementById('item-custo-insumos');
    const inputPintura = document.getElementById('item-custo-pintura');
    const inputFerragens = document.getElementById('item-custo-ferragens');
    const inputMaoObra = document.getElementById('item-custo-mao-obra');
    const inputFrete = document.getElementById('item-custo-frete');

    if (!forcar && inputInsumos?.value && inputPintura?.value && inputMaoObra?.value) {
      this.atualizarSubtotalItemAtual();
      return;
    }

    try {
      const itemCalculado = this.obterItemFormularioAtual();
      const config = StorageService.getConfig();
      const catalogo = StorageService.getCatalogo();
      const sugestao = calcularCustosSugeridosItem(itemCalculado, config, catalogo);

      if (inputInsumos) inputInsumos.value = sugestao.insumos.toFixed(2);
      if (inputPintura) inputPintura.value = sugestao.pintura.toFixed(2);
      if (inputFerragens) inputFerragens.value = sugestao.ferragens.toFixed(2);
      if (inputMaoObra) inputMaoObra.value = sugestao.maoObra.toFixed(2);
      if (inputFrete) inputFrete.value = sugestao.frete.toFixed(2);

      this.atualizarSubtotalItemAtual();
    } catch (e) {
      console.warn('Erro ao sugerir custos do item:', e.message);
    }
  }

  atualizarSubtotalItemAtual() {
    try {
      const itemCalculado = this.obterItemFormularioAtual();
      const catalogo = StorageService.getCatalogo();

      let custoBarrasItem = 0;
      for (const p of (itemCalculado.planoCortePorPerfil || [])) {
        const mat = catalogo.find(m => m.id === p.perfilId);
        const preco = mat ? Number(mat.precoUnitarioPadrao) || 85 : 85;
        custoBarrasItem += (p.barrasNecessarias || 0) * preco;
      }

      const insumos = Math.max(0, Number(document.getElementById('item-custo-insumos')?.value) || 0);
      const pintura = Math.max(0, Number(document.getElementById('item-custo-pintura')?.value) || 0);
      const ferragens = Math.max(0, Number(document.getElementById('item-custo-ferragens')?.value) || 0);
      const maoObra = Math.max(0, Number(document.getElementById('item-custo-mao-obra')?.value) || 0);
      const frete = Math.max(0, Number(document.getElementById('item-custo-frete')?.value) || 0);

      const totalItem = custoBarrasItem + insumos + pintura + ferragens + maoObra + frete;
      const elSubtotal = document.getElementById('subtotal-item-atual-val');
      if (elSubtotal) {
        elSubtotal.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalItem);
      }

      // Se nenhum item foi adicionado ao carrinho ainda, sincroniza a Seção 4 com os custos desta peça
      if (this.itensOrcamento.length === 0) {
        const inputInsumos = document.getElementById('campo-custo-insumos');
        const inputPintura = document.getElementById('campo-custo-pintura');
        const inputAcessorios = document.getElementById('campo-custo-acessorios');
        const inputMaoObra = document.getElementById('campo-custo-mao-obra');
        const inputFrete = document.getElementById('campo-custo-frete');

        if (inputInsumos && document.activeElement !== inputInsumos) inputInsumos.value = insumos.toFixed(2);
        if (inputPintura && document.activeElement !== inputPintura) inputPintura.value = pintura.toFixed(2);
        if (inputAcessorios && document.activeElement !== inputAcessorios) inputAcessorios.value = ferragens.toFixed(2);
        if (inputMaoObra && document.activeElement !== inputMaoObra) inputMaoObra.value = maoObra.toFixed(2);
        if (inputFrete && document.activeElement !== inputFrete) inputFrete.value = (frete > 0 ? frete : 80).toFixed(2);

        this.recalcularEmTempoReal(false);
      }
    } catch (e) {
      console.warn('Erro ao atualizar subtotal do item:', e.message);
    }
  }

  sincronizarCustosConsolidadosParaSecao4() {
    if (this.itensOrcamento.length === 0) return;

    const inputInsumos = document.getElementById('campo-custo-insumos');
    const inputPintura = document.getElementById('campo-custo-pintura');
    const inputAcessorios = document.getElementById('campo-custo-acessorios');
    const inputMaoObra = document.getElementById('campo-custo-mao-obra');
    const inputFrete = document.getElementById('campo-custo-frete');

    const totalInsumos = this.itensOrcamento.reduce((s, it) => s + (it.custos?.insumos || 0), 0);
    const totalPintura = this.itensOrcamento.reduce((s, it) => s + (it.custos?.pintura || 0), 0);
    const totalFerragens = this.itensOrcamento.reduce((s, it) => s + (it.custos?.ferragens || 0), 0);
    const totalMaoObra = this.itensOrcamento.reduce((s, it) => s + (it.custos?.maoObra || 0), 0);
    const totalFrete = this.itensOrcamento.reduce((s, it) => s + (it.custos?.frete || 0), 0);

    if (inputInsumos) inputInsumos.value = totalInsumos.toFixed(2);
    if (inputPintura) inputPintura.value = totalPintura.toFixed(2);
    if (inputAcessorios) inputAcessorios.value = totalFerragens.toFixed(2);
    if (inputMaoObra) inputMaoObra.value = totalMaoObra.toFixed(2);
    if (inputFrete) inputFrete.value = totalFrete > 0 ? totalFrete.toFixed(2) : (StorageService.getConfig().taxaFretePadrao || 80).toFixed(2);
  }

  adicionarItemAoOrcamento() {
    try {
      const itemCalculado = this.obterItemFormularioAtual();
      const catalogo = StorageService.getCatalogo();

      const insumos = Math.max(0, Number(document.getElementById('item-custo-insumos')?.value) || 0);
      const pintura = Math.max(0, Number(document.getElementById('item-custo-pintura')?.value) || 0);
      const ferragens = Math.max(0, Number(document.getElementById('item-custo-ferragens')?.value) || 0);
      const maoObra = Math.max(0, Number(document.getElementById('item-custo-mao-obra')?.value) || 0);
      const frete = Math.max(0, Number(document.getElementById('item-custo-frete')?.value) || 0);

      let custoBarrasItem = 0;
      for (const p of (itemCalculado.planoCortePorPerfil || [])) {
        const mat = catalogo.find(m => m.id === p.perfilId);
        const preco = mat ? Number(mat.precoUnitarioPadrao) || 85 : 85;
        custoBarrasItem += (p.barrasNecessarias || 0) * preco;
      }
      const custoDiretoItem = custoBarrasItem + insumos + pintura + ferragens + maoObra + frete;

      const novoItem = {
        id: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        ...itemCalculado,
        custos: {
          insumos,
          pintura,
          ferragens,
          maoObra,
          frete
        },
        custoBarrasEstimado: custoBarrasItem,
        custoDiretoTotal: custoDiretoItem
      };

      this.itensOrcamento.push(novoItem);

      this.sincronizarCustosConsolidadosParaSecao4();
      this.renderizarListaItensOrcamento();
      this.recalcularEmTempoReal(false);

      const nome = itemCalculado.tipo.replace(/_/g, ' ');
      this.mostrarToast(`Item adicionado: ${itemCalculado.quantidade}x ${nome}!`);
    } catch (err) {
      this.mostrarToast(`Erro ao adicionar item: ${err.message}`, 'erro');
    }
  }

  removerItemDoOrcamento(itemId) {
    this.itensOrcamento = this.itensOrcamento.filter(it => it.id !== itemId);
    this.sincronizarCustosConsolidadosParaSecao4();
    this.renderizarListaItensOrcamento();
    this.recalcularEmTempoReal(false);
    this.mostrarToast('Item removido do orçamento.');
  }

  renderizarListaItensOrcamento() {
    const container = document.getElementById('lista-itens-orcamento-container');
    const badgeCount = document.getElementById('contagem-itens-orcamento');
    if (!container) return;

    if (badgeCount) {
      badgeCount.textContent = this.itensOrcamento.length || 1;
    }

    if (this.itensOrcamento.length === 0) {
      container.innerHTML = `
        <div class="text-xs text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-lg p-3 text-center">
          <span>Este orçamento está usando apenas a peça configurada acima. Para orçar múltiplos portões ou grades juntos, defina as medidas, custos e clique no botão <b>Adicionar Item ao Orçamento</b>.</span>
        </div>
      `;
      this.atualizarIcones();
      return;
    }

    const formatBRL = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);

    container.innerHTML = this.itensOrcamento.map((it, idx) => {
      const nomeTipo = (it.tipo || 'estrutura').replace(/_/g, ' ');
      const largMm = it.dimensoes?.larguraMm || it.larguraMm;
      const altMm = it.dimensoes?.alturaMm || it.alturaMm;
      const qtd = it.quantidade || 1;
      const barras = it.totalBarras6m || 0;
      const c = it.custos || {};

      return `
        <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100/70 transition text-xs space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-[11px]">${idx + 1}</span>
              <div>
                <span class="font-bold text-slate-800 capitalize text-sm">${qtd}x ${nomeTipo}</span>
                <span class="text-slate-500 block text-[11px]">${largMm} x ${altMm} mm • ${barras} barras 6m</span>
              </div>
            </div>
            <button type="button" onclick="window.app.removerItemDoOrcamento('${it.id}')" title="Remover este item" class="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>

          <!-- Tags de Custos do Item -->
          <div class="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-200/80 text-[11px]">
            <span class="px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 font-medium">Insumos: R$ ${(c.insumos || 0).toFixed(2)}</span>
            <span class="px-2 py-0.5 rounded bg-amber-100/80 text-amber-800 font-medium">Pintura: R$ ${(c.pintura || 0).toFixed(2)}</span>
            <span class="px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 font-medium">Ferragens: R$ ${(c.ferragens || 0).toFixed(2)}</span>
            <span class="px-2 py-0.5 rounded bg-sky-100/80 text-sky-800 font-medium">M.O.: R$ ${(c.maoObra || 0).toFixed(2)}</span>
            ${c.frete > 0 ? `<span class="px-2 py-0.5 rounded bg-emerald-100/80 text-emerald-800 font-medium">Frete: R$ ${c.frete.toFixed(2)}</span>` : ''}
            <span class="ml-auto px-2 py-0.5 rounded bg-slate-900 text-white font-bold">Custo Direto: ${formatBRL(it.custoDiretoTotal || 0)}</span>
          </div>
        </div>
      `;
    }).join('');

    this.atualizarIcones();
  }

  // ─── Recálculo Reativo em Tempo Real ───────────────────────

  recalcularEmTempoReal(redefinirCustos = false) {
    const qtdInput = document.getElementById('campo-quantidade');
    const quantidade = Math.max(1, Math.floor(Number(qtdInput?.value) || 1));
    const larguraMm = Number(document.getElementById('campo-largura-mm')?.value) || 3000;
    const alturaMm = Number(document.getElementById('campo-altura-mm')?.value) || 2200;
    const espacamentoMm = Number(document.getElementById('campo-espacamento-mm')?.value) || 120;
    const perfilRequadroId = document.getElementById('campo-perfil-requadro')?.value || 'metalon_50x30_18';
    const perfilPreenchimentoId = document.getElementById('campo-perfil-preenchimento')?.value || 'metalon_20x20_18';

    const inputInsumos = document.getElementById('campo-custo-insumos');
    const inputPintura = document.getElementById('campo-custo-pintura');
    const inputAcessorios = document.getElementById('campo-custo-acessorios');
    const inputMaoObra = document.getElementById('campo-custo-mao-obra');
    const inputFrete = document.getElementById('campo-custo-frete');
    const inputMargem = document.getElementById('campo-margem-manual');
    const sliderMargem = document.getElementById('campo-margem-slider');

    const config = StorageService.getConfig();
    const catalogo = StorageService.getCatalogo();

    // Atualiza labels auxiliares de medidas e quantidade do formulário ativo
    const qtdLabel = document.getElementById('label-quantidade-resumo');
    if (qtdLabel) {
      qtdLabel.textContent = quantidade === 1 ? '1 unidade idêntica' : `${quantidade} unidades idênticas`;
    }

    const largLabel = document.getElementById('largura-metros-label');
    const altLabel = document.getElementById('altura-metros-label');
    const areaLabel = document.getElementById('label-area-m2');
    const kerfLabel = document.getElementById('label-kerf');

    if (largLabel) largLabel.textContent = `${(larguraMm / 1000).toFixed(2)} metros`;
    if (altLabel) altLabel.textContent = `${(alturaMm / 1000).toFixed(2)} metros`;
    const areaM2Unitaria = (larguraMm * alturaMm) / 1_000_000;
    const areaM2Total = areaM2Unitaria * quantidade;
    if (areaLabel) {
      areaLabel.textContent = quantidade > 1 
        ? `${areaM2Total.toFixed(1)} m² (${areaM2Unitaria.toFixed(1)} m²/un)` 
        : `${areaM2Total.toFixed(1)} m²`;
    }
    if (kerfLabel) kerfLabel.textContent = `${config.kerfCortePadraoMm || 3}mm`;

    // Atualiza sugestões e subtotal do item em edição se necessário
    const itemInsumosInput = document.getElementById('item-custo-insumos');
    if (redefinirCustos || !itemInsumosInput?.value) {
      this.recalcularCustosSugeridosItemAtual(redefinirCustos);
    } else {
      this.atualizarSubtotalItemAtual();
    }

    try {
      // 1. Motor de Corte do item atualmente editado
      const itemAtualCalculado = calcularEstruturaCompleta({
        tipo: this.tipologiaAtivaId,
        quantidade,
        larguraMm,
        alturaMm,
        espacamentoMm,
        perfilRequadroId,
        perfilPreenchimentoId,
        kerfMm: config.kerfCortePadraoMm || 3
      });

      // 2. Se houver itens na lista (carrinho), consolida todo o lote
      const listaParaCalcular = this.itensOrcamento.length > 0 
        ? this.itensOrcamento 
        : [itemAtualCalculado];

      const resultadoLote = calcularLoteItensMultiplos(listaParaCalcular, config.kerfCortePadraoMm || 3);

      // 3. Se for redefinição ou primeira carga, calcula estimativas sugeridas
      const precisaSugerir = redefinirCustos ||
        !inputInsumos?.value ||
        !inputPintura?.value ||
        !inputMaoObra?.value;

      if (precisaSugerir) {
        if (this.itensOrcamento.length > 0) {
          this.sincronizarCustosConsolidadosParaSecao4();
        } else {
          const margemSug = Number(inputMargem?.value) || Number(sliderMargem?.value) || 40;
          const sugestao = calcularComposicaoPrecoLote(resultadoLote, {
            valorHoraMaoDeObra: config.valorHoraMaoDeObra || 50,
            taxaFrete: 80,
            margemLucroPercentual: margemSug
          }, catalogo);

          if (inputInsumos) inputInsumos.value = sugestao.custoInsumosConsumiveis.toFixed(2);
          if (inputPintura) inputPintura.value = sugestao.custoPintura.toFixed(2);
          if (inputAcessorios) inputAcessorios.value = sugestao.custoAcessorios.toFixed(2);
          if (inputMaoObra) inputMaoObra.value = sugestao.custoMaoDeObraTotal.toFixed(2);
          if (inputFrete) inputFrete.value = sugestao.custoFrete.toFixed(2);
          if (inputMargem) inputMargem.value = margemSug;
          if (sliderMargem) sliderMargem.value = margemSug;
        }
      }

      // 4. Lê valores manuais atuais
      const custoInsumos = inputInsumos && inputInsumos.value !== '' ? Number(inputInsumos.value) || 0 : 0;
      const custoPintura = inputPintura && inputPintura.value !== '' ? Number(inputPintura.value) || 0 : 0;
      const custoAcessorios = inputAcessorios && inputAcessorios.value !== '' ? Number(inputAcessorios.value) || 0 : 0;
      const custoMaoObra = inputMaoObra && inputMaoObra.value !== '' ? Number(inputMaoObra.value) || 0 : 0;
      const custoFrete = inputFrete && inputFrete.value !== '' ? Number(inputFrete.value) || 0 : 0;
      const margemPercentual = inputMargem && inputMargem.value !== '' ? Number(inputMargem.value) || 40 : 40;

      // 5. Calcula Composição Financeira consolidada do lote
      const resultadoFinanceiro = calcularComposicaoPrecoLote(resultadoLote, {
        custoInsumosConsumiveis: custoInsumos,
        custoPintura,
        custoAcessorios,
        custoMaoDeObraTotal: custoMaoObra,
        custoFrete,
        margemLucroPercentual: margemPercentual
      }, catalogo);

      this.ultimoCalculo = {
        estrutura: itemAtualCalculado,
        lote: resultadoLote,
        itens: listaParaCalcular,
        financeiro: resultadoFinanceiro
      };

      // Atualiza Card de Barras
      const totalBarrasEl = document.getElementById('resumo-total-barras');
      const badgeAprovEl = document.getElementById('badge-aproveitamento');
      if (totalBarrasEl) totalBarrasEl.textContent = resultadoLote.totalBarras6m;
      if (badgeAprovEl) {
        badgeAprovEl.textContent = `Aproveitamento ${resultadoLote.aproveitamentoGeralPercentual}%`;
      }

      // Renderiza dinamicamente as barras por perfil no card escuro
      const containerBarras = document.getElementById('container-detalhe-barras-perfis');
      if (containerBarras) {
        containerBarras.innerHTML = resultadoLote.perfisConsolidados.map(p => {
          const mat = catalogo.find(m => m.id === p.perfilId);
          const nomePerfil = mat?.dimensaoTexto || p.perfilId.replace(/_/g, ' ');
          return `
            <div class="flex justify-between items-center bg-slate-800/60 p-2 rounded border border-slate-700/60">
              <div>
                <span class="font-semibold text-slate-200 capitalize">${nomePerfil}</span>
                <div class="text-[11px] text-slate-400">${(p.metragemLinearTotalMm / 1000).toFixed(1)}m lineares necessários</div>
              </div>
              <div class="text-right">
                <span class="text-sm font-bold text-sky-400">${p.barrasNecessarias} barras</span>
                <div class="text-[11px] text-slate-400">Sobra: ${p.sobraTotalMm}mm</div>
              </div>
            </div>
          `;
        }).join('');
      }

      // Atualiza Linhas de Custo Financeiro
      const formatBRL = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);

      const elCustoBarras = document.getElementById('custo-barras-val');
      const elCustoTotal = document.getElementById('custo-total-direto-val');
      const elPrecoVenda = document.getElementById('preco-venda-final-destaque');
      const elLucroReais = document.getElementById('lucro-reais-destaque');

      if (elCustoBarras) elCustoBarras.textContent = formatBRL(resultadoFinanceiro.custoMateriaisBarras);
      if (elCustoTotal) elCustoTotal.textContent = formatBRL(resultadoFinanceiro.custoTotalDireto);
      if (elPrecoVenda) elPrecoVenda.textContent = formatBRL(resultadoFinanceiro.precoVendaFinal);
      if (elLucroReais) elLucroReais.textContent = formatBRL(resultadoFinanceiro.lucroLiquidoEstimado);

    } catch (err) {
      console.warn('Erro momentâneo no cálculo:', err.message);
    }
  }

  recalcularComValoresManuais() {
    this.recalcularEmTempoReal(false);
  }

  ajustarMargemManual(valor) {
    const num = Math.min(94, Math.max(1, Number(valor) || 0));
    const inputManual = document.getElementById('campo-margem-manual');
    const slider = document.getElementById('campo-margem-slider');
    if (inputManual && document.activeElement !== inputManual) {
      inputManual.value = num;
    }
    if (slider) slider.value = num;
    this.recalcularEmTempoReal(false);
  }

  ajustarMargemSlider(valor) {
    const inputManual = document.getElementById('campo-margem-manual');
    if (inputManual) inputManual.value = valor;
    this.recalcularEmTempoReal(false);
  }

  restaurarValoresCalculados() {
    this.recalcularCustosSugeridosItemAtual(true);
    this.recalcularEmTempoReal(true);
    this.mostrarToast('Estimativas automáticas recalculadas!');
  }

  incrementarQuantidade() {
    const input = document.getElementById('campo-quantidade');
    if (!input) return;
    const atual = Math.floor(Number(input.value) || 1);
    if (atual < 100) {
      input.value = atual + 1;
      this.recalcularEmTempoReal(false);
    }
  }

  decrementarQuantidade() {
    const input = document.getElementById('campo-quantidade');
    if (!input) return;
    const atual = Math.floor(Number(input.value) || 1);
    if (atual > 1) {
      input.value = atual - 1;
      this.recalcularEmTempoReal(false);
    }
  }

  // ─── CRUD de Orçamentos ────────────────────────────────────

  salvarOrcamentoAtual() {
    const nomeCliente = document.getElementById('campo-cliente-nome')?.value?.trim();
    const telCliente = document.getElementById('campo-cliente-telefone')?.value?.trim();
    const endereco = document.getElementById('campo-cliente-endereco')?.value?.trim();

    if (!nomeCliente) {
      this.mostrarToast('Por favor, informe o nome do cliente.', 'erro');
      document.getElementById('campo-cliente-nome')?.focus();
      return;
    }
    if (!telCliente) {
      this.mostrarToast('Por favor, informe o telefone do cliente.', 'erro');
      document.getElementById('campo-cliente-telefone')?.focus();
      return;
    }

    this.recalcularEmTempoReal();
    if (!this.ultimoCalculo) {
      this.mostrarToast('Erro ao processar as medidas da estrutura.', 'erro');
      return;
    }

    const quantidade = Math.max(1, Math.floor(Number(document.getElementById('campo-quantidade')?.value) || 1));
    const config = StorageService.getConfig();
    const orcExistente = this.orcamentoEmEdicaoId ? StorageService.getOrcamentoById(this.orcamentoEmEdicaoId) : null;

    const inputMemPintura = document.getElementById('campo-memorial-pintura');
    const inputMemMaoObra = document.getElementById('campo-memorial-mao-obra');
    const inputCondPag = document.getElementById('campo-cond-pagamento');
    const inputCondPrazo = document.getElementById('campo-cond-prazo');
    const inputCondGarantia = document.getElementById('campo-cond-garantia');

    const memorialPintura = inputMemPintura?.value?.trim() || orcExistente?.memorialPintura || config.memorialPintura || 'Aplicação de fundo protetor anticorrosivo (Zarcão). Acabamento final/pintura definitiva por conta do cliente.';
    const memorialMaoDeObra = inputMemMaoObra?.value?.trim() || orcExistente?.memorialMaoDeObra || config.memorialMaoDeObra || 'Fabricação e esquadrejamento em oficina especializada. Instalação e chumbamento no local por conta do pedreiro/cliente.';
    const condicoes = {
      formaPagamento: inputCondPag?.value?.trim() || orcExistente?.condicoes?.formaPagamento || config.condicoesFormaPagamento || '50% de sinal no pedido + 50% na retirada/entrega.',
      prazoEntrega: inputCondPrazo?.value?.trim() || orcExistente?.condicoes?.prazoEntrega || config.condicoesPrazoEntrega || '15 a 20 dias úteis a contar da aprovação do sinal.',
      garantia: inputCondGarantia?.value?.trim() || orcExistente?.condicoes?.garantia || config.condicoesGarantia || '12 meses para soltura de soldas e funcionamento estrutural.'
    };

    const orcamento = {
      id: this.orcamentoEmEdicaoId || undefined,
      cliente: {
        nome: nomeCliente,
        telefone: telCliente,
        enderecoObra: endereco
      },
      itens: this.itensOrcamento.length > 0 ? this.itensOrcamento : [this.ultimoCalculo.estrutura],
      estrutura: {
        tipo: this.tipologiaAtivaId,
        quantidade,
        larguraMm: Number(document.getElementById('campo-largura-mm')?.value),
        alturaMm: Number(document.getElementById('campo-altura-mm')?.value),
        espacamentoMm: Number(document.getElementById('campo-espacamento-mm')?.value),
        perfilRequadroId: document.getElementById('campo-perfil-requadro')?.value,
        perfilPreenchimentoId: document.getElementById('campo-perfil-preenchimento')?.value,
        totalBarras6m: this.ultimoCalculo.lote?.totalBarras6m || this.ultimoCalculo.estrutura.totalBarras6m,
        aproveitamentoPercentual: this.ultimoCalculo.lote?.aproveitamentoGeralPercentual || this.ultimoCalculo.estrutura.aproveitamentoGeralPercentual
      },
      financeiro: this.ultimoCalculo.financeiro,
      memorialPintura,
      memorialMaoDeObra,
      condicoes
    };

    const salvo = StorageService.saveOrcamento(orcamento);
    this.orcamentoEmEdicaoId = null;
    this.itensOrcamento = [];
    this.renderizarListaItensOrcamento();
    this.mostrarToast(`Orçamento #${salvo.numeroSequencial} gravado com sucesso!`);

    this.mudarAba('orcamentos');
  }

  limparFormulario() {
    this.orcamentoEmEdicaoId = null;
    this.itensOrcamento = [];
    this.renderizarListaItensOrcamento();
    const titulo = document.getElementById('form-titulo');
    if (titulo) titulo.textContent = 'Novo Orçamento Paramétrico';

    const nomeInput = document.getElementById('campo-cliente-nome');
    const telInput = document.getElementById('campo-cliente-telefone');
    const endInput = document.getElementById('campo-cliente-endereco');
    const qtdInput = document.getElementById('campo-quantidade');
    if (nomeInput) nomeInput.value = '';
    if (telInput) telInput.value = '';
    if (endInput) endInput.value = '';
    if (qtdInput) qtdInput.value = 1;

    const config = StorageService.getConfig();
    const inputMemPintura = document.getElementById('campo-memorial-pintura');
    const inputMemMaoObra = document.getElementById('campo-memorial-mao-obra');
    const inputCondPag = document.getElementById('campo-cond-pagamento');
    const inputCondPrazo = document.getElementById('campo-cond-prazo');
    const inputCondGarantia = document.getElementById('campo-cond-garantia');

    if (inputMemPintura) inputMemPintura.value = config.memorialPintura || 'Aplicação de fundo protetor anticorrosivo (Zarcão). Acabamento final/pintura definitiva por conta do cliente.';
    if (inputMemMaoObra) inputMemMaoObra.value = config.memorialMaoDeObra || 'Fabricação e esquadrejamento em oficina especializada. Instalação e chumbamento no local por conta do pedreiro/cliente.';
    if (inputCondPag) inputCondPag.value = config.condicoesFormaPagamento || '50% de sinal no pedido + 50% na retirada/entrega.';
    if (inputCondPrazo) inputCondPrazo.value = config.condicoesPrazoEntrega || '15 a 20 dias úteis a contar da aprovação do sinal.';
    if (inputCondGarantia) inputCondGarantia.value = config.condicoesGarantia || '12 meses para soltura de soldas e funcionamento estrutural.';

    this.selecionarTipologia('portao_deslizante');
    this.mostrarToast('Formulário pronto para novo orçamento.');
  }

  editarOrcamento(id) {
    const orc = StorageService.getOrcamentoById(id);
    if (!orc) return;

    this.orcamentoEmEdicaoId = orc.id;
    this.itensOrcamento = Array.isArray(orc.itens) ? [...orc.itens] : [];
    this.renderizarListaItensOrcamento();

    const titulo = document.getElementById('form-titulo');
    if (titulo) titulo.textContent = `Editar Orçamento #${orc.numeroSequencial}`;

    // Preenche dados do cliente
    const nomeInput = document.getElementById('campo-cliente-nome');
    const telInput = document.getElementById('campo-cliente-telefone');
    const endInput = document.getElementById('campo-cliente-endereco');
    if (nomeInput) nomeInput.value = orc.cliente?.nome || '';
    if (telInput) telInput.value = orc.cliente?.telefone || '';
    if (endInput) endInput.value = orc.cliente?.enderecoObra || '';

    // Preenche tipologia, quantidade e medidas
    const est = orc.estrutura || {};
    this.tipologiaAtivaId = est.tipo || 'portao_deslizante';

    const qtdInput = document.getElementById('campo-quantidade');
    const largInput = document.getElementById('campo-largura-mm');
    const altInput = document.getElementById('campo-altura-mm');
    const espInput = document.getElementById('campo-espacamento-mm');
    if (qtdInput) qtdInput.value = est.quantidade || 1;
    if (largInput) largInput.value = est.larguraMm || 3000;
    if (altInput) altInput.value = est.alturaMm || 2200;
    if (espInput) espInput.value = est.espacamentoMm || 120;

    const reqSelect = document.getElementById('campo-perfil-requadro');
    const preSelect = document.getElementById('campo-perfil-preenchimento');
    if (reqSelect) reqSelect.value = est.perfilRequadroId || 'metalon_50x30_18';
    if (preSelect) preSelect.value = est.perfilPreenchimentoId || 'metalon_20x20_18';

    // Preenche financeiro com valores manuais salvos
    const fin = orc.financeiro || {};
    const inputInsumos = document.getElementById('campo-custo-insumos');
    const inputPintura = document.getElementById('campo-custo-pintura');
    const inputAcessorios = document.getElementById('campo-custo-acessorios');
    const inputMaoObra = document.getElementById('campo-custo-mao-obra');
    const inputFrete = document.getElementById('campo-custo-frete');
    const inputMargem = document.getElementById('campo-margem-manual');
    const sliderMargem = document.getElementById('campo-margem-slider');

    if (inputInsumos) inputInsumos.value = fin.custoInsumosConsumiveis != null ? fin.custoInsumosConsumiveis : '';
    if (inputPintura) inputPintura.value = fin.custoPintura != null ? fin.custoPintura : '';
    if (inputAcessorios) inputAcessorios.value = fin.custoAcessorios != null ? fin.custoAcessorios : '';
    if (inputMaoObra) inputMaoObra.value = fin.custoMaoDeObraTotal != null ? fin.custoMaoDeObraTotal : '';
    if (inputFrete) inputFrete.value = fin.custoFrete != null ? fin.custoFrete : '';
    const margemSalva = fin.margemLucroPercentual != null ? fin.margemLucroPercentual : 40;
    if (inputMargem) inputMargem.value = margemSalva;
    if (sliderMargem) sliderMargem.value = margemSalva;

    // Preenche Memorial e Condições do orçamento
    const config = StorageService.getConfig();
    const inputMemPintura = document.getElementById('campo-memorial-pintura');
    const inputMemMaoObra = document.getElementById('campo-memorial-mao-obra');
    const inputCondPag = document.getElementById('campo-cond-pagamento');
    const inputCondPrazo = document.getElementById('campo-cond-prazo');
    const inputCondGarantia = document.getElementById('campo-cond-garantia');

    if (inputMemPintura) inputMemPintura.value = orc.memorialPintura != null ? orc.memorialPintura : (config.memorialPintura || 'Aplicação de fundo protetor anticorrosivo (Zarcão). Acabamento final/pintura definitiva por conta do cliente.');
    if (inputMemMaoObra) inputMemMaoObra.value = orc.memorialMaoDeObra != null ? orc.memorialMaoDeObra : (config.memorialMaoDeObra || 'Fabricação e esquadrejamento em oficina especializada. Instalação e chumbamento no local por conta do pedreiro/cliente.');
    const cond = orc.condicoes || {};
    if (inputCondPag) inputCondPag.value = cond.formaPagamento != null ? cond.formaPagamento : (config.condicoesFormaPagamento || '50% de sinal no pedido + 50% na retirada/entrega.');
    if (inputCondPrazo) inputCondPrazo.value = cond.prazoEntrega != null ? cond.prazoEntrega : (config.condicoesPrazoEntrega || '15 a 20 dias úteis a contar da aprovação do sinal.');
    if (inputCondGarantia) inputCondGarantia.value = cond.garantia != null ? cond.garantia : (config.condicoesGarantia || '12 meses para soltura de soldas e funcionamento estrutural.');

    this.renderizarTipologias();
    this.mudarAba('novo');
    this.recalcularEmTempoReal(false);
  }

  excluirOrcamento(id) {
    const orc = StorageService.getOrcamentoById(id);
    if (!orc) return;

    if (confirm(`Tem certeza que deseja excluir o Orçamento #${orc.numeroSequencial} do cliente ${orc.cliente?.nome}?`)) {
      StorageService.deleteOrcamento(id);
      this.mostrarToast(`Orçamento #${orc.numeroSequencial} removido.`);
      this.renderizarListaOrcamentos();
    }
  }

  duplicarOrcamento(id) {
    const clone = StorageService.duplicateOrcamento(id);
    if (clone) {
      this.mostrarToast(`Orçamento clonado como #${clone.numeroSequencial}!`);
      this.renderizarListaOrcamentos();
    }
  }

  alterarStatusOrcamento(id, novoStatus) {
    StorageService.updateStatus(id, novoStatus);
    this.mostrarToast('Status atualizado com sucesso.');
    this.renderizarListaOrcamentos();
  }

  // ─── Renderização da Lista de Orçamentos ───────────────────

  filtrarStatus(status) {
    this.filtroStatus = status;

    document.querySelectorAll('.filtro-btn').forEach(btn => {
      if (btn.getAttribute('data-status') === status) {
        btn.className = 'filtro-btn px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-white';
      } else {
        btn.className = 'filtro-btn px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200';
      }
    });

    this.renderizarListaOrcamentos();
  }

  buscarOrcamentos(termo) {
    this.termoBusca = termo.toLowerCase().trim();
    this.renderizarListaOrcamentos();
  }

  renderizarListaOrcamentos() {
    const container = document.getElementById('lista-orcamentos-container');
    const vazioEl = document.getElementById('orcamentos-vazio');
    if (!container) return;

    let todos = StorageService.getOrcamentos();

    // Atualiza contadores dos filtros
    const countTodos = document.getElementById('count-todos');
    const countAberto = document.getElementById('count-aberto');
    const countEnviado = document.getElementById('count-enviado');
    const countAprovado = document.getElementById('count-aprovado');
    const countEmProd = document.getElementById('count-em_producao');
    const countConcluido = document.getElementById('count-concluido');

    if (countTodos) countTodos.textContent = todos.length;
    if (countAberto) countAberto.textContent = todos.filter(o => o.status === 'aberto').length;
    if (countEnviado) countEnviado.textContent = todos.filter(o => o.status === 'enviado').length;
    if (countAprovado) countAprovado.textContent = todos.filter(o => o.status === 'aprovado').length;
    if (countEmProd) countEmProd.textContent = todos.filter(o => o.status === 'em_producao').length;
    if (countConcluido) countConcluido.textContent = todos.filter(o => o.status === 'concluido').length;

    // Filtros
    let filtrados = todos;
    if (this.filtroStatus !== 'todos') {
      filtrados = filtrados.filter(o => o.status === this.filtroStatus);
    }
    if (this.termoBusca) {
      filtrados = filtrados.filter(o => 
        (o.cliente?.nome && o.cliente.nome.toLowerCase().includes(this.termoBusca)) ||
        (o.cliente?.telefone && o.cliente.telefone.includes(this.termoBusca)) ||
        String(o.numeroSequencial).includes(this.termoBusca)
      );
    }

    if (filtrados.length === 0) {
      container.innerHTML = '';
      if (vazioEl) vazioEl.classList.remove('hidden');
      return;
    }

    if (vazioEl) vazioEl.classList.add('hidden');

    const statusCores = {
      aberto: 'bg-amber-100 text-amber-800 border-amber-300',
      enviado: 'bg-sky-100 text-sky-800 border-sky-300',
      aprovado: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      em_producao: 'bg-purple-100 text-purple-800 border-purple-300',
      concluido: 'bg-slate-200 text-slate-800 border-slate-300',
      recusado: 'bg-rose-100 text-rose-800 border-rose-300'
    };

    const statusNomes = {
      aberto: 'Em Aberto',
      enviado: 'Enviado WhatsApp',
      aprovado: 'Aprovado / Fechado',
      em_producao: 'Em Produção',
      concluido: 'Obra Concluída',
      recusado: 'Recusado'
    };

    const formatBRL = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);

    container.innerHTML = filtrados.map(orc => {
      const corStatus = statusCores[orc.status] || 'bg-slate-100 text-slate-700';
      const nomeStatus = statusNomes[orc.status] || orc.status;
      const dataStr = new Date(orc.dataCriacaoIso).toLocaleDateString('pt-BR');
      const tipoNome = (orc.estrutura?.tipo || 'estrutura').replace(/_/g, ' ');

      const totalItensCount = Array.isArray(orc.itens) && orc.itens.length > 0 ? orc.itens.length : 1;
      let resumoTextoItens = '';
      if (totalItensCount > 1) {
        resumoTextoItens = `${totalItensCount} itens inclusos na obra`;
      } else {
        resumoTextoItens = `${orc.estrutura?.larguraMm || 0} x ${orc.estrutura?.alturaMm || 0} mm`;
      }

      return `
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between space-y-4">
          
          <!-- Topo do Card -->
          <div class="flex items-start justify-between gap-2">
            <div>
              <span class="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                #${orc.numeroSequencial || '101'}
              </span>
              <h4 class="text-base font-bold text-slate-900 mt-1 leading-snug">${orc.cliente?.nome || 'Cliente'}</h4>
              <p class="text-xs text-slate-500">${orc.cliente?.telefone || '-'}</p>
            </div>

            <!-- Seletor de Status Direto -->
            <select onchange="window.app.alterarStatusOrcamento('${orc.id}', this.value)" class="text-[11px] font-semibold rounded-lg px-2 py-1 border outline-none cursor-pointer ${corStatus}">
              <option value="aberto" ${orc.status === 'aberto' ? 'selected' : ''}>Em Aberto</option>
              <option value="enviado" ${orc.status === 'enviado' ? 'selected' : ''}>Enviado</option>
              <option value="aprovado" ${orc.status === 'aprovado' ? 'selected' : ''}>Aprovado</option>
              <option value="em_producao" ${orc.status === 'em_producao' ? 'selected' : ''}>Em Produção</option>
              <option value="concluido" ${orc.status === 'concluido' ? 'selected' : ''}>Concluído</option>
              <option value="recusado" ${orc.status === 'recusado' ? 'selected' : ''}>Recusado</option>
            </select>
          </div>

          <!-- Meio: Dados da Peça e Barras de 6m -->
          <div class="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1 text-xs text-slate-600">
            <div class="flex justify-between font-medium text-slate-800">
              <span class="capitalize">${totalItensCount > 1 ? `<span class="font-bold text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded text-[11px] mr-1">${totalItensCount} itens</span>Lote Integrado` : `${orc.estrutura?.quantidade > 1 ? `<span class="font-bold text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded text-[11px] mr-1">${orc.estrutura.quantidade}x</span>` : ''}${tipoNome}`}</span>
              <span>${resumoTextoItens}</span>
            </div>
            <div class="flex justify-between text-slate-500 pt-1 border-t border-slate-200/60">
              <span>Barras de 6m necessárias:</span>
              <b class="text-sky-600">${orc.estrutura?.totalBarras6m || 0} barras</b>
            </div>
          </div>

          <!-- Base: Valor e Botões de Ação -->
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span class="text-[10px] uppercase font-bold text-slate-400">Total do Orçamento</span>
              <div class="text-lg font-black text-slate-900">${formatBRL(orc.financeiro?.precoVendaFinal)}</div>
            </div>

            <div class="flex items-center gap-1.5">
              <button onclick="window.app.abrirModalPropostaPorId('${orc.id}')" title="Compartilhar PDF ou WhatsApp" class="p-2 rounded-lg bg-sky-600 text-white hover:bg-sky-500 transition shadow-sm">
                <i data-lucide="send" class="w-4 h-4"></i>
              </button>
              <button onclick="window.app.duplicarOrcamento('${orc.id}')" title="Duplicar Orçamento" class="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
                <i data-lucide="copy" class="w-4 h-4"></i>
              </button>
              <button onclick="window.app.editarOrcamento('${orc.id}')" title="Editar Orçamento" class="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
                <i data-lucide="edit-2" class="w-4 h-4"></i>
              </button>
              <button onclick="window.app.excluirOrcamento('${orc.id}')" title="Excluir" class="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

        </div>
      `;
    }).join('');

    this.atualizarIcones();
  }

  // ─── Modal de Emissão de Proposta (PDF / WhatsApp) ─────────

  abrirModalPropostaPorId(id) {
    const orc = StorageService.getOrcamentoById(id);
    if (orc) this.abrirModalProposta(orc);
  }

  abrirModalPropostaAtual() {
    this.recalcularEmTempoReal();
    if (!this.ultimoCalculo) return;

    const nomeCliente = document.getElementById('campo-cliente-nome')?.value?.trim() || 'Cliente';
    const telCliente = document.getElementById('campo-cliente-telefone')?.value?.trim() || '';
    const endereco = document.getElementById('campo-cliente-endereco')?.value?.trim() || '';
    const quantidade = Math.max(1, Math.floor(Number(document.getElementById('campo-quantidade')?.value) || 1));
    const config = StorageService.getConfig();

    const inputMemPintura = document.getElementById('campo-memorial-pintura');
    const inputMemMaoObra = document.getElementById('campo-memorial-mao-obra');
    const inputCondPag = document.getElementById('campo-cond-pagamento');
    const inputCondPrazo = document.getElementById('campo-cond-prazo');
    const inputCondGarantia = document.getElementById('campo-cond-garantia');

    const orcamentoMock = {
      id: this.orcamentoEmEdicaoId || undefined,
      numeroSequencial: this.orcamentoEmEdicaoId ? 'Edição' : 'Novo',
      dataCriacaoIso: new Date().toISOString(),
      cliente: { nome: nomeCliente, telefone: telCliente, enderecoObra: endereco },
      itens: this.itensOrcamento.length > 0 ? this.itensOrcamento : [this.ultimoCalculo.estrutura],
      estrutura: {
        tipo: this.tipologiaAtivaId,
        quantidade,
        larguraMm: Number(document.getElementById('campo-largura-mm')?.value),
        alturaMm: Number(document.getElementById('campo-altura-mm')?.value),
        perfilRequadroId: document.getElementById('campo-perfil-requadro')?.value,
        perfilPreenchimentoId: document.getElementById('campo-perfil-preenchimento')?.value,
        totalBarras6m: this.ultimoCalculo.lote?.totalBarras6m || this.ultimoCalculo.estrutura.totalBarras6m
      },
      financeiro: this.ultimoCalculo.financeiro,
      memorialPintura: inputMemPintura?.value?.trim() || config.memorialPintura || 'Aplicação de fundo protetor anticorrosivo (Zarcão). Acabamento final/pintura definitiva por conta do cliente.',
      memorialMaoDeObra: inputMemMaoObra?.value?.trim() || config.memorialMaoDeObra || 'Fabricação e esquadrejamento em oficina especializada. Instalação e chumbamento no local por conta do pedreiro/cliente.',
      condicoes: {
        formaPagamento: inputCondPag?.value?.trim() || config.condicoesFormaPagamento || '50% de sinal no pedido + 50% na retirada/entrega.',
        prazoEntrega: inputCondPrazo?.value?.trim() || config.condicoesPrazoEntrega || '15 a 20 dias úteis a contar da aprovação do sinal.',
        garantia: inputCondGarantia?.value?.trim() || config.condicoesGarantia || '12 meses para soltura de soldas e funcionamento estrutural.'
      }
    };

    this.abrirModalProposta(orcamentoMock);
  }

  abrirModalProposta(orcamento) {
    this.orcamentoModal = orcamento;
    const config = StorageService.getConfig();

    const formatBRL = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);

    const subEl = document.getElementById('modal-proposta-subtitulo');
    const cliEl = document.getElementById('modal-cliente-nome');
    const estEl = document.getElementById('modal-estrutura-resumo');
    const barEl = document.getElementById('modal-barras-total');
    const valEl = document.getElementById('modal-valor-total');
    const txtPreview = document.getElementById('modal-preview-whatsapp');

    const listaItens = Array.isArray(orcamento.itens) && orcamento.itens.length > 0 
      ? orcamento.itens 
      : [orcamento.estrutura || {}];

    if (subEl) subEl.textContent = `Orçamento #${orcamento.numeroSequencial || '101'}`;
    if (cliEl) cliEl.textContent = `${orcamento.cliente?.nome || 'Cliente'} (${orcamento.cliente?.telefone || '-'})`;
    
    if (estEl) {
      if (listaItens.length > 1) {
        estEl.textContent = `Lote com ${listaItens.length} itens inclusos na obra`;
      } else {
        const itemUnico = listaItens[0];
        const qtd = Number(itemUnico.quantidade) || 1;
        const tipoNome = (itemUnico.tipo || 'estrutura').replace(/_/g, ' ');
        const prefixoQtd = qtd > 1 ? `${qtd}x ` : '';
        const larg = itemUnico.dimensoes?.larguraMm || itemUnico.larguraMm;
        const alt = itemUnico.dimensoes?.alturaMm || itemUnico.alturaMm;
        estEl.textContent = `${prefixoQtd}${tipoNome} (${larg}mm x ${alt}mm)`;
      }
    }

    const totalBarras = orcamento.estrutura?.totalBarras6m || 0;
    if (barEl) barEl.textContent = `${totalBarras} barras de 6 metros`;
    if (valEl) valEl.textContent = formatBRL(orcamento.financeiro?.precoVendaFinal);

    // Carrega Condições Comerciais e Memorial editáveis no Modal
    const condSalvas = orcamento.condicoes || {};
    const inputPag = document.getElementById('modal-cond-pagamento');
    const inputPrazo = document.getElementById('modal-cond-prazo');
    const inputGarantia = document.getElementById('modal-cond-garantia');
    const inputPintura = document.getElementById('modal-memorial-pintura');
    const inputMaoObra = document.getElementById('modal-memorial-mao-obra');

    if (inputPag) {
      inputPag.value = condSalvas.formaPagamento != null 
        ? condSalvas.formaPagamento 
        : (config.condicoesFormaPagamento != null ? config.condicoesFormaPagamento : '50% de sinal no pedido + 50% na retirada/entrega.');
    }
    if (inputPrazo) {
      inputPrazo.value = condSalvas.prazoEntrega != null 
        ? condSalvas.prazoEntrega 
        : (config.condicoesPrazoEntrega != null ? config.condicoesPrazoEntrega : '15 a 20 dias úteis a contar da aprovação do sinal.');
    }
    if (inputGarantia) {
      inputGarantia.value = condSalvas.garantia != null 
        ? condSalvas.garantia 
        : (config.condicoesGarantia != null ? config.condicoesGarantia : '12 meses para soltura de soldas e funcionamento estrutural.');
    }
    if (inputPintura) {
      inputPintura.value = orcamento.memorialPintura != null 
        ? orcamento.memorialPintura 
        : (config.memorialPintura != null ? config.memorialPintura : 'Aplicação de fundo protetor anticorrosivo (Zarcão). Acabamento final/pintura definitiva por conta do cliente.');
    }
    if (inputMaoObra) {
      inputMaoObra.value = orcamento.memorialMaoDeObra != null 
        ? orcamento.memorialMaoDeObra 
        : (config.memorialMaoDeObra != null ? config.memorialMaoDeObra : 'Fabricação e esquadrejamento em oficina especializada. Instalação e chumbamento no local por conta do pedreiro/cliente.');
    }

    // Sincroniza objeto e Mensagem formatada
    this.sincronizarCondicoesDoModal();
    this.atualizarCardPixModal();
    const msg = formatarMensagemWhatsapp(this.orcamentoModal, config);
    if (txtPreview) txtPreview.value = msg;

    const modal = document.getElementById('modal-proposta');
    if (modal) modal.classList.remove('hidden');

    this.atualizarIcones();
  }

  sincronizarCondicoesDoModal() {
    if (!this.orcamentoModal) return;
    const inputPag = document.getElementById('modal-cond-pagamento');
    const inputPrazo = document.getElementById('modal-cond-prazo');
    const inputGarantia = document.getElementById('modal-cond-garantia');
    const inputPintura = document.getElementById('modal-memorial-pintura');
    const inputMaoObra = document.getElementById('modal-memorial-mao-obra');

    this.orcamentoModal.condicoes = {
      formaPagamento: inputPag ? inputPag.value : '',
      prazoEntrega: inputPrazo ? inputPrazo.value : '',
      garantia: inputGarantia ? inputGarantia.value : ''
    };
    if (inputPintura) {
      this.orcamentoModal.memorialPintura = inputPintura.value;
    }
    if (inputMaoObra) {
      this.orcamentoModal.memorialMaoDeObra = inputMaoObra.value;
    }

    // Grava imediatamente no banco se o orçamento possuir ID no banco
    if (this.orcamentoModal.id) {
      StorageService.saveOrcamento(this.orcamentoModal);
      this.renderizarListaOrcamentos();

      // Sincroniza campos do formulário se o orçamento aberto for o mesmo
      if (this.orcamentoEmEdicaoId === this.orcamentoModal.id) {
        const fPintura = document.getElementById('campo-memorial-pintura');
        const fMaoObra = document.getElementById('campo-memorial-mao-obra');
        const fPag = document.getElementById('campo-cond-pagamento');
        const fPrazo = document.getElementById('campo-cond-prazo');
        const fGarantia = document.getElementById('campo-cond-garantia');
        if (fPintura) fPintura.value = this.orcamentoModal.memorialPintura;
        if (fMaoObra) fMaoObra.value = this.orcamentoModal.memorialMaoDeObra;
        if (fPag) fPag.value = this.orcamentoModal.condicoes.formaPagamento;
        if (fPrazo) fPrazo.value = this.orcamentoModal.condicoes.prazoEntrega;
        if (fGarantia) fGarantia.value = this.orcamentoModal.condicoes.garantia;
      }
    }

    const statusEl = document.getElementById('modal-salvo-status');
    if (statusEl) {
      statusEl.classList.remove('hidden');
    }
  }

  atualizarPreviewCondicoesModal() {
    if (!this.orcamentoModal) return;
    this.sincronizarCondicoesDoModal();
    this.atualizarCardPixModal();
    const config = StorageService.getConfig();
    const txtPreview = document.getElementById('modal-preview-whatsapp');
    if (txtPreview) {
      txtPreview.value = formatarMensagemWhatsapp(this.orcamentoModal, config);
    }
  }

  atualizarCardPixModal() {
    if (!this.orcamentoModal) return;
    const config = StorageService.getConfig();
    const chavePix = config.chavePix || '';
    const blocoPix = document.getElementById('modal-bloco-pix');
    if (!blocoPix) return;

    if (!chavePix) {
      blocoPix.classList.add('hidden');
      this.dadosPixAtual = null;
      return;
    }
    blocoPix.classList.remove('hidden');

    const cond = this.orcamentoModal.condicoes || {};
    const formaPag = cond.formaPagamento || config.condicoesFormaPagamento || '50%';
    const valorTotal = this.orcamentoModal.financeiro?.precoVendaFinal || 0;

    const dadosPix = gerarDadosPixEntrada({
      chavePix,
      nomeRecebedor: config.nomeFantasia,
      cidade: config.cidadeEstado,
      valorTotal,
      entradaOuPercentual: formaPag,
      txid: String(this.orcamentoModal.numeroSequencial || '101')
    });

    this.dadosPixAtual = dadosPix;
    if (dadosPix) {
      const img = document.getElementById('modal-pix-qrcode-img');
      const valEntradaEl = document.getElementById('modal-pix-valor-entrada');
      const badgePercEl = document.getElementById('modal-pix-badge-percentual');
      const chaveTextoEl = document.getElementById('modal-pix-chave-texto');

      if (img) img.src = dadosPix.dataUrl;
      const fmtBRL = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);
      if (valEntradaEl) valEntradaEl.textContent = fmtBRL(dadosPix.valorEntrada);
      if (badgePercEl) badgePercEl.textContent = `${dadosPix.percentualEntrada}% de entrada`;
      if (chaveTextoEl) chaveTextoEl.textContent = dadosPix.chavePix;
    }
  }

  copiarChavePixModal() {
    if (this.dadosPixAtual?.chavePix) {
      navigator.clipboard.writeText(this.dadosPixAtual.chavePix).then(() => {
        this.mostrarToast('Chave Pix copiada para a área de transferência!');
      }).catch(() => {
        this.mostrarToast(`Chave Pix: ${this.dadosPixAtual.chavePix}`);
      });
    }
  }

  copiarPixCopiaEColaModal() {
    if (this.dadosPixAtual?.payloadPix) {
      navigator.clipboard.writeText(this.dadosPixAtual.payloadPix).then(() => {
        this.mostrarToast('Código Pix Copia e Cola copiado com sucesso!');
      }).catch(() => {
        this.mostrarToast('Código Pix pronto!');
      });
    }
  }

  fecharModalProposta() {
    const modal = document.getElementById('modal-proposta');
    if (modal) modal.classList.add('hidden');
    this.orcamentoModal = null;
    this.dadosPixAtual = null;
  }

  executarDownloadPdf() {
    if (!this.orcamentoModal) {
      this.mostrarToast('Nenhum orçamento selecionado para emissão.', 'erro');
      return;
    }
    try {
      this.sincronizarCondicoesDoModal();
      const config = StorageService.getConfig();
      gerarPropostaPDF(this.orcamentoModal, config);
      this.mostrarToast('Download da proposta em PDF iniciado!');
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      this.mostrarToast(`Falha ao gerar PDF: ${err.message}`, 'erro');
    }
  }

  executarEnvioWhatsapp() {
    if (!this.orcamentoModal) return;
    this.sincronizarCondicoesDoModal();
    const config = StorageService.getConfig();
    dispararWhatsapp(this.orcamentoModal, config);
    this.mostrarToast('WhatsApp acionado com a mensagem!');
  }

  copiarMensagemWhatsapp() {
    const txtPreview = document.getElementById('modal-preview-whatsapp');
    if (txtPreview && txtPreview.value) {
      navigator.clipboard.writeText(txtPreview.value).then(() => {
        this.mostrarToast('Texto copiado para a área de transferência!');
      }).catch(() => {
        txtPreview.select();
        document.execCommand('copy');
        this.mostrarToast('Texto copiado!');
      });
    }
  }

  // ─── Catálogo & Preços ─────────────────────────────────────

  filtrarCatalogoCategoria(categoria) {
    this.filtroCatalogoCategoria = categoria;

    const botoes = document.querySelectorAll('.cat-filtro-btn');
    botoes.forEach(btn => {
      const cat = btn.getAttribute('data-categoria');
      if (cat === categoria) {
        btn.className = 'cat-filtro-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white shadow-sm transition whitespace-nowrap';
      } else {
        btn.className = 'cat-filtro-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition whitespace-nowrap';
      }
    });

    this.renderizarTabelaCatalogo();
  }

  buscarCatalogo(termo) {
    this.termoBuscaCatalogo = (termo || '').toLowerCase().trim();
    this.renderizarTabelaCatalogo();
  }

  renderizarTabelaCatalogo() {
    const tbody = document.getElementById('tabela-catalogo-body');
    if (!tbody) return;

    const catalogo = StorageService.getCatalogo();
    this.atualizarContadoresCatalogo(catalogo);

    let lista = catalogo;
    if (this.filtroCatalogoCategoria !== 'todos') {
      lista = lista.filter(m => m.categoria === this.filtroCatalogoCategoria);
    }
    if (this.termoBuscaCatalogo) {
      lista = lista.filter(m => {
        const nome = (m.nome || '').toLowerCase();
        const desc = (m.descricao || '').toLowerCase();
        const dim = (m.dimensaoTexto || '').toLowerCase();
        const cat = (m.categoria || '').toLowerCase();
        return nome.includes(this.termoBuscaCatalogo) ||
               desc.includes(this.termoBuscaCatalogo) ||
               dim.includes(this.termoBuscaCatalogo) ||
               cat.includes(this.termoBuscaCatalogo);
      });
    }

    if (lista.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="py-12 text-center text-slate-400">
            <i data-lucide="package-search" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
            <p class="font-bold text-sm text-slate-600">Nenhum material encontrado com os filtros atuais.</p>
            <p class="text-xs text-slate-400 mt-1">Tente pesquisar outro termo ou selecione a categoria "Todos".</p>
          </td>
        </tr>
      `;
      this.atualizarIcones();
      return;
    }

    tbody.innerHTML = lista.map(m => {
      const precoMetro = m.unidadeMedida === 'barra_6m'
        ? `<div class="text-[11px] text-slate-400 font-mono mt-0.5">≈ R$ ${(m.precoUnitarioPadrao / 6).toFixed(2)}/m</div>`
        : '';

      const dimBadge = m.dimensaoTexto
        ? `<span class="inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-600 rounded mr-1">${m.dimensaoTexto}</span>`
        : '';

      const densidadeTexto = m.densidadeLinearKgM
        ? `<span class="text-[11px] text-slate-400"> • ${m.densidadeLinearKgM} kg/m</span>`
        : '';

      const nomeEscapado = (m.nome || '').replace(/'/g, "\\'");

      return `
        <tr class="hover:bg-slate-50 transition border-b border-slate-100">
          <td class="px-4 py-3">
            <div class="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              ${m.nome}
            </div>
            <div class="text-xs text-slate-500 mt-0.5 flex items-center flex-wrap gap-1">
              ${dimBadge}
              <span>${m.descricao || ''}</span>
              ${densidadeTexto}
            </div>
          </td>
          <td class="px-4 py-3">
            ${this.getBadgeCategoriaHtml(m.categoria)}
          </td>
          <td class="px-4 py-3">
            <div class="text-xs font-semibold text-slate-700">${this.getLabelUnidade(m.unidadeMedida)}</div>
            ${precoMetro}
          </td>
          <td class="px-4 py-3 text-right">
            <div class="inline-flex items-center gap-1">
              <span class="text-xs text-slate-400 font-bold">R$</span>
              <input type="number" id="preco-item-${m.id}" value="${Number(m.precoUnitarioPadrao).toFixed(2)}" step="any" min="0" class="w-24 px-2 py-1 text-sm font-mono font-bold text-right rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none">
            </div>
          </td>
          <td class="px-4 py-3 text-center">
            <div class="flex items-center justify-center gap-1">
              <button onclick="window.app.abrirModalEditarMaterial('${m.id}')" title="Editar Material Completo" class="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-bold text-xs transition flex items-center gap-1">
                <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
              </button>
              <button onclick="window.app.salvarPrecoMaterial('${m.id}')" title="Salvar Preço Rápido" class="p-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold text-xs transition flex items-center gap-1">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
              </button>
              <button onclick="window.app.excluirMaterial('${m.id}', '${nomeEscapado}')" title="Excluir Material" class="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    this.atualizarIcones();
  }

  getBadgeCategoriaHtml(categoria) {
    const map = {
      metalon: { label: 'Metalon', bg: 'bg-sky-100 text-sky-800 border-sky-200' },
      cantoneira: { label: 'Cantoneira', bg: 'bg-amber-100 text-amber-800 border-amber-200' },
      barra_chata: { label: 'Barra Chata', bg: 'bg-orange-100 text-orange-800 border-orange-200' },
      tubo_redondo: { label: 'Tubo Redondo', bg: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
      chapa: { label: 'Chapa / Painel', bg: 'bg-purple-100 text-purple-800 border-purple-200' },
      insumo_solda: { label: 'Solda & Insumos', bg: 'bg-rose-100 text-rose-800 border-rose-200' },
      pintura: { label: 'Pintura', bg: 'bg-teal-100 text-teal-800 border-teal-200' },
      acessorio: { label: 'Acessório', bg: 'bg-slate-100 text-slate-800 border-slate-200' }
    };
    const c = map[categoria] || { label: categoria, bg: 'bg-slate-100 text-slate-700 border-slate-200' };
    return `<span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${c.bg}">${c.label}</span>`;
  }

  getLabelUnidade(unidade) {
    const map = {
      barra_6m: 'Barra de 6m',
      kg: 'Quilograma (kg)',
      disco: 'Unidade (disco)',
      litro: 'Litro (L)',
      chapa: 'Chapa inteira',
      unidade: 'Unidade (pç)',
      metro: 'Metro linear'
    };
    return map[unidade] || unidade;
  }

  atualizarContadoresCatalogo(catalogo) {
    const setCounter = (id, count) => {
      const el = document.getElementById(id);
      if (el) el.textContent = count;
    };

    setCounter('cat-count-todos', catalogo.length);
    setCounter('cat-count-metalon', catalogo.filter(m => m.categoria === 'metalon').length);
    setCounter('cat-count-cantoneira', catalogo.filter(m => m.categoria === 'cantoneira').length);
    setCounter('cat-count-barra_chata', catalogo.filter(m => m.categoria === 'barra_chata').length);
    setCounter('cat-count-tubo_redondo', catalogo.filter(m => m.categoria === 'tubo_redondo').length);
    setCounter('cat-count-chapa', catalogo.filter(m => m.categoria === 'chapa').length);
    setCounter('cat-count-insumo_solda', catalogo.filter(m => m.categoria === 'insumo_solda').length);
    setCounter('cat-count-pintura', catalogo.filter(m => m.categoria === 'pintura').length);
    setCounter('cat-count-acessorio', catalogo.filter(m => m.categoria === 'acessorio').length);
  }

  salvarPrecoMaterial(id) {
    const input = document.getElementById(`preco-item-${id}`);
    if (!input) return;

    const novoPreco = Number(input.value);
    if (isNaN(novoPreco) || novoPreco < 0) {
      this.mostrarToast('Preço inválido.', 'erro');
      return;
    }

    StorageService.updatePrecoMaterial(id, novoPreco);
    this.mostrarToast('Preço unitário atualizado!');
    this.renderizarSelectsPerfis();
    this.recalcularEmTempoReal();
  }

  abrirModalNovoMaterial() {
    const modal = document.getElementById('modal-novo-material');
    if (!modal) return;
    document.getElementById('form-novo-material')?.reset();
    modal.classList.remove('hidden');
    this.atualizarIcones();
  }

  fecharModalNovoMaterial() {
    const modal = document.getElementById('modal-novo-material');
    if (modal) modal.classList.add('hidden');
  }

  salvarNovoMaterial() {
    const nome = document.getElementById('novo-mat-nome')?.value?.trim();
    const categoria = document.getElementById('novo-mat-categoria')?.value || 'metalon';
    const dimensaoTexto = document.getElementById('novo-mat-dimensao')?.value?.trim() || '';
    const unidadeMedida = document.getElementById('novo-mat-unidade')?.value || 'barra_6m';
    const preco = Number(document.getElementById('novo-mat-preco')?.value);
    const densidade = Number(document.getElementById('novo-mat-densidade')?.value) || 0;
    const descricao = document.getElementById('novo-mat-descricao')?.value?.trim() || '';

    if (!nome) {
      this.mostrarToast('Por favor, informe o nome do material.', 'erro');
      return;
    }
    if (isNaN(preco) || preco <= 0) {
      this.mostrarToast('Informe um preço unitário válido.', 'erro');
      return;
    }

    const novo = {
      id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      categoria,
      nome,
      descricao: descricao || `${nome} (${dimensaoTexto})`,
      dimensaoTexto,
      unidadeMedida,
      precoUnitarioPadrao: preco,
      densidadeLinearKgM: densidade > 0 ? densidade : undefined
    };

    StorageService.addMaterial(novo);
    this.fecharModalNovoMaterial();
    this.mostrarToast(`Material "${nome}" cadastrado com sucesso!`);
    this.renderizarTabelaCatalogo();
    this.renderizarSelectsPerfis();
    this.recalcularEmTempoReal();
  }

  abrirModalEditarMaterial(id) {
    const mat = StorageService.getMaterialById(id);
    if (!mat) {
      this.mostrarToast('Material não encontrado.', 'erro');
      return;
    }

    const modal = document.getElementById('modal-editar-material');
    if (!modal) return;

    document.getElementById('edit-mat-id').value = mat.id;
    document.getElementById('edit-mat-nome').value = mat.nome || '';
    document.getElementById('edit-mat-categoria').value = mat.categoria || 'metalon';
    document.getElementById('edit-mat-dimensao').value = mat.dimensaoTexto || '';
    document.getElementById('edit-mat-unidade').value = mat.unidadeMedida || 'barra_6m';
    document.getElementById('edit-mat-preco').value = mat.precoUnitarioPadrao != null ? mat.precoUnitarioPadrao : '';
    document.getElementById('edit-mat-densidade').value = mat.densidadeLinearKgM != null ? mat.densidadeLinearKgM : '';
    document.getElementById('edit-mat-descricao').value = mat.descricao || '';

    modal.classList.remove('hidden');
    this.atualizarIcones();
  }

  fecharModalEditarMaterial() {
    const modal = document.getElementById('modal-editar-material');
    if (modal) modal.classList.add('hidden');
  }

  salvarEdicaoMaterial() {
    const id = document.getElementById('edit-mat-id')?.value;
    const nome = document.getElementById('edit-mat-nome')?.value?.trim();
    const categoria = document.getElementById('edit-mat-categoria')?.value || 'metalon';
    const dimensaoTexto = document.getElementById('edit-mat-dimensao')?.value?.trim() || '';
    const unidadeMedida = document.getElementById('edit-mat-unidade')?.value || 'barra_6m';
    const preco = Number(document.getElementById('edit-mat-preco')?.value);
    const densidade = Number(document.getElementById('edit-mat-densidade')?.value) || 0;
    const descricao = document.getElementById('edit-mat-descricao')?.value?.trim() || '';

    if (!id) {
      this.mostrarToast('Identificador de material ausente.', 'erro');
      return;
    }
    if (!nome) {
      this.mostrarToast('Por favor, informe o nome do material.', 'erro');
      return;
    }
    if (isNaN(preco) || preco <= 0) {
      this.mostrarToast('Informe um preço unitário válido.', 'erro');
      return;
    }

    const dados = {
      nome,
      categoria,
      dimensaoTexto,
      unidadeMedida,
      precoUnitarioPadrao: preco,
      densidadeLinearKgM: densidade > 0 ? densidade : undefined,
      descricao: descricao || `${nome} (${dimensaoTexto})`
    };

    const atualizado = StorageService.updateMaterial(id, dados);
    if (atualizado) {
      this.fecharModalEditarMaterial();
      this.mostrarToast(`Material "${nome}" atualizado com sucesso!`);
      this.renderizarTabelaCatalogo();
      this.renderizarSelectsPerfis();
      this.recalcularEmTempoReal();
    } else {
      this.mostrarToast('Erro ao atualizar material.', 'erro');
    }
  }

  excluirMaterial(id, nome) {
    if (!confirm(`Deseja realmente remover o material "${nome}" do catálogo?`)) return;

    StorageService.deleteMaterial(id);
    this.mostrarToast(`"${nome}" removido do catálogo.`);
    this.renderizarTabelaCatalogo();
    this.renderizarSelectsPerfis();
    this.recalcularEmTempoReal();
  }

  abrirModalReajusteMassa() {
    const modal = document.getElementById('modal-reajuste-massa');
    if (!modal) return;
    modal.classList.remove('hidden');
    this.atualizarIcones();
  }

  fecharModalReajusteMassa() {
    const modal = document.getElementById('modal-reajuste-massa');
    if (modal) modal.classList.add('hidden');
  }

  definirPercentualReajuste(pct) {
    const input = document.getElementById('reajuste-percentual');
    if (input) input.value = pct;
  }

  aplicarReajusteMassa() {
    const inputPct = document.getElementById('reajuste-percentual');
    const selectCat = document.getElementById('reajuste-categoria');
    const percentual = Number(inputPct?.value);
    const categoria = selectCat?.value || 'todos';

    if (isNaN(percentual) || percentual === 0) {
      this.mostrarToast('Informe uma porcentagem válida de reajuste (ex: 5 ou -5).', 'erro');
      return;
    }

    const sinal = percentual > 0 ? `+${percentual}%` : `${percentual}%`;
    const catNome = categoria === 'todos' ? 'todos os materiais' : `materiais da categoria "${categoria}"`;

    if (!confirm(`Confirmar aplicação de reajuste de ${sinal} em ${catNome}?`)) return;

    const res = StorageService.reajustarPrecos(percentual, categoria);
    this.fecharModalReajusteMassa();
    this.mostrarToast(`Reajuste de ${sinal} aplicado em ${res.afetados} itens!`);
    this.renderizarTabelaCatalogo();
    this.renderizarSelectsPerfis();
    this.recalcularEmTempoReal();
  }

  restaurarPresetsFabrica() {
    if (confirm('Deseja restaurar todos os preços de materiais para os valores padrão de fábrica?')) {
      StorageService.importBackup(JSON.stringify({
        dados: { catalogo: DEFAULT_PRESETS }
      }));
      this.mostrarToast('Preços de fábrica restaurados!');
      this.renderizarTabelaCatalogo();
      this.renderizarSelectsPerfis();
      this.recalcularEmTempoReal();
    }
  }

  // ─── Configurações da Oficina & Backup ──────────────────────

  carregarConfiguracoesNaTela() {
    const cfg = StorageService.getConfig();

    const nomeHeader = document.getElementById('header-oficina-nome');
    if (nomeHeader) nomeHeader.textContent = cfg.nomeFantasia || 'Serralheria Modelo';

    const elNome = document.getElementById('cfg-nome-oficina');
    const elTel = document.getElementById('cfg-telefone');
    const elCid = document.getElementById('cfg-cidade');
    const elPix = document.getElementById('cfg-pix');
    const elHora = document.getElementById('cfg-valor-hora');
    const elKerf = document.getElementById('cfg-kerf');
    const elCondPag = document.getElementById('cfg-cond-pagamento');
    const elCondPrazo = document.getElementById('cfg-cond-prazo');
    const elCondGarantia = document.getElementById('cfg-cond-garantia');
    const elMemPintura = document.getElementById('cfg-memorial-pintura');
    const elMemMaoObra = document.getElementById('cfg-memorial-mao-obra');

    if (elNome) elNome.value = cfg.nomeFantasia || '';
    if (elTel) elTel.value = cfg.telefoneContato || '';
    if (elCid) elCid.value = cfg.cidadeEstado || '';
    if (elPix) elPix.value = cfg.chavePix || '';
    if (elHora) elHora.value = cfg.valorHoraMaoDeObra || 50;
    if (elKerf) elKerf.value = cfg.kerfCortePadraoMm || 3;
    if (elCondPag) elCondPag.value = cfg.condicoesFormaPagamento || '50% de sinal no pedido + 50% na retirada/entrega.';
    if (elCondPrazo) elCondPrazo.value = cfg.condicoesPrazoEntrega || '15 a 20 dias úteis a contar da aprovação do sinal.';
    if (elCondGarantia) elCondGarantia.value = cfg.condicoesGarantia || '12 meses para soltura de soldas e funcionamento estrutural.';
    if (elMemPintura) elMemPintura.value = cfg.memorialPintura || 'Aplicação de fundo protetor anticorrosivo (Zarcão). Acabamento final/pintura definitiva por conta do cliente.';
    if (elMemMaoObra) elMemMaoObra.value = cfg.memorialMaoDeObra || 'Fabricação e esquadrejamento em oficina especializada. Instalação e chumbamento no local por conta do pedreiro/cliente.';

    // Inicializa campos do formulário de orçamento se estiverem vazios
    const fMemPintura = document.getElementById('campo-memorial-pintura');
    const fMemMaoObra = document.getElementById('campo-memorial-mao-obra');
    const fCondPag = document.getElementById('campo-cond-pagamento');
    const fCondPrazo = document.getElementById('campo-cond-prazo');
    const fCondGarantia = document.getElementById('campo-cond-garantia');

    if (fMemPintura && !fMemPintura.value) fMemPintura.value = cfg.memorialPintura || 'Aplicação de fundo protetor anticorrosivo (Zarcão). Acabamento final/pintura definitiva por conta do cliente.';
    if (fMemMaoObra && !fMemMaoObra.value) fMemMaoObra.value = cfg.memorialMaoDeObra || 'Fabricação e esquadrejamento em oficina especializada. Instalação e chumbamento no local por conta do pedreiro/cliente.';
    if (fCondPag && !fCondPag.value) fCondPag.value = cfg.condicoesFormaPagamento || '50% de sinal no pedido + 50% na retirada/entrega.';
    if (fCondPrazo && !fCondPrazo.value) fCondPrazo.value = cfg.condicoesPrazoEntrega || '15 a 20 dias úteis a contar da aprovação do sinal.';
    if (fCondGarantia && !fCondGarantia.value) fCondGarantia.value = cfg.condicoesGarantia || '12 meses para soltura de soldas e funcionamento estrutural.';
  }

  salvarConfiguracoes() {
    const dados = {
      nomeFantasia: document.getElementById('cfg-nome-oficina')?.value?.trim() || 'Serralheria',
      telefoneContato: document.getElementById('cfg-telefone')?.value?.trim() || '',
      cidadeEstado: document.getElementById('cfg-cidade')?.value?.trim() || '',
      chavePix: document.getElementById('cfg-pix')?.value?.trim() || '',
      valorHoraMaoDeObra: Number(document.getElementById('cfg-valor-hora')?.value) || 50,
      kerfCortePadraoMm: Number(document.getElementById('cfg-kerf')?.value) || 3,
      condicoesFormaPagamento: document.getElementById('cfg-cond-pagamento')?.value?.trim() || '50% de sinal no pedido + 50% na retirada/entrega.',
      condicoesPrazoEntrega: document.getElementById('cfg-cond-prazo')?.value?.trim() || '15 a 20 dias úteis a contar da aprovação do sinal.',
      condicoesGarantia: document.getElementById('cfg-cond-garantia')?.value?.trim() || '12 meses para soltura de soldas e funcionamento estrutural.',
      memorialPintura: document.getElementById('cfg-memorial-pintura')?.value?.trim() || 'Aplicação de fundo protetor anticorrosivo (Zarcão). Acabamento final/pintura definitiva por conta do cliente.',
      memorialMaoDeObra: document.getElementById('cfg-memorial-mao-obra')?.value?.trim() || 'Fabricação e esquadrejamento em oficina especializada. Instalação e chumbamento no local por conta do pedreiro/cliente.'
    };

    StorageService.saveConfig(dados);
    this.carregarConfiguracoesNaTela();
    this.recalcularEmTempoReal();
    this.mostrarToast('Dados da oficina salvos com sucesso!');
  }

  baixarBackupJson() {
    const jsonStr = StorageService.exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_serralheria_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.mostrarToast('Arquivo de backup exportado com sucesso!');
  }

  carregarArquivoBackup(event) {
    const file = event.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const conteudo = e.target?.result;
      const res = StorageService.importBackup(conteudo);
      if (res.success) {
        this.mostrarToast(`Backup restaurado! ${res.countOrcamentos} orçamentos recuperados.`);
        this.renderizarListaOrcamentos();
        this.renderizarTabelaCatalogo();
        this.carregarConfiguracoesNaTela();
        this.recalcularEmTempoReal();
      } else {
        this.mostrarToast(`Falha ao restaurar backup: ${res.error}`, 'erro');
      }
    };
    reader.readAsText(file);
  }
}

// Inicializa e expõe globalmente para os manipuladores de evento HTML
window.app = new AppController();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app.init();
  });
} else {
  window.app.init();
}
