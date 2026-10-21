/**
 * Moteur pur : coût du GED ou du HiSET pour une personne, admissibilité selon l'âge, réussite selon les notes.
 * Toutes les valeurs viennent de src/data/hse.json (pages officielles des États, lues le 2026-10-22).
 *
 * Règles appliquées (pages ged.com et hiset.org) :
 * - GED : prix par matière au centre ou en ligne ; un échec payé plein tarif ouvre une reprise réduite au centre
 *   (deux au Texas, en Caroline du Sud, au Rhode Island), au prix des frais restants ; jamais de réduction en ligne.
 * - HiSET : le plein tarif ne se paie qu'aux 1re et 4e tentatives d'une épreuve ; les 2e et 3e ne coûtent que les
 *   frais du centre (ou de surveillance à domicile), soit le prix moins les frais d'examen.
 * - Les reprises sont réparties une par matière tour à tour (hypothèse dite sur la page Méthode).
 */
import { st, GENERAL, type Ged, type Hiset } from '../data';

export type Mode = 'center' | 'online';
export interface CostIn { mode: Mode; parts: number; retakes: number; qualify: boolean; age?: number; ready?: number }
export interface CostOut {
  available: boolean;
  /** Raison quand le format n'existe pas ou que l'État ne publie pas le prix. */
  why?: 'no-test' | 'no-online' | 'no-price';
  base: number; firstEach: number; first: number; once: number; retake: number; ready: number; total: number;
  /** Aide appliquée : 'all' (tout le monde), 'promo' (code public), 'cond' (si vous y avez droit). */
  help: 'all' | 'promo' | 'cond' | null; helpApplied: boolean;
  /** Des frais de centre non publiés s'ajoutent (Montana, Wyoming). */
  extraFees: boolean;
  /** Prix des reprises inconnu au-delà des reprises gratuites (Massachusetts, Mississippi). */
  retakeUnknown: boolean;
  /** Tentatives réparties : [matière][tentative] = prix. */
  plan: number[][];
}
const round2 = (x: number) => Math.round(x * 100) / 100;
/** Répartit `n` reprises une par matière, tour à tour. */
export function spread(n: number, parts: number): number[] { const r = Array(parts).fill(0); for (let i = 0; i < n; i++) r[i % parts]++; return r; }

export function gedCost(code: string, x: CostIn): CostOut {
  const g: Ged | undefined = st(code).ged;
  const parts = Math.max(1, Math.min(GENERAL.ged.subjects, Math.round(x.parts)));
  const empty = (why: CostOut['why']): CostOut => ({ available: false, why, base: 0, firstEach: 0, first: 0, once: 0, retake: 0, ready: 0, total: 0, help: null, helpApplied: false, extraFees: false, retakeUnknown: false, plan: [] });
  if (!g) return empty('no-test');
  const online = x.mode === 'online';
  if (online && g.o == null) return empty('no-online');
  const base = online ? g.o! : g.c;
  let firstEach = base, helpApplied = false, voucher = 0;
  if ((g.sub === 'all' || g.sub === 'promo') && g.first !== undefined) { const f = online ? g.firstO ?? base : g.first; if (f < base) { firstEach = f; helpApplied = true; } }
  if (g.sub === 'cond' && x.qualify && !(g.condAge && (x.age ?? 99) < g.condAge)) {
    if (g.voucher) voucher = g.voucher; else firstEach = 0;
    helpApplied = true;
  }
  const retakes = Math.max(0, Math.round(x.retakes));
  const per = spread(retakes, parts);
  const plan: number[][] = per.map((r) => {
    const tries = [firstEach];
    for (let j = 0; j < r; j++) {
      let p: number;
      if (g.retakeFree && !online) p = 0;
      else if (online) p = base;
      else { const disc = j % (g.nd + 1) < g.nd; p = disc ? (g.rc ?? 0) : base; }
      tries.push(p);
    }
    return tries;
  });
  const firstRaw = round2(firstEach * parts);
  const first = Math.max(0, round2(firstRaw - voucher));
  const retake = round2(plan.reduce((s, t) => s + t.slice(1).reduce((a, b) => a + b, 0), 0));
  const once = g.once ?? 0;
  const readyN = Math.max(0, Math.min(GENERAL.ged.subjects, Math.round(x.ready ?? 0)));
  const ready = readyN === GENERAL.ged.subjects ? GENERAL.ged.readyBundle : round2(readyN * GENERAL.ged.readyPerSubject);
  const total = round2(first + retake + once + ready);
  return { available: true, base, firstEach, first, once, retake, ready, total, help: g.sub ?? null, helpApplied, extraFees: !!g.centerExtra && !online, retakeUnknown: false, plan };
}

export type HMode = 'center' | 'home';
export interface HCostIn { mode: HMode; parts: number; retakes: number; qualify: boolean }
export function hisetCost(code: string, x: HCostIn): CostOut {
  const h: Hiset | undefined = st(code).hiset;
  const parts = Math.max(1, Math.min(GENERAL.hiset.subtests, Math.round(x.parts)));
  const empty = (why: CostOut['why']): CostOut => ({ available: false, why, base: 0, firstEach: 0, first: 0, once: 0, retake: 0, ready: 0, total: 0, help: null, helpApplied: false, extraFees: false, retakeUnknown: false, plan: [] });
  if (!h) return empty('no-test');
  const home = x.mode === 'home';
  const price = home ? h.ho : h.hc;
  // À domicile : seulement là où la page publie un prix ; sinon le format n'est pas listé (ou suspendu).
  if (home && h.ho == null) return empty('no-online');
  const statePays = h.sub === 'all' && h.first === 0 && (!home || h.firstO === 0);
  if (price == null && !statePays) return empty('no-price');
  const base = price ?? 0;
  let firstEach = base, helpApplied = false, voucher = 0;
  if ((h.sub === 'all' || h.sub === 'promo') && h.first !== undefined) { const f = home ? h.firstO ?? h.first : h.first; if (f < base || price == null) { firstEach = f; helpApplied = true; } }
  if (h.sub === 'cond' && x.qualify) { if (h.voucher) { if (!home) { voucher = h.voucher; helpApplied = true; } } else { firstEach = 0; helpApplied = true; } }
  const retakes = Math.max(0, Math.round(x.retakes));
  const per = spread(retakes, parts);
  const reduced = h.tf != null && price != null ? Math.max(0, round2(base - h.tf)) : 0;
  let retakeUnknown = false;
  const allCovered = h.sub === 'cond' && helpApplied && !h.voucher && code === 'TN';
  const plan: number[][] = per.map((r) => {
    const tries = [firstEach];
    for (let j = 0; j < r; j++) {
      const attempt = j + 2; // 2e, 3e, 4e… tentative
      let p: number;
      if (h.freeRetakes && j < h.freeRetakes) p = 0;
      else if (h.freeRetakes) { p = 0; retakeUnknown = true; }
      else p = (attempt - 1) % 3 === 0 ? base : reduced;
      if (allCovered) p = 0;
      tries.push(p);
    }
    return tries;
  });
  const first = Math.max(0, round2(firstEach * parts - voucher));
  const retake = round2(plan.reduce((s, t) => s + t.slice(1).reduce((a, b) => a + b, 0), 0));
  const once = statePays || allCovered ? 0 : h.once ?? 0;
  const total = round2(first + retake + once);
  return { available: true, base, firstEach, first, once, retake, ready: 0, total, help: h.sub ?? null, helpApplied, extraFees: !!(h.centerExtra || h.upTo) && !home, retakeUnknown, plan };
}

/** Peut-on passer l'examen à cet âge dans cet État ? */
export type Elig = 'ok' | 'waiver' | 'too-young' | 'unknown';
export function eligibility(code: string, test: 'ged' | 'hiset', age: number): { status: Elig; age: number | null; under: number | null } {
  const s = st(code);
  if (test === 'ged') {
    const g = s.ged; if (!g) return { status: 'unknown', age: null, under: null };
    if (age >= g.age) return { status: 'ok', age: g.age, under: g.under };
    if (g.under != null && age >= g.under) return { status: 'waiver', age: g.age, under: g.under };
    if (g.under == null) return { status: 'waiver', age: g.age, under: null };
    return { status: 'too-young', age: g.age, under: g.under };
  }
  const h = s.hiset; if (!h) return { status: 'unknown', age: null, under: null };
  if (h.age == null) return { status: age >= 16 ? 'waiver' : 'too-young', age: null, under: 16 };
  if (age >= h.age) return { status: 'ok', age: h.age, under: 16 };
  return { status: age >= 16 ? 'waiver' : 'too-young', age: h.age, under: 16 };
}

/** GED : 145 par matière ; 165 « College Ready » ; 175 « College Ready + Credit ». */
export function gedResult(scores: number[]) {
  const G = GENERAL.ged;
  const each = scores.map((s) => ({ s, pass: s >= G.pass, ready: s >= G.collegeReady, credit: s >= G.collegeCredit, gap: Math.max(0, G.pass - s) }));
  return { pass: each.every((e) => e.pass), passed: each.filter((e) => e.pass).length, ready: each.filter((e) => e.ready).length, credit: each.filter((e) => e.credit).length, each, gap: each.reduce((a, e) => a + e.gap, 0) };
}
/** HiSET : 8 sur 20 à chaque épreuve, 45 sur 100 au total, 2 sur 6 à l'essai. */
export function hisetResult(scores: number[], essay: number) {
  const H = GENERAL.hiset;
  const total = scores.reduce((a, b) => a + b, 0);
  const each = scores.map((s) => ({ s, pass: s >= H.passEach, ccr: s >= H.ccrEach }));
  const essayOk = essay >= H.essayMin;
  return { pass: each.every((e) => e.pass) && total >= H.passTotal && essayOk, total, totalOk: total >= H.passTotal, essayOk, failed: each.filter((e) => !e.pass).length, ccr: each.filter((e) => e.ccr).length, totalGap: Math.max(0, H.passTotal - total) };
}

/** Calendrier : semaines d'étude par matière, une matière après l'autre, plus l'attente imposée après un échec. */
export function plan(parts: number, weeksEach: number, waitDays: number, fails: number) {
  const days = Math.round(parts * weeksEach * 7 + fails * waitDays);
  return { days, weeks: Math.ceil(days / 7) };
}
export function addDays(iso: string, d: number) { const t = new Date(`${iso}T00:00:00Z`); t.setUTCDate(t.getUTCDate() + d); return t.toISOString().slice(0, 10); }
