# Bitácora

## Fase 0 — Fundación (2026-11-26)

- **Qué hicimos hoy:** Se organizó el repositorio y se reunieron localmente los cuatro materiales del reto. Se dejó el material oficial excluido de Git mientras no exista permiso de publicación. La investigación técnica original se conserva archivada.
- **Por qué lo hicimos así:** El plan inicial consideraba Python y web local; el nuevo plan prioriza un APK Android. Mantener el trabajo previo archivado permite reutilizar hallazgos sin confundir el rumbo vigente.
- **Qué probamos y qué resultó:** No hubo app ni benchmark de modelos en esta fase. En la sesión Codex no se pudo hacer pull ni publicar: la red está bloqueada y `.git` es de solo lectura.
- **Qué nos preocupa:** Falta validar permisos de contenido oficial y medir hardware real. Teléfono informado: Galaxy A05 4/64; versión Android aún no conocida.
- **Frase para el pitch:** “En el páramo, una respuesta segura también sabe mostrar su fuente o reconocer cuándo debe hablar el guía.”

## Fase 1 — Contenido y núcleo literal (2026-11-26)

- **Qué hicimos hoy:** Codex en esta carpeta integró 45 fichas, la matriz de diferencias, 60 preguntas y búsqueda BM25 en JavaScript; el trabajo paralelo de OpenCode no se inspeccionó ni modificó. Los informes y ADR previos se archivaron, conservando sus archivos.
- **Por qué lo hicimos así:** El nuevo destino es APK Capacitor. En Fase 1 no se incorpora LLM: el núcleo devuelve fragmentos literales con guion y página, o se abstiene; los cambios de edad de dunas y gelifracción se corrigieron tras la prueba.
- **Qué probamos y qué resultó:** `node scripts/evaluar_nucleo.mjs` reportó 28/45 fichas activas, 60 preguntas y 60/60 controles pasados. El ejemplo recuperó Guion Ecoturístico UTON 2024, p. 5; alerta de hoy produjo abstención. No se midió tiempo móvil ni consumo y aún no hay APK.
- **Qué nos preocupa:** Las fichas requieren revisión final de UTON. API 24+ es objetivo inicial de Capacitor, pero falta probar equipos distintos; Android exacto del Galaxy no está confirmado. Git commit/push/tag siguen pendientes de la sesión que puede escribir `.git`.
- **Frase para el pitch:** “Cada respuesta enseña de qué página salió; cuando el documento no alcanza, el sistema se hace a un lado y deja al guía al frente.”
 
## Fase 2 — MVP Android (2026-11-26)

- **Qué hicimos hoy:** Codex preparó el flujo de cuatro pasos en Capacitor con fichas locales y personaje original Niva; no tocó el checkout paralelo de OpenCode ni ejecutó Git.
- **Por qué lo hicimos así:** Se quitó el permiso Android de internet y se evita guardar preguntas o ubicación; las consultas de hoy, salud y datos sin respaldo siguen derivándose al guía.
- **Qué probamos y qué resultó:** Dependencias offline (98 paquetes), cap add android y sincronización de assets finalizaron; los tres JSON tienen el mismo SHA-256. El núcleo vuelve a pasar 60/60; una prueba de estación cubre respuesta, dato en revisión y dos abstenciones (4/4). UX independiente dejó cuatro correcciones aplicadas y QA no halló red ni persistencia de preguntas. Gradle no produjo APK por AccessDeniedException del sandbox y ADB tampoco pudo crear su carpeta de preferencias; modo avión en teléfono sigue sin probarse.
- **Qué nos preocupa:** La etiqueta v0.2 ya identifica Fase 1; no se puede reutilizar para el MVP. Falta que la sesión normal de Usuario compile e instale el APK, y después revisar TalkBack y varios teléfonos.
- **Frase para el pitch:** “La guía cabe en el teléfono y la fuente queda a un toque; si el contenido no alcanza, no compite con la voz del guía.”
