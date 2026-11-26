# Ficha de una página — Guía de páramo sin señal

**Problema.** En Brisas–Aguacerales–Arenales–Lunares–Valle de las Tumbas puede faltar conexión. El guía necesita apoyo breve, claro y rastreable.

**Propuesta.** APK Android Capacitor con búsqueda BM25 y fichas offline, flujo de cuatro pasos, citas a guion y página, abstención en dudas o información cambiante, diseño accesible inicial y personaje Niva. La actualización editorial por JSON versionado está implementada en JavaScript y falta probar en Android. La aplicación no guarda preguntas ni ubicación.

**Resultados ejecutados:** 45 fichas (28 activas), 60/60 preguntas de oro. BM25 escritorio: 1.39 ms promedio, p95 4.10 ms. Pruebas de fallback/importación-schema: 5/5. No son mediciones del Galaxy A05. APK existente Fase 2: `app/android/app/build/outputs/apk/debug/app-debug.apk`, 4,137,762 bytes; la fase 3 no se ha compilado en una APK nueva.

**Modelo.** LiteRT-LM + Qwen3 0.6B INT4 no-think seleccionado como candidato (~329 MiB, Apache-2.0), no integrado todavía. Falta bridge Kotlin, carga local del modelo e inferencia real.

**Dispositivo informado:** Samsung Galaxy A05, 4 GB RAM/64 GB; versión Android no confirmada. Compatibilidad general no demostrada. Faltan prueba modo avión, consumo, TalkBack, validación UTON y permiso de contenido.

