const DB_NAME = "guia-paramo-contenido";
const STORE = "versiones";
const MAX_BYTES = 2 * 1024 * 1024;
const TYPES = new Set(["hecho_cientifico", "relato_cultural", "seguridad", "dato_cambiante"]);
const APPROVED_SCRIPTS = new Set(["Guion Ecoturístico UTON 2024", "Guion turístico zona norte"]);

export function validarFichas(dataset) {
  if (!dataset || !Array.isArray(dataset.fichas) || !dataset.fichas.length || dataset.fichas.length > 2000) throw new Error("El JSON no contiene una lista válida de fichas.");
  const ids = new Set();
  for (const card of dataset.fichas) {
    if (!card || typeof card.id !== "string" || ids.has(card.id) || typeof card.estacion !== "string" || !TYPES.has(card.tipo) || typeof card.texto !== "string" || !card.texto.trim() || !APPROVED_SCRIPTS.has(card.guion) || !Number.isInteger(card.pagina) || card.pagina < 1 || typeof card.version !== "string" || !/^\d+\.\d+\.\d+$/.test(card.version) || !/^\d{4}-\d{2}-\d{2}$/.test(card.fecha_revision) || typeof card.activo !== "boolean") {
      throw new Error("Ficha inválida: requiere id único, estación, tipo, texto, guion, página, versión, fecha de revisión y activo.");
    }
    ids.add(card.id);
  }
  return dataset;
}

function openDb() {
  return new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) return reject(new Error("Este dispositivo no ofrece almacenamiento local de fichas."));
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: "version_conjunto" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function guardarFichas(dataset) {
  validarFichas(dataset);
  const db = await openDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).add(dataset);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
  db.close();
  return dataset;
}

export async function cargarFichas() {
  try {
    const db = await openDb();
    const saved = await new Promise((resolve, reject) => {
      const request = db.transaction(STORE).objectStore(STORE).getAll();
      request.onsuccess = () => resolve(request.result.sort((a, b) => compareVersions(b.version_conjunto, a.version_conjunto))[0]);
      request.onerror = () => reject(request.error);
    });
    db.close();
    if (saved) return validarFichas(saved);
  } catch { /* fallback al paquete inicial sin red */ }
  const response = await fetch("./content/fichas.json", { cache: "force-cache" });
  if (!response.ok) throw new Error("Las fichas locales no están disponibles.");
  return validarFichas(await response.json());
}

function compareVersions(a = "0.0.0", b = "0.0.0") {
  const left = String(a).split(".").map(Number);
  const right = String(b).split(".").map(Number);
  for (let i = 0; i < 3; i += 1) if ((left[i] || 0) !== (right[i] || 0)) return (left[i] || 0) - (right[i] || 0);
  return 0;
}

export async function importarFichas(file) {
  if (!file || file.size > MAX_BYTES || !file.name.toLowerCase().endsWith(".json")) throw new Error("Selecciona un JSON de fichas de hasta 2 MB.");
  const dataset = validarFichas(JSON.parse(await file.text()));
  if (typeof dataset.version_conjunto !== "string" || !dataset.version_conjunto) throw new Error("Falta version_conjunto.");
  return guardarFichas(dataset);
}
