# Instrucciones para Codex

## Objetivo y alcance
Construir por fases un asistente de interpretación ambiental offline del PNN Los Nevados, como apoyo al guía UTON. La entrega prioritaria es un APK Android con Capacitor, assets y fichas locales. El dispositivo de referencia reportado es Samsung Galaxy A05, 4 GB RAM y 64 GB; se busca compatibilidad amplia con Android moderno, no solo ese teléfono. La versión Android del teléfono aún no está confirmada.

## Reglas permanentes
- Trabaja solo en este repositorio; no inspecciones ni modifiques el checkout paralelo de OpenCode.
- No hagas operaciones Git desde este entorno: `.git` está disponible solo para lectura. No cambies permisos/configuración. Entrega comandos a la sesión que sí pueda publicar.
- Respeta la puerta por fases: no avances sin la frase exacta `CONFIRMO FASE N`.
- Cero red en ejecución. Respuestas únicamente a partir de fichas validadas derivadas de los dos guiones, con nombre de guion y página PDF.
- Ante evidencia insuficiente, conflicto, dato actual (alerta, clima, acceso, salud), abstente y deriva al guía/personal. Nunca des diagnóstico, tratamiento ni indicaciones de seguridad inventadas.
- Separa ciencia, relato cultural, dato histórico fechado y dato cambiante. No uses especies fuera de los guiones; el oso de anteojos requiere validación UTON.
- Sin cuentas, analítica ni conversaciones o ubicación identificables. No se guarda ubicación.
- Fichas versionadas y revisables. Los documentos oficiales no se publican sin autorización; uso exclusivo para el reto.
- Las futuras misiones se limitan a senderos y estaciones oficiales; no guían a dunas, lagunas o fauna. Sin retos cronometrados/competitivos ni uso que distraiga al caminar en altura.
- Modelos pesados fuera de Git; registra licencia, origen y hash antes de proponer distribución.
- Cada fase registra pruebas reales, fallos y riesgos. No afirmes lo que no ejecutaste.
- Commit convencional en español, rama por fase, PR a main y tag son el flujo deseado; el operador Git con permisos lo ejecuta fuera de este sandbox.

## Equipo reducido
- `contenido-fidelidad`: fichas, páginas, contradicciones y preguntas de oro.
- `dev-app-ia`: búsqueda, abstención, citas, interfaz, APK e integración de LLM local.
- `ux-accesibilidad-psicologia`: diseño y revisión independiente de accesibilidad/psicología de la app y misiones.
- `qa-seguridad`: evaluación, red team, privacidad y revisión independiente.
- `documentador-devops`: bitácora, pitch, ficha y preparación de entrega Git.

Las responsabilidades detalladas están en [`docs/EQUIPO.md`](docs/EQUIPO.md) y [`docs/agentes/`](docs/agentes/).

## Fases vigentes
1. Fase 1: contenido y núcleo JS (BM25, evidencia, abstención, citas; sin LLM).
2. Fase 2: MVP APK, flujo de cuatro pasos, español, personaje original y accesibilidad.
3. Fase 3: LLM local pequeño, evaluación/red team, actualización de fichas y materiales de cierre.

Misiones GPS, háptica, geocerca/licencia, 3D/AR e inglés quedan en backlog hasta solicitud expresa; cuando se construyan aplican las reglas permanentes.

## Revisión
Quien produce no aprueba su propio trabajo. `qa-seguridad` revisa a todos; `ux-accesibilidad-psicologia` revisa de forma independiente interfaz y experiencias de misión antes de aceptarlas.
