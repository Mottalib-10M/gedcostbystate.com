import { defineGuide } from '../../lib/page-types';
import { GENERAL, byName } from '../../lib/data';
import { S, full } from '../../lib/stats';
import { list, st, usd, usd0, tot } from './_u';

const G = GENERAL.ged, H = GENERAL.hiset;
const both = (l: 'en' | 'es') => byName(l).filter((s) => s.ged && s.hiset).map((s) => {
  const g = full(s.code, 'ged'), h = full(s.code, 'hiset');
  const gt = g.available ? usd0(g.total, l) : '', ht = h.available ? usd0(h.total, l) : (l === 'en' ? 'set by center' : 'lo fija el centro');
  const d = g.available && h.available ? g.total - h.total : null;
  const w = d == null ? '' : Math.abs(d) < 1 ? (l === 'en' ? 'same' : 'igual') : d > 0 ? `HiSET, ${usd0(d, l)}` : `GED, ${usd0(-d, l)}`;
  return [s[l], gt, ht, w];
});
const gaps = S.both.map((c) => ({ c, d: full(c, 'ged').available && full(c, 'hiset').available ? full(c, 'ged').total - full(c, 'hiset').total : 0 })).sort((a, b) => b.d - a.d);
const big = gaps[0];
import { gedCost, hisetCost } from '../../lib/engine/hse';
/* Exemple chiffré : Tennessee, un échec en maths prévu. */
const tnG = gedCost('TN', { mode: 'center', parts: 4, retakes: 1, qualify: false });
const tnH = hisetCost('TN', { mode: 'center', parts: 5, retakes: 1, qualify: false });
const tnH2 = hisetCost('TN', { mode: 'center', parts: 5, retakes: 2, qualify: false });
const tnG2 = gedCost('TN', { mode: 'center', parts: 4, retakes: 2, qualify: false });

export default defineGuide({
  id: 'ged-vs-hiset', group: 'cost', order: 3,
  tool: 'compare', toolArg: { st: 'NC' },
  related: ['hiset', 'ged-cost', 'ged-passing-score', 'hiset-scores', 'ged-test', 'ged-retake'],
  sources: ['ged-policies', 'hiset-states', 'ged-subjects', 'hiset-about', 'ged-scores', 'hiset-scores'],
  en: {
    slug: 'ged-vs-hiset',
    nav: 'GED or HiSET', card: 'Which one costs less in your state, and how they differ',
    title: 'GED vs HiSET 2026: Cost, Format and Passing Rules Compared',
    description: 'GED vs HiSET in 2026: in the 22 states that offer both, which costs less, how many parts each has, the passing rules, retakes, times and online testing.',
    h1: 'GED or HiSET: which costs less in your state',
    intro: `${S.both.length} states let you choose. In ${S.cheaperHiset.length} of them the HiSET costs less on a first pass; the format and passing rules differ too.`,
    resume: `Both tests lead to the same state high school equivalency credential, so where a state offers both the choice comes down to cost, format and how you test best. ${S.both.length} states offer the GED and the HiSET in 2026. On a first pass at a test center the HiSET costs less in ${S.cheaperHiset.length} of them, the GED in ${list(S.cheaperGed, 'en')}, and in the others the two cost the same because the state pays for both. The largest gap is in ${st(big.c).en}, where the GED costs ${usd0(big.d, 'en')} more because the state pays for the HiSET. The GED has four subjects and passes with ${G.pass} on each, scored ${G.min} to ${G.max}. The HiSET has five subtests and passes with ${H.passEach} of ${H.outOf} on each, ${H.passTotal} of ${H.totalMax} in total and ${H.essayMin} of ${H.essayMax} on the essay. Retakes favour the HiSET: its second and third attempts cost only the center fee, while a GED retake is discounted only once per full-price attempt and only at a center. The GED can be taken online in more states. The comparison tool puts both side by side for your state.`,
    faqs: [
      { q: 'Is a HiSET credential worth the same as a GED?', a: 'Both lead to the high school equivalency credential issued by your state, so employers and colleges in that state see the same credential. What differs is the test you sit to earn it. If you might move, check how the receiving state or college treats the credential; the test name rarely matters once the state has issued it.' },
      { q: 'Can I switch from the GED to the HiSET halfway?', a: 'Parts passed on one test do not count on the other: GED subjects and HiSET subtests are scored separately and each program issues its own score report. Switching means starting the other test from the beginning, so it is worth deciding before you pay for the first part.' },
      { q: 'Which test has more online options?', a: `The GED can be taken online in ${S.ged.online} jurisdictions, with a green GED Ready score in each subject first. The HiSET at home is listed in most HiSET states at around ${usd(41, 'en')} a subtest, but not in ${list(S.hiset.noHome, 'en')}.` },
      { q: 'Why does the GED cost less than the HiSET in some states?', a: 'Because the state pays part of the GED and not the HiSET, or adds a one-time fee to the HiSET. Illinois takes a public discount off each GED subject, California adds a one-time state fee to the HiSET, and Montana prices both differently. The calculator includes these when it compares.' },
    ],
    body: (h) => `
<h2>The 22 states that offer both</h2>
<p>The table gives the whole test on a first pass at a test center, with discounts open to everyone, and which one costs less. Programs you must qualify for are left out because they depend on your situation; the comparison tool shows them when you tick that you qualify.</p>
${h.table(['State', 'GED, 4 subjects', 'HiSET, 5 subtests', 'Cheaper'], both('en'), 'GED and HiSET at a test center, first pass, fees read on ged.com and hiset.org.', ['l', 'r', 'r', 'l'])}
<p>In North Carolina the GED costs ${h.usd0(tot('NC'))} and the HiSET ${h.usd0(tot('NC', 'hiset'))}; in Georgia ${h.usd0(tot('GA'))} against ${h.usd0(tot('GA', 'hiset'))}. In California the GED costs ${h.usd0(tot('CA'))} and the HiSET ${h.usd0(tot('CA', 'hiset'))} with its one-time state fee. In Pennsylvania, Mississippi and Massachusetts the state pays the first attempt of the HiSET, and in Pennsylvania and Mississippi of the GED too.</p>
${h.mini('compare', { p: ['st'], d: { st: 'GA' }, t: 'GED or HiSET where you live' })}
<h2>Format</h2>
${h.table(['', 'GED', 'HiSET'], [
  ['Parts', '4 subjects', '5 subtests'],
  ['Math', `${h.n(G.minutes.math)} min`, `${h.n(H.minutes.math)} min`],
  ['Language', `${h.n(G.minutes.rla)} min, reading and writing together, with an essay`, `Reading ${h.n(H.minutes.reading)} min, writing ${h.n(H.minutes.writing)} min with an essay`],
  ['Science', `${h.n(G.minutes.science)} min`, `${h.n(H.minutes.science)} min`],
  ['Social studies', `${h.n(G.minutes.social)} min`, `${h.n(H.minutes.social)} min`],
  ['Formats', 'Computer at a center, online', 'Paper or computer at a center, at home where allowed'],
], 'Times from ged.com and hiset.org.', ['l', 'l', 'l'])}
<p>The GED is given on computer only and mixes question types: multiple choice, drag and drop, fill in the blank, select an area and drop-down menus. The HiSET is mostly multiple choice and can still be taken on paper in many states, which some people find easier to manage. Both exist in English and Spanish.</p>
<h2>Passing rules</h2>
<p>On the GED each subject stands alone: ${h.n(G.pass)} in each of the four, and a high score in one cannot make up for a low score in another. The HiSET combines two rules: at least ${h.n(H.passEach)} of ${h.n(H.outOf)} in every subtest and a total of ${h.n(H.passTotal)} of ${h.n(H.totalMax)}, so five scores of ${h.n(H.passEach)} would fail on the total. The essay needs ${h.n(H.essayMin)} of ${h.n(H.essayMax)}. The ${h.a('ged-passing-score', 'GED score page')} and the ${h.a('hiset-scores', 'HiSET score page')} check your numbers.</p>
<h2>Retakes</h2>
<p>A failed GED subject at a center opens one discounted retake, then the next attempt is full price. On the HiSET the second and third attempts of a subtest cost only the center fee, and only the fourth is full price again. For someone who expects to retake a part or two, the HiSET often costs less in the end even where its first pass costs the same or slightly more. The ${h.a('ged-retake', 'retake page')} computes both cycles. Waiting periods differ as well: most GED states let you retake a subject twice with no wait and then impose 60 days, while HiSET waiting rules are set state by state, so check your state page before you plan a quick second attempt.</p>
<h2>A worked example: Tennessee</h2>
<p>Take someone in Tennessee who pays the fees alone and expects to fail one part once. The GED costs ${h.usd(36)} a subject, so four subjects come to ${h.usd0(tnG.first)}; the discounted retake of the failed subject adds ${h.usd0(tnG.retake)}, for ${h.usd0(tnG.total)}. The HiSET costs ${h.usd(23)} a subtest at a center, five subtests come to ${h.usd0(tnH.first)}, and the second attempt of the failed one costs only the center fee, ${h.usd0(tnH.retake)}, for ${h.usd0(tnH.total)}. With two failed parts the gap stays: ${h.usd0(tnG2.total)} for the GED against ${h.usd0(tnH2.total)} for the HiSET. In Tennessee both tests can also be paid by vouchers through local adult education, which would bring either total to nothing. The comparison tool and the cost calculator redo this for any state and any number of retakes.</p>
<h2>How to choose</h2>
<p>Start from what your state offers and what it pays. Then look at the format: paper testing, five shorter sessions and cheaper retakes favour the HiSET; wide online availability and a single score per subject favour the GED. Try our practice questions in both formats, ${h.a('ged-practice-test', 'GED')} and ${h.a('hiset-practice-test', 'HiSET')}, before you book.</p>`,
  },
  es: {
    slug: 'ged-o-hiset',
    nav: 'GED o HiSET', card: 'Cuál cuesta menos en su estado y en qué se diferencian',
    title: 'GED o HiSET 2026: costo, formato y reglas para aprobar',
    description: 'GED o HiSET en 2026: en los 22 estados que ofrecen ambos, cuál cuesta menos, cuántas partes tiene, reglas para aprobar, repeticiones y examen en línea.',
    h1: 'GED o HiSET: cuál cuesta menos en su estado',
    intro: `${S.both.length} estados le dejan elegir. En ${S.cheaperHiset.length} de ellos el HiSET cuesta menos en el primer paso; el formato y las reglas también cambian.`,
    resume: `Ambos exámenes llevan a la misma credencial estatal de equivalencia de la secundaria, así que donde un estado ofrece los dos la elección depende del costo, del formato y de cómo se examina usted mejor. ${S.both.length} estados ofrecen el GED y el HiSET en 2026. En un primer paso en un centro el HiSET cuesta menos en ${S.cheaperHiset.length} de ellos, el GED en ${list(S.cheaperGed, 'es')}, y en los demás cuestan lo mismo porque el estado paga ambos. La mayor diferencia está en ${st(big.c).es}, donde el GED cuesta ${usd0(big.d, 'es')} más porque el estado paga el HiSET. El GED tiene cuatro materias y se aprueba con ${G.pass} en cada una, en una escala de ${G.min} a ${G.max}. El HiSET tiene cinco pruebas y se aprueba con ${H.passEach} de ${H.outOf} en cada una, ${H.passTotal} de ${H.totalMax} en total y ${H.essayMin} de ${H.essayMax} en el ensayo. Repetir favorece al HiSET: su segundo y tercer intento cuestan solo la tarifa del centro, mientras que una repetición del GED solo tiene descuento una vez por cada intento a precio completo y solo en un centro. El GED se puede tomar en línea en más estados. La herramienta de comparación los pone lado a lado para su estado.`,
    faqs: [
      { q: '¿Vale lo mismo una credencial del HiSET que una del GED?', a: 'Ambos llevan a la credencial de equivalencia que emite su estado, así que los empleadores y las universidades de ese estado ven la misma credencial. Lo que cambia es el examen que se toma para obtenerla. Si piensa mudarse, consulte cómo trata la credencial el estado o la universidad de destino; el nombre del examen rara vez importa una vez emitida.' },
      { q: '¿Puedo pasar del GED al HiSET a mitad de camino?', a: 'Las partes aprobadas en un examen no cuentan en el otro: las materias del GED y las pruebas del HiSET se califican por separado y cada programa emite su propio informe. Cambiar significa empezar el otro examen desde el principio, así que conviene decidir antes de pagar la primera parte.' },
      { q: '¿Qué examen tiene más opciones en línea?', a: `El GED se puede tomar en línea en ${S.ged.online} jurisdicciones, con un resultado verde en GED Ready en cada materia antes. El HiSET en casa aparece en la mayoría de los estados del HiSET por unos ${usd(41, 'es')} la prueba, pero no en ${list(S.hiset.noHome, 'es')}.` },
      { q: '¿Por qué el GED cuesta menos que el HiSET en algunos estados?', a: 'Porque el estado paga parte del GED y no del HiSET, o añade una tarifa única al HiSET. Illinois descuenta una cantidad pública de cada materia del GED, California añade una tarifa estatal única al HiSET y Montana fija precios distintos para cada uno. La calculadora los incluye al comparar.' },
    ],
    body: (h) => `
<h2>Los 22 estados que ofrecen ambos</h2>
<p>La tabla da el examen completo en un primer paso en un centro, con los descuentos abiertos a todos, y cuál cuesta menos. Se dejan fuera los programas para los que hay que calificar, porque dependen de su situación; la herramienta de comparación los muestra si marca que califica.</p>
${h.table(['Estado', 'GED, 4 materias', 'HiSET, 5 pruebas', 'Más barato'], both('es'), 'GED y HiSET en un centro, primer paso, tarifas leídas en ged.com y hiset.org.', ['l', 'r', 'r', 'l'])}
<p>En Carolina del Norte el GED cuesta ${h.usd0(tot('NC'))} y el HiSET ${h.usd0(tot('NC', 'hiset'))}; en Georgia ${h.usd0(tot('GA'))} frente a ${h.usd0(tot('GA', 'hiset'))}. En California el GED cuesta ${h.usd0(tot('CA'))} y el HiSET ${h.usd0(tot('CA', 'hiset'))} con su tarifa estatal única. En Pensilvania, Misisipi y Massachusetts el estado paga el primer intento del HiSET, y en Pensilvania y Misisipi también el del GED.</p>
${h.mini('compare', { p: ['st'], d: { st: 'GA' }, t: 'GED o HiSET donde usted vive' })}
<h2>Formato</h2>
${h.table(['', 'GED', 'HiSET'], [
  ['Partes', '4 materias', '5 pruebas'],
  ['Matemáticas', `${h.n(G.minutes.math)} min`, `${h.n(H.minutes.math)} min`],
  ['Lenguaje', `${h.n(G.minutes.rla)} min, lectura y escritura juntas, con ensayo`, `Lectura ${h.n(H.minutes.reading)} min, escritura ${h.n(H.minutes.writing)} min con ensayo`],
  ['Ciencias', `${h.n(G.minutes.science)} min`, `${h.n(H.minutes.science)} min`],
  ['Estudios sociales', `${h.n(G.minutes.social)} min`, `${h.n(H.minutes.social)} min`],
  ['Formatos', 'Computadora en un centro, en línea', 'Papel o computadora en un centro, en casa donde se permite'],
], 'Tiempos de ged.com y hiset.org.', ['l', 'l', 'l'])}
<p>El GED solo se da en computadora y mezcla tipos de preguntas: opción múltiple, arrastrar y soltar, completar, seleccionar un área y menús desplegables. El HiSET es sobre todo de opción múltiple y todavía se puede tomar en papel en muchos estados, algo que a algunas personas les resulta más cómodo. Ambos existen en inglés y en español.</p>
<h2>Reglas para aprobar</h2>
<p>En el GED cada materia va por su cuenta: ${h.n(G.pass)} en cada una de las cuatro, y un puntaje alto en una no compensa uno bajo en otra. El HiSET combina dos reglas: al menos ${h.n(H.passEach)} de ${h.n(H.outOf)} en cada prueba y un total de ${h.n(H.passTotal)} de ${h.n(H.totalMax)}, así que cinco puntajes de ${h.n(H.passEach)} no alcanzan el total. El ensayo necesita ${h.n(H.essayMin)} de ${h.n(H.essayMax)}. La ${h.a('ged-passing-score', 'página de puntajes del GED')} y la ${h.a('hiset-scores', 'página de puntajes del HiSET')} revisan sus cifras.</p>
<h2>Repeticiones</h2>
<p>Una materia del GED reprobada en un centro da una repetición con descuento, y el intento siguiente vuelve al precio completo. En el HiSET el segundo y el tercer intento de una prueba cuestan solo la tarifa del centro, y solo el cuarto vuelve al precio completo. Para quien espera repetir una o dos partes, el HiSET suele costar menos al final, incluso donde su primer paso cuesta lo mismo o un poco más. La ${h.a('ged-retake', 'página para repetir')} calcula ambos ciclos.</p>
<h2>Un ejemplo con cifras: Tennessee</h2>
<p>Tome a alguien en Tennessee que paga las tarifas por su cuenta y espera reprobar una parte una vez. El GED cuesta ${h.usd(36)} por materia, así que las cuatro materias suman ${h.usd0(tnG.first)}; la repetición con descuento de la materia reprobada añade ${h.usd0(tnG.retake)}, para un total de ${h.usd0(tnG.total)}. El HiSET cuesta ${h.usd(23)} por prueba en un centro, las cinco pruebas suman ${h.usd0(tnH.first)}, y el segundo intento de la reprobada cuesta solo la tarifa del centro, ${h.usd0(tnH.retake)}, para un total de ${h.usd0(tnH.total)}. Con dos partes reprobadas la diferencia se mantiene: ${h.usd0(tnG2.total)} para el GED frente a ${h.usd0(tnH2.total)} para el HiSET. En Tennessee ambos exámenes también pueden pagarse con bonos a través de la educación para adultos local, lo que dejaría cualquiera de los dos totales en nada. La herramienta de comparación y la calculadora de costo rehacen este cálculo para cualquier estado y cualquier número de repeticiones.</p>
<h2>Cómo elegir</h2>
<p>Empiece por lo que ofrece su estado y lo que paga. Luego mire el formato: el papel, cinco sesiones más cortas y repeticiones más baratas favorecen al HiSET; la amplia oferta en línea y un solo puntaje por materia favorecen al GED. Pruebe nuestras preguntas de práctica en ambos formatos, ${h.a('ged-practice-test', 'GED')} y ${h.a('hiset-practice-test', 'HiSET')}, antes de reservar.</p>`,
  },
});
