# Guía de páramo sin señal

Prototipo Android para apoyar la interpretación ambiental durante el recorrido Brisas → Aguacerales → Arenales → Lunares → Valle de las Tumbas. No sustituye al guía.

## Estado actual
Fase 1: 45 fichas JSON versionadas, 60 preguntas de oro y núcleo JavaScript de recuperación BM25 literal con reglas de abstención y citas. El evaluador local acaba de pasar 60/60. Todavía no hay APK ni prueba de instalación en teléfono.

## Dispositivo objetivo
Referencia: Samsung Galaxy A05 Dual SIM, 64 GB y 4 GB RAM, informado por el usuario. Se diseña para un rango amplio de Android moderno; el Galaxy no define por sí solo el mínimo. La documentación actual de Capacitor 8 declara soporte API 24+ (Android 7 o posterior), sujeto a pruebas reales de pantalla, WebView, memoria y rendimiento. La versión Android del teléfono se desconoce.

## Ejecución local del evaluador
Requiere Node.js:

```powershell
node scripts/evaluar_nucleo.mjs
```

La app Android y el APK se construyen en Fase 2. Todo el contenido de ejecución debe estar dentro del APK y el recorrido se probará en modo avión. No hay llamadas remotas de runtime.

## Estructura
- `app/www/core/`: recuperación y respuesta literal en JavaScript.
- `contenido/fichas/`: contenido versionado con fuente y página.
- `contenido/preguntas_oro-v1.0.0.json`: evaluación curada.
- `scripts/`: evaluación local reproducible.
- `docs/adr/`: decisión de arquitectura vigente.
- `docs/research/`: una nota técnica vigente; investigaciones anteriores preservadas en `archivo/`.
- `docs/BITACORA.md`: decisiones, resultados y riesgos por fase.
- `fuentes/`: copias locales de materiales oficiales, excluidas de Git por defecto.

## Licencias y fuentes
Licencia del código pendiente de decisión. Los materiales oficiales se usan solo para este reto y no deben publicarse sin autorización. Licencias de cualquier modelo local se verificarán antes de distribuirlo. Los modelos pesados no se incorporan al repositorio.
