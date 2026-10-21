/**
 * Chiffres d'ensemble tirés des 51 pages d'État : prix complet des quatre matières du GED ou des cinq épreuves du
 * HiSET au premier passage, rangs, médiane, États gratuits. Les pages les citent ; rien n'est écrit à la main.
 */
import { STATES, GED_STATES, HISET_STATES, st, type State } from './data';
import { gedCost, hisetCost } from './engine/hse';

export type Test = 'ged' | 'hiset';
export type AnyMode = 'center' | 'online';
/** Prix du premier passage complet, aides ouvertes à tous et codes publics compris, sans aide sous condition. */
export function full(code: string, test: Test, mode: AnyMode = 'center') {
  return test === 'ged'
    ? gedCost(code, { mode, parts: 4, retakes: 0, qualify: false })
    : hisetCost(code, { mode: mode === 'online' ? 'home' : 'center', parts: 5, retakes: 0, qualify: false });
}
/** Prix sans aucune aide (le prix affiché par la page avant code ou bon). */
export function listPrice(code: string, test: Test, mode: AnyMode = 'center'): number | null {
  const s = st(code);
  if (test === 'ged') { const g = s.ged; if (!g) return null; const p = mode === 'online' ? g.o : g.c; return p == null ? null : p * 4 + (g.once ?? 0); }
  const h = s.hiset; if (!h) return null; const p = mode === 'online' ? h.ho : h.hc; return p == null ? null : p * 5 + (h.once ?? 0);
}
export interface Row { s: State; total: number }
export function ranking(test: Test, mode: AnyMode = 'center'): Row[] {
  const list = test === 'ged' ? GED_STATES : HISET_STATES;
  return list.map((s) => ({ s, r: full(s.code, test, mode) })).filter((x) => x.r.available).map((x) => ({ s: x.s, total: x.r.total })).sort((a, b) => a.total - b.total || a.s.en.localeCompare(b.s.en));
}
export function median(xs: number[]) { const a = [...xs].sort((x, y) => x - y); const m = a.length >> 1; return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2; }
const paid = (rows: Row[]) => rows.filter((r) => r.total > 0);
export const GED_RANK = ranking('ged');
export const HISET_RANK = ranking('hiset');
export const GED_ONLINE_RANK = ranking('ged', 'online');
export const S = {
  ged: {
    n: GED_STATES.length, online: GED_ONLINE_RANK.length,
    median: median(GED_RANK.map((r) => r.total)),
    medianPaid: median(paid(GED_RANK).map((r) => r.total)),
    cheapestPaid: paid(GED_RANK)[0], dearest: GED_RANK[GED_RANK.length - 1],
    free: GED_RANK.filter((r) => r.total === 0).map((r) => r.s.code),
    under50: GED_RANK.filter((r) => r.total > 0 && r.total < 50).map((r) => r.s.code),
    subsidized: GED_STATES.filter((s) => s.ged!.sub).map((s) => s.code),
    cond: GED_STATES.filter((s) => s.ged!.sub === 'cond').map((s) => s.code),
    price36: GED_STATES.filter((s) => s.ged!.c === 36).length,
    noOnline: GED_STATES.filter((s) => s.ged!.o == null).map((s) => s.code),
  },
  hiset: {
    n: HISET_STATES.length,
    median: median(HISET_RANK.map((r) => r.total)),
    medianPaid: median(paid(HISET_RANK).map((r) => r.total)),
    cheapestPaid: paid(HISET_RANK)[0], dearest: HISET_RANK[HISET_RANK.length - 1],
    free: HISET_RANK.filter((r) => r.total === 0).map((r) => r.s.code),
    noPrice: HISET_STATES.filter((s) => s.hiset!.hc == null && !(s.hiset!.sub === 'all' && s.hiset!.first === 0)).map((s) => s.code),
    noHome: HISET_STATES.filter((s) => s.hiset!.ho == null).map((s) => s.code),
  },
  both: STATES.filter((s) => s.ged && s.hiset).map((s) => s.code),
  hisetOnly: STATES.filter((s) => !s.ged && s.hiset).map((s) => s.code),
  gedOnly: STATES.filter((s) => s.ged && !s.hiset).map((s) => s.code),
  /** Les deux examens : lequel coûte le moins au centre, premier passage. */
  cheaperHiset: STATES.filter((s) => s.ged && s.hiset).filter((s) => { const g = full(s.code, 'ged'), h = full(s.code, 'hiset'); return g.available && h.available && h.total < g.total; }).map((s) => s.code),
  cheaperGed: STATES.filter((s) => s.ged && s.hiset).filter((s) => { const g = full(s.code, 'ged'), h = full(s.code, 'hiset'); return g.available && h.available && g.total < h.total; }).map((s) => s.code),
  /** Reprise réduite au centre la plus fréquente. */
  rc10: GED_STATES.filter((s) => s.ged!.rc === 10).length,
  ages: { 16: GED_STATES.filter((s) => s.ged!.age === 16).map((s) => s.code), 17: GED_STATES.filter((s) => s.ged!.age === 17).map((s) => s.code), 19: GED_STATES.filter((s) => s.ged!.age === 19).map((s) => s.code) },
  residency: GED_STATES.filter((s) => s.ged!.res === 'yes' || s.ged!.res === '30d' || s.ged!.res === '10d').map((s) => s.code),
  noResidency: GED_STATES.filter((s) => s.ged!.res === 'no').map((s) => s.code),
};
/** Rang d'un État (1 = le moins cher), parmi ceux qui publient un prix. */
export const rankOf = (code: string, test: Test, mode: AnyMode = 'center') => { const r = test === 'ged' ? (mode === 'online' ? GED_ONLINE_RANK : GED_RANK) : HISET_RANK; const i = r.findIndex((x) => x.s.code === code); return i < 0 ? null : { pos: i + 1, of: r.length }; };
