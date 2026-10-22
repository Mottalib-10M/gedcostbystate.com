import { defineGuide } from '../../lib/page-types';
import { GENERAL } from '../../lib/data';
import { QUIZ } from '../../data/quiz';
import { usd } from './_u';

const G = GENERAL.ged;
const nQ = (['math', 'rla', 'science', 'social'] as const).reduce((a, k) => a + QUIZ[k].length, 0);

export default defineGuide({
  id: 'ged-practice-test', group: 'prep', order: 10,
  tool: 'quiz-mixed',
  related: ['ged-math', 'ged-language-arts', 'ged-science', 'ged-social-studies', 'ged-ready', 'hiset-practice-test'],
  sources: ['ged-subjects', 'ged-free-test', 'ged-ready', 'ged-scores'],
  en: {
    slug: 'ged-practice-test',
    nav: 'GED practice test', card: '12 free questions across the four subjects, explained',
    title: 'GED Practice Test 2026: Free Questions With Explanations',
    description: 'Free GED practice test for 2026: 12 questions across math, language arts, science and social studies, each answer explained, written by us, no sign-up needed.',
    h1: 'GED practice test: free questions across the four subjects',
    intro: 'Twelve questions, three per subject, written by us from the topics ged.com publishes. Each answer comes with its reasoning. Not real test questions.',
    resume: `This practice test mixes three questions from each GED subject: mathematical reasoning, reasoning through language arts, science and social studies. We wrote every question from the topics ged.com lists for each subject, and each one comes with the reasoning behind the right answer, so you can see what kind of thinking the subject asks for. They are not real GED questions, which are secure and never published, and your score here does not predict an official score. The real test has four separately booked subjects: math lasts ${G.minutes.math} minutes, language arts ${G.minutes.rla} minutes with an essay, science ${G.minutes.science} and social studies ${G.minutes.social}, and each passes at ${G.pass} on a scale of ${G.min} to ${G.max}. For a score indicator, the official GED Ready practice test costs ${usd(G.readyPerSubject, 'en')} a subject, and ged.com offers free preview tests at a quarter of the real length. Each subject page on this site has its own set of eight questions; this page is the quick check before you choose where to start.`,
    faqs: [
      { q: 'How close are these questions to the real GED?', a: 'They follow the topics ged.com publishes for each subject, at a level we judged similar, but they are our own and they are all multiple choice. The real test also uses drag and drop, fill in the blank, select an area and drop-down items. Use them to find your weaker subject, not to estimate a score.' },
      { q: 'Which GED subject should I take first?', a: 'Many people start with the subject they feel surest about, to get a first pass and a feel for the test center, and leave the hardest for last. Others start with math because it takes the longest to prepare. Each subject is booked and paid separately, so the order is yours.' },
      { q: 'Is there a free official GED practice test?', a: 'ged.com offers free preview tests in each subject, in English and Spanish, about a quarter of the length of the real test, with answer explanations and no time limit. The full official practice test, GED Ready, is paid and gives a likely-to-pass indicator.' },
      { q: 'How many questions are on the real GED?', a: 'ged.com publishes the time for each subject rather than a fixed number of questions, and the number varies with the question types. Plan around the times: math 115 minutes, language arts 150 including a 45-minute essay, science 90 and social studies 70.' },
    ],
    body: (h) => `
<h2>How to use this test</h2>
<p>Answer each question, check it, read the explanation, then move on. At the end you get a score out of ${h.n(nQ)}. Three questions per subject are too few to judge your level precisely, but they show quickly where you hesitate. If you miss two or three in one subject, go to its page: ${h.a('ged-math', 'math')}, ${h.a('ged-language-arts', 'language arts')}, ${h.a('ged-science', 'science')} or ${h.a('ged-social-studies', 'social studies')}, where eight questions go deeper into the same topics.</p>
<p>The questions are ours. GED Testing Service keeps its test questions secure, and no honest practice site has them. What we can do is follow the published topics closely: basic math, geometry, algebra and graphs for math; reading for meaning, arguments and grammar for language arts; experiments and data for science; civics, history, economics and geography for social studies. Every answer was checked by hand, and the explanations show the step that leads to it.</p>
${h.mini('pass', { p: ['math', 'rla'], t: 'Your real or GED Ready scores: do they pass?' })}
<h2>The traps these questions are built around</h2>
<p>Each wrong choice is a mistake people really make. In math: taking two percentages off at once instead of one after the other, confusing a circle’s circumference with its area, dropping a minus sign when a negative number is squared or multiplied. In language arts: letting a phrase such as “of required documents” decide the verb instead of the real subject, or answering from what seems likely rather than from what the passage says. In science: mixing up the variable you change with the one you measure. In social studies: confusing amendments, or the Senate with the House. Reading why a tempting answer is wrong teaches more than the right answer alone.</p>
<h2>What the real test looks like</h2>
${h.table(['Subject', 'Time', 'What it covers'], [
  ['Mathematical reasoning', `${h.n(G.minutes.math)} min`, 'Basic math, geometry, basic algebra, graphs and functions; formula sheet and on-screen calculator on part 2'],
  ['Reasoning through language arts', `${h.n(G.minutes.rla)} min`, 'Reading for meaning, identifying and creating arguments, grammar and language; one essay of 45 minutes'],
  ['Science', `${h.n(G.minutes.science)} min`, 'Reading for meaning in science, designing and interpreting experiments, numbers and graphics'],
  ['Social studies', `${h.n(G.minutes.social)} min`, 'Reading for meaning, historical events and arguments, numbers and graphs in social studies'],
], 'From the test subjects page of ged.com.', ['l', 'r', 'l'])}
<p>The test is taken on computer, at a test center or online, one subject per appointment. A TI-30XS calculator is allowed at a center for math, science and social studies, and an on-screen version is available. Scores come out the same day, subject by subject, on a scale of ${h.n(G.min)} to ${h.n(G.max)}.</p>
<h2>Free and paid practice, compared</h2>
<p>Our questions are free and need no account. The free preview tests on ged.com are a quarter of the real length, untimed, in English and Spanish, with explanations; they also need no purchase. GED Ready, the official practice test, costs ${h.usd(G.readyPerSubject)} a subject or ${h.usd(G.readyBundle)} for the four, is half the length of the real test, timed, and ends with an indicator: Likely to Pass at ${h.n(G.readyBands.likely)} or more, Too Close to Call from ${h.n(G.readyBands.close)} to 144, Not Likely to Pass below. A green result is required before each subject taken online. The ${h.a('ged-ready', 'GED Ready page')} compares its price with a retake in your state.</p>
<h2>A study plan that fits a job</h2>
<p>Most people preparing for the GED work or care for family. A steady routine helps more than long sessions: a short daily block on the weakest subject, a practice set at the end of each week, and one subject booked at a time once the practice scores hold up. The ${h.a('how-long-ged', 'timeline calculator')} turns your own weekly hours into a finish date with the waiting rules of your state, and the ${h.a('ged-classes', 'classes page')} explains the free adult education programs that teach the four subjects.</p>
<h2>After the practice test</h2>
<p>When you feel ready in one subject, book it alone; there is no need to wait until all four are ready. Each subject you pass stays passed. Before you book, check what it costs in your state on the ${h.a('ged-cost', 'cost page')}, and whether your state pays the first attempt on the ${h.a('free-ged', 'free GED page')}.</p>`,
  },
  es: {
    slug: 'examen-de-practica-ged',
    nav: 'Examen de práctica del GED', card: '12 preguntas gratis de las cuatro materias, explicadas',
    title: 'Examen de práctica del GED 2026: preguntas gratis explicadas',
    description: 'Examen de práctica del GED gratis 2026: 12 preguntas de matemáticas, lenguaje, ciencias y estudios sociales, cada respuesta explicada, sin registrarse.',
    h1: 'Examen de práctica del GED: preguntas gratis de las cuatro materias',
    intro: 'Doce preguntas, tres por materia, escritas por nosotros a partir de los temas que publica ged.com. Cada respuesta lleva su razonamiento. No son preguntas reales.',
    resume: `Este examen de práctica mezcla tres preguntas de cada materia del GED: razonamiento matemático, razonamiento a través de las artes del lenguaje, ciencias y estudios sociales. Escribimos cada pregunta a partir de los temas que ged.com indica para cada materia, y cada una lleva el razonamiento de la respuesta correcta, para que vea qué tipo de razonamiento pide la materia. No son preguntas reales del GED, que están protegidas y nunca se publican, y su resultado aquí no anticipa un puntaje oficial. El examen real tiene cuatro materias que se reservan por separado: matemáticas dura ${G.minutes.math} minutos, artes del lenguaje ${G.minutes.rla} minutos con un ensayo, ciencias ${G.minutes.science} y estudios sociales ${G.minutes.social}, y cada una se aprueba con ${G.pass} en una escala de ${G.min} a ${G.max}. Para tener un indicador de puntaje, el examen de práctica oficial GED Ready cuesta ${usd(G.readyPerSubject, 'es')} por materia, y ged.com ofrece exámenes de muestra gratuitos de una cuarta parte de la duración real. Cada página de materia de este sitio tiene su propia serie de ocho preguntas; esta página es la comprobación rápida antes de elegir por dónde empezar.`,
    faqs: [
      { q: '¿Qué tan parecidas son estas preguntas al GED real?', a: 'Siguen los temas que ged.com publica para cada materia, con un nivel que consideramos parecido, pero son nuestras y todas de opción múltiple. El examen real también usa arrastrar y soltar, completar espacios, seleccionar un área y menús desplegables. Úselas para encontrar su materia más débil, no para estimar un puntaje.' },
      { q: '¿Qué materia del GED conviene tomar primero?', a: 'Muchas personas empiezan por la materia que dominan mejor, para lograr un primer aprobado y conocer el centro de examen, y dejan la más difícil para el final. Otras empiezan por matemáticas porque es la que más tiempo de preparación pide. Cada materia se reserva y se paga por separado, así que el orden lo decide usted.' },
      { q: '¿Existe un examen de práctica oficial del GED gratis?', a: 'ged.com ofrece exámenes de muestra gratuitos de cada materia, en inglés y en español, de aproximadamente una cuarta parte de la duración real, con explicaciones y sin límite de tiempo. El examen de práctica oficial completo, GED Ready, es de pago y da un indicador de probabilidad de aprobar.' },
      { q: '¿Cuántas preguntas tiene el GED real?', a: 'ged.com publica el tiempo de cada materia y no un número fijo de preguntas, que cambia según los tipos de pregunta. Organícese con los tiempos: matemáticas 115 minutos, artes del lenguaje 150 con un ensayo de 45 minutos, ciencias 90 y estudios sociales 70.' },
    ],
    body: (h) => `
<h2>Cómo usar este examen</h2>
<p>Responda cada pregunta, compruébela, lea la explicación y siga. Al final obtiene un resultado sobre ${h.n(nQ)}. Tres preguntas por materia son pocas para medir su nivel con precisión, pero muestran rápido dónde duda. Si falla dos o tres de una materia, vaya a su página: ${h.a('ged-math', 'matemáticas')}, ${h.a('ged-language-arts', 'artes del lenguaje')}, ${h.a('ged-science', 'ciencias')} o ${h.a('ged-social-studies', 'estudios sociales')}, donde ocho preguntas profundizan en los mismos temas.</p>
<p>Las preguntas son nuestras. GED Testing Service mantiene protegidas sus preguntas, y ningún sitio de práctica honesto las tiene. Lo que sí podemos hacer es seguir de cerca los temas publicados: matemáticas básicas, geometría, álgebra y gráficas en matemáticas; comprensión de textos, argumentos y gramática en artes del lenguaje; experimentos y datos en ciencias; educación cívica, historia, economía y geografía en estudios sociales. Cada respuesta se revisó a mano, y las explicaciones muestran el paso que lleva a ella.</p>
${h.mini('pass', { p: ['math', 'rla'], t: 'Sus puntajes reales o de GED Ready: ¿aprueban?' })}
<h2>Las trampas en torno a las que se construyen estas preguntas</h2>
<p>Cada opción incorrecta es un error que la gente comete de verdad. En matemáticas: restar dos porcentajes a la vez en lugar de uno tras otro, confundir la circunferencia de un círculo con su área, perder un signo menos al elevar o multiplicar un número negativo. En artes del lenguaje: dejar que una frase como «de documentos requeridos» decida el verbo en lugar del sujeto real, o responder según lo que parece probable y no según lo que dice el texto. En ciencias: confundir la variable que se cambia con la que se mide. En estudios sociales: mezclar enmiendas, o el Senado con la Cámara. Entender por qué una respuesta tentadora es falsa enseña más que la respuesta correcta sola.</p>
<h2>Cómo es el examen real</h2>
${h.table(['Materia', 'Tiempo', 'Qué cubre'], [
  ['Razonamiento matemático', `${h.n(G.minutes.math)} min`, 'Matemáticas básicas, geometría, álgebra básica, gráficas y funciones; hoja de fórmulas y calculadora en pantalla en la parte 2'],
  ['Razonamiento a través de las artes del lenguaje', `${h.n(G.minutes.rla)} min`, 'Comprensión de textos, identificar y construir argumentos, gramática y lenguaje; un ensayo de 45 minutos'],
  ['Ciencias', `${h.n(G.minutes.science)} min`, 'Comprensión de textos científicos, diseñar e interpretar experimentos, números y gráficos'],
  ['Estudios sociales', `${h.n(G.minutes.social)} min`, 'Comprensión de textos, hechos históricos y argumentos, números y gráficas en estudios sociales'],
], 'Según la página de materias de ged.com.', ['l', 'r', 'l'])}
<p>El examen se hace en computadora, en un centro o en línea, una materia por cita. En un centro se permite una calculadora TI-30XS en matemáticas, ciencias y estudios sociales, y hay una versión en pantalla. Los puntajes salen el mismo día, materia por materia, en una escala de ${h.n(G.min)} a ${h.n(G.max)}.</p>
<h2>Práctica gratuita y de pago, comparadas</h2>
<p>Nuestras preguntas son gratuitas y no piden cuenta. Los exámenes de muestra gratuitos de ged.com duran una cuarta parte del real, sin tiempo, en inglés y en español, con explicaciones; tampoco piden compra. GED Ready, el examen de práctica oficial, cuesta ${h.usd(G.readyPerSubject)} por materia o ${h.usd(G.readyBundle)} las cuatro, dura la mitad del examen real, tiene tiempo y termina con un indicador: Likely to Pass con ${h.n(G.readyBands.likely)} o más, Too Close to Call de ${h.n(G.readyBands.close)} a 144, Not Likely to Pass por debajo. Se exige un resultado verde antes de cada materia que se toma en línea. La ${h.a('ged-ready', 'página de GED Ready')} compara su precio con el de repetir en su estado.</p>
<h2>Un plan de estudio compatible con el trabajo</h2>
<p>La mayoría de quienes preparan el GED trabajan o cuidan de su familia. Ayuda más una rutina constante que las sesiones largas: un rato corto cada día para la materia más débil, una serie de práctica al final de cada semana, y reservar una materia a la vez cuando los resultados de práctica se mantienen. La ${h.a('how-long-ged', 'calculadora de plazos')} convierte sus horas semanales en una fecha final con las esperas de su estado, y la ${h.a('ged-classes', 'página de clases')} explica los programas gratuitos de educación para adultos que enseñan las cuatro materias.</p>
<h2>Después del examen de práctica</h2>
<p>Cuando se sienta listo en una materia, resérvela sola; no hace falta esperar a tener las cuatro preparadas. Cada materia aprobada queda aprobada. Antes de reservar, compruebe lo que cuesta en su estado en la ${h.a('ged-cost', 'página de costos')}, y si su estado paga el primer intento en la ${h.a('free-ged', 'página del GED gratis')}.</p>`,
  },
});
