import { defineGuide } from '../../lib/page-types';
import { GENERAL } from '../../lib/data';
import { st, usd, usd0, tot, rank, attemptsTable, gedTries } from './_u';
import { S } from '../../lib/stats';

const G = GENERAL.ged;
const g = st('AZ').ged!;
const c = tot('AZ'), o = tot('AZ', 'ged', 'online'), r = rank('AZ');
const waived = 26;

export default defineGuide({
  id: 'arizona', group: 'states', order: 46, state: 'AZ',
  tool: 'cost', toolArg: { st: 'AZ', test: 'ged' },
  related: ['ged-cost', 'ged-retake', 'ged-requirements', 'ged-online', 'texas', 'california'],
  sources: ['ged-AZ', 'ged-policies', 'ged-online'],
  en: {
    slug: 'ged-arizona',
    nav: 'GED in Arizona', card: `${usd(g.c, 'en')} a subject anywhere, ${usd(g.rc!, 'en')} retakes at a center`,
    title: 'GED Cost in Arizona 2026: $41 a Subject, $15 Retakes, Age 16',
    description: `GED in Arizona in 2026: ${usd(g.c, 'en')} a subject at a center or online, a ${usd(g.rc!, 'en')} retake at a center, no residency rule, and the papers 16 and 17 year olds send. Price it.`,
    h1: 'How much does the GED cost in Arizona? Price, retakes and age rules',
    intro: `The four subjects cost ${usd0(c, 'en')} in Arizona, at a test center or online. A failed subject is cheaper to retake at a center. Set your case in the calculator.`,
    resume: `Arizona charges ${usd(g.c, 'en')} per GED subject, the same price at a test center and online, so the four subjects cost ${usd0(c, 'en')}. That places Arizona ${r.pos} of ${r.of} GED jurisdictions by center price. The two modes part ways on retakes. At a center, every subject you buy at full price and do not pass comes with one discounted retake, usable within ${G.retakeWindowDays} days: GED Testing Service waives its ${usd(waived, 'en')} testing fee and you pay only the Arizona test center fee of ${usd(g.rc!, 'en')}. The offer repeats, one full price then one discount, until you pass. Online there is no discount, and each retake costs ${usd(g.o!, 'en')}. Arizona has no residency requirement: you show a valid U.S. government ID with your legal name, date of birth and photo. The standard age is 18, for people who hold neither a high school diploma nor an equivalency diploma. At 16 and 17 you can test after sending three documents to the state adult education office 30 days ahead. hiset.org does not list Arizona, so the GED is the only test on the pages we read.`,
    faqs: [
      { q: 'How much does the GED cost in Arizona?', a: `${usd(g.c, 'en')} per subject, at a test center or online: ${usd0(c, 'en')} for the four subjects on a first pass. A failed subject retaken at a center costs ${usd(g.rc!, 'en')}, the Arizona center fee, within ${G.retakeWindowDays} days. Online, a retake is full price, ${usd(g.o!, 'en')}.` },
      { q: 'Can a 16 year old take the GED in Arizona?', a: 'Yes, at 16 or 17, once three documents reach the Arizona Department of Adult Education and High School Equivalency Services by email or mail 30 days before testing: the notarized Parent/Guardian Permission of Minor Form, an official withdrawal form from the last school attended, and a valid U.S. government ID. A homeschooled candidate is marked as such on the parent form instead of the withdrawal form.' },
      { q: 'Do I need to live in Arizona to take the GED there?', a: 'No. Arizona has no residency requirement. You need a valid U.S. government ID showing your legal name, date of birth and photo; a signature on the ID is no longer required. A learner’s permit, driver’s license, tribal enrollment card, state ID or U.S. passport are among the accepted examples.' },
      { q: 'How soon can I retake a GED subject in Arizona?', a: 'At a test center, right away for the first two retakes; after three attempts at a subject you wait 60 days. Online, one retake is allowed before the 60-day wait. Arizona sets no limit on the number of attempts in a year.' },
    ],
    body: (h) => `
<h2>What four attempts cost</h2>
<p>The table follows one subject through four attempts, without any help. At a center, attempts alternate between the full ${h.usd(g.c)} and the ${h.usd(g.rc!)} discounted retake, since each full-price attempt opens one discount. Online, the price never drops.</p>
${attemptsTable(h, [['Test center', gedTries('AZ', 'center', 3)], ['Online', gedTries('AZ', 'online', 3)]], 'One Arizona GED subject, four attempts.')}
${h.mini('retake', { p: ['st', 'tries'], d: { st: 'AZ' }, t: 'Your retakes in Arizona' })}
<h2>Same price, different retakes</h2>
<p>A first pass costs the same ${h.usd0(c)} wherever you sit the test, so the choice comes down to how likely a retake is. One failed subject retaken once costs ${h.usd0(g.c + g.rc!)} at a center against ${h.usd0(2 * g.o!)} online. Online testing also asks for a green GED Ready score before each subject, ${h.usd(G.readyPerSubject)} a subject, and a quiet private room with a webcam. If math is the subject you fear, book that one at a center and keep the others online if the schedule matters more to you.</p>
<h2>Testing at 16 or 17</h2>
<p>Arizona asks 16 and 17 year olds for paperwork, not for a class. Thirty days before the test date, the Arizona Department of Adult Education and High School Equivalency Services must hold three documents, sent by email or mail: the Arizona High School Equivalency Parent/Guardian Permission of Minor Form, signed, dated and notarized; an official withdrawal form from the last school attended; and a valid U.S. government ID. Count the notary visit and the 30 days when you plan your first subject, since a booking made before the papers arrive cannot go ahead.</p>
${h.mini('eligible', { p: ['st', 'age'], d: { st: 'AZ', age: 17 }, t: 'Can you test in Arizona at your age?' })}
<h2>ID and residency</h2>
<p>No proof of Arizona residency is asked. The ID must be issued by a U.S. government and show your legal name with any prefix, suffix or hyphen, your date of birth and your photo. A learner’s permit counts, as do a driver’s license, a tribal enrollment or identification card, a state ID card and a U.S. passport.</p>
<h2>A budget with one weak subject</h2>
<p>Most people do not fail four subjects; they struggle with one. Take a tester who passes three subjects on the first try and needs three attempts at math. At a center that costs ${h.usd0(c)} for the first pass, then ${h.usd(g.rc!)} for the discounted second math attempt and ${h.usd(g.c)} for the third, which is full price again and opens a new discount: ${h.usd0(c + g.rc! + g.c)} in all. The same path online costs ${h.usd0(c + 2 * g.o!)}, plus GED Ready before each attempt. Each subject is booked and paid separately in your ged.com account, so you pay as you go rather than all at once, and the discount must be used within ${h.n(G.retakeWindowDays)} days of the full-price attempt.</p>
<h2>After the last subject</h2>
<p>Pass each of the four subjects with ${h.n(G.pass)} or more and the state issues its high school equivalency diploma. The credential comes from the state where you pass your final subject, which matters if you move in or out of Arizona mid-way. Tests can be taken in English or Spanish, and the two can be mixed across subjects. The Arizona Department of Education publishes its adult education and testing details at azed.gov, which ged.com points to for the underage rules.</p>
<h2>How Arizona compares</h2>
<p>At ${h.usd0(c)} for the four subjects, Arizona is above the median jurisdiction, which charges ${h.usd0(S.ged.median)}. Its neighbor ${h.a('california', 'California')} charges the same ${h.usd(st('CA').ged!.c)} a subject and also offers the HiSET; ${h.a('texas', 'Texas')} is cheaper at a center and gives two discounted retakes. The ${h.a('ged-retake', 'retake page')} shows how the discount works across the country.</p>`,
  },
  es: {
    slug: 'ged-en-arizona',
    nav: 'GED en Arizona', card: `${usd(g.c, 'es')} por materia, repetición de ${usd(g.rc!, 'es')} en un centro`,
    title: 'GED en Arizona 2026: costo de $41 por materia y repeticiones',
    description: `GED en Arizona en 2026: ${usd(g.c, 'es')} por materia en un centro o en línea, repetición de ${usd(g.rc!, 'es')} en un centro, sin residencia y los tres papeles para 16 y 17 años. Calcúlelo.`,
    h1: '¿Cuánto cuesta el GED en Arizona? Precio, repeticiones y edad',
    intro: `Las cuatro materias cuestan ${usd0(c, 'es')} en Arizona, en un centro o en línea. Repetir una materia sale más barato en un centro. Ponga su caso en la calculadora.`,
    resume: `Arizona cobra ${usd(g.c, 'es')} por materia del GED, el mismo precio en un centro y en línea, así que las cuatro materias cuestan ${usd0(c, 'es')}. Eso sitúa a Arizona en el puesto ${r.pos} de ${r.of} jurisdicciones del GED por precio en centro. Las dos modalidades se separan al repetir. En un centro, cada materia pagada a precio completo y no aprobada trae una repetición con descuento, a usar en ${G.retakeWindowDays} días: GED Testing Service no cobra su tarifa de ${usd(waived, 'es')} y usted paga solo la tarifa del centro de Arizona, ${usd(g.rc!, 'es')}. La oferta se repite, un precio completo y luego un descuento, hasta aprobar. En línea no hay descuento y cada repetición cuesta ${usd(g.o!, 'es')}. Arizona no pide residencia: basta una identificación válida del gobierno de EE. UU. con su nombre legal, fecha de nacimiento y foto. La edad general es 18 años, para quien no tiene diploma de secundaria ni de equivalencia. A los 16 y 17 años puede examinarse tras enviar tres documentos a la oficina estatal de educación para adultos con 30 días de antelación. hiset.org no incluye a Arizona, así que el GED es el único examen en las páginas que leímos.`,
    faqs: [
      { q: '¿Cuánto cuesta el GED en Arizona?', a: `${usd(g.c, 'es')} por materia, en un centro o en línea: ${usd0(c, 'es')} las cuatro materias en un primer paso. Una materia suspendida y repetida en un centro cuesta ${usd(g.rc!, 'es')}, la tarifa del centro de Arizona, en ${G.retakeWindowDays} días. En línea, repetir se paga completo, ${usd(g.o!, 'es')}.` },
      { q: '¿Puede tomar el GED en Arizona alguien de 16 años?', a: 'Sí, a los 16 o 17 años, cuando tres documentos llegan a la Arizona Department of Adult Education and High School Equivalency Services por correo electrónico o postal 30 días antes del examen: el formulario de permiso de los padres para menores, notariado; una constancia oficial de baja de la última escuela; y una identificación válida del gobierno de EE. UU. Quien estudió en casa lo indica en el formulario de los padres.' },
      { q: '¿Hay que vivir en Arizona para tomar el GED allí?', a: 'No. Arizona no exige residencia. Hace falta una identificación válida del gobierno de EE. UU. con su nombre legal, fecha de nacimiento y foto; la firma en la identificación ya no se pide. Un permiso de aprendizaje, una licencia de conducir, una tarjeta tribal, una identificación estatal o un pasaporte de EE. UU. figuran entre los ejemplos aceptados.' },
      { q: '¿Cuándo puedo repetir una materia del GED en Arizona?', a: 'En un centro, enseguida para las dos primeras repeticiones; tras tres intentos en una materia hay que esperar 60 días. En línea se permite una repetición antes de la espera de 60 días. Arizona no fija límite de intentos al año.' },
    ],
    body: (h) => `
<h2>Lo que cuestan cuatro intentos</h2>
<p>El cuadro sigue una materia a lo largo de cuatro intentos, sin ayuda. En un centro, los intentos alternan entre el precio completo de ${h.usd(g.c)} y la repetición con descuento de ${h.usd(g.rc!)}, porque cada intento a precio completo abre un descuento. En línea, el precio nunca baja.</p>
${attemptsTable(h, [['Centro', gedTries('AZ', 'center', 3)], ['En línea', gedTries('AZ', 'online', 3)]], 'Una materia del GED en Arizona, cuatro intentos.')}
${h.mini('retake', { p: ['st', 'tries'], d: { st: 'AZ' }, t: 'Sus repeticiones en Arizona' })}
<h2>Mismo precio, repeticiones distintas</h2>
<p>Un primer paso cuesta los mismos ${h.usd0(c)} donde sea que se examine, así que la elección depende de la probabilidad de repetir. Una materia suspendida y repetida una vez cuesta ${h.usd0(g.c + g.rc!)} en un centro frente a ${h.usd0(2 * g.o!)} en línea. En línea además se pide un resultado verde en GED Ready antes de cada materia, ${h.usd(G.readyPerSubject)} por materia, y una habitación privada y tranquila con cámara. Si la materia que teme es matemáticas, resérvela en un centro y deje las demás en línea si el horario le importa más.</p>
<h2>Examinarse a los 16 o 17 años</h2>
<p>Arizona pide a los jóvenes de 16 y 17 años trámites, no una clase. Treinta días antes de la fecha del examen, la Arizona Department of Adult Education and High School Equivalency Services debe tener tres documentos, enviados por correo electrónico o postal: el Arizona High School Equivalency Parent/Guardian Permission of Minor Form, firmado, fechado y notariado; una constancia oficial de baja de la última escuela; y una identificación válida del gobierno de EE. UU. Cuente la visita al notario y los 30 días al planificar su primera materia, porque una reserva hecha antes de que lleguen los papeles no puede seguir adelante.</p>
${h.mini('eligible', { p: ['st', 'age'], d: { st: 'AZ', age: 17 }, t: '¿Puede examinarse en Arizona a su edad?' })}
<h2>Identificación y residencia</h2>
<p>No se pide prueba de residencia en Arizona. La identificación debe ser emitida por un gobierno de EE. UU. y mostrar su nombre legal con cualquier prefijo, sufijo o guion, su fecha de nacimiento y su foto. Sirven un permiso de aprendizaje, una licencia de conducir, una tarjeta tribal de inscripción o identificación, una identificación estatal y un pasaporte de EE. UU.</p>
<h2>Un presupuesto con una materia difícil</h2>
<p>La mayoría no suspende cuatro materias; le cuesta una. Tome a alguien que aprueba tres materias al primer intento y necesita tres intentos en matemáticas. En un centro eso cuesta ${h.usd0(c)} del primer paso, luego ${h.usd(g.rc!)} por el segundo intento de matemáticas con descuento y ${h.usd(g.c)} por el tercero, que vuelve al precio completo y abre un nuevo descuento: ${h.usd0(c + g.rc! + g.c)} en total. El mismo camino en línea cuesta ${h.usd0(c + 2 * g.o!)}, más GED Ready antes de cada intento. Cada materia se reserva y se paga por separado en su cuenta de ged.com, así que paga a medida que avanza, y el descuento debe usarse en los ${h.n(G.retakeWindowDays)} días siguientes al intento a precio completo.</p>
<h2>Después de la última materia</h2>
<p>Al aprobar cada una de las cuatro materias con ${h.n(G.pass)} o más, el estado emite su diploma de equivalencia de secundaria. La credencial la emite el estado donde aprueba la última materia, lo que importa si se muda a Arizona o sale de allí a mitad de camino. Los exámenes pueden hacerse en inglés o en español, y combinarse entre materias. El Departamento de Educación de Arizona publica los detalles de la educación para adultos y del examen en azed.gov, adonde remite ged.com para las reglas de los menores.</p>
<h2>Cómo se compara Arizona</h2>
<p>Con ${h.usd0(c)} por las cuatro materias, Arizona queda por encima de la jurisdicción mediana, que cobra ${h.usd0(S.ged.median)}. Su vecina ${h.a('california', 'California')} cobra los mismos ${h.usd(st('CA').ged!.c)} por materia y ofrece además el HiSET; ${h.a('texas', 'Texas')} es más barato en un centro y da dos repeticiones con descuento. La ${h.a('ged-retake', 'página de repeticiones')} muestra cómo funciona el descuento en todo el país.</p>`,
  },
});
