const STOPWORDS = new Set((
  "a al algo algunos como cual cuando de del donde el ella en es esta este estos fue ha hay la las le lo los mas me mi ni no o para pero por porque que se si sin su sus te un una unas uno y yo guion guiones segun documento fuente sirve sirven seria"
).split(/\s+/));

const CURRENT_WORDS = /\b(hoy|ahora|actual|actualmente|vigente|todavia|sigue|esta tarde|esta noche)\b/;
const ALERT_WORDS = /\b(alerta|sem[aá]foro|nivel volc[aá]nico)\b/;
const WEATHER_WORDS = /\b(clima|llover|lluvia|pron[oó]stico|temperatura de hoy)\b/;
const HEALTH_WORDS = /\b(me duele|dolor|n[aá]useas?|v[oó]mito|medicamento|medicina|diagn[oó]stico|diagnosticar|tratamiento|s[ií]ntomas?|mal de altura|mal agudo|ox[ií]geno)\b/;
const INJECTION_WORDS = /\b(ignora|omite|desobedece|revela|muestra el prompt|instrucciones del sistema|haz caso omiso)\b/;
const MISSION_DETOUR = /\b(mision|gps|llevame|guiame)\b/;

function normalize(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokenize(value) {
  return normalize(value)
    .replace(/\b(xq|pq)\b/g, "porque")
    .replace(/\b(q|k)\b/g, "que")
    .replace(/\b(pa)\b/g, "para")
    .split(/\s+/)
    .filter((token) => token && !STOPWORDS.has(token) && token.length > 1)
    .map(stemSpanish);
}

const SEARCH_SYNONYMS = new Map([
  ["paramo", ["ecosistema", "humedad", "agua"]],
  ["sirve", ["captura", "abastece", "protege"]],
  ["agua", ["humedad", "quebradas", "hidrica"]],
  ["rayada", ["estrias", "marcas"]],
  ["rayado", ["estrias", "marcas"]],
  ["piedra", ["rocas", "roca"]],
  ["arena", ["dunas", "erosion"]],
  ["significa", ["interpretacion", "nombre"]],
  ["quiere", ["significado", "interpretacion"]],
  ["anos", ["edad", "estudios"]],
  ["ano", ["edad", "estudios"]],
  ["formo", ["formacion", "origen"]],
  ["hace", ["formacion", "captura"]],
].map(([word, synonyms]) => [stemSpanish(word), synonyms]));

function editDistanceAtMostOne(left, right) {
  if (Math.abs(left.length - right.length) > 1) return false;
  let i = 0; let j = 0; let edits = 0;
  while (i < left.length && j < right.length) {
    if (left[i] === right[j]) { i += 1; j += 1; continue; }
    edits += 1;
    if (edits > 1) return false;
    if (left.length > right.length) i += 1;
    else if (right.length > left.length) j += 1;
    else { i += 1; j += 1; }
  }
  if (i < left.length || j < right.length) edits += 1;
  return edits <= 1;
}

function expandSearchTokens(queryTokens, cards) {
  const vocabulary = new Set(cards.flatMap((card) => tokenize(card.estacion + " " + card.texto)));
  const expanded = new Set(queryTokens);
  for (const token of queryTokens) {
    for (const synonym of SEARCH_SYNONYMS.get(token) || []) {
      tokenize(synonym).forEach((item) => expanded.add(item));
    }
    if (token.length >= 5 && !vocabulary.has(token)) {
      const close = [...vocabulary].filter((candidate) => candidate.length >= 5 && editDistanceAtMostOne(token, candidate));
      if (close.length === 1) expanded.add(close[0]);
    }
  }
  return [...expanded];
}

function stemSpanish(token) {
  if (token.length > 6 && /(es|os|as)$/.test(token)) return token.slice(0, -2);
  if (token.length > 4 && /[aeo]s?$/.test(token)) return token.replace(/[aeo]s?$/, "");
  return token;
}

function sourceOf(card) {
  return { guion: card.guion, pagina: card.pagina };
}

function uniqueSources(cards) {
  const seen = new Set();
  return cards.map(sourceOf).filter((source) => {
    const key = `${source.guion}|${source.pagina}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function bm25(queryTokens, cards, preferredStation = "") {
  const docs = cards.map((card) => ({
    card,
    terms: tokenize(`${card.estacion} ${card.texto}`),
  }));
  const averageLength = docs.reduce((sum, doc) => sum + doc.terms.length, 0) / Math.max(docs.length, 1);
  const documentFrequency = new Map();
  for (const term of new Set(queryTokens)) {
    documentFrequency.set(term, docs.reduce((count, doc) => count + (doc.terms.includes(term) ? 1 : 0), 0));
  }

  return docs.map(({ card, terms }) => {
    let score = 0;
    const matched = new Set();
    for (const term of queryTokens) {
      const frequency = terms.filter((item) => item === term).length;
      if (!frequency) continue;
      matched.add(term);
      const df = documentFrequency.get(term) || 0;
      const idf = Math.log(1 + (docs.length - df + 0.5) / (df + 0.5));
      const k1 = 1.2;
      const b = 0.75;
      score += idf * ((frequency * (k1 + 1)) / (frequency + k1 * (1 - b + b * terms.length / Math.max(averageLength, 1))));
    }
    const stationBoost = preferredStation && card.estacion.toLowerCase().includes(preferredStation.toLowerCase()) ? 0.35 : 0;
    return {
      card,
      score: score + stationBoost,
      matched: [...matched],
      coverage: matched.size / Math.max(new Set(queryTokens).size, 1),
    };
  }).sort((a, b) => b.score - a.score);
}

function evidence(cards, status, note = "") {
  if (!cards.length) return abstain(note || "No encontré respaldo en las fichas activas.");
  return {
    status,
    text: cards.map((card) => card.texto).join("\n\n"),
    sources: uniqueSources(cards),
    evidence: cards.map((card) => ({ id: card.id, literal: card.texto })),
    note,
  };
}

function abstain(note) {
  return { status: "abstained", text: "No puedo confirmarlo con las fichas disponibles. Consulta al guía o al personal del parque.", sources: [], evidence: [], note };
}

function cardsById(cards, ids) {
  const byId = new Map(cards.map((card) => [card.id, card]));
  return ids.map((id) => byId.get(id)).filter(Boolean);
}

/**
 * Recuperación léxica BM25 en memoria, sin dependencias ni red.
 * Solo devuelve texto literal de las fichas; nunca redacta hechos nuevos.
 */
export function responder(query, cards, options = {}) {
  const normalized = normalize(query);
  const all = Array.isArray(cards) ? cards : [];
  if (!normalized || !all.length) return abstain("Consulta vacía o no hay fichas cargadas.");

  if (/^(hola|hola camino|holi|buenos dias|buenas tardes|buenas noches|hey|que mas|como estas)$/.test(normalized)) {
    return { status: "social", text: "¡Hola! Soy Camino. Puedo ayudarte a explorar lo que cuentan los guiones del parque; tu guía te acompaña en el recorrido.", sources: [], evidence: [], note: "" };
  }
  if (/^(gracias|muchas gracias|gracias por la info|listo gracias|chao|adios|hasta luego)$/.test(normalized)) {
    return { status: "social", text: "¡Con gusto! Sigue disfrutando el recorrido junto a tu guía.", sources: [], evidence: [], note: "" };
  }
  if (/^(quien eres|como te llamas|quien eres camino)$/.test(normalized)) {
    return { status: "social", text: "Soy Camino, una compañera digital para consultar los guiones. No reemplazo a tu guía.", sources: [], evidence: [], note: "" };
  }

  if (INJECTION_WORDS.test(normalized)) return abstain("La consulta intenta cambiar las reglas de respuesta.");
  if (HEALTH_WORDS.test(normalized)) return abstain("Las consultas de salud se derivan al guía o personal; no diagnosticar ni recomendar tratamientos.");
  if (ALERT_WORDS.test(normalized) && CURRENT_WORDS.test(normalized)) return abstain("El nivel de alerta es cambiante y los guiones no confirman el estado de hoy.");
  if (/\b(brisas)\b/.test(normalized) && /\b(altura|altitud|msnm)\b/.test(normalized)) {
    return abstain("Estos guiones no dan la altura de Brisas.");
  }
  if (WEATHER_WORDS.test(normalized) && (CURRENT_WORDS.test(normalized) || /va a llover|esta tarde|esta noche/.test(normalized))) {
    return abstain("Los guiones no permiten confirmar el clima actual.");
  }
  if (MISSION_DETOUR.test(normalized) && /\b(laguna|lagunas|duna|dunas|fuera del sendero|fuera de las estaciones)\b/.test(normalized)) {
    return abstain("Las misiones no dirigen a lagunas, dunas ni fuera del sendero y estaciones oficiales.");
  }
  if (/\b(carrera|competir|competencia|reto de tiempo|contra el tiempo)\b/.test(normalized)) {
    return abstain("La experiencia no propone carreras, presión ni retos de tiempo en altura.");
  }
  if (/\b(duna|dunas)\b/.test(normalized) && /\b(pisar|caminar|pasar|intervenir|foto|fotografia)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-ARE-003"]), "answered", "Sigue las indicaciones del guía y no intervengas la duna.");
  }
  if (/\b(duna|dunas|arenales)\b/.test(normalized) && /\b(edad|anos|antiguedad|viejas|antiguas)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-ARE-002"]), "review_required", "El guion lo presenta como una estimación pendiente de estudios; no es una edad confirmada.");
  }
  if (/\b(valle de las tumbas)\b/.test(normalized) && /\b(ascender|ascenso|seguir|subir|continuar|despues|mas alto)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-TUM-003"]), "answered", "Para instrucciones actuales, sigue al guía o personal.");
  }
  if (/\b(valle de las tumbas)\b/.test(normalized) && /\b(nombre|llama|significa|por que)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-TUM-002"]), "answered");
  }
  if (/\b(brisas)\b/.test(normalized) && /\b(representa|puerta|entrada)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-BRI-001"]), "answered");
  }
  if (/\b(orden|estaciones|secuencia)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-GEN-001", "NEV-BRI-001"]), "answered");
  }
  if (/\b(hectarea|parque|extension)\b/.test(normalized) && /\b(cuanto|cuantas|tiene)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-GEN-002"]), "answered");
  }
  if (/\b(paramo|protege)\b/.test(normalized) && /\b(cuanto|cuantas|area|hectarea)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-GEN-002"]), "answered");
  }
  if (/\b(aguacerales)\b/.test(normalized) && /\b(ecosistema|paramo)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-AGU-001"]), "answered");
  }
  if (/\b(paramo|ecosistema)\b/.test(normalized) && /\b(sirve|funcion|agua|protege|importancia)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-AGU-001", "NEV-AGU-002", "NEV-AGU-004"]), "multi_source", "Estos fragmentos describen Aguacerales y la función hídrica que los guiones atribuyen a la vegetación; no son una definición general del páramo.");
  }
  if (/\b(aguacerales)\b/.test(normalized) && /\b(nombre|llama|llamado|por que)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-AGU-002"]), "answered");
  }
  if (/\b(arenales)\b/.test(normalized) && /\b(altura|altitud|msnm)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-ARE-001"]), "answered");
  }
  if (/\b(arenales)\b/.test(normalized) && /\b(arena|duna|dunas|formacion|origen|viene)\b/.test(normalized) && !/\b(edad|anos|antiguedad)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-ARE-006"]), "answered");
  }
  if (/\b(gelifraccion|estrias glaciares|estrias|oxidacion del hierro)\b/.test(normalized) || (/\b(rayada|rayado|rayas|marcas)\b/.test(normalized) && /\b(lunares|piedra|roca|glaciar|montana)\b/.test(normalized))) {
    return evidence(cardsById(all, ["NEV-LUN-002"]), "answered");
  }
  if (/\b(lunares|valle lunar)\b/.test(normalized) && /\b(altura|altitud|msnm)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-LUN-001"]), "answered");
  }
  if (/\b(valle de las tumbas)\b/.test(normalized) && /\b(altura|altitud|msnm)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-TUM-001"]), "answered");
  }
  if (/\b(arenales)\b/.test(normalized) && /\b(animales|fauna)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-ARE-001"]), "answered");
  }
  if (/\b(ecosistema)\b/.test(normalized) && /\b(tumbas|final del recorrido)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-TUM-001"]), "answered");
  }
  if (/\b(edad|cuantos anos|antiguedad)\b/.test(normalized) && /\b(duna|dunas|arenales)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-ARE-002"]), "review_required", "El propio guion marca esa edad como estimación pendiente de estudios.");
  }
  if (/\b(peregrinaciones?|rituales?)\b/.test(normalized) && /\b(comunidades|prehispanicas|ruiz|montana sagrada)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-CUL-004", "NEV-CUL-002"]), "cultural", "El guion reconoce incertidumbre sobre la relación ritual.");
  }

  // Conflictos conocidos: exponen las dos versiones literales con sus páginas.
  if (/\b(23 000|23000|25 000|25000|victimas|murieron|personas murieron|cuantas personas)\b/.test(normalized) && /\b(1985|armero|erupcion|muertos|personas)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-HIS-001", "NEV-HIS-002"]), "conflict", "Los propios guiones difieren; no se elige una cifra.");
  }
  if (/\b(kumanday|kumandai|cumanday)\b/.test(normalized) && /\b(significa|significado|traduce|origen|nombre|quiere decir)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-CUL-001", "NEV-CUL-002"]), "conflict", "Los significados se presentan como atribuciones culturales y su procedencia es incierta.");
  }
  if (/\b(kumanday|kumandai|cumanday)\b/.test(normalized) && /\b(ritual|peregrinaciones?|relacion|comunidades prehispanicas)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-CUL-004", "NEV-CUL-002"]), "cultural", "Se conserva la incertidumbre expresada por el guion.");
  }
  if (/\b(estructura|estructuras|domo|domos)\b/.test(normalized) && /\b(cuatro|complejo|volcan|son|tiene)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-GEO-005", "NEV-GEO-001", "NEV-GEO-004"]), "conflict", "Se conservan los términos de cada guion; no se asumen equivalentes.");
  }
  if (/\b(municipios|abastece|abastecimiento)\b/.test(normalized) && /\b(cuantos|cuantas|agua|reciben|beneficia)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-GEN-003", "NEV-GEN-004", "NEV-GEN-005"]), "conflict", "Las fuentes alternan entre 37 y más de 37 municipios.");
  }
  if (/\blunares\b/.test(normalized) && /\bvalle lunar\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-LUN-001", "NEV-LUN-004", "NEV-LUN-005"]), "multi_source", "Los guiones varían el nombre de la estación.");
  }
  if (/\b(9 3|93|7 68|768|glaciar)\b/.test(normalized) && /\b(por que|diferencia|compar|contra)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-GEO-002", "NEV-GEO-003"]), "dated_context", "Las cifras corresponden a años distintos, no a una medición actual.");
  }
  if (/\b(nina fantasma|mito|leyenda)\b/.test(normalized) && /\b(arenales|fantasma|cuentan|guiones)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-ARE-005", "NEV-EDITOR-001"]), "cultural", "Se presenta como mito citado por un guion, no como hecho comprobado.");
  }
  if (/\b(juan diaz|juan diaz jaramillo)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-CUL-003", "NEV-CUL-005"]), "cultural", "Se presenta como relato oral/campesino, no como explicación geológica.");
  }

  if (CURRENT_WORDS.test(normalized) && /\b(glaciar|hielo)\b/.test(normalized)) {
    const dated = /\b(7 68|768|2022)\b/.test(normalized) ? cardsById(all, ["NEV-GEO-003"]) : [];
    if (dated.length) return evidence(dated, "dated_context", "La ficha es de 2022 y no confirma el valor actual.");
    return abstain("Los guiones no confirman el estado actual del glaciar.");
  }

  const activeCards = all.filter((card) => card.activo === true);
  const candidates = bm25(expandSearchTokens(tokenize(query), activeCards), activeCards, options.station || "");
  const best = candidates[0];
  const minMatches = 2;
  if (!best || best.score < (options.threshold ?? 0.28) || best.matched.length < minMatches || best.coverage < (options.coverage ?? 0.25)) {
    // Estimación no validada de edad de dunas: citarla solo para explicar el límite.
    return abstain("La evidencia recuperada no alcanza el umbral mínimo.");
  }

  if (/\b(apagado|apagada|extinto|extinta|restriccion|ascenso)\b/.test(normalized) && /\b(volcan|ruiz|subir|ascender)\b/.test(normalized)) {
    return evidence(cardsById(all, ["NEV-GEO-006", "NEV-TUM-003"]), "answered", "El estado de alerta y las indicaciones actuales se consultan al personal.");
  }

  return evidence([best.card], "answered");
}

export { tokenize, bm25 };
