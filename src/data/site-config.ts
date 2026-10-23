/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://gedcostbystate.com";
export const SITE_NAMES: Record<string, string> = {"en": "GED Cost by State", "es": "GED Cost by State"};
export const LANG_TAGS: Record<string, string> = {"en": "en-US", "es": "es-US"};
export const OG_LOCALES: Record<string, string> = {"en": "en_US", "es": "es_US"};
export const LOCALE_TAG = 'en-US';
export const CURRENCY = 'USD';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-22';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"en": "Independent publisher that reads each state's high school equivalency testing rules and fees and turns them into a total cost and a plan", "es": "Editor independiente que lee las reglas y tarifas de los exámenes de equivalencia de la secundaria de cada estado y las convierte en un costo total y un plan"};
export const AUTHOR_DESC: Record<string, string> = {"en": "Radif Partners reads the state policy pages of the GED and HiSET programs for all fifty states and Washington, D.C., copies the fee per subject, the retake fees, the minimum age, the residency rule and the free-testing offers with the date they were read, and adds them up for one person: which test the state offers, what the four GED subjects or five HiSET subtests will cost, what the state pays, and what a retake adds. Practice questions are written by us from the published test outlines and say so. No class, tutor or app is sold or recommended and no contact detail is asked for.", "es": "Radif Partners lee las páginas de reglas estatales de los programas GED y HiSET de los cincuenta estados y Washington, D.C., copia la tarifa por materia, el costo de repetir, la edad mínima, la regla de residencia y las ofertas de examen gratis con la fecha de lectura, y lo suma para una persona: qué examen ofrece su estado, cuánto costarán las cuatro materias del GED o las cinco pruebas del HiSET, qué paga el estado y cuánto suma repetir. Las preguntas de práctica las escribimos nosotros a partir de los temarios publicados y así lo indicamos. No vendemos ni recomendamos clases, tutores ni aplicaciones y no pedimos ningún dato de contacto."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"en": ["GED test fees by state", "HiSET exam fees by state", "High school equivalency age waivers", "GED and HiSET passing scores", "State-funded free GED testing", "GED retake policies"], "es": ["Tarifas del examen GED por estado", "Tarifas del examen HiSET por estado", "Permisos de edad para la equivalencia de la secundaria", "Puntajes para aprobar el GED y el HiSET", "Examen GED gratis pagado por el estado", "Reglas para repetir el GED"]};
export const CONTACT_EMAIL = "contact@gedcostbystate.com";
export const THEME_COLOR = '#1F4E8C';
export const LOGO_SYMBOL = 'HSE';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = 'z25y6nosja';
export const INDEXNOW_KEY = '7aab291ecd1204d1ff2e5b384308114e';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme sur les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "VAT",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
