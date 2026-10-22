import { defineGuide } from '../../lib/page-types';
import { HISET_STATES, GENERAL, byName } from '../../lib/data';
import { S } from '../../lib/stats';
import { list, st, usd, usd0, tot } from './_u';

const H = GENERAL.hiset;
const h_ = S.hiset;
const rowsOf = (l: 'en' | 'es') => byName(l).filter((s) => s.hiset).map((s) => {
  const x = s.hiset!;
  const c = x.hc == null ? (l === 'en' ? 'set by center' : 'lo fija el centro') : usd(x.hc, l);
  const ho = x.ho == null ? (l === 'en' ? 'not listed' : 'no indicado') : usd(x.ho, l);
  const once = x.once ? usd(x.once, l) : '';
  return [s[l], c, ho, once, x.help ? (l === 'en' ? 'yes' : 'sí') : ''];
});
const ca = st('CA').hiset!, mo = st('MO').hiset!;

export default defineGuide({
  id: 'hiset', group: 'cost', order: 2,
  tool: 'cost', toolArg: { st: 'NC', test: 'hiset' },
  related: ['ged-vs-hiset', 'hiset-scores', 'hiset-practice-test', 'ged-cost', 'free-ged', 'ged-retake'],
  sources: ['hiset-states', 'hiset-about', 'hiset-scores', 'hiset-CA', 'hiset-MO', 'hiset-PA', 'hiset-MS'],
  en: {
    slug: 'hiset-exam-cost',
    nav: 'HiSET cost and rules', card: 'The 24 HiSET states, fees per subtest, at-home testing',
    title: 'HiSET Exam Cost 2026: Fees by State, Subtests, Retakes',
    description: 'HiSET exam cost in 2026 for all 24 states that offer it: price per subtest at a center and at home, state fees, free testing, retakes and the passing rules.',
    h1: 'HiSET exam: the program’s cost in each of the 24 states that offer it',
    intro: `Five subtests, priced by the state. In the middle state the whole HiSET costs ${usd0(h_.median, 'en')}; in four states it is free.`,
    resume: `The HiSET is the other high school equivalency test, run by ETS. ${h_.n} states offer it in 2026, and ${list(S.hisetOnly, 'en')} offer nothing else. It has five subtests: math, science, social studies, language arts reading and language arts writing, each booked and paid on its own. At a test center the whole test costs ${usd0(h_.median, 'en')} in the middle state, from ${usd0(h_.cheapestPaid.total, 'en')} in Hawaii, Iowa, North Carolina and Wyoming to ${usd0(h_.dearest.total, 'en')} in California, where a one-time ${usd(ca.once!, 'en')} state fee comes on top of ${usd(ca.hc!, 'en')} a subtest. ${list(h_.free, 'en')} pay the first attempt for residents or everyone. Testing at home costs more, usually ${usd(41, 'en')} a subtest, and five states list no at-home option. A retake is cheaper than on the GED: you pay the full fee only on the first and fourth attempt of a subtest; the second and third cost only the center or proctoring fee. To pass you need ${H.passEach} of ${H.outOf} on each subtest, ${H.passTotal} of ${H.totalMax} in total and ${H.essayMin} of ${H.essayMax} on the essay.`,
    faqs: [
      { q: 'Which states offer the HiSET in 2026?', a: `${h_.n} states: ${list(HISET_STATES.map((s) => s.code), 'en')}. New Jersey stopped offering it on June 1, 2023 and West Virginia on August 1, 2024. Everywhere else, only the GED is available. Iowa and Maine offer the HiSET only.` },
      { q: 'How much is a HiSET retake?', a: `Less than a first attempt. On the second and third attempt of a subtest you pay only the center fee, the price minus the test fee: ${usd(ca.hc! - ca.tf!, 'en')} in California, ${usd(mo.hc! - mo.tf!, 'en')} in Missouri at a center. The fourth attempt is full price again. Massachusetts and Mississippi pay two retakes per subtest.` },
      { q: 'Can I take the HiSET at home?', a: `In most HiSET states, yes, with an online proctor, usually for ${usd(41, 'en')} a subtest. ${list(h_.noHome, 'en')} list no at-home price: Montana stopped at-home testing on September 1, 2025 and Indiana suspended it in July 2025 except approved cases.` },
      { q: 'Is the HiSET easier than the GED?', a: 'Neither program publishes a comparison, and both lead to the same state credential. They differ in format: five shorter subtests against four GED subjects, a separate writing subtest with an essay, and a passing rule based on each subtest and a total. Some people prefer the HiSET because its retakes cost less.' },
    ],
    body: (h) => `
<h2>Price per subtest in every HiSET state</h2>
<p>The table lists the ${h.n(h_.n)} states in alphabetical order with the price of one subtest at a test center (computer), the price at home with an online proctor, any state fee paid once, and whether the state publishes a discount or voucher program. Paper tests cost the same as computer tests in most states, with three exceptions: Colorado charges ${h.usd(st('CO').hiset!.hp!)} on paper, Hawaii ${h.usd(st('HI').hiset!.hp!)}, and New Mexico ${h.usd(st('NM').hiset!.hp!)} on paper against ${h.usd(st('NM').hiset!.hc!)} on computer.</p>
${h.table(['State', 'Test center', 'At home', 'State fee, once', 'Help'], rowsOf('en'), 'HiSET price per subtest as listed on each state page of hiset.org.', ['l', 'r', 'r', 'r', 'l'])}
${h.mini('cost', { p: ['st', 'mode'], d: { st: 'MO', test: 'hiset' }, t: 'Your HiSET total' })}
<h2>What the price is made of</h2>
<p>A HiSET price per subtest combines a test fee that goes to ETS, usually ${h.usd(18)}, and a center or state fee that varies. That split matters for retakes: on the second and third attempt of a subtest you pay only the part that is not the test fee. In Missouri a subtest costs ${h.usd(mo.hc!)} at a center, of which ${h.usd(mo.tf!)} is the test fee, so a second attempt costs ${h.usd(mo.hc! - mo.tf!)}. Missouri, Louisiana and Michigan also charge a yearly state fee of ${h.usd(mo.once!)}, ${h.usd(st('LA').hiset!.once!)} and ${h.usd(st('MI').hiset!.once!)}, paid at the first subtest of the year.</p>
<h2>Where the state pays</h2>
<p>Four states take the whole first attempt off the bill. Maine charges no fee to its residents. Massachusetts pays the first test in each subject plus two retakes. Mississippi pays the HiSET and two retests per subtest since July 1, 2026. Pennsylvania covers up to five subtests for residents with a public code. Others run voucher programs you must qualify for: Tennessee’s covers all costs for people in local adult education, Ohio gives ${h.usd(80)} vouchers, Georgia, New Mexico, California and Indiana have their own. The ${h.a('free-ged', 'free testing page')} sets out each program.</p>
<h2>Passing and readiness</h2>
<p>Each subtest is scored from 1 to ${h.n(H.outOf)}. You pass with at least ${h.n(H.passEach)} on every subtest, at least ${h.n(H.passTotal)} of ${h.n(H.totalMax)} on the five together and at least ${h.n(H.essayMin)} of ${h.n(H.essayMax)} on the essay that is part of the writing subtest. A score of ${h.n(H.ccrEach)} on a subtest and ${h.n(H.ccrEssay)} on the essay marks college and career readiness. The ${h.a('hiset-scores', 'HiSET scores page')} checks a set of scores, and the ${h.a('hiset-practice-test', 'HiSET practice questions')} cover all five subjects.</p>
<h2>Booking, paying and retaking at home</h2>
<p>Each subtest is booked and paid in your HiSET account, one at a time or several together, in the order you choose. Nothing obliges you to take the five in one week: many people start with the subject they feel surest about, then move on. At home, the price of a subtest includes an online proctoring fee of ${h.usd(H.atHomeProctor)} on top of the test fee, so a second or third attempt at home costs ${h.usd(H.atHomeProctor)} wherever the full price is ${h.usd(41)}. Before booking at home, check the equipment rules on hiset.org and whether your state lists the option at all. If your state pays the first attempt, read its conditions first: Pennsylvania and Maine limit the offer to residents, and Mississippi gives one promo code per subtest.</p>
<h2>Times and languages</h2>
<p>Math takes ${h.n(H.minutes.math)} minutes, science ${h.n(H.minutes.science)}, social studies ${h.n(H.minutes.social)}, reading ${h.n(H.minutes.reading)} (${h.n(H.readingSpanish)} in Spanish) and writing ${h.n(H.minutes.writing)}, multiple choice plus the essay. The test exists in English and Spanish, on paper, on computer, and at home where the state allows it. Each state sets its own age and residency rules; Ohio, for instance, asks HiSET testers to be residents and allows 16 to 18 year olds under conditions.</p>`,
  },
  es: {
    slug: 'costo-examen-hiset',
    nav: 'Costo y reglas del HiSET', card: 'Los 24 estados del HiSET, tarifa por prueba, examen en casa',
    title: 'Costo del examen HiSET 2026: tarifas por estado y pruebas',
    description: 'Costo del examen HiSET en 2026 en los 24 estados que lo ofrecen: precio por prueba en un centro y en casa, tarifas estatales, examen gratis y repeticiones.',
    h1: 'Examen HiSET: costo del programa en cada uno de los 24 estados que lo ofrecen',
    intro: `Cinco pruebas, con el precio que fija cada estado. En el estado del medio el HiSET completo cuesta ${usd0(h_.median, 'es')}; en cuatro estados es gratis.`,
    resume: `El HiSET es el otro examen de equivalencia de la secundaria, a cargo de ETS. ${h_.n} estados lo ofrecen en 2026, y ${list(S.hisetOnly, 'es')} no ofrecen otro. Tiene cinco pruebas: matemáticas, ciencias, estudios sociales, lectura y escritura, y cada una se reserva y se paga por separado. En un centro el examen completo cuesta ${usd0(h_.median, 'es')} en el estado del medio, desde ${usd0(h_.cheapestPaid.total, 'es')} en Hawái, Iowa, Carolina del Norte y Wyoming hasta ${usd0(h_.dearest.total, 'es')} en California, donde una tarifa estatal única de ${usd(ca.once!, 'es')} se suma a ${usd(ca.hc!, 'es')} por prueba. ${list(h_.free, 'es')} pagan el primer intento a sus residentes o a todos. Examinarse en casa cuesta más, normalmente ${usd(41, 'es')} por prueba, y cinco estados no indican esa opción. Repetir sale más barato que en el GED: la tarifa completa solo se paga en el primer y el cuarto intento de una prueba; el segundo y el tercero cuestan solo la tarifa del centro o de supervisión. Para aprobar hacen falta ${H.passEach} de ${H.outOf} en cada prueba, ${H.passTotal} de ${H.totalMax} en total y ${H.essayMin} de ${H.essayMax} en el ensayo.`,
    faqs: [
      { q: '¿Qué estados ofrecen el HiSET en 2026?', a: `${h_.n} estados: ${list(HISET_STATES.map((s) => s.code), 'es')}. Nueva Jersey dejó de ofrecerlo el 1 de junio de 2023 y Virginia Occidental el 1 de agosto de 2024. En los demás solo existe el GED. Iowa y Maine solo ofrecen el HiSET.` },
      { q: '¿Cuánto cuesta repetir el HiSET?', a: `Menos que un primer intento. En el segundo y el tercer intento de una prueba solo se paga la tarifa del centro, el precio menos la tarifa del examen: ${usd(ca.hc! - ca.tf!, 'es')} en California, ${usd(mo.hc! - mo.tf!, 'es')} en Misuri en un centro. El cuarto intento vuelve al precio completo. Massachusetts y Misisipi pagan dos repeticiones por prueba.` },
      { q: '¿Puedo tomar el HiSET en casa?', a: `En la mayoría de los estados del HiSET, sí, con un supervisor en línea, normalmente por ${usd(41, 'es')} por prueba. ${list(h_.noHome, 'es')} no indican precio en casa: Montana dejó de ofrecerlo el 1 de septiembre de 2025 e Indiana lo suspendió en julio de 2025 salvo casos aprobados.` },
      { q: '¿Es el HiSET más fácil que el GED?', a: 'Ningún programa publica una comparación, y ambos llevan a la misma credencial estatal. Cambia el formato: cinco pruebas más cortas frente a cuatro materias del GED, una prueba de escritura aparte con ensayo, y una regla de aprobación por prueba y por total. Hay quien prefiere el HiSET porque repetir cuesta menos.' },
    ],
    body: (h) => `
<h2>Precio por prueba en cada estado del HiSET</h2>
<p>La tabla recoge los ${h.n(h_.n)} estados por orden alfabético con el precio de una prueba en un centro (computadora), el precio en casa con supervisor en línea, la tarifa estatal única si existe, y si el estado publica un descuento o un programa de bonos. En papel suele costar lo mismo que en computadora, con tres excepciones: Colorado cobra ${h.usd(st('CO').hiset!.hp!)} en papel, Hawái ${h.usd(st('HI').hiset!.hp!)}, y Nuevo México ${h.usd(st('NM').hiset!.hp!)} en papel frente a ${h.usd(st('NM').hiset!.hc!)} en computadora.</p>
${h.table(['Estado', 'Centro', 'En casa', 'Tarifa estatal única', 'Ayuda'], rowsOf('es'), 'Precio del HiSET por prueba según la página de cada estado en hiset.org.', ['l', 'r', 'r', 'r', 'l'])}
${h.mini('cost', { p: ['st', 'mode'], d: { st: 'MO', test: 'hiset' }, t: 'Su total del HiSET' })}
<h2>De qué se compone el precio</h2>
<p>El precio de una prueba del HiSET junta una tarifa de examen que va a ETS, normalmente ${h.usd(18)}, y una tarifa del centro o del estado que cambia. Esa división importa al repetir: en el segundo y el tercer intento de una prueba solo se paga la parte que no es la tarifa del examen. En Misuri una prueba cuesta ${h.usd(mo.hc!)} en un centro, de los que ${h.usd(mo.tf!)} son la tarifa del examen, así que un segundo intento cuesta ${h.usd(mo.hc! - mo.tf!)}. Misuri, Luisiana y Míchigan cobran además una tarifa estatal anual de ${h.usd(mo.once!)}, ${h.usd(st('LA').hiset!.once!)} y ${h.usd(st('MI').hiset!.once!)}, que se paga con la primera prueba del año.</p>
<h2>Dónde paga el estado</h2>
<p>Cuatro estados quitan de la cuenta todo el primer intento. Maine no cobra a sus residentes. Massachusetts paga el primer examen de cada materia y dos repeticiones. Misisipi paga el HiSET y dos repeticiones por prueba desde el 1 de julio de 2026. Pensilvania cubre hasta cinco pruebas a sus residentes con un código público. Otros tienen bonos para quien califica: el de Tennessee cubre todos los costos a quien asiste a la educación para adultos local, Ohio da bonos de ${h.usd(80)}, y Georgia, Nuevo México, California e Indiana tienen los suyos. La ${h.a('free-ged', 'página del examen gratis')} detalla cada programa.</p>
<h2>Aprobar y estar preparado</h2>
<p>Cada prueba se califica de 1 a ${h.n(H.outOf)}. Se aprueba con al menos ${h.n(H.passEach)} en cada prueba, al menos ${h.n(H.passTotal)} de ${h.n(H.totalMax)} en las cinco juntas y al menos ${h.n(H.essayMin)} de ${h.n(H.essayMax)} en el ensayo que forma parte de la prueba de escritura. Un ${h.n(H.ccrEach)} en una prueba y un ${h.n(H.ccrEssay)} en el ensayo marcan la preparación universitaria y laboral. La ${h.a('hiset-scores', 'página de puntajes del HiSET')} revisa sus puntajes, y las ${h.a('hiset-practice-test', 'preguntas de práctica del HiSET')} cubren las cinco materias.</p>
<h2>Reservar, pagar y repetir en casa</h2>
<p>Cada prueba se reserva y se paga en su cuenta del HiSET, una a la vez o varias juntas, en el orden que usted elija. Nada obliga a tomar las cinco en una semana: muchas personas empiezan por la materia que dominan mejor y siguen después. En casa, el precio de una prueba incluye una tarifa de supervisión en línea de ${h.usd(H.atHomeProctor)} además de la tarifa del examen, así que un segundo o tercer intento en casa cuesta ${h.usd(H.atHomeProctor)} donde el precio completo es ${h.usd(41)}. Antes de reservar en casa, revise las reglas de equipo en hiset.org y si su estado ofrece esa opción. Si su estado paga el primer intento, lea antes sus condiciones: Pensilvania y Maine limitan la oferta a sus residentes, y Misisipi da un código promocional por prueba.</p>
<h2>Tiempos e idiomas</h2>
<p>Matemáticas dura ${h.n(H.minutes.math)} minutos, ciencias ${h.n(H.minutes.science)}, estudios sociales ${h.n(H.minutes.social)}, lectura ${h.n(H.minutes.reading)} (${h.n(H.readingSpanish)} en español) y escritura ${h.n(H.minutes.writing)}, preguntas de opción múltiple más el ensayo. El examen existe en inglés y en español, en papel, en computadora y en casa donde el estado lo permite. Cada estado fija sus reglas de edad y residencia; Ohio, por ejemplo, pide ser residente para el HiSET y admite a jóvenes de 16 a 18 años con condiciones.</p>`,
  },
});
