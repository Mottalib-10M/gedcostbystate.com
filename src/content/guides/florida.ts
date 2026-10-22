import { defineGuide } from '../../lib/page-types';
import { GENERAL } from '../../lib/data';
import { S } from '../../lib/stats';
import { st, usd, usd0, tot, rank, list, attemptsTable, gedTries } from './_u';

const G = GENERAL.ged;
const g = st('FL').ged!;
const c = tot('FL'), r = rank('FL');

export default defineGuide({
  id: 'florida', group: 'states', order: 42, state: 'FL',
  tool: 'cost', toolArg: { st: 'FL', test: 'ged' },
  related: ['ged-cost', 'how-long-ged', 'ged-retake', 'ged-requirements', 'ged-classes', 'georgia'],
  sources: ['ged-FL', 'ged-policies', 'ged-scheduling'],
  en: {
    slug: 'ged-florida',
    nav: 'GED in Florida', card: `${usd(g.c, 'en')} a subject at a center, ${usd(g.rc!, 'en')} retakes, a state diploma`,
    title: 'GED Cost in Florida 2026: $38 a Subject and $12 Retakes',
    description: `GED in Florida in 2026: ${usd(g.c, 'en')} a subject at a test center, ${usd(g.rc!, 'en')} for a retake, no online option listed, rules for ages 16 and 17 and the free e-diploma. Price it.`,
    h1: 'How much does the GED cost in Florida? Retakes, age rules and the diploma',
    intro: `Four subjects at ${usd(g.c, 'en')} each: ${usd0(c, 'en')} at a Florida test center. The calculator adds your retakes.`,
    resume: `Florida charges ${usd(g.c, 'en')} per GED subject at a test center, ${usd0(c, 'en')} for the four subjects, which places it ${r.pos} of ${r.of} GED jurisdictions by center price. A subject you fail can be retaken at a center for ${usd(g.rc!, 'en')}: GED Testing Service waives its own fee on that retake and only the Florida center fee is left. The page ged.com publishes for Florida lists no online price, so the test is taken at a center; Florida is one of ${S.ged.noOnline.length} jurisdictions in that case. There is no residency requirement, but you need a valid government photo ID and a Florida address. The standard age is 18; at 16 or 17 you file a formal declaration of intent to terminate school enrollment and a notarized Underage Testing Form. GED Ready is not required before a subject at a center. There is no waiting period before the first two retakes of a subject, and 60 days after a third attempt. Passing all four earns the State of Florida High School Diploma, with one free electronic diploma and one free electronic transcript sent automatically.`,
    faqs: [
      { q: 'How much does the GED cost in Florida?', a: `${usd(g.c, 'en')} per subject at a test center, ${usd0(c, 'en')} for the four subjects. A retake of a failed subject costs ${usd(g.rc!, 'en')} at a center, the Florida test center fee. The Florida page on ged.com lists no online price and no state subsidy, so plan on the center price.` },
      { q: 'Can I take the GED online in Florida?', a: `The Florida page on ged.com lists only test center prices, so the online test is not shown as an option for Florida, unlike most states. Florida is one of ${S.ged.noOnline.length} jurisdictions in this case: ${list(S.ged.noOnline, 'en')}. Book a center through your GED account; all four subjects can fit in one day if its hours allow.` },
      { q: 'Do I need to live in Florida to take the GED there?', a: 'No residency rule applies, but Florida asks for a valid government photo ID and a Florida address. Someone who has just moved can test as soon as they have a Florida address. The diploma is issued by the state where you pass your final subject.' },
      { q: 'What do 16 and 17 year olds need for the GED in Florida?', a: 'A formal declaration of intent to terminate school enrollment, filed with the school district, and a notarized Underage Testing Form. Plan for the paperwork before booking, since the test center needs it at check-in. At 18 and over, only the ID and a Florida address are needed.' },
    ],
    body: (h) => `
<h2>Every attempt priced</h2>
<p>Florida gives one discounted retake per subject that you buy and do not pass. The table follows one subject through four attempts at a center: the second and fourth cost the ${h.usd(g.rc!)} center fee, the third is full price again.</p>
${attemptsTable(h, [['Test center', gedTries('FL', 'center', 3)]], 'One Florida GED subject, four attempts at a test center.')}
${h.mini('plan', { p: ['st', 'parts', 'weeks'], d: { st: 'FL', parts: 4, weeks: 4 }, t: 'When you could finish in Florida' })}
<h2>Three budgets</h2>
<p><strong>All four passed the first time:</strong> ${h.usd0(c)}. <strong>Math failed once, then passed:</strong> ${h.usd0(c + g.rc!)}. <strong>Math and science each retaken once, math a third time:</strong> ${h.usd0(c + 2 * g.rc! + g.c)}, since a third attempt is full price. Adding the official GED Ready practice test, ${h.usd(G.readyPerSubject)} a subject or ${h.usd(G.readyBundle)} for the four, is optional at a Florida center but tells you which subject to work on first.</p>
<h2>Booking at a center</h2>
<p>You create your account on ged.com, pick a center and pay by card at scheduling. Because the Florida page shows no online option, every subject is taken in person. Centers can hold all four subjects in one day if their hours allow it, though most people spread them out. There is no wait before the first two retakes of a subject; after a third attempt you wait 60 days before the next one. The ${h.a('how-long-ged', 'timeline page')} turns these rules into a finish date.</p>
<h2>Who can test</h2>
<p>Florida sets no residency requirement, which helps people who have just moved. It does require a valid government photo ID and a Florida address. The standard age is 18. At 16 or 17, you first file a formal declaration of intent to terminate school enrollment with your school district, then complete a notarized Underage Testing Form; the center will not let you test without it. Adults do not need a class or a GED Ready score at a center, and free adult education programs are listed on the ${h.a('ged-classes', 'classes page')}.</p>
<h2>How Florida compares</h2>
<p>At ${h.usd0(c)} for the four subjects, Florida costs less than the median jurisdiction, which charges ${h.usd0(S.ged.median)}, and less than neighboring Georgia at ${h.usd0(tot('GA'))}. Its retake is cheap too: ${h.usd(g.rc!)}, against ${h.usd(st('GA').ged!.rc!)} in Georgia. What Florida lacks is choice. There is no online option on its ged.com page and no HiSET on hiset.org, so the GED at a center is the only route. Georgia sets no residency rule, so a Florida resident near the state line can test there, at a center or online; the credential then comes from Georgia, the state where the final subject is passed. The name differs as well: Florida calls its credential a high school diploma, where many states issue a certificate of high school equivalency.</p>
<h2>The Florida diploma</h2>
<p>Passing all four subjects with ${h.n(G.pass)} or more earns the State of Florida High School Diploma. You receive one free electronic diploma and one free electronic transcript automatically after your last passed subject; more copies are ordered online. Tests are offered in English or Spanish, and you can mix the two. For a state that offers both the GED and the HiSET, see the ${h.a('georgia', 'Georgia page')}.</p>`,
  },
  es: {
    slug: 'ged-en-florida',
    nav: 'GED en Florida', card: `${usd(g.c, 'es')} por materia en un centro, repeticiones de ${usd(g.rc!, 'es')}, diploma estatal`,
    title: 'GED en Florida 2026: $38 por materia, repetición y diploma',
    description: `GED en Florida en 2026: ${usd(g.c, 'es')} por materia en un centro, ${usd(g.rc!, 'es')} por repetición, sin opción en línea indicada, reglas para 16 y 17 años y diploma electrónico gratis.`,
    h1: '¿Cuánto cuesta el GED en Florida? Repeticiones, edad y el diploma estatal',
    intro: `Cuatro materias a ${usd(g.c, 'es')} cada una: ${usd0(c, 'es')} en un centro de Florida. La calculadora suma sus repeticiones.`,
    resume: `Florida cobra ${usd(g.c, 'es')} por materia del GED en un centro, ${usd0(c, 'es')} por las cuatro materias, lo que la sitúa en el puesto ${r.pos} de ${r.of} jurisdicciones del GED por precio en centro. Una materia suspendida puede repetirse en un centro por ${usd(g.rc!, 'es')}: GED Testing Service no cobra su propia tarifa en esa repetición y solo queda la tarifa del centro de Florida. La página que ged.com publica para Florida no indica precio en línea, así que el examen se hace en un centro; Florida es una de las ${S.ged.noOnline.length} jurisdicciones en ese caso. No se exige residencia, pero hace falta una identificación oficial con foto vigente y una dirección en Florida. La edad general es 18 años; a los 16 o 17 se presenta una declaración formal de intención de dejar la escuela y un Underage Testing Form notariado. GED Ready no se exige antes de una materia en un centro. No hay espera antes de las dos primeras repeticiones de una materia, y sí 60 días tras un tercer intento. Aprobar las cuatro da el State of Florida High School Diploma, con un diploma electrónico y un expediente electrónico gratuitos enviados automáticamente.`,
    faqs: [
      { q: '¿Cuánto cuesta el GED en Florida?', a: `${usd(g.c, 'es')} por materia en un centro, ${usd0(c, 'es')} por las cuatro materias. Repetir una materia suspendida cuesta ${usd(g.rc!, 'es')} en un centro, la tarifa del centro de Florida. La página de Florida en ged.com no indica precio en línea ni subsidio estatal, así que cuente con el precio en centro.` },
      { q: '¿Puedo tomar el GED en línea en Florida?', a: `La página de Florida en ged.com solo indica precios en centro, así que el examen en línea no aparece como opción en Florida, a diferencia de la mayoría de los estados. Florida es una de las ${S.ged.noOnline.length} jurisdicciones en este caso: ${list(S.ged.noOnline, 'es')}. Reserve un centro desde su cuenta del GED; las cuatro materias caben en un día si el horario lo permite.` },
      { q: '¿Tengo que vivir en Florida para tomar allí el GED?', a: 'No se aplica una regla de residencia, pero Florida pide una identificación oficial con foto vigente y una dirección en Florida. Quien acaba de mudarse puede examinarse en cuanto tenga una dirección en Florida. El diploma lo emite el estado donde aprueba su última materia.' },
      { q: '¿Qué necesitan los jóvenes de 16 y 17 años para el GED en Florida?', a: 'Una declaración formal de intención de dejar la escuela, presentada ante el distrito escolar, y un Underage Testing Form notariado. Prepare los trámites antes de reservar, porque el centro los pide al registrarse. A partir de los 18 años solo hacen falta la identificación y una dirección en Florida.' },
    ],
    body: (h) => `
<h2>Cada intento con su precio</h2>
<p>Florida da una repetición con descuento por cada materia que se compra y no se aprueba. El cuadro sigue una materia durante cuatro intentos en un centro: el segundo y el cuarto cuestan la tarifa del centro de ${h.usd(g.rc!)}, el tercero vuelve al precio completo.</p>
${attemptsTable(h, [['Centro', gedTries('FL', 'center', 3)]], 'Una materia del GED en Florida, cuatro intentos en un centro.')}
${h.mini('plan', { p: ['st', 'parts', 'weeks'], d: { st: 'FL', parts: 4, weeks: 4 }, t: 'Cuándo podría terminar en Florida' })}
<h2>Tres presupuestos</h2>
<p><strong>Las cuatro aprobadas a la primera:</strong> ${h.usd0(c)}. <strong>Matemáticas suspendida una vez y luego aprobada:</strong> ${h.usd0(c + g.rc!)}. <strong>Matemáticas y ciencias repetidas una vez cada una, matemáticas una tercera vez:</strong> ${h.usd0(c + 2 * g.rc! + g.c)}, porque un tercer intento se paga completo. Añadir el examen de práctica oficial GED Ready, ${h.usd(G.readyPerSubject)} por materia o ${h.usd(G.readyBundle)} las cuatro, es opcional en un centro de Florida, pero indica qué materia trabajar primero.</p>
<h2>Reservar en un centro</h2>
<p>Se crea la cuenta en ged.com, se elige un centro y se paga con tarjeta al programar. Como la página de Florida no muestra opción en línea, cada materia se hace en persona. Los centros pueden acoger las cuatro materias en un día si su horario lo permite, aunque la mayoría de la gente las reparte. No hay espera antes de las dos primeras repeticiones de una materia; tras un tercer intento se esperan 60 días antes del siguiente. La ${h.a('how-long-ged', 'página de plazos')} convierte estas reglas en una fecha de fin.</p>
<h2>Quién puede examinarse</h2>
<p>Florida no fija requisito de residencia, lo que ayuda a quien acaba de mudarse. Sí exige una identificación oficial con foto vigente y una dirección en Florida. La edad general es 18 años. A los 16 o 17, primero se presenta ante el distrito escolar una declaración formal de intención de dejar la escuela y luego un Underage Testing Form notariado; el centro no deja examinarse sin él. Los adultos no necesitan clase ni puntaje de GED Ready en un centro, y los programas gratuitos de educación para adultos figuran en la ${h.a('ged-classes', 'página de clases')}.</p>
<h2>Cómo se compara Florida</h2>
<p>Con ${h.usd0(c)} por las cuatro materias, Florida cuesta menos que la jurisdicción mediana, que cobra ${h.usd0(S.ged.median)}, y menos que la vecina Georgia, con ${h.usd0(tot('GA'))}. Su repetición también es barata: ${h.usd(g.rc!)}, frente a ${h.usd(st('GA').ged!.rc!)} en Georgia. Lo que le falta a Florida es elección. Su página de ged.com no muestra opción en línea y hiset.org no la incluye, así que el GED en un centro es la única vía. Georgia no fija regla de residencia, así que un residente de Florida cerca de la frontera puede examinarse allí, en un centro o en línea; la credencial la emite entonces Georgia, el estado donde se aprueba la última materia. El nombre también cambia: Florida llama a su credencial diploma de secundaria, donde muchos estados emiten un certificado de equivalencia.</p>
<h2>El diploma de Florida</h2>
<p>Aprobar las cuatro materias con ${h.n(G.pass)} o más da el State of Florida High School Diploma. Tras la última materia aprobada se reciben automáticamente un diploma electrónico y un expediente electrónico gratuitos; las copias adicionales se piden en línea. Los exámenes se ofrecen en inglés o en español, y se pueden combinar. Para un estado que ofrece el GED y el HiSET, vea la ${h.a('georgia', 'página de Georgia')}.</p>`,
  },
});
