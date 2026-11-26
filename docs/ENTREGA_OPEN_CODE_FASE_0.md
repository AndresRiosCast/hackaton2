# Entrega a OpenCode — cierre de Fase 0

Los entregables de la Fase 0 están preparados en `C:\Users\Usuario\Desktop\Hackaton2`. El sandbox de Codex no puede escribir en `.git`; estos comandos no se ejecutaron aquí. Córrelos desde la sesión de Usuario, en esta carpeta, una vez que OpenCode tenga acceso a esos mismos archivos.

Los materiales oficiales están excluidos por `.gitignore`; no uses `git add -f` para incluirlos. No cambies permisos ni ACL de `.git`.

```powershell
Set-Location 'C:\Users\Usuario\Desktop\Hackaton2'
git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git add -A
git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git commit -m "chore: funda el proyecto offline"
git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git tag -a v0.1 -m "Fase 0: Fundación"
git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git push -u origin fase-0-fundacion
git -c safe.directory=C:/Users/Usuario/Desktop/Hackaton2 -c remote.origin.url=https://github.com/AndresRiosCast/hackaton2.git push origin v0.1
```

Después del push, verificar en el remoto el commit de la rama `fase-0-fundacion` y el tag `v0.1`. La Fase 1 requiere después la aprobación textual exacta `CONFIRMO FASE 1`.
