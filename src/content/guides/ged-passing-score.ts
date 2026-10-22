import { defineGuide } from '../../lib/page-types';
import { GENERAL } from '../../lib/data';

const G = GENERAL.ged;
const C = G.creditsBySubject;

export default defineGuide({
  id: 'ged-passing-score', group: 'rules', order: 22,
  tool: 'pass',
  related: ['ged-retake', 'hiset-scores', 'ged-ready', 'ged-test', 'ged-practice-test', 'ged-vs-hiset'],
  sources: ['ged-scores', 'ged-college-ready', 'ged-ready', 'ged-NY'],
  en: {
    slug: 'ged-passing-score',
    nav: 'GED passing score', card: 'Check four scores: pass, College Ready, college credit',
    title: 'GED Passing Score 2026: 145, College Ready 165, Credit 175',
    description: `GED passing score in 2026: ${G.pass} on each of the four subjects, College Ready from ${G.collegeReady}, college credit from ${G.collegeCredit}. Check your own scores against each level.`,
    h1: `GED passing score: ${G.pass} in each subject, and what higher scores open`,
    intro: `Enter your four scores, real or from GED Ready: the checker says which subjects pass, how many points are missing, and which reach the college levels.`,
    resume: `The GED passing score is ${G.pass} on each of the four subjects, on a scale of ${G.min} to ${G.max}. You earn your high school equivalency when all four reach ${G.pass}; there is no overall average, so a ${G.collegeCredit} in language arts does nothing for a 140 in math. Above the pass mark, ged.com sets two more levels. From ${G.collegeReady} to 174, GED College Ready: you have shown the skills to start college-level courses and may be exempt from placement tests or remedial, non-credit courses. From ${G.collegeCredit} to ${G.max}, GED College Ready + Credit: depending on the program, you may earn up to ${C.math} credits in math, ${C.science} in science, ${C.social} in social studies and ${C.rla} in humanities, ${G.creditHours} credit hours in all. To use them, you send your transcript and score report to the college and check with its admissions office whether it accepts them. On the official GED Ready practice test the same scale gives three bands: ${G.readyBands.likely} and up likely to pass, ${G.readyBands.close} to 144 too close to call, below ${G.readyBands.close} not likely. The checker above works for both.`,
    faqs: [
      { q: 'What is the passing score for the GED?', a: `${G.pass} on each of the four subjects, on a scale from ${G.min} to ${G.max}. You must reach ${G.pass} in every subject to earn the credential; scores are not averaged, so a strong subject cannot make up for a weak one. Each failed subject is retaken on its own.` },
      { q: 'What is a good GED score?', a: `Any score of ${G.pass} or more passes. ${G.collegeReady} to 174 is College Ready and may let you skip college placement tests or remedial courses. ${G.collegeCredit} to ${G.max} is College Ready + Credit and can be worth college credit, up to ${G.creditHours} credit hours across the four subjects, if your college accepts it.` },
      { q: 'How many questions do I need to get right to pass the GED?', a: 'GED Testing Service does not publish a number of correct answers per subject, and questions do not all carry the same weight. The score is reported on the 100 to 200 scale. A GED Ready practice score is the closest official guide to where you stand before the real test.' },
      { q: 'Can I retake a GED subject to get a higher score?', a: 'It depends on the state. New York, for instance, says plainly that you may not retest for a higher score in a subject you have already passed. Where it is allowed, plan for the full price, since discounted retakes are meant for failed subjects. Check your state GED policy before booking.' },
    ],
    body: (h) => `
<h2>The four levels on one scale</h2>
${h.table(['Score', 'Level (ged.com)', 'What it means'], [
  [`${G.min} to 144`, 'Below passing', 'The subject must be retaken'],
  [`${G.pass} to ${G.collegeReady - 1}`, 'GED Passing Score', 'Counts toward the high school equivalency'],
  [`${G.collegeReady} to ${G.collegeCredit - 1}`, 'GED College Ready', 'May skip placement tests or remedial courses'],
  [`${G.collegeCredit} to ${G.max}`, 'GED College Ready + Credit', `Up to ${C.math} credits in math, ${C.science} in science, ${C.social} in social studies, ${C.rla} in humanities`],
], 'Score levels as published by GED Testing Service.', ['l', 'l', 'l'])}
${h.mini('pass', { p: ['math', 'rla'], d: { math: 143, rla: 152 }, t: 'Two scores, one quick check' })}
<h2>Three sets of scores, read through</h2>
<p><strong>Maria: 151, 147, 160, 145.</strong> Every subject reaches ${h.n(G.pass)}: she has passed, and her science score is College Ready. <strong>James: 172, 168, 177, 143.</strong> Three strong subjects, one College Ready + Credit in science, but social studies is two points short, so he does not have the credential yet; one retake of social studies finishes it. <strong>Lena: 139, 150, 146, 152.</strong> Math is six points short; on GED Ready that would be the yellow band. A few weeks on the skills listed in her score report, then a retake, is the usual path. In each case, the checker above gives the same reading in a second, and shows the points still missing for each level.</p>
<h2>Why there is no average</h2>
<p>The GED is four separate tests. A state issues the credential only when each of them is passed, which is why a ${h.n(G.collegeCredit)} in one subject and a ${h.n(G.pass - 3)} in another still means one subject to retake. That is different from the ${h.a('hiset-scores', 'HiSET')}, where a minimum on each subtest is combined with a minimum total, so that one strong subtest does help.</p>
<h2>If you are a few points short</h2>
<p>Scores of ${h.n(G.readyBands.close)} to 144 are the “too close to call” band on GED Ready, and on the real test they mean a retake. Two or three points are often lost on a few skills: percentages in math, evidence questions in language arts, reading a graph’s axes in science. Your score report lists the skills to work on; the ${h.a('ged-practice-test', 'practice questions')} let you check them, and the ${h.a('ged-retake', 'retake page')} gives the price of the next attempt in your state and any waiting period.</p>
<h2>Using College Ready and credit</h2>
<p>ged.com lays out the steps: send your transcript and score report to the college you plan to attend, then ask the admissions office whether a College Ready score exempts you from placement tests or remedial courses, and whether it accepts credit earned through a College Ready + Credit score. Each college decides, and policies differ even within one state, so ask before you enroll rather than after the first term has started. ged.com sums up the benefit as saving money and earning a degree faster.</p>
<h2>Reading a GED Ready score</h2>
<p>GED Ready uses the same scale and three colors: ${h.n(G.readyBands.likely)} to 200 green, likely to pass; ${h.n(G.readyBands.close)} to 144 yellow, too close to call; 100 to 133 red, not likely to pass. Enter a GED Ready score in the checker to see how many points remain, and read the ${h.a('ged-ready', 'GED Ready page')} for when a green score is required.</p>
<h2>Scores and your state</h2>
<p>The passing score of ${h.n(G.pass)} is the same in every state that uses the GED: states set prices, ages, residency and retake rules, not the pass mark. What a state can add are conditions around the scores: some free programs ask for a GED Ready score first, and New York does not let you retest a passed subject to raise it. Your state policy page sets out these rules; check it before you book, especially if you passed some subjects years ago and want to finish now.</p>`,
  },
  es: {
    slug: 'puntaje-para-aprobar-el-ged',
    nav: 'Puntaje para aprobar el GED', card: 'Compruebe cuatro puntajes: aprobado, College Ready, créditos',
    title: 'Puntaje para aprobar el GED 2026: 145, 165 y 175 puntos',
    description: `Puntaje para aprobar el GED en 2026: ${G.pass} en cada una de las cuatro materias, College Ready desde ${G.collegeReady}, créditos desde ${G.collegeCredit}. Compruebe sus puntajes y lo que falta.`,
    h1: `Puntaje para aprobar el GED: ${G.pass} en cada materia, y lo que abren los puntajes altos`,
    intro: `Escriba sus cuatro puntajes, reales o de GED Ready: el verificador dice qué materias aprueban, cuántos puntos faltan y cuáles alcanzan los niveles universitarios.`,
    resume: `El puntaje para aprobar el GED es ${G.pass} en cada una de las cuatro materias, en una escala de ${G.min} a ${G.max}. La equivalencia de la secundaria se obtiene cuando las cuatro llegan a ${G.pass}; no hay promedio general, así que un ${G.collegeCredit} en lenguaje no hace nada por un 140 en matemáticas. Por encima del aprobado, ged.com fija dos niveles más. De ${G.collegeReady} a 174, GED College Ready: ha demostrado las habilidades para empezar cursos universitarios y puede quedar exento de exámenes de ubicación o de cursos de nivelación sin crédito. De ${G.collegeCredit} a ${G.max}, GED College Ready + Credit: según el programa, puede obtener hasta ${C.math} créditos de matemáticas, ${C.science} de ciencias, ${C.social} de estudios sociales y ${C.rla} de humanidades, ${G.creditHours} horas de crédito en total. Para usarlos, se envían el expediente y el informe de puntajes a la institución y se pregunta en su oficina de admisiones si los acepta. En el examen de práctica oficial GED Ready la misma escala da tres franjas: ${G.readyBands.likely} o más, probable aprobar; de ${G.readyBands.close} a 144, demasiado justo; por debajo de ${G.readyBands.close}, poco probable. El verificador de arriba sirve para los dos.`,
    faqs: [
      { q: '¿Cuál es el puntaje para aprobar el GED?', a: `${G.pass} en cada una de las cuatro materias, en una escala de ${G.min} a ${G.max}. Hay que llegar a ${G.pass} en todas para obtener el diploma; los puntajes no se promedian, así que una materia fuerte no compensa una débil. Cada materia suspendida se repite por separado.` },
      { q: '¿Qué es un buen puntaje en el GED?', a: `Cualquier puntaje de ${G.pass} o más aprueba. De ${G.collegeReady} a 174 es College Ready y puede evitar exámenes de ubicación o cursos de nivelación en la universidad. De ${G.collegeCredit} a ${G.max} es College Ready + Credit y puede valer créditos universitarios, hasta ${G.creditHours} horas entre las cuatro materias, si la institución los acepta.` },
      { q: '¿Cuántas preguntas hay que acertar para aprobar el GED?', a: 'GED Testing Service no publica un número de respuestas correctas por materia, y no todas las preguntas pesan lo mismo. El puntaje se da en la escala de 100 a 200. Un puntaje de GED Ready es la referencia oficial más cercana para saber dónde está antes del examen real.' },
      { q: '¿Puedo repetir una materia del GED para subir el puntaje?', a: 'Depende del estado. Nueva York, por ejemplo, indica claramente que no se puede repetir una materia ya aprobada para subir el puntaje. Donde se permite, cuente con el precio completo, ya que las repeticiones con descuento están pensadas para materias suspendidas. Revise el reglamento del GED de su estado antes de reservar.' },
    ],
    body: (h) => `
<h2>Los cuatro niveles en una escala</h2>
${h.table(['Puntaje', 'Nivel (ged.com)', 'Qué significa'], [
  [`${G.min} a 144`, 'Por debajo del aprobado', 'Hay que repetir la materia'],
  [`${G.pass} a ${G.collegeReady - 1}`, 'GED Passing Score', 'Cuenta para la equivalencia de la secundaria'],
  [`${G.collegeReady} a ${G.collegeCredit - 1}`, 'GED College Ready', 'Puede evitar exámenes de ubicación o cursos de nivelación'],
  [`${G.collegeCredit} a ${G.max}`, 'GED College Ready + Credit', `Hasta ${C.math} créditos de matemáticas, ${C.science} de ciencias, ${C.social} de estudios sociales, ${C.rla} de humanidades`],
], 'Niveles de puntaje publicados por GED Testing Service.', ['l', 'l', 'l'])}
${h.mini('pass', { p: ['math', 'rla'], d: { math: 143, rla: 152 }, t: 'Dos puntajes, una comprobación rápida' })}
<h2>Tres conjuntos de puntajes, leídos</h2>
<p><strong>María: 151, 147, 160, 145.</strong> Todas las materias llegan a ${h.n(G.pass)}: ha aprobado, y su puntaje de ciencias es College Ready. <strong>James: 172, 168, 177, 143.</strong> Tres materias fuertes, una College Ready + Credit en ciencias, pero estudios sociales se queda a dos puntos, así que todavía no tiene el diploma; una repetición de estudios sociales lo termina. <strong>Lena: 139, 150, 146, 152.</strong> A matemáticas le faltan seis puntos; en GED Ready sería la franja amarilla. Unas semanas con las habilidades que indica su informe de puntajes y luego una repetición es el camino habitual. En cada caso, el verificador de arriba da la misma lectura en un segundo, y muestra los puntos que aún faltan para cada nivel.</p>
<h2>Por qué no hay promedio</h2>
<p>El GED son cuatro exámenes separados. Un estado emite el diploma solo cuando se aprueban todos, por eso un ${h.n(G.collegeCredit)} en una materia y un ${h.n(G.pass - 3)} en otra siguen significando una materia por repetir. Es distinto del ${h.a('hiset-scores', 'HiSET')}, donde un mínimo en cada prueba se combina con un mínimo total, de modo que una prueba fuerte sí ayuda.</p>
<h2>Si le faltan pocos puntos</h2>
<p>Los puntajes de ${h.n(G.readyBands.close)} a 144 son la franja «demasiado justo» de GED Ready, y en el examen real significan una repetición. Dos o tres puntos suelen perderse en pocas habilidades: porcentajes en matemáticas, preguntas de pruebas en lenguaje, leer los ejes de una gráfica en ciencias. Su informe de puntajes enumera las habilidades por trabajar; las ${h.a('ged-practice-test', 'preguntas de práctica')} permiten comprobarlas, y la ${h.a('ged-retake', 'página de repeticiones')} da el precio del próximo intento en su estado y la espera si la hay.</p>
<h2>Cómo usar College Ready y los créditos</h2>
<p>ged.com detalla los pasos: enviar el expediente y el informe de puntajes a la institución donde piensa estudiar, y preguntar en la oficina de admisiones si un puntaje College Ready le exime de exámenes de ubicación o cursos de nivelación, y si acepta los créditos de un puntaje College Ready + Credit. Cada institución decide, y las reglas varían incluso dentro de un mismo estado, así que pregunte antes de inscribirse y no cuando el primer semestre ya haya empezado. ged.com resume la ventaja así: ahorrar dinero y obtener el título más rápido.</p>
<h2>Cómo leer un puntaje de GED Ready</h2>
<p>GED Ready usa la misma escala y tres colores: de ${h.n(G.readyBands.likely)} a 200 verde, probable aprobar; de ${h.n(G.readyBands.close)} a 144 amarillo, demasiado justo; de 100 a 133 rojo, poco probable. Escriba un puntaje de GED Ready en el verificador para ver cuántos puntos faltan, y lea la ${h.a('ged-ready', 'página de GED Ready')} para saber cuándo se exige un resultado verde.</p>
<h2>Los puntajes y su estado</h2>
<p>El puntaje de ${h.n(G.pass)} es el mismo en todos los estados que usan el GED: los estados fijan precios, edades, residencia y reglas de repetición, no la nota de aprobado. Lo que un estado puede añadir son condiciones en torno a los puntajes: algunos programas gratuitos piden antes un puntaje de GED Ready, y Nueva York no permite repetir una materia aprobada para subirla. La página del reglamento estatal detalla estas reglas; revísela antes de reservar, sobre todo si aprobó materias hace años y quiere terminar ahora.</p>`,
  },
});
