import { defineGuide } from '../../lib/page-types';
import { GENERAL } from '../../lib/data';
import { usd } from './_u';

const G = GENERAL.ged;

export default defineGuide({
  id: 'ged-math', group: 'prep', order: 11,
  tool: 'quiz-math',
  related: ['ged-practice-test', 'ged-science', 'ged-passing-score', 'ged-ready', 'ged-retake', 'hiset-practice-test'],
  sources: ['ged-subjects', 'ged-free-test', 'ged-college-ready', 'ged-ready'],
  en: {
    slug: 'ged-math-practice-test',
    nav: 'GED math practice', card: '8 math questions with every step, the formula sheet',
    title: 'GED Math Practice Test 2026: Free Questions and Answers',
    description: 'GED math practice test for 2026: 8 free questions on percents, area, equations, slope and functions, every step worked out, plus the calculator rules.',
    h1: 'GED math practice test: questions and answers, every step worked out',
    intro: `Eight questions on the four math topics of the GED, written by us, each with the full working. The real math test lasts ${G.minutes.math} minutes.`,
    resume: `The GED mathematical reasoning test lasts ${G.minutes.math} minutes and covers four topics listed by ged.com: basic math, geometry, basic algebra, and graphs and functions. You get a formula sheet and a calculator reference sheet; an on-screen calculator is available on the second part, and at a test center you may bring your own TI-30XS. Questions are multiple choice, drag and drop, fill in the blank, select an area and drop-down. Like every subject, math passes at ${G.pass} on a scale of ${G.min} to ${G.max}, and a score of ${G.collegeCredit} or more can be worth up to three college credits in math, depending on the college. The eight questions above are ours, written from those topics: a phone bill, the area of a rug, a linear equation, a slope, a discount with sales tax, a missing score from a mean, the area of a circle and a function with a negative input. Every explanation shows the full working, because on the real test most points are lost on a step, not on the method: a percentage taken the wrong way, a sign dropped, a radius confused with a diameter.`,
    faqs: [
      { q: 'Can I use a calculator on the GED math test?', a: 'Yes, on part of it. ged.com lists an on-screen calculator on part 2 of the math test, and at a test center you may bring your own TI-30XS calculator. Part 1 is taken without the calculator, so basic operations, fractions and percentages by hand still matter.' },
      { q: 'Do I need to memorize formulas for GED math?', a: 'Less than you might think. The test gives a formula sheet with area, volume, the Pythagorean theorem, slope and other formulas. What it does not give is when to use each one. Practice choosing the formula from the wording of the problem, and learn the basic ones well enough to check your work.' },
      { q: 'What math topics are on the GED?', a: 'ged.com groups them into basic math, geometry, basic algebra, and graphs and functions. In practice that means fractions, decimals, percents, ratios, area and volume, equations and inequalities, slope, and reading and using function notation and graphs, mostly in everyday situations such as bills and discounts.' },
      { q: 'How long is the GED math test?', a: `${G.minutes.math} minutes in total, which includes 2 minutes of instructions and final review and a 3-minute break between the two parts, used at a test center to get your calculator. The break is part of the ${G.minutes.math} minutes, so plan your pace on the first part with that in mind.` },
    ],
    body: (h) => `
<h2>The four topics</h2>
<p><strong>Basic math</strong> means whole numbers, fractions, decimals, percents, ratios and rates, almost always inside a real situation: a bill, a recipe, a discount, a speed. <strong>Geometry</strong> covers perimeter, area and volume of common shapes, circles and the Pythagorean theorem. <strong>Basic algebra</strong> covers expressions, linear equations and inequalities, and setting up an equation from a short story. <strong>Graphs and functions</strong> covers slope, reading points on a line, function notation such as f(x) and comparing two relationships shown in different ways.</p>
<h2>Two more worked examples</h2>
<p><strong>A rate.</strong> A car uses 12 gallons to drive 330 miles. How far can it go on 20 gallons? First the rate: 330 ÷ 12 = 27.5 miles per gallon. Then 27.5 × 20 = 550 miles. Writing the unit at each step (miles per gallon, then miles) catches most mistakes before they happen.</p>
<p><strong>A right triangle.</strong> A ladder 13 feet long leans against a wall, its foot 5 feet from the wall. How high does it reach? The Pythagorean theorem from the formula sheet: 5² + h² = 13², so h² = 169 − 25 = 144 and h = 12 feet. If you get a number longer than the ladder, you added instead of subtracting.</p>
${h.mini('pass', { p: ['math'], d: { math: 138 }, t: 'How far is your math score from passing?' })}
<h2>How the questions are scored</h2>
<p>The math test passes at ${h.n(G.pass)}, like the other three subjects, and each subject is scored separately: a strong language arts score does not compensate a weak math score. From ${h.n(G.collegeReady)} the score is College Ready, which can exempt you from college placement tests in math. From ${h.n(G.collegeCredit)}, ged.com says the score can be worth up to 3 college credits in math, depending on the college you apply to.</p>
<h2>Using the tools well</h2>
<p>The calculator saves time on long multiplications and divisions but not on setting up the problem. Learn the TI-30XS keys you will use: fractions, square roots, powers and the negative sign, which is a different key from subtraction. Read the formula sheet before test day so that you know where each formula sits. On drag-and-drop and fill-in-the-blank items there is nothing to eliminate, so the working has to be right; check it by putting your answer back into the problem.</p>
<h2>Where to go next</h2>
<p>If you missed questions on percents or rates, practice everyday problems with prices and discounts; if you missed the equation or slope questions, rework them on paper until each step is automatic. The official GED Ready math test, at ${h.usd(G.readyPerSubject)}, gives a likely-to-pass indicator and a list of skills to work on; the ${h.a('ged-ready', 'GED Ready page')} weighs its price against a retake in your state. Our ${h.a('ged-science', 'science questions')} also use numbers and graphs, and so do part of the ${h.a('ged-social-studies', 'social studies questions')}.</p>
<h2>On test day</h2>
<p>Bring your ID and, at a center, your TI-30XS if you want your own. Spend the first part, without the calculator, on the questions you can do quickly, and flag the long ones to come back to. Use the three-minute break between the parts to reset, and to pick up your calculator at a center. Leave a few minutes at the end to check the questions you flagged; an unanswered question earns nothing, so never leave one blank.</p>`,
  },
  es: {
    slug: 'practica-matematicas-ged',
    nav: 'Práctica de matemáticas GED', card: '8 preguntas de matemáticas con cada paso, la hoja de fórmulas',
    title: 'Práctica de matemáticas del GED 2026: preguntas y pasos',
    description: 'Práctica de matemáticas del GED para 2026: 8 preguntas gratis: porcentajes, áreas, ecuaciones, pendiente y funciones, cada paso resuelto y la calculadora.',
    h1: 'Práctica de matemáticas del GED: preguntas y respuestas, cada paso resuelto',
    intro: `Ocho preguntas sobre los cuatro temas de matemáticas del GED, escritas por nosotros, cada una con el cálculo completo. El examen real dura ${G.minutes.math} minutos.`,
    resume: `El examen de razonamiento matemático del GED dura ${G.minutes.math} minutos y cubre cuatro temas que indica ged.com: matemáticas básicas, geometría, álgebra básica, y gráficas y funciones. Se entrega una hoja de fórmulas y una hoja de referencia de la calculadora; en la segunda parte hay una calculadora en pantalla, y en un centro se puede llevar una TI-30XS propia. Las preguntas son de opción múltiple, arrastrar y soltar, completar, seleccionar un área y menús desplegables. Como todas las materias, matemáticas se aprueba con ${G.pass} en una escala de ${G.min} a ${G.max}, y un puntaje de ${G.collegeCredit} o más puede valer hasta tres créditos universitarios de matemáticas, según la institución. Las ocho preguntas de arriba son nuestras, escritas a partir de esos temas: una factura de teléfono, el área de una alfombra, una ecuación lineal, una pendiente, un descuento con impuesto, un puntaje que falta en una media, el área de un círculo y una función con un valor negativo. Cada explicación muestra el cálculo completo, porque en el examen real la mayoría de los puntos se pierden en un paso, no en el método: un porcentaje aplicado al revés, un signo perdido, un radio confundido con un diámetro.`,
    faqs: [
      { q: '¿Puedo usar calculadora en el examen de matemáticas del GED?', a: 'Sí, en una parte. ged.com indica una calculadora en pantalla en la parte 2 del examen de matemáticas, y en un centro se puede llevar una calculadora TI-30XS propia. La parte 1 se hace sin calculadora, así que las operaciones básicas, las fracciones y los porcentajes a mano siguen contando.' },
      { q: '¿Tengo que memorizar fórmulas para matemáticas del GED?', a: 'Menos de lo que parece. El examen da una hoja de fórmulas con áreas, volúmenes, el teorema de Pitágoras, la pendiente y otras. Lo que no dice es cuándo usar cada una. Practique elegir la fórmula a partir del enunciado y aprenda las básicas lo bastante bien como para comprobar su trabajo.' },
      { q: '¿Qué temas de matemáticas entran en el GED?', a: 'ged.com los agrupa en matemáticas básicas, geometría, álgebra básica, y gráficas y funciones. En la práctica: fracciones, decimales, porcentajes, razones, áreas y volúmenes, ecuaciones e inecuaciones, pendiente, y leer y usar la notación de funciones y las gráficas, casi siempre en situaciones cotidianas como facturas y descuentos.' },
      { q: '¿Cuánto dura el examen de matemáticas del GED?', a: `${G.minutes.math} minutos en total, que incluyen 2 minutos de instrucciones y revisión final y una pausa de 3 minutos entre las dos partes, que en un centro sirve para recoger la calculadora. La pausa forma parte de los ${G.minutes.math} minutos, así que reparta el tiempo de la primera parte teniéndolo en cuenta.` },
    ],
    body: (h) => `
<h2>Los cuatro temas</h2>
<p><strong>Matemáticas básicas</strong> son números enteros, fracciones, decimales, porcentajes, razones y tasas, casi siempre dentro de una situación real: una factura, una receta, un descuento, una velocidad. <strong>Geometría</strong> cubre perímetro, área y volumen de figuras comunes, círculos y el teorema de Pitágoras. <strong>Álgebra básica</strong> cubre expresiones, ecuaciones e inecuaciones lineales, y plantear una ecuación a partir de un enunciado corto. <strong>Gráficas y funciones</strong> cubre la pendiente, leer puntos en una recta, la notación de funciones como f(x) y comparar dos relaciones presentadas de formas distintas.</p>
<h2>Dos ejemplos resueltos más</h2>
<p><strong>Una tasa.</strong> Un auto gasta 12 galones para recorrer 330 millas. ¿Cuánto puede recorrer con 20 galones? Primero la tasa: 330 ÷ 12 = 27.5 millas por galón. Luego 27.5 × 20 = 550 millas. Escribir la unidad en cada paso (millas por galón, luego millas) evita la mayoría de los errores antes de que ocurran.</p>
<p><strong>Un triángulo rectángulo.</strong> Una escalera de 13 pies se apoya en una pared, con el pie a 5 pies de la pared. ¿Hasta qué altura llega? El teorema de Pitágoras de la hoja de fórmulas: 5² + h² = 13², así que h² = 169 − 25 = 144 y h = 12 pies. Si obtiene un número mayor que la escalera, sumó en lugar de restar.</p>
${h.mini('pass', { p: ['math'], d: { math: 138 }, t: '¿A qué distancia está su puntaje de matemáticas de aprobar?' })}
<h2>Cómo se califican las preguntas</h2>
<p>Matemáticas se aprueba con ${h.n(G.pass)}, como las otras tres materias, y cada materia se califica por separado: un buen puntaje en artes del lenguaje no compensa uno bajo en matemáticas. Desde ${h.n(G.collegeReady)} el puntaje es College Ready, lo que puede eximir de los exámenes de ubicación de matemáticas en la universidad. Desde ${h.n(G.collegeCredit)}, ged.com indica que el puntaje puede valer hasta 3 créditos universitarios de matemáticas, según la institución.</p>
<h2>Usar bien las herramientas</h2>
<p>La calculadora ahorra tiempo en multiplicaciones y divisiones largas, pero no en plantear el problema. Aprenda las teclas de la TI-30XS que usará: fracciones, raíces cuadradas, potencias y el signo negativo, que es una tecla distinta de la resta. Lea la hoja de fórmulas antes del día del examen para saber dónde está cada fórmula. En las preguntas de arrastrar y soltar o de completar no hay opciones que descartar, así que el cálculo tiene que estar bien; compruébelo poniendo su respuesta de nuevo en el problema.</p>
<h2>Qué hacer después</h2>
<p>Si falló preguntas de porcentajes o tasas, practique problemas cotidianos con precios y descuentos; si falló las de ecuaciones o pendiente, rehágalas en papel hasta que cada paso salga solo. El examen oficial GED Ready de matemáticas, a ${h.usd(G.readyPerSubject)}, da un indicador de probabilidad de aprobar y una lista de habilidades por trabajar; la ${h.a('ged-ready', 'página de GED Ready')} compara su precio con el de repetir en su estado. Nuestras ${h.a('ged-science', 'preguntas de ciencias')} también usan números y gráficas, igual que parte de las ${h.a('ged-social-studies', 'preguntas de estudios sociales')}.</p>
<h2>El día del examen</h2>
<p>Lleve su identificación y, en un centro, su TI-30XS si quiere usar la suya. Dedique la primera parte, sin calculadora, a las preguntas que resuelve rápido, y marque las largas para volver a ellas. Use la pausa de tres minutos entre las partes para despejarse y, en un centro, recoger su calculadora. Deje unos minutos al final para revisar las preguntas marcadas; una pregunta sin responder no da puntos, así que no deje ninguna en blanco.</p>`,
  },
});
