/** Toutes les pages prévues (id = nom du fichier de src/content/guides). Les tests de contenu acceptent un lien
 *  vers ces ids pendant la rédaction ; le test « toutes les pages existent » échoue tant qu'il manque un fichier. */
export const PLANNED_GUIDES = [
  // Coût
  'ged-cost', 'hiset', 'ged-vs-hiset', 'free-ged', 'ged-online', 'ged-retake',
  // Préparation
  'ged-practice-test', 'ged-math', 'ged-language-arts', 'ged-science', 'ged-social-studies', 'hiset-practice-test', 'ged-ready', 'ged-classes', 'how-long-ged',
  // Règles et notes
  'ged-test', 'ged-passing-score', 'hiset-scores', 'ged-requirements',
  // États
  'texas', 'california', 'florida', 'new-york', 'georgia', 'ohio',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, 'home', 'method', 'about', 'widget', 'contact', 'editorial', 'privacy', 'terms', 'cookies']);
