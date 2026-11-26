# ADR 0001: APK Android con Capacitor y núcleo local

- **Estado:** Aceptada para el MVP; pendiente de validación en dispositivos físicos.
- **Fecha:** 2026-11-26

## Decisión
Empaquetar interfaz web y fichas JSON dentro de un APK Capacitor. Ejecutar búsqueda BM25, reglas de abstención y formato de citas en JavaScript local. Fase 1 no usa LLM. El APK debe responder sin red y enseñar el fragmento literal cuando falte generación segura. Tomar Galaxy A05 (4 GB/64 GB) como equipo de referencia y apuntar inicialmente a Android API 24+; la compatibilidad amplia solo se afirma después de pruebas en equipos y versiones Android distintos.

## Motivo y alternativa descartada
Capacitor reutiliza tecnologías web, incluye sus assets en la app y permite integrar APIs nativas en fases posteriores. Se descarta como entrega el backend Python/interfaz web local investigado en Fase 0 porque no es instalable como pidió el usuario. No se añade aún runtime LLM: primero se valida el APK y luego se hará una prueba corta de llama.cpp Android frente a MediaPipe/LiteRT según disponibilidad vigente.

## Límites
API 24+ es el soporte declarado por Capacitor, no garantía de rendimiento en todo equipo. En este entorno se confirmó Node v24.21.0; no se encontró `adb`, y no se confirmó Android SDK/Studio. El modelo/teléfono reportado tiene 4 GB de RAM, pero se desconoce su versión exacta de Android. Fuentes consultadas 2026-11-26: [Android](https://capacitorjs.com/docs/android), [requisitos de entorno](https://capacitorjs.com/docs/getting-started/environment-setup).
