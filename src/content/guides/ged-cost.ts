import { defineGuide } from '../../lib/page-types';
import { GED_STATES, GENERAL } from '../../lib/data';
import { S } from '../../lib/stats';
import { list, st, usd, usd0, tot } from './_u';

/* Prix par matière : regroupement des 49 juridictions qui offrent le GED, au centre d'examen. */
const byPrice = new Map<number, string[]>();
for (const s of GED_STATES) { const c = s.ged!.c; byPrice.set(c, [...(byPrice.get(c) ?? []), s.code]); }
const prices = [...byPrice.entries()].sort((a, b) => a[0] - b[0]);
const g = S.ged;
const G = GENERAL.ged;
const sd = st('SD').ged!, mo = st('MO').ged!, ct = st('CT').ged!;

export default defineGuide({
  id: 'ged-cost', group: 'cost', order: 1,
  tool: 'cost', toolArg: { st: 'CA', test: 'ged' },
  related: ['free-ged', 'ged-retake', 'ged-online', 'ged-vs-hiset', 'hiset', 'texas'],
  sources: ['ged-policies', 'ged-price', 'ged-CA', 'ged-SD', 'ged-MO', 'ged-CT'],
  en: {
    slug: 'ged-test-cost',
    nav: 'GED test cost', card: 'Price per subject, all states, fees and discounts',
    title: 'GED Test Cost 2026: Price per Subject in Every State',
    description: 'GED test cost in 2026: price per subject in all 49 jurisdictions that offer it, online and at a test center, state fees, promo codes and the full total.',
    h1: 'How much does the GED cost? The price per subject in every state',
    intro: `Four subjects, each paid on its own. ${usd(36, 'en')} a subject is the most common price; your state may charge more, less or nothing.`,
    resume: `The GED is paid subject by subject, and each state sets the price. ${g.price36} of the ${g.n} jurisdictions that offer the test charge ${usd(36, 'en')} per subject at a test center, so the whole test costs ${usd0(144, 'en')} there. The cheapest paying places are Connecticut, which charges nothing per subject but a ${usd(ct.once!, 'en')} registration fee, Washington, D.C., where a public code brings the first attempt down to ${usd(st('DC').ged!.first!, 'en')} a subject, and Arkansas at ${usd(st('AR').ged!.c, 'en')} a subject. The most expensive is South Dakota at ${usd(sd.c, 'en')} a subject, ${usd0(tot('SD'), 'en')} in all, ahead of Georgia at ${usd0(tot('GA'), 'en')}. Missouri adds a yearly ${usd(mo.once!, 'en')} fee. ${g.free.length} jurisdictions pay the first attempt for everyone who meets their rules. Online prices differ from center prices in many states, and retakes are discounted only at a center. All prices were read on each state page of ged.com; the calculator adds them for your state and the subjects you still need.`,
    faqs: [
      { q: 'Do I have to pay for all four GED subjects at once?', a: 'No. Each subject is booked and paid separately, when you schedule it on ged.com. Many people take one subject at a time, a few weeks apart, and pay as they go. The total in the calculator assumes every subject you have left; set the subjects already passed to see only what remains to pay.' },
      { q: 'Why does the GED cost different amounts in different states?', a: 'GED Testing Service sells the test, but each state adds or covers its own share: a state fee, a test center fee, or a subsidy on the first attempt. That is why the same subject costs a few dollars in Arkansas and fifty in South Dakota. The state page on ged.com gives the price that applies where you test.' },
      { q: 'Can I pay for the GED with cash?', a: 'The test is paid online by card when you schedule it. For people without a card, ged.com mentions a prepaid card that can be loaded with cash in stores. Some adult education programs and state vouchers pay the fee directly, so there is nothing to pay at all.' },
      { q: 'Are there hidden fees on top of the GED price?', a: `In a few states, yes. Missouri charges ${usd(mo.once!, 'en')} a year on top of the subject price, Connecticut a ${usd(ct.once!, 'en')} registration fee, and in Montana and Wyoming the test center may add its own fee, which the state page does not publish. The calculator shows these when they apply.` },
    ],
    body: (h) => `
<h2>Price per subject, grouped</h2>
<p>The table groups the ${h.n(g.n)} jurisdictions that offer the GED by their price per subject at a test center, before any discount. Two states, Iowa and Maine, do not offer the GED at all; they use the ${h.a('hiset', 'HiSET')} instead.</p>
${h.table(['Price per subject', 'Whole test (4 subjects)', 'Where'], prices.map(([p, codes]) => [h.usd(p), h.usd0(p * 4), list(codes, 'en')]), 'GED price per subject at a test center, as listed on each state page of ged.com. One-time fees and discounts are not included here.', ['r', 'r', 'l'])}
<p>The list price is not always what you pay. ${list(g.subsidized.filter((c) => !g.cond.includes(c)), 'en')} lower the first attempt for everyone or with a public code, and ${list(g.cond, 'en')} pay for people who qualify through a state program. The ${h.a('free-ged', 'free GED page')} explains each offer and who can use it.</p>
${h.mini('cost', { p: ['st', 'done'], d: { st: 'GA' }, t: 'What is left to pay in your state' })}
<h2>Test center or online</h2>
<p>The GED can be taken online in ${h.n(g.online)} jurisdictions. The online price is often the same as the center price, but not always: Texas charges ${h.usd(st('TX').ged!.o!)} online against ${h.usd(st('TX').ged!.c)} at a center, Arkansas ${h.usd(st('AR').ged!.o!)} against ${h.usd(st('AR').ged!.c)}, North Carolina ${h.usd(st('NC').ged!.o!)} against ${h.usd(st('NC').ged!.c)}. The other way round, Indiana and Louisiana charge less online. ${list(g.noOnline, 'en')} list no online GED. Online testing also comes with conditions, including a recent green GED Ready score for each subject, covered on the ${h.a('ged-online', 'online GED page')}.</p>
<h2>What a retake adds</h2>
<p>At a test center, a subject you fail at full price opens a discounted retake, to be used within ${h.n(G.retakeWindowDays)} days. GED Testing Service waives its own share and you pay what is left, which is ${h.usd(10)} in ${h.n(S.rc10)} states, nothing in some, and up to ${h.usd(st('GA').ged!.rc!)} in Georgia and South Dakota. After a discounted retake the next attempt is full price again, then the cycle repeats. Online, every retake is full price. The ${h.a('ged-retake', 'retake page')} works through the cycle with real figures.</p>
<h2>A few states with their own rules</h2>
<p>New York pays for every subject and charges nothing, but asks testers to be at least 19, residents for 30 days, and to wait 60 days before any retake. West Virginia charges nothing either, but the test is scheduled through a local adult learning program. Mississippi pays all attempts at its own test centers, retakes included, but not online. Wisconsin raised its price to ${h.usd(st('WI').ged!.c)} a subject from July 1, 2026. Each state page linked under the calculator gives the rules in force where you test.</p>
<h2>Budgeting the whole path</h2>
<p>The test fee is rarely the only cost. A person who studies alone may buy the official GED Ready practice test, ${h.usd(G.readyPerSubject)} a subject or ${h.usd(G.readyBundle)} for all four, and some states ask for it before an online test or a retake. Free adult education classes cover the study itself in most counties. Count the trip to the test center and the time off work for each of the four sessions, from ${h.n(G.minutes.social)} minutes for social studies to ${h.n(G.minutes.rla)} for language arts. Spreading the subjects over a few months spreads the cost too, since each subject is paid only when it is booked.</p>
<h2>How we read these prices</h2>
<p>Each figure was copied from the state page of ged.com on the date shown at the bottom of this page. When a page publishes a total that does not match its price per subject, we use the price per subject and say so. Where a state leaves the amount to the test center, the calculator says that the fee is not published instead of guessing. The ${h.a('method', 'method page')} lists the rules applied.</p>`,
  },
  es: {
    slug: 'costo-examen-ged',
    nav: 'Costo del examen GED', card: 'Precio por materia, todos los estados, tarifas y descuentos',
    title: 'Costo del examen GED 2026: precio por materia en cada estado',
    description: 'Costo del examen GED en 2026: precio por materia en las 49 jurisdicciones que lo ofrecen, en línea y en un centro, tarifas estatales, códigos y el total.',
    h1: '¿Cuánto cuesta el GED? El precio por materia en cada estado',
    intro: `Cuatro materias, cada una se paga por separado. ${usd(36, 'es')} por materia es el precio más común; su estado puede cobrar más, menos o nada.`,
    resume: `El GED se paga materia por materia, y cada estado fija el precio. ${g.price36} de las ${g.n} jurisdicciones que ofrecen el examen cobran ${usd(36, 'es')} por materia en un centro, así que el examen completo cuesta allí ${usd0(144, 'es')}. Los lugares de pago más baratos son Connecticut, que no cobra nada por materia pero sí una inscripción de ${usd(ct.once!, 'es')}, Washington D. C., donde un código público baja el primer intento a ${usd(st('DC').ged!.first!, 'es')} por materia, y Arkansas, con ${usd(st('AR').ged!.c, 'es')} por materia. El más caro es Dakota del Sur, con ${usd(sd.c, 'es')} por materia, ${usd0(tot('SD'), 'es')} en total, por delante de Georgia con ${usd0(tot('GA'), 'es')}. Misuri añade una tarifa anual de ${usd(mo.once!, 'es')}. ${g.free.length} jurisdicciones pagan el primer intento a todos los que cumplen sus reglas. En muchos estados el precio en línea no es el mismo que en un centro, y el descuento al repetir solo existe en un centro. Todos los precios se leyeron en la página de cada estado en ged.com; la calculadora los suma para su estado y las materias que le faltan.`,
    faqs: [
      { q: '¿Tengo que pagar las cuatro materias del GED a la vez?', a: 'No. Cada materia se reserva y se paga por separado, al programarla en ged.com. Muchas personas toman una materia a la vez, con unas semanas de diferencia, y pagan a medida que avanzan. El total de la calculadora supone todas las materias que le faltan; indique las ya aprobadas para ver solo lo que queda por pagar.' },
      { q: '¿Por qué el GED no cuesta lo mismo en todos los estados?', a: 'GED Testing Service vende el examen, pero cada estado añade o cubre su parte: una tarifa estatal, una tarifa del centro o un subsidio al primer intento. Por eso la misma materia cuesta unos pocos dólares en Arkansas y cincuenta en Dakota del Sur. La página del estado en ged.com da el precio que se aplica donde usted se examina.' },
      { q: '¿Puedo pagar el GED en efectivo?', a: 'El examen se paga en línea con tarjeta al programarlo. Para quien no tiene tarjeta, ged.com menciona una tarjeta prepagada que se recarga con efectivo en tiendas. Algunos programas de educación para adultos y bonos estatales pagan la tarifa directamente, y entonces no hay nada que pagar.' },
      { q: '¿Hay cargos ocultos además del precio del GED?', a: `En unos pocos estados, sí. Misuri cobra ${usd(mo.once!, 'es')} al año además del precio por materia, Connecticut una inscripción de ${usd(ct.once!, 'es')}, y en Montana y Wyoming el centro puede añadir su propia tarifa, que la página del estado no publica. La calculadora las muestra cuando corresponden.` },
    ],
    body: (h) => `
<h2>Precio por materia, agrupado</h2>
<p>La tabla agrupa las ${h.n(g.n)} jurisdicciones que ofrecen el GED según su precio por materia en un centro, antes de cualquier descuento. Dos estados, Iowa y Maine, no ofrecen el GED; usan el ${h.a('hiset', 'HiSET')}.</p>
${h.table(['Precio por materia', 'Examen completo (4 materias)', 'Dónde'], prices.map(([p, codes]) => [h.usd(p), h.usd0(p * 4), list(codes, 'es')]), 'Precio del GED por materia en un centro, según la página de cada estado en ged.com. No incluye tarifas únicas ni descuentos.', ['r', 'r', 'l'])}
<p>El precio de lista no siempre es lo que se paga. ${list(g.subsidized.filter((c) => !g.cond.includes(c)), 'es')} rebajan el primer intento para todos o con un código público, y ${list(g.cond, 'es')} pagan a quien califica a través de un programa estatal. La ${h.a('free-ged', 'página del GED gratis')} explica cada oferta y quién puede usarla.</p>
${h.mini('cost', { p: ['st', 'done'], d: { st: 'GA' }, t: 'Lo que le queda por pagar en su estado' })}
<h2>Centro de examen o en línea</h2>
<p>El GED se puede tomar en línea en ${h.n(g.online)} jurisdicciones. El precio en línea suele ser el mismo que en un centro, pero no siempre: Texas cobra ${h.usd(st('TX').ged!.o!)} en línea frente a ${h.usd(st('TX').ged!.c)} en un centro, Arkansas ${h.usd(st('AR').ged!.o!)} frente a ${h.usd(st('AR').ged!.c)}, Carolina del Norte ${h.usd(st('NC').ged!.o!)} frente a ${h.usd(st('NC').ged!.c)}. Al revés, Indiana y Luisiana cobran menos en línea. ${list(g.noOnline, 'es')} no indican GED en línea. Examinarse en línea tiene además condiciones, entre ellas un resultado verde reciente en GED Ready para cada materia, que se explican en la ${h.a('ged-online', 'página del GED en línea')}.</p>
<h2>Lo que suma repetir</h2>
<p>En un centro, una materia reprobada a precio completo da derecho a una repetición con descuento, a usar en ${h.n(G.retakeWindowDays)} días. GED Testing Service no cobra su parte y usted paga lo que queda: ${h.usd(10)} en ${h.n(S.rc10)} estados, nada en algunos y hasta ${h.usd(st('GA').ged!.rc!)} en Georgia y Dakota del Sur. Después de una repetición con descuento el siguiente intento vuelve al precio completo, y el ciclo se repite. En línea, cada repetición se paga completa. La ${h.a('ged-retake', 'página para repetir')} recorre el ciclo con cifras reales.</p>
<h2>Algunos estados con reglas propias</h2>
<p>Nueva York paga todas las materias y no cobra nada, pero pide tener al menos 19 años, 30 días de residencia y esperar 60 días antes de cualquier repetición. Virginia Occidental tampoco cobra, pero el examen se programa a través de un programa local de aprendizaje para adultos. Misisipi paga todos los intentos en sus propios centros, repeticiones incluidas, pero no en línea. Wisconsin subió su precio a ${h.usd(st('WI').ged!.c)} por materia desde el 1 de julio de 2026. La página de cada estado, enlazada bajo la calculadora, da las reglas vigentes donde usted se examina.</p>
<h2>Presupuestar todo el camino</h2>
<p>La tarifa del examen rara vez es el único gasto. Quien estudia por su cuenta puede comprar el examen de práctica oficial GED Ready, ${h.usd(G.readyPerSubject)} por materia o ${h.usd(G.readyBundle)} las cuatro, y algunos estados lo exigen antes de un examen en línea o de una repetición. Las clases gratuitas de educación para adultos cubren el estudio en la mayoría de los condados. Cuente el viaje al centro de examen y el tiempo libre en el trabajo para cada una de las cuatro sesiones, desde ${h.n(G.minutes.social)} minutos en estudios sociales hasta ${h.n(G.minutes.rla)} en artes del lenguaje. Repartir las materias en unos meses también reparte el gasto, porque cada materia se paga solo al reservarla.</p>
<h2>Cómo leímos estos precios</h2>
<p>Cada cifra se copió de la página del estado en ged.com en la fecha que figura al pie de esta página. Cuando una página publica un total que no coincide con su precio por materia, usamos el precio por materia y lo indicamos. Donde un estado deja el monto al centro de examen, la calculadora dice que la tarifa no está publicada en lugar de adivinar. La ${h.a('method', 'página de método')} reúne las reglas aplicadas.</p>`,
  },
});
