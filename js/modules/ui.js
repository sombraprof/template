import { lsGet, lsSet } from './storage.js';
import * as Sidebar from './sidebar.js';
import { setTOCOpen } from './toc.js';

export function showToast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('hidden');
  el.classList.add('show');
  setTimeout(()=> { el.classList.add('hidden'); el.classList.remove('show'); }, 2500);
}

export function showHomeSkeleton() {
  const cards = document.getElementById('cards-container');
  const listas = document.getElementById('listas-container');
  if (cards) {
    cards.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'space-y-3';
    const title = document.createElement('div');
    title.className = 'h-6 w-40 skeleton rounded';
    wrap.appendChild(title);
    const grid = document.createElement('div');
    grid.className = 'grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6';
    for (let i=0;i<2;i++) {
      const card = document.createElement('div');
      card.className = 'p-6 bg-white rounded-lg shadow skeleton h-24';
      grid.appendChild(card);
    }
    wrap.appendChild(grid);
    cards.appendChild(wrap);
  }
  if (listas) {
    listas.innerHTML='';
  }
}

export function showHomeAnchor(anchorId) {
  const conteudo = document.getElementById('conteudo');
  if (conteudo) conteudo.innerHTML = '';
  const nav = document.getElementById('aula-nav');
  if (nav) nav.classList.add('hidden');
  document.title = (window.APP_NOME_DISCIPLINA || 'Curso');
}

export function notFound(message) {
  const conteudo = document.getElementById('conteudo');
  if (!conteudo) return;
  conteudo.innerHTML = `<div class="p-6 bg-red-50 border border-red-200 text-red-700 rounded">${message || 'Conteúdo não encontrado.'}</div>`;
  const toc = document.getElementById('toc');
  if (toc) { try { setTOCOpen(false); } catch(_){} toc.innerHTML = ''; }
  const nav = document.getElementById('aula-nav');
  if (nav) nav.classList.add('hidden');
  document.title = (window.APP_NOME_DISCIPLINA || 'Curso');
}

export function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) btn.classList.remove('hidden');
    else btn.classList.add('hidden');
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
