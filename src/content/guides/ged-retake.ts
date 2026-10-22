import { defineGuide } from '../../lib/page-types';
import { GED_STATES, GENERAL } from '../../lib/data';
import { gedCost, hisetCost } from '../../lib/engine/hse';
import { S } from '../../lib/stats';
import { list, st, usd, attemptsTable } from './_u';

const G = GENERAL.ged;
/* Cycles réels : une matière, cinq tentatives (quatre reprises). */
const cyc = (code: string, online = false) => gedCost(code, { mode: online ? 'online' : 'center', parts: 1, retakes: 4, qualify: false }).plan[0];
const hcyc = (code: string) => hisetCost(code, { mode: 'center', parts: 1, retakes: 4, qualify: false }).plan[0];
const waits = GED_STATES.filter((s) => s.ged!.w1 > 0 || s.ged!.w3 !== 60 || s.ged!.cap).map((s) => s.code);
const freeRetake = GED_STATES.filter((s) => s.ged!.rc === 0 && s.ged!.c > 0 && !s.ged!.retakeFree && !s.ged!.centerExtra).map((s) => s.code);

export default defineGuide({
  id: 'ged-retake', group: 'cost', order: 6,
  tool: 'retake', toolArg: { st: 'GA', tries: 1 },
  related: ['ged-cost', 'hiset', 'ged-passing-score', 'ged-ready', 'ged-online', 'how-long-ged'],
  sources: ['ged-policies', 'ged-GA', 'ged-TX', 'ged-NY', 'ged-CT', 'ged-WY', 'hiset-CA'],
  en: {
    slug: 'ged-retake-policy',
    nav: 'Retaking the GED', card: 'Discounted retakes, waiting periods, cost per attempt',
    title: 'GED Retake Policy 2026: Cost per Attempt and Waiting Time',
    description: 'GED retake policy in 2026: the discounted retake at a test center, its price in each state, the 60-day wait after three attempts, online and HiSET retakes.',
    h1: 'Retaking the GED: what each attempt costs, and when you can book it',
    intro: 'A failed subject is not lost money: at a test center the next attempt is discounted. The cycle, the price and the wait depend on your state.',
    resume: `If you fail a GED subject at a test center, the next attempt of that subject is discounted: GED Testing Service waives its own share and you pay only what the state page lists, ${usd(10, 'en')} in ${S.rc10} states, nothing in ${list(freeRetake, 'en')}, ${usd(st('GA').ged!.rc!, 'en')} in Georgia and South Dakota. The discount must be used within ${G.retakeWindowDays} days of the full-price attempt. After it, the next attempt is full price again, which opens another discounted retake: the cycle is one full price, one discount, and so on, until you pass. Texas, South Carolina and Rhode Island give two discounted retakes per full-price attempt. Online retakes are never discounted. Most states let you retake a subject twice with no waiting period and then ask you to wait 60 days after the third attempt; New York and Connecticut make you wait 60 days before any retake and cap attempts at three a year. On the HiSET, the second and third attempt of a subtest cost only the center fee. The calculator gives the price of your next attempt.`,
    faqs: [
      { q: 'Is there a limit to how many times I can take the GED?', a: 'In most states there is no lifetime limit, only waiting periods. A few states cap attempts per year: New York, Connecticut and Vermont at three per subject, West Virginia at four, Wyoming at six retests. A missed appointment without cancelling counts as an attempt in several states.' },
      { q: 'Do I have to retake subjects I already passed?', a: 'No. GED scores are kept subject by subject, so you retake only what you failed. New York does not even allow a retest for a higher score in a subject already passed. Elsewhere, check your state page before booking a subject you have already passed.' },
      { q: 'Can I use my discounted retake online?', a: 'No. ged.com marks discounted retakes as a test center benefit. Online, every attempt is full price, and after two online attempts at a subject you wait 60 days. If you failed online, booking the retake at a center brings the discount back where your state offers it.' },
      { q: 'What happens to my discount after 365 days?', a: `It expires. The discounted retake has to be used within ${G.retakeWindowDays} days of the full-price attempt that failed. After that, the next attempt is full price, which opens a new discount. Planning a retake within a few weeks keeps the material fresh and the price low.` },
    ],
    body: (h) => `
<h2>The cycle, in real prices</h2>
<p>The table shows five attempts at one subject in four states, as the calculator computes them. At a center, a full-price attempt opens a discount; online, every attempt is full price.</p>
${attemptsTable(h, [
  ['Georgia, test center', cyc('GA')],
  ['Texas, test center', cyc('TX')],
  ['Texas, online', cyc('TX', true)],
  ['North Carolina, test center', cyc('NC')],
  ['California HiSET, test center', hcyc('CA')],
], 'One subject, five attempts. GED: one discounted retake per full-price attempt (two in Texas). HiSET: full fee on attempts 1 and 4.')}
<p>In Georgia a subject costs ${h.usd(st('GA').ged!.c)} and its discounted retake ${h.usd(st('GA').ged!.rc!)}. In Texas the second and third attempts are both discounted at ${h.usd(st('TX').ged!.rc!)}, then the fourth is full price. In North Carolina the discounted retake costs nothing at all, so failing once at a center costs only time. The HiSET line shows its different rule: the full price returns only on the fourth attempt.</p>
${h.mini('retake', { p: ['st', 'tries'], d: { st: 'TX', tries: 2 }, t: 'The price of your next attempt' })}
<h2>Waiting periods</h2>
<p>The usual rule at a test center is no waiting period for the first two retakes, then 60 days after the third attempt, with no yearly limit. Several states set their own: ${list(waits, 'en')}. New York and Connecticut ask for 60 days before any retake and allow three attempts a year. Washington, D.C. asks for 30 days before each of the first two retakes and a GED Ready score of Likely to Pass or Too Close to Call in the subject. West Virginia asks for 14 days, Wyoming for seven days between attempts. Online, ged.com allows one retake before a 60-day wait.</p>
<h2>Is GED Ready worth it before a retake?</h2>
<p>The official practice test costs ${h.usd(G.readyPerSubject)} a subject, about the price of a discounted retake in most states. Its value is in the score report, which shows what to work on, rather than in the price comparison. Where the retake costs nothing, as in North Carolina, the main cost of failing is the wait and the study time. Where a retake is full price, as online, a ${h.usd(G.readyPerSubject)} check before booking can save ${h.usd(36)} or more. The ${h.a('ged-ready', 'GED Ready page')} works through this choice.</p>
<h2>Retakes paid by the state</h2>
<p>Mississippi pays every attempt at its test centers with the code MSRETAKE for retakes. New York pays all attempts. Most other state programs pay only the first attempt: Maryland says plainly that retests are not subsidized, and Pennsylvania’s code covers the first attempt of each subject. On the HiSET, Massachusetts and Mississippi pay two retakes per subtest. The ${h.a('free-ged', 'free testing page')} lists every program.</p>
<h2>Missed appointments and no-shows</h2>
<p>A booked test you do not attend can cost an attempt. Florida’s page says that a no-show counts as a test attempt, Connecticut counts a missed test that was not cancelled at least 24 hours ahead, and New York makes you wait 60 days before booking a missed subject again. Cancelling or rescheduling in your ged.com account before the deadline avoids this. If you are unsure you will be ready, it is cheaper to move the appointment than to sit an attempt you expect to fail.</p>
<h2>Planning the next attempt</h2>
<p>Look at the score report before booking. A score a few points under ${h.n(G.pass)} usually calls for targeted review of the weaker areas the report lists, while a score far below calls for a class or a longer study period. The ${h.a('how-long-ged', 'timeline calculator')} adds your study weeks and the waiting periods of your state, and the ${h.a('ged-passing-score', 'score page')} tells you how far each subject is from passing and from College Ready. Booking the retake at a center rather than online keeps the discount; booking it within a few weeks keeps the material fresh.</p>`,
  },
  es: {
    slug: 'repetir-examen-ged',
    nav: 'Repetir el GED', card: 'Repeticiones con descuento, esperas, costo por intento',
    title: 'Repetir el examen GED 2026: costo por intento y esperas',
    description: 'Repetir el examen GED en 2026: la repetición con descuento en un centro, su precio en cada estado, la espera de 60 días tras tres intentos, en línea y el HiSET.',
    h1: 'Repetir el GED: cuánto cuesta cada intento y cuándo reservarlo',
    intro: 'Una materia reprobada no es dinero perdido: en un centro el siguiente intento tiene descuento. El ciclo, el precio y la espera dependen de su estado.',
    resume: `Si reprueba una materia del GED en un centro, el siguiente intento de esa materia tiene descuento: GED Testing Service no cobra su parte y usted paga solo lo que indica la página del estado, ${usd(10, 'es')} en ${S.rc10} estados, nada en ${list(freeRetake, 'es')}, ${usd(st('GA').ged!.rc!, 'es')} en Georgia y Dakota del Sur. El descuento debe usarse en los ${G.retakeWindowDays} días siguientes al intento a precio completo. Después, el intento siguiente vuelve al precio completo, lo que abre otra repetición con descuento: el ciclo es un precio completo, un descuento, y así hasta aprobar. Texas, Carolina del Sur y Rhode Island dan dos repeticiones con descuento por cada intento a precio completo. Las repeticiones en línea nunca tienen descuento. La mayoría de los estados permiten repetir una materia dos veces sin espera y luego piden 60 días tras el tercer intento; Nueva York y Connecticut exigen 60 días antes de cualquier repetición y limitan a tres intentos al año. En el HiSET, el segundo y el tercer intento de una prueba cuestan solo la tarifa del centro. La calculadora da el precio de su próximo intento.`,
    faqs: [
      { q: '¿Hay un límite de veces para tomar el GED?', a: 'En la mayoría de los estados no hay límite de por vida, solo esperas. Unos pocos estados limitan los intentos por año: Nueva York, Connecticut y Vermont a tres por materia, Virginia Occidental a cuatro, Wyoming a seis repeticiones. En varios estados una cita perdida sin cancelar cuenta como intento.' },
      { q: '¿Tengo que repetir las materias que ya aprobé?', a: 'No. Los puntajes del GED se guardan materia por materia, así que solo repite lo que reprobó. Nueva York ni siquiera permite repetir para subir el puntaje de una materia aprobada. En otros estados, revise la página de su estado antes de reservar una materia ya aprobada.' },
      { q: '¿Puedo usar mi repetición con descuento en línea?', a: 'No. ged.com presenta la repetición con descuento como una ventaja de los centros. En línea, cada intento se paga completo, y tras dos intentos en línea de una materia hay que esperar 60 días. Si reprobó en línea, reservar la repetición en un centro recupera el descuento donde su estado lo ofrece.' },
      { q: '¿Qué pasa con mi descuento después de 365 días?', a: `Caduca. La repetición con descuento debe usarse en los ${G.retakeWindowDays} días siguientes al intento a precio completo reprobado. Pasado ese plazo, el siguiente intento es a precio completo, lo que abre un nuevo descuento. Planear la repetición en pocas semanas mantiene fresco lo estudiado y bajo el precio.` },
    ],
    body: (h) => `
<h2>El ciclo, con precios reales</h2>
<p>La tabla muestra cinco intentos de una materia en cuatro estados, tal como los calcula la calculadora. En un centro, un intento a precio completo abre un descuento; en línea, cada intento se paga completo.</p>
${attemptsTable(h, [
  ['Georgia, centro', cyc('GA')],
  ['Texas, centro', cyc('TX')],
  ['Texas, en línea', cyc('TX', true)],
  ['Carolina del Norte, centro', cyc('NC')],
  ['HiSET de California, centro', hcyc('CA')],
], 'Una materia, cinco intentos. GED: una repetición con descuento por cada intento a precio completo (dos en Texas). HiSET: tarifa completa en los intentos 1 y 4.')}
<p>En Georgia una materia cuesta ${h.usd(st('GA').ged!.c)} y su repetición con descuento ${h.usd(st('GA').ged!.rc!)}. En Texas el segundo y el tercer intento tienen descuento, ${h.usd(st('TX').ged!.rc!)} cada uno, y el cuarto vuelve al precio completo. En Carolina del Norte la repetición con descuento no cuesta nada, así que reprobar una vez en un centro solo cuesta tiempo. La línea del HiSET muestra su regla distinta: el precio completo solo vuelve en el cuarto intento.</p>
${h.mini('retake', { p: ['st', 'tries'], d: { st: 'TX', tries: 2 }, t: 'El precio de su próximo intento' })}
<h2>Esperas</h2>
<p>La regla habitual en un centro es no esperar para las dos primeras repeticiones y luego 60 días tras el tercer intento, sin límite anual. Varios estados fijan la suya: ${list(waits, 'es')}. Nueva York y Connecticut piden 60 días antes de cualquier repetición y permiten tres intentos al año. Washington D. C. pide 30 días antes de cada una de las dos primeras repeticiones y un resultado Likely to Pass o Too Close to Call en GED Ready en esa materia. Virginia Occidental pide 14 días, Wyoming siete días entre intentos. En línea, ged.com permite una repetición antes de una espera de 60 días.</p>
<h2>¿Vale la pena GED Ready antes de repetir?</h2>
<p>El examen de práctica oficial cuesta ${h.usd(G.readyPerSubject)} por materia, más o menos lo que una repetición con descuento en la mayoría de los estados. Su valor está en el informe de resultados, que dice qué repasar, más que en la comparación de precios. Donde repetir no cuesta nada, como en Carolina del Norte, el costo principal de reprobar es la espera y el tiempo de estudio. Donde repetir se paga completo, como en línea, una comprobación de ${h.usd(G.readyPerSubject)} antes de reservar puede ahorrar ${h.usd(36)} o más. La ${h.a('ged-ready', 'página de GED Ready')} recorre esta decisión.</p>
<h2>Repeticiones pagadas por el estado</h2>
<p>Misisipi paga todos los intentos en sus centros con el código MSRETAKE para las repeticiones. Nueva York paga todos los intentos. La mayoría de los demás programas estatales solo pagan el primer intento: Maryland indica claramente que las repeticiones no se subsidian, y el código de Pensilvania cubre el primer intento de cada materia. En el HiSET, Massachusetts y Misisipi pagan dos repeticiones por prueba. La ${h.a('free-ged', 'página del examen gratis')} recoge cada programa.</p>
<h2>Citas perdidas y ausencias</h2>
<p>Un examen reservado al que no se presenta puede costar un intento. La página de Florida indica que una ausencia cuenta como intento, Connecticut cuenta un examen perdido que no se canceló con al menos 24 horas de antelación, y Nueva York obliga a esperar 60 días antes de volver a reservar una materia perdida. Cancelar o cambiar la cita en su cuenta de ged.com antes del plazo lo evita. Si no está seguro de llegar preparado, sale más barato mover la cita que presentarse a un intento que espera reprobar.</p>
<h2>Preparar el siguiente intento</h2>
<p>Mire el informe de puntajes antes de reservar. Un puntaje a pocos puntos de ${h.n(G.pass)} suele pedir un repaso de las áreas débiles que señala el informe, mientras que un puntaje muy por debajo pide una clase o más tiempo de estudio. La ${h.a('how-long-ged', 'calculadora de plazos')} suma sus semanas de estudio y las esperas de su estado, y la ${h.a('ged-passing-score', 'página de puntajes')} indica a qué distancia está cada materia de aprobar y de College Ready. Reservar la repetición en un centro en lugar de en línea conserva el descuento; reservarla en pocas semanas mantiene fresco lo estudiado.</p>`,
  },
});
