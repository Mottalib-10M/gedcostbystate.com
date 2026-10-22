import { defineGuide } from '../../lib/page-types';
import { GENERAL } from '../../lib/data';

const G = GENERAL.ged;

export default defineGuide({
  id: 'ged-classes', group: 'prep', order: 17,
  tool: 'cost', toolArg: { st: 'TN', qualify: 'yes' },
  related: ['free-ged', 'how-long-ged', 'ged-practice-test', 'ged-ready', 'ged-cost', 'hiset'],
  sources: ['ged-classes', 'ged-ready', 'ged-TX', 'ged-TN', 'ged-WV', 'hiset-TN', 'hiset-NM'],
  en: {
    slug: 'ged-classes',
    nav: 'GED classes', card: 'In-person, online, free: and the states where class pays the test',
    title: 'GED Classes 2026: Free Prep and When Class Pays Your Test',
    description: 'GED classes in 2026: in-person, online and free adult education, what a class gives you, and the states where joining a program gets the test paid for you.',
    h1: 'GED classes: free prep, online options, and when a class pays the test',
    intro: 'A GED class is more than lessons: in several states, joining an adult education program is the way to have the test itself paid for. The calculator shows that effect.',
    resume: `ged.com counts more than 6,000 GED prep centers worldwide and lists them through a free ged.com account: enter a city or zip code and you get contact details for the nearby centers. What a class brings, in ged.com’s words, is experienced teachers, group study, flexible schedules for people who work full time, practice tests and reviews, and help with career and college planning. Online classes exist for those who cannot attend in person. There is also a money side: in several states, enrolling in an adult education program is the route to free or subsidized testing. Texas pays the test fees of eligible people aged 21 and older through a Texas Workforce Commission Adult Education and Literacy program, while funding lasts. Tennessee pays the GED by voucher for people who attend a local adult education program, and its HiSET voucher program, also through adult education, covers all exam costs. In West Virginia the test is free but scheduled through a local adult learning program. The calculator above shows the cost with and without the state program in your state.`,
    faqs: [
      { q: 'Are GED classes free?', a: 'Many are. Adult education programs run by school districts, community colleges and libraries often charge nothing or a small fee, while private online courses are paid. Use the class finder in a free ged.com account, then ask each center about cost, schedule and whether enrolling makes you eligible for a state testing voucher.' },
      { q: 'How do I find GED classes near me?', a: 'Open a free account on ged.com and search by city, state or zip code: it lists prep centers with their contact details. Your state adult education office and local community college also list programs. ged.com says it counts more than 6,000 prep centers worldwide.' },
      { q: 'Do I have to take a class to take the GED?', a: 'Not in most states: you can study alone and book the test directly. But some states tie free testing or age waivers to a program. Texas, Tennessee and West Virginia, for example, route free testing through adult education. Check your state page before deciding to study alone.' },
      { q: 'How long do GED classes take?', a: 'It depends on the program and your starting level. ged.com puts the average time to get a GED at about 2 to 4 months, and describes two common paths: one subject at a time for about three weeks each, or all four for about three months before testing.' },
    ],
    body: (h) => `
<h2>In-person, online, or on your own</h2>
<p><strong>In-person classes</strong> give structure, a teacher who can read your practice scores, and other students on the same path; they suit people who need a fixed schedule to keep going. <strong>Online classes</strong> keep a teacher but drop the commute, and ged.com notes they work on any mobile device. <strong>Studying alone</strong> with books, videos and practice tests costs least and fits irregular hours, but nobody notices if you drift. Many people mix the three: a class for the hardest subject, self-study for the rest.</p>
<h2>Where a class pays the test</h2>
<p>This is the practical reason to look at adult education even if you study well alone. The ${h.a('free-ged', 'free GED page')} lists every state program; the ones tied to a class or program include:</p>
<ul>
<li><strong>Texas</strong>: the HSE Subsidy Program pays the fees of eligible people aged 21 and older, through a Texas Workforce Commission Adult Education and Literacy program, while funding lasts.</li>
<li><strong>Tennessee</strong>: GED vouchers for people attending local adult education; the HiSET voucher program covers all exam costs.</li>
<li><strong>West Virginia</strong>: no cost to the tester, with scheduling through a local adult learning or Option Pathway program.</li>
<li><strong>New Mexico</strong>: HiSET vouchers through the state office or adult education providers.</li>
</ul>
${h.mini('cost', { p: ['st', 'qualify'], d: { st: 'TX', qualify: 'yes', age: 30 }, t: 'Your test cost if you join the state program' })}
<h2>What to ask a center before signing up</h2>
<p>Is the class free, and are books included? Which days and hours, and can you join mid-session? Does it give the official GED Ready practice test, and who pays for it? Does enrolling make you eligible for a state testing voucher, and is there a minimum number of hours? Can the teacher help you with the paperwork for an age waiver if you are under the usual age? The answers decide whether the class saves you money as well as time.</p>
<h2>How long it usually takes</h2>
<p>ged.com puts the average at about 2 to 4 months. It describes two paths: studying one subject for about three weeks and then taking that test, or studying all four for about three months and testing in one day. The first spreads the cost and gives early wins; the second suits people with a fixed date. Our ${h.a('how-long-ged', 'timeline calculator')} turns your own weeks of study into a finish date, waiting periods included.</p>
<h2>Comparing two offers</h2>
<p>If two programs are within reach, compare them on the same four points: total cost including books and practice tests, hours a week, how progress is measured, and what happens at the end (does the program book the test, pay it, or neither). A free class two evenings a week that leads to a paid voucher can be worth more than a paid online course with no link to the state program.</p>
<h2>Testing from a class</h2>
<p>Teachers usually decide with you when a subject is ready, often with a practice test. If you go online afterwards, you will need a green ${h.a('ged-ready', 'GED Ready')} score within ${h.n(G.readyGreenDays)} days of each subject. At a center, the class may book the test with you; some centers are test sites themselves.</p>
<h2>If you cannot attend a class</h2>
<p>Work, child care or transport can make a weekly class impossible. In that case, ask the local adult education office whether it offers distance learning with a teacher by phone or video, which some programs do, and whether its voucher still applies. Then build your own routine: a fixed hour on fixed days, one subject at a time, and a practice test before each booking. Our free ${h.a('ged-practice-test', 'practice questions')} are a starting point to find the subject that needs a teacher most.</p>`,
  },
  es: {
    slug: 'clases-ged',
    nav: 'Clases de GED', card: 'Presenciales, en línea, gratis: y los estados donde la clase paga el examen',
    title: 'Clases de GED 2026: gratis, en línea y cuándo pagan examen',
    description: 'Clases de GED en 2026: presenciales, en línea o gratis, qué aporta una clase y los estados donde un programa de educación para adultos le paga el examen.',
    h1: 'Clases de GED: preparación gratis, en línea, y cuándo la clase paga el examen',
    intro: 'Una clase de GED es más que lecciones: en varios estados, inscribirse en un programa de educación para adultos es la forma de que le paguen el examen. La calculadora muestra ese efecto.',
    resume: `ged.com cuenta más de 6,000 centros de preparación para el GED en el mundo y los muestra con una cuenta gratuita de ged.com: se escribe una ciudad o un código postal y aparecen los datos de contacto de los centros cercanos. Lo que aporta una clase, según ged.com, son profesores con experiencia, estudio en grupo, horarios flexibles para quien trabaja a tiempo completo, exámenes de práctica y repasos, y ayuda para planificar estudios y empleo. Hay clases en línea para quien no puede asistir en persona. Hay además una cuestión de dinero: en varios estados, inscribirse en un programa de educación para adultos es lo que da acceso a un examen gratuito o subvencionado. Texas paga las tarifas del examen a las personas elegibles de 21 años o más a través de un programa de educación y alfabetización de adultos de la Texas Workforce Commission, mientras haya fondos. Tennessee paga el GED con vales a quien asiste a un programa local de educación para adultos, y su programa de vales del HiSET, también por esa vía, cubre todos los costos. En Virginia Occidental el examen es gratis, pero se programa a través de un programa local de aprendizaje para adultos. La calculadora de arriba muestra el costo con y sin el programa de su estado.`,
    faqs: [
      { q: '¿Las clases de GED son gratis?', a: 'Muchas sí. Los programas de educación para adultos de distritos escolares, colegios comunitarios y bibliotecas suelen ser gratis o cobrar poco, mientras que los cursos privados en línea son de pago. Use el buscador de clases de una cuenta gratuita de ged.com y pregunte en cada centro por el costo, el horario y si inscribirse da derecho a un vale estatal.' },
      { q: '¿Cómo encuentro clases de GED cerca de mí?', a: 'Abra una cuenta gratuita en ged.com y busque por ciudad, estado o código postal: aparecen los centros de preparación con sus datos de contacto. La oficina de educación para adultos de su estado y el colegio comunitario local también publican sus programas. ged.com dice contar más de 6,000 centros en el mundo.' },
      { q: '¿Hay que tomar una clase para hacer el GED?', a: 'En la mayoría de los estados no: puede estudiar solo y reservar el examen directamente. Pero algunos estados vinculan el examen gratuito o las dispensas de edad a un programa. Texas, Tennessee y Virginia Occidental, por ejemplo, canalizan el examen gratuito a través de la educación para adultos. Revise la página de su estado antes de decidir.' },
      { q: '¿Cuánto duran las clases de GED?', a: 'Depende del programa y de su nivel de partida. ged.com sitúa el tiempo medio para obtener el GED en unos 2 a 4 meses, y describe dos caminos habituales: una materia cada vez, unas tres semanas por materia, o las cuatro durante unos tres meses antes de examinarse.' },
    ],
    body: (h) => `
<h2>Presencial, en línea o por su cuenta</h2>
<p><strong>Las clases presenciales</strong> dan estructura, un profesor que sabe leer sus puntajes de práctica y otros alumnos en el mismo camino; convienen a quien necesita un horario fijo para no dejarlo. <strong>Las clases en línea</strong> mantienen al profesor sin el desplazamiento, y ged.com indica que funcionan en cualquier dispositivo móvil. <strong>Estudiar solo</strong> con libros, videos y exámenes de práctica cuesta menos y se adapta a horarios irregulares, pero nadie nota si uno se desvía. Muchos combinan las tres: una clase para la materia más difícil y estudio propio para el resto.</p>
<h2>Dónde una clase paga el examen</h2>
<p>Esta es la razón práctica para mirar la educación para adultos aunque estudie bien solo. La ${h.a('free-ged', 'página del GED gratis')} enumera todos los programas estatales; los que dependen de una clase o programa incluyen:</p>
<ul>
<li><strong>Texas</strong>: el HSE Subsidy Program paga las tarifas de las personas elegibles de 21 años o más, a través de un programa de educación y alfabetización de adultos de la Texas Workforce Commission, mientras haya fondos.</li>
<li><strong>Tennessee</strong>: vales del GED para quien asiste a la educación para adultos local; el programa de vales del HiSET cubre todos los costos.</li>
<li><strong>Virginia Occidental</strong>: sin costo para el candidato, con la reserva a través de un programa local de aprendizaje para adultos u Option Pathway.</li>
<li><strong>Nuevo México</strong>: vales del HiSET a través de la oficina estatal o de los proveedores de educación para adultos.</li>
</ul>
${h.mini('cost', { p: ['st', 'qualify'], d: { st: 'TX', qualify: 'yes', age: 30 }, t: 'Su costo si se inscribe en el programa del estado' })}
<h2>Qué preguntar a un centro antes de inscribirse</h2>
<p>¿La clase es gratis y los libros están incluidos? ¿Qué días y horas, y se puede entrar a mitad de curso? ¿Da el examen de práctica oficial GED Ready y quién lo paga? ¿Inscribirse da derecho a un vale estatal para el examen, y hay un mínimo de horas? ¿Puede el profesor ayudar con los trámites de una dispensa de edad si usted es menor de la edad habitual? Las respuestas deciden si la clase le ahorra dinero además de tiempo.</p>
<h2>Cuánto suele llevar</h2>
<p>ged.com sitúa la media en unos 2 a 4 meses. Describe dos caminos: estudiar una materia unas tres semanas y luego hacer ese examen, o estudiar las cuatro durante unos tres meses y examinarse en un solo día. El primero reparte el costo y da logros pronto; el segundo conviene a quien tiene una fecha fija. Nuestra ${h.a('how-long-ged', 'calculadora de plazos')} convierte sus semanas de estudio en una fecha de fin, con los periodos de espera incluidos.</p>
<h2>Comparar dos ofertas</h2>
<p>Si tiene dos programas a su alcance, compárelos en los mismos cuatro puntos: costo total con libros y exámenes de práctica, horas por semana, cómo se mide el progreso y qué pasa al final (si el programa reserva el examen, lo paga o ninguna de las dos cosas). Una clase gratuita dos tardes por semana que da acceso a un vale puede valer más que un curso en línea de pago sin vínculo con el programa estatal.</p>
<h2>Examinarse desde una clase</h2>
<p>Los profesores suelen decidir con usted cuándo una materia está lista, a menudo con un examen de práctica. Si después se examina en línea, necesitará un resultado verde de ${h.a('ged-ready', 'GED Ready')} en los ${h.n(G.readyGreenDays)} días previos a cada materia. En un centro, la clase puede reservar el examen con usted; algunos centros son a la vez sede de examen.</p>
<h2>Si no puede asistir a una clase</h2>
<p>El trabajo, el cuidado de los hijos o el transporte pueden hacer imposible una clase semanal. En ese caso, pregunte a la oficina local de educación para adultos si ofrece aprendizaje a distancia con un profesor por teléfono o video, como hacen algunos programas, y si su vale sigue valiendo. Luego construya su propia rutina: una hora fija en días fijos, una materia cada vez y un examen de práctica antes de cada reserva. Nuestras ${h.a('ged-practice-test', 'preguntas de práctica gratis')} son un punto de partida para encontrar la materia que más necesita un profesor.</p>`,
  },
});
