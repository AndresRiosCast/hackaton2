# BitÃ¡cora

## Fase 0 â€” FundaciÃ³n (2026-11-26)

- **QuÃ© hicimos hoy:** Se organizÃ³ el repositorio y se reunieron localmente los cuatro materiales del reto. Se dejÃ³ el material oficial excluido de Git mientras no exista permiso de publicaciÃ³n. La investigaciÃ³n tÃ©cnica original se conserva archivada.
- **Por quÃ© lo hicimos asÃ­:** El plan inicial consideraba Python y web local; el nuevo plan prioriza un APK Android. Mantener el trabajo previo archivado permite reutilizar hallazgos sin confundir el rumbo vigente.
- **QuÃ© probamos y quÃ© resultÃ³:** No hubo app ni benchmark de modelos en esta fase. En la sesiÃ³n Codex no se pudo hacer pull ni publicar: la red estÃ¡ bloqueada y `.git` es de solo lectura.
- **QuÃ© nos preocupa:** Falta validar permisos de contenido oficial y medir hardware real. TelÃ©fono informado: Galaxy A05 4/64; versiÃ³n Android aÃºn no conocida.
- **Frase para el pitch:** â€œEn el pÃ¡ramo, una respuesta segura tambiÃ©n sabe mostrar su fuente o reconocer cuÃ¡ndo debe hablar el guÃ­a.â€

## Fase 1 â€” Contenido y nÃºcleo literal (2026-11-26)

- **QuÃ© hicimos hoy:** Codex en esta carpeta integrÃ³ 45 fichas, la matriz de diferencias, 60 preguntas y bÃºsqueda BM25 en JavaScript; el trabajo paralelo de OpenCode no se inspeccionÃ³ ni modificÃ³. Los informes y ADR previos se archivaron, conservando sus archivos.
- **Por quÃ© lo hicimos asÃ­:** El nuevo destino es APK Capacitor. En Fase 1 no se incorpora LLM: el nÃºcleo devuelve fragmentos literales con guion y pÃ¡gina, o se abstiene; los cambios de edad de dunas y gelifracciÃ³n se corrigieron tras la prueba.
- **QuÃ© probamos y quÃ© resultÃ³:** `node scripts/evaluar_nucleo.mjs` reportÃ³ 28/45 fichas activas, 60 preguntas y 60/60 controles pasados. El ejemplo recuperÃ³ Guion EcoturÃ­stico UTON 2024, p. 5; alerta de hoy produjo abstenciÃ³n. No se midiÃ³ tiempo mÃ³vil ni consumo y aÃºn no hay APK.
- **QuÃ© nos preocupa:** Las fichas requieren revisiÃ³n final de UTON. API 24+ es objetivo inicial de Capacitor, pero falta probar equipos distintos; Android exacto del Galaxy no estÃ¡ confirmado. Git commit/push/tag siguen pendientes de la sesiÃ³n que puede escribir `.git`.
- **Frase para el pitch:** â€œCada respuesta enseÃ±a de quÃ© pÃ¡gina saliÃ³; cuando el documento no alcanza, el sistema se hace a un lado y deja al guÃ­a al frente.â€
 
## Fase 2 â€” MVP Android (2026-11-26)

- **QuÃ© hicimos hoy:** Codex preparÃ³ el flujo de cuatro pasos en Capacitor con fichas locales y personaje original Niva; no tocÃ³ el checkout paralelo de OpenCode ni ejecutÃ³ Git.
- **Por quÃ© lo hicimos asÃ­:** Se quitÃ³ el permiso Android de internet y se evita guardar preguntas o ubicaciÃ³n; las consultas de hoy, salud y datos sin respaldo siguen derivÃ¡ndose al guÃ­a.
- **QuÃ© probamos y quÃ© resultÃ³:** Dependencias offline (98 paquetes), cap add android y sincronizaciÃ³n de assets finalizaron; los tres JSON tienen el mismo SHA-256. El nÃºcleo vuelve a pasar 60/60; una prueba de estaciÃ³n cubre respuesta, dato en revisiÃ³n y dos abstenciones (4/4). UX independiente dejÃ³ cuatro correcciones aplicadas y QA no hallÃ³ red ni persistencia de preguntas. Gradle no produjo APK por AccessDeniedException del sandbox y ADB tampoco pudo crear su carpeta de preferencias; modo aviÃ³n en telÃ©fono sigue sin probarse.
- **QuÃ© nos preocupa:** La etiqueta v0.2 ya identifica Fase 1; no se puede reutilizar para el MVP. Falta que la sesiÃ³n normal de Usuario compile e instale el APK, y despuÃ©s revisar TalkBack y varios telÃ©fonos.
- **Frase para el pitch:** â€œLa guÃ­a cabe en el telÃ©fono y la fuente queda a un toque; si el contenido no alcanza, no compite con la voz del guÃ­a.â€

## Fase 3 â€” LLM local y actualizaciÃ³n (2026-11-26)

- **QuÃ© hicimos hoy:** Codex aÃ±adiÃ³ importaciÃ³n local de fichas versionadas y una puerta opcional de redacciÃ³n con retorno literal. DocumentÃ³ el modelo Android candidato y actualizÃ³ ficha y pitch. No modificÃ³ Git ni reconstruyÃ³ la APK que el usuario estÃ¡ probando.
- **Por quÃ© lo hicimos asÃ­:** Solo una respuesta respaldada por una ficha podrÃ­a llegar al modelo; contradicciones y abstenciones no se redactan. El modelo no selecciona ni cambia citas. LiteRT-LM/Qwen3 0.6B INT4 es una elecciÃ³n pendiente de prueba real, no una integraciÃ³n ya hecha.
- **QuÃ© probamos y quÃ© resultÃ³:** `node scripts/evaluar_nucleo.mjs`: 60/60; BM25 0,54 ms promedio y 1,47 ms p95 en escritorio. `node scripts/evaluar_fase3.mjs`: 5/5 controles de fallback, cifras y schema. No se midiÃ³ Android ni inferencia de LLM.
- **QuÃ© nos preocupa:** La Fase 3 no estÃ¡ completa: falta plugin Kotlin LiteRT-LM, modelo en almacenamiento local, nueva APK, mediciones en el Galaxy A05 y prueba de importaciÃ³n Android/TalkBack. APK hallada sigue siendo Fase 2.
- **Frase para el pitch:** â€œLa IA solo puede aclarar un fragmento validado; si duda, tarda o no estÃ¡ disponible, vuelve al texto y su pÃ¡gina.â€

