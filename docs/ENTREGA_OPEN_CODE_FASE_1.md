# Entrega para sesión con permisos — Fase 1

Los archivos de Fase 1 están preparados localmente en `C:\Users\Usuario\Desktop\Hackaton2`. Este entorno no puede escribir en `.git` ni hacer push. No se ejecutaron estos comandos. Corre la secuencia desde la sesión de Usuario que tenga acceso a esta misma carpeta y al remoto; no cambies ACL/configuración para resolver la restricción de este sandbox.

La secuencia crea la rama `fase-1-contenido-nucleo`, agrega solo archivos permitidos por `.gitignore`, hace commit y tag `v0.2` y publica rama/tag. Los PDFs, DOCX y PPTX oficiales permanecen ignorados; no uses `git add -f`.

```powershell
Set-Location 'C:\Users\Usuario\Desktop\Hackaton2'
git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git switch -c fase-1-contenido-nucleo
git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git add -A
git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git status --short
git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git commit -m "feat: añade fichas y núcleo offline de respuestas"
git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git tag -a v0.2 -m "Fase 1: contenido y núcleo literal"
git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git push -u origin fase-1-contenido-nucleo
git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git push origin v0.2
```

Después, abre PR de `fase-1-contenido-nucleo` hacia `main` con resumen humano y pruebas; no integres ni avances a Fase 2 hasta la confirmación exacta del usuario. Si la rama base aún no existe en el remoto vacío, el operador debe inicializar/publicar `main` según el flujo acordado antes de crear el PR. Confirma que el tag y el commit aparecen en GitHub.
