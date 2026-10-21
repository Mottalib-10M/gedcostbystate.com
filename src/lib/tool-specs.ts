/**
 * Les simulateurs du site, en anglais et en espagnol. Chaque montant vient de src/data/hse.json (pages d'État de
 * ged.com et hiset.org lues le 2026-10-22) et passe par le moteur pur src/lib/engine/hse.ts. Une spec liste ses
 * champs (visibles d'abord, `adv` repliés) et une fonction `run` qui rend la carte de résultat.
 */
import type { ToolSpec, V, Opt, ToolOut } from './tool-types';
import { resolve } from './tool-types';
import type { Lang } from './format';
import { byName, st, stName, GENERAL, READ, usd, usd0, num, day, T, resText, STATES } from './data';
import { gedCost, hisetCost, eligibility, gedResult, hisetResult, plan, addDays, type CostOut } from './engine/hse';
import { ranking, rankOf, listPrice, full, type Test, type AnyMode } from './stats';

export type Args = Record<string, number | string>;
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k] ?? '');
const G = GENERAL.ged, H = GENERAL.hiset;
const NA = (l: Lang) => T(l, 'n/a', 'n/d');

const stateOpts = (l: Lang, only?: 'ged' | 'hiset'): Opt[] => byName(l).filter((x) => !only || x[only]).map((x) => ({ value: x.code, label: x[l] }));
const testOpts = (l: Lang): Opt[] => [{ value: 'ged', label: 'GED' }, { value: 'hiset', label: 'HiSET' }];
const modeOpts = (l: Lang): Opt[] => [{ value: 'center', label: T(l, 'Test center', 'Centro de examen') }, { value: 'online', label: T(l, 'Online at home', 'En línea desde casa') }];
const yesNo = (l: Lang): Opt[] => [{ value: 'no', label: T(l, 'No', 'No') }, { value: 'yes', label: T(l, 'Yes', 'Sí') }];
const testName = (t: string) => (t === 'ged' ? 'GED' : 'HiSET');
const partsOf = (t: string) => (t === 'ged' ? G.subjects : H.subtests);
const unitWord = (t: string, l: Lang, k: number) => (t === 'ged' ? T(l, k === 1 ? 'subject' : 'subjects', k === 1 ? 'materia' : 'materias') : T(l, k === 1 ? 'subtest' : 'subtests', k === 1 ? 'prueba' : 'pruebas'));
const readNote = (code: string, t: string, l: Lang) => T(l, `Fees from the ${stName(code, l)} page of ${t === 'ged' ? 'ged.com' : 'hiset.org'}, read on ${day(READ, l)}.`, `Tarifas de la página de ${stName(code, l)} en ${t === 'ged' ? 'ged.com' : 'hiset.org'}, leída el ${day(READ, l)}.`);
const helpOf = (code: string, t: string, l: Lang) => { const x = t === 'ged' ? st(code).ged : st(code).hiset; return x?.help?.[l]; };
const why = (r: CostOut, code: string, t: string, l: Lang) => {
  const other = t === 'ged' ? st(code).hiset : st(code).ged;
  if (r.why === 'no-test') return T(l, `${stName(code, l)} does not offer the ${testName(t)}.${other ? ` It offers the ${testName(t === 'ged' ? 'hiset' : 'ged')}.` : ''}`, `${stName(code, l)} no ofrece el ${testName(t)}.${other ? ` Ofrece el ${testName(t === 'ged' ? 'hiset' : 'ged')}.` : ''}`);
  if (r.why === 'no-online') return T(l, `The ${stName(code, l)} page lists no online ${testName(t)} test. Choose the test center.`, `La página de ${stName(code, l)} no indica ningún ${testName(t)} en línea. Elija el centro de examen.`);
  return T(l, `The ${stName(code, l)} page publishes no fee for this format: each test center sets it.`, `La página de ${stName(code, l)} no publica tarifa para este formato: la fija cada centro.`);
};

/** Le simulateur central : État, examen, format, matières déjà réussies, reprises prévues, aide de l'État. */
function cost(l: Lang, arg?: Args): ToolSpec {
  const inputs: ToolSpec['inputs'] = [
    { kind: 'select', id: 'st', label: T(l, 'State', 'Estado'), def: String(arg?.st ?? 'TX'), options: stateOpts(l) },
    { kind: 'choice', id: 'test', label: T(l, 'Test', 'Examen'), def: String(arg?.test ?? 'ged'), options: testOpts(l) },
    { kind: 'choice', id: 'mode', label: T(l, 'Where you test', 'Dónde se examina'), def: String(arg?.mode ?? 'center'), options: modeOpts(l) },
    { id: 'done', label: T(l, 'Subjects already passed', 'Materias ya aprobadas'), def: Number(arg?.done ?? 0), max: 4 },
    { id: 'retakes', label: T(l, 'Retakes to plan for', 'Repeticiones previstas'), def: Number(arg?.retakes ?? 0), max: 12, help: T(l, 'Spread one per subject in turn.', 'Una por materia, por turnos.') },
    { kind: 'choice', id: 'qualify', label: T(l, 'I qualify for the state program', 'Califico para el programa del estado'), def: String(arg?.qualify ?? 'no'), options: yesNo(l), adv: true },
    { id: 'age', label: T(l, 'Your age', 'Su edad'), def: Number(arg?.age ?? 25), max: 99, adv: true },
    { id: 'ready', label: T(l, 'GED Ready practice tests to buy', 'Exámenes GED Ready a comprar'), def: Number(arg?.ready ?? 0), max: 4, adv: true },
  ];
  return {
    inputs,
    run: (v) => {
      const code = s(v, 'st'), t = s(v, 'test'), mode = s(v, 'mode') as AnyMode;
      const parts = Math.max(1, partsOf(t) - Math.min(n(v, 'done'), partsOf(t) - 1));
      const r = t === 'ged'
        ? gedCost(code, { mode, parts, retakes: n(v, 'retakes'), qualify: s(v, 'qualify') === 'yes', age: n(v, 'age'), ready: n(v, 'ready') })
        : hisetCost(code, { mode: mode === 'online' ? 'home' : 'center', parts, retakes: n(v, 'retakes'), qualify: s(v, 'qualify') === 'yes' });
      const label = T(l, `${testName(t)} cost in ${stName(code, l)}`, `Costo del ${testName(t)} en ${stName(code, l)}`);
      if (!r.available) {
        const alt = full(code, t === 'ged' ? 'hiset' : 'ged', 'center');
        return { label, value: T(l, 'Not available', 'No disponible'), sub: why(r, code, t, l), rows: alt.available ? [[T(l, `${testName(t === 'ged' ? 'hiset' : 'ged')} at a test center, all parts`, `${testName(t === 'ged' ? 'hiset' : 'ged')} en un centro, todas las partes`), usd0(alt.total, l)]] : [], note: readNote(code, t, l) };
      }
      const help = helpOf(code, t, l);
      const rows: ToolOut['rows'] = [
        [T(l, `Price per ${unitWord(t, l, 1)}`, `Precio por ${unitWord(t, l, 1)}`), usd(r.base, l)],
        [T(l, `First attempts (${parts} ${unitWord(t, l, parts)})`, `Primeros intentos (${parts} ${unitWord(t, l, parts)})`), usd0(r.first, l), r.first],
      ];
      if (n(v, 'retakes') > 0) rows.push([T(l, `Retakes (${n(v, 'retakes')})`, `Repeticiones (${n(v, 'retakes')})`), usd0(r.retake, l), r.retake]);
      if (r.once) rows.push([T(l, 'State fee, paid once', 'Tarifa estatal, una vez'), usd(r.once, l), r.once]);
      if (r.ready) rows.push([T(l, 'GED Ready practice tests', 'Exámenes GED Ready'), usd(r.ready, l), r.ready]);
      const rk = rankOf(code, t as Test, mode);
      if (rk && n(v, 'done') === 0) rows.push([T(l, 'Rank, cheapest first', 'Puesto, del más barato'), T(l, `${rk.pos} of ${rk.of}`, `${rk.pos} de ${rk.of}`)]);
      const notes = [readNote(code, t, l)];
      if (r.extraFees) notes.push(T(l, 'The test center may add its own fee, which the state page does not publish.', 'El centro puede añadir su propia tarifa, que la página del estado no publica.'));
      if (r.retakeUnknown) notes.push(T(l, 'The state pays two retakes per subtest; the page gives no price beyond that.', 'El estado paga dos repeticiones por prueba; la página no da precio más allá.'));
      if (r.help === 'cond' && !r.helpApplied && help) notes.push(T(l, 'Tick “I qualify” under More options to see the cost with the state program.', 'Marque «Califico» en Más opciones para ver el costo con el programa del estado.'));
      const tries = Math.max(...r.plan.map((p) => p.length));
      const table: ToolOut['table'] = n(v, 'retakes') > 0 ? {
        caption: T(l, 'What each attempt costs, subject by subject (retakes spread one per subject in turn).', 'Lo que cuesta cada intento, materia por materia (repeticiones repartidas una por materia, por turnos).'),
        headers: [T(l, 'Subject', 'Materia'), ...Array.from({ length: tries }, (_, i) => T(l, `Attempt ${i + 1}`, `Intento ${i + 1}`))],
        rows: r.plan.map((p, i) => [T(l, `Subject ${i + 1}`, `Materia ${i + 1}`), ...Array.from({ length: tries }, (_, j) => (p[j] === undefined ? '' : usd(p[j], l)))]),
        align: ['l', ...Array.from({ length: tries }, () => 'r' as const)],
      } : undefined;
      return { label, value: usd0(r.total, l), sub: help ?? T(l, `${stName(code, l)} publishes no discount on this test.`, `${stName(code, l)} no publica ningún descuento para este examen.`), rows, note: notes.join(' '), table };
    },
  };
}

/** GED ou HiSET dans un État : les deux côte à côte. */
function compare(l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [
      { kind: 'select', id: 'st', label: T(l, 'State', 'Estado'), def: String(arg?.st ?? 'NC'), options: stateOpts(l) },
      { kind: 'choice', id: 'mode', label: T(l, 'Where you test', 'Dónde se examina'), def: String(arg?.mode ?? 'center'), options: modeOpts(l) },
    ],
    run: (v) => {
      const code = s(v, 'st'), mode = s(v, 'mode') as AnyMode;
      const g = full(code, 'ged', mode), h = full(code, 'hiset', mode);
      const x = st(code);
      const cell = (r: CostOut, t: string) => (r.available ? usd0(r.total, l) : why(r, code, t, l));
      let value: string, sub: string;
      if (g.available && h.available) {
        const d = Math.abs(g.total - h.total);
        value = d < 1 ? T(l, 'Same price', 'Mismo precio') : g.total < h.total ? T(l, `GED, ${usd0(d, l)} less`, `GED, ${usd0(d, l)} menos`) : T(l, `HiSET, ${usd0(d, l)} less`, `HiSET, ${usd0(d, l)} menos`);
        sub = T(l, 'Cheaper first pass of the whole test, before any retake.', 'Primer paso completo más barato, antes de repetir.');
      } else if (g.available) { value = 'GED'; sub = why(h, code, 'hiset', l); }
      else if (h.available) { value = 'HiSET'; sub = why(g, code, 'ged', l); }
      else { value = T(l, 'Check the state', 'Consulte al estado'); sub = why(g, code, 'ged', l); }
      const rows: ToolOut['rows'] = [
        [T(l, 'GED, 4 subjects', 'GED, 4 materias'), g.available ? usd0(g.total, l) : NA(l)],
        [T(l, 'HiSET, 5 subtests', 'HiSET, 5 pruebas'), h.available ? usd0(h.total, l) : NA(l)],
      ];
      const ageG = x.ged ? num(x.ged.age, l, x.ged.age % 1 ? 1 : 0) : NA(l), ageH = x.hiset?.age != null ? num(x.hiset.age, l) : NA(l);
      return {
        label: T(l, `Cheaper test in ${stName(code, l)}`, `Examen más barato en ${stName(code, l)}`), value, sub, rows,
        note: T(l, `Fees read on ged.com and hiset.org on ${day(READ, l)}. Discounts open to everyone and public codes are included; programs you must qualify for are not.`, `Tarifas leídas en ged.com y hiset.org el ${day(READ, l)}. Se incluyen los descuentos abiertos a todos y los códigos públicos; no los programas para los que hay que calificar.`),
        table: {
          caption: T(l, `GED and HiSET in ${stName(code, l)}, side by side.`, `GED y HiSET en ${stName(code, l)}, lado a lado.`),
          headers: ['', 'GED', 'HiSET'],
          rows: [
            [T(l, 'Price per part', 'Precio por parte'), x.ged ? usd((mode === 'online' ? x.ged.o : x.ged.c) ?? 0, l) : NA(l), x.hiset && (mode === 'online' ? x.hiset.ho : x.hiset.hc) != null ? usd((mode === 'online' ? x.hiset.ho : x.hiset.hc)!, l) : NA(l)],
            [T(l, 'Whole test, first pass', 'Examen completo, primer paso'), cell(g, 'ged'), cell(h, 'hiset')],
            [T(l, 'Parts', 'Partes'), x.ged ? '4' : NA(l), x.hiset ? '5' : NA(l)],
            [T(l, 'Minimum age', 'Edad mínima'), ageG, ageH],
            [T(l, 'Residency', 'Residencia'), x.ged ? resText(x.ged.res, l) : NA(l), x.hiset ? resText(x.hiset.res, l) : NA(l)],
            [T(l, 'Passing rule', 'Para aprobar'), T(l, '145 on each subject', '145 en cada materia'), T(l, '8 of 20 on each, 45 in all, essay 2 of 6', '8 de 20 en cada una, 45 en total, ensayo 2 de 6')],
          ],
          align: ['l', 'r', 'r'],
        },
      };
    },
  };
}

/** Les 50 États et Washington, D.C., du moins cher au plus cher. */
function states(l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [
      { kind: 'choice', id: 'test', label: T(l, 'Test', 'Examen'), def: String(arg?.test ?? 'ged'), options: testOpts(l) },
      { kind: 'choice', id: 'mode', label: T(l, 'Where you test', 'Dónde se examina'), def: String(arg?.mode ?? 'center'), options: modeOpts(l) },
      { kind: 'select', id: 'st', label: T(l, 'Highlight my state', 'Resaltar mi estado'), def: String(arg?.st ?? 'CA'), options: stateOpts(l) },
    ],
    run: (v) => {
      const t = s(v, 'test') as Test, mode = s(v, 'mode') as AnyMode, code = s(v, 'st');
      const rk = ranking(t, mode);
      const mine = rk.find((r) => r.s.code === code);
      const pos = rankOf(code, t, mode);
      const free = rk.filter((r) => r.total === 0).length;
      const rows: ToolOut['rows'] = [
        [T(l, 'States with a published price', 'Estados con precio publicado'), num(rk.length, l)],
        [T(l, 'Free for everyone', 'Gratis para todos'), num(free, l)],
        [T(l, 'Cheapest paying state', 'Estado de pago más barato'), (() => { const p = rk.find((r) => r.total > 0); return p ? `${p.s[l]}, ${usd0(p.total, l)}` : NA(l); })()],
        [T(l, 'Most expensive', 'Más caro'), rk.length ? `${rk[rk.length - 1].s[l]}, ${usd0(rk[rk.length - 1].total, l)}` : NA(l)],
      ];
      return {
        label: T(l, `${testName(t)} in ${stName(code, l)}, whole test`, `${testName(t)} en ${stName(code, l)}, examen completo`),
        value: mine ? usd0(mine.total, l) : T(l, 'Not available', 'No disponible'),
        sub: pos ? T(l, `Rank ${pos.pos} of ${pos.of}, cheapest first.`, `Puesto ${pos.pos} de ${pos.of}, del más barato.`) : why(t === 'ged' ? gedCost(code, { mode, parts: 4, retakes: 0, qualify: false }) : hisetCost(code, { mode: mode === 'online' ? 'home' : 'center', parts: 5, retakes: 0, qualify: false }), code, t, l),
        rows,
        note: T(l, `First pass of all ${partsOf(t)} parts, discounts open to everyone and public codes included. Fees read on ${day(READ, l)}.`, `Primer paso de las ${partsOf(t)} partes, con descuentos abiertos a todos y códigos públicos. Tarifas leídas el ${day(READ, l)}.`),
        table: {
          caption: T(l, `${testName(t)} ${mode === 'online' ? 'online' : 'at a test center'}: whole test, first pass, cheapest first.`, `${testName(t)} ${mode === 'online' ? 'en línea' : 'en un centro'}: examen completo, primer paso, del más barato.`),
          headers: ['#', T(l, 'State', 'Estado'), T(l, 'Whole test', 'Examen completo'), T(l, 'List price', 'Precio sin descuento'), T(l, 'Minimum age', 'Edad mínima')],
          rows: rk.map((r, i) => {
            const lp = listPrice(r.s.code, t, mode);
            const age = t === 'ged' ? r.s.ged!.age : r.s.hiset!.age;
            const name = r.s.code === code ? `<strong>${r.s[l]}</strong>` : r.s[l];
            return [String(i + 1), name, usd0(r.total, l), lp != null && Math.abs(lp - r.total) > 0.5 ? usd0(lp, l) : '', age != null ? num(age, l, age % 1 ? 1 : 0) : NA(l)];
          }),
          align: ['r', 'l', 'r', 'r', 'r'],
        },
      };
    },
  };
}

/** Âge minimum et dérogations. */
function eligible(l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [
      { kind: 'select', id: 'st', label: T(l, 'State', 'Estado'), def: String(arg?.st ?? 'NY'), options: stateOpts(l) },
      { kind: 'choice', id: 'test', label: T(l, 'Test', 'Examen'), def: String(arg?.test ?? 'ged'), options: testOpts(l) },
      { id: 'age', label: T(l, 'Your age', 'Su edad'), def: Number(arg?.age ?? 17), max: 99, unit: T(l, 'years', 'años') },
    ],
    run: (v) => {
      const code = s(v, 'st'), t = s(v, 'test') as Test, age = n(v, 'age');
      const e = eligibility(code, t, age);
      const x = t === 'ged' ? st(code).ged : st(code).hiset;
      const label = T(l, `Can you take the ${testName(t)} in ${stName(code, l)} at ${age}?`, `¿Puede tomar el ${testName(t)} en ${stName(code, l)} a los ${age}?`);
      if (e.status === 'unknown') return { label, value: T(l, 'Not offered', 'No se ofrece'), sub: why({ available: false, why: 'no-test' } as CostOut, code, t, l), rows: [] };
      const value = { ok: T(l, 'Yes', 'Sí'), waiver: T(l, 'With conditions', 'Con condiciones'), 'too-young': T(l, 'Not yet', 'Todavía no'), unknown: '' }[e.status];
      const sub = {
        ok: T(l, 'You meet the age with no extra paperwork.', 'Cumple la edad sin trámites adicionales.'),
        waiver: T(l, 'Below the standard age the state asks for documents: school withdrawal, parental consent or approval, depending on the state.', 'Por debajo de la edad general el estado pide documentos: baja escolar, permiso de los padres o aprobación, según el estado.'),
        'too-young': T(l, 'The state page sets a younger limit than your age allows.', 'La página del estado fija un límite inferior a su edad.'),
        unknown: '',
      }[e.status];
      const rows: ToolOut['rows'] = [
        [T(l, 'Age with no conditions', 'Edad sin condiciones'), e.age != null ? num(e.age, l, e.age % 1 ? 1 : 0) : T(l, 'Not stated', 'No indicada')],
        [T(l, 'Youngest with conditions', 'Menor edad con condiciones'), e.under != null ? num(e.under, l) : T(l, 'Set case by case', 'Caso por caso')],
        [T(l, 'Residency', 'Residencia'), x ? resText(x.res, l) : NA(l)],
      ];
      return { label, value, sub, rows, note: T(l, `${readNote(code, t, l)} Online, a parent or guardian must usually be present at check-in for testers under 18.`, `${readNote(code, t, l)} En línea, para menores de 18 un padre o tutor suele tener que estar presente al registrarse.`) };
    },
  };
}

/** Notes GED : 145 par matière. */
function pass(l: Lang, arg?: Args): ToolSpec {
  const sub = [['math', T(l, 'Math', 'Matemáticas')], ['rla', T(l, 'Language arts (RLA)', 'Lenguaje (RLA)')], ['science', T(l, 'Science', 'Ciencias')], ['social', T(l, 'Social studies', 'Estudios sociales')]] as const;
  return {
    inputs: sub.map(([id, label], i) => ({ id, label, def: Number(arg?.[id] ?? [150, 146, 158, 140][i]), max: 200 })),
    run: (v) => {
      const sc = sub.map(([id]) => Math.max(G.min, Math.min(G.max, n(v, id))));
      const r = gedResult(sc);
      const lvl = (x: number) => (x >= G.collegeCredit ? T(l, 'College Ready + Credit', 'College Ready + Credit') : x >= G.collegeReady ? 'College Ready' : x >= G.pass ? T(l, 'Pass', 'Aprobado') : T(l, `${G.pass - x} points short`, `faltan ${G.pass - x} puntos`));
      return {
        label: T(l, 'Your GED result', 'Su resultado del GED'),
        value: r.pass ? T(l, 'Passed', 'Aprobado') : T(l, `${4 - r.passed} to retake`, `${4 - r.passed} por repetir`),
        sub: r.pass ? T(l, `All four subjects at ${G.pass} or more.`, `Las cuatro materias con ${G.pass} o más.`) : T(l, `Each subject needs ${G.pass}; scores do not add up across subjects.`, `Cada materia necesita ${G.pass}; los puntajes no se suman entre materias.`),
        rows: sub.map(([, label], i) => [label, `${sc[i]} · ${lvl(sc[i])}`] as [string, string]),
        note: T(l, `Scale ${G.min} to ${G.max}. ${G.collegeReady} to 174 is College Ready; ${G.collegeCredit} to ${G.max} is College Ready + Credit, worth up to ${G.creditHours} college credit hours depending on the college (ged.com).`, `Escala de ${G.min} a ${G.max}. De ${G.collegeReady} a 174 es College Ready; de ${G.collegeCredit} a ${G.max}, College Ready + Credit, que puede valer hasta ${G.creditHours} créditos universitarios según la institución (ged.com).`),
      };
    },
  };
}

/** Notes HiSET : 8 sur 20 partout, 45 au total, essai 2 sur 6. */
function hpass(l: Lang, arg?: Args): ToolSpec {
  const sub = [['math', T(l, 'Math', 'Matemáticas')], ['science', T(l, 'Science', 'Ciencias')], ['social', T(l, 'Social studies', 'Estudios sociales')], ['reading', T(l, 'Reading', 'Lectura')], ['writing', T(l, 'Writing', 'Escritura')]] as const;
  return {
    inputs: [...sub.map(([id, label], i) => ({ id, label, def: Number(arg?.[id] ?? [9, 10, 8, 11, 7][i]), max: 20 })), { id: 'essay', label: T(l, 'Essay score', 'Puntaje del ensayo'), def: Number(arg?.essay ?? 3), max: 6 }],
    run: (v) => {
      const sc = sub.map(([id]) => Math.max(1, Math.min(H.outOf, n(v, id))));
      const essay = Math.max(1, Math.min(H.essayMax, n(v, 'essay')));
      const r = hisetResult(sc, essay);
      const reasons: string[] = [];
      if (r.failed) reasons.push(T(l, `${r.failed} ${r.failed === 1 ? 'subtest' : 'subtests'} under ${H.passEach}`, `${r.failed} ${r.failed === 1 ? 'prueba' : 'pruebas'} por debajo de ${H.passEach}`));
      if (!r.totalOk) reasons.push(T(l, `total ${r.totalGap} short of ${H.passTotal}`, `al total le faltan ${r.totalGap} para ${H.passTotal}`));
      if (!r.essayOk) reasons.push(T(l, `essay under ${H.essayMin}`, `ensayo por debajo de ${H.essayMin}`));
      return {
        label: T(l, 'Your HiSET result', 'Su resultado del HiSET'),
        value: r.pass ? T(l, 'Passed', 'Aprobado') : T(l, 'Not yet', 'Todavía no'),
        sub: r.pass ? T(l, `Total ${r.total} of ${H.totalMax}, every subtest at ${H.passEach} or more.`, `Total ${r.total} de ${H.totalMax}, todas las pruebas con ${H.passEach} o más.`) : reasons.join(' · '),
        rows: [[T(l, 'Total', 'Total'), `${r.total} / ${H.totalMax}`, r.total], ...sub.map(([, label], i) => [label, `${sc[i]} / ${H.outOf}`, sc[i]] as [string, string, number]), [T(l, 'Essay', 'Ensayo'), `${essay} / ${H.essayMax}`]],
        note: T(l, `Rules from hiset.org: ${H.passEach} of ${H.outOf} on each subtest, ${H.passTotal} of ${H.totalMax} in all, ${H.essayMin} of ${H.essayMax} on the essay. College and career readiness: ${H.ccrEach} on a subtest, ${H.ccrEssay} on the essay.`, `Reglas de hiset.org: ${H.passEach} de ${H.outOf} en cada prueba, ${H.passTotal} de ${H.totalMax} en total, ${H.essayMin} de ${H.essayMax} en el ensayo. Preparación universitaria y laboral: ${H.ccrEach} en una prueba, ${H.ccrEssay} en el ensayo.`),
      };
    },
  };
}

/** Calendrier : vos semaines d'étude, l'attente après un échec, la date du dernier examen. */
function planTool(l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [
      { kind: 'select', id: 'st', label: T(l, 'State', 'Estado'), def: String(arg?.st ?? 'FL'), options: stateOpts(l, 'ged') },
      { id: 'parts', label: T(l, 'Subjects left', 'Materias pendientes'), def: Number(arg?.parts ?? 4), max: 4 },
      { id: 'weeks', label: T(l, 'Your study weeks per subject', 'Sus semanas de estudio por materia'), def: Number(arg?.weeks ?? 4), max: 52, unit: T(l, 'wk', 'sem') },
      { id: 'fails', label: T(l, 'Retakes to allow for', 'Repeticiones a prever'), def: Number(arg?.fails ?? 0), max: 8, adv: true },
    ],
    run: (v) => {
      const code = s(v, 'st'), parts = Math.max(1, Math.min(4, n(v, 'parts'))), weeks = Math.max(0, n(v, 'weeks')), fails = Math.max(0, n(v, 'fails'));
      const g = st(code).ged;
      if (!g) return { label: T(l, 'Your GED timeline', 'Su calendario del GED'), value: T(l, 'Not offered', 'No se ofrece'), sub: why({ available: false, why: 'no-test' } as CostOut, code, 'ged', l), rows: [] };
      // Attente imposée : avant chacune des deux premières reprises (w1), puis après la 3e tentative (w3).
      const per = Array(parts).fill(0); for (let i = 0; i < fails; i++) per[i % parts]++;
      const waitDays = per.reduce((a, k) => a + Array.from({ length: k }, (_, j) => (j < 2 ? g.w1 : g.w3)).reduce((x, y) => x + y, 0), 0);
      const p = plan(parts, weeks, 0, 0);
      const days = p.days + waitDays;
      const end = addDays(READ, days);
      const c = gedCost(code, { mode: 'center', parts, retakes: fails, qualify: false });
      return {
        label: T(l, 'Last subject could be done by', 'La última materia podría estar lista el'),
        value: day(end, l),
        sub: T(l, `${num(Math.ceil(days / 7), l)} weeks from ${day(READ, l)}, one subject after the other.`, `${num(Math.ceil(days / 7), l)} semanas desde el ${day(READ, l)}, una materia tras otra.`),
        rows: [
          [T(l, 'Study time', 'Tiempo de estudio'), T(l, `${num(parts * weeks, l)} weeks`, `${num(parts * weeks, l)} semanas`), parts * weeks * 7],
          [T(l, 'Waiting imposed before retakes', 'Espera impuesta antes de repetir'), T(l, `${num(waitDays, l)} days`, `${num(waitDays, l)} días`), waitDays],
          [T(l, 'Cost at a test center', 'Costo en un centro'), usd0(c.total, l)],
        ],
        note: T(l, `Study weeks are your own estimate. Waiting rule of ${stName(code, l)} at a test center: ${g.w1 ? `${g.w1} days before each of the first two retakes` : 'none for the first two retakes'}, ${g.w3} days after the third attempt${g.cap ? `, at most ${g.cap} attempts a year` : ''}. Online: one retake, then 60 days.`, `Las semanas de estudio son su propia estimación. Regla de espera de ${stName(code, l)} en un centro: ${g.w1 ? `${g.w1} días antes de cada una de las dos primeras repeticiones` : 'ninguna para las dos primeras repeticiones'}, ${g.w3} días tras el tercer intento${g.cap ? `, como máximo ${g.cap} intentos al año` : ''}. En línea: una repetición, luego 60 días.`),
      };
    },
  };
}

/** Reprise : ce que coûte la prochaine tentative d'une matière, et quand. */
function retake(l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [
      { kind: 'select', id: 'st', label: T(l, 'State', 'Estado'), def: String(arg?.st ?? 'GA'), options: stateOpts(l) },
      { kind: 'choice', id: 'test', label: T(l, 'Test', 'Examen'), def: String(arg?.test ?? 'ged'), options: testOpts(l) },
      { kind: 'choice', id: 'mode', label: T(l, 'Where you test', 'Dónde se examina'), def: String(arg?.mode ?? 'center'), options: modeOpts(l) },
      { id: 'tries', label: T(l, 'Attempts already made on this subject', 'Intentos ya hechos en esta materia'), def: Number(arg?.tries ?? 1), max: 9 },
    ],
    run: (v) => {
      const code = s(v, 'st'), t = s(v, 'test'), mode = s(v, 'mode') as AnyMode, k = Math.max(1, n(v, 'tries'));
      const fn = (r: number) => (t === 'ged' ? gedCost(code, { mode, parts: 1, retakes: r, qualify: false }) : hisetCost(code, { mode: mode === 'online' ? 'home' : 'center', parts: 1, retakes: r, qualify: false }));
      const r = fn(k);
      const label = T(l, `Attempt ${k + 1} of one ${unitWord(t, l, 1)}`, `Intento ${k + 1} de una ${unitWord(t, l, 1)}`);
      if (!r.available) return { label, value: T(l, 'Not available', 'No disponible'), sub: why(r, code, t, l), rows: [] };
      const next = r.plan[0][k];
      const rows: ToolOut['rows'] = r.plan[0].map((p, i) => [T(l, `Attempt ${i + 1}`, `Intento ${i + 1}`), usd(p, l)] as [string, string]);
      let wait = '';
      if (t === 'ged') {
        const g = st(code).ged!;
        const d = mode === 'online' ? (k >= 2 ? 60 : 0) : k < 3 ? g.w1 : g.w3;
        wait = d ? T(l, `Wait ${d} days before this attempt.`, `Espere ${d} días antes de este intento.`) : T(l, 'No waiting period before this attempt.', 'Sin espera antes de este intento.');
        if (g.cap && k >= g.cap) wait += T(l, ` ${stName(code, l)} allows ${g.cap} attempts a year on one subject.`, ` ${stName(code, l)} permite ${g.cap} intentos al año en una materia.`);
      } else wait = T(l, 'The HiSET state page sets the waiting rule; check it before booking.', 'La página HiSET del estado fija la espera; consúltela antes de reservar.');
      return {
        label, value: usd(next, l),
        sub: wait,
        rows: [...rows, [T(l, 'Total for this subject', 'Total de esta materia'), usd0(r.plan[0].reduce((a, b) => a + b, 0), l)]],
        note: t === 'ged'
          ? T(l, `At a test center, each failed full-price attempt opens ${st(code).ged!.nd === 2 ? 'two discounted retakes' : 'one discounted retake'}, used within ${G.retakeWindowDays} days; GED Testing Service waives its own fee and the center fee remains. Online retakes are full price. ${readNote(code, t, l)}`, `En un centro, cada intento fallido a precio completo da ${st(code).ged!.nd === 2 ? 'dos repeticiones con descuento' : 'una repetición con descuento'}, a usar en ${G.retakeWindowDays} días; GED Testing Service no cobra su parte y queda la tarifa del centro. En línea, las repeticiones se pagan completas. ${readNote(code, t, l)}`)
          : T(l, `HiSET: the full fee is paid on attempts 1 and 4; attempts 2 and 3 cost only the center or proctoring fee. ${readNote(code, t, l)}`, `HiSET: la tarifa completa se paga en los intentos 1 y 4; los intentos 2 y 3 cuestan solo la tarifa del centro o de supervisión. ${readNote(code, t, l)}`),
      };
    },
  };
}

/** GED Ready : ce que coûte la répétition, ce qu'un échec évité économise. */
function ready(l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [
      { kind: 'select', id: 'st', label: T(l, 'State', 'Estado'), def: String(arg?.st ?? 'OH'), options: stateOpts(l, 'ged') },
      { id: 'n', label: T(l, 'Subjects to practice', 'Materias a practicar'), def: Number(arg?.n ?? 4), max: 4 },
      { kind: 'choice', id: 'mode', label: T(l, 'Where you test', 'Dónde se examina'), def: String(arg?.mode ?? 'center'), options: modeOpts(l) },
    ],
    run: (v) => {
      const code = s(v, 'st'), k = Math.max(1, Math.min(4, n(v, 'n'))), mode = s(v, 'mode') as AnyMode;
      const g = st(code).ged!;
      const price = k === 4 ? G.readyBundle : Math.round(k * G.readyPerSubject * 100) / 100;
      const r = gedCost(code, { mode, parts: 1, retakes: 1, qualify: false });
      const retakeCost = r.available ? r.plan[0][1] : null;
      return {
        label: T(l, `GED Ready for ${k} ${unitWord('ged', l, k)}`, `GED Ready para ${k} ${unitWord('ged', l, k)}`),
        value: usd(price, l),
        sub: mode === 'online' ? T(l, `Required online: a green score (${G.readyBands.likely} or more) within ${G.readyGreenDays} days before each subject you test at home.`, `Obligatorio en línea: un resultado verde (${G.readyBands.likely} o más) en los ${G.readyGreenDays} días previos a cada materia que se examina en casa.`) : T(l, 'Optional at a test center, unless your state asks for it.', 'Opcional en un centro, salvo que su estado lo exija.'),
        rows: [
          [T(l, 'One subject', 'Una materia'), usd(G.readyPerSubject, l)],
          [T(l, 'All four (bundle)', 'Las cuatro (paquete)'), usd(G.readyBundle, l)],
          [T(l, `A retake in ${stName(code, l)}`, `Una repetición en ${stName(code, l)}`), retakeCost != null ? usd(retakeCost, l) : NA(l)],
          [T(l, 'Full-price subject', 'Materia a precio completo'), r.available ? usd(r.base, l) : usd(g.c, l)],
        ],
        note: T(l, `Prices from ged.com read on ${day(READ, l)}. GED Ready is half the length of the real test; one purchase gives one attempt. Results: ${G.readyBands.likely} to 200 likely to pass, ${G.readyBands.close} to 144 too close to call, 100 to 133 not likely to pass.`, `Precios de ged.com leídos el ${day(READ, l)}. GED Ready dura la mitad que el examen real; una compra da un intento. Resultados: de ${G.readyBands.likely} a 200, probable aprobar; de ${G.readyBands.close} a 144, demasiado justo; de 100 a 133, poco probable.`),
      };
    },
  };
}

export const SPECS: Record<string, (l: Lang, arg?: Args) => ToolSpec> = { cost, compare, states, eligible, pass, hpass, plan: planTool, retake, ready };
export const TOOL_KINDS = Object.keys(SPECS);
export function getTool(kind: string, l: Lang, arg?: Args): ToolSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown tool ${kind}`);
  return f(l, arg);
}
export function runTool(kind: string, l: Lang, arg?: Args, values?: V): ToolOut {
  const spec = getTool(kind, l, arg);
  const v = resolve(spec.inputs, { ...Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])), ...(values ?? {}) });
  return spec.run(v);
}
export const ALL_STATES = STATES.map((x) => x.code);
