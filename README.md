# Guía de páramo sin señal

Prototipo Android para apoyar al guía en el recorrido Brisas → Aguacerales → Arenales → Lunares → Valle de las Tumbas. La app contiene la interfaz, búsqueda BM25 y fichas locales dentro del APK; no envía consultas fuera del teléfono.

## Fase 2

El flujo de cuatro pasos, ilustración original Niva y proyecto Android de Capacitor 8.6.3 están preparados. El contenido se empaqueta desde JSON local. El APK debug ya se compiló desde la sesión de Usuario (`app/android/app/build/outputs/apk/debug/app-debug.apk`, 4.137.762 bytes; ver `docs/COMPILACION_FASE_2.md`). La compilación desde el sandbox de Codex falló al resolver rutas del SDK. Falta instalar el APK en un teléfono y probar modo avión: no hay dispositivo conectado, por lo que la Fase 2 no está cerrada.

## Construcción en Windows

Requisitos: Node.js 22+, Android Studio/JDK 21 y Android SDK API 36 con Build Tools 35.0.0. El APK declara minSdk 24 (Android 7+). Galaxy A05 4 GB/64 GB es dispositivo de referencia, no el único objetivo. La versión Android de ese teléfono no se conoce.

En PowerShell:

    Set-Location 'C:\Users\Usuario\Desktop\Hackaton2\app'
    $env:JAVA_HOME = 'C:\Program Files\Android\Android Studio\jbr'
    $env:ANDROID_HOME = 'C:\Users\Usuario\AppData\Local\Android\Sdk'
    $env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
    npm.cmd ci
    npm.cmd run android:debug

El APK esperado queda en app/android/app/build/outputs/apk/debug/app-debug.apk. La preparación de build puede requerir descargar dependencias; ya instalada, la app no requiere internet.

## Instalar y probar en modo avión

Conecta el teléfono por USB, habilita Opciones de desarrollador y Depuración USB y acepta la huella del computador. Instala con el teléfono conectado y luego activa modo avión:

    $apk = 'C:\Users\Usuario\Desktop\Hackaton2\app\android\app\build\outputs\apk\debug\app-debug.apk'
    & 'C:\Users\Usuario\AppData\Local\Android\Sdk\platform-tools\adb.exe' install -r $apk

Elige una estación, pregunta cómo se forma el agua en Aguacerales y verifica Guion Ecoturístico UTON 2024, p. 5. Prueba la edad de las dunas (debe marcarse como estimación y citar p. 7), alerta de hoy y salud (deben abstenerse y remitir al personal). ADB se usa para instalar; la consulta ocurre en el propio dispositivo.

La app no pide ubicación, no guarda conversaciones y no incluye permiso Android INTERNET. No implementa GPS, misiones, AR, voz ni inglés.

## Estructura

- app/www: interfaz, personaje y núcleo JavaScript.
- app/android: proyecto nativo Capacitor.
- contenido/fichas: fichas versionadas con fuente y página.
- scripts/evaluar_nucleo.mjs: evaluación automática.
- scripts/preparar_assets.mjs: copia fichas al paquete Android.
- docs/ACCESIBILIDAD_FASE_2.md: revisión independiente y límites.
- docs/CIERRE_FASE_2.md: resultados técnicos.
- docs/ENTREGA_FASE_2.md: instrucciones de build, prueba y publicación.

Código/licencia pendientes de definir. Los guiones oficiales se usan para este reto; no redistribuir sin autorización.
