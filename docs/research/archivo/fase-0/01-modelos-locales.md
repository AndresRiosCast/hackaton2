# Modelos locales pequeños en español

**Consulta:** 2026-11-26. **Estado:** selección para benchmark, no recomendación de despliegue.

## Candidatos iniciales

| Modelo | Tamaño | Licencia / español | Ventaja para probar | Riesgo o límite |
|---|---:|---|---|---|
| Qwen3-1.7B | 1.7B | Apache-2.0; la ficha informa más de 100 idiomas/dialectos | Multilingüe y tamaño aún compacto; primer candidato de calidad | Más parámetros y memoria que 1B; licencia del modelo convertido debe conservarse. |
| Gemma 3 1B IT | 1B | Licencia Gemma con términos propios; la ficha indica más de 140 idiomas | Menor tamaño nominal; útil en teléfonos con menos memoria | Acceso y uso sujetos a aceptar términos; verificar distribución, no asumir licencia OSI. |
| Llama 3.2 1B Instruct | 1B (1.23B) | Llama 3.2 Community License; español figura entre ocho idiomas admitidos | Cuantizaciones para dispositivo y orientación a diálogo/recuperación | Licencia comunitaria con condiciones; no Apache. Revisar atribución y restricciones antes de empaquetar. |

Fuentes primarias: [Qwen3-1.7B](https://huggingface.co/Qwen/Qwen3-1.7B), [Gemma 3 1B IT](https://huggingface.co/google/gemma-3-1b-it), [Llama 3.2 1B](https://huggingface.co/meta-llama/Llama-3.2-1B).

## Tamaño, memoria y velocidad

El número de parámetros no determina por sí solo el tamaño final: cuantización, formato, vocabulario, contexto y buffers cambian almacenamiento y RAM de ejecución. No se publican aquí cifras de RAM o velocidad estimadas como si fueran medidas. Se medirá cada modelo GGUF Q4_K_M (y otra cuantización si su runtime lo requiere) en el mismo corpus, teléfono, contexto, longitud de respuesta y condiciones de batería. Se registrará tamaño exacto del archivo, RAM pico y latencia mediana/p95.

## Benchmark reproducible propuesto

1. Fijar versiones y hashes del runtime, modelo y fichas validadas.
2. Usar las mismas ≥40 preguntas de oro y dividirlas por respuesta respaldada, abstención requerida, contradicción, información cambiante, seguridad y premisa falsa.
3. Desactivar red, fijar contexto máximo, temperatura 0–0.2 y límite de salida; repetir cada pregunta 3 veces tras un calentamiento fijo.
4. Medir acierto factual, cita correcta de guion/página, abstención correcta, afirmaciones no respaldadas, tiempo hasta primera respuesta, tiempo total, RAM pico y energía por pregunta.
5. Guardar resultados CSV y comandos; revisión humana de cada salida con criterios predefinidos. El modelo pierde si genera una indicación de seguridad sin respaldo, incluso si su promedio general es alto.

## Recomendación de fase

Evaluar los tres; comenzar con Qwen3-1.7B y Llama 3.2 1B en llama.cpp por disponibilidad GGUF reportada por sus fichas, y Gemma 3 1B si los términos de uso son aceptables. No seleccionar ganador antes del benchmark con fuentes UTON.
