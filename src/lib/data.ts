/**
 * Les faits lus sur les pages officielles des États (src/data/hse.json, construit par scripts/build-data.py),
 * typés, et les formats communs aux pages et aux simulateurs. Aucun montant n'est écrit ailleurs.
 */
import RAW from '../data/hse.json';
import { formatMoney, formatNumber, displayDate, type Lang } from './format';

export type Res = 'no' | 'yes' | '30d' | '10d' | 'address' | 'under18' | 'id';
export type Sub = 'all' | 'promo' | 'cond';
export interface Ged {
  c: number; o: number | null; rc: number | null; nd: number; age: number; under: number | null; res: Res; url: string;
  first?: number; firstO?: number; sub?: Sub; once?: number; onceWhat?: 'registration' | 'yearly'; retakeFree?: boolean;
  centerExtra?: boolean; paper?: number; voucher?: number; condAge?: number; viaProgram?: boolean; since?: string; extra?: 'civics';
  /** Attente au centre : avant chacune des deux premières reprises, après la 3e tentative ; tentatives par an. */
  w1: number; w3: number; cap?: number; noRetakePassed?: boolean; readyBeforeRetake?: boolean;
  /** Aide de l'État, telle que la page la décrit. */
  help?: { en: string; es: string };
}
export interface Hiset {
  hc: number | null; ho: number | null; tf: number | null; age: number | null; res: Res; url: string;
  hp?: number; once?: number; sub?: Sub; first?: number; firstO?: number; freeRetakes?: number; since?: string;
  upTo?: boolean; centerExtra?: boolean; voucher?: number; atHomeSuspended?: boolean; help?: { en: string; es: string };
}
export interface State { code: string; en: string; es: string; ged?: Ged; hiset?: Hiset }

const D = RAW as unknown as { read: string; states: State[] };
export const READ = D.read;
export const STATES: State[] = D.states;
export const st = (code: string): State => { const s = STATES.find((x) => x.code === code); if (!s) throw new Error(`unknown state ${code}`); return s; };
export const stName = (code: string, l: Lang) => st(code)[l];
const coll = (l: Lang) => new Intl.Collator(l === 'en' ? 'en-US' : 'es-US');
export const byName = (l: Lang) => [...STATES].sort((a, b) => coll(l).compare(a[l], b[l]));
export const GED_STATES = STATES.filter((s) => s.ged);
export const HISET_STATES = STATES.filter((s) => s.hiset);
export const BOTH = STATES.filter((s) => s.ged && s.hiset);

/** Ce qui ne dépend pas de l'État : lu sur ged.com et hiset.org le 2026-10-22. */
export const GENERAL = {
  ged: {
    subjects: 4, pass: 145, max: 200, min: 100, collegeReady: 165, collegeCredit: 175, creditHours: 10,
    /** Minutes par matière (ged.com, Test Subjects). */
    minutes: { math: 115, rla: 150, social: 70, science: 90 } as Record<string, number>,
    readyPerSubject: 7.99, readyBundle: 25.99, readyPass: 145,
    retakeWindowDays: 365, waitAfterThird: 60, onlineRetakesBeforeWait: 1, readyGreenDays: 60,
    readyBands: { likely: 145, close: 134 }, creditsBySubject: { math: 3, science: 3, social: 3, rla: 1 } as Record<string, number>,
  },
  hiset: {
    subtests: 5, passEach: 8, outOf: 20, passTotal: 45, totalMax: 100, essayMin: 2, essayMax: 6, ccrEach: 15, ccrEssay: 4,
    minutes: { math: 90, science: 80, social: 70, reading: 65, writing: 120 } as Record<string, number>,
    readingSpanish: 80, atHomeProctor: 23,
  },
};

const tag = (l: Lang) => (l === 'en' ? 'en-US' : 'es-US');
/** Montant : les décimales officielles quand il y en a (36,25 $), entier sinon. */
export const usd = (x: number, l: Lang) => formatMoney(x, Number.isInteger(x) ? 0 : 2, l);
/** Total calculé : jamais de centimes à l'écran (RECETTE §4.1). */
export const usd0 = (x: number, l: Lang) => formatMoney(Math.round(x), 0, l);
export const num = (x: number, l: Lang, d = 0) => formatNumber(x, d, l);
export const day = (iso: string, l: Lang) => displayDate(iso, tag(l));
export const T = (l: Lang, en: string, es: string) => (l === 'en' ? en : es);

/** Phrase courte sur la règle de résidence. */
export function resText(r: Res, l: Lang): string {
  const m: Record<Res, [string, string]> = {
    no: ['No residency requirement', 'No exige residencia'],
    yes: ['State residents only', 'Solo residentes del estado'],
    '30d': ['Resident for at least 30 days', 'Residente desde hace 30 días o más'],
    '10d': ['Resident for at least 10 days', 'Residente desde hace 10 días o más'],
    address: ['State address needed at registration', 'Dirección en el estado al registrarse'],
    under18: ['Residency only for ages 16 and 17', 'Residencia solo a los 16 y 17 años'],
    id: ['Photo ID showing eligibility', 'Identificación con foto que muestre elegibilidad'],
  };
  return m[r][l === 'en' ? 0 : 1];
}
export type { Lang };
