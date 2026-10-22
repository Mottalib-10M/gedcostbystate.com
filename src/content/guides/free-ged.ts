import { defineGuide } from '../../lib/page-types';
import { STATES, byName } from '../../lib/data';
import { S } from '../../lib/stats';
import { list, st, usd, usd0 } from './_u';

/* Toutes les aides publiées, GED et HiSET, avec leur nature : pour tous, code public, sous condition. */
const kind = (k: string | undefined, l: 'en' | 'es') => ({ all: l === 'en' ? 'Everyone who meets the state rules' : 'Todos los que cumplen las reglas', promo: l === 'en' ? 'Public promo code' : 'Código público', cond: l === 'en' ? 'Only if you qualify' : 'Solo si califica' } as Record<string, string>)[k ?? ''] ?? (l === 'en' ? 'Paid by the state' : 'Pagado por el estado');
const helpRows = (l: 'en' | 'es') => byName(l).flatMap((s) => [
  ...(s.ged?.help ? [[s[l], 'GED', kind(s.ged.sub, l), s.ged.help[l]]] : []),
  ...(s.hiset?.help ? [[s[l], 'HiSET', kind(s.hiset.sub, l), s.hiset.help[l]]] : []),
]);
const nHelp = STATES.filter((s) => s.ged?.help || s.hiset?.help).length;
const g = S.ged;

export default defineGuide({
  id: 'free-ged', group: 'cost', order: 4,
  tool: 'cost', toolArg: { st: 'PA', test: 'ged', qualify: 'yes' },
  related: ['ged-cost', 'ged-classes', 'hiset', 'texas', 'ohio', 'new-york'],
  sources: ['ged-policies', 'ged-PA', 'ged-MS', 'ged-NY', 'ged-TX', 'ged-OH', 'ged-AK', 'hiset-MA', 'hiset-TN'],
  en: {
    slug: 'free-ged-test',
    nav: 'Free GED testing', card: 'States that pay the test, codes and vouchers',
    title: 'Free GED Test 2026: States That Pay, Codes and Vouchers',
    description: 'Free GED test in 2026: the states that pay the first attempt for everyone, the public promo codes, the vouchers you must qualify for, and the free HiSET states.',
    h1: 'Free GED test: which states pay, and on what conditions',
    intro: `${g.free.length} jurisdictions pay the first GED attempt for everyone who meets their rules; ${nHelp} publish some kind of help on the GED or the HiSET.`,
    resume: `The GED is free on a first attempt in ${list(g.free, 'en')}, for everyone who meets those states’ age and residency rules: Alaska pays while funding lasts, Mississippi pays every attempt at its own test centers, New York pays for every subject, Pennsylvania covers residents with the code PAFreeGED, and West Virginia charges nothing but books the test through adult learning programs. Close to free are Connecticut, with a ${usd(st('CT').ged!.once!, 'en')} registration fee and no subject fee, and Washington, D.C., where the code DCSAVE36 brings a center attempt to ${usd(st('DC').ged!.first!, 'en')}. Illinois, Maryland and Minnesota lower the first attempt with public codes. ${list(g.cond, 'en')} pay for people who qualify, usually through an adult education program: Texas for residents aged 21 and older through Texas Workforce Commission programs, Ohio with an ${usd(80, 'en')} voucher, New Mexico after a passing GED Ready score. On the HiSET, ${list(S.hiset.free, 'en')} pay the first attempt. Every offer below was read on the state pages of ged.com and hiset.org; programs that depend on funding can stop without notice.`,
    faqs: [
      { q: 'Is the GED free everywhere for people on low income?', a: `No. Only a few states have an income-based waiver, such as Rhode Island for people who prove financial hardship and score Likely to Pass on GED Ready. Elsewhere help depends on the state program, not on income alone. Free adult education classes, which exist in most states, are often the route to a voucher.` },
      { q: 'Does free GED testing include retakes?', a: `Rarely. Mississippi pays retakes at its centers and Massachusetts pays two HiSET retakes per subject, but most offers cover only the first attempt of each subject. Maryland states plainly that retests are not subsidized. Once the free attempt is used, the usual discounted retake applies at a center.` },
      { q: 'Do I need to be a resident to test for free?', a: 'Almost always. Pennsylvania limits its offer to residents, New York asks for 30 days of residency, Texas and Ohio require residents. Alaska and Mississippi set their own testing rules. The state page linked under the calculator gives the exact condition for each offer.' },
      { q: 'What happens when a state runs out of funding?', a: 'Offers marked “while funding lasts”, such as Alaska’s free first attempt and the Illinois and Minnesota codes, can end before the year is out. The price then returns to the state’s list price. Book soon after checking the state page if you plan to rely on one of these offers.' },
    ],
    body: (h) => `
<h2>Every published offer</h2>
<p>The table lists each offer as the state page describes it, for the GED and for the HiSET. “Everyone” means anyone who meets the state’s age and residency rules; “promo code” means a public code to enter at checkout; “only if you qualify” means a program with its own conditions, usually enrolment in adult education.</p>
${h.table(['State', 'Test', 'Who can use it', 'What the state page says'], helpRows('en'), 'Discounts, free attempts and vouchers, from the state pages of ged.com and hiset.org.', ['l', 'l', 'l', 'l'])}
${h.mini('cost', { p: ['st', 'qualify'], d: { st: 'TX', qualify: 'yes', age: 30 }, t: 'Your cost with the state program' })}
<h2>Fully free</h2>
<p>New York is the clearest case: the state pays for every GED subject, retakes included, but sets the age at 19 and makes you wait 60 days before a retake. West Virginia also charges nothing, but you schedule through a local adult learning or Option Pathway program, after a GED Ready practice test there. Mississippi pays every attempt at a Mississippi test center with two codes, one for the first attempt and one for retakes; online testing there is not covered. Pennsylvania covers the first attempt of all four subjects for residents, at a public center or online, including the proctoring fee.</p>
<h2>Cheap with a code</h2>
<p>Washington, D.C. charges ${h.usd(st('DC').ged!.first!)} for the first attempt of each subject at a center with its code; Maryland ${h.usd(st('MD').ged!.first!)} with the code MDGED2175, at a center or online; Illinois ${h.usd(st('IL').ged!.first!)} with ILSAVE2026; Minnesota ${h.usd(st('MN').ged!.first!)} with MNGED10. These codes are printed on the state pages, so there is nothing to apply for: you type the code when you pay. The Illinois and Minnesota offers run while funding lasts.</p>
<h2>Free if you qualify</h2>
<p>Texas pays the fees of residents aged 21 and older who go through a Texas Workforce Commission Adult Education and Literacy program. Ohio gives first-time testers a voucher worth up to ${h.usd(80)} through a Career-Technical Planning District, which leaves ${h.usd0(144 - 80)} to pay on the four subjects at a center. New Mexico covers residents who score 145 or more on GED Ready within 60 days of scheduling. Tennessee pays through vouchers for people attending a local adult education program, on both tests. Rhode Island waives fees for people with limited income who score Likely to Pass on GED Ready. The ${h.a('ged-classes', 'classes page')} explains how to reach these programs.</p>
<h2>HiSET states</h2>
<p>Maine charges its residents nothing for the HiSET. Massachusetts pays the first test in each subject and two retakes. Mississippi has paid the HiSET and two retests per subtest since July 1, 2026. Pennsylvania covers up to five subtests for residents with PAFreeHiSET. Minnesota residents get ${h.usd(8)} off each subtest the first time. The ${h.a('hiset', 'HiSET page')} has the full table of HiSET prices.</p>
<h2>Free classes are not the same as a free test</h2>
<p>Many people searching for a free GED are looking for the classes, not the exam. Adult education programs teach the four subjects at no charge in most states, and several of the voucher programs above run through them, so enrolling in a class is often the way to a paid test as well. The reverse is not true: a free class does not pay the test unless the state program says so. Ask the program which test fees it covers before you book, and keep the voucher code it gives you for the payment page.</p>
<h2>Before you count on an offer</h2>
<p>Read the terms on the state page linked under the calculator: some offers apply only at public test centers, some only to a first attempt, some only while funds last, and nearly all only to residents. If you are not sure you qualify for a program, the calculator shows both totals: leave “I qualify” on No for the price you would pay without help.</p>`,
  },
  es: {
    slug: 'examen-ged-gratis',
    nav: 'Examen GED gratis', card: 'Estados que pagan el examen, códigos y bonos',
    title: 'Examen GED gratis 2026: estados que pagan, códigos y bonos',
    description: 'Examen GED gratis en 2026: estados que pagan el primer intento a todos, códigos promocionales públicos, bonos para quien califica y estados del HiSET gratis.',
    h1: 'Examen GED gratis: qué estados pagan y con qué condiciones',
    intro: `${g.free.length} jurisdicciones pagan el primer intento del GED a todos los que cumplen sus reglas; ${nHelp} publican algún tipo de ayuda para el GED o el HiSET.`,
    resume: `El GED es gratis en el primer intento en ${list(g.free, 'es')}, para todos los que cumplen las reglas de edad y residencia de esos estados: Alaska paga mientras haya fondos, Misisipi paga todos los intentos en sus propios centros, Nueva York paga todas las materias, Pensilvania cubre a sus residentes con el código PAFreeGED y Virginia Occidental no cobra nada pero programa el examen a través de los programas de aprendizaje para adultos. Casi gratis son Connecticut, con una inscripción de ${usd(st('CT').ged!.once!, 'es')} y sin tarifa por materia, y Washington D. C., donde el código DCSAVE36 deja un intento en un centro en ${usd(st('DC').ged!.first!, 'es')}. Illinois, Maryland y Minnesota rebajan el primer intento con códigos públicos. ${list(g.cond, 'es')} pagan a quien califica, normalmente a través de un programa de educación para adultos: Texas a residentes de 21 años o más mediante los programas de la Texas Workforce Commission, Ohio con un bono de ${usd(80, 'es')}, Nuevo México tras un resultado aprobatorio en GED Ready. En el HiSET, ${list(S.hiset.free, 'es')} pagan el primer intento. Cada oferta se leyó en las páginas estatales de ged.com y hiset.org; los programas que dependen de fondos pueden terminar sin aviso.`,
    faqs: [
      { q: '¿Es gratis el GED en todas partes para quien tiene pocos ingresos?', a: 'No. Solo unos pocos estados tienen una exención por ingresos, como Rhode Island para quien prueba dificultad económica y saca Likely to Pass en GED Ready. En los demás la ayuda depende del programa estatal, no solo de los ingresos. Las clases gratuitas de educación para adultos, que existen en la mayoría de los estados, suelen ser el camino hacia un bono.' },
      { q: '¿El GED gratis incluye las repeticiones?', a: 'Rara vez. Misisipi paga las repeticiones en sus centros y Massachusetts paga dos repeticiones del HiSET por materia, pero la mayoría de las ofertas solo cubren el primer intento de cada materia. Maryland indica claramente que las repeticiones no se subsidian. Usado el intento gratis, se aplica la repetición con descuento habitual en un centro.' },
      { q: '¿Tengo que ser residente para examinarme gratis?', a: 'Casi siempre. Pensilvania limita su oferta a residentes, Nueva York pide 30 días de residencia, Texas y Ohio exigen ser residente. Alaska y Misisipi fijan sus propias reglas de examen. La página estatal enlazada bajo la calculadora da la condición exacta de cada oferta.' },
      { q: '¿Qué pasa cuando un estado se queda sin fondos?', a: 'Las ofertas marcadas «mientras haya fondos», como el primer intento gratis de Alaska y los códigos de Illinois y Minnesota, pueden terminar antes de fin de año. El precio vuelve entonces al precio de lista del estado. Reserve pronto después de revisar la página del estado si piensa contar con una de estas ofertas.' },
    ],
    body: (h) => `
<h2>Todas las ofertas publicadas</h2>
<p>La tabla recoge cada oferta tal como la describe la página del estado, para el GED y para el HiSET. «Todos» significa cualquiera que cumpla las reglas de edad y residencia del estado; «código público» es un código que se escribe al pagar; «solo si califica» es un programa con condiciones propias, casi siempre la inscripción en la educación para adultos.</p>
${h.table(['Estado', 'Examen', 'Quién puede usarla', 'Lo que dice la página del estado'], helpRows('es'), 'Descuentos, intentos gratis y bonos, según las páginas estatales de ged.com y hiset.org.', ['l', 'l', 'l', 'l'])}
${h.mini('cost', { p: ['st', 'qualify'], d: { st: 'TX', qualify: 'yes', age: 30 }, t: 'Su costo con el programa del estado' })}
<h2>Totalmente gratis</h2>
<p>Nueva York es el caso más claro: el estado paga todas las materias del GED, repeticiones incluidas, pero fija la edad en 19 años y exige esperar 60 días antes de repetir. Virginia Occidental tampoco cobra, pero el examen se programa a través de un programa local de aprendizaje para adultos u Option Pathway, después de un examen de práctica GED Ready allí. Misisipi paga todos los intentos en un centro de Misisipi con dos códigos, uno para el primer intento y otro para las repeticiones; el examen en línea no está cubierto. Pensilvania cubre el primer intento de las cuatro materias a sus residentes, en un centro público o en línea, tarifa de supervisión incluida.</p>
<h2>Barato con un código</h2>
<p>Washington D. C. cobra ${h.usd(st('DC').ged!.first!)} por el primer intento de cada materia en un centro con su código; Maryland ${h.usd(st('MD').ged!.first!)} con el código MDGED2175, en un centro o en línea; Illinois ${h.usd(st('IL').ged!.first!)} con ILSAVE2026; Minnesota ${h.usd(st('MN').ged!.first!)} con MNGED10. Estos códigos están impresos en las páginas de los estados, así que no hay nada que solicitar: se escribe el código al pagar. Las ofertas de Illinois y Minnesota duran mientras haya fondos.</p>
<h2>Gratis si califica</h2>
<p>Texas paga las tarifas de los residentes de 21 años o más que pasan por un programa de Educación y Alfabetización de Adultos de la Texas Workforce Commission. Ohio da a quien se examina por primera vez un bono de hasta ${h.usd(80)} a través de un Career-Technical Planning District, lo que deja ${h.usd0(144 - 80)} por pagar en las cuatro materias en un centro. Nuevo México cubre a sus residentes que sacan 145 o más en GED Ready dentro de los 60 días previos a programar. Tennessee paga con bonos a quien asiste a un programa local de educación para adultos, en ambos exámenes. Rhode Island exime a las personas con ingresos limitados que sacan Likely to Pass en GED Ready. La ${h.a('ged-classes', 'página de clases')} explica cómo llegar a estos programas.</p>
<h2>Estados del HiSET</h2>
<p>Maine no cobra nada a sus residentes por el HiSET. Massachusetts paga el primer examen de cada materia y dos repeticiones. Misisipi paga el HiSET y dos repeticiones por prueba desde el 1 de julio de 2026. Pensilvania cubre hasta cinco pruebas a sus residentes con PAFreeHiSET. Los residentes de Minnesota obtienen ${h.usd(8)} de descuento en cada prueba la primera vez. La ${h.a('hiset', 'página del HiSET')} tiene la tabla completa de precios del HiSET.</p>
<h2>Antes de contar con una oferta</h2>
<p>Lea las condiciones en la página estatal enlazada bajo la calculadora: algunas ofertas solo valen en centros públicos, otras solo para el primer intento, otras solo mientras haya fondos, y casi todas solo para residentes. Si no está seguro de calificar para un programa, la calculadora muestra ambos totales: deje «Califico» en No para ver el precio que pagaría sin ayuda.</p>`,
  },
});
