# ADR 0001: arquitectura provisional para investigación

- **Estado:** Aceptada para prototipado de la Fase 0; decisión final pendiente de pruebas en teléfonos.
- **Fecha:** 2026-11-26

## Contexto

No se especificó un modelo concreto de celular. Se busca cubrir Android e iOS modernos, operar sin internet y tolerar hardware variado. Una aplicación web con WebGPU puede ser liviana de distribuir, pero el acceso a aceleración, memoria y modo offline depende del navegador y del sistema. Una app nativa puede integrar mejor el runtime, pero requiere empaquetar y probar cada plataforma.

## Decisión

Mantener dos rutas de evaluación: (A) backend local Python + llama.cpp y una interfaz web servida localmente como referencia reproducible; (B) app móvil empaquetada con runtime local tras comprobar compatibilidad en dispositivos Android e iOS reales. La búsqueda léxica local con SQLite FTS5/BM25 será baseline simple y explicable. No fijar aún un modelo de producción.

## Alternativas consideradas

- PWA/WebGPU como única entrega: buena distribución, pero compatibilidad y presupuesto de memoria no están probados en todos los navegadores móviles.
- App nativa desde el inicio: mejor acceso al dispositivo, pero se desconoce el hardware y aumenta el trabajo multiplataforma.
- Embeddings como único buscador: pueden mejorar paráfrasis, pero añaden modelo, almacenamiento y complejidad; se compararán con BM25 sobre las preguntas de oro.

## Consecuencias y mediciones pendientes

El benchmark comparará calidad de evidencia/cita/abstención, memoria máxima, tamaño descargado, latencia de carga y respuesta, y energía por consulta en dispositivos de referencia. Hasta medir, no se afirmará que la solución corre en cualquier celular moderno.
