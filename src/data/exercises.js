export const CATEGORIES = {
  WARMUP: 'Uppvärmning',
  TECHNIQUE: 'Teknik',
  GAME: 'Spelövning',
  FINISHING: 'Avslutning',
};

export const defaultExercises = [
  // ── UPPVÄRMNING ──────────────────────────────────────────────
  {
    id: 'ex-1',
    name: 'Dribbling med kommandon',
    description:
      'Alla spelare har varsin boll i ett 20×20m område. Spelarna dribblar fritt medan tränaren ropar kommandon: "höger" (bara höger fot), "vänster" (bara vänster fot), "sula" (stoppa bollen med sulan), "vänd" (snabb vändning), "tempo" (öka farten). Byt kommando var 15–20:e sekund. Progression: minska ytan för att öka svårighetsgraden.',
    category: 'Uppvärmning',
    duration: 8,
    isCustom: false,
    setup: {
      width: 20, height: 20,
      players: [
        { x: 5, y: 5 }, { x: 15, y: 4 }, { x: 10, y: 10 },
        { x: 4, y: 15 }, { x: 16, y: 14 }, { x: 8, y: 17 },
        { x: 14, y: 8 }, { x: 3, y: 10 },
      ],
      balls: [
        { x: 5.8, y: 5.5 }, { x: 15.8, y: 4.5 }, { x: 10.8, y: 10.5 },
        { x: 4.8, y: 15.5 }, { x: 16.8, y: 14.5 }, { x: 8.8, y: 17.5 },
        { x: 14.8, y: 8.5 }, { x: 3.8, y: 10.5 },
      ],
      cones: [{ x: 0, y: 0 }, { x: 20, y: 0 }, { x: 0, y: 20 }, { x: 20, y: 20 }],
      arrows: [
        { x1: 5, y1: 5, x2: 8, y2: 3 },
        { x1: 10, y1: 10, x2: 12, y2: 13 },
        { x1: 16, y1: 14, x2: 13, y2: 16 },
      ],
    },
  },
  {
    id: 'ex-2',
    name: 'Jagar-tagen med boll',
    description:
      '20×20m yta. Alla har varsin boll utom 2 jagare (västar). Jagarna dribblar sin boll OCH försöker nudda andra spelare. Blir man tagen fryser man med bollen ovanför huvudet – en kompis befriar genom att spela en passning mellan den frystes ben. Byt jagare var 2:a minut. Tränar: dribbling under press, uppfattning, kommunikation.',
    category: 'Uppvärmning',
    duration: 8,
    isCustom: false,
    setup: {
      width: 20, height: 20,
      players: [
        { x: 5, y: 5 }, { x: 15, y: 4 }, { x: 10, y: 12 },
        { x: 4, y: 16 }, { x: 16, y: 16 }, { x: 12, y: 7 },
        { x: 3, y: 8, team: 'away', label: 'J' }, { x: 17, y: 10, team: 'away', label: 'J' },
      ],
      balls: [
        { x: 5.8, y: 5.5 }, { x: 15.8, y: 4.5 }, { x: 10.8, y: 12.5 },
        { x: 4.8, y: 16.5 }, { x: 16.8, y: 16.5 }, { x: 12.8, y: 7.5 },
        { x: 3.8, y: 8.5 }, { x: 17.8, y: 10.5 },
      ],
      cones: [{ x: 0, y: 0 }, { x: 20, y: 0 }, { x: 0, y: 20 }, { x: 20, y: 20 }],
      arrows: [
        { x1: 3, y1: 8, x2: 5, y2: 6 },
        { x1: 17, y1: 10, x2: 15, y2: 12 },
      ],
    },
  },
  {
    id: 'ex-3',
    name: 'Stafett med dribbling',
    description:
      'Två eller tre lag i stafett. Bana: dribbling i slalom genom 5 koner (2m mellanrum), vändning runt en stolpe, rakt tillbaka med tempo och passning till nästa i kön. Tävlingsmoment gör övningen intensiv. Variation: bara vänster fot, bara utsida, eller lägg till ett skott på minimål vid vändningen.',
    category: 'Uppvärmning',
    duration: 10,
    isCustom: false,
    setup: {
      width: 25, height: 12,
      players: [
        { x: 1, y: 3, label: 'A' }, { x: 1, y: 4.5 }, { x: 1, y: 6 },
        { x: 1, y: 8, label: 'B' }, { x: 1, y: 9.5 }, { x: 1, y: 11 },
      ],
      cones: [
        { x: 5, y: 3 }, { x: 9, y: 3 }, { x: 13, y: 3 }, { x: 17, y: 3 }, { x: 21, y: 3 },
        { x: 5, y: 8 }, { x: 9, y: 8 }, { x: 13, y: 8 }, { x: 17, y: 8 }, { x: 21, y: 8 },
      ],
      arrows: [
        { x1: 2, y1: 3, x2: 5, y2: 2 },
        { x1: 5, y1: 2, x2: 9, y2: 4 },
        { x1: 9, y1: 4, x2: 13, y2: 2 },
        { x1: 13, y1: 2, x2: 17, y2: 4 },
        { x1: 17, y1: 4, x2: 23, y2: 3 },
      ],
      balls: [{ x: 2, y: 3 }, { x: 2, y: 8 }],
      labels: [{ x: 24, y: 3.5, text: '↺' }, { x: 24, y: 8.5, text: '↺' }],
    },
  },
  {
    id: 'ex-4',
    name: 'Rörlighetsbank utan boll',
    description:
      'Dynamisk uppvärmning i fyra stationer (4–5m mellan varje). Station 1: höga knän. Station 2: hälspark. Station 3: sidosteg med armsving. Station 4: skutthopp med knähöjd. Spelarna går igenom banan 3–4 gånger med ökande intensitet. Avsluta med 2–3 korta spurter (10m). Förbereder kroppen inför träning och minskar skaderisk.',
    category: 'Uppvärmning',
    duration: 7,
    isCustom: false,
    setup: {
      width: 25, height: 10,
      players: [{ x: 1, y: 5 }, { x: 1, y: 3 }, { x: 1, y: 7 }],
      cones: [
        { x: 5, y: 5 }, { x: 10, y: 5 }, { x: 15, y: 5 }, { x: 20, y: 5 },
      ],
      arrows: [
        { x1: 2, y1: 5, x2: 4, y2: 5 },
        { x1: 6, y1: 5, x2: 9, y2: 5 },
        { x1: 11, y1: 5, x2: 14, y2: 5 },
        { x1: 16, y1: 5, x2: 19, y2: 5 },
      ],
      labels: [
        { x: 5, y: 8, text: 'Höga knän' },
        { x: 10, y: 8, text: 'Hälspark' },
        { x: 15, y: 8, text: 'Sidosteg' },
        { x: 20, y: 8, text: 'Skutt' },
      ],
    },
  },
  {
    id: 'ex-5',
    name: 'Bollkontroll i rutor',
    description:
      'Varje spelare har en ruta (3×3m markerad med koner) och en boll. Tränaren ropar övningar: 10 toucher med höger insida, 10 med vänster insida, drag med sulan framåt-bakåt, sidodrag med sulan, L-drag (sula + insida), vändning med utsida. Spelarna utför övningen i sin ruta. 30 sek per övning, sedan vila. Bra för individuell teknik i uppvärmningen.',
    category: 'Uppvärmning',
    duration: 7,
    isCustom: false,
    setup: {
      width: 22, height: 14,
      zones: [
        { x: 1, y: 1, w: 4, h: 4 }, { x: 7, y: 1, w: 4, h: 4 }, { x: 13, y: 1, w: 4, h: 4 },
        { x: 1, y: 8, w: 4, h: 4 }, { x: 7, y: 8, w: 4, h: 4 }, { x: 13, y: 8, w: 4, h: 4 },
      ],
      players: [
        { x: 3, y: 3 }, { x: 9, y: 3 }, { x: 15, y: 3 },
        { x: 3, y: 10 }, { x: 9, y: 10 }, { x: 15, y: 10 },
      ],
      balls: [
        { x: 3.7, y: 3.5 }, { x: 9.7, y: 3.5 }, { x: 15.7, y: 3.5 },
        { x: 3.7, y: 10.5 }, { x: 9.7, y: 10.5 }, { x: 15.7, y: 10.5 },
      ],
    },
  },

  // ── TEKNIK ───────────────────────────────────────────────────
  {
    id: 'ex-6',
    name: 'Passning insida – par',
    description:
      'Spelare i par, 6–8m avstånd. Passa med insidan – fokus på teknik: stödfoten bredvid bollen och pekande mot partnern, träffa mitt på bollen, fotleden spänd, följ igenom med sparkfoten. 10 passningar per fot. Progression: öka distans till 10–12m, passa med ett touch, passa med utsidan.',
    category: 'Teknik',
    duration: 10,
    isCustom: false,
    setup: {
      width: 16, height: 10,
      players: [
        { x: 3, y: 5, label: 'A' }, { x: 13, y: 5, label: 'B' },
      ],
      balls: [{ x: 5, y: 5 }],
      arrows: [
        { x1: 5, y1: 5, x2: 11, y2: 5, dashed: true },
        { x1: 11, y1: 4.5, x2: 5, y2: 4.5, dashed: true },
      ],
      labels: [{ x: 8, y: 2, text: '6–8 m' }],
    },
  },
  {
    id: 'ex-7',
    name: 'Mottagning – vändning – dribbling',
    description:
      'Par med en boll, 8m avstånd, en kon 3m bakom mottagaren. A passar till B. B tar emot med öppen kropp (halvvänd), vänder runt konen med bollen och dribblar tillbaka. Sedan passar B till A som gör samma sak. Fokus: titta över axeln innan mottagning, mjuk första touch i rörelseriktningen, skydda bollen i vändningen. 8 repetitioner var.',
    category: 'Teknik',
    duration: 10,
    isCustom: false,
    setup: {
      width: 20, height: 10,
      players: [
        { x: 2, y: 5, label: 'A' }, { x: 12, y: 5, label: 'B' },
      ],
      cones: [{ x: 16, y: 5 }],
      balls: [{ x: 4, y: 5 }],
      arrows: [
        { x1: 4, y1: 5, x2: 10, y2: 5, dashed: true },
        { x1: 12, y1: 5.5, x2: 16, y2: 5.5 },
        { x1: 16, y1: 4.5, x2: 12, y2: 4.5 },
      ],
    },
  },
  {
    id: 'ex-8',
    name: 'Triangelpassning',
    description:
      'Tre spelare i en triangel med 7m sidor. Bollen passas runt triangeln medurs. Mottagaren tar emot med ena foten och passar med andra. Byt riktning var 2:a minut. Progression: ett-touch-passning, dubbla bollar (två bollar i triangeln samtidigt). Tränar: passningsprecision, mottagning, rytm och kommunikation.',
    category: 'Teknik',
    duration: 10,
    isCustom: false,
    setup: {
      width: 16, height: 14,
      players: [
        { x: 8, y: 2, label: 'A' }, { x: 2, y: 12, label: 'B' }, { x: 14, y: 12, label: 'C' },
      ],
      balls: [{ x: 6, y: 6 }],
      arrows: [
        { x1: 8, y1: 3.5, x2: 3, y2: 11, dashed: true },
        { x1: 3.5, y1: 12, x2: 12.5, y2: 12, dashed: true },
        { x1: 13, y1: 11, x2: 8.5, y2: 3.5, dashed: true },
      ],
      labels: [{ x: 8, y: 8, text: '7 m' }],
    },
  },
  {
    id: 'ex-9',
    name: 'Skottövning – tre steg',
    description:
      'Kö från 16m. Steg 1: dribbling mot mål + avslut (placering). Steg 2: passning från sidan, mottagning + skott (första touch framåt). Steg 3: väggpassning med en medspelare, löpning runt kon, passning tillbaka, avslut. Skjut med båda fötterna. Fokus: placering före kraft, sikta i hörnen, skjut med vristen eller insidan.',
    category: 'Teknik',
    duration: 12,
    isCustom: false,
    setup: {
      width: 25, height: 18,
      goals: [{ x: 12.5, y: 0, w: 6 }],
      players: [
        { x: 12, y: 14, label: '1' }, { x: 12, y: 16 }, { x: 12, y: 18 },
        { x: 4, y: 6, label: 'P' },
      ],
      cones: [{ x: 8, y: 10 }],
      balls: [{ x: 12.8, y: 14.5 }],
      arrows: [
        { x1: 12, y1: 13, x2: 12, y2: 4 },
        { x1: 4, y1: 6, x2: 10, y2: 8, dashed: true },
      ],
    },
  },
  {
    id: 'ex-10',
    name: 'Konslalom – dribbling',
    description:
      '6 koner i sicksack med 1.5m mellanrum. Spelarna dribblar igenom med nära bollkontroll, insida-utsida-växling. Kör med höger fot ut, vänster fot tillbaka. Tävling: vem gör banan snabbast utan att tappa bollen? Progression: använd bara utsidan, lägg till en fint vid varje kon, öka hastigheten.',
    category: 'Teknik',
    duration: 8,
    isCustom: false,
    setup: {
      width: 18, height: 10,
      players: [{ x: 1, y: 5 }],
      cones: [
        { x: 4, y: 3 }, { x: 7, y: 7 }, { x: 10, y: 3 }, { x: 13, y: 7 }, { x: 16, y: 3 },
      ],
      balls: [{ x: 1.8, y: 5.3 }],
      arrows: [
        { x1: 2, y1: 5, x2: 4, y2: 3.5 },
        { x1: 4, y1: 3.5, x2: 7, y2: 6.5 },
        { x1: 7, y1: 6.5, x2: 10, y2: 3.5 },
        { x1: 10, y1: 3.5, x2: 13, y2: 6.5 },
        { x1: 13, y1: 6.5, x2: 16, y2: 3.5 },
      ],
    },
  },
  {
    id: 'ex-11',
    name: 'Nickträning i par',
    description:
      'Par, 3m avstånd. A kastar (underkast) till B som nickar tillbaka. Fokus: möt bollen med pannan, ögon öppna, nacken spänd, böj knäna och pressa framåt med överkroppen. 8 nickar sedan byt. Progression: öka avstånd, kasta högre, nick med riktning (vänster/höger). OBS: lågt tryck för denna ålder – teknik före kraft.',
    category: 'Teknik',
    duration: 8,
    isCustom: false,
    setup: {
      width: 12, height: 8,
      players: [
        { x: 3, y: 4, label: 'A' }, { x: 9, y: 4, label: 'B' },
      ],
      balls: [{ x: 6, y: 2.5 }],
      arrows: [
        { x1: 3.5, y1: 3, x2: 6, y2: 1.5, dashed: true },
        { x1: 6, y1: 1.5, x2: 8.5, y2: 3 },
      ],
      labels: [{ x: 6, y: 6.5, text: '3 m' }],
    },
  },
  {
    id: 'ex-12',
    name: 'Passningsruta – 4 hörn',
    description:
      'Fyra koner i en ruta (8×8m), en spelare per hörn, två bollar. Pass diagonalt och spring till nästa hörn (medurs). Kräver timing och kommunikation – "nu!" innan passning. Variation: passa till motstående hörn och spring till grannhörnet. Progression: ett-touch, tre bollar. Tränar: passningsprecision under stress, kommunikation, rörelse utan boll.',
    category: 'Teknik',
    duration: 10,
    isCustom: false,
    setup: {
      width: 14, height: 14,
      cones: [{ x: 3, y: 3 }, { x: 11, y: 3 }, { x: 3, y: 11 }, { x: 11, y: 11 }],
      players: [
        { x: 3, y: 3, label: 'A' }, { x: 11, y: 3, label: 'B' },
        { x: 3, y: 11, label: 'C' }, { x: 11, y: 11, label: 'D' },
      ],
      balls: [{ x: 4, y: 4 }, { x: 10, y: 10 }],
      arrows: [
        { x1: 4, y1: 4, x2: 10, y2: 10, dashed: true },
        { x1: 10, y1: 4, x2: 4, y2: 10, dashed: true },
        { x1: 3, y1: 4, x2: 3, y2: 9.5 },
        { x1: 11, y1: 4, x2: 11, y2: 9.5 },
      ],
      labels: [{ x: 7, y: 1.5, text: '8 m' }],
    },
  },
  {
    id: 'ex-13',
    name: 'Väggpassning (1-2:a)',
    description:
      'Par vid en konrad (20m lång). A passar till B som står vid sidan, springer förbi, B spelar en direkt passning i A:s löpväg. A tar emot och dribblar till nästa kon. Byt roller varannan gång. Fokus: passningskvalitet, timing i löpningen, första touchen i fart. Progression: öka farten, lägg till en försvarare.',
    category: 'Teknik',
    duration: 10,
    isCustom: false,
    setup: {
      width: 24, height: 10,
      players: [
        { x: 2, y: 5, label: 'A' }, { x: 8, y: 2, label: 'B' },
      ],
      cones: [{ x: 8, y: 5 }, { x: 16, y: 5 }, { x: 22, y: 5 }],
      balls: [{ x: 3, y: 5 }],
      arrows: [
        { x1: 3.5, y1: 5, x2: 7.5, y2: 3, dashed: true },
        { x1: 8, y1: 3, x2: 12, y2: 5, dashed: true },
        { x1: 2, y1: 4.5, x2: 12, y2: 4.5 },
      ],
    },
  },

  // ── SPELÖVNINGAR ─────────────────────────────────────────────
  {
    id: 'ex-14',
    name: 'Smålagsspel 4 mot 4',
    description:
      'Plan: 25×20m med små mål (2m breda) utan målvakt. 4 mot 4. Speltid: 3–4 min, sedan vila och byt lag. Regler: inkast med fot, hörna = inspark. Coacha: spelbredd (använd hela ytan), spelavstånd (nära nog att passa), vänd spelet om det är trångt. Få spelare = många bollkontakter och snabba beslut.',
    category: 'Spelövning',
    duration: 15,
    isCustom: false,
    setup: {
      width: 25, height: 20,
      goals: [{ x: 12.5, y: 0, w: 3 }, { x: 12.5, y: 20, w: 3 }],
      players: [
        { x: 8, y: 5 }, { x: 17, y: 5 }, { x: 6, y: 10 }, { x: 18, y: 12 },
        { x: 10, y: 15, team: 'away' }, { x: 16, y: 8, team: 'away' },
        { x: 7, y: 16, team: 'away' }, { x: 19, y: 15, team: 'away' },
      ],
      balls: [{ x: 12, y: 10 }],
    },
  },
  {
    id: 'ex-15',
    name: 'Bollinnehav 3 mot 1 (rondo)',
    description:
      'Ruta 8×8m. Tre anfallare runt kanten, en försvarare i mitten. Anfallarna ska hålla bollen med max 2 toucher. Försvararen pressar aktivt. Spelaren som tappar bollen byter plats med försvararen. Mål: 10 passningar i rad = poäng. Tränar: snabba passningar, spelbarhet (öppna kroppen), rörelse för att bli spelbar.',
    category: 'Spelövning',
    duration: 12,
    isCustom: false,
    setup: {
      width: 14, height: 14,
      zones: [{ x: 3, y: 3, w: 8, h: 8 }],
      players: [
        { x: 7, y: 3, label: 'A' }, { x: 3, y: 9, label: 'B' }, { x: 11, y: 9, label: 'C' },
        { x: 7, y: 7, team: 'away', label: 'F' },
      ],
      balls: [{ x: 7.8, y: 3.5 }],
      arrows: [
        { x1: 7.5, y1: 4, x2: 4, y2: 8.5, dashed: true },
        { x1: 4, y1: 9.5, x2: 10, y2: 9.5, dashed: true },
      ],
    },
  },
  {
    id: 'ex-16',
    name: 'Kontring 3 mot 2',
    description:
      'Halva planen. Tre anfallare startar vid mittlinjen med bollen, mot 2 försvarare + målvakt. Snabbt anfall – avslut inom 8 sekunder. Anfallarna ska utnyttja överta: spela brett, en löper djupt, väggspel för att komma förbi. Rotera lag efter varje anfall. Fokus: snabba beslut, avslut, spelbredd i kontring.',
    category: 'Spelövning',
    duration: 12,
    isCustom: false,
    setup: {
      width: 25, height: 22,
      goals: [{ x: 12.5, y: 0, w: 6 }],
      players: [
        { x: 8, y: 20, label: 'A' }, { x: 13, y: 20, label: 'A' }, { x: 18, y: 20, label: 'A' },
        { x: 9, y: 8, team: 'away', label: 'F' }, { x: 16, y: 8, team: 'away', label: 'F' },
        { x: 12.5, y: 2, label: 'MV' },
      ],
      balls: [{ x: 13.8, y: 20.5 }],
      arrows: [
        { x1: 8, y1: 19, x2: 6, y2: 8 },
        { x1: 13, y1: 19, x2: 13, y2: 10 },
        { x1: 18, y1: 19, x2: 20, y2: 8 },
      ],
    },
  },
  {
    id: 'ex-17',
    name: 'Positionsspel 5 mot 3',
    description:
      'Ruta 15×15m. 5 spelare bildar en ring runt kanten + 1 inuti, mot 3 försvarare i mitten. De 5 ska hålla bollen med max 2 toucher. Spelare inuti rutan rör sig fritt och skapar passningsalternativ. Försvarare som vinner bollen byter med den som tappade. Tränar: bollinnehav, positionering, spelbarhet, press.',
    category: 'Spelövning',
    duration: 12,
    isCustom: false,
    setup: {
      width: 18, height: 18,
      zones: [{ x: 1.5, y: 1.5, w: 15, h: 15 }],
      players: [
        { x: 9, y: 1.5 }, { x: 1.5, y: 6 }, { x: 16.5, y: 6 },
        { x: 3, y: 15 }, { x: 15, y: 15 }, { x: 9, y: 9 },
        { x: 7, y: 7, team: 'away' }, { x: 11, y: 7, team: 'away' }, { x: 9, y: 11, team: 'away' },
      ],
      balls: [{ x: 9.8, y: 2 }],
      arrows: [
        { x1: 9.5, y1: 2.5, x2: 15, y2: 6, dashed: true },
        { x1: 15, y1: 6.5, x2: 9, y2: 9.5, dashed: true },
      ],
    },
  },
  {
    id: 'ex-18',
    name: 'Zonspel – uppspel med avslut',
    description:
      'Plan 30×20m delad i 3 zoner. Lag A anfaller, lag B försvarar. Lag A måste göra minst 3 passningar i zon 1 innan de får spela in i zon 2, sedan 2 passningar i zon 2 innan spel till zon 3. I zon 3: fritt, avslut på mål. Tränar tålamod i uppspelet, spelbredd och speldjup. Byt anfall/försvar var 3:e minut.',
    category: 'Spelövning',
    duration: 15,
    isCustom: false,
    setup: {
      width: 30, height: 20,
      goals: [{ x: 15, y: 0, w: 5 }],
      zones: [
        { x: 0, y: 13.3, w: 30, h: 6.7, color: '#3b82f6' },
        { x: 0, y: 6.7, w: 30, h: 6.6, color: '#a855f7' },
        { x: 0, y: 0, w: 30, h: 6.7, color: '#ef4444' },
      ],
      players: [
        { x: 8, y: 17 }, { x: 22, y: 17 }, { x: 15, y: 15 },
        { x: 10, y: 10 }, { x: 20, y: 10 },
        { x: 8, y: 5, team: 'away' }, { x: 22, y: 5, team: 'away' },
        { x: 15, y: 2, label: 'MV' },
      ],
      balls: [{ x: 15.7, y: 15.5 }],
      arrows: [
        { x1: 15, y1: 14, x2: 15, y2: 7, dashed: true },
      ],
      labels: [
        { x: 3, y: 17, text: 'Zon 1' },
        { x: 3, y: 10, text: 'Zon 2' },
        { x: 3, y: 3.5, text: 'Zon 3' },
      ],
    },
  },
  {
    id: 'ex-19',
    name: 'Match med specialregler',
    description:
      'Vanlig match 5 mot 5 eller 6 mot 6 men med en specialregel som byts var 5:e minut. Förslag: "Max 2 toucher" (snabbt spel), "Alla måste ha rört bollen innan skott" (samarbete), "Mål från inlägg räknas dubbelt" (bredd), "Mål med svaga foten räknas tredubbelt" (bägge fötter). Barnen kan föreslå egna regler.',
    category: 'Spelövning',
    duration: 15,
    isCustom: false,
    setup: {
      width: 30, height: 20,
      goals: [{ x: 15, y: 0, w: 5 }, { x: 15, y: 20, w: 5 }],
      players: [
        { x: 8, y: 5 }, { x: 15, y: 4 }, { x: 22, y: 5 }, { x: 10, y: 10 }, { x: 20, y: 8 },
        { x: 8, y: 15, team: 'away' }, { x: 15, y: 16, team: 'away' }, { x: 22, y: 15, team: 'away' },
        { x: 10, y: 12, team: 'away' }, { x: 20, y: 13, team: 'away' },
      ],
      balls: [{ x: 15, y: 10 }],
      labels: [{ x: 15, y: 18.5, text: 'Specialregel!' }],
    },
  },
  {
    id: 'ex-20',
    name: 'Anfallsspel med stödspelare',
    description:
      'Smålagsspel 4 mot 4 på 25×20m. Två neutrala stödspelare (västar) står på varsin långsida – de spelar alltid med laget som har bollen, vilket ger 6 mot 4 i bollinnehav. Stödspelarna har max 1 touch. Byt stödspelare var 3:e minut. Tränar: bredd i spelet, snabba sidbyten, inlägg och rörelse i boxen.',
    category: 'Spelövning',
    duration: 12,
    isCustom: false,
    setup: {
      width: 25, height: 20,
      goals: [{ x: 12.5, y: 0, w: 3 }, { x: 12.5, y: 20, w: 3 }],
      players: [
        { x: 8, y: 6 }, { x: 17, y: 6 }, { x: 8, y: 12 }, { x: 17, y: 12 },
        { x: 10, y: 8, team: 'away' }, { x: 15, y: 8, team: 'away' },
        { x: 10, y: 14, team: 'away' }, { x: 15, y: 14, team: 'away' },
      ],
      balls: [{ x: 9, y: 7 }],
      labels: [{ x: 0.5, y: 10, text: 'N' }, { x: 24.5, y: 10, text: 'N' }],
      zones: [
        { x: -0.5, y: 4, w: 1.5, h: 12, color: '#22c55e' },
        { x: 24, y: 4, w: 1.5, h: 12, color: '#22c55e' },
      ],
    },
  },

  // ── AVSLUTNING ───────────────────────────────────────────────
  {
    id: 'ex-21',
    name: 'Fri match',
    description:
      'Fri match utan specialregler, 15–20 min. Dela in två jämna lag. Låt barnen spela och lösa situationer själva – tränaren coachar minimalt och bara uppmuntrar. Bra för att avsluta träningen med spelglädje. Alla får vara med och spela lika mycket. Fokusera på det positiva efteråt: "Såg ni den passningen?" "Bra samarbete!"',
    category: 'Avslutning',
    duration: 15,
    isCustom: false,
    setup: {
      width: 30, height: 20,
      goals: [{ x: 15, y: 0, w: 5 }, { x: 15, y: 20, w: 5 }],
      players: [
        { x: 6, y: 5 }, { x: 15, y: 3 }, { x: 24, y: 5 }, { x: 10, y: 10 }, { x: 20, y: 10 },
        { x: 6, y: 15, team: 'away' }, { x: 15, y: 17, team: 'away' }, { x: 24, y: 15, team: 'away' },
        { x: 10, y: 12, team: 'away' }, { x: 20, y: 12, team: 'away' },
      ],
      balls: [{ x: 15, y: 10 }],
    },
  },
  {
    id: 'ex-22',
    name: 'Straffturnering',
    description:
      'Alla spelare skjuter varsin straff. Målvakten roterar (den som just skjutit blir målvakt). Gör det till en turnering med utslagning eller poängsystem. Variation: skjut med svaga foten, chip, placera i angivet hörn. Kul avslutning som tränar skotteknik och målvaktsspel under press. Fira alla mål!',
    category: 'Avslutning',
    duration: 8,
    isCustom: false,
    setup: {
      width: 20, height: 16,
      goals: [{ x: 10, y: 0, w: 6 }],
      players: [
        { x: 10, y: 10, label: '1' },
        { x: 7, y: 14 }, { x: 10, y: 14 }, { x: 13, y: 14 },
        { x: 10, y: 2, label: 'MV' },
      ],
      balls: [{ x: 10, y: 9 }],
      arrows: [{ x1: 10, y1: 8.5, x2: 8, y2: 1.5 }],
      cones: [{ x: 10, y: 10 }],
    },
  },
  {
    id: 'ex-23',
    name: 'Frispark- och hörneträning',
    description:
      'Friträning på dödbollar. Dela in i stationer: (1) Frisparkar från 18m – öva placering, kurva, kraft. (2) Hörnor – en slår, 3–4 anfallare möter. (3) Frispark med mur – 2–3 spelare i muren. Rotera stationer var 3:e minut. Avslappnad stämning – låt barnen experimentera med tekniker och vinklar.',
    category: 'Avslutning',
    duration: 10,
    isCustom: false,
    setup: {
      width: 25, height: 18,
      goals: [{ x: 12.5, y: 0, w: 6 }],
      players: [
        { x: 12, y: 12, label: 'S' },
        { x: 10, y: 7, team: 'away' }, { x: 12, y: 7, team: 'away' }, { x: 14, y: 7, team: 'away' },
        { x: 8, y: 4 }, { x: 16, y: 4 },
        { x: 12.5, y: 2, label: 'MV' },
      ],
      balls: [{ x: 12, y: 11 }],
      arrows: [{ x1: 12, y1: 10.5, x2: 10, y2: 1.5 }],
      labels: [{ x: 12, y: 8.5, text: 'Mur' }],
    },
  },
  {
    id: 'ex-24',
    name: 'Jonglering och freestyle',
    description:
      'Fri tid för att öva jonglering och tricks. Utmaning: vem klarar 5 juggles? 10? 20? Visa gärna tricks att prova: "Around the world", "Rainbow flick", eller bara växelvis höger-vänster. Lågintensiv avslutning som bygger bollkänsla. Uppmuntra och fira framsteg. Spela musik om möjligt!',
    category: 'Avslutning',
    duration: 5,
    isCustom: false,
    setup: {
      width: 16, height: 10,
      players: [
        { x: 3, y: 5 }, { x: 8, y: 3 }, { x: 13, y: 5 }, { x: 5, y: 8 }, { x: 11, y: 8 },
      ],
      balls: [
        { x: 3, y: 3.5 }, { x: 8, y: 1.5 }, { x: 13, y: 3.5 }, { x: 5, y: 6.5 }, { x: 11, y: 6.5 },
      ],
    },
  },
  {
    id: 'ex-25',
    name: 'Samling och nedvarvning',
    description:
      'Lugn jogg (2 min) följt av stretching i cirkel: vadmuskel, lårmuskel (framför och baksida), höftböjare, ljumske. Håll varje stretch i 20 sek. Samla sedan laget: gå igenom vad vi övade idag, ge specifik beröm ("Emil, bra passning i rondot!"), fråga barnen vad som var roligast och vad de vill göra nästa gång.',
    category: 'Avslutning',
    duration: 7,
    isCustom: false,
    setup: {
      width: 14, height: 14,
      players: [
        { x: 7, y: 2 }, { x: 11, y: 4 }, { x: 12, y: 9 },
        { x: 9, y: 12 }, { x: 4, y: 12 }, { x: 2, y: 8 },
        { x: 2, y: 4 }, { x: 5, y: 2 },
      ],
      labels: [{ x: 7, y: 7.5, text: 'Samling' }],
    },
  },
];
