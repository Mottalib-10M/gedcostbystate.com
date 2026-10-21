/**
 * Une page = UN fichier de contenu (CONTRIBUTING-PAGES.md) : `src/content/guides/<id>.ts`, avec la
 * version anglaise (`en`) et la version espagnole (`es`) côte à côte. Routes, menus, pied de page,
 * sitemap, hreflang, schémas et liens internes lisent ces fichiers et rien d'autre.
 */
import type { Lang } from './format';

export interface FAQ { q: string; a: string }
export interface MiniOpts { /** titre */ t?: string; /** champs montrés */ p?: string[]; /** valeurs par défaut */ d?: Record<string, number | string>; /** texte du lien */ c?: string }

export interface Helpers {
  lang: Lang;
  /** Lien interne par id de page, dans la langue de la page. Id inconnu = test en échec. */
  a: (id: string, text: string) => string;
  /** Tableau ; les nombres sont formatés dans la langue, les chaînes insérées en HTML. */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Lien vers une source (clé de params-2026.json, ou ged-XX / hiset-XX pour la page d'un État). */
  src: (key: string, text?: string) => string;
  ext: (url: string, text: string) => string;
  box: (title: string, html: string) => string;
  /** Mini-simulateur bâti sur un calculateur de tool-specs.ts. */
  mini: (kind: string, opts?: MiniOpts) => string;
  /** Nombre ; montant officiel (décimales gardées) ; total calculé (sans centimes) ; date ; nom d'État. */
  n: (x: number, d?: number) => string; usd: (x: number) => string; usd0: (x: number) => string; day: (iso: string) => string; st: (code: string) => string;
}

export type Group = 'cost' | 'prep' | 'rules' | 'states';

export interface LangPage {
  /** Segment d'URL, minuscules et tirets, sans accent. */
  slug: string;
  nav: string; card: string;
  /** 50 à 60 caractères, terme clé d'abord, année comprise (RECETTE §11). */
  title: string;
  /** 150 à 160 caractères, année comprise. */
  description: string;
  h1: string; intro: string;
  /** UN paragraphe de 120 mots ou plus : la réponse directe, chiffrée (RECETTE §21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
}
export interface GuideDef {
  id: string; group: Group; order: number;
  /** Calculateur en tête : une clé de tool-specs.ts, ou quiz-<matière> pour un test d'entraînement. */
  tool: string;
  toolArg?: Record<string, number | string>;
  related: string[];
  /** Clés de params-2026.json > sources, ou ged-XX / hiset-XX. */
  sources: string[];
  es: LangPage; en: LangPage;
  /** État que décrit la page (pages par État). */
  state?: string;
}
export const defineGuide = (p: GuideDef): GuideDef => p;
