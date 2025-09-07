import { CONTENT_BASE_PATH } from './modules/page-config.js';

// Modular: usar implementação de branding em módulo dedicado
import { applyBranding as brandingApply } from './modules/branding.js';

// Quando o DOM estiver pronto, carrega aulas e resolve hash
import { setupTheme as themeSetup } from './modules/theme.js';
import { setupMobileNav as navSetup } from './modules/nav.js';
import * as TOC from './modules/toc.js';
import * as Sidebar from './modules/sidebar.js';
import * as Aulas from './modules/aulas.js';
import * as Listas from './modules/listas.js';
import * as Router from './modules/router.js';

async function initializeApp() {
  // Carrega a configuração da disciplina primeiro
  try {
    const configRes = await fetch(`/${CONTENT_BASE_PATH}/config.json`);
    const disciplineConfig = await configRes.json();
    
    // Sobrescreve as variáveis globais com a configuração da disciplina
    window.APP_NOME_DISCIPLINA = disciplineConfig.courseName || window.APP_NOME_DISCIPLINA || 'Curso';
    window.APP_SIGLA = disciplineConfig.courseCode || window.APP_SIGLA || 'DISC';
    document.title = disciplineConfig.siteTitle || window.APP_NOME_DISCIPLINA;

    // Define a cor do tema a partir da configuração
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta && disciplineConfig.themeColor) {
      themeMeta.setAttribute('content', disciplineConfig.themeColor);
    }

  } catch (err) {
    console.error(`Falha ao carregar configuração da disciplina de /${CONTENT_BASE_PATH}/config.json`, err);
    // Opcional: mostrar uma mensagem de erro na tela
    const mainContent = document.getElementById('main-content');
    if(mainContent) mainContent.innerHTML = '<div class="p-4 text-red-700 bg-red-100 border border-red-400 rounded">Erro Crítico: Não foi possível carregar a configuração da disciplina.</div>'
    return; // Impede o resto da inicialização
  }

  // Agora que a configuração está carregada, aplica o branding e inicializa o resto
  try { brandingApply(); } catch(_){}
  // Inicializações resilientes em try/catch para não interromper as demais
  try { themeSetup(); } catch (_) {}
  try { navSetup(); } catch (_) {}
  // Outras inicializações que dependem do DOM e da configuração
  try { Sidebar.setupSidebarInteractions(); } catch(_){ }
  try { Aulas.loadAulas(); } catch (_) {}
  try { Listas.loadListas(); } catch (_) {}
  try { Router.initRouter(); } catch (_) {}
}


document.addEventListener("DOMContentLoaded", initializeApp);