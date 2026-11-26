# Recuperación local para guiones breves en español

**Consulta:** 2026-11-26. **Estado:** recomendación de baseline, pendiente de evaluación con las fichas de UTON.

## Comparación

### BM25 / SQLite FTS5

FTS5 es búsqueda de texto completo integrada a SQLite y ofrece ranking BM25, snippets, frases y operadores booleanos. Facilita guardar fichas y texto en una sola base offline, con puntuación legible y poco costo de memoria. Los términos técnicos, nombres propios y consultas literales suelen ser fáciles de inspeccionar. La normalización de tildes, variantes morfológicas, errores de escritura y sinónimos en español debe probarse y configurarse; BM25 no entiende semántica por sí solo.

### Embeddings multilingües pequeños

Pueden recuperar paráfrasis y conceptos que no comparten palabras exactas, pero requieren un encoder local, conversión/soporte del runtime, almacenamiento adicional y evaluación de similitud. Un resultado semánticamente cercano tampoco demuestra que la ficha responda la pregunta ni justifica una cita; el umbral de evidencia debe seguir siendo independiente.

## Baseline recomendado

Usar SQLite FTS5 con BM25 sobre fichas cortas que incluyan `id`, estación, tipo, texto, guion, página y versión. Normalizar Unicode y variantes de tildes para el índice, conservando el texto original que se muestra y cita. Recuperar top-k pequeño; exigir coincidencia suficiente y que el fragmento contenga evidencia directa. La búsqueda devuelve la ficha y su fuente, no una respuesta libre sin control.

Si BM25 falla en paráfrasis de las preguntas de oro, probar un embedding multilingüe cuantizado en el dispositivo como segundo canal. Comparar Recall@k, precisión de evidencia, falsos positivos en preguntas fuera de alcance, tamaño de índice/modelo, memoria, latencia y energía. Re-rankear o fusionar resultados solo si mejora el set de evaluación sin elevar respuestas indebidas.

## Abstención y cita

Aplicar primero reglas deterministas para preguntas de dato cambiante, salud/emergencia, fuera de tema, especie no validada y contradicción conocida. Después recuperar fragmentos; sin evidencia directa o si dos fichas incompatibles quedan relevantes, abstenerse o mostrar ambas diferencias con sus fechas. La cita siempre se construye desde los metadatos de la ficha, nunca desde texto generado por el modelo.

## Fuente

[Documentación SQLite FTS5](https://www.sqlite.org/fts5.html) describe MATCH, rank/BM25 y snippets. Esta recomendación es una hipótesis de ingeniería para corpus breve y controlado; se acepta solo si el benchmark con preguntas de oro la confirma.
