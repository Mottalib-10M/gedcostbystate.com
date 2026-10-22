import { defineGuide } from '../../lib/page-types';
import { GED_STATES, GENERAL, byName, resText } from '../../lib/data';
import { list, num, type Lang } from './_u';

const G = GENERAL.ged;
const at = (a: number) => GED_STATES.filter((s) => s.ged!.age === a).map((s) => s.code);
const age19 = at(19), age17 = at(17), age16 = at(16);
const odd = GED_STATES.filter((s) => s.ged!.age % 1 !== 0).map((s) => s.code);
const noRes = GED_STATES.filter((s) => s.ged!.res === 'no').length;
const resYes = GED_STATES.filter((s) => s.ged!.res === 'yes').length;
const caseByCase = GED_STATES.filter((s) => s.ged!.under == null).map((s) => s.code);
const N = GED_STATES.length;
const rows = (l: Lang) => byName(l).filter((s) => s.ged).map((s) => {
  const g = s.ged!;
  return [s[l], num(g.age, l, g.age % 1 ? 1 : 0), g.under == null ? (l === 'en' ? 'case by case' : 'caso por caso') : num(g.under, l), resText(g.res, l)];
});

export default defineGuide({
  id: 'ged-requirements', group: 'rules', order: 24,
  tool: 'eligible', toolArg: { st: 'TX', age: 17 },
  related: ['ged-test', 'ged-cost', 'ged-online', 'ged-ready', 'texas', 'new-york'],
  sources: ['ged-policies', 'ged-online', 'ged-TX', 'ged-NY', 'ged-CA', 'ged-FL', 'ged-GA', 'ged-OH'],
  en: {
    slug: 'ged-requirements',
    nav: 'GED requirements', card: 'Age, residency, ID and the underage rules of each state',
    title: 'GED Requirements 2026: Age, Residency and ID by State',
    description: `GED requirements in 2026 for all ${N} GED jurisdictions: minimum age, what 16 and 17 year olds must provide, residency, ID and online rules. Check your age now.`,
    h1: 'GED requirements: age, residency and ID in each state',
    intro: 'Pick your state and type your age: the checker says whether you can test with no paperwork, only with conditions, or not yet.',
    resume: `The GED has no national entry rules: each state sets them, and GED Testing Service publishes them on one policy page per state. Age comes first. In ${GED_STATES.filter((s) => s.ged!.age === 18).length} of the ${N} GED jurisdictions you can test with no conditions at 18; ${list(age19, 'en')} set 19, and only ${list([...age17, ...age16, ...odd], 'en')} go lower. Below that age, almost every state opens the test at 16 or 17 with paperwork: a school withdrawal form, parental consent, sometimes enrollment in an adult education program. Residency is the second rule: ${noRes} jurisdictions ask for none, ${resYes} accept state residents only, and a few set a minimum stay, such as 30 days in New York. Everyone needs a valid government photo ID, and none of the state pages we read requires a prep class to sit the test at a center. Online testing adds its own conditions: a green GED Ready score within ${G.readyGreenDays} days before each subject, a computer with a webcam, a quiet room and, under 18, a parent at check-in. The checker above reads your state page and your age.`,
    faqs: [
      { q: 'What is the minimum age to take the GED?', a: `It depends on the state. The standard age is 18 in ${GED_STATES.filter((s) => s.ged!.age === 18).length} of the ${N} GED jurisdictions and 19 in ${list(age19, 'en')}. Most states let 16 and 17 year olds test with conditions such as a school withdrawal form or parental consent. Nobody can test before 16.` },
      { q: 'Can a 16 year old take the GED?', a: 'In most states, yes, with conditions. Texas, for example, asks a 16 year old for Texas residency, a government photo ID, and care by a state agency or court order, or enrollment in Job Corps, plus proof of not being in school or a high school graduate. Georgia asks for an approved adult education program first.' },
      { q: 'Do I need to live in the state to take the GED there?', a: `Not always. ${noRes} jurisdictions have no residency requirement, ${resYes} test state residents only, and some set a minimum stay: New York asks for 30 calendar days, proven by a dated document. The credential is issued by the state where you pass your final subject.` },
      { q: 'Do I need to take a class before the GED?', a: 'Not at a test center in the states we checked: Texas and New York both say no class or instruction is required, though they recommend preparation. Exceptions concern underage testers, as in Georgia, where 16 and 17 year olds need at least 40 hours of class in an approved program.' },
    ],
    body: (h) => `
<h2>Age in every GED state</h2>
<p>The table gives, for each of the ${h.n(N)} jurisdictions that use the GED, the age at which you can test with no conditions, the youngest age allowed with paperwork, and the residency rule. Iowa and Maine use only the HiSET and are not listed. ${list(caseByCase, 'en')} set the under-age conditions case by case rather than at a fixed age.</p>
${h.table(['State', 'Age, no conditions', 'Youngest with conditions', 'Residency'], rows('en'), 'Read on the state policy pages of ged.com on the date shown at the top of the page.', ['l', 'r', 'r', 'l'])}
${h.mini('eligible', { p: ['st', 'age'], d: { st: 'CA', age: 17 }, t: 'Your age in your state' })}
<h2>What 16 and 17 year olds are asked for</h2>
<p>Under the standard age, every state asks for proof that school is behind you, and the details vary a lot. Texas lets a 17 year old test with parental permission, Texas residency and a photo ID, provided they are not enrolled in school and have not graduated. California opens the test at 17 only after at least 60 consecutive days out of school and a request letter from the military, a college or a prospective employer. Florida asks 16 and 17 year olds for a formal declaration of intent to leave school and a notarized Underage Testing Form. Ohio wants the withdrawal form signed by the school administrator and a consent form notarized by a parent, guardian or court official. Georgia sends underage testers to a state-approved adult education program with at least 40 hours of class and a readiness score. New York asks anyone aged 16 to 18 for an Age Eligibility form, and approval can take a week once received.</p>
<h2>Residency and ID</h2>
<p>The ID must be valid, government issued and carry your photo. Where residency is required, the address on that ID can prove it; otherwise a second document does. New York accepts a passport or out-of-state license with a utility bill, lease or tax record dated at least 30 days before the test. California warns that without proof of residency you cannot test and lose the fee. If you move during testing, the rules of the new state apply, and the credential comes from the state where you pass your last subject.</p>
<h2>Online testing adds conditions</h2>
<p>To take a subject online you need a green GED Ready score, ${h.n(G.readyBands.likely)} or more, earned within ${h.n(G.readyGreenDays)} days before booking that subject, which costs ${h.usd(G.readyPerSubject)} a subject. You also need a computer with a webcam, a reliable connection and a quiet room where nobody else is present. Under 18, a parent or guardian must be at check-in to consent, or the session is cancelled. California notes that a military ID is not accepted online. The ${h.a('ged-online', 'online testing page')} gives the online price in each state.</p>
<h2>What is not required</h2>
<p>None of the state pages we read requires a prep class or a GED Ready score to test at a center, for adults. Texas and New York say so plainly while recommending preparation. Nor is there a rule to take the subjects in a set order or on separate days: Texas and New York both allow all four in one day at a center, if its hours allow it, with one appointment per subject.</p>
<h2>Before you book</h2>
<p>Open your state on the ${h.a('ged-test', 'GED test page')} to see its price and rules together, then use the ${h.a('ged-cost', 'cost calculator')}. The state policy page on ged.com remains the reference, and it can change between our readings.</p>`,
  },
  es: {
    slug: 'requisitos-del-ged',
    nav: 'Requisitos del GED', card: 'Edad, residencia, identificación y reglas para menores en cada estado',
    title: 'Requisitos del GED 2026: edad, residencia e identificación',
    description: `Requisitos del GED en 2026 en sus ${N} jurisdicciones: edad mínima, qué piden a los 16 y 17 años, residencia, identificación y examen en línea. Compruebe.`,
    h1: 'Requisitos del GED: edad, residencia e identificación en cada estado',
    intro: 'Elija su estado y escriba su edad: el verificador dice si puede examinarse sin trámites, solo con condiciones o todavía no.',
    resume: `El GED no tiene reglas de acceso nacionales: cada estado fija las suyas, y GED Testing Service las publica en una página por estado. La edad va primero. En ${GED_STATES.filter((s) => s.ged!.age === 18).length} de las ${N} jurisdicciones del GED se puede examinar sin condiciones a los 18; ${list(age19, 'es')} fijan 19, y solo ${list([...age17, ...age16, ...odd], 'es')} bajan de ahí. Por debajo de esa edad, casi todos los estados abren el examen a los 16 o 17 con trámites: un formulario de baja escolar, el permiso de los padres, a veces la inscripción en un programa de educación para adultos. La residencia es la segunda regla: ${noRes} jurisdicciones no la piden, ${resYes} aceptan solo a residentes y algunas fijan una estancia mínima, como 30 días en Nueva York. Todos necesitan una identificación oficial con foto vigente, y ninguna de las páginas estatales que leímos exige una clase para examinarse en un centro. El examen en línea añade sus propias condiciones: un resultado verde en GED Ready en los ${G.readyGreenDays} días previos a cada materia, una computadora con cámara, un cuarto tranquilo y, para menores de 18, un padre presente al registrarse. El verificador de arriba lee la página de su estado y su edad.`,
    faqs: [
      { q: '¿Cuál es la edad mínima para tomar el GED?', a: `Depende del estado. La edad general es 18 en ${GED_STATES.filter((s) => s.ged!.age === 18).length} de las ${N} jurisdicciones del GED y 19 en ${list(age19, 'es')}. La mayoría de los estados permiten examinarse a los 16 y 17 años con condiciones, como un formulario de baja escolar o el permiso de los padres. Nadie puede examinarse antes de los 16.` },
      { q: '¿Puede tomar el GED alguien de 16 años?', a: 'En la mayoría de los estados, sí, con condiciones. Texas, por ejemplo, pide a un joven de 16 años residencia en Texas, identificación oficial con foto y estar bajo tutela de una agencia estatal u orden judicial, o inscrito en Job Corps, y no estar en la escuela ni haberse graduado. Georgia exige antes un programa aprobado de educación para adultos.' },
      { q: '¿Tengo que vivir en el estado para tomar allí el GED?', a: `No siempre. ${noRes} jurisdicciones no exigen residencia, ${resYes} solo examinan a residentes, y algunas fijan una estancia mínima: Nueva York pide 30 días naturales, probados con un documento con fecha. La credencial la emite el estado donde aprueba su última materia.` },
      { q: '¿Necesito tomar una clase antes del GED?', a: 'No en un centro, en los estados que revisamos: Texas y Nueva York dicen que no se exige clase ni instrucción, aunque recomiendan prepararse. Las excepciones afectan a los menores, como en Georgia, donde quienes tienen 16 y 17 años necesitan al menos 40 horas de clase en un programa aprobado.' },
    ],
    body: (h) => `
<h2>La edad en cada estado del GED</h2>
<p>El cuadro da, para cada una de las ${h.n(N)} jurisdicciones que usan el GED, la edad a la que se puede examinar sin condiciones, la edad mínima con trámites y la regla de residencia. Iowa y Maine usan solo el HiSET y no aparecen. ${list(caseByCase, 'es')} fijan las condiciones para menores caso por caso y no con una edad fija.</p>
${h.table(['Estado', 'Edad sin condiciones', 'Edad mínima con condiciones', 'Residencia'], rows('es'), 'Leído en las páginas de reglas estatales de ged.com en la fecha que figura arriba.', ['l', 'r', 'r', 'l'])}
${h.mini('eligible', { p: ['st', 'age'], d: { st: 'CA', age: 17 }, t: 'Su edad en su estado' })}
<h2>Lo que se pide a los 16 y 17 años</h2>
<p>Por debajo de la edad general, todos los estados piden una prueba de que la escuela quedó atrás, y los detalles cambian mucho. Texas deja examinarse a los 17 con permiso de los padres, residencia en Texas e identificación con foto, siempre que no esté inscrito en la escuela ni se haya graduado. California abre el examen a los 17 solo tras al menos 60 días seguidos fuera de la escuela y una carta de solicitud del ejército, de una institución de estudios superiores o de un posible empleador. Florida pide a quienes tienen 16 y 17 años una declaración formal de intención de dejar la escuela y un Underage Testing Form notariado. Ohio quiere el formulario de baja firmado por la dirección de la escuela y un permiso notariado de un padre, tutor o funcionario judicial. Georgia envía a los menores a un programa aprobado de educación para adultos con al menos 40 horas de clase y un puntaje de preparación. Nueva York pide a quien tiene de 16 a 18 años un Age Eligibility form, y la aprobación puede tardar una semana tras recibirlo.</p>
<h2>Residencia e identificación</h2>
<p>La identificación debe estar vigente, ser oficial y llevar su foto. Donde se exige residencia, la dirección de esa identificación puede probarla; si no, sirve un segundo documento. Nueva York acepta un pasaporte o una licencia de otro estado con una factura de servicios, un contrato de alquiler o un documento fiscal con fecha de al menos 30 días antes del examen. California advierte que sin prueba de residencia no se puede examinar y se pierde la tarifa. Si se muda durante el proceso, se aplican las reglas del nuevo estado, y la credencial la emite el estado donde aprueba su última materia.</p>
<h2>El examen en línea añade condiciones</h2>
<p>Para tomar una materia en línea hace falta un resultado verde en GED Ready, ${h.n(G.readyBands.likely)} o más, obtenido en los ${h.n(G.readyGreenDays)} días previos a reservar esa materia, que cuesta ${h.usd(G.readyPerSubject)} por materia. También se necesita una computadora con cámara, una conexión fiable y un cuarto tranquilo sin nadie más. Para menores de 18, un padre o tutor debe estar presente al registrarse para dar su permiso, o la sesión se anula. California indica que una identificación militar no se acepta en línea. La ${h.a('ged-online', 'página del examen en línea')} da el precio en línea de cada estado.</p>
<h2>Lo que no se exige</h2>
<p>Ninguna de las páginas estatales que leímos exige a los adultos una clase ni un puntaje de GED Ready para examinarse en un centro. Texas y Nueva York lo dicen claramente, aunque recomiendan prepararse. Tampoco hay que seguir un orden ni separar las materias en días distintos: Texas y Nueva York permiten las cuatro el mismo día en un centro, si su horario lo permite, con una cita por materia.</p>
<h2>Antes de reservar</h2>
<p>Abra su estado en la ${h.a('ged-test', 'página del examen GED')} para ver juntos su precio y sus reglas, y luego use la ${h.a('ged-cost', 'calculadora de costos')}. La página de reglas del estado en ged.com sigue siendo la referencia, y puede cambiar entre dos de nuestras lecturas.</p>`,
  },
});
