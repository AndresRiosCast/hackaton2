# ADR 0002 — Redacción local y actualización editorial

**Fecha:** 2026-11-26. **Estado:** puente seguro e importador en JavaScript; runtime Android pendiente.

## Decisión

BM25 y el fragmento literal siguen como respuesta principal. El redactor solo puede activarse para estado `answered`, una sola ficha y cita existente. Tiene 4,5 s; error, demora, ausencia del módulo o salida que no pasa los controles léxicos y numéricos devuelve el texto literal. Nunca se envían abstenciones, contradicciones ni relatos múltiples. La cita sigue viniendo del recuperador. El filtro léxico no demuestra equivalencia semántica, así que el APK actual no habilita redacción generativa.

Para Android se elige LiteRT-LM con Qwen3 0.6B INT4 no-think como candidato inicial. Su archivo ronda 329 MiB y licencia Apache-2.0; se carga localmente como archivo separado, no se descarga en ejecución ni se incluye en el APK. Falta comprobar compatibilidad, consumo y velocidad en el Galaxy A05. LiteRT-LM documenta API Android Kotlin y advierte que inicializar puede tardar hasta ~10 s, por lo que debe ocurrir fuera del hilo UI. No se fija una dependencia Gradle dinámica hasta medir y probar una versión.

**Alternativa descartada por ahora:** llama.cpp con GGUF es viable, pero incorpora binding C++/NDK al MVP. Se reconsidera si LiteRT-LM no funciona en el teléfono objetivo.

Las fichas importadas se validan localmente y se guardan en IndexedDB por versión. No se persisten preguntas ni ubicación. Repetir una versión ya instalada se rechaza.

## Fuentes consultadas (2026-11-26)

- [LiteRT-LM Android](https://developers.google.com/edge/litert-lm/android)
- [Qwen3 0.6B INT4 LiteRT](https://huggingface.co/litert-community/Qwen3-0.6B-int4)
- [llama.cpp Android](https://github.com/ggml-org/llama.cpp/blob/master/docs/android.md)
