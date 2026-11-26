# Cierre de Fase 2 — APK MVP

## Entregables preparados

- Interfaz en español de cuatro pasos: estación → pregunta → comprender → verificar fuente.
- Personaje original SVG Niva; diseño ligero, controles grandes, estilos de foco, mensajes accesibles y reducción de movimiento.
- Proyecto Android Capacitor 8.6.3 y fichas dentro de los assets locales. La app no solicita permiso `INTERNET`, no usa GPS ni persiste preguntas/ubicación.
- Revisión independiente estática de UX y accesibilidad; los cuatro hallazgos se corrigieron. No equivale a prueba TalkBack ni certificación WCAG.
- Los informes de prueba pueden repetirse con `npm.cmd run evaluar-nucleo` y la sincronización de assets con `npm.cmd run cap:sync`.

## Pruebas ejecutadas y límites

- `npm.cmd install --offline --no-audit --no-fund`: **98 paquetes instalados** desde caché local.
- `npx.cmd cap add android`: terminó con `[success] android platform added!`.
- `npm.cmd run cap:sync`: terminó con `[info] Sync finished in 0.105s`.
- `node --check www/main.js`: sin errores de sintaxis.
- `npm.cmd run evaluar-nucleo`: **60/60** preguntas pasan; 28/45 fichas activas. Una comprobación adicional con estación seleccionada pasó 4/4 escenarios: respuesta con página, edad en revisión con página y abstenciones de alerta/salud.
- Hash SHA-256 de los JSON fuente, `app/www/content/fichas.json` y el asset Android coincide en los tres: `816122d1e53e071bd5daa158593ec969a600fded3c3006a36efb5b485a469c32`.
- `gradle --offline --no-daemon assembleDebug`: **falló** dentro del sandbox en `:capacitor-android:compileDebugJavaWithJavac` con `java.nio.file.AccessDeniedException` al resolver `app/.android-sdk/platforms/android-36/android.jar`. No hay APK que se pueda entregar todavía.
- Revisión independiente `qa-seguridad`: no halló persistencia de preguntas/ubicación ni envío externo; alerta, clima, acceso, emergencia e inyección se abstienen. Límite: no hubo APK instalado ni inspección de tráfico Android.
- `adb devices -l`: **falló** antes de enumerar equipos, porque ADB intentó crear `\.android` y el sandbox denegó la operación. No se confirmó teléfono conectado y no se probó modo avión.

## Cómo completar APK y prueba desde sesión normal de Usuario

El sandbox impide la resolución canónica Java (`Path.toRealPath`) incluso para un HTML dentro del proyecto. Ejecuta desde la consola normal de Usuario, sin el sandbox de Codex:

```powershell
Set-Location 'C:\Users\Usuario\Desktop\Hackaton2\app'
npm.cmd ci
npm.cmd run android:debug
```

Luego conecta el Galaxy por USB con depuración activa, instala con `adb install -r .\android\app\build\outputs\apk\debug\app-debug.apk`, activa modo avión y sigue las cinco comprobaciones descritas en `README.md`. Si Gradle descarga paquetes durante la primera compilación, eso es solo preparación de build; la app instalada sigue sin llamadas de red.

## Riesgos y decisión de etiqueta

La Fase 2 no cumple el criterio de salida hasta producir un APK e instalar/probarlo en un teléfono real. No se afirma que el MVP esté instalado ni validado offline en dispositivo. El usuario reportó que `v0.2` ya está publicado para Fase 1; por tanto no se debe mover/forzar ese tag para la Fase 2. Recomiendo que el operador publique este hito como `v0.3` o acuerde otra etiqueta monotónica.
