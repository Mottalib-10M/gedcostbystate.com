/** Moteur de coût et de réussite : valeurs calculées à la main à partir des pages d'État lues le 2026-10-22. */
import { describe, expect, it } from 'vitest';
import { gedCost, hisetCost, eligibility, gedResult, hisetResult, spread, plan, addDays } from '../src/lib/engine/hse';
import { STATES, GED_STATES, HISET_STATES, st } from '../src/lib/data';

const base = { mode: 'center' as const, parts: 4, retakes: 0, qualify: false };

describe('données', () => {
  it('51 juridictions, GED dans 49, HiSET dans 24', () => {
    expect(STATES).toHaveLength(51);
    expect(GED_STATES).toHaveLength(49);
    expect(HISET_STATES).toHaveLength(24);
    expect(st('IA').ged).toBeUndefined();
    expect(st('ME').ged).toBeUndefined();
  });
  it('chaque État a une page officielle', () => {
    for (const s of STATES) {
      if (s.ged) expect(s.ged.url).toMatch(/^https:\/\/www\.ged\.com\/(es\/)?policies\/[a-z_]+\/$/);
      if (s.hiset) expect(s.hiset.url).toMatch(/^https:\/\/hiset\.org\/[a-z-]+\/$/);
    }
  });
});

describe('GED', () => {
  it('Texas : 4 × 36,25 $', () => expect(gedCost('TX', base).total).toBe(145));
  it('Texas : deux reprises réduites à 16,25 $ par matière', () => {
    expect(gedCost('TX', { ...base, retakes: 2 }).total).toBe(177.5);
    // une matière, trois reprises : réduite, réduite, plein tarif
    expect(gedCost('TX', { ...base, parts: 1, retakes: 3 }).total).toBe(105);
  });
  it('Californie : 164 $, une reprise réduite à 15 $', () => {
    expect(gedCost('CA', base).total).toBe(164);
    expect(gedCost('CA', { ...base, retakes: 1 }).total).toBe(179);
  });
  it('en ligne : jamais de reprise réduite', () => expect(gedCost('CA', { ...base, mode: 'online', retakes: 1 }).total).toBe(205));
  it('Floride : pas de test en ligne listé', () => {
    const r = gedCost('FL', { ...base, mode: 'online' });
    expect(r.available).toBe(false);
    expect(r.why).toBe('no-online');
  });
  it('Iowa : pas de GED', () => expect(gedCost('IA', base).why).toBe('no-test'));
  it('Illinois : 10 $ la première tentative avec le code', () => {
    const r = gedCost('IL', base);
    expect(r.total).toBe(40);
    expect(r.helpApplied).toBe(true);
  });
  it('Ohio : bon de 80 $ si admissible', () => {
    expect(gedCost('OH', base).total).toBe(144);
    expect(gedCost('OH', { ...base, qualify: true }).total).toBe(64);
  });
  it('Texas : aide de la TWC seulement à 21 ans et plus', () => {
    expect(gedCost('TX', { ...base, qualify: true, age: 20 }).total).toBe(145);
    expect(gedCost('TX', { ...base, qualify: true, age: 25 }).total).toBe(0);
  });
  it('New York : gratuit', () => expect(gedCost('NY', base).total).toBe(0));
  it('Mississippi : reprises gratuites au centre', () => expect(gedCost('MS', { ...base, retakes: 3 }).total).toBe(0));
  it('GED Ready : 7,99 $ la matière, 25,99 $ les quatre', () => {
    expect(gedCost('GA', { ...base, ready: 1 }).ready).toBe(7.99);
    expect(gedCost('GA', { ...base, ready: 4 }).ready).toBe(25.99);
    expect(gedCost('GA', { ...base, ready: 4 }).total).toBe(209.99);
  });
  it('matières restantes', () => expect(gedCost('GA', { ...base, parts: 2 }).total).toBe(92));
});

describe('HiSET', () => {
  const h = { mode: 'center' as const, parts: 5, retakes: 0, qualify: false };
  it('Californie : 5 × 34 $ + 20 $ une fois', () => expect(hisetCost('CA', h).total).toBe(190));
  it('Californie : 2e et 3e tentatives sans les frais d’examen, 4e au plein tarif', () => {
    expect(hisetCost('CA', { ...h, retakes: 5 }).total).toBe(260);
    expect(hisetCost('CA', { ...h, parts: 1, retakes: 3 }).total).toBe(116);
  });
  it('Mississippi : l’État paie la première et deux reprises', () => {
    const r = hisetCost('MS', { ...h, retakes: 11 });
    expect(r.total).toBe(0);
    expect(r.retakeUnknown).toBe(true);
    expect(hisetCost('MS', { ...h, retakes: 10 }).retakeUnknown).toBe(false);
  });
  it('Pennsylvanie : première tentative gratuite', () => {
    expect(hisetCost('PA', h).total).toBe(0);
    expect(hisetCost('PA', { ...h, retakes: 1 }).total).toBe(8);
  });
  it('Texas : pas de HiSET', () => expect(hisetCost('TX', h).why).toBe('no-test'));
});

describe('âge', () => {
  it('Texas : 18 ans, 16 ou 17 avec conditions', () => {
    expect(eligibility('TX', 'ged', 18).status).toBe('ok');
    expect(eligibility('TX', 'ged', 17).status).toBe('waiver');
    expect(eligibility('TX', 'ged', 15).status).toBe('too-young');
  });
  it('New York : 19 ans', () => expect(eligibility('NY', 'ged', 18).status).toBe('waiver'));
  it('Iowa : pas de GED', () => expect(eligibility('IA', 'ged', 30).status).toBe('unknown'));
});

describe('notes', () => {
  it('GED : 145 partout', () => {
    expect(gedResult([145, 150, 160, 170]).pass).toBe(true);
    const r = gedResult([144, 150, 166, 180]);
    expect(r.pass).toBe(false);
    expect(r.gap).toBe(1);
    expect(r.ready).toBe(2);
    expect(r.credit).toBe(1);
  });
  it('HiSET : 8 partout, 45 au total, 2 à l’essai', () => {
    expect(hisetResult([9, 9, 9, 9, 9], 2).pass).toBe(true);
    expect(hisetResult([8, 8, 8, 8, 8], 4).pass).toBe(false);
    expect(hisetResult([20, 20, 7, 20, 20], 4).pass).toBe(false);
    expect(hisetResult([9, 9, 9, 9, 9], 1).pass).toBe(false);
  });
});

describe('outils', () => {
  it('répartition des reprises', () => expect(spread(5, 4)).toEqual([2, 1, 1, 1]));
  it('calendrier', () => {
    expect(plan(4, 3, 60, 0)).toEqual({ days: 84, weeks: 12 });
    expect(addDays('2026-10-22', 84)).toBe('2027-01-14');
  });
});
