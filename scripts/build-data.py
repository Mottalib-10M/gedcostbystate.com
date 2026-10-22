#!/usr/bin/env python3
"""Builds src/data/hse.json from the facts read on the official state pages.

GED: one policy page per state on ged.com (https://www.ged.com/policies/<state>/), read on 2026-10-22.
     Verbatim extracts (age, residency, price, retake rules, retake cost) are archived in
     data/facts/brut/ged-state-pages.json. Michigan's English page returned 404: the Spanish page was read.
HiSET: one requirements page per state on hiset.org (PSI), read on 2026-10-22; our notes of each page,
     with the figures as printed, are in data/facts/brut/hiset-state-pages.json.

Every figure below was copied by hand from those pages (no scraping at runtime). A value the page does not
state is None and the site says "not published" instead of guessing.

Usage: python3 scripts/build-data.py   (writes src/data/hse.json)
"""
import json, os

READ = '2026-10-22'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# code, name (en), name (es), ged.com slug, hiset.org slug or None
STATES = [
 ('AL','Alabama','Alabama','alabama',None), ('AK','Alaska','Alaska','alaska',None), ('AZ','Arizona','Arizona','arizona',None),
 ('AR','Arkansas','Arkansas','arkansas',None), ('CA','California','California','california','california'),
 ('CO','Colorado','Colorado','colorado','colorado'), ('CT','Connecticut','Connecticut','connecticut',None),
 ('DE','Delaware','Delaware','delaware',None), ('DC','District of Columbia','Distrito de Columbia','district_of_columbia',None),
 ('FL','Florida','Florida','florida',None), ('GA','Georgia','Georgia','georgia','georgia'), ('HI','Hawaii','Hawái','hawaii','hawaii'),
 ('ID','Idaho','Idaho','idaho',None), ('IL','Illinois','Illinois','illinois','illinois'), ('IN','Indiana','Indiana','indiana','indiana'),
 ('IA','Iowa','Iowa',None,'iowa'), ('KS','Kansas','Kansas','kansas',None), ('KY','Kentucky','Kentucky','kentucky',None),
 ('LA','Louisiana','Luisiana','louisiana','louisiana'), ('ME','Maine','Maine',None,'maine'), ('MD','Maryland','Maryland','maryland',None),
 ('MA','Massachusetts','Massachusetts','massachusetts','massachusetts'), ('MI','Michigan','Míchigan','michigan','michigan'),
 ('MN','Minnesota','Minnesota','minnesota','minnesota'), ('MS','Mississippi','Misisipi','mississippi','mississippi'),
 ('MO','Missouri','Misuri','missouri','missouri'), ('MT','Montana','Montana','montana','montana'), ('NE','Nebraska','Nebraska','nebraska',None),
 ('NV','Nevada','Nevada','nevada','nevada'), ('NH','New Hampshire','Nuevo Hampshire','new_hampshire','new-hampshire'),
 ('NJ','New Jersey','Nueva Jersey','new_jersey',None), ('NM','New Mexico','Nuevo México','new_mexico','new-mexico'),
 ('NY','New York','Nueva York','new_york',None), ('NC','North Carolina','Carolina del Norte','north_carolina','north-carolina'),
 ('ND','North Dakota','Dakota del Norte','north_dakota',None), ('OH','Ohio','Ohio','ohio','ohio'), ('OK','Oklahoma','Oklahoma','oklahoma','oklahoma'),
 ('OR','Oregon','Oregón','oregon',None), ('PA','Pennsylvania','Pensilvania','pennsylvania','pennsylvania'),
 ('RI','Rhode Island','Rhode Island','rhode_island',None), ('SC','South Carolina','Carolina del Sur','south_carolina',None),
 ('SD','South Dakota','Dakota del Sur','south_dakota',None), ('TN','Tennessee','Tennessee','tennessee','tennessee'),
 ('TX','Texas','Texas','texas',None), ('UT','Utah','Utah','utah',None), ('VT','Vermont','Vermont','vermont',None),
 ('VA','Virginia','Virginia','virginia',None), ('WA','Washington','Washington','washington',None),
 ('WV','West Virginia','Virginia Occidental','west_virginia',None), ('WI','Wisconsin','Wisconsin','wisconsin',None),
 ('WY','Wyoming','Wyoming','wyoming','wyoming'),
]

# GED: c = test center price per subject, o = online price per subject (None = not listed / not offered),
# rc = discounted retake at a test center (GED Testing Service waives its own fee; this is what remains),
# nd = discounted retakes per full-price attempt, once = one-time or yearly fee,
# first/firstO = first-attempt price when the state pays part of it for everyone (or with a public promo code),
# sub = kind of state help: 'all' (everyone), 'promo' (public code, while funds last), 'cond' (only if you qualify),
# age = age with no extra condition, under = youngest age allowed with a waiver or documents, res = residency rule.
G = {
 'AL': dict(c=36, o=36, rc=10, age=18, under=16, res='under18'),
 'AK': dict(c=36, o=36, rc=10, first=0, firstO=0, sub='promo', age=18, under=16, res='no'),
 'AZ': dict(c=41, o=41, rc=15, age=18, under=16, res='no'),
 'AR': dict(c=4, o=36, rc=0, age=18, under=16, res='yes', extra='civics'),
 'CA': dict(c=41, o=41, rc=15, age=18, under=17, res='yes'),
 'CO': dict(c=43.5, o=43.5, rc=17.5, age=17, under=16, res='no'),
 'CT': dict(c=0, o=None, rc=0, once=13, onceWhat='registration', age=19, under=17, res='yes'),
 'DE': dict(c=36, o=36, rc=10, age=18, under=16, res='yes'),
 'DC': dict(c=36, o=36, rc=0, first=3.75, firstO=36, sub='promo', age=18, under=16, res='yes'),
 'FL': dict(c=38, o=None, rc=12, age=18, under=16, res='address'),
 'GA': dict(c=46, o=46, rc=20, age=18, under=16, res='no'),
 'HI': dict(c=43.5, o=None, rc=17.5, age=18, under=16, res='no'),
 'ID': dict(c=36, o=36, rc=10, age=18, under=16, res='no'),
 'IL': dict(c=36, o=36, rc=10, first=10, firstO=10, sub='promo', age=18, under=17, res='30d'),
 'IN': dict(c=45, o=36, rc=10, age=18, under=16, res='30d'),
 'KS': dict(c=39, o=39, rc=13, age=18, under=16, res='no'),
 'KY': dict(c=36, o=36, rc=10, age=19, under=17, res='yes'),
 'LA': dict(c=38.5, o=36, rc=10, age=19, under=16, res='no'),
 'MD': dict(c=36, o=36, rc=10, first=14.25, firstO=14.25, sub='all', age=18, under=16, res='yes'),
 'MA': dict(c=36, o=None, rc=10, age=18, under=16, res='yes'),
 'MI': dict(c=43.5, o=43.5, rc=10, age=18, under=16, res='no'),
 'MN': dict(c=36, o=36, rc=10, first=26, firstO=26, sub='promo', age=19, under=17, res='no'),
 'MS': dict(c=36, o=36, rc=0, first=0, firstO=36, sub='all', retakeFree=True, age=18, under=16, res='yes'),
 'MO': dict(c=33, o=36, rc=7, once=10, onceWhat='yearly', age=17, under=None, res='yes'),
 'MT': dict(c=26, o=36, rc=None, centerExtra=True, age=19, under=16, res='yes'),
 'NE': dict(c=36, o=36, rc=10, age=18, under=16, res='no'),
 'NV': dict(c=31, o=36, rc=5, age=18, under=16, res='yes'),
 'NH': dict(c=36, o=36, rc=10, paper=46, age=18, under=16, res='yes'),
 'NJ': dict(c=36, o=36, rc=10, age=18, under=16, res='id'),
 'NM': dict(c=36, o=36, rc=10, sub='cond', age=18, under=16, res='no'),
 'NY': dict(c=0, o=None, rc=0, age=19, under=16, res='30d'),
 'NC': dict(c=26, o=36, rc=0, age=18, under=16, res='no'),
 'ND': dict(c=36, o=36, rc=10, age=16, under=16, res='no'),
 'OH': dict(c=36, o=36, rc=10, sub='cond', voucher=80, age=18, under=16, res='yes'),
 'OK': dict(c=41, o=41, rc=15, age=18, under=16, res='no'),
 'OR': dict(c=44, o=44, rc=10, age=18, under=16, res='no'),
 'PA': dict(c=36, o=36, rc=10, first=0, firstO=0, sub='all', age=18, under=16, res='yes'),
 'RI': dict(c=30, o=36, rc=13, nd=2, sub='cond', age=18, under=16, res='yes'),
 'SC': dict(c=37.5, o=43.5, rc=17.5, nd=2, age=19, under=16, res='yes'),
 'SD': dict(c=50, o=50, rc=20, age=18, under=16, res='no'),
 'TN': dict(c=36, o=36, rc=10, sub='cond', age=18, under=17, res='no'),
 'TX': dict(c=36.25, o=42.25, rc=16.25, nd=2, sub='cond', condAge=21, age=18, under=16, res='yes'),
 'UT': dict(c=36, o=36, rc=10, age=18, under=16, res='no'),
 'VT': dict(c=36, o=36, rc=10, age=18, under=16, res='yes'),
 'VA': dict(c=36, o=36, rc=10, age=18, under=16, res='no'),
 'WA': dict(c=36, o=36, rc=10, age=19, under=16, res='yes'),
 'WV': dict(c=0, o=None, rc=0, age=19, under=None, res='no', viaProgram=True),
 'WI': dict(c=41, o=41, rc=10, age=18.5, under=17, res='10d', since='2026-07-01'),
 'WY': dict(c=26, o=None, rc=0, centerExtra=True, age=18, under=16, res='no'),
}

# HiSET: hc = per-subtest price at a test center (computer), hp = paper when it differs, ho = at home,
# tf = test fee inside the price (attempts 2 and 3 of a subtest cost the price minus this fee),
# once = one-time or yearly state fee, sub as for GED. None = the state page publishes no amount.
H = {
 'CA': dict(hc=34, ho=43, tf=20, once=20, sub='cond', age=18, res='yes'),
 'CO': dict(hc=32.5, hp=35.5, ho=48.5, tf=18, age=17, res='no'),
 'GA': dict(hc=34, ho=49, tf=18, sub='cond', age=18, res='no'),
 'HI': dict(hc=18, hp=28, ho=41, tf=18, age=18, res='no'),
 'IL': dict(hc=26, ho=41, tf=18, age=18, res='30d'),
 'IN': dict(hc=None, ho=None, tf=None, sub='cond', age=18, res='30d', atHomeSuspended=True),
 'IA': dict(hc=18, ho=41, tf=18, age=18, res='no'),
 'LA': dict(hc=24, ho=41, tf=18, once=10, age=19, res='no'),
 'ME': dict(hc=60, ho=None, tf=45, first=0, sub='all', age=17, res='no'),
 'MA': dict(hc=None, ho=None, tf=None, first=0, sub='all', freeRetakes=2, age=18, res='yes'),
 'MI': dict(hc=26, ho=41, tf=18, once=30, age=18, res='no'),
 'MN': dict(hc=28, ho=41, tf=18, first=20, firstO=33, sub='promo', age=19, res='no'),
 'MS': dict(hc=None, ho=None, tf=None, first=0, sub='all', freeRetakes=2, since='2026-07-01', age=18, res='yes'),
 'MO': dict(hc=22, ho=32.5, tf=15, once=10, age=17, res='yes'),
 'MT': dict(hc=28, ho=None, tf=18, upTo=True, age=19, res='yes'),
 'NV': dict(hc=23, ho=41, tf=18, upTo=True, age=18, res='yes'),
 'NH': dict(hc=28, ho=51, tf=18, age=18, res='yes'),
 'NM': dict(hc=26, hp=18, ho=41, tf=18, sub='cond', age=18, res='no'),
 'NC': dict(hc=18, ho=41, tf=18, age=18, res='no'),
 'OH': dict(hc=26, ho=41, tf=18, sub='cond', voucher=80, age=None, res='yes'),
 'OK': dict(hc=33, ho=48.5, tf=20.5, age=18, res='no'),
 'PA': dict(hc=26, ho=41, tf=18, first=0, firstO=0, sub='all', age=18, res='yes'),
 'TN': dict(hc=23, ho=41, tf=18, sub='cond', age=18, res='yes'),
 'WY': dict(hc=18, ho=41, tf=18, centerExtra=True, age=None, res='no'),
}

# Aide de l'État, telle que la page la décrit (texte court, en/es). Seulement les États qui en publient une.
GHELP = {
 'AK': ('Alaska pays the first attempt of each subject while funding lasts.', 'Alaska paga el primer intento de cada materia mientras haya fondos.'),
 'DC': ('With the code DCSAVE36, the first attempt of each subject at a test center costs $3.75; online it is full price.', 'Con el código DCSAVE36, el primer intento de cada materia en un centro cuesta $3.75; en línea se paga el precio completo.'),
 'IL': ('The Illinois Community College Board takes $26 off the first attempt of each subject with the code ILSAVE2026, while funding lasts.', 'El Illinois Community College Board descuenta $26 del primer intento de cada materia con el código ILSAVE2026, mientras haya fondos.'),
 'MD': ('Maryland lowers the first attempt of each subject to $14.25 with the code MDGED2175, at a center or online; retakes are not subsidized.', 'Maryland reduce el primer intento de cada materia a $14.25 con el código MDGED2175, en un centro o en línea; las repeticiones no se subsidian.'),
 'MN': ('Minnesota takes $10 off the first attempt of each subject with the code MNGED10, while funding lasts.', 'Minnesota descuenta $10 del primer intento de cada materia con el código MNGED10, mientras haya fondos.'),
 'MS': ('Mississippi pays every attempt at a Mississippi test center, retakes included (codes MSFREEGED and MSRETAKE); it does not pay for online testing.', 'Misisipi paga todos los intentos en un centro de Misisipi, repeticiones incluidas (códigos MSFREEGED y MSRETAKE); no paga el examen en línea.'),
 'PA': ('Pennsylvania covers the first attempt of up to four subjects for residents, at a public center or online, with the code PAFreeGED.', 'Pensilvania cubre el primer intento de hasta cuatro materias para residentes, en un centro público o en línea, con el código PAFreeGED.'),
 'NM': ('New Mexico residents can have their fees covered by the Free High School Equivalency program after scoring 145 or more on GED Ready within 60 days of scheduling.', 'Los residentes de Nuevo México pueden obtener las tarifas pagadas por el programa Free High School Equivalency tras sacar 145 o más en GED Ready dentro de los 60 días previos a programar.'),
 'OH': ('First-time testers can get a voucher worth up to $80 through a Career-Technical Planning District.', 'Quien se examina por primera vez puede recibir un bono de hasta $80 a través de un Career-Technical Planning District.'),
 'RI': ('People with limited income can get a fee waiver if they prove financial hardship and score Likely to Pass on GED Ready.', 'Las personas con ingresos limitados pueden obtener una exención si prueban dificultad económica y sacan Likely to Pass en GED Ready.'),
 'TN': ('The test can be paid by vouchers for people who attend a local adult education program.', 'El examen puede pagarse con bonos para quien asiste a un programa local de educación para adultos.'),
 'TX': ('The HSE Subsidy Program pays the test fees of eligible people aged 21 and older through a Texas Workforce Commission Adult Education and Literacy program, while funding lasts.', 'El HSE Subsidy Program paga las tarifas de las personas elegibles de 21 años o más a través de un programa de Educación y Alfabetización de Adultos de la Texas Workforce Commission, mientras haya fondos.'),
 'NY': ('New York State pays for every GED subject; there is nothing to pay.', 'El estado de Nueva York paga todas las materias del GED; no hay nada que pagar.'),
 'CT': ('Connecticut charges $0 per subject; only a $13 registration fee is due.', 'Connecticut cobra $0 por materia; solo se paga una inscripción de $13.'),
 'WV': ('There is no cost to the test taker, but the test is scheduled through a local adult learning or Option Pathway program.', 'No cuesta nada a quien se examina, pero el examen se programa a través de un programa local de aprendizaje para adultos u Option Pathway.'),
}
HHELP = {
 'CA': ('A fee waiver exists for those who qualify; the $20 state fee is paid once, at the first booking.', 'Existe una exención para quien califica; la tarifa estatal de $20 se paga una vez, en la primera reserva.'),
 'GA': ('Vouchers are available through the Georgia state program.', 'Hay bonos disponibles a través del programa estatal de Georgia.'),
 'IN': ('Indiana provides test code vouchers; paper and computer fees are set by each test center.', 'Indiana ofrece bonos con código; las tarifas en papel y computadora las fija cada centro.'),
 'ME': ('There is no fee for Maine residents.', 'No hay tarifa para los residentes de Maine.'),
 'MA': ('Massachusetts pays the first test in each subject plus two retakes per subject.', 'Massachusetts paga el primer examen de cada materia y dos repeticiones por materia.'),
 'MN': ('With the code MNHISET8, Minnesota residents get $8 off each subtest the first time, up to $40.', 'Con el código MNHISET8, los residentes de Minnesota obtienen $8 de descuento en cada prueba la primera vez, hasta $40.'),
 'MS': ('Since July 1, 2026, Mississippi pays the HiSET tests and two retests per subtest.', 'Desde el 1 de julio de 2026, Misisipi paga los exámenes HiSET y dos repeticiones por prueba.'),
 'NM': ('Vouchers are available through the state office or adult education providers.', 'Hay bonos a través de la oficina estatal o de los proveedores de educación para adultos.'),
 'OH': ('Vouchers worth $80 are available for paper or computer testing.', 'Hay bonos de $80 para el examen en papel o en computadora.'),
 'PA': ('Pennsylvania covers up to five subtests for residents with the code PAFreeHiSET.', 'Pensilvania cubre hasta cinco pruebas para residentes con el código PAFreeHiSET.'),
 'TN': ('The HiSET Voucher Program, through local adult education, covers all costs of the exams.', 'El HiSET Voucher Program, a través de la educación para adultos local, cubre todos los costos de los exámenes.'),
}

# Attente avant une reprise au centre (pages d'État, section « Test Retake Policies », lues le 2026-10-22).
# Règle de la plupart des États : aucune attente pour les deux premières reprises, 60 jours après la 3e tentative.
# w1 = jours avant chacune des deux premières reprises ; w3 = jours après la 3e tentative ; cap = tentatives par an.
# En ligne (toutes les pages) : une reprise, puis 60 jours après deux tentatives.
WAIT = {
 'CT': dict(w1=60, w3=60, cap=3),
 'NY': dict(w1=60, w3=60, cap=3, noRetakePassed=True),
 'DC': dict(w1=30, w3=60, readyBeforeRetake=True),
 'VT': dict(w1=0, w3=0, cap=3),
 'WV': dict(w1=14, w3=60, cap=4),
 'WY': dict(w1=7, w3=7, cap=7),
}

# Relevé automatique des prix GED (scripts/update-data.mjs) : prix au centre, en ligne et reprise réduite,
# seulement quand la phrase de la page a été retrouvée telle quelle. Le reste (aides, âges, attentes) est lu à la main.
RELEVE = os.path.join(ROOT, 'data/facts/releve-ged.json')
GREAD = READ
if os.path.exists(RELEVE):
    rel = json.load(open(RELEVE))
    for code, vals in rel.get('states', {}).items():
        if code in G: G[code].update(vals)
    if rel.get('read') and rel['read'] > GREAD: GREAD = rel['read']

out = {'read': max(READ, GREAD), 'gedRead': GREAD, 'hisetRead': READ, 'states': []}
for code, en, es, gslug, hslug in STATES:
    s = {'code': code, 'en': en, 'es': es}
    if code in G:
        g = dict(G[code]); g.setdefault('nd', 1); g.update(WAIT.get(code, dict(w1=0, w3=60)))
        if code in GHELP: g['help'] = {'en': GHELP[code][0], 'es': GHELP[code][1]}
        g['url'] = f'https://www.ged.com/{"es/" if code == "MI" else ""}policies/{gslug}/'
        s['ged'] = g
    if code in H:
        h = dict(H[code])
        if code in HHELP: h['help'] = {'en': HHELP[code][0], 'es': HHELP[code][1]}
        h['url'] = f'https://hiset.org/{hslug}/'
        s['hiset'] = h
    out['states'].append(s)
assert len(out['states']) == 51
os.makedirs(os.path.join(ROOT, 'src/data'), exist_ok=True)
json.dump(out, open(os.path.join(ROOT, 'src/data/hse.json'), 'w'), indent=1, ensure_ascii=False)
print('states', len(out['states']), 'GED', sum('ged' in s for s in out['states']), 'HiSET', sum('hiset' in s for s in out['states']))
