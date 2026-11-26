# Entrega a sesión de Usuario — Fase 2

No se ejecutó ningún comando Git desde Codex. Los archivos están en C:\Users\Usuario\Desktop\Hackaton2. No se tocó el checkout de OpenCode ni se cambiaron ACL/permisos.

## Terminar la compilación debug

Desde la consola normal de Usuario, con Android Studio instalado:

    Set-Location 'C:\Users\Usuario\Desktop\Hackaton2\app'
    $env:JAVA_HOME = 'C:\Program Files\Android\Android Studio\jbr'
    $env:ANDROID_HOME = 'C:\Users\Usuario\AppData\Local\Android\Sdk'
    $env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
    npm.cmd ci
    npm.cmd run android:debug

APK esperado: C:\Users\Usuario\Desktop\Hackaton2\app\android\app\build\outputs\apk\debug\app-debug.apk. Confirma la compilación antes de anunciar el MVP. Codex no pudo crear el APK porque Java recibió AccessDeniedException al resolver rutas del SDK dentro del sandbox.

## Instalar y comprobar modo avión

Con el APK generado y el teléfono autorizado para depuración USB, instala primero con el teléfono conectado:

    $apk = 'C:\Users\Usuario\Desktop\Hackaton2\app\android\app\build\outputs\apk\debug\app-debug.apk'
    & 'C:\Users\Usuario\AppData\Local\Android\Sdk\platform-tools\adb.exe' install -r $apk

Después activa modo avión y comprueba: (1) selección de estación; (2) respuesta literal de Aguacerales y fuente Guion Ecoturístico UTON 2024, página 5; (3) edad de las dunas de Arenales marcada como estimación y cita página 7; (4) alerta de hoy y salud se abstienen y remiten al personal; (5) abrir fuente muestra guion, página y fragmento.

## Publicación Git

El usuario confirmó que v0.2 ya está publicado para Fase 1. No mover ni forzar ese tag. Para Fase 2 se propone v0.3. Ejecuta desde sesión de Usuario después de revisar los cambios y comprobar el APK:

    Set-Location 'C:\Users\Usuario\Desktop\Hackaton2'
    git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git switch -c fase-2-apk-mvp
    git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git add -A
    git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git status --short
    git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git commit -m "feat: prepara MVP Android offline"
    git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git tag -a v0.3 -m "Fase 2: MVP Android"
    git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git push -u origin fase-2-apk-mvp
    git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git push origin v0.3

Después abre un PR hacia main con las pruebas reales y publica el APK como artefacto adjunto; los directorios build están ignorados. Fase 2 solo se cierra cuando APK, instalación y modo avión estén verificados.
