/**
 * Test d'entraînement : une question à la fois, quatre réponses (boutons aria-pressed empilés, sans role="group" : ce ne sont pas des bascules), correction et
 * explication, score à la fin. Questions écrites par Radif Partners (src/data/quiz.ts), jamais celles d'un
 * examen réel : le cadre le dit. Premier rendu identique au build (pas de hasard, ordre des choix fixe).
 */
import { useMemo, useState } from 'react';
import { bank, order } from '../../data/quiz';
import type { Lang } from '../../lib/format';

interface Props { kind: string; lang: Lang; costHref?: string; idPrefix?: string }
const L = {
  en: { of: 'of', check: 'Check my answer', next: 'Next question', done: 'See my score', right: 'Correct.', wrong: 'Not quite. The answer is', again: 'Start again', score: 'Your score', note: 'Practice questions written by us from the published test topics. They are not real GED or HiSET questions, and this score does not predict an official score.', cost: 'What the real test costs in your state', pick: 'Choose an answer' },
  es: { of: 'de', check: 'Comprobar', next: 'Siguiente pregunta', done: 'Ver mi puntaje', right: 'Correcto.', wrong: 'No exactamente. La respuesta es', again: 'Empezar de nuevo', score: 'Su puntaje', note: 'Preguntas de práctica escritas por nosotros a partir de los temas publicados. No son preguntas reales del GED ni del HiSET, y este puntaje no anticipa un puntaje oficial.', cost: 'Lo que cuesta el examen real en su estado', pick: 'Elija una respuesta' },
};

export default function Quiz({ kind, lang, costHref, idPrefix = 'q' }: Props) {
  const t = L[lang];
  const k = lang === 'en' ? 0 : 1;
  const qs = useMemo(() => bank(kind.replace(/^quiz-/, '')), [kind]);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [shown, setShown] = useState(false);
  const [good, setGood] = useState(0);
  const [end, setEnd] = useState(false);
  const q = qs[i];
  const ord = order(i, q.c[k].length);
  const reset = () => { setI(0); setPick(null); setShown(false); setGood(0); setEnd(false); };
  if (end) {
    const pct = Math.round((good / qs.length) * 100);
    return (
      <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
        <div data-resultat aria-live="polite" className="rounded-lg border-t-4 border-accent-500 bg-navy-50 p-4 sm:p-5">
          <p className="text-sm font-medium text-navy-700">{t.score}</p>
          <p className="tabular-nums mt-1 text-[2.3rem] font-bold leading-tight text-navy-900">{good} / {qs.length}</p>
          <p className="mt-1 text-sm text-navy-700">{pct} %</p>
          <p className="mt-3 text-xs text-navy-600">{t.note}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <button type="button" onClick={reset} className="rounded-lg bg-accent-700 px-4 py-2 font-medium text-white">{t.again}</button>
          {costHref && <a href={costHref} className="self-center font-medium text-accent-700 underline">{t.cost}</a>}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-navy-600">{i + 1} {t.of} {qs.length}</p>
      <p id={`${idPrefix}-q`} className="mt-2 text-base font-semibold text-navy-900">{q.q[k]}</p>
      <div data-choices aria-describedby={`${idPrefix}-q`} className="mt-3 grid gap-2">
        {ord.map((j) => {
          const on = pick === j;
          const state = shown ? (j === q.a ? 'border-emerald-600 bg-emerald-50' : on ? 'border-red-500 bg-red-50' : 'border-navy-200') : on ? 'border-accent-700 bg-navy-50' : 'border-navy-200 hover:bg-navy-50';
          return <button key={j} type="button" aria-pressed={on} disabled={shown} onClick={() => setPick(j)} className={`min-h-12 rounded-lg border px-3 py-2 text-left text-sm text-navy-900 ${state}`}>{q.c[k][j]}</button>;
        })}
      </div>
      <div aria-live="polite" className="mt-3 min-h-6 text-sm text-navy-800">
        {shown && <p><strong>{pick === q.a ? t.right : `${t.wrong} ${q.c[k][q.a]}.`}</strong> {q.why[k]}</p>}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {!shown && <button type="button" disabled={pick === null} onClick={() => { setShown(true); if (pick === q.a) setGood((g) => g + 1); }} className="rounded-lg bg-accent-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">{pick === null ? t.pick : t.check}</button>}
        {shown && <button type="button" onClick={() => { if (i + 1 < qs.length) { setI(i + 1); setPick(null); setShown(false); } else setEnd(true); }} className="rounded-lg bg-accent-700 px-4 py-2 text-sm font-medium text-white">{i + 1 < qs.length ? t.next : t.done}</button>}
      </div>
      <p className="mt-4 text-xs text-navy-600">{t.note}</p>
    </div>
  );
}
