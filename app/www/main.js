import { responder } from "./core/respuesta.js";
import { cargarFichas, importarFichas } from "./core/contenido_local.js";
import { redactarConRespaldo } from "./core/redaccion_local.js";

const screens = [...document.querySelectorAll("[data-screen]")];
const stepItems = [...document.querySelectorAll("[data-step-indicator]")];
const statusLive = document.querySelector("#app-status");
const stationSelect = document.querySelector("#station");
const questionField = document.querySelector("#question");
const answerStatus = document.querySelector("#answer-status");
const answerText = document.querySelector("#answer-text");
const answerNote = document.querySelector("#answer-note");
const sourceList = document.querySelector("#sources-list");
const literalText = document.querySelector("#literal-text");
let cards = [];
let currentResult = null;
let chosenStation = "general";

const statusLabels = {
  answered: "Fragmento de los guiones",
  conflict: "Los guiones presentan diferencias",
  multi_source: "Variación entre los guiones",
  dated_context: "Dato histórico con fecha",
  cultural: "Relato cultural atribuido",
  review_required: "Dato pendiente de confirmación",
  abstained: "No hay respaldo suficiente",
};

function announce(message) {
  statusLive.textContent = "";
  requestAnimationFrame(() => { statusLive.textContent = message; });
}

function showScreen(number, moveFocus = true) {
  screens.forEach((screen) => { screen.hidden = Number(screen.dataset.screen) !== number; });
  stepItems.forEach((item) => {
    const step = Number(item.dataset.stepIndicator);
    item.classList.toggle("current", step === number);
    item.classList.toggle("done", step < number);
    if (step === number) item.setAttribute("aria-current", "step");
    else item.removeAttribute("aria-current");
  });
  if (number === 2) {
    const label = chosenStation === "general" ? "Todo el recorrido" : chosenStation;
    document.querySelector("#selected-station").textContent = `Estación elegida: ${label}.`;
  }
  if (moveFocus) {
    const heading = screens.find((screen) => Number(screen.dataset.screen) === number)?.querySelector("h2");
    heading?.focus();
  }
  if (number === 4 && currentResult?.sources?.length) {
    const citation = currentResult.sources.map((source) => `${source.guion}, página ${source.pagina}`).join("; ");
    announce(`Fuente lista: ${citation}`);
  } else {
    announce(`Paso ${number} de 4`);
  }
  window.scrollTo(0, 0);
}

function stationCards() {
  return cards;
}

function renderResult(result) {
  currentResult = result;
  const label = statusLabels[result.status] || "Respuesta basada en fichas";
  answerStatus.textContent = label;
  answerStatus.classList.toggle("caution", ["conflict", "review_required", "abstained"].includes(result.status));
  answerText.textContent = result.text;
  answerNote.hidden = !result.note;
  answerNote.textContent = result.note || "";
  sourceList.replaceChildren();
  if (result.sources.length) {
    result.sources.forEach((source) => {
      const article = document.createElement("article");
      article.className = "source-card";
      const heading = document.createElement("h3");
      heading.textContent = source.guion;
      const page = document.createElement("p");
      page.textContent = `Página ${source.pagina} del PDF`;
      article.append(heading, page);
      sourceList.append(article);
    });
  } else if (result.status === "social") {
    const card = document.createElement("article");
    card.className = "source-card";
    const text = document.createElement("p");
    text.textContent = "Mensaje breve de Camino; no es información del parque.";
    card.append(text);
    sourceList.append(card);
  } else {
    const card = document.createElement("article");
    card.className = "source-card";
    const text = document.createElement("p");
    text.textContent = "No se encontró una ficha que respalde esta respuesta. Pregunta al guía o al personal.";
    card.append(text);
    sourceList.append(card);
  }
  literalText.textContent = result.evidence.length
    ? result.evidence.map((item) => item.literal).join("\n\n")
    : "No hay un fragmento para mostrar porque la consulta se abstuvo.";
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.next === "2") chosenStation = stationSelect.value;
    showScreen(Number(button.dataset.next));
    if (button.dataset.next === "2") questionField.focus();
  });
});
document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", () => showScreen(Number(button.dataset.back)));
});
document.querySelector("#question-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = questionField.value.trim();
  if (!query) {
    const error = document.querySelector("#question-error");
    error.textContent = "Escribe una pregunta para continuar.";
    error.hidden = false;
    announce(error.textContent);
    questionField.focus();
    return;
  }
  document.querySelector("#question-error").hidden = true;
  document.querySelector("#question-error").textContent = "";
  const literalResult = responder(query, stationCards());
  const submit = document.querySelector("#question-form button[type=submit]");
  const thinking = document.querySelector("#thinking-status");
  submit.disabled = true;
  const showThinking = setTimeout(() => { thinking.hidden = false; announce("Camino está pensando."); }, 200);
  try {
    const literalResult = responder(query, stationCards(), { station: chosenStation === "general" ? "" : chosenStation });
    renderResult(await redactarConRespaldo(literalResult, undefined, query));
  } catch {
    renderResult(responder(query, stationCards(), { station: chosenStation === "general" ? "" : chosenStation }));
  } finally {
    clearTimeout(showThinking);
    thinking.hidden = true;
    submit.disabled = false;
  }
  showScreen(3, false);
  answerText.focus();
});
document.querySelector("[data-reset]").addEventListener("click", () => {
  questionField.value = "";
  document.querySelector("#question-error").hidden = true;
  answerText.textContent = "";
  answerNote.textContent = "";
  answerNote.hidden = true;
  sourceList.replaceChildren();
  literalText.textContent = "";
  currentResult = null;
  chosenStation = "general";
  stationSelect.value = "general";
  showScreen(1);
});

async function loadLocalContent() {
  try {
    const dataset = await cargarFichas();
    cards = dataset.fichas;
    if (!cards.length) throw new Error("No hay fichas activas cargadas.");
  } catch {
    // Sin fichas el núcleo se abstiene. No se intenta conexión externa.
    cards = [];
    announce("Las fichas locales no están disponibles. La app no consultará internet.");
  }
}

document.querySelector("#content-file").addEventListener("change", async (event) => {
  const status = document.querySelector("#content-status");
  try {
    const dataset = await importarFichas(event.target.files?.[0]);
    cards = dataset.fichas;
    status.textContent = `Fichas ${dataset.version_conjunto} cargadas: ${cards.length}. La actualización queda disponible sin conexión.`;
    announce(status.textContent);
  } catch (error) {
    status.textContent = error.message || "No se pudo validar el archivo.";
    announce(status.textContent);
  } finally {
    event.target.value = "";
  }
});

await loadLocalContent();
