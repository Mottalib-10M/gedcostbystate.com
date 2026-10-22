import { defineGuide } from '../../lib/page-types';
import { GENERAL } from '../../lib/data';

const G = GENERAL.ged;

export default defineGuide({
  id: 'ged-language-arts', group: 'prep', order: 12,
  tool: 'quiz-rla',
  related: ['ged-practice-test', 'ged-social-studies', 'ged-passing-score', 'ged-ready', 'hiset-practice-test', 'ged-math'],
  sources: ['ged-subjects', 'ged-free-test', 'ged-college-ready', 'ged-scores'],
  en: {
    slug: 'ged-language-arts-practice-test',
    nav: 'GED language arts practice', card: '8 reading and grammar questions, the essay explained',
    title: 'GED Language Arts Practice Test 2026: Reading, Grammar',
    description: 'GED language arts practice test for 2026: 8 free questions on reading, arguments and grammar with explanations, plus how the 45-minute essay works and is timed.',
    h1: 'GED language arts practice test: reading, grammar and the essay',
    intro: `Eight questions on reading, arguments and grammar, written by us, with the rule behind each answer. The real test lasts ${G.minutes.rla} minutes and ends with an essay.`,
    resume: `Reasoning Through Language Arts is the longest GED subject: ${G.minutes.rla} minutes in three sections, with a 10-minute break between parts 2 and 3 and 45 minutes for one written essay, the extended response. ged.com lists three topics: reading for meaning, identifying and creating arguments, and grammar and language. Questions are multiple choice, drag and drop, select an area and drop-down menus. The subject passes at ${G.pass} on the ${G.min} to ${G.max} scale, like the others, and a score of ${G.collegeCredit} or more can be worth one college credit in humanities, depending on the college. The eight questions above are ours: two on a short news passage about a library schedule, then subject-verb agreement, commas after an introductory clause, word choice, judging which fact weakens a claim, spotting a sentence fragment and choosing a transition. Each one shows why the right answer is right and why the tempting wrong one is wrong, which is the skill the test rewards: reading closely, then deciding on evidence rather than on what sounds familiar.`,
    faqs: [
      { q: 'Is there an essay on the GED language arts test?', a: 'Yes. ged.com lists one written essay, the extended response, with 45 minutes inside the 150-minute test. You read two texts that take opposite positions and explain which argument is better supported, using evidence from the texts. Your own opinion on the topic is not what is scored.' },
      { q: 'How long is the GED language arts test?', a: `${G.minutes.rla} minutes, the longest of the four subjects. That includes 3 minutes of instructions and final review, a 10-minute break between parts 2 and 3, and 45 minutes for the essay. Plan your reading pace so that you do not reach the essay already short of time.` },
      { q: 'What grammar is on the GED?', a: 'ged.com calls the topic grammar and language. In practice: subject-verb agreement, pronouns, verb tenses, commas and apostrophes, sentence fragments and run-ons, confusing words such as their, there and they’re, and transitions between sentences. The questions ask you to fix a sentence inside a real document such as a letter or memo.' },
      { q: 'Can I take GED language arts in Spanish?', a: 'The GED is offered in Spanish in many states, and the Spanish test assesses reading and writing in Spanish. Which languages your state offers, and at what price, is set in its GED policy; check it on your state page or at ged.com before you schedule.' },
    ],
    body: (h) => `
<h2>Three topics, one skill</h2>
<p><strong>Reading for meaning</strong> asks you to find the main idea, details that support it, the order of events and what a word means in context, in both fiction and informational texts. <strong>Identifying and creating arguments</strong> asks you to separate a claim from its evidence, judge whether the evidence is enough and spot a fact that would weaken the argument. <strong>Grammar and language</strong> asks you to correct sentences in everyday documents. All three reward the same habit: go back to the text and point to the line that proves your answer.</p>
<h2>How the essay works</h2>
<p>The extended response gives you two short texts that disagree, for instance on a new rule or a public program. You must explain which side is better supported and why, quoting or describing evidence from both texts. A strong answer has a clear thesis in the first lines, two or three paragraphs that each examine one piece of evidence, and a short conclusion. Spend the first five minutes planning, and keep the last five to reread for missing words and run-on sentences.</p>
${h.mini('pass', { p: ['rla'], d: { rla: 141 }, t: 'Close to 145 in language arts? Check the gap' })}
<h2>An extra reading example</h2>
<p>“The company says the new shift schedule will cut overtime costs. Employees note that last year’s similar change was reversed after three months.” Which statement is a fact used to question the company’s claim? The answer is the reversal after three months: it is a past event, not an opinion, and it suggests the plan may not last. The phrase “will cut overtime costs” is the claim being questioned, not evidence.</p>
<h2>Scores and college credit</h2>
<p>Language arts passes at ${h.n(G.pass)} and is scored on its own; a high math score does not offset it. From ${h.n(G.collegeReady)} the score reaches College Ready and from ${h.n(G.collegeCredit)}, according to ged.com, it can be worth up to ${G.creditsBySubject.rla} college credit in humanities, fewer than the three credits available in math, science and social studies. The essay counts inside the language arts score; there is no separate essay pass mark.</p>
<h2>How to practice the rest</h2>
<p>Read short opinion pieces and news reports every day and ask two questions: what is the writer claiming, and what proves it? For grammar, rewrite your own sentences: find one long sentence a day and split it correctly. Time yourself writing a full essay at least twice before test day. The ${h.a('ged-social-studies', 'social studies questions')} use the same reading skills on historical texts, and the ${h.a('ged-ready', 'GED Ready test')} gives a likely-to-pass indicator for this subject before you pay for the real one.</p>
<h2>Managing the long passages</h2>
<p>Some passages run to several hundred words. Read the question stem first so that you know what you are looking for, then read the passage once at a steady pace without stopping on unknown words; their meaning usually becomes clear from the sentences around them. Go back only to the paragraph the question points to. This keeps time for the essay, which many test takers reach later than they planned.</p>
<h2>Common traps</h2>
<p>Answers that are true in real life but not stated in the passage are wrong on this test. Answers that repeat words from the passage are often traps too: they borrow the vocabulary but change the meaning. In grammar questions, read the whole sentence aloud in your head; the error is often several words away from the underlined part, as when a long phrase separates a subject from its verb.</p>`,
  },
  es: {
    slug: 'practica-lenguaje-ged',
    nav: 'Práctica de lenguaje GED', card: '8 preguntas de lectura y gramática, el ensayo explicado',
    title: 'Práctica de artes del lenguaje GED 2026: lectura y ensayo',
    description: 'Práctica de artes del lenguaje del GED 2026: 8 preguntas gratis de lectura, argumentos y gramática explicadas, y cómo funciona el ensayo de 45 minutos.',
    h1: 'Práctica de lenguaje del GED: lectura, gramática y ensayo',
    intro: `Ocho preguntas de lectura y gramática escritas por nosotros, con la regla de cada respuesta. El examen real dura ${G.minutes.rla} minutos.`,
    resume: `Razonamiento a través de las artes del lenguaje es la materia más larga del GED: ${G.minutes.rla} minutos en tres secciones, con una pausa de 10 minutos entre las partes 2 y 3 y 45 minutos para un ensayo escrito, la respuesta extendida. ged.com indica tres temas: leer para comprender, identificar y crear argumentos, y gramática y lenguaje. Las preguntas son de opción múltiple, arrastrar y soltar, seleccionar un área y menús desplegables. La materia se aprueba con ${G.pass} en la escala de ${G.min} a ${G.max}, como las demás, y un puntaje de ${G.collegeCredit} o más puede valer un crédito universitario de humanidades, según la institución. Las ocho preguntas de arriba son nuestras: dos sobre un texto corto acerca del horario de una biblioteca, luego concordancia entre sujeto y verbo, comas, elección de palabras, qué dato debilita una afirmación, una oración incompleta y un conector. Cada una explica por qué la respuesta correcta lo es y por qué la incorrecta tentadora no, que es justo la habilidad que el examen premia: leer con atención y decidir con pruebas, no por lo que suena familiar.`,
    faqs: [
      { q: '¿Hay un ensayo en el examen de lenguaje del GED?', a: 'Sí. ged.com indica un ensayo escrito, la respuesta extendida, con 45 minutos dentro de los 150 minutos del examen. Se leen dos textos con posturas opuestas y se explica qué argumento está mejor sustentado, con pruebas de los textos. Lo que se califica no es su opinión personal sobre el tema.' },
      { q: '¿Cuánto dura el examen de lenguaje del GED?', a: `${G.minutes.rla} minutos, la más larga de las cuatro materias. Incluye 3 minutos de instrucciones y revisión final, una pausa de 10 minutos entre las partes 2 y 3, y 45 minutos para el ensayo. Reparta el ritmo de lectura para no llegar al ensayo con poco tiempo.` },
      { q: '¿Qué gramática entra en el GED?', a: 'ged.com llama al tema gramática y lenguaje. En la práctica: concordancia entre sujeto y verbo, pronombres, tiempos verbales, comas y acentos, oraciones incompletas o pegadas, palabras que se confunden y conectores entre oraciones. Las preguntas piden corregir una oración dentro de un documento real, como una carta o un memorando.' },
      { q: '¿Se puede hacer el examen de lenguaje del GED en español?', a: 'El GED se ofrece en español en muchos estados, y el examen en español evalúa la lectura y la escritura en español. Qué idiomas ofrece su estado, y a qué precio, lo fija su reglamento del GED; compruébelo en la página de su estado o en ged.com antes de programar.' },
    ],
    body: (h) => `
<h2>Tres temas, una habilidad</h2>
<p><strong>Leer para comprender</strong> pide encontrar la idea principal, los detalles que la apoyan, el orden de los hechos y lo que significa una palabra en su contexto, en textos de ficción e informativos. <strong>Identificar y crear argumentos</strong> pide separar una afirmación de sus pruebas, juzgar si las pruebas bastan y detectar un dato que debilitaría el argumento. <strong>Gramática y lenguaje</strong> pide corregir oraciones en documentos cotidianos. Los tres premian el mismo hábito: volver al texto y señalar la línea que demuestra su respuesta.</p>
<h2>Cómo funciona el ensayo</h2>
<p>La respuesta extendida presenta dos textos cortos que no están de acuerdo, por ejemplo sobre una nueva regla o un programa público. Hay que explicar qué postura está mejor sustentada y por qué, citando o describiendo pruebas de ambos textos. Una buena respuesta tiene una tesis clara en las primeras líneas, dos o tres párrafos que examinan cada uno una prueba, y una conclusión breve. Dedique los primeros cinco minutos a planificar y guarde los últimos cinco para releer en busca de palabras que faltan y oraciones pegadas.</p>
${h.mini('pass', { p: ['rla'], d: { rla: 141 }, t: '¿Cerca de 145 en lenguaje? Mida la diferencia' })}
<h2>Un ejemplo de lectura más</h2>
<p>«La empresa dice que el nuevo horario de turnos reducirá el costo de las horas extra. Los empleados señalan que un cambio parecido del año pasado se revirtió a los tres meses.» ¿Qué dato se usa para cuestionar la afirmación de la empresa? La respuesta es la reversión a los tres meses: es un hecho pasado, no una opinión, y sugiere que el plan puede no durar. La frase «reducirá el costo de las horas extra» es la afirmación cuestionada, no una prueba.</p>
<h2>Puntajes y créditos universitarios</h2>
<p>Lenguaje se aprueba con ${h.n(G.pass)} y se califica por sí sola; un buen puntaje en matemáticas no la compensa. Desde ${h.n(G.collegeReady)} el puntaje alcanza College Ready y desde ${h.n(G.collegeCredit)}, según ged.com, puede valer hasta ${G.creditsBySubject.rla} crédito universitario de humanidades, menos que los tres créditos posibles en matemáticas, ciencias y estudios sociales. El ensayo cuenta dentro del puntaje de lenguaje; no tiene una nota de aprobación propia.</p>
<h2>Cómo practicar el resto</h2>
<p>Lea cada día artículos de opinión y noticias cortas y hágase dos preguntas: ¿qué afirma quien escribe y qué lo demuestra? Para la gramática, reescriba sus propias oraciones: busque una oración larga al día y divídala correctamente. Escriba un ensayo completo con el reloj al menos dos veces antes del examen. Las ${h.a('ged-social-studies', 'preguntas de estudios sociales')} usan las mismas habilidades de lectura con textos históricos, y el ${h.a('ged-ready', 'examen GED Ready')} da un indicador de probabilidad de aprobar esta materia antes de pagar la real.</p>
<h2>Cómo manejar los textos largos</h2>
<p>Algunos textos tienen varios cientos de palabras. Lea primero el enunciado de la pregunta para saber qué busca, luego lea el texto una vez a ritmo constante sin detenerse en las palabras desconocidas; su sentido suele aclararse con las oraciones de alrededor. Vuelva solo al párrafo que indica la pregunta. Así le queda tiempo para el ensayo, al que muchos candidatos llegan más tarde de lo previsto.</p>
<h2>Trampas frecuentes</h2>
<p>Las respuestas ciertas en la vida real pero que el texto no dice son incorrectas en este examen. Las respuestas que repiten palabras del texto también suelen ser trampas: toman el vocabulario pero cambian el sentido. En las preguntas de gramática, lea mentalmente la oración completa; el error suele estar a varias palabras de la parte subrayada, como cuando una frase larga separa el sujeto de su verbo.</p>`,
  },
});
