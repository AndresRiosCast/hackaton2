# Compilación de Fase 2 desde sesión de Usuario (2026-11-26)

Codex dejó la interfaz y el proyecto Android preparados, pero su sandbox no pudo crear el APK
(`java.nio.file.AccessDeniedException` al resolver rutas del SDK). Desde esta sesión de Usuario
se ejecutó la compilación con el SDK real y sin cambiar permisos ni ACL.

## Comando ejecutado

```powershell
$env:JAVA_HOME='C:\Program Files\Android\Android Studio\jbr'
$env:ANDROID_HOME='C:\Users\Usuario\AppData\Local\Android\Sdk'
$env:ANDROID_SDK_ROOT=$env:ANDROID_HOME
Set-Location 'C:\Users\Usuario\Desktop\Hackaton2\app\android'
.\gradlew.bat assembleDebug --no-daemon
```

## Resultado verificado

- Salida: `BUILD SUCCESSFUL in 1m 3s` · `94 actionable tasks: 72 executed, 22 up-to-date` · `gradle_exit=0`.
- APK: `app/android/app/build/outputs/apk/debug/app-debug.apk` · 4.137.762 bytes · 26/11/2026 14:12:21.
- Java verificado: OpenJDK 21.0.10 (Android Studio jbr).
- SDK verificado: plataformas `android-36` y `android-36.1` en `C:\Users\Usuario\AppData\Local\Android\Sdk`.

## Límite para dar Fase 2 por cerrada

`adb devices -l` devolvió `List of devices attached` sin equipos: no hay teléfono conectado,
por lo que **no se instaló el APK ni se probó modo avión**. La compilación está verificada;
la prueba en dispositivo sigue pendiente. No se afirma que el MVP esté validado en teléfono.
