# Estado de Fase 3 - entrega parcial (NO cerrada)

> Fase 3 **no está cerrada**: faltan el módulo nativo LiteRT-LM, el archivo de modelo, la APK actualizada y las mediciones en el Galaxy A05. Este documento registra lo preparado y lo pendiente; no afirma el requisito de LLM local como terminado.

## Hecho en esta carpeta

- Se añadió una puerta de redacción local con timeout de 4,5 s, filtros básicos y fallback literal ante error o salida sospechosa. Abstenciones y respuestas de varias fichas nunca se envían al modelo.
- Se añadió importación de fichas JSON, validación de esquema y versión, persistencia local separada por versión y recarga al iniciar. Las preguntas y la ubicación no se guardan.
- Se seleccionó LiteRT-LM + Qwen3 0.6B INT4 como candidato, no como capacidad ya funcional.
- Se actualizó la evaluación para medir latencia BM25 de escritorio.

## Evidencia ejecutada

```text
Fichas activas: 28/45
Preguntas de oro: 60
Preguntas con flujo esperado, evidencia léxica y citas válidas: 60/60
Latencia BM25 en este equipo: media 1.39 ms; p95 4.10 ms (no es medición Android).
RESULTADO: OK
Resultado redactor/contenido: 5/5 (prueba de escritorio/JS, no ejecutada en Android)
```

La APK original de Fase 2 era `app/android/app/build/outputs/apk/debug/app-debug.apk` (4.137.762 bytes, 2026-11-26 14:12) y **no incluía estas modificaciones**. Desde la sesión de Usuario se sincronizaron los assets y se recompiló: la APK actual con estos cambios es `C:\Users\Usuario\Desktop\APK-Codex-NUEVA.apk` (4.144.612 bytes, SHA-256 `3CAFE894784ACEE62014F4C1ED4EF2EFA5FBCD1CF46E5F46A3A5B639CEFBD3A9`). Sigue sin instalarse ni probarse en teléfono.

## Pendiente que impide afirmar Fase 3 completa

No se incorporó el módulo nativo LiteRT-LM, el archivo de modelo no está instalado y no hubo inferencia real, prueba de carga de fichas en Android, medición de RAM/latencia del Galaxy A05 ni APK actualizada. El filtro de salida JavaScript es una defensa básica, no verificación semántica. La fase queda preparada parcialmente, sin declarar terminado el requisito de LLM local.

## Pasos concretos para terminar desde la sesión con Android SDK

1. Implementar y registrar el plugin Capacitor Kotlin `LocalLlm` con LiteRT-LM; fijar una versión de Maven y backend CPU inicial.
2. Permitir seleccionar e importar el `.litertlm` local en almacenamiento privado. Nunca descargarlo automáticamente ni habilitar red.
3. Usar Qwen3 0.6B INT4 no-think (~329 MiB); revisar licencia y compatibilidad con el runtime.
4. Ejecutar `npm run cap:sync` y `npm run android:debug`, instalar la nueva APK y verificar modo avión en el Galaxy A05.
5. Medir memoria, tiempo de inicio y latencia por pregunta; ejercitar actualización de fichas y TalkBack.

**Git:** Codex no ejecutó comandos Git desde su sandbox (`.git` solo lectura). La sesión de Usuario publicó estos cambios en la rama `fase-3-bloque-a-ajustes` (commits `1ca3749` y `e8adc46`). La APK con estos cambios ya se compiló desde esa sesión (`APK-Codex-NUEVA.apk`); falta instalarla y verificarla en el Galaxy A05.

