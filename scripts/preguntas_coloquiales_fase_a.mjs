import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { responder } from "../app/www/core/respuesta.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { fichas } = JSON.parse(await readFile(path.join(root, "contenido/fichas/fichas-v1.0.0.json"), "utf8"));
const questions = [
  "que es el paramo y pa que sirve?",
  "brisas es como la entrada del parque cierto?",
  "por que le dicen aguacerales",
  "como se ase el agua en aguacerales?",
  "cuanto mide arenales de altura mas o menos",
  "la arena de arenales de donde salio?",
  "que edad tienen esas dunas o no se sabe",
  "que son esos lunares en la montaña?",
  "por que se ve rayada la piedra en lunares",
  "que quiere decir kumanday?",
  "kumanday quiere decir nariz humeante o algo asi?",
  "cuantos murieron en armero en el 85?",
  "el glaciar cuanto mide hoy?",
  "el volcan esta en alerta amarilla ahora?",
  "va a llover esta tarde o q",
  "me duele la cabeza y tengo nauseas que hago",
  "puedo subir mas arriba del valle de las tumbas?",
  "puedo pisar la duna pa tomarme foto?",
  "hola camino",
  "gracias por la info",
];
const rows = [];
for (const question of questions) {
  const started = performance.now();
  const result = responder(question, fichas, { station: "Arenales" });
  rows.push({
    pregunta: question,
    respuesta: result.text.replace(/\s+/g, " ").slice(0, 180),
    cita: result.sources.map((source) => source.guion + ", p. " + source.pagina).join("; ") || "—",
    estado: result.status,
    segundos: ((performance.now() - started) / 1000).toFixed(4),
  });
}
console.table(rows);
console.log("TOTAL: " + rows.length + " preguntas; tabla incluye respuesta, cita, estado y latencia JS.");
