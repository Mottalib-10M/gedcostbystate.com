import { defineGuide } from '../../lib/page-types';
import { GED_STATES, GENERAL, byName } from '../../lib/data';
import { S } from '../../lib/stats';
import { list, st, usd, usd0, tot } from './_u';

const G = GENERAL.ged;
const g = S.ged;
const diff = (l: 'en' | 'es') => byName(l).filter((s) => s.ged && s.ged.o != null && s.ged.o !== s.ged.c).map((s) => [s[l], usd(s.ged!.c, l), usd(s.ged!.o!, l), s.ged!.o! > s.ged!.c ? (l === 'en' ? 'online costs more' : 'en línea cuesta más') : (l === 'en' ? 'online costs less' : 'en línea cuesta menos')]);
const higher = GED_STATES.filter((s) => s.ged!.o != null && s.ged!.o > s.ged!.c).length;
const lower = GED_STATES.filter((s) => s.ged!.o != null && s.ged!.o < s.ged!.c).length;

export default defineGuide({
  id: 'ged-online', group: 'cost', order: 5,
  tool: 'cost', toolArg: { st: 'TX', test: 'ged', mode: 'online' },
  related: ['ged-ready', 'ged-cost', 'ged-retake', 'ged-requirements', 'hiset', 'ged-practice-test'],
  sources: ['ged-online', 'ged-ready', 'ged-rules', 'ged-policies', 'ged-TX', 'ged-FL'],
  en: {
    slug: 'ged-test-online',
    nav: 'GED test online', card: 'Where it is offered, price, the GED Ready rule',
    title: 'GED Test Online 2026: States, Price and Requirements',
    description: 'GED test online in 2026: the 42 jurisdictions that offer it, where it costs more or less than a test center, the green GED Ready rule, equipment and retakes.',
    h1: 'GED test online: where you can take it and what it costs',
    intro: `The official GED can be taken from home in ${g.online} jurisdictions, with an online proctor. A green GED Ready score comes first.`,
    resume: `The official GED can be taken online from home in ${g.online} of the ${g.n} jurisdictions that offer the test, watched by an online proctor through your webcam. ${list(g.noOnline, 'en')} list no online GED and test only at centers. Before each online subject you must score green, ${G.readyBands.likely} or more, on the official GED Ready practice test within the previous ${G.readyGreenDays} days, which adds ${usd(G.readyPerSubject, 'en')} a subject unless you buy the four-subject bundle at ${usd(G.readyBundle, 'en')}. You need a computer with a webcam and a reliable connection, a private room with a closed door, a government-issued ID, and you must be in the United States during the test. The online price per subject is the same as the center price in most states, higher in ${higher}, such as Texas at ${usd(st('TX').ged!.o!, 'en')} against ${usd(st('TX').ged!.c, 'en')}, and lower in ${lower}, such as Indiana. Online retakes are always full price, and after two attempts at a subject online you wait 60 days. The calculator gives the online total for your state, GED Ready included.`,
    faqs: [
      { q: 'Is the online GED the real GED?', a: 'Yes, if you take it through ged.com: the online proctored test is the official GED, with the same subjects, scores and credential as at a test center. Sites that promise a GED diploma online without a proctored test are not the GED. The official test is booked in your ged.com account and costs what your state page lists.' },
      { q: 'Do I need GED Ready before an online GED?', a: `Yes. ged.com asks for a green GED Ready result, ${G.readyBands.likely} or more, within ${G.readyGreenDays} days before each subject you take online. At a test center most states do not require it. GED Ready costs ${usd(G.readyPerSubject, 'en')} per subject and is half the length of the real test.` },
      { q: 'Can I take the online GED from outside the United States?', a: 'Not as a US test taker. ged.com states that you must be physically located in the United States for the online test, and that a test taken outside the US borders is revoked with the loss of the fee. People abroad test through the international GED program instead.' },
      { q: 'What happens if I fail an online GED subject?', a: 'You can book again at full price; online retakes get no discount. ged.com allows one online retake before a 60-day wait, so after two online attempts at the same subject you wait 60 days. Moving the retake to a test center gives the discounted price where your state offers it.' },
    ],
    body: (h) => `
<h2>What you need</h2>
<p>ged.com lists four conditions. A computer with a webcam and a reliable internet connection, checked with a system test before you book. A private room with four walls and a closed door, with nobody else inside once the test has started. A government-issued ID, verified at check-in. And a green GED Ready score within ${h.n(G.readyGreenDays)} days before each subject you take online. On test day you log in 30 minutes early and go through check-in steps that verify your system, your ID and your workspace. Phones, headphones and watches must be out of reach, and you may not leave the webcam view.</p>
<h2>Where online costs differently</h2>
<p>In most states the online price per subject equals the center price. The table lists the states where it does not.</p>
${h.table(['State', 'Test center', 'Online', ''], diff('en'), 'GED price per subject where the online and center prices differ, from the state pages of ged.com.', ['l', 'r', 'r', 'l'])}
${h.mini('cost', { p: ['st', 'mode'], d: { st: 'AR', mode: 'online' }, t: 'Online or test center in your state' })}
<p>The gaps can be large. In Arkansas a subject costs ${h.usd(st('AR').ged!.c)} at a center and ${h.usd(st('AR').ged!.o!)} online, so the whole test is ${h.usd0(tot('AR'))} at a center against ${h.usd0(tot('AR', 'ged', 'online'))} online. In Washington, D.C. the public code applies only at centers. In Mississippi the state pays center attempts but not online ones. Where the state pays for online testing too, as Pennsylvania and Alaska do for the first attempt, the online test is free as well.</p>
<h2>The real cost of testing online</h2>
<p>Add the GED Ready practice tests to the online price, because you cannot book without them: ${h.usd(G.readyPerSubject)} a subject, or ${h.usd(G.readyBundle)} for all four. One purchase gives one attempt, so a yellow or red GED Ready result means buying another before you can book that subject online. Then count retakes at full price. In Texas, for example, four online subjects cost ${h.usd0(tot('TX', 'ged', 'online'))}, the GED Ready bundle brings it to ${h.usd0(tot('TX', 'ged', 'online') + G.readyBundle)}, and a failed subject adds another ${h.usd(st('TX').ged!.o!)}. At a Texas center the same subject would be retaken for ${h.usd(st('TX').ged!.rc!)}.</p>
<h2>Booking an online subject, step by step</h2>
<p>Run the system test on the computer you will use. Buy GED Ready for the subject and take it in one sitting; a result of ${h.n(G.readyBands.likely)} or more turns green. Within ${h.n(G.readyGreenDays)} days, log in to ged.com, choose online testing, pick the subject and a time, and pay the online price of your state. On the day, clear the desk, close the door and log in half an hour early. Your score appears in your account soon after the test, as at a center. Repeat the cycle for each subject: a green result in math does not open the online test in science.</p>
<h2>Underage testers online</h2>
<p>Most state pages add a rule for testers under 18: a parent or guardian must be present at the pre-test check-in to give consent and authorize the recording, or the session is revoked. Age waivers still apply as they do at a center. The ${h.a('ged-requirements', 'requirements page')} lists each state’s age rules.</p>
<h2>Online or center: how to decide</h2>
<p>Online testing saves travel and lets you pick a time that suits you, which matters for people who work shifts or live far from a center. It costs more once GED Ready is counted, retakes are never discounted, and the room rules are strict. A test center costs less in most states for anyone who might retake a subject, and it is the only option in ${h.n(g.noOnline.length)} jurisdictions. Many people mix both, taking the subjects they feel sure about online and the hardest one at a center, where a retake is cheaper.</p>`,
  },
  es: {
    slug: 'examen-ged-en-linea',
    nav: 'GED en línea', card: 'Dónde se ofrece, precio, la regla de GED Ready',
    title: 'Examen GED en línea 2026: estados, precio y requisitos',
    description: 'Examen GED en línea en 2026: las 42 jurisdicciones que lo ofrecen, dónde cuesta más o menos que en un centro, la regla de GED Ready, equipo y repeticiones.',
    h1: 'Examen GED en línea: dónde se puede tomar y cuánto cuesta',
    intro: `El GED oficial se puede tomar desde casa en ${g.online} jurisdicciones, con un supervisor en línea. Primero hace falta un resultado verde en GED Ready.`,
    resume: `El GED oficial se puede tomar en línea desde casa en ${g.online} de las ${g.n} jurisdicciones que ofrecen el examen, vigilado por un supervisor a través de su cámara. ${list(g.noOnline, 'es')} no indican GED en línea y solo examinan en centros. Antes de cada materia en línea hay que sacar verde, ${G.readyBands.likely} o más, en el examen de práctica oficial GED Ready dentro de los ${G.readyGreenDays} días anteriores, lo que suma ${usd(G.readyPerSubject, 'es')} por materia salvo que compre el paquete de cuatro a ${usd(G.readyBundle, 'es')}. Necesita una computadora con cámara y una conexión estable, una habitación privada con la puerta cerrada, una identificación oficial, y estar en Estados Unidos durante el examen. El precio por materia en línea es el mismo que en un centro en la mayoría de los estados, más alto en ${higher}, como Texas con ${usd(st('TX').ged!.o!, 'es')} frente a ${usd(st('TX').ged!.c, 'es')}, y más bajo en ${lower}, como Indiana. Repetir en línea siempre cuesta el precio completo, y tras dos intentos de una materia en línea hay que esperar 60 días. La calculadora da el total en línea para su estado, GED Ready incluido.`,
    faqs: [
      { q: '¿El GED en línea es el GED de verdad?', a: 'Sí, si lo toma a través de ged.com: el examen supervisado en línea es el GED oficial, con las mismas materias, puntajes y credencial que en un centro. Los sitios que prometen un diploma GED en línea sin examen supervisado no son el GED. El examen oficial se reserva en su cuenta de ged.com y cuesta lo que indica la página de su estado.' },
      { q: '¿Necesito GED Ready antes del GED en línea?', a: `Sí. ged.com pide un resultado verde en GED Ready, ${G.readyBands.likely} o más, dentro de los ${G.readyGreenDays} días previos a cada materia que tome en línea. En un centro la mayoría de los estados no lo exigen. GED Ready cuesta ${usd(G.readyPerSubject, 'es')} por materia y dura la mitad que el examen real.` },
      { q: '¿Puedo tomar el GED en línea desde fuera de Estados Unidos?', a: 'No como examinado de Estados Unidos. ged.com indica que hay que estar físicamente en Estados Unidos para el examen en línea, y que un examen tomado fuera del país se anula con la pérdida de la tarifa. Quien vive en el extranjero se examina a través del programa GED internacional.' },
      { q: '¿Qué pasa si repruebo una materia del GED en línea?', a: 'Puede volver a reservar a precio completo; las repeticiones en línea no tienen descuento. ged.com permite una repetición en línea antes de una espera de 60 días, así que tras dos intentos en línea de la misma materia hay que esperar 60 días. Pasar la repetición a un centro da el precio con descuento donde su estado lo ofrece.' },
    ],
    body: (h) => `
<h2>Qué necesita</h2>
<p>ged.com pone cuatro condiciones. Una computadora con cámara y una conexión a internet estable, comprobadas con una prueba del sistema antes de reservar. Una habitación privada de cuatro paredes con la puerta cerrada, sin nadie más dentro una vez empezado el examen. Una identificación oficial, que se verifica al registrarse. Y un resultado verde en GED Ready dentro de los ${h.n(G.readyGreenDays)} días previos a cada materia que tome en línea. El día del examen se conecta 30 minutos antes y sigue los pasos de registro que verifican su equipo, su identificación y su espacio. El teléfono, los auriculares y el reloj deben quedar fuera de su alcance, y no puede salir del campo de la cámara.</p>
<h2>Dónde el precio en línea cambia</h2>
<p>En la mayoría de los estados el precio por materia en línea es igual al de un centro. La tabla recoge los estados donde no lo es.</p>
${h.table(['Estado', 'Centro', 'En línea', ''], diff('es'), 'Precio del GED por materia donde el precio en línea y el del centro no coinciden, según las páginas estatales de ged.com.', ['l', 'r', 'r', 'l'])}
${h.mini('cost', { p: ['st', 'mode'], d: { st: 'AR', mode: 'online' }, t: 'En línea o en un centro en su estado' })}
<p>Las diferencias pueden ser grandes. En Arkansas una materia cuesta ${h.usd(st('AR').ged!.c)} en un centro y ${h.usd(st('AR').ged!.o!)} en línea, así que el examen completo cuesta ${h.usd0(tot('AR'))} en un centro frente a ${h.usd0(tot('AR', 'ged', 'online'))} en línea. En Washington D. C. el código público solo vale en los centros. En Misisipi el estado paga los intentos en un centro pero no en línea. Donde el estado también paga el examen en línea, como Pensilvania y Alaska en el primer intento, el examen en línea también es gratis.</p>
<h2>El costo real de examinarse en línea</h2>
<p>Sume al precio en línea los exámenes de práctica GED Ready, porque sin ellos no se puede reservar: ${h.usd(G.readyPerSubject)} por materia, o ${h.usd(G.readyBundle)} las cuatro. Una compra da un intento, así que un resultado amarillo o rojo en GED Ready obliga a comprar otro antes de reservar esa materia en línea. Cuente después las repeticiones a precio completo. En Texas, por ejemplo, cuatro materias en línea cuestan ${h.usd0(tot('TX', 'ged', 'online'))}, el paquete GED Ready lo lleva a ${h.usd0(tot('TX', 'ged', 'online') + G.readyBundle)}, y una materia reprobada suma otros ${h.usd(st('TX').ged!.o!)}. En un centro de Texas esa misma materia se repetiría por ${h.usd(st('TX').ged!.rc!)}.</p>
<h2>Reservar una materia en línea, paso a paso</h2>
<p>Haga la prueba del sistema en la computadora que usará. Compre GED Ready para la materia y hágalo de una sola vez; un resultado de ${h.n(G.readyBands.likely)} o más sale en verde. Dentro de los ${h.n(G.readyGreenDays)} días siguientes, entre en ged.com, elija el examen en línea, la materia y una hora, y pague el precio en línea de su estado. Ese día, despeje la mesa, cierre la puerta y conéctese media hora antes. Su puntaje aparece en su cuenta poco después del examen, como en un centro. Repita el ciclo para cada materia: un verde en matemáticas no abre el examen en línea de ciencias.</p>
<h2>Menores de edad en línea</h2>
<p>La mayoría de las páginas estatales añaden una regla para quien tiene menos de 18 años: un padre o tutor debe estar presente en el registro previo al examen para dar su consentimiento y autorizar la grabación, o la sesión se anula. Los permisos de edad se aplican igual que en un centro. La ${h.a('ged-requirements', 'página de requisitos')} da las reglas de edad de cada estado.</p>
<h2>En línea o en un centro: cómo decidir</h2>
<p>Examinarse en línea ahorra el viaje y permite elegir una hora cómoda, algo importante para quien trabaja por turnos o vive lejos de un centro. Cuesta más al contar GED Ready, las repeticiones nunca tienen descuento y las reglas de la habitación son estrictas. Un centro cuesta menos en la mayoría de los estados para quien podría repetir una materia, y es la única opción en ${h.n(g.noOnline.length)} jurisdicciones. Muchas personas combinan ambos: toman en línea las materias que dominan y la más difícil en un centro, donde repetir es más barato.</p>`,
  },
});
