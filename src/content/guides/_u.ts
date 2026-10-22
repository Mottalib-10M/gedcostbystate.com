/** Petits outils partagés par les fichiers de contenu (jamais une page : le registre ignore les fichiers _*.ts). */
import { st, stName, usd, usd0, num, resText, type Lang } from '../../lib/data';
import { full, rankOf } from '../../lib/stats';
import type { Helpers } from '../../lib/page-types';
import { gedCost, hisetCost } from '../../lib/engine/hse';
export { st, usd, usd0, num, resText };
export type { Lang };
export const list = (codes: string[], l: Lang) => { const n = codes.map((c) => stName(c, l)); return n.length < 2 ? n.join('') : `${n.slice(0, -1).join(', ')} ${l === 'en' ? 'and' : 'y'} ${n[n.length - 1]}`; };
/** Prix du premier passage complet (aides ouvertes à tous comprises). */
export const tot = (code: string, t: 'ged' | 'hiset' = 'ged', m: 'center' | 'online' = 'center') => full(code, t, m).total;
export const rank = (code: string, t: 'ged' | 'hiset' = 'ged', m: 'center' | 'online' = 'center') => rankOf(code, t, m)!;
/** Tableau « ce que coûte chaque tentative » d'une matière, selon le nombre de reprises. */
export function attemptsTable(h: Helpers, rows: Array<[string, number[]]>, cap: string) {
  const k = Math.max(...rows.map((r) => r[1].length));
  const l = h.lang;
  return h.table([l === 'en' ? 'Case' : 'Caso', ...Array.from({ length: k }, (_, i) => (l === 'en' ? `Attempt ${i + 1}` : `Intento ${i + 1}`))], rows.map(([n, a]) => [n, ...Array.from({ length: k }, (_, i) => (a[i] === undefined ? '' : h.usd(a[i])))]), cap, ['l', ...Array.from({ length: k }, () => 'r' as const)]);
}
/** Prix de chaque tentative d'une matière GED (1re puis reprises), au centre ou en ligne, sans aide. */
export const gedTries = (code: string, mode: 'center' | 'online', retakes: number) => gedCost(code, { mode, parts: 1, retakes, qualify: false }).plan[0];
/** Idem pour une épreuve HiSET (centre ou domicile). */
export const hisetTries = (code: string, mode: 'center' | 'home', retakes: number) => hisetCost(code, { mode, parts: 1, retakes, qualify: false }).plan[0];
