# Entrega urgente — estado real

## APK

La única APK disponible es `artifacts/apk/v2-base-before-bloque-a.apk` (4.137.762 bytes). Es una copia intacta de la APK previa que el usuario probó; no contiene los cambios de este intento. No hay APK nueva que pueda entregar honestamente.

## Cambios de código y pruebas

- Búsqueda coloquial ampliada con equivalencias, corrección simple de erratas y preferencia por estación; mantiene búsqueda en todo el recorrido.
- Saludos, agradecimientos y presentación de Camino sin afirmaciones sobre el parque.
- Regla específica para estimación de edad de dunas y consultas sobre marcas de Lunares.
- Estado accesible “Camino está pensando” y fallback literal en el bridge JavaScript.
- `node scripts/evaluar_nucleo.mjs`: 60/60 preguntas de oro, BM25 1,39 ms media y 4,10 ms p95 en este PC; no es medición Android.
- `node scripts/preguntas_coloquiales_fase_a.mjs`: tabla reproducible de 20 casos con respuesta, cita, estado y latencia en `RESULTADO_COLOQUIALES_BLOQUE_A.txt`.

## Bloqueador exacto

El código todavía **no integra un LLM nativo**; sin modelo, su bridge siempre cae al texto literal. El intento de descargar Qwen desde Hugging Face falló: `curl: (7) Failed to connect to huggingface.co port 443`. El build falló al descargar Gradle 8.14.3: `java.net.SocketException: Permission denied`; ADB también falla al crear `\.android` por permisos. Por eso no hubo APK nueva ni prueba en el teléfono. No se empezó el rediseño del bloque B, siguiendo la prioridad solicitada.

`npm.cmd run cap:sync` sí terminó correctamente y sincronizó assets fuente Android, pero no crea APK.
