# Fase 2 — accesibilidad e interacción segura

## Lista de revisión estática

- [x] Interfaz en español con cuatro pasos explícitos: estación, pregunta, comprender respuesta y verificar fuente.
- [x] Controles táctiles principales de 48 px o más; campos de entrada de 56 px.
- [x] Foco visible, salto al contenido, etiquetas de formulario, navegación por pasos y anuncios de estado.
- [x] Error de pregunta vacía visible y asociado al campo.
- [x] En el paso de respuesta se enfoca el texto literal para facilitar su lectura; al verificar se anuncia guion y página.
- [x] Texto, color y fuente acompañan los estados; no hay instrucciones que dependan de audio, vibración o color solamente.
- [x] El CSS respeta `prefers-reduced-motion`; la interfaz no contiene animaciones obligatorias.
- [x] Lenguaje breve y amable; sin cuentas regresivas, puntuación, competencia, presión o recompensa por velocidad.
- [x] No requiere usar el teléfono mientras se camina; invita a consultar al guía para alertas, clima, acceso y salud.
- [x] Personaje Niva es una ilustración SVG original y ligera, decorativa para lectores de pantalla.
- [x] Sin GPS ni almacenamiento de conversación/ubicación; no se incorpora permiso Android `INTERNET`.

## Contraste estimado de tokens principales

Cálculo de contraste WCAG a partir de los colores declarados (no es una certificación instrumental): tinta `#173e39`/papel `#f6f4ec`: **10,69:1**; texto secundario `#435b56`/papel: **6,65:1**; texto blanco/botón `#a44731`: **5,96:1**; error `#842b1b`/superficie `#fffefa`: **8,88:1**; foco `#174ca1`/blanco: **8,12:1**. Todos superan 4,5:1 para texto normal en estas combinaciones.

## Revisión independiente

El rol UX/accesibilidad/psicología revisó el código por separado. Señaló texto de pasos pequeño en teléfonos estrechos, error de campo no visible, lectura poco clara de respuesta al cambiar de pantalla y falta de anuncio de la cita. Se ajustaron los cuatro: etiquetas a 12 px como mínimo en el ancho más estrecho, mensaje visible vinculado al campo, foco al fragmento y anuncio de fuente/página.

## Pendiente de prueba física

No se probó con TalkBack, ampliación de pantalla, acceso por switch, medición externa de contraste ni durante una caminata. Tampoco se instaló en el Galaxy A05 desde este sandbox. Esta revisión estática no se presenta como certificación WCAG 2.2 AA; esos controles requieren el APK y dispositivo real.
