import { defineGuide } from '../../lib/page-types';
import { GENERAL, st } from '../../lib/data';

const H = GENERAL.hiset;
const G = GENERAL.ged;
const OH = st('OH').hiset!;

export default defineGuide({
  id: 'hiset-scores', group: 'rules', order: 23,
  tool: 'hpass',
  related: ['ged-passing-score', 'hiset', 'hiset-practice-test', 'ged-vs-hiset', 'ged-retake'],
  sources: ['hiset-scores', 'hiset-about', 'hiset-states', 'hiset-OH'],
  en: {
    slug: 'hiset-scores',
    nav: 'HiSET scores', card: 'Five subtests, a total of 45 and the essay: check your scores',
    title: 'HiSET Scores 2026: Passing 8 of 20, Total 45, Essay 2 of 6',
    description: `HiSET scores in 2026: ${H.passEach} of ${H.outOf} on each subtest, ${H.passTotal} of ${H.totalMax} in total, ${H.essayMin} of ${H.essayMax} on the essay. Enter your five scores to see what passes and what is missing.`,
    h1: `HiSET scores: ${H.passEach} on each subtest, ${H.passTotal} in all, and when results arrive`,
    intro: `Type your five subtest scores and your essay score: the checker applies the three HiSET rules at once and says which one still blocks you.`,
    resume: `To pass the HiSET you must meet three rules at the same time. Each of the five subtests is scored from 1 to ${H.outOf}, and each needs at least ${H.passEach}. The five scores added together must reach ${H.passTotal} of ${H.totalMax}, which is more than five times ${H.passEach}: someone who scores exactly ${H.passEach} everywhere has ${H.passEach * 5} and still fails. The essay in the language arts writing subtest needs at least ${H.essayMin} of ${H.essayMax}. A strong subtest therefore helps the total, unlike the GED, where each subject stands alone. hiset.org posts official scores within ${H.scoreDays} business days on average for multiple-choice subtests and ${H.writingDays} for writing; paper tests can take longer. Your Comprehensive Score Report keeps your highest score on each subtest and is updated whenever a retake improves one. A score of ${H.ccrEach} on a subtest and ${H.ccrEssay} on the essay marks college and career readiness, a level hiset.org describes as scoring the same or higher than ${H.ccrPct} percent of graduating high school students. The credential itself is issued by your state.`,
    faqs: [
      { q: 'How long does it take to get HiSET scores?', a: `hiset.org says official scores are posted within ${H.scoreDays} business days on average for the multiple-choice subtests and within ${H.writingDays} business days for language arts writing, after a quality check. On paper it can take longer if the test center is slow to send the answer sheets. Scores appear in your HiSET account.` },
      { q: 'Can I pass the HiSET with a 7 on one subtest?', a: `No. Every subtest needs at least ${H.passEach} of ${H.outOf}, whatever the total. A 7 in math with a total of 60 still means retaking math. Once that subtest reaches ${H.passEach}, the highest scores you have on the other four stay on your Comprehensive Score Report.` },
      { q: 'Does the HiSET keep my best score?', a: 'Yes. The Comprehensive Score Report shows your highest scaled score on each subtest and is updated each time a retake gives a better score. A lower retake score does not replace a higher one. Each attempt also has its own Individual Test Report with more detailed feedback on that subtest.' },
      { q: 'What does the HiSET college and career readiness score mean?', a: `It is a score of at least ${H.ccrEach} of ${H.outOf} on a subtest and at least ${H.ccrEssay} of ${H.essayMax} on the essay. hiset.org describes it as scoring the same or higher than ${H.ccrPct} percent of graduating high school students. Colleges decide for themselves whether it exempts you from placement tests, so ask the admissions office.` },
    ],
    body: (h) => `
<h2>The three passing rules</h2>
${h.table(['Rule', 'Minimum', 'Scale'], [
  ['Each of the five subtests', `${H.passEach}`, `1 to ${H.outOf}`],
  ['Total of the five subtests', `${H.passTotal}`, `5 to ${H.totalMax}`],
  ['Essay, language arts writing', `${H.essayMin}`, `1 to ${H.essayMax}`],
  ['College and career readiness, per subtest', `${H.ccrEach}`, `1 to ${H.outOf}`],
  ['College and career readiness, essay', `${H.ccrEssay}`, `1 to ${H.essayMax}`],
], 'HiSET passing requirements as published on hiset.org.', ['l', 'r', 'r'])}
<p>All three rules count at once. The total is what most people overlook: ${h.n(H.passEach)} on each subtest only gives ${h.n(H.passEach * 5)}, so you need ${h.n(H.passTotal - H.passEach * 5)} more points somewhere, on average ${h.n(H.passTotal / 5)} a subtest. On the other hand a strong subject carries a weaker one, as long as the weaker one reaches ${h.n(H.passEach)}.</p>
${h.mini('hpass', { p: ['math', 'writing', 'essay'], d: { math: 8, writing: 9, essay: 2 }, t: 'Two subtests and the essay, checked' })}
<h2>Three sets of scores, read through</h2>
<p><strong>Ana: 9, 9, 8, 10, 8, essay 3.</strong> Every subtest reaches ${h.n(H.passEach)} and the essay passes, but the total is 44: one point short. One more point on any subtest finishes it, and since only the highest score counts, she can retake the subtest she finds easiest. <strong>Marcus: 14, 12, 7, 13, 11, essay 4.</strong> The total is 57, well above ${h.n(H.passTotal)}, yet social studies at 7 blocks the credential; that is the only subtest to retake. <strong>Rosa: 10, 11, 9, 12, 10, essay 1.</strong> All five subtests and the total of 52 pass, but an essay of 1 fails the writing rule, so the writing subtest must be taken again. The checker above gives these readings in a second.</p>
<h2>When the scores arrive</h2>
<p>hiset.org posts official scores after a quality check: on average within ${h.n(H.scoreDays)} business days for the multiple-choice subtests and ${h.n(H.writingDays)} business days for language arts writing, because the essay is scored by readers. On paper the delay can be longer if the test center is late sending the answer sheets. The scores appear in your HiSET account. Plan a retake after the score is posted, not before, since the second attempt is priced only once you know you need it.</p>
<h2>The two score reports</h2>
<p>Each attempt produces an Individual Test Report with more detailed feedback on that subtest. Above them sits the Comprehensive Score Report, which shows your highest scaled score on each subtest and whether you have passed the whole exam. It updates each time you take a new subtest or retake one and do better. A worse retake does not lower anything, which is why a retake to lift the total is low risk.</p>
<h2>What a retake costs</h2>
<p>On the price pages hiset.org publishes for each state, the full fee is paid only on the first and fourth attempt of a subtest; the second and third cost only the test center fee, or the proctoring fee at home. In Ohio a subtest costs ${h.usd(OH.hc!)} at a center, so a second attempt costs ${h.usd(OH.hc! - OH.tf!)}. Your state sets how soon you can retest and how often per year: the ${h.a('ged-retake', 'retake calculator')} gives the price of each attempt in your state and the ${h.a('hiset', 'HiSET cost page')} lists the fees state by state.</p>
<h2>College and career readiness</h2>
<p>A score of ${h.n(H.ccrEach)} or more on a subtest, and ${h.n(H.ccrEssay)} or more on the essay, is the college and career readiness level. hiset.org explains it as scoring the same or higher than ${h.n(H.ccrPct)} percent of graduating high school students and gives no other detail on how it was set. It is not needed to pass. Each college decides whether it accepts it in place of a placement test, so ask the admissions office before you enroll.</p>
<h2>HiSET and GED scores side by side</h2>
<p>The GED is scored from ${h.n(G.min)} to ${h.n(G.max)} and needs ${h.n(G.pass)} in each of four subjects, with no total. The HiSET adds the total rule, so strong subjects help. Scores never transfer between the two tests. The ${h.a('ged-passing-score', 'GED score checker')} does the same reading for the GED, and the ${h.a('hiset-practice-test', 'HiSET practice questions')} let you test yourself before booking.</p>
<h2>From scores to the credential</h2>
<p>Passing all five subtests is the HiSET part. Your state then issues the diploma or certificate, sometimes after its own conditions such as a civics test or a set score, and sends it to the address in your HiSET account. Extra copies and official transcripts are ordered from the state, not from ETS.</p>`,
  },
  es: {
    slug: 'puntajes-del-hiset',
    nav: 'Puntajes del HiSET', card: 'Cinco pruebas, un total de 45 y el ensayo: compruebe sus puntajes',
    title: 'Puntajes del HiSET 2026: aprobar con 8 de 20 y 45 en total',
    description: `Puntajes del HiSET en 2026: ${H.passEach} de ${H.outOf} en cada prueba, ${H.passTotal} de ${H.totalMax} en total y ${H.essayMin} de ${H.essayMax} en el ensayo. Escriba sus cinco puntajes y vea qué aprueba y qué falta.`,
    h1: `Puntajes del HiSET: ${H.passEach} en cada prueba, ${H.passTotal} en total, y cuándo llegan`,
    intro: `Escriba sus cinco puntajes y el del ensayo: el verificador aplica a la vez las tres reglas del HiSET y dice cuál le sigue frenando.`,
    resume: `Para aprobar el HiSET hay que cumplir tres reglas al mismo tiempo. Cada una de las cinco pruebas se califica de 1 a ${H.outOf}, y cada una necesita al menos ${H.passEach}. La suma de los cinco puntajes debe llegar a ${H.passTotal} de ${H.totalMax}, que es más que cinco veces ${H.passEach}: quien saca exactamente ${H.passEach} en todas tiene ${H.passEach * 5} y no aprueba. El ensayo de la prueba de escritura necesita al menos ${H.essayMin} de ${H.essayMax}. Por eso una prueba fuerte ayuda al total, a diferencia del GED, donde cada materia va por separado. hiset.org publica los puntajes oficiales en un promedio de ${H.scoreDays} días hábiles para las pruebas de opción múltiple y de ${H.writingDays} para la escritura; en papel puede tardar más. El Comprehensive Score Report conserva su puntaje más alto en cada prueba y se actualiza cuando una repetición lo mejora. Un ${H.ccrEach} en una prueba y un ${H.ccrEssay} en el ensayo marcan la preparación universitaria y laboral, un nivel que hiset.org describe como igualar o superar al ${H.ccrPct} por ciento de los graduados de secundaria. La credencial la emite su estado.`,
    faqs: [
      { q: '¿Cuánto tardan los puntajes del HiSET?', a: `hiset.org indica que los puntajes oficiales se publican en un promedio de ${H.scoreDays} días hábiles para las pruebas de opción múltiple y de ${H.writingDays} días hábiles para la escritura, tras un control de calidad. En papel puede tardar más si el centro envía tarde las hojas de respuestas. Los puntajes aparecen en su cuenta del HiSET.` },
      { q: '¿Puedo aprobar el HiSET con un 7 en una prueba?', a: `No. Cada prueba necesita al menos ${H.passEach} de ${H.outOf}, sea cual sea el total. Un 7 en matemáticas con un total de 60 sigue obligando a repetir matemáticas. Cuando esa prueba llega a ${H.passEach}, los puntajes más altos de las otras cuatro siguen en su Comprehensive Score Report.` },
      { q: '¿El HiSET conserva mi mejor puntaje?', a: 'Sí. El Comprehensive Score Report muestra su puntaje más alto en cada prueba y se actualiza cada vez que una repetición da un puntaje mejor. Un puntaje más bajo en una repetición no reemplaza uno más alto. Cada intento tiene también su propio Individual Test Report, con más detalle sobre esa prueba.' },
      { q: '¿Qué significa el puntaje de preparación universitaria del HiSET?', a: `Es un puntaje de al menos ${H.ccrEach} de ${H.outOf} en una prueba y de al menos ${H.ccrEssay} de ${H.essayMax} en el ensayo. hiset.org lo describe como igualar o superar al ${H.ccrPct} por ciento de los graduados de secundaria. Cada institución decide si le exime de los exámenes de ubicación, así que pregunte en admisiones.` },
    ],
    body: (h) => `
<h2>Las tres reglas para aprobar</h2>
${h.table(['Regla', 'Mínimo', 'Escala'], [
  ['Cada una de las cinco pruebas', `${H.passEach}`, `1 a ${H.outOf}`],
  ['Total de las cinco pruebas', `${H.passTotal}`, `5 a ${H.totalMax}`],
  ['Ensayo, escritura', `${H.essayMin}`, `1 a ${H.essayMax}`],
  ['Preparación universitaria y laboral, por prueba', `${H.ccrEach}`, `1 a ${H.outOf}`],
  ['Preparación universitaria y laboral, ensayo', `${H.ccrEssay}`, `1 a ${H.essayMax}`],
], 'Requisitos para aprobar el HiSET publicados en hiset.org.', ['l', 'r', 'r'])}
<p>Las tres reglas cuentan a la vez. El total es lo que más se pasa por alto: ${h.n(H.passEach)} en cada prueba solo da ${h.n(H.passEach * 5)}, así que faltan ${h.n(H.passTotal - H.passEach * 5)} puntos en alguna parte, en promedio ${h.n(H.passTotal / 5)} por prueba. A cambio, una materia fuerte sostiene a otra más débil, siempre que la débil llegue a ${h.n(H.passEach)}.</p>
${h.mini('hpass', { p: ['math', 'writing', 'essay'], d: { math: 8, writing: 9, essay: 2 }, t: 'Dos pruebas y el ensayo, comprobados' })}
<h2>Tres conjuntos de puntajes, leídos</h2>
<p><strong>Ana: 9, 9, 8, 10, 8, ensayo 3.</strong> Todas las pruebas llegan a ${h.n(H.passEach)} y el ensayo aprueba, pero el total es 44: le falta un punto. Un punto más en cualquier prueba lo termina, y como solo cuenta el puntaje más alto, puede repetir la prueba que le resulte más fácil. <strong>Marcus: 14, 12, 7, 13, 11, ensayo 4.</strong> El total es 57, muy por encima de ${h.n(H.passTotal)}, pero estudios sociales con 7 bloquea la credencial; es la única prueba por repetir. <strong>Rosa: 10, 11, 9, 12, 10, ensayo 1.</strong> Las cinco pruebas y el total de 52 aprueban, pero un ensayo de 1 no cumple la regla de escritura, así que debe repetir la prueba de escritura. El verificador de arriba da estas lecturas en un segundo.</p>
<h2>Cuándo llegan los puntajes</h2>
<p>hiset.org publica los puntajes oficiales tras un control de calidad: en promedio en ${h.n(H.scoreDays)} días hábiles para las pruebas de opción múltiple y en ${h.n(H.writingDays)} días hábiles para la escritura, porque el ensayo lo califican lectores. En papel el plazo puede ser mayor si el centro tarda en enviar las hojas de respuestas. Los puntajes aparecen en su cuenta del HiSET. Programe una repetición después de recibir el puntaje y no antes, porque el segundo intento solo se paga cuando sabe que lo necesita.</p>
<h2>Los dos informes de puntajes</h2>
<p>Cada intento genera un Individual Test Report con más detalle sobre esa prueba. Por encima está el Comprehensive Score Report, que muestra su puntaje más alto en cada prueba y si ya aprobó el examen completo. Se actualiza cada vez que hace una prueba nueva o repite una y mejora. Una repetición peor no baja nada, por eso repetir para subir el total tiene poco riesgo.</p>
<h2>Lo que cuesta repetir</h2>
<p>En las páginas de precios que hiset.org publica para cada estado, la tarifa completa solo se paga en el primer y el cuarto intento de una prueba; el segundo y el tercero cuestan solo la tarifa del centro, o la de supervisión en casa. En Ohio una prueba cuesta ${h.usd(OH.hc!)} en un centro, así que un segundo intento cuesta ${h.usd(OH.hc! - OH.tf!)}. Su estado fija cuándo puede repetir y cuántas veces al año: la ${h.a('ged-retake', 'calculadora de repeticiones')} da el precio de cada intento en su estado y la ${h.a('hiset', 'página de costos del HiSET')} enumera las tarifas estado por estado.</p>
<h2>Preparación universitaria y laboral</h2>
<p>Un puntaje de ${h.n(H.ccrEach)} o más en una prueba, y de ${h.n(H.ccrEssay)} o más en el ensayo, es el nivel de preparación universitaria y laboral. hiset.org lo explica como igualar o superar al ${h.n(H.ccrPct)} por ciento de los graduados de secundaria y no da más detalle sobre cómo se fijó. No hace falta para aprobar. Cada institución decide si lo acepta en lugar de un examen de ubicación, así que pregunte en admisiones antes de inscribirse.</p>
<h2>Puntajes del HiSET y del GED lado a lado</h2>
<p>El GED se califica de ${h.n(G.min)} a ${h.n(G.max)} y exige ${h.n(G.pass)} en cada una de sus cuatro materias, sin total. El HiSET añade la regla del total, así que las materias fuertes ayudan. Los puntajes nunca pasan de un examen al otro. El ${h.a('ged-passing-score', 'verificador de puntajes del GED')} hace la misma lectura para el GED, y las ${h.a('hiset-practice-test', 'preguntas de práctica del HiSET')} le permiten ponerse a prueba antes de reservar.</p>
<h2>De los puntajes a la credencial</h2>
<p>Aprobar las cinco pruebas es la parte del HiSET. Después su estado emite el diploma o certificado, a veces tras sus propias condiciones, como un examen de educación cívica o un puntaje fijado, y lo envía a la dirección de su cuenta del HiSET. Las copias y los expedientes oficiales se piden al estado, no a ETS.</p>`,
  },
});
