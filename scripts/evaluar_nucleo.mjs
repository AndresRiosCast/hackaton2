import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { responder, tokenize } from "../app/www/core/respuesta.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fichas = JSON.parse(await readFile(path.join(root, "contenido/fichas/fichas-v1.0.0.json"), "utf8")).fichas;
const preguntas = JSON.parse(await readFile(path.join(root, "contenido/preguntas_oro-v1.0.0.json"), "utf8")).preguntas;

function hasSource(actual, expected) {
  return actual.some((source) => source.guion === expected.guion && source.pagina === expected.pagina);
}

function expectedStatus(item) {
  const mode = item.comportamiento;
  if (mode === "responder_como_relato_o_abstenerse") return ["cultural", "abstained"];
  if (mode === "abstenerse_y_aclarar_fecha" || mode === "explicar_fechas") return ["dated_context"];
  if (mode.startsWith("abstenerse") || mode.startsWith("rechazar")) return ["abstained", "review_required"];
  if (mode.startsWith("explicitar_discrepancia") || mode.startsWith("explicitar_diferencia") || mode.startsWith("explicitar_contradiccion")) return ["conflict"];
  if (mode.startsWith("explicitar_incertidumbre")) return ["conflict", "cultural"];
  if (mode.startsWith("explicar_variacion")) return ["multi_source"];
  if (mode.includes("relato") || mode.includes("cultural")) return ["cultural"];
  if (mode.startsWith("responder_con_fecha")) return ["answered", "dated_context"];
  return ["answered", "review_required"];
}

const failures = [];
for (const item of preguntas) {
  const result = responder(item.pregunta, fichas);
  const accepted = expectedStatus(item).includes(result.status);
  const missingSources = item.citas_esperadas.filter((expected) => !hasSource(result.sources, expected));
  const citationRequired = item.citas_esperadas.length > 0;
  const referenceTokens = [...new Set(tokenize(item.respuesta_referencia))];
  const literalTokens = new Set(result.evidence.flatMap((item) => tokenize(item.literal)));
  const contentOverlap = referenceTokens.filter((token) => literalTokens.has(token)).length;
  const evidenceMismatch = citationRequired && contentOverlap < Math.min(2, referenceTokens.length);
  if (!accepted || (citationRequired && missingSources.length) || evidenceMismatch) {
    failures.push({ id: item.id, expected: expectedStatus(item), actual: result.status, missingSources, contentOverlap, query: item.pregunta });
  }
}

console.log(`Fichas activas: ${fichas.filter((card) => card.activo).length}/${fichas.length}`);
console.log(`Preguntas de oro: ${preguntas.length}`);
console.log(`Preguntas con flujo esperado, evidencia léxica y citas válidas: ${preguntas.length - failures.length}/${preguntas.length}`);
const example = responder("¿Cómo se forma el agua que vemos en Aguacerales?", fichas);
console.log("EJEMPLO LITERAL:");
console.log(example.text);
console.log(`CITA: ${example.sources.map((source) => `${source.guion}, p. ${source.pagina}`).join("; ") || "sin cita: abstención"}`);
const alertExample = responder("¿Cuál es el nivel de alerta del volcán hoy?", fichas);
console.log(`EJEMPLO DE ABSTENCIÓN: ${alertExample.text}`);
if (failures.length) {
  console.log("FALLAS:");
  for (const failure of failures) console.log(JSON.stringify(failure));
  process.exitCode = 1;
} else {
  console.log("RESULTADO: OK");
}
