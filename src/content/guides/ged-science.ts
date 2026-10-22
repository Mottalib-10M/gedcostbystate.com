import { defineGuide } from '../../lib/page-types';
import { GENERAL } from '../../lib/data';

const G = GENERAL.ged;

export default defineGuide({
  id: 'ged-science', group: 'prep', order: 13,
  tool: 'quiz-science',
  related: ['ged-practice-test', 'ged-math', 'ged-social-studies', 'ged-ready', 'ged-passing-score', 'how-long-ged'],
  sources: ['ged-subjects', 'ged-free-test', 'ged-college-ready', 'ged-ready'],
  en: {
    slug: 'ged-science-practice-test',
    nav: 'GED science practice', card: '8 science questions: experiments, data, life and physical science',
    title: 'GED Science Practice Test 2026: Free Questions Explained',
    description: 'GED science practice test for 2026: 8 free questions on experiments, data, life, Earth and physical science, each answer explained, plus the test format.',
    h1: 'GED science practice test, with each answer explained',
    intro: `Eight science questions written by us, from experiments to energy, each with its explanation. The real test lasts ${G.minutes.science} minutes, with a calculator.`,
    resume: `The GED science test lasts ${G.minutes.science} minutes, including 2 minutes of instructions and final review, with no break. ged.com lists three skills rather than a list of facts to memorize: reading for meaning in science, designing and interpreting science experiments, and using numbers and graphics in science. You get an on-screen calculator and a calculator reference sheet, and at a test center you may bring your own TI-30XS. Questions are multiple choice, fill in the blank, drag and drop, select an area and drop-down. Science passes at ${G.pass} like every subject, and from ${G.collegeCredit} a score can be worth up to ${G.creditsBySubject.science} college credits in science, depending on the college. The eight questions above are ours: two on a fertilizer experiment (what the variable is, which group is the control), an average speed, boiling water on a mountain, photosynthesis, a cross between two brown-eyed parents, whether an object floats from its density, and the energy change in a flashlight. Most of the test gives you the information in a short text, a table or a graph; the work is reading it correctly and doing a small calculation.`,
    faqs: [
      { q: 'What is on the GED science test?', a: 'ged.com lists three skills: reading for meaning in science, designing and interpreting experiments, and using numbers and graphics. The questions draw on life science, physical science, and Earth and space science, usually through a short passage, a table or a chart that gives you the facts you need.' },
      { q: 'Is there a calculator on the GED science test?', a: 'Yes. ged.com lists an on-screen calculator and a calculator reference sheet for science, and at a test center you may bring your own TI-30XS. Expect averages, rates, percentages and simple probabilities, the same arithmetic as in the math test but applied to data from an experiment.' },
      { q: 'How long is the GED science test?', a: `${G.minutes.science} minutes, including 2 minutes of instructions and final review, with no break. It is the second-shortest subject after social studies (70 minutes) and well ahead of math (115) and language arts (150). Without a break, plan to read steadily from the first question, flag the long data sets and come back to them once the quick questions are done.` },
      { q: 'Do I need to memorize science facts for the GED?', a: 'Some basic vocabulary helps: cell, gene, photosynthesis, density, force, energy, ecosystem. But most questions give the facts in the passage or chart. What you need is the method: identifying variables, reading a graph’s axes and units, and checking that a conclusion actually follows from the data.' },
    ],
    body: (h) => `
<h2>The three skills, with what they look like</h2>
<p><strong>Reading for meaning</strong>: a paragraph explains how vaccines train the immune system, and the question asks which statement the paragraph supports. <strong>Designing and interpreting experiments</strong>: you are told what a student changed and what she measured, and you must name the variable, the control group or the flaw in the design. <strong>Using numbers and graphics</strong>: a table gives temperatures over a week and you compute the mean, or a graph shows two lines and you say where they cross.</p>
<h2>The vocabulary of an experiment</h2>
<p>The <strong>independent variable</strong> is what the experimenter changes on purpose. The <strong>dependent variable</strong> is what she measures. The <strong>control group</strong> gets no treatment, so that results can be compared against it. <strong>Constants</strong> are everything kept the same: same plant, same soil, same light. A <strong>hypothesis</strong> is a testable prediction, often written as “if… then…”. Half of the experiment questions on the test come down to sorting these five words correctly.</p>
${h.mini('pass', { p: ['science'], d: { science: 150 }, t: 'Your science score against 145' })}
<h2>An extra worked example</h2>
<p>A table shows a plant’s height after 1, 2, 3 and 4 weeks: 4, 7, 10 and 13 cm. How tall will it probably be after 6 weeks if the trend continues? It grows 3 cm a week, so 13 + 3 + 3 = 19 cm. The phrase “if the trend continues” matters: the test may ask, in another question, why that prediction could be wrong, for instance because plants stop growing at some height.</p>
<h2>Scores and credit</h2>
<p>Science is scored on its own and passes at ${h.n(G.pass)}. From ${h.n(G.collegeReady)} it is College Ready; from ${h.n(G.collegeCredit)}, ged.com says it can be worth up to ${G.creditsBySubject.science} college credits in science, as for math and social studies. Each college decides whether it accepts that credit, so ask the admissions office of the one you have in mind.</p>
<h2>How to prepare</h2>
<p>Practice on graphs and tables more than on textbooks. Each day, take one chart from a newspaper or a science news site and write two sentences: what it shows, and what it does not prove. Rework the math skills science uses most, averages and percentages, with the ${h.a('ged-math', 'math questions')}. If you test online, a green GED Ready science score is required within ${G.readyGreenDays} days before the test; the ${h.a('ged-ready', 'GED Ready page')} explains the price and the three result bands.</p>
<h2>Reading a graph in four steps</h2>
<p>First read the title, which says what the graph is about. Then read each axis and its unit: days or weeks, degrees or percent. Then read the key, if there is more than one line or bar. Only then read the question. Test takers who skip the axes often answer in the wrong unit, or read a cumulative total as a weekly figure. On the real test, the four steps take less than half a minute and save points on several questions in a row.</p>
<h2>When to schedule science</h2>
<p>You do not have to take the four subjects in a set order. Science is shorter than language arts and uses the same reading skills, so it suits a test taker who reads comfortably. If graphs worry you, take math first: the same arithmetic then feels familiar on the science test. Our ${h.a('how-long-ged', 'GED timeline calculator')} shows how the order and your study weeks change the date you can finish.</p>`,
  },
  es: {
    slug: 'practica-ciencias-ged',
    nav: 'Práctica de ciencias GED', card: '8 preguntas de ciencias: experimentos, datos, vida y física',
    title: 'Práctica de ciencias del GED 2026: preguntas explicadas',
    description: 'Práctica de ciencias del GED 2026: 8 preguntas gratis sobre experimentos, datos, ciencias de la vida, la Tierra y física, con cada respuesta explicada.',
    h1: 'Práctica de ciencias del GED, con cada respuesta explicada',
    intro: `Ocho preguntas de ciencias escritas por nosotros, de los experimentos a la energía, cada una con su explicación. El examen real dura ${G.minutes.science} minutos, con calculadora.`,
    resume: `El examen de ciencias del GED dura ${G.minutes.science} minutos, con 2 minutos de instrucciones y revisión final, sin pausa. ged.com indica tres habilidades y no una lista de datos que memorizar: leer para comprender en ciencias, diseñar e interpretar experimentos, y usar números y gráficos en ciencias. Hay una calculadora en pantalla y una hoja de referencia de la calculadora, y en un centro se puede llevar una TI-30XS propia. Las preguntas son de opción múltiple, completar, arrastrar y soltar, seleccionar un área y menús desplegables. Ciencias se aprueba con ${G.pass} como todas las materias, y desde ${G.collegeCredit} un puntaje puede valer hasta ${G.creditsBySubject.science} créditos universitarios de ciencias, según la institución. Las ocho preguntas de arriba son nuestras: dos sobre un experimento con fertilizante (cuál es la variable, cuál es el grupo de control), una velocidad media, el agua que hierve en una montaña, la fotosíntesis, un cruce entre dos padres de ojos marrones, si un objeto flota según su densidad y el cambio de energía en una linterna. La mayor parte del examen da la información en un texto corto, una tabla o una gráfica; el trabajo consiste en leerla bien y hacer un cálculo pequeño.`,
    faqs: [
      { q: '¿Qué entra en el examen de ciencias del GED?', a: 'ged.com indica tres habilidades: leer para comprender en ciencias, diseñar e interpretar experimentos, y usar números y gráficos. Las preguntas tratan de ciencias de la vida, ciencias físicas y ciencias de la Tierra y el espacio, casi siempre a partir de un texto corto, una tabla o una gráfica que da los datos necesarios.' },
      { q: '¿Hay calculadora en el examen de ciencias del GED?', a: 'Sí. ged.com indica una calculadora en pantalla y una hoja de referencia para ciencias, y en un centro se puede llevar una TI-30XS propia. Espere medias, tasas, porcentajes y probabilidades sencillas, la misma aritmética que en matemáticas pero aplicada a los datos de un experimento.' },
      { q: '¿Cuánto dura el examen de ciencias del GED?', a: `${G.minutes.science} minutos, con 2 minutos de instrucciones y revisión final, sin pausa. Es la segunda materia más corta después de estudios sociales (70 minutos), muy por debajo de matemáticas (115) y lenguaje (150). Sin pausa, conviene leer a ritmo constante desde la primera pregunta, marcar los conjuntos de datos largos y volver a ellos al terminar las preguntas rápidas.` },
      { q: '¿Hay que memorizar datos de ciencias para el GED?', a: 'Algo de vocabulario básico ayuda: célula, gen, fotosíntesis, densidad, fuerza, energía, ecosistema. Pero la mayoría de las preguntas dan los datos en el texto o la gráfica. Lo que hace falta es el método: identificar variables, leer los ejes y las unidades de una gráfica, y comprobar que una conclusión se deduce de los datos.' },
    ],
    body: (h) => `
<h2>Las tres habilidades, en concreto</h2>
<p><strong>Leer para comprender</strong>: un párrafo explica cómo las vacunas entrenan al sistema inmunitario, y la pregunta pide qué afirmación respalda el párrafo. <strong>Diseñar e interpretar experimentos</strong>: se indica qué cambió una estudiante y qué midió, y hay que nombrar la variable, el grupo de control o el fallo del diseño. <strong>Usar números y gráficos</strong>: una tabla da temperaturas durante una semana y se calcula la media, o una gráfica muestra dos líneas y hay que decir dónde se cruzan.</p>
<h2>El vocabulario de un experimento</h2>
<p>La <strong>variable independiente</strong> es lo que el experimentador cambia a propósito. La <strong>variable dependiente</strong> es lo que mide. El <strong>grupo de control</strong> no recibe tratamiento, para comparar los resultados con él. Las <strong>constantes</strong> son todo lo que se mantiene igual: misma planta, misma tierra, misma luz. Una <strong>hipótesis</strong> es una predicción que se puede comprobar, a menudo escrita como «si… entonces…». La mitad de las preguntas sobre experimentos se reduce a clasificar bien estas cinco palabras.</p>
${h.mini('pass', { p: ['science'], d: { science: 150 }, t: 'Su puntaje de ciencias frente a 145' })}
<h2>Un ejemplo resuelto más</h2>
<p>Una tabla da la altura de una planta tras 1, 2, 3 y 4 semanas: 4, 7, 10 y 13 cm. ¿Qué altura tendrá probablemente tras 6 semanas si la tendencia sigue? Crece 3 cm por semana, así que 13 + 3 + 3 = 19 cm. La frase «si la tendencia sigue» importa: el examen puede preguntar, en otra pregunta, por qué esa predicción podría fallar, por ejemplo porque las plantas dejan de crecer a cierta altura.</p>
<h2>Puntajes y créditos</h2>
<p>Ciencias se califica por sí sola y se aprueba con ${h.n(G.pass)}. Desde ${h.n(G.collegeReady)} es College Ready; desde ${h.n(G.collegeCredit)}, ged.com indica que puede valer hasta ${G.creditsBySubject.science} créditos universitarios de ciencias, igual que matemáticas y estudios sociales. Cada institución decide si acepta ese crédito, así que pregunte en la oficina de admisiones de la que le interesa.</p>
<h2>Cómo prepararse</h2>
<p>Practique más con gráficas y tablas que con libros de texto. Cada día, tome una gráfica de un periódico o de un sitio de noticias científicas y escriba dos frases: qué muestra y qué no demuestra. Repase las habilidades de matemáticas que más usa ciencias, medias y porcentajes, con las ${h.a('ged-math', 'preguntas de matemáticas')}. Si se examina en línea, hace falta un resultado verde de GED Ready en ciencias en los ${G.readyGreenDays} días previos; la ${h.a('ged-ready', 'página de GED Ready')} explica el precio y las tres franjas de resultado.</p>
<h2>Leer una gráfica en cuatro pasos</h2>
<p>Primero lea el título, que dice de qué trata la gráfica. Luego lea cada eje y su unidad: días o semanas, grados o porcentaje. Después lea la leyenda, si hay más de una línea o barra. Solo entonces lea la pregunta. Quien se salta los ejes suele responder en la unidad equivocada, o lee un total acumulado como si fuera una cifra semanal. En el examen real, los cuatro pasos llevan menos de medio minuto y ahorran puntos en varias preguntas seguidas.</p>
<h2>Cuándo programar ciencias</h2>
<p>No hay que hacer las cuatro materias en un orden fijo. Ciencias es más corta que lenguaje y usa las mismas habilidades de lectura, así que conviene a quien lee con soltura. Si las gráficas le preocupan, haga primero matemáticas: la misma aritmética le resultará familiar en ciencias. Nuestra ${h.a('how-long-ged', 'calculadora de plazos del GED')} muestra cómo el orden y sus semanas de estudio cambian la fecha en que puede terminar.</p>`,
  },
});
