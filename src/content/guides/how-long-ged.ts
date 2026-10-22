import { defineGuide } from '../../lib/page-types';
import { GENERAL, st } from '../../lib/data';

const G = GENERAL.ged;
const totalMin = Object.values(G.minutes).reduce((a, b) => a + b, 0);
const ny = st('NY').ged!, wv = st('WV').ged!, dc = st('DC').ged!, wy = st('WY').ged!;

export default defineGuide({
  id: 'how-long-ged', group: 'prep', order: 18,
  tool: 'plan', toolArg: { st: 'FL', parts: 4, weeks: 4 },
  related: ['ged-classes', 'ged-retake', 'ged-practice-test', 'ged-ready', 'ged-test', 'ged-online'],
  sources: ['ged-classes', 'ged-subjects', 'ged-online', 'ged-NY', 'ged-WV', 'ged-DC', 'ged-WY', 'ged-CT', 'ged-FL'],
  en: {
    slug: 'how-long-does-it-take-to-get-a-ged',
    nav: 'How long the GED takes', card: 'Study weeks, test hours, waiting rules: your finish date',
    title: 'GED Timeline 2026: How Long It Takes, State by State',
    description: 'How long a GED takes in 2026: about 2 to 4 months on average, 7 hours of tests, and the waits after a failed subject in each state, turned into a finish date.',
    h1: 'How long does it take to get a GED? Your own timeline',
    intro: `ged.com puts the average at about 2 to 4 months. The tests themselves add up to ${Math.round(totalMin / 6) / 10} hours; the rest is study, and waiting if you retake.`,
    resume: `ged.com puts the average time to get a GED at about 2 to 4 months and describes two common paths: study one subject for about three weeks and then take that test, or study all four subjects for about three months and take the four tests in one day. The tests themselves add up to ${totalMin} minutes: math ${G.minutes.math}, language arts ${G.minutes.rla}, science ${G.minutes.science} and social studies ${G.minutes.social}, which you can book on different days in any order. What stretches a timeline is a failed subject. In most states you may retake a subject twice with no wait, then must wait ${G.waitAfterThird} days after the third attempt. Some states are stricter: New York and Connecticut impose ${ny.w1} days before each retake, the District of Columbia ${dc.w1} days, West Virginia ${wv.w1} days, Wyoming ${wy.w1}. Online, ged.com allows ${G.onlineRetakesBeforeWait} retake and then a ${G.waitAfterThird}-day wait. The calculator above takes your own study weeks per subject, your state and the retakes you want to allow for, and gives a finish date counted from ${'October 22, 2026'}. The study weeks are your estimate, not ours: we show how the rules change the date, not how fast you learn.`,
    faqs: [
      { q: 'How long does it take to get a GED?', a: 'ged.com says about 2 to 4 months on average, but it depends on your starting level and the hours you can study. Someone who left school in the last year or two may need a few weeks; someone returning after many years may need longer for math. The calculator turns your own estimate into a date.' },
      { q: 'Can I take all four GED tests in one day?', a: `You can book them on the same day, and ged.com describes that path for people who study all four subjects first. The four add up to ${totalMin} minutes, about ${Math.round(totalMin / 60)} hours of testing before breaks between subjects, so most people spread them over several days or weeks.` },
      { q: 'How long do I wait to retake a GED subject?', a: `In most states, no wait for the first two retakes and ${G.waitAfterThird} days after the third attempt. New York and Connecticut impose ${ny.w1} days before each retake, the District of Columbia ${dc.w1}, West Virginia ${wv.w1} and Wyoming ${wy.w1}. Online, one retake is allowed before a ${G.waitAfterThird}-day wait.` },
      { q: 'Can I get my GED in a month?', a: 'It is possible if your skills are already close to passing: four tests can be booked within a few weeks, and nothing in the rules stops you. The limit is passing each subject the first time. A practice test per subject tells you quickly whether a month is realistic.' },
    ],
    body: (h) => `
<h2>Three parts of a timeline</h2>
<p><strong>Study time</strong> is the largest and the only one you control. <strong>Testing time</strong> is fixed: ${h.n(totalMin)} minutes in all, booked on the days you choose. <strong>Waiting time</strong> comes only after a failed subject and is set by your state. A timeline that ignores the third can be off by two months: three attempts at math in a state with the usual rule add ${h.n(G.waitAfterThird)} days before the fourth.</p>
${h.mini('plan', { p: ['st', 'weeks'], d: { st: 'NY', parts: 4, weeks: 3, fails: 1 }, t: 'Your finish date with one retake' })}
<h2>The waiting rules that change the date</h2>
${h.table(['Rule', 'Where', 'Effect on a plan'], [
  ['No wait for 2 retakes, then ' + G.waitAfterThird + ' days', 'Most states', 'A failed subject can be retaken the next week'],
  [`${ny.w1} days before each retake, ${ny.cap} attempts a year`, 'New York, Connecticut', `Each failed subject adds about two months`],
  [`${dc.w1} days before retakes`, 'District of Columbia', 'A month per retake, and GED Ready first'],
  [`${wv.w1} days before retakes, ${wv.cap} attempts a year`, 'West Virginia', 'Two weeks per retake'],
  [`${wy.w1} days before retakes`, 'Wyoming', 'One week per retake'],
  [`${G.onlineRetakesBeforeWait} retake, then ${G.waitAfterThird} days`, 'Online, everywhere', 'Two failed online attempts mean a two-month pause'],
], 'Waiting periods from each state GED policy and ged.com, read in October 2026.', ['l', 'l', 'l'])}
<h2>Two worked timelines</h2>
<p><strong>Ana, Florida, no retake.</strong> She studies four weeks per subject, one after the other, and passes each the first time: 4 × 4 = 16 weeks, about four months, in line with the upper end of the ged.com average. Booking each test at the end of its study block, she pays one subject at a time instead of the whole test at once.</p>
<p><strong>Luis, New York, one retake.</strong> He studies three weeks per subject, 12 weeks in all, but fails math once. New York imposes ${h.n(ny.w1)} days before each retake, so his finish moves from about three months to about five. The same failure in Florida would cost no waiting time at a center, only the retake fee. That gap is why the state matters as much as the study plan, and why a practice test before a math booking pays off most in states with a waiting period.</p>
<h2>What does not count in the timeline</h2>
<p>The calculator does not add the time to get results, to book a seat or to receive the diploma, which vary by state and test center. Seats depend on the center and the day, so check availability on ged.com before you fix the end of a study block, and keep a spare week in the plan for a date that is already full. Diplomas and transcripts are issued by the state after the last subject is passed. If a date is critical, ask your state office how long it takes to send the credential.</p>
<h2>Choosing an order</h2>
<p>There is no required order. Starting with your strongest subject gives an early pass and shows you the test routine; starting with the hardest, often math, leaves the most time for a retake if it is needed. Social studies, at ${h.n(G.minutes.social)} minutes, is the shortest; language arts, at ${h.n(G.minutes.rla)} with its essay, is the longest and best kept for a rested day.</p>
<h2>Making the estimate honest</h2>
<p>Take one practice test per subject before you plan, so that your study weeks rest on a score rather than a feeling. Count the hours you can really study each week, not the hours you hope for. Add a retake for any subject where the practice score was below ${h.n(G.pass)}. Our ${h.a('ged-practice-test', 'free practice questions')} give a first idea, and the official ${h.a('ged-ready', 'GED Ready')} adds a likely-to-pass indicator.</p>
<h2>When the clock matters</h2>
<p>A job offer, a college term or a training program may give you a deadline. Work backwards from that date: the calculator shows how many study weeks per subject fit before it, once the waiting rules of your state are counted. If time is short, a ${h.a('ged-classes', 'class')} with a fixed schedule often keeps a plan on track better than studying alone.</p>`,
  },
  es: {
    slug: 'cuanto-tarda-el-ged',
    nav: 'Cuánto tarda el GED', card: 'Semanas de estudio, horas de examen, esperas: su fecha de fin',
    title: 'Plazos del GED 2026: cuánto se tarda, estado por estado',
    description: 'Cuánto tarda el GED en 2026: unos 2 a 4 meses de media, 7 horas de examen y las esperas tras suspender una materia en cada estado, convertidas en una fecha.',
    h1: '¿Cuánto se tarda en obtener el GED? Su propio calendario',
    intro: `ged.com sitúa la media en unos 2 a 4 meses. Los exámenes suman ${Math.round(totalMin / 6) / 10} horas; el resto es estudio, y espera si repite.`,
    resume: `ged.com sitúa el tiempo medio para obtener el GED en unos 2 a 4 meses y describe dos caminos habituales: estudiar una materia unas tres semanas y luego hacer ese examen, o estudiar las cuatro durante unos tres meses y hacer los cuatro exámenes en un día. Los exámenes suman ${totalMin} minutos: matemáticas ${G.minutes.math}, lenguaje ${G.minutes.rla}, ciencias ${G.minutes.science} y estudios sociales ${G.minutes.social}, que se pueden reservar en días distintos y en cualquier orden. Lo que alarga un calendario es una materia suspendida. En la mayoría de los estados se puede repetir una materia dos veces sin esperar y luego hay que esperar ${G.waitAfterThird} días tras el tercer intento. Algunos estados son más estrictos: Nueva York y Connecticut imponen ${ny.w1} días antes de cada repetición, el Distrito de Columbia ${dc.w1} días, Virginia Occidental ${wv.w1} días y Wyoming ${wy.w1}. En línea, ged.com permite ${G.onlineRetakesBeforeWait} repetición y luego una espera de ${G.waitAfterThird} días. La calculadora de arriba toma sus propias semanas de estudio por materia, su estado y las repeticiones que quiera prever, y da una fecha de fin contada desde el 22 de octubre de 2026. Las semanas de estudio son su estimación, no la nuestra: mostramos cómo las reglas cambian la fecha, no a qué velocidad aprende usted.`,
    faqs: [
      { q: '¿Cuánto se tarda en sacar el GED?', a: 'ged.com indica unos 2 a 4 meses de media, pero depende de su nivel de partida y de las horas que pueda estudiar. Quien dejó la escuela hace uno o dos años puede necesitar unas semanas; quien vuelve tras muchos años puede necesitar más para matemáticas. La calculadora convierte su estimación en una fecha.' },
      { q: '¿Se pueden hacer los cuatro exámenes del GED en un día?', a: `Se pueden reservar el mismo día, y ged.com describe ese camino para quien estudia antes las cuatro materias. Las cuatro suman ${totalMin} minutos, unas ${Math.round(totalMin / 60)} horas de examen sin contar pausas entre materias, por eso la mayoría las reparte en varios días o semanas.` },
      { q: '¿Cuánto hay que esperar para repetir una materia del GED?', a: `En la mayoría de los estados, nada para las dos primeras repeticiones y ${G.waitAfterThird} días tras el tercer intento. Nueva York y Connecticut imponen ${ny.w1} días antes de cada repetición, el Distrito de Columbia ${dc.w1}, Virginia Occidental ${wv.w1} y Wyoming ${wy.w1}. En línea se permite una repetición antes de una espera de ${G.waitAfterThird} días.` },
      { q: '¿Se puede sacar el GED en un mes?', a: 'Es posible si sus habilidades ya están cerca del aprobado: los cuatro exámenes se pueden reservar en pocas semanas y las reglas no lo impiden. El límite es aprobar cada materia a la primera. Un examen de práctica por materia le dice pronto si un mes es realista.' },
    ],
    body: (h) => `
<h2>Las tres partes de un calendario</h2>
<p><strong>El tiempo de estudio</strong> es la parte más grande y la única que usted controla. <strong>El tiempo de examen</strong> es fijo: ${h.n(totalMin)} minutos en total, en los días que elija. <strong>El tiempo de espera</strong> solo aparece tras una materia suspendida y lo fija su estado. Un calendario que olvida el tercero puede fallar por dos meses: tres intentos de matemáticas en un estado con la regla habitual añaden ${h.n(G.waitAfterThird)} días antes del cuarto.</p>
${h.mini('plan', { p: ['st', 'weeks'], d: { st: 'NY', parts: 4, weeks: 3, fails: 1 }, t: 'Su fecha de fin con una repetición' })}
<h2>Las reglas de espera que cambian la fecha</h2>
${h.table(['Regla', 'Dónde', 'Efecto en un plan'], [
  ['Sin espera para 2 repeticiones, luego ' + G.waitAfterThird + ' días', 'La mayoría de los estados', 'Una materia suspendida se puede repetir la semana siguiente'],
  [`${ny.w1} días antes de cada repetición, ${ny.cap} intentos al año`, 'Nueva York, Connecticut', 'Cada materia suspendida añade unos dos meses'],
  [`${dc.w1} días antes de repetir`, 'Distrito de Columbia', 'Un mes por repetición, y GED Ready antes'],
  [`${wv.w1} días antes de repetir, ${wv.cap} intentos al año`, 'Virginia Occidental', 'Dos semanas por repetición'],
  [`${wy.w1} días antes de repetir`, 'Wyoming', 'Una semana por repetición'],
  [`${G.onlineRetakesBeforeWait} repetición, luego ${G.waitAfterThird} días`, 'En línea, en todas partes', 'Dos intentos fallidos en línea suponen una pausa de dos meses'],
], 'Periodos de espera según el reglamento del GED de cada estado y ged.com, leídos en octubre de 2026.', ['l', 'l', 'l'])}
<h2>Dos calendarios resueltos</h2>
<p><strong>Ana, Florida, sin repetición.</strong> Estudia cuatro semanas por materia, una tras otra, y aprueba cada una a la primera: 4 × 4 = 16 semanas, unos cuatro meses, en el extremo alto de la media de ged.com. Al reservar cada examen al final de su bloque de estudio, paga una materia cada vez en lugar del examen completo de golpe.</p>
<p><strong>Luis, Nueva York, una repetición.</strong> Estudia tres semanas por materia, 12 semanas en total, pero suspende matemáticas una vez. Nueva York impone ${h.n(ny.w1)} días antes de cada repetición, así que su fin pasa de unos tres meses a unos cinco. El mismo suspenso en Florida no le costaría tiempo de espera en un centro, solo la tarifa de repetición. Esa diferencia explica por qué el estado importa tanto como el plan de estudio, y por qué un examen de práctica antes de reservar matemáticas rinde más en los estados con periodo de espera.</p>
<h2>Lo que no cuenta en el calendario</h2>
<p>La calculadora no suma el tiempo para recibir resultados, reservar un puesto o recibir el diploma, que varía según el estado y el centro. Los puestos dependen del centro y del día, así que consulte la disponibilidad en ged.com antes de fijar el final de un bloque de estudio, y guarde una semana de margen por si la fecha ya está llena. Los diplomas y certificados los emite el estado tras aprobar la última materia. Si una fecha es crítica, pregunte a la oficina de su estado cuánto tarda en enviar el diploma.</p>
<h2>Elegir un orden</h2>
<p>No hay un orden obligatorio. Empezar por su materia más fuerte da un aprobado pronto y le enseña la rutina del examen; empezar por la más difícil, a menudo matemáticas, deja más tiempo para una repetición si hace falta. Estudios sociales, con ${h.n(G.minutes.social)} minutos, es la más corta; lenguaje, con ${h.n(G.minutes.rla)} y su ensayo, es la más larga y conviene dejarla para un día descansado.</p>
<h2>Hacer una estimación honesta</h2>
<p>Haga un examen de práctica por materia antes de planificar, para que sus semanas de estudio se basen en un puntaje y no en una sensación. Cuente las horas que de verdad puede estudiar cada semana, no las que espera tener. Añada una repetición para cada materia cuyo puntaje de práctica quedó por debajo de ${h.n(G.pass)}. Nuestras ${h.a('ged-practice-test', 'preguntas de práctica gratis')} dan una primera idea, y el examen oficial ${h.a('ged-ready', 'GED Ready')} añade un indicador de probabilidad de aprobar.</p>
<h2>Cuando el reloj importa</h2>
<p>Una oferta de trabajo, un semestre universitario o un programa de formación pueden fijarle una fecha límite. Cuente hacia atrás desde esa fecha: la calculadora muestra cuántas semanas de estudio por materia caben antes, una vez contadas las reglas de espera de su estado. Si el tiempo es corto, una ${h.a('ged-classes', 'clase')} con horario fijo suele mantener el plan mejor que estudiar solo.</p>`,
  },
});
