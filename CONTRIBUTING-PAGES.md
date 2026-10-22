# Ajouter ou modifier une page (us-ged-hiset)

À lire avec `~/Documents/GitHub/RECETTE-SITE.md` §6 (unicité), §7 (FAQ), §9 (écriture), §9.3
(mini-simulateurs), §11 (titres), §21 (bloc citable). Éditeur : Radif Partners. Aucun lien vers un cours
payant, une appli, un site de préparation ni un autre site du portefeuille. Le site ne se présente jamais
comme GED Testing Service, ETS/PSI ou un État.

## Une page = un fichier

- `src/content/guides/<id>.ts`, déclaré dans `src/lib/planned.ts` (`PLANNED_GUIDES`). Groupes : `cost`,
  `prep`, `rules`, `states`. Une page d'État porte `state: 'XX'` (modèles : `texas.ts`, `ohio.ts`).
- Le fichier porte les deux langues (`en`, `es`) : slug (minuscules, sans accent), nav, card, title
  (50 à 60 caractères, terme clé d'abord, année), description (150 à 160 caractères, année), h1, intro,
  `resume` (un paragraphe de 120 mots ou plus), `faqs` (3 à 5, questions uniques sur tout le site, réponses
  de 40 à 90 mots), `body(h)` (520 mots de prose au moins, 450 pour une page d'État, tableaux à part).
- `tool` : calculateur en tête (`cost`, `compare`, `states`, `eligible`, `pass`, `hpass`, `plan`, `retake`,
  `ready`, ou `quiz-<matière>`), `toolArg` pour ses valeurs de départ.
- Routes, menus, sitemap, hreflang, schémas et liens lisent ces fichiers seuls : ne pas toucher au cœur.

## Aucun chiffre en dur

Tout montant, âge ou délai vient de `src/data/hse.json` (via `st('XX')`, `GENERAL`, `S` de
`src/lib/stats.ts`, ou le moteur `src/lib/engine/hse.ts`). Une comparaison (« moins cher que », « rang »)
est calculée. Formats : `h.usd` (montant officiel, décimales gardées), `h.usd0` (total calculé, sans
centimes), `h.n`. En espagnol, le symbole précède le nombre (`$36.25`), comme aux États-Unis.

## Questions d'entraînement

`src/data/quiz.ts` : écrites par Radif Partners à partir des thèmes publiés par ged.com et hiset.org,
jamais copiées d'un livre, d'un site concurrent ni d'un vrai examen ; chaque page les dit « practice
questions written by us ».

## Mini-simulateurs

`${h.mini('<kind>', { p: [champs montrés], d: { valeurs }, t: 'titre' })}` : un par page au moins ;
le bouton mène à la première page qui porte le calculateur complet.

## Contrôles

`npm run check`, puis `python3 scripts/check-regles.py .`, `node scripts/check-contraste.mjs .`,
`node scripts/check-saisie.mjs . --max=60`, `node scripts/check-nombres.mjs .`. Test d'une seule page :
`PAGE_FILES=texas npx vitest run tests/pages.test.ts`.
