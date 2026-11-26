import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { redactarConRespaldo } from "../app/www/core/redaccion_local.js";
import { validarFichas } from "../app/www/core/contenido_local.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataset = JSON.parse(await readFile(path.join(root, "contenido/fichas/fichas-v1.0.0.json"), "utf8"));
const base = { status: "answered", text: dataset.fichas[0].texto, sources: [{ guion: dataset.fichas[0].guion, pagina: dataset.fichas[0].pagina }], evidence: [{ literal: dataset.fichas[0].texto }] };
const checks = [];
function check(name, ok) { checks.push({ name, ok }); }

check("valida el conjunto oficial local", validarFichas(dataset).fichas.length === 45);
const literal = await redactarConRespaldo(base, null);
check("sin bridge devuelve fragmento literal", literal.mode === "literal" && literal.text === base.text);
const failed = await redactarConRespaldo(base, { rewrite: async () => { throw new Error("modelo no disponible"); } });
check("error del modelo conserva literal", failed.mode === "literal" && failed.text === base.text);
const tampered = await redactarConRespaldo(base, { rewrite: async () => "El oso de anteojos vive aquí y mide 9000 metros." });
check("salida que añade datos/cifras se rechaza", tampered.mode === "literal" && tampered.text === base.text);
const abstention = await redactarConRespaldo({ ...base, status: "abstained", evidence: [] }, { rewrite: async () => "Una afirmación inventada." });
check("abstención nunca se envía al modelo", abstention.mode === "literal" && abstention.text === base.text);
for (const item of checks) console.log(`${item.ok ? "OK" : "FALLO"}: ${item.name}`);
console.log(`Resultado redactor/contenido: ${checks.filter((x) => x.ok).length}/${checks.length}`);
if (checks.some((x) => !x.ok)) process.exitCode = 1;
