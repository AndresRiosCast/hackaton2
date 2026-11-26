# Pitch de 3 minutos — borrador de Fase 1

## Problema

En el recorrido Brisas–Valle de las Tumbas puede no haber conexión. El guía necesita mantener segura la atención del grupo y, a la vez, responder preguntas. Una respuesta inventada o que parezca vigente cuando es antigua puede confundir.

## Solución

Construimos la base de un APK Android que acompaña al guía. El núcleo busca fichas locales, devuelve el fragmento literal y cita guion y página. Si falta respaldo, hay una discrepancia o preguntan por salud, clima, alerta o acceso de hoy, se abstiene y remite al personal. En esta fase no hay LLM: la respuesta no se reescribe ni se amplía más allá de la ficha.

## Prueba actual

El conjunto tiene 45 fichas y 60 preguntas de oro. `node scripts/evaluar_nucleo.mjs` reportó 60/60 controles esperados, incluyendo evidencia léxica, citas y abstenciones. Por ejemplo, una pregunta sobre el agua de Aguacerales devolvió el texto de la ficha con cita a Guion Ecoturístico UTON 2024, p. 5; la pregunta por alerta de hoy se abstuvo. Esto es una prueba automática curada, no una evaluación de campo.

## Próximo paso y límites

El siguiente hito, sujeto a confirmación de fase, es el APK Capacitor y la prueba en modo avión. El Galaxy A05 informado (4 GB/64 GB) sirve como referencia; se busca Android moderno amplio y se probarán varios equipos antes de afirmar compatibilidad. Aún no hay APK, medición de energía/latencia móvil ni aprobación de UTON sobre cada ficha. iOS no está en el entregable actual de APK; puede evaluarse después.
