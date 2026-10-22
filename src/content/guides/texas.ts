import { defineGuide } from '../../lib/page-types';
import { GENERAL } from '../../lib/data';
import { st, usd, usd0, tot, rank, attemptsTable, gedTries } from './_u';
import { S } from '../../lib/stats';

const G = GENERAL.ged;
const g = st('TX').ged!;
const fee = g.c - g.rc!;
const c = tot('TX'), o = tot('TX', 'ged', 'online'), r = rank('TX');

export default defineGuide({
  id: 'texas', group: 'states', order: 40, state: 'TX',
  tool: 'cost', toolArg: { st: 'TX', test: 'ged' },
  related: ['ged-cost', 'ged-retake', 'ged-online', 'ged-requirements', 'free-ged', 'california'],
  sources: ['ged-TX', 'ged-policies', 'ged-online'],
  en: {
    slug: 'ged-texas',
    nav: 'GED in Texas', card: `${usd(g.c, 'en')} a subject, two cheap retakes, TxCHSE`,
    title: 'GED Cost in Texas 2026: $36.25 a Subject, Retakes, Age 16-17',
    description: `GED in Texas in 2026: ${usd(g.c, 'en')} a subject at a center, ${usd(g.o!, 'en')} online, two ${usd(g.rc!, 'en')} retakes per subject, ages 16 and 17, the HSE Subsidy Program. Price your plan.`,
    h1: 'How much does the GED cost in Texas? Price, retakes and who can test',
    intro: `The four subjects cost ${usd0(c, 'en')} at a Texas center and ${usd0(o, 'en')} online. Set your own case in the calculator.`,
    resume: `Texas charges ${usd(g.c, 'en')} per GED subject at a test center and ${usd(g.o!, 'en')} online, so the four subjects cost ${usd0(c, 'en')} at a center and ${usd0(o, 'en')} online. That ranks Texas ${r.pos} of ${r.of} GED jurisdictions by center price. Its strong point is retakes: each subject bought at full price and not passed comes with two discounted retakes at a center, usable within ${G.retakeWindowDays} days, for ${usd(g.rc!, 'en')} each, the Texas test center fee, since GED Testing Service waives its own fee. Online there is no discount: each retake is ${usd(g.o!, 'en')}. You must be a Texas resident and 18, or 17 with parental permission, or 16 in narrow cases. The HSE Subsidy Program can pay the fees of eligible residents aged 21 and older through a Texas Workforce Commission adult education program, while funding lasts. The credential is the State of Texas Certificate of High School Equivalency, or TxCHSE, issued by the Texas Education Agency. hiset.org does not list Texas, so the GED is the only test offered on the pages we read.`,
    faqs: [
      { q: 'How much does the GED cost in Texas?', a: `${usd(g.c, 'en')} per subject at a test center, ${usd0(c, 'en')} for all four, and ${usd(g.o!, 'en')} per subject online, ${usd0(o, 'en')} in all. A failed subject comes with two retakes at ${usd(g.rc!, 'en')} each at a center within ${G.retakeWindowDays} days. Eligible residents 21 and older may have the fees paid by the HSE Subsidy Program.` },
      { q: 'Can a 17 year old take the GED in Texas?', a: 'Yes, with a government photo ID, Texas residency and permission from a parent or guardian, provided you are not enrolled in school and have not graduated from high school. An approved in-school GED prep program is the one exception to the enrollment rule. Online, a parent must also be present at check-in.' },
      { q: 'Who issues the GED certificate in Texas?', a: 'The Texas Education Agency issues the State of Texas Certificate of High School Equivalency, the TxCHSE. You order a printable PDF of the certificate and your scores through the TEA Certificate and Transcript Search system; TEA no longer mails duplicates. The same system lets employers verify a record.' },
      { q: 'Is there a waiting period between GED retakes in Texas?', a: 'At a center, none for the first two retakes of a subject; after a third attempt you wait 60 days. Online you get one retake, then a 60-day wait after two online attempts at the subject. Texas sets no yearly limit on attempts.' },
    ],
    body: (h) => `
<h2>Every attempt priced</h2>
<p>The table follows one subject that takes four attempts. At a center the two discounted retakes cost only the Texas center fee of ${h.usd(g.rc!)}; the fourth attempt is full price again and opens a new pair. Online every attempt costs ${h.usd(g.o!)}.</p>
${attemptsTable(h, [['Test center', gedTries('TX', 'center', 3)], ['Online', gedTries('TX', 'online', 3)]], 'One Texas GED subject, four attempts, no subsidy.')}
${h.mini('retake', { p: ['st', 'tries'], d: { st: 'TX' }, t: 'Your retakes in Texas' })}
<h2>Center or online</h2>
<p>A center costs ${h.usd(g.o! - g.c)} less per subject, ${h.usd0(o - c)} over the four, and the gap grows with each retake: a failed subject retaken twice costs ${h.usd0(g.c + 2 * g.rc!)} at a center against ${h.usd0(3 * g.o!)} online. Online testing has one advantage, the schedule, and one extra condition: a green GED Ready score before each subject, ${h.usd(G.readyPerSubject)} a subject. At a center Texas does not ask for GED Ready. Subjects can all be taken in one day at a center if its hours allow it; online they are booked one at a time, each after the previous one is finished.</p>
<h2>The HSE Subsidy Program</h2>
<p>Texas residents aged 21 and older may have their GED fees paid by the HSE Subsidy Program, while funding lasts. You do not apply on ged.com: you contact a local Texas Workforce Commission Adult Education and Literacy program, which decides who is eligible. Ask before booking, because a test paid by card is not refunded afterward. Under 21, the program does not apply, and the full price stands. In the calculator, tick that you qualify to see a total of zero for the subjects it covers.</p>
<h2>Age 16 and 17, residency and ID</h2>
<p>The standard age is 18. At 17 you need a government photo ID, Texas residency and parental or guardian permission, and you must not be enrolled in school, except in an approved in-school GED prep program, nor have graduated. At 16 the same ID and residency apply, plus state agency or court-ordered care, or enrollment in Job Corps; a court order may be needed. Nobody under 16 can test. Residency is proven by a Texas driver's license or by another document such as a bill showing a Texas address.</p>
<h2>How Texas compares</h2>
<p>At ${h.usd0(c)} for the four subjects at a center, Texas sits close to the middle of the country, where the median jurisdiction charges ${h.usd0(S.ged.median)}. What sets it apart is the second retake: most states give one discounted retake per failed subject, Texas gives two, which matters most in the subject you find hardest. A student who needs two extra attempts in math and one in science pays ${h.usd0(c + 3 * g.rc!)} at a Texas center in all.</p>
<h2>After the last subject</h2>
<p>Pass the four with ${h.n(G.pass)} or more and the Texas Education Agency issues the TxCHSE. You download it and your scores as a PDF from the TEA Certificate and Transcript Search; TEA no longer mails paper duplicates. Tests can be taken in English or Spanish and mixed. If you move to Texas mid-way, the credential comes from the state where you pass the final subject. The ${h.a('ged-requirements', 'requirements page')} compares Texas with other states, and the ${h.a('california', 'California page')} shows a state where the price is the same online and at a center.</p>`,
  },
  es: {
    slug: 'ged-en-texas',
    nav: 'GED en Texas', card: `${usd(g.c, 'es')} por materia, dos repeticiones baratas, TxCHSE`,
    title: 'GED en Texas 2026: $36.25 por materia, repeticiones y edad',
    description: `GED en Texas en 2026: ${usd(g.c, 'es')} por materia en un centro, ${usd(g.o!, 'es')} en línea, dos repeticiones de ${usd(g.rc!, 'es')}, edades 16 y 17 y el HSE Subsidy Program. Calcule su caso.`,
    h1: '¿Cuánto cuesta el GED en Texas? Precio, repeticiones y quién puede examinarse',
    intro: `Las cuatro materias cuestan ${usd0(c, 'es')} en un centro de Texas y ${usd0(o, 'es')} en línea. Ponga su caso en la calculadora.`,
    resume: `Texas cobra ${usd(g.c, 'es')} por materia del GED en un centro y ${usd(g.o!, 'es')} en línea, así que las cuatro materias cuestan ${usd0(c, 'es')} en un centro y ${usd0(o, 'es')} en línea. Eso sitúa a Texas en el puesto ${r.pos} de ${r.of} jurisdicciones del GED por precio en centro. Su punto fuerte son las repeticiones: cada materia pagada a precio completo y no aprobada trae dos repeticiones con descuento en un centro, a usar en ${G.retakeWindowDays} días, por ${usd(g.rc!, 'es')} cada una, la tarifa del centro de Texas, porque GED Testing Service no cobra la suya. En línea no hay descuento: cada repetición cuesta ${usd(g.o!, 'es')}. Hay que ser residente de Texas y tener 18 años, o 17 con permiso de los padres, o 16 en casos limitados. El HSE Subsidy Program puede pagar las tarifas de los residentes elegibles de 21 años o más a través de un programa de educación para adultos de la Texas Workforce Commission, mientras haya fondos. La credencial es el State of Texas Certificate of High School Equivalency, o TxCHSE, que emite la Texas Education Agency. hiset.org no incluye a Texas, así que el GED es el único examen que ofrecen las páginas que leímos.`,
    faqs: [
      { q: '¿Cuánto cuesta el GED en Texas?', a: `${usd(g.c, 'es')} por materia en un centro, ${usd0(c, 'es')} las cuatro, y ${usd(g.o!, 'es')} por materia en línea, ${usd0(o, 'es')} en total. Una materia suspendida trae dos repeticiones de ${usd(g.rc!, 'es')} cada una en un centro, en ${G.retakeWindowDays} días. A los residentes elegibles de 21 años o más el HSE Subsidy Program puede pagarles las tarifas.` },
      { q: '¿Puede tomar el GED en Texas alguien de 17 años?', a: 'Sí, con una identificación oficial con foto, residencia en Texas y permiso de un padre o tutor, siempre que no esté inscrito en la escuela ni se haya graduado de secundaria. Un programa aprobado de preparación al GED dentro de la escuela es la única excepción. En línea, un padre también debe estar presente al registrarse.' },
      { q: '¿Quién emite el certificado del GED en Texas?', a: 'La Texas Education Agency emite el State of Texas Certificate of High School Equivalency, el TxCHSE. El certificado y los puntajes se piden en PDF imprimible en el sistema TEA Certificate and Transcript Search; la TEA ya no envía duplicados por correo. El mismo sistema permite a un empleador verificar un expediente.' },
      { q: '¿Hay que esperar entre repeticiones del GED en Texas?', a: 'En un centro, no para las dos primeras repeticiones de una materia; tras un tercer intento hay que esperar 60 días. En línea se permite una repetición, y luego una espera de 60 días tras dos intentos en línea de la materia. Texas no fija un límite anual de intentos.' },
    ],
    body: (h) => `
<h2>Cada intento con su precio</h2>
<p>El cuadro sigue una materia que necesita cuatro intentos. En un centro las dos repeticiones con descuento cuestan solo la tarifa del centro de Texas, ${h.usd(g.rc!)}; el cuarto intento vuelve al precio completo y abre un nuevo par. En línea cada intento cuesta ${h.usd(g.o!)}.</p>
${attemptsTable(h, [['Centro', gedTries('TX', 'center', 3)], ['En línea', gedTries('TX', 'online', 3)]], 'Una materia del GED en Texas, cuatro intentos, sin subsidio.')}
${h.mini('retake', { p: ['st', 'tries'], d: { st: 'TX' }, t: 'Sus repeticiones en Texas' })}
<h2>Centro o en línea</h2>
<p>Un centro cuesta ${h.usd(g.o! - g.c)} menos por materia, ${h.usd0(o - c)} en las cuatro, y la diferencia crece con cada repetición: una materia suspendida y repetida dos veces cuesta ${h.usd0(g.c + 2 * g.rc!)} en un centro frente a ${h.usd0(3 * g.o!)} en línea. El examen en línea tiene una ventaja, el horario, y una condición más: un resultado verde en GED Ready antes de cada materia, ${h.usd(G.readyPerSubject)} por materia. En un centro Texas no pide GED Ready. En un centro las materias pueden hacerse todas el mismo día si el horario lo permite; en línea se reservan una por una, cada una tras terminar la anterior.</p>
<h2>El HSE Subsidy Program</h2>
<p>Los residentes de Texas de 21 años o más pueden obtener el pago de sus tarifas del GED por el HSE Subsidy Program, mientras haya fondos. No se solicita en ged.com: se contacta un programa local de Educación y Alfabetización de Adultos de la Texas Workforce Commission, que decide quién es elegible. Pregunte antes de reservar, porque un examen pagado con tarjeta no se reembolsa después. Antes de los 21 años el programa no se aplica y rige el precio completo. En la calculadora, marque que califica para ver un total de cero en las materias que cubre.</p>
<h2>Edad de 16 y 17 años, residencia e identificación</h2>
<p>La edad general es 18 años. A los 17 hace falta una identificación oficial con foto, residencia en Texas y permiso de un padre o tutor, y no estar inscrito en la escuela, salvo en un programa aprobado de preparación al GED dentro de ella, ni haberse graduado. A los 16 se aplican la misma identificación y residencia, más estar bajo tutela de una agencia estatal u orden judicial, o inscrito en Job Corps; puede hacer falta una orden judicial. Nadie menor de 16 puede examinarse. La residencia se prueba con una licencia de conducir de Texas o con otro documento, como una factura con dirección en Texas.</p>
<h2>Cómo se compara Texas</h2>
<p>Con ${h.usd0(c)} por las cuatro materias en un centro, Texas queda cerca del centro del país, donde la jurisdicción mediana cobra ${h.usd0(S.ged.median)}. Lo que lo distingue es la segunda repetición: la mayoría de los estados dan una repetición con descuento por materia suspendida, Texas da dos, lo que pesa sobre todo en la materia que más le cuesta. Quien necesita dos intentos más en matemáticas y uno en ciencias paga en total ${h.usd0(c + 3 * g.rc!)} en un centro de Texas.</p>
<h2>Después de la última materia</h2>
<p>Al aprobar las cuatro con ${h.n(G.pass)} o más, la Texas Education Agency emite el TxCHSE. El certificado y los puntajes se descargan en PDF desde el TEA Certificate and Transcript Search; la TEA ya no envía duplicados en papel. Los exámenes pueden hacerse en inglés o en español y combinarse. Si se muda a Texas a mitad de camino, la credencial la emite el estado donde aprueba la última materia. La ${h.a('ged-requirements', 'página de requisitos')} compara Texas con otros estados, y la ${h.a('california', 'página de California')} muestra un estado donde el precio es el mismo en línea y en un centro.</p>`,
  },
});
