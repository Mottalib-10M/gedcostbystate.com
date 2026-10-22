import { makeRouter, type RouteDef } from './routes-core';
import { GUIDES } from '../lib/pages';
/** Anglais et espagnol sur toutes les pages : les deux langues dans lesquelles le GED et le HiSET se passent. */
export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
const R = (id: string, es: string, en: string, noindex = false) => ({ id, paths: { en: `/en/${en}/`, es: `/es/${es}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { en: '/en/', es: '/es/' } },
  R('method', 'metodologia', 'method'),
  R('about', 'sobre-nosotros', 'about'),
  R('widget', 'widget', 'widget', true),
  R('contact', 'contacto', 'contact', true),
  R('editorial', 'politica-editorial', 'editorial-policy', true),
  R('privacy', 'privacidad', 'privacy', true),
  R('terms', 'aviso-legal', 'legal-notice', true),
  R('cookies', 'cookies', 'cookies', true),
];
const G = (g: (typeof GUIDES)[number]): RouteDef<Locale> => ({ id: g.id, paths: { en: `/en/${g.en.slug}/`, es: `/es/${g.es.slug}/` } });
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...GUIDES.map(G), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, hasRoute, altPaths } = makeRouter(LOCALES, ROUTES);
