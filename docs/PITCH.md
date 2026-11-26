# Pitch de 3 minutos — borrador Fase 2

## Problema

En el recorrido Brisas–Valle de las Tumbas no hay conexión fiable. La persona guía acompaña al grupo y necesita responder dudas sin perder la atención del sendero. Una respuesta inventada o desactualizada puede confundir.

## Solución

Preparamos el MVP Android de Guía de páramo sin señal. En cuatro pasos se elige estación, se pregunta, se lee un fragmento literal y se verifica guion y página. La búsqueda y las fichas van dentro del APK; no solicita ubicación ni tiene permiso de internet. Ante alerta, clima, salud, acceso o falta de evidencia, la app remite al guía. No sustituye su criterio.

## Prueba actual

El núcleo pasa 60 de 60 preguntas curadas. La sincronización copió el mismo JSON local al paquete Android, verificado por hash. Una revisión independiente de accesibilidad encontró cuatro problemas de lectura y ya están corregidos. Todavía no presentamos una instalación de campo: el sandbox impidió a Java compilar el SDK y ADB no pudo acceder a su carpeta de configuración.

## Límites y siguiente paso

La sesión normal de Usuario debe generar el APK debug y probarlo con el Galaxy A05 en modo avión. Faltan TalkBack y otros equipos Android. API 24+ es un objetivo inicial, no compatibilidad universal. UTON debe validar fichas y permisos antes de difusión. El tag v0.2 ya se usó en Fase 1, así que el operador debe elegir una etiqueta siguiente sin mover ni forzar la existente.
