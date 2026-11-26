import { mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, "app", "www", "content");
await mkdir(target, { recursive: true });
await copyFile(path.join(root, "contenido", "fichas", "fichas-v1.0.0.json"), path.join(target, "fichas.json"));
console.log("Contenido offline preparado: app/www/content/fichas.json");
