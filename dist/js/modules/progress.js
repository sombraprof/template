import { lsGet, lsSet } from './storage.js';

export function getVisitedSet(type) {
  try {
    const raw = lsGet(`visited:${type}`);
    const arr = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
    return new Set(arr);
  } catch(_) { return new Set(); }
}

export function markVisited(type, id) {
  try {
    const raw = lsGet(`visited:${type}`);
    const arr = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
    if (!arr.includes(id)) {
      arr.push(id);
      lsSet(`visited:${type}`, JSON.stringify(arr));
    }
  } catch(_){}
}

export function getListaSolvedSet(id) {
  try {
    const raw = lsGet(`visited:lista:${id}:solved`);
    const arr = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
    return new Set(arr);
  } catch(_) { return new Set(); }
}

export function setListaSolvedSet(id, set) {
  try { lsSet(`visited:lista:${id}:solved`, JSON.stringify(Array.from(set))); } catch(_){}
}

export function updateListCardProgress(listId) {
  try {
    const card = document.querySelector(`#listas-container a[data-list-id="${CSS.escape(listId)}"]`);
    const totals = window.__LISTAS_TOTALS || {};
    const total = totals[listId] || 0;
    const solved = getListaSolvedSet(listId).size;
    const pct = total ? Math.round((solved / total) * 100) : 0;
    if (card) {
      const textEl = card.querySelector('[data-progress="text"]');
      const barEl = card.querySelector('[data-progress="bar"]');
      const doneBadge = card.querySelector('[data-badge="done"]');
      if (textEl) textEl.textContent = `Progresso: ${solved}/${total}`;
      if (barEl) {
        const cls = `w-pct-${Math.min(100, Math.max(0, Math.round(pct/10)*10))}`;
        barEl.className = `h-full bg-indigo-500 ${cls}`;
      }
      if (doneBadge) doneBadge.classList.toggle('hidden', !(total && solved===total));
    }
  } catch (_) {}
}
