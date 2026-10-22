# Données du site GED et HiSET (us-ged-hiset)

Aucun montant n'est écrit dans une page : tout vient de `src/data/hse.json`, construit par
`scripts/build-data.py` à partir des pages officielles des États.

## Sources

- **GED** : GED Testing Service, une page de règles par État, `https://www.ged.com/policies/<etat>/`
  (Michigan : page espagnole, l'anglaise renvoyait 404). Prix par matière au centre et en ligne, reprise
  réduite, aides de l'État, âge, résidence, attentes entre reprises. Extraits mot pour mot archivés dans
  `data/facts/brut/ged-state-pages.json`. Faits généraux (notes, GED Ready, durées) : pages de ged.com listées
  dans `src/data/params-2026.json`, recopiés dans `GENERAL` (`src/lib/data.ts`).
- **HiSET** : programme HiSET, une page par État, `https://hiset.org/<etat>/`, et
  `https://hiset.org/get-your-scores/`. Les pages refusent les scripts (HTTP 403, protection anti-robot) :
  elles sont lues à la main, une par une ; nos notes, chiffres tels qu'imprimés, sont dans
  `data/facts/brut/hiset-state-pages.json`. Quand une page se contredit (Ohio : nombre de reprises par an), les
  deux lectures sont notées et le site le dit.
- **Licence** : pages publiques d'information ; le site reprend des faits (prix, âges, règles) avec la
  source et la date, jamais un texte ni un logo. Aucune question réelle d'examen.

## Mise à jour

```
node scripts/update-data.mjs --dry      # relit les 49 pages GED, liste les écarts, n'écrit rien
node scripts/update-data.mjs            # écrit data/facts/releve-ged.json puis relance build-data.py
python3 scripts/build-data.py           # après une correction à la main (aides, âges, HiSET)
```

Le relevé ne change que trois valeurs (prix au centre `c`, en ligne `o`, reprise `rc`), et seulement quand la
phrase de la page est retrouvée telle quelle ; il ignore la reprise d'un État qui la paie. Plus de 5 pages
injoignables : rien n'est écrit. Les aides, les âges et les règles de reprise changent rarement et se
relisent à la main, de même que les 24 pages HiSET, au moins chaque trimestre et à chaque 1er juillet
(début d'exercice de nombreux États). Après une relecture à la main, mettre à jour `READ` dans
`build-data.py` : la date s'affiche sur chaque page.

## Automatique

`.github/workflows/deploy.yml` : chaque lundi à 06:40 UTC, relevé, `vitest`, build, recommit de
`data/facts/releve-ged.json` et `src/data/hse.json` s'ils ont changé, publication GitHub Pages, ping
IndexNow. Il ne tourne qu'une fois le dépôt créé.

## Ce que le site ne publie pas

Les frais propres à chaque centre quand l'État ne les publie pas (Montana, Wyoming, centres HiSET de
l'Indiana) : le calculateur dit « not published » au lieu d'inventer. Les tarifs 2027 : à paraître.
