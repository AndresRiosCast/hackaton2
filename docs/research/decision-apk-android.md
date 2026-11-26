# Decisión técnica rápida: empaquetado Android

**Consultado:** 2026-11-26. **Alcance:** elección inicial del contenedor del MVP; no equivale a prueba de compatibilidad del producto.

Capacitor 8 documenta soporte Android API 24+ (Android 7 o posterior) y requiere Android Studio para administrar el proyecto. Su entorno de desarrollo requiere Node 22+. El equipo reportado como referencia es Galaxy A05 de 4 GB/64 GB; el usuario quiere cubrir Android moderno de forma amplia, por eso la meta inicial es API 24+ más validación en una matriz real, sin prometer universalidad. En este entorno Node v24.21.0 cumple el requisito de Node; `adb` no está disponible y Android SDK/Studio no se comprobaron.

**Decisión práctica:** Capacitor con recursos locales y BM25 JS para APK fase 2. En Fase 3 evaluar brevemente un runtime Android local para LLM solo después de instalar/probar el APK en modo avión. Sin informe largo previo ni decisión de modelo basada solo en documentación.

Fuentes oficiales:
- [Capacitor Android](https://capacitorjs.com/docs/android) (consulta 2026-11-26).
- [Capacitor Environment Setup](https://capacitorjs.com/docs/getting-started/environment-setup) (consulta 2026-11-26).
