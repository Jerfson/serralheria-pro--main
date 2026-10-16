/**
 * Camada de Persistência (Storage Repository)
 * Opera sobre a Web Storage API (LocalStorage) com fallback em memória para testes.
 */

import { DEFAULT_PRESETS, DEFAULT_CONFIG } from './presets.js';

const KEY_ORCAMENTOS = 'serralheria_orcamentos_v1';
const KEY_CATALOGO = 'serralheria_catalogo_v1';
const KEY_CONFIG = 'serralheria_config_v1';

// Memória volátil de fallback para ambientes sem window.localStorage (ex: Node.js)
const memoryStore = {};

function getRaw(key) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (e) {
    console.warn('LocalStorage inacessível, utilizando fallback em memória.', e);
  }
  return memoryStore[key] || null;
}

function setRaw(key, value) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
      return;
    }
  } catch (e) {
    console.warn('Falha ao gravar no LocalStorage, utilizando memória.', e);
  }
  memoryStore[key] = value;
}

export class StorageService {
  static init() {
    if (!getRaw(KEY_CATALOGO)) {
      setRaw(KEY_CATALOGO, JSON.stringify(DEFAULT_PRESETS));
    }
    if (!getRaw(KEY_CONFIG)) {
      setRaw(KEY_CONFIG, JSON.stringify(DEFAULT_CONFIG));
    }
    if (!getRaw(KEY_ORCAMENTOS)) {
      setRaw(KEY_ORCAMENTOS, JSON.stringify([]));
    }
  }

  // ─── Orçamentos ──────────────────────────────────────────────

  static getOrcamentos() {
    this.init();
    try {
      const data = JSON.parse(getRaw(KEY_ORCAMENTOS) || '[]');
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Erro ao ler orçamentos:', e);
      return [];
    }
  }

  static getOrcamentoById(id) {
    const list = this.getOrcamentos();
    return list.find(item => item.id === id) || null;
  }

  static saveOrcamento(orcamento) {
    const list = this.getOrcamentos();
    const now = new Date().toISOString();

    if (!orcamento.id) {
      // Novo orçamento
      const maxSeq = list.reduce((max, item) => Math.max(max, item.numeroSequencial || 100), 100);
      orcamento.id = 'orc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      orcamento.numeroSequencial = maxSeq + 1;
      orcamento.dataCriacaoIso = now;
      orcamento.dataAtualizacaoIso = now;
      if (!orcamento.status) orcamento.status = 'aberto';
      list.unshift(orcamento);
    } else {
      // Atualização
      const index = list.findIndex(item => item.id === orcamento.id);
      if (index !== -1) {
        orcamento.dataAtualizacaoIso = now;
        list[index] = { ...list[index], ...orcamento };
      } else {
        list.unshift(orcamento);
      }
    }

    setRaw(KEY_ORCAMENTOS, JSON.stringify(list));
    return orcamento;
  }

  static deleteOrcamento(id) {
    let list = this.getOrcamentos();
    list = list.filter(item => item.id !== id);
    setRaw(KEY_ORCAMENTOS, JSON.stringify(list));
    return true;
  }

  static updateStatus(id, newStatus) {
    const orc = this.getOrcamentoById(id);
    if (!orc) return null;
    orc.status = newStatus;
    return this.saveOrcamento(orc);
  }

  static duplicateOrcamento(id) {
    const orc = this.getOrcamentoById(id);
    if (!orc) return null;

    const clone = JSON.parse(JSON.stringify(orc));
    delete clone.id;
    delete clone.numeroSequencial;
    clone.status = 'aberto';
    clone.cliente.nome = (clone.cliente.nome || 'Cliente') + ' (Cópia)';
    return this.saveOrcamento(clone);
  }

  // ─── Catálogo de Materiais e Preços ──────────────────────────

  static getCatalogo() {
    this.init();
    try {
      const data = JSON.parse(getRaw(KEY_CATALOGO) || '[]');
      return Array.isArray(data) && data.length > 0 ? data : DEFAULT_PRESETS;
    } catch (e) {
      return DEFAULT_PRESETS;
    }
  }

  static getMaterialById(id) {
    const cat = this.getCatalogo();
    return cat.find(m => m.id === id) || null;
  }

  static updatePrecoMaterial(id, novoPreco) {
    const cat = this.getCatalogo();
    const mat = cat.find(m => m.id === id);
    if (mat) {
      mat.precoUnitarioPadrao = Number(novoPreco) || 0;
      setRaw(KEY_CATALOGO, JSON.stringify(cat));
      return mat;
    }
    return null;
  }

  static updateMaterial(id, dados) {
    const cat = this.getCatalogo();
    const index = cat.findIndex(m => m.id === id);
    if (index !== -1) {
      cat[index] = { ...cat[index], ...dados, id };
      setRaw(KEY_CATALOGO, JSON.stringify(cat));
      return cat[index];
    }
    return null;
  }

  static addMaterial(material) {
    const cat = this.getCatalogo();
    if (!material.id) {
      material.id = 'custom_' + Date.now();
    }
    cat.push(material);
    setRaw(KEY_CATALOGO, JSON.stringify(cat));
    return material;
  }

  static deleteMaterial(id) {
    let cat = this.getCatalogo();
    cat = cat.filter(m => m.id !== id);
    setRaw(KEY_CATALOGO, JSON.stringify(cat));
    return true;
  }

  static reajustarPrecos(percentual, categoria = 'todos') {
    const cat = this.getCatalogo();
    const fator = 1 + (Number(percentual) / 100);
    let afetados = 0;

    cat.forEach(m => {
      if (categoria === 'todos' || m.categoria === categoria) {
        m.precoUnitarioPadrao = Math.max(0, Math.round((m.precoUnitarioPadrao * fator) * 100) / 100);
        afetados++;
      }
    });

    setRaw(KEY_CATALOGO, JSON.stringify(cat));
    return { afetados, percentual };
  }

  // ─── Configurações da Oficina ────────────────────────────────

  static getConfig() {
    this.init();
    try {
      const cfg = JSON.parse(getRaw(KEY_CONFIG) || '{}');
      return { ...DEFAULT_CONFIG, ...cfg };
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  }

  static saveConfig(config) {
    const current = this.getConfig();
    const updated = { ...current, ...config };
    setRaw(KEY_CONFIG, JSON.stringify(updated));
    return updated;
  }

  // ─── Backup: Exportação e Importação ─────────────────────────

  static exportBackup() {
    const backup = {
      versaoExportacao: '1.0',
      dataGeracaoIso: new Date().toISOString(),
      sistema: 'sistema-seralheria',
      dados: {
        orcamentos: this.getOrcamentos(),
        catalogo: this.getCatalogo(),
        configuracao: this.getConfig()
      }
    };
    return JSON.stringify(backup, null, 2);
  }

  static importBackup(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || !parsed.dados) {
        throw new Error('Formato de backup inválido: bloco de dados ausente.');
      }
      if (Array.isArray(parsed.dados.orcamentos)) {
        setRaw(KEY_ORCAMENTOS, JSON.stringify(parsed.dados.orcamentos));
      }
      if (Array.isArray(parsed.dados.catalogo)) {
        setRaw(KEY_CATALOGO, JSON.stringify(parsed.dados.catalogo));
      }
      if (parsed.dados.configuracao && typeof parsed.dados.configuracao === 'object') {
        setRaw(KEY_CONFIG, JSON.stringify(parsed.dados.configuracao));
      }
      return { success: true, countOrcamentos: (parsed.dados.orcamentos || []).length };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}
