# Pitch de 3 minutos — borrador tras Fase 3

## Problema

En el recorrido Brisas–Valle de las Tumbas puede faltar conectividad. La persona guía acompaña al grupo y necesita responder dudas sin perder la atención del sendero. Una respuesta inventada o desactualizada puede confundir.

## Solución

Guía de páramo sin señal es un MVP Android que organiza la consulta en cuatro pasos: estación, pregunta, respuesta y fuente. Busca fichas locales y muestra guion y página. Si los documentos no respaldan la respuesta o la pregunta pide información actual o médica, remite al guía. No usa ubicación, no pide cuentas y no tiene permiso de internet. El personal puede importar fichas JSON revisadas y versionadas.

## Prueba y límites

Las 60 preguntas de oro pasan 60/60. BM25 tardó 1,39 ms de promedio y 4,10 ms p95 en este computador; no son números del teléfono. Cinco pruebas de la capa de fallback pasan. Se encontró un APK de Fase 2 de 4,137,762 bytes, pero esta Fase 3 aún no se compiló. LiteRT-LM con Qwen3 0.6B cuantizado está seleccionado para prueba; no está integrado ni medido en el Galaxy A05. El filtro de salida no prueba por sí solo fidelidad semántica, así que ante cualquier error debe prevalecer el fragmento literal.

Para cerrar falta el puente nativo, cargar el modelo de forma local, compilar y probar modo avión, tiempo y memoria en el teléfono, además de validar actualización de fichas y TalkBack. El contenido y el uso público requieren autorización UTON.

