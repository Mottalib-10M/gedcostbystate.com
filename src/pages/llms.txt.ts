/** llms.txt (RECETTE §21), généré à partir du registre des pages et des données du jour. */
import { GUIDES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { READ, usd0 } from '../lib/data';
import { S } from '../lib/stats';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> Total cost of the GED and HiSET high school equivalency tests in all 50 states and Washington, D.C., in English and Spanish: price per subject at a test center and online, retakes, one-time state fees, free first attempts and state vouchers, minimum age, waivers and residency, read on the state policy pages of ged.com and hiset.org on ${READ}. The GED costs ${usd0(S.ged.median, 'en')} for four subjects in the median state; the HiSET ${usd0(S.hiset.median, 'en')} for five subtests. Calculators add up the cost for one person, compare GED and HiSET, check passing scores and plan the dates. Practice questions are written by the publisher from the published test topics and are not real test questions. Independent site published by Radif Partners, not affiliated with GED Testing Service, ETS or any state. Last updated ${LAST_UPDATED}.`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en} / ${g.label.es}`, ...GUIDES.filter((p) => p.group === g.id).flatMap((p) => [`- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`, `- [${p.es.nav}](${SITE_URL}${route(p.id, 'es')}): ${p.es.card}`]), '']),
    '## About', `- [Method](${SITE_URL}${route('method', 'en')})`, `- [Método](${SITE_URL}${route('method', 'es')})`, `- [About](${SITE_URL}${route('about', 'en')})`, `- [Quiénes somos](${SITE_URL}${route('about', 'es')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
