import { defineGuide } from '../../lib/page-types';
import { GENERAL } from '../../lib/data';
import { S } from '../../lib/stats';
import { st, list } from './_u';

const G = GENERAL.ged;
const g = st('NY').ged!;

export default defineGuide({
  id: 'new-york', group: 'states', order: 43, state: 'NY',
  tool: 'eligible', toolArg: { st: 'NY', age: 18 },
  related: ['free-ged', 'ged-requirements', 'how-long-ged', 'ged-retake', 'ged-passing-score', 'ohio'],
  sources: ['ged-NY', 'ged-policies', 'ged-scheduling'],
  en: {
    slug: 'ged-new-york',
    nav: 'GED in New York', card: 'Free for every subject, age 19, a 60-day wait after a fail',
    title: 'GED New York 2026: Free Test, Age 19, 60-Day Retake Rule',
    description: `GED in New York in 2026: free for every subject, age ${g.age} or approval from 16, 30 days of residency, a ${g.w1}-day wait after a fail, ${g.cap} tries a year. Check now.`,
    h1: 'GED in New York: free, but with the strictest calendar',
    intro: `New York pays every GED subject. The rules are about age and time: enter your age to see whether you can book now.`,
    resume: `New York State does not charge test takers for GED subjects: the state pays, first attempts and retakes alike, and it is one of the ${S.ged.free.length} jurisdictions where the GED costs nothing. The conditions are stricter than elsewhere. You must be ${g.age} to test without approval; at 16, 17 or 18 you need an Age Eligibility form signed by an authorized official of an institution and mailed to the NYSED High School Equivalency Office, which can take a week to approve once received. You must have lived in New York for at least 30 calendar days and prove it at the test. After a failed subject you wait ${g.w1} days before rescheduling it, you may take a subject at most ${g.cap} times per calendar year, and you may not retest a subject you have already passed to raise the score. A late cancellation or missed appointment counts as a missed test and also triggers the ${g.w1}-day wait. The credential is the New York State High School Equivalency Diploma, issued by the New York State Education Department and mailed automatically 8 to 10 weeks after your last subject.`,
    faqs: [
      { q: 'Is the GED free in New York?', a: 'Yes. New York State does not charge test takers for GED subtests at a testing center, retakes included. You still need an account on ged.com to book. The only costs you may choose are optional ones, such as the GED Ready practice test, which New York does not require before testing at a center.' },
      { q: 'Can I take the GED at 18 in New York?', a: `Only with approval. The standard age in New York is ${g.age}. At 16, 17 or 18 you send an Age Eligibility form, signed by an authorized official of an institution, to the NYSED High School Equivalency Office. Approval can take up to a week after it arrives, and the mail itself can take about two weeks.` },
      { q: 'How long do I wait to retake a GED subject in New York?', a: `${g.w1} days after a failed subject before you can reschedule it, and you may take a subject at most ${g.cap} times in a calendar year. A cancellation less than 24 hours ahead, or a no-show, counts as a missed test and brings the same ${g.w1}-day wait. Five missed appointments lead to a 180-day scheduling ban.` },
      { q: 'When will I get my New York GED diploma?', a: 'You do not need to request it. The New York State High School Equivalency Diploma and transcript are mailed automatically to the address in your GED account 8 to 10 weeks after testing. Duplicates and later transcripts are ordered from the NYSED High School Equivalency Office.' },
    ],
    body: (h) => `
<h2>New York rules at a glance</h2>
${h.table(['Rule', 'New York'], [
  ['Price per subject', 'None, the state pays'],
  ['Age with no approval', `${g.age}`],
  ['Ages 16 to 18', 'Age Eligibility form, approval by NYSED'],
  ['Residency', 'At least 30 calendar days, proven at the test'],
  ['Wait after a failed subject', `${g.w1} days`],
  ['Attempts per subject per calendar year', `${g.cap}`],
  ['Retest a passed subject', 'Not allowed'],
], 'Read on the New York page of ged.com.', ['l', 'l'])}
${h.mini('plan', { p: ['st', 'parts', 'fails'], d: { st: 'NY', parts: 4, weeks: 4, fails: 1 }, t: 'Your finish date with one retake' })}
<h2>The calendar is the real cost</h2>
<p>Money is not the constraint in New York; time is. In most states a failed subject can be retaken the next week. In New York the ${h.n(g.w1)}-day wait applies from the first fail, so a single retake pushes the finish date back by two months, and a third failure in a year closes that subject until the next calendar year. Missing an appointment has the same effect as failing: cancel at least 24 hours ahead, or you lose ${h.n(g.w1)} days. The planner above turns your study weeks and expected retakes into a date. Because you cannot retest a passed subject, there is no point booking a subject early just to try it: book it when practice scores say you are ready.</p>
<h2>Proving age and residency</h2>
<p>Bring a government ID with a New York address. If your ID shows another state or no address, as a passport does, add a dated document proving New York residency, such as a utility bill, lease or tax record, dated at least 30 days before the appointment. Out-of-state residents cannot receive the New York diploma. If you are 16, 17 or 18, start the Age Eligibility form well before you plan to test: it is signed by an authorized official of an institution, mailed, and approved by the state, which together can take three weeks.</p>
<h2>Preparing without a class</h2>
<p>New York does not require a class or instruction at an adult education center, and it does not require GED Ready before testing at a center, though it recommends preparation if you need support. Since each failure costs ${h.n(g.w1)} days, a practice test is worth more here than anywhere: our ${h.a('ged-practice-test', 'practice questions')} are free, and the official GED Ready costs ${h.usd(G.readyPerSubject)} a subject. The ${h.a('ged-passing-score', 'score checker')} shows how far a practice score is from ${h.n(G.pass)}.</p>
<h2>Three timelines</h2>
<p><strong>Four subjects, four weeks of study each, no fail:</strong> about sixteen weeks from the first study day to the diploma being mailed, which itself takes 8 to 10 more weeks. <strong>The same plan with one failed subject:</strong> add the ${h.n(g.w1)}-day wait, so about two months more. <strong>One subject failed three times in the same year:</strong> it cannot be taken a fourth time until January, whatever your readiness. In every case the price stays at zero; only the date moves.</p>
<h2>Old scores and language</h2>
<p>Subjects passed in 2002 or later are kept and do not need to be taken again, which matters if you stopped years ago. All four subjects can be booked on the same day if a center's hours allow, with one appointment each. You can test in English or Spanish and combine the two; the diploma is issued in the language you used for Reasoning Through Language Arts. Free GED states are compared on the ${h.a('free-ged', 'free GED page')}; ${list(S.ged.free.filter((x) => x !== 'NY'), 'en')} are the others.</p>`,
  },
  es: {
    slug: 'ged-en-nueva-york',
    nav: 'GED en Nueva York', card: 'Gratis en todas las materias, 19 años, 60 días de espera tras suspender',
    title: 'GED en Nueva York 2026: examen gratis, 19 años y 60 días',
    description: `GED en Nueva York en 2026: gratis en todas las materias, ${g.age} años o 16 con permiso, 30 días de residencia, ${g.w1} días de espera y ${g.cap} intentos al año. Compruebe.`,
    h1: 'GED en Nueva York: gratis, pero con el calendario más estricto',
    intro: `Nueva York paga todas las materias del GED. Las reglas tienen que ver con la edad y el tiempo: escriba su edad para ver si puede reservar ya.`,
    resume: `El estado de Nueva York no cobra a quien se examina por las materias del GED: el estado paga, primeros intentos y repeticiones por igual, y es una de las ${S.ged.free.length} jurisdicciones donde el GED no cuesta nada. Las condiciones son más estrictas que en otros lugares. Hay que tener ${g.age} años para examinarse sin aprobación; a los 16, 17 o 18 hace falta un Age Eligibility form firmado por un responsable autorizado de una institución y enviado por correo a la NYSED High School Equivalency Office, que puede tardar una semana en aprobarlo tras recibirlo. Hay que vivir en Nueva York desde hace al menos 30 días naturales y probarlo en el examen. Tras una materia suspendida se esperan ${g.w1} días antes de volver a programarla, una materia puede hacerse como máximo ${g.cap} veces por año natural, y no se puede repetir una materia aprobada para subir el puntaje. Una cancelación tardía o una cita perdida cuenta como examen perdido y también activa la espera de ${g.w1} días. La credencial es el New York State High School Equivalency Diploma, que emite el New York State Education Department y se envía automáticamente por correo de 8 a 10 semanas después de la última materia.`,
    faqs: [
      { q: '¿Es gratis el GED en Nueva York?', a: 'Sí. El estado de Nueva York no cobra a quien se examina por las materias del GED en un centro, repeticiones incluidas. Aun así hace falta una cuenta en ged.com para reservar. Los únicos gastos posibles son opcionales, como el examen de práctica GED Ready, que Nueva York no exige antes de examinarse en un centro.' },
      { q: '¿Puedo tomar el GED a los 18 años en Nueva York?', a: `Solo con aprobación. La edad general en Nueva York es ${g.age} años. A los 16, 17 o 18 se envía un Age Eligibility form, firmado por un responsable autorizado de una institución, a la NYSED High School Equivalency Office. La aprobación puede tardar hasta una semana tras su llegada, y el correo en sí puede tardar unas dos semanas.` },
      { q: '¿Cuánto hay que esperar para repetir una materia del GED en Nueva York?', a: `${g.w1} días tras una materia suspendida antes de poder programarla de nuevo, y una materia puede hacerse como máximo ${g.cap} veces por año natural. Una cancelación con menos de 24 horas de antelación, o una ausencia, cuenta como examen perdido y trae la misma espera de ${g.w1} días. Cinco citas perdidas llevan a un bloqueo de 180 días.` },
      { q: '¿Cuándo recibiré mi diploma del GED de Nueva York?', a: 'No hace falta pedirlo. El New York State High School Equivalency Diploma y el expediente se envían automáticamente por correo a la dirección de su cuenta del GED de 8 a 10 semanas después del examen. Los duplicados y los expedientes posteriores se piden a la NYSED High School Equivalency Office.' },
    ],
    body: (h) => `
<h2>Las reglas de Nueva York de un vistazo</h2>
${h.table(['Regla', 'Nueva York'], [
  ['Precio por materia', 'Ninguno, paga el estado'],
  ['Edad sin aprobación', `${g.age}`],
  ['De 16 a 18 años', 'Age Eligibility form, aprobación de NYSED'],
  ['Residencia', 'Al menos 30 días naturales, probados en el examen'],
  ['Espera tras una materia suspendida', `${g.w1} días`],
  ['Intentos por materia y año natural', `${g.cap}`],
  ['Repetir una materia aprobada', 'No permitido'],
], 'Leído en la página de Nueva York de ged.com.', ['l', 'l'])}
${h.mini('plan', { p: ['st', 'parts', 'fails'], d: { st: 'NY', parts: 4, weeks: 4, fails: 1 }, t: 'Su fecha de fin con una repetición' })}
<h2>El calendario es el verdadero costo</h2>
<p>En Nueva York el límite no es el dinero, es el tiempo. En la mayoría de los estados una materia suspendida puede repetirse a la semana siguiente. En Nueva York la espera de ${h.n(g.w1)} días se aplica desde el primer suspenso, así que una sola repetición retrasa la fecha de fin dos meses, y un tercer suspenso en un año cierra esa materia hasta el año natural siguiente. Perder una cita tiene el mismo efecto que suspender: cancele con al menos 24 horas de antelación o perderá ${h.n(g.w1)} días. El planificador de arriba convierte sus semanas de estudio y las repeticiones previstas en una fecha. Como no se puede repetir una materia aprobada, no sirve de nada reservar pronto una materia solo para probar: resérvela cuando los puntajes de práctica digan que está listo.</p>
<h2>Probar la edad y la residencia</h2>
<p>Lleve una identificación oficial con dirección en Nueva York. Si su identificación muestra otro estado o ninguna dirección, como un pasaporte, añada un documento con fecha que pruebe la residencia en Nueva York, como una factura de servicios, un contrato de alquiler o un documento fiscal, con fecha de al menos 30 días antes de la cita. Quien reside fuera del estado no puede recibir el diploma de Nueva York. Si tiene 16, 17 o 18 años, empiece el Age Eligibility form mucho antes de la fecha prevista: lo firma un responsable autorizado de una institución, se envía por correo y lo aprueba el estado, lo que en conjunto puede tardar tres semanas.</p>
<h2>Prepararse sin clase</h2>
<p>Nueva York no exige clase ni instrucción en un centro de educación para adultos, ni GED Ready antes de examinarse en un centro, aunque recomienda prepararse si necesita apoyo. Como cada suspenso cuesta ${h.n(g.w1)} días, un examen de práctica vale aquí más que en ningún otro lugar: nuestras ${h.a('ged-practice-test', 'preguntas de práctica')} son gratuitas, y el GED Ready oficial cuesta ${h.usd(G.readyPerSubject)} por materia. El ${h.a('ged-passing-score', 'verificador de puntajes')} muestra cuánto le falta a un puntaje de práctica para llegar a ${h.n(G.pass)}.</p>
<h2>Tres calendarios</h2>
<p><strong>Cuatro materias, cuatro semanas de estudio cada una, sin suspensos:</strong> unas dieciséis semanas desde el primer día de estudio, más las 8 a 10 semanas del envío del diploma. <strong>El mismo plan con una materia suspendida:</strong> sume la espera de ${h.n(g.w1)} días, unos dos meses más. <strong>Una materia suspendida tres veces en el mismo año:</strong> no puede hacerse una cuarta vez hasta enero, esté como esté de preparado. En todos los casos el precio sigue en cero; solo cambia la fecha.</p>
<h2>Puntajes antiguos e idioma</h2>
<p>Las materias aprobadas en 2002 o después se conservan y no hay que repetirlas, algo importante si lo dejó hace años. Las cuatro materias pueden reservarse el mismo día si el horario del centro lo permite, con una cita para cada una. Se puede examinar en inglés o en español y combinar los dos; el diploma se emite en el idioma usado en Razonamiento a través de las artes del lenguaje. Los estados con GED gratis se comparan en la ${h.a('free-ged', 'página del GED gratis')}; ${list(S.ged.free.filter((x) => x !== 'NY'), 'es')} son los demás.</p>`,
  },
});
