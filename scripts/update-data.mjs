#!/usr/bin/env node
/**
 * Relit les pages de règles des États sur ged.com et régénère src/data/hse.json. Aucune dépendance : Node 22.
 *
 * Source : GED Testing Service, une page par État, https://www.ged.com/policies/<etat>/ (texte HTML public, pas d'API).
 *   Phrases lues (format stable depuis 2021) :
 *     « What is my cost if I test at a Test Center ? <État> charges $X per subject … »  -> c  (prix au centre)
 *     « What is my cost if I test Online ? <État> charges $Y per subject … »            -> o  (prix en ligne)
 *     « In <État>, there is a $Z test center fee for test retakes. »                      -> rc (reprise réduite)
 * HiSET : les pages d'État de hiset.org se chargent en JavaScript derrière une protection anti-robot ; elles ne
 *   sont pas relues ici. Le script rappelle la date de leur dernière lecture à la main (data/facts/brut/hiset-state-pages.json).
 *
 * Règles de prudence :
 *   - une valeur ne change que si la phrase est trouvée telle quelle et donne un nombre ; sinon on garde l'ancienne ;
 *   - une page injoignable ne change rien ; si plus de 5 pages échouent, rien n'est écrit (site gardé tel quel) ;
 *   - les écarts sont écrits dans data/facts/releve-ged.json (lu par scripts/build-data.py) et listés à l'écran ;
 *     les aides, âges et règles de reprise restent lus à la main (CONTRIBUTING-DONNEES.md).
 *
 * Usage : node scripts/update-data.mjs [--dry] [--date AAAA-MM-JJ]
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const di = args.indexOf('--date');
const TODAY = di >= 0 ? args[di + 1] : new Date().toISOString().slice(0, 10);
const HSE = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/hse.json'), 'utf8'));
const OUT = path.join(ROOT, 'data/facts/releve-ged.json');
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { read: null, states: {} };

async function get(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (releve hebdomadaire, site statique)' } });
      if (!r.ok) throw new Error(`${r.status} ${url}`);
      return await r.text();
    } catch (e) { if (i === 2) throw e; await new Promise((s) => setTimeout(s, 3000 * (i + 1))); }
  }
}
export function plain(html) {
  return html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&reg;|®/g, '').replace(/&#8217;|&rsquo;/g, '’').replace(/\s+/g, ' ');
}
const num = (s) => (s == null ? null : Number(s.replace(/,/g, '')));
/** Extrait c, o, rc d'une page ; null quand la phrase n'est pas trouvée. */
export function parse(text) {
  /** Du titre `from` jusqu'à la question suivante (« What is… », « How… », « Do… ») ou 500 caractères. */
  const seg = (from) => { const i = text.search(from); if (i < 0) return ''; const rest = text.slice(i + 20, i + 500); const j = rest.search(/\b(What is|What are|How |Do I|Are there|Can I)\b/); return text.slice(i, i + 20 + (j < 0 ? rest.length : j)); };
  const center = seg(/What is my cost if I test at a Test Center/i);
  const online = seg(/What is my cost if I test On ?line/i);
  const charge = (s) => num(s.match(/charges \$([\d.,]+) per (?:subject|module|test)/i)?.[1] ?? null);
  return {
    c: charge(center),
    o: charge(online),
    rc: num(text.match(/there is a \$([\d.,]+) test center fee for (?:GED )?(?:test )?retakes/i)?.[1] ?? null),
  };
}

async function main() {
  const ged = HSE.states.filter((s) => s.ged);
  const found = {}, fails = [], diffs = [];
  for (let i = 0; i < ged.length; i += 4) {
    await Promise.all(ged.slice(i, i + 4).map(async (s) => {
      try { found[s.code] = parse(plain(await get(s.ged.url))); } catch (e) { fails.push(`${s.code}: ${e.message}`); }
    }));
  }
  if (fails.length > 5) { console.error(`${fails.length} pages injoignables, rien n'est écrit.\n${fails.join('\n')}`); process.exit(1); }
  const states = { ...prev.states };
  for (const s of ged) {
    const f = found[s.code]; if (!f) continue;
    for (const k of ['c', 'o', 'rc']) {
      if (f[k] == null) continue;
      if (k === 'rc' && (s.ged.retakeFree || s.ged.rc == null)) continue; // reprise payée par l'État, ou frais non publiés
      const cur = s.ged[k];
      if (cur !== f[k]) { diffs.push(`${s.code} ${k}: ${cur} -> ${f[k]}`); states[s.code] = { ...(states[s.code] ?? {}), [k]: f[k] }; }
    }
  }
  const hisetRead = HSE.hisetRead ?? HSE.read;
  const hits = (k) => Object.values(found).filter((f) => f[k] != null).length;
  console.log(`GED : ${Object.keys(found).length} pages lues (prix centre retrouvé ${hits('c')}, en ligne ${hits('o')}, reprise ${hits('rc')}), ${fails.length} échecs, ${diffs.length} écarts.`);
  for (const d of diffs) console.log(`  ${d}`);
  for (const f of fails) console.log(`  échec ${f}`);
  console.log(`HiSET : pages relues à la main, dernière lecture ${hisetRead ?? 'inconnue'} (voir CONTRIBUTING-DONNEES.md).`);
  if (DRY) return;
  fs.writeFileSync(OUT, JSON.stringify({ read: TODAY, source: 'https://www.ged.com/policies/', states, failed: fails }, null, 1) + '\n');
  execFileSync('python3', [path.join(ROOT, 'scripts/build-data.py')], { stdio: 'inherit' });
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main().catch((e) => { console.error(e); process.exit(1); });
