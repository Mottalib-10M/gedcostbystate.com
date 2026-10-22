import { defineGuide } from '../../lib/page-types';
import { GENERAL, GED_STATES } from '../../lib/data';
import { S } from '../../lib/stats';
import { usd0 } from '../../lib/data';
import { list } from './_u';

const G = GENERAL.ged;
const g = S.ged;
const age18 = GED_STATES.filter((x) => x.ged!.age === 18).length;
const from16 = GED_STATES.filter((x) => x.ged!.under === 16).length;
const totalMin = Object.values(G.minutes).reduce((a, b) => a + b, 0);

export default defineGuide({
  id: 'ged-test', group: 'rules', order: 21,
  tool: 'states', toolArg: { test: 'ged', mode: 'center', st: 'CA' },
  related: ['ged-cost', 'ged-passing-score', 'ged-requirements', 'ged-practice-test', 'ged-online', 'ged-vs-hiset'],
  sources: ['ged-subjects', 'ged-scores', 'ged-college-ready', 'ged-price', 'ged-online', 'ged-rules'],
  en: {
    slug: 'what-is-the-ged-test',
    nav: 'The GED test', card: 'Four subjects, 7 hours, scored 100 to 200: the test in one page',
    title: 'GED Test 2026: Subjects, Format, Scoring and Price by State',
    description: `The GED test in 2026: four subjects in ${totalMin} minutes, question types, the 145 pass mark, center or online, and the full price in each of the ${g.n} jurisdictions.`,
    h1: 'The GED test: subjects, format, scoring and price',
    intro: `Four separate subjects, ${totalMin} minutes in all, scored from ${G.min} to ${G.max} with ${G.pass} to pass. The full test costs ${usd0(g.median, 'en')} in the middle state.`,
    resume: `The GED is a high school equivalency test made of four separate subjects, each booked, paid and passed on its own: Mathematical Reasoning (${G.minutes.math} minutes), Reasoning Through Language Arts (${G.minutes.rla} minutes, with a 45-minute essay), Science (${G.minutes.science} minutes) and Social Studies (${G.minutes.social} minutes), ${totalMin} minutes in all. Questions are multiple choice plus drag and drop, fill in the blank, select an area and drop-down items; a calculator is available on part of math and on science and social studies. Each subject is scored from ${G.min} to ${G.max}: ${G.pass} passes, ${G.collegeReady} is College Ready, and ${G.collegeCredit} or more is College Ready + Credit, worth up to ${G.creditHours} college credit hours across the four subjects depending on the college. The test is given on computer at an official test center or online at home with a proctor, in ${g.online} of the ${g.n} jurisdictions that use the GED. The price is set by each state: the four subjects together cost ${usd0(g.median, 'en')} at a center in the middle state, nothing in ${list(g.free, 'en')}, and up to ${usd0(g.dearest.total, 'en')} in ${g.dearest.s.en}. The table above ranks every state.`,
    faqs: [
      { q: 'What subjects are on the GED test?', a: `Four: Mathematical Reasoning, Reasoning Through Language Arts, Science and Social Studies. Each is a separate test that you book and pay for on its own and can take in any order, on different days. Together they last ${totalMin} minutes, a little over ${Math.floor(totalMin / 60)} hours of testing time.` },
      { q: 'How is the GED scored?', a: `Each subject is scored from ${G.min} to ${G.max}. You pass a subject with ${G.pass} or more and earn the GED once all four are passed. Higher levels are College Ready from ${G.collegeReady} and College Ready + Credit from ${G.collegeCredit}. There is no overall average: a high score in one subject does not offset a low one in another.` },
      { q: 'Is the GED test on paper?', a: 'No. The GED is taken on computer, either at an official test center or online at home with a live proctor where the state allows it. The HiSET, the other equivalency test used in some states, still exists on paper. Online GED testing requires a green GED Ready score first.' },
      { q: 'How much does the GED test cost?', a: `It depends on the state, which sets the price per subject. At a test center the four subjects cost ${usd0(g.median, 'en')} in the middle state, nothing in ${list(g.free, 'en')}, and up to ${usd0(g.dearest.total, 'en')} in ${g.dearest.s.en}. The GED cost page has every state, retakes and discounts.` },
    ],
    body: (h) => `
<h2>The four subjects at a glance</h2>
${h.table(['Subject', 'Time', 'Topics (ged.com)', 'Calculator'], [
  ['Mathematical Reasoning', `${G.minutes.math} min`, 'Basic math, geometry, basic algebra, graphs and functions', 'Part 2'],
  ['Reasoning Through Language Arts', `${G.minutes.rla} min`, 'Reading for meaning, arguments, grammar and language; one essay', 'No'],
  ['Science', `${G.minutes.science} min`, 'Reading in science, experiments, numbers and graphics', 'Yes'],
  ['Social Studies', `${G.minutes.social} min`, 'Reading in social studies, history and arguments, numbers and graphs', 'Yes'],
], 'Times include instructions and any break, as listed by ged.com.', ['l', 'r', 'l', 'l'])}
<p>Each subject has its own page with eight practice questions: ${h.a('ged-math', 'math')}, ${h.a('ged-language-arts', 'language arts')}, ${h.a('ged-science', 'science')} and ${h.a('ged-social-studies', 'social studies')}.</p>
<h2>Question types</h2>
<p>Besides classic multiple choice, the GED uses drag and drop (move items into order or into categories), fill in the blank (type a number or a word), select an area (click a spot on a graph or image) and drop-down menus inside a sentence. Language arts adds the extended response, an essay in which you compare two texts and argue which is better supported. Formula and calculator reference sheets are provided where a calculator is allowed.</p>
${h.mini('pass', { p: ['math', 'rla', 'science', 'social'], t: 'Check four scores against the GED rules' })}
<h2>Scores and what they open</h2>
<p>A subject passes at ${h.n(G.pass)}. The GED credential is issued by your state once all four subjects are passed. From ${h.n(G.collegeReady)}, ged.com says the score shows readiness for college courses and can exempt you from placement tests; from ${h.n(G.collegeCredit)}, it can be worth college credit, up to ${h.n(G.creditHours)} credit hours in all, if the college accepts it. The ${h.a('ged-passing-score', 'passing score page')} explains each level and checks a set of scores.</p>
<h2>At a center or online</h2>
<p>At a test center you test on a center computer under staff supervision and may bring your own TI-30XS calculator. Online, you test from a private room on your own computer with a webcam, watched by a proctor, and must first score green on the official practice test. ${h.n(g.online)} jurisdictions offer the online test; ${list(g.noOnline, 'en')} do not. The ${h.a('ged-online', 'online GED page')} compares the two prices state by state.</p>
<h2>Booking and paying</h2>
<p>You create a free account on ged.com, choose a subject, a center or online, a date and a time, and pay for that subject alone. Nothing obliges you to buy the four at once: most state prices are per subject, so the cost of the whole test is spread over the months you study. Where the state runs a discount or a free program, the code or voucher is entered at checkout. A retake is booked the same way, at the retake price of your state, once any waiting period has passed.</p>
<h2>Who can take it</h2>
<p>Each state sets its own minimum age, residency rule and conditions for younger test takers; the minimum is 18 in ${h.n(age18)} of the ${h.n(g.n)} jurisdictions, and ${h.n(from16)} allow exceptions from 16 with conditions such as a withdrawal from school or parental consent. State policies also exclude people who already hold a high school diploma or equivalency, and younger candidates generally may not be enrolled in high school. The ${h.a('ged-requirements', 'requirements page')} checks your age and state in one step.</p>
<h2>Rules on test day</h2>
<p>ged.com publishes exam rules that apply at centers and online. You may not receive help from anyone, nobody may see your screen, and screen sharing or remote software is forbidden. You agree to a candidate rules agreement and a non-disclosure agreement: test questions may not be copied, recorded or shared. Misconduct can lead to invalidated scores, a revoked credential, lost fees and a suspension from testing. Bring an accepted government-issued ID. Read the rules once before your first booking so that nothing on the day comes as a surprise; it is also why no website, ours included, can show you real GED questions.</p>`,
  },
  es: {
    slug: 'que-es-el-examen-ged',
    nav: 'El examen GED', card: 'Cuatro materias, 7 horas, puntaje de 100 a 200: el examen en una página',
    title: 'Examen GED 2026: materias, formato, puntaje y precio',
    description: `El examen GED en 2026: cuatro materias en ${totalMin} minutos, tipos de preguntas, el 145 para aprobar, centro o en línea, y el precio en las ${g.n} jurisdicciones.`,
    h1: 'El examen GED: materias, formato, puntaje y precio',
    intro: `Cuatro materias separadas, ${totalMin} minutos en total, puntaje de ${G.min} a ${G.max} y ${G.pass} para aprobar. El examen completo cuesta ${usd0(g.median, 'es')} en el estado mediano.`,
    resume: `El GED es un examen de equivalencia de la secundaria formado por cuatro materias separadas, cada una reservada, pagada y aprobada por sí sola: Razonamiento matemático (${G.minutes.math} minutos), Razonamiento a través de las artes del lenguaje (${G.minutes.rla} minutos, con un ensayo de 45 minutos), Ciencias (${G.minutes.science} minutos) y Estudios sociales (${G.minutes.social} minutos), ${totalMin} minutos en total. Las preguntas son de opción múltiple y también de arrastrar y soltar, completar, seleccionar un área y menús desplegables; hay calculadora en una parte de matemáticas y en ciencias y estudios sociales. Cada materia se califica de ${G.min} a ${G.max}: ${G.pass} aprueba, ${G.collegeReady} es College Ready, y ${G.collegeCredit} o más es College Ready + Credit, que puede valer hasta ${G.creditHours} horas de crédito universitario entre las cuatro materias, según la institución. El examen se hace en computadora en un centro oficial o en línea desde casa con un supervisor, en ${g.online} de las ${g.n} jurisdicciones que usan el GED. El precio lo fija cada estado: las cuatro materias cuestan ${usd0(g.median, 'es')} en un centro en el estado mediano, nada en ${list(g.free, 'es')}, y hasta ${usd0(g.dearest.total, 'es')} en ${g.dearest.s.es}. La tabla de arriba ordena todos los estados.`,
    faqs: [
      { q: '¿Qué materias tiene el examen GED?', a: `Cuatro: Razonamiento matemático, Razonamiento a través de las artes del lenguaje, Ciencias y Estudios sociales. Cada una es un examen aparte que se reserva y paga por separado y se puede hacer en cualquier orden, en días distintos. Juntas duran ${totalMin} minutos, algo más de ${Math.floor(totalMin / 60)} horas de examen.` },
      { q: '¿Cómo se califica el GED?', a: `Cada materia se califica de ${G.min} a ${G.max}. Una materia se aprueba con ${G.pass} o más y el GED se obtiene al aprobar las cuatro. Los niveles superiores son College Ready desde ${G.collegeReady} y College Ready + Credit desde ${G.collegeCredit}. No hay promedio general: un puntaje alto en una materia no compensa uno bajo en otra.` },
      { q: '¿El examen GED es en papel?', a: 'No. El GED se hace en computadora, en un centro oficial o en línea desde casa con un supervisor en directo donde el estado lo permite. El HiSET, el otro examen de equivalencia que usan algunos estados, sigue existiendo en papel. El GED en línea exige antes un resultado verde en GED Ready.' },
      { q: '¿Cuánto cuesta el examen GED?', a: `Depende del estado, que fija el precio por materia. En un centro, las cuatro materias cuestan ${usd0(g.median, 'es')} en el estado mediano, nada en ${list(g.free, 'es')}, y hasta ${usd0(g.dearest.total, 'es')} en ${g.dearest.s.es}. La página de costos del GED tiene todos los estados, las repeticiones y los descuentos.` },
    ],
    body: (h) => `
<h2>Las cuatro materias de un vistazo</h2>
${h.table(['Materia', 'Tiempo', 'Temas (ged.com)', 'Calculadora'], [
  ['Razonamiento matemático', `${G.minutes.math} min`, 'Matemáticas básicas, geometría, álgebra básica, gráficas y funciones', 'Parte 2'],
  ['Artes del lenguaje', `${G.minutes.rla} min`, 'Leer para comprender, argumentos, gramática y lenguaje; un ensayo', 'No'],
  ['Ciencias', `${G.minutes.science} min`, 'Lectura en ciencias, experimentos, números y gráficos', 'Sí'],
  ['Estudios sociales', `${G.minutes.social} min`, 'Lectura en estudios sociales, historia y argumentos, números y gráficas', 'Sí'],
], 'Los tiempos incluyen instrucciones y pausas, según ged.com.', ['l', 'r', 'l', 'l'])}
<p>Cada materia tiene su página con ocho preguntas de práctica: ${h.a('ged-math', 'matemáticas')}, ${h.a('ged-language-arts', 'lenguaje')}, ${h.a('ged-science', 'ciencias')} y ${h.a('ged-social-studies', 'estudios sociales')}.</p>
<h2>Tipos de preguntas</h2>
<p>Además de la opción múltiple clásica, el GED usa arrastrar y soltar (ordenar elementos o clasificarlos), completar (escribir un número o una palabra), seleccionar un área (hacer clic en un punto de una gráfica o imagen) y menús desplegables dentro de una oración. Lenguaje añade la respuesta extendida, un ensayo en el que se comparan dos textos y se argumenta cuál está mejor sustentado. Donde se permite la calculadora se entregan hojas de fórmulas y de referencia.</p>
${h.mini('pass', { p: ['math', 'rla', 'science', 'social'], t: 'Compare cuatro puntajes con las reglas del GED' })}
<h2>Los puntajes y lo que abren</h2>
<p>Una materia se aprueba con ${h.n(G.pass)}. El diploma GED lo emite su estado cuando se aprueban las cuatro materias. Desde ${h.n(G.collegeReady)}, ged.com indica que el puntaje muestra preparación para cursos universitarios y puede eximir de exámenes de ubicación; desde ${h.n(G.collegeCredit)}, puede valer créditos universitarios, hasta ${h.n(G.creditHours)} horas de crédito en total, si la institución los acepta. La ${h.a('ged-passing-score', 'página del puntaje para aprobar')} explica cada nivel y comprueba un conjunto de puntajes.</p>
<h2>En un centro o en línea</h2>
<p>En un centro se examina en una computadora del centro bajo supervisión del personal y puede llevar su propia calculadora TI-30XS. En línea, se examina desde una habitación privada con su computadora y una cámara web, vigilado por un supervisor, y antes debe obtener un resultado verde en el examen de práctica oficial. ${h.n(g.online)} jurisdicciones ofrecen el examen en línea; ${list(g.noOnline, 'es')} no. La ${h.a('ged-online', 'página del GED en línea')} compara los dos precios estado por estado.</p>
<h2>Reservar y pagar</h2>
<p>Se crea una cuenta gratuita en ged.com, se elige una materia, un centro o en línea, una fecha y una hora, y se paga solo esa materia. Nada obliga a comprar las cuatro a la vez: casi todos los precios estatales son por materia, así que el costo del examen completo se reparte en los meses de estudio. Donde el estado tiene un descuento o un programa gratuito, el código o el vale se introduce al pagar. Una repetición se reserva igual, al precio de repetición de su estado, una vez pasado el periodo de espera si lo hay.</p>
<h2>Quién puede presentarlo</h2>
<p>Cada estado fija su edad mínima, su regla de residencia y las condiciones para los más jóvenes; el mínimo es 18 años en ${h.n(age18)} de las ${h.n(g.n)} jurisdicciones, y ${h.n(from16)} admiten excepciones desde los 16 con condiciones como haber dejado la escuela o el permiso de los padres. Los reglamentos estatales excluyen además a quien ya tiene un diploma de secundaria o de equivalencia, y los candidatos más jóvenes en general no pueden estar inscritos en la secundaria. La ${h.a('ged-requirements', 'página de requisitos')} comprueba su edad y su estado en un paso.</p>
<h2>Reglas el día del examen</h2>
<p>ged.com publica reglas de examen que se aplican en los centros y en línea. No se puede recibir ayuda de nadie, nadie puede ver su pantalla, y se prohíbe compartir pantalla o usar programas de acceso remoto. Usted acepta un acuerdo de reglas del candidato y un acuerdo de confidencialidad: las preguntas no se pueden copiar, grabar ni compartir. Una falta puede llevar a anular los puntajes, retirar el diploma, perder las tarifas y quedar suspendido. Lleve una identificación oficial aceptada. Lea las reglas una vez antes de su primera reserva para que nada le sorprenda; es también la razón por la que ningún sitio, el nuestro incluido, puede mostrarle preguntas reales del GED.</p>`,
  },
});
