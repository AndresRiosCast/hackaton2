/**
 * Puerta segura para un redactor nativo opcional.
 * Nunca consulta el modelo para abstenciones, conflictos o varios fragmentos.
 * Si no hay bridge, tarda demasiado o falla la validación, conserva el literal.
 */
const TIMEOUT_MS = 4500;
import { tokenize } from "./respuesta.js";

function normalize(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function safeRewrite(text, source) {
  const candidate = String(text || "").trim();
  if (!candidate || candidate.length > 700 || /https?:|<think>|\b(alerta|diagnostico|medicamento|dosis)\b/i.test(candidate)) return false;
  const nums = (value) => (value.match(/\d+(?:[.,]\d+)?/g) || []).sort().join("|");
  if (nums(candidate) !== nums(source)) return false;
  const sourceWords = new Set(tokenize(source));
  const outputWords = tokenize(candidate);
  const newNegation = /\b(no|nunca|sin|ningun|ninguna|tampoco)\b/.test(normalize(candidate))
    && !/\b(no|nunca|sin|ningun|ninguna|tampoco)\b/.test(normalize(source));
  return outputWords.length > 0 && !newNegation && outputWords.every((word) => sourceWords.has(word));
}

export async function redactarConRespaldo(result, nativeProvider = globalThis.Capacitor?.Plugins?.LocalLlm, question = "") {
  const literal = result.text;
  if (result.status !== "answered" || result.evidence?.length !== 1 || !result.sources?.length || !nativeProvider?.rewrite) {
    return { ...result, text: literal, mode: "literal" };
  }
  let timer;
  try {
    const rewritten = await Promise.race([
      nativeProvider.rewrite({
        question,
        fragments: result.evidence.map((item) => item.literal),
        instruction: "Responde en español claro con frases cortas y tono amable. Usa solo los fragmentos dados. No añadas hechos ni fuentes. Si no alcanzan, indica que no puedes confirmarlo.",
        maxTokens: 96,
      }),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error("timeout")), TIMEOUT_MS); }),
    ]);
    const text = typeof rewritten === "string" ? rewritten : rewritten?.text;
    if (!safeRewrite(text, result.evidence[0].literal)) return { ...result, text: literal, mode: "literal" };
    return { ...result, text, mode: "redacted" };
  } catch {
    return { ...result, text: literal, mode: "literal" };
  } finally {
    clearTimeout(timer);
  }
}
