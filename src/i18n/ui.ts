import type { Locale } from './routes';
const en = {
  updatedOn: 'Data read on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Keep going', sourcesTitle: 'Official sources for this page', writtenBy: 'Prepared by',
  asOf: 'Fees', lastUpdated: 'read on the state pages of ged.com and hiset.org on', footerValidated: 'Source: state policy pages published by GED Testing Service (ged.com) and the HiSET program (hiset.org), read and dated',
  footerBrowser: 'Every figure is computed in your browser · no account, no email, no phone number',
  footerDisclaimer: 'Independent site published by Radif Partners. Not affiliated with GED Testing Service, ETS, the HiSET program or any state agency. GED® is a registered trademark of the American Council on Education; HiSET® is a registered trademark of ETS; both are used here only to name the tests. Fees and rules are dated and may change: the state page linked on each result is the reference.',
  footerPopular: 'Cost by state and by test',
  notFound: 'Nothing lives at this address. The home page gives the full cost of the GED or the HiSET in your state, retakes and state help included.',
  readMore: 'Read the full answer',
  estimate: 'Dated fees from the official state pages; totals with retakes are estimates. General information, not advice.',
  moreOptions: 'More options', copyLink: 'Copy share link', copied: 'Link copied', print: 'Print', howComputed: 'How this is computed', openFull: 'Open the full calculator',
};
const es: typeof en = {
  updatedOn: 'Datos leídos el', editorialPolicy: 'Política editorial', contactLabel: 'Contacto', reviewedBy: 'Preparado por',
  skipToContent: 'Ir al contenido', mainNav: 'Navegación principal', breadcrumbLabel: 'Ruta de navegación', breadcrumbHome: 'Inicio', menuOpen: 'Abrir el menú',
  faqTitle: 'Preguntas frecuentes', relatedCalculators: 'Para seguir', sourcesTitle: 'Fuentes oficiales de esta página', writtenBy: 'Preparado por',
  asOf: 'Tarifas', lastUpdated: 'leídas en las páginas estatales de ged.com y hiset.org el', footerValidated: 'Fuente: páginas de reglas estatales publicadas por GED Testing Service (ged.com) y el programa HiSET (hiset.org), leídas y fechadas',
  footerBrowser: 'Todas las cifras se calculan en su navegador · sin cuenta, sin correo, sin teléfono',
  footerDisclaimer: 'Sitio independiente publicado por Radif Partners. Sin relación con GED Testing Service, ETS, el programa HiSET ni ninguna agencia estatal. GED® es una marca registrada del American Council on Education; HiSET® es una marca registrada de ETS; aquí solo sirven para nombrar los exámenes. Las tarifas y reglas están fechadas y pueden cambiar: la página estatal enlazada en cada resultado es la referencia.',
  footerPopular: 'Costo por estado y por examen',
  notFound: 'No hay ninguna página en esta dirección. La página de inicio da el costo total del GED o del HiSET en su estado, con repeticiones y ayudas del estado.',
  readMore: 'Leer la respuesta completa',
  estimate: 'Tarifas fechadas de las páginas oficiales de cada estado; los totales con repeticiones son estimaciones. Información general, no asesoría.',
  moreOptions: 'Más opciones', copyLink: 'Copiar el enlace', copied: 'Enlace copiado', print: 'Imprimir', howComputed: 'Cómo se calcula', openFull: 'Abrir la calculadora completa',
};
export function t(lang: Locale) { return lang === 'en' ? en : es; }
