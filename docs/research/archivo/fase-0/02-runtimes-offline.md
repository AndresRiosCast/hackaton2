# Runtimes offline y alcance por dispositivo

**Consulta:** 2026-11-26. **Estado:** comparación documental; ningún runtime compilado aquí.

## Comparación

| Opción | Android | iOS | Navegador | Juicio provisional |
|---|---|---|---|---|
| llama.cpp (C/C++, bindings) | Android arm64 documentado; CPU y rutas aceleradas según dispositivo | El proyecto publica XCFramework iOS | No es por sí mismo runtime web | Mejor referencia para el backend Python local y candidato común nativo; validar integración empaquetada por plataforma. |
| MLC LLM / WebLLM | SDK y app Android; la guía móvil requiere cadena de build nativa | SDK iOS | WebLLM usa WebGPU/WASM local | Útil para evaluar aceleración y navegador, pero la compilación, drivers y GPU restringen cobertura. No prometer que WebGPU esté disponible en todo móvil. |
| MediaPipe LLM Inference / LiteRT-LM | La documentación actual de Google presenta LiteRT-LM para Android | API Swift nativa documentada para iOS | API JavaScript/TypeScript con WebGPU; existe ruta Flutter comunitaria | Evaluar como opción multiplataforma actual; verificar soporte de modelo, build, licencia y comportamiento de cada teléfono. |
| ONNX Runtime / GenAI | Ruta móvil y React Native disponibles según la guía | Ruta móvil según build y proveedor de ejecución | WebAssembly; WebGPU/WebNN con operadores y compatibilidad variables | Opción cuando haya modelo y grafo exportable con kernels probados; integrar cuesta más. |
| WebGPU/WASM directo | Navegadores compatibles, sujeto a límites del SO | Safari/iOS requiere prueba real y límites pueden ser distintos | Descarga y almacenamiento del modelo pesan; se debe precachear para offline | UI común sí; inferencia solo con detección de capacidades y fallback de fragmento literal. No sirve como garantía universal. |

Fuentes: [llama.cpp Android](https://github.com/ggml-org/llama.cpp/blob/master/docs/android.md), [compilación de llama.cpp](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md), [MLC quick start](https://llm.mlc.ai/docs/get_started/quick_start.html), [MLC Android](https://llm.mlc.ai/docs/deploy/android.html), [MLC iOS](https://llm.mlc.ai/docs/deploy/ios.html), [LiteRT-LM (antes MediaPipe LLM Inference)](https://developers.google.com/edge/litert-lm), [ONNX Runtime Web](https://onnxruntime.ai/docs/tutorials/web/), [ONNX Runtime WebGPU](https://onnxruntime.ai/docs/tutorials/web/ep-webgpu.html), [ONNX Runtime móvil](https://onnxruntime.ai/docs/tutorials/mobile/).

## Alcance

La documentación de llama.cpp muestra builds arm64 Android y distribuye XCFramework iOS en sus releases, con aceleración opcional; no implica que todas las combinaciones de teléfono, versión del SO, memoria y empaquetado funcionen igual. Google ya presenta LiteRT-LM como su capa multiplataforma para LLM en Android, iOS, Web y escritorio; por ello, “MediaPipe LLM Inference” se conserva como término solicitado y se compara mediante su ruta sucesora documentada. MLC documenta WebLLM y SDKs móviles, pero sus requisitos de GPU y compilación hacen necesaria una matriz de dispositivos. ONNX Runtime documenta inferencia en navegador y React Native; su guía señala que WebGPU/WebNN no cubren todos los operadores y que WebGPU sigue sujeto al soporte del navegador. El runtime local nunca debe necesitar internet después de instalar el paquete y los pesos.

## Plan de evaluación

- Fase 0/2: medir Python + llama.cpp en equipo de desarrollo como línea base reproducible.
- Seleccionar teléfonos Android e iOS de gama baja-media y alta que la organización pueda conseguir; registrar CPU/chip, RAM, SO y almacenamiento libre.
- Comparar paquete, RAM pico, carga inicial, tokens/s, latencia completa, energía por consulta, funcionamiento con modo avión y recuperación tras cierre.
- Si la generación no es viable en un teléfono, mostrar fragmento literal con cita desde la búsqueda local, sin llamar a un servicio.

## Decisión provisional

No elegir PWA como única implementación para inferencia. Conservar interfaz web local para prototipo y explorar app empaquetada con llama.cpp o MLC después de conocer dispositivos y licencias. El soporte móvil universal sigue abierto.
