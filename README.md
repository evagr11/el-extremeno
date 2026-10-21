# El Extremeño · Mantenimiento y Jardines

Web de presentación de Alfonso Martín Blanco (Navalvillar de Pela).
Web estática: HTML, imágenes y un vídeo. No necesita compilación ni base de datos.

## Estructura

```
index.html        estructura de la página (HTML)
css/styles.css    estilos: variables de color y fuentes al principio, luego cada sección
js/main.js        interacción: menú móvil, comparador antes/después, visor de fotos, vídeo, copiar teléfono
img/              fotos, logo, favicon e imagen para compartir (og.jpg)
video/reel.mp4    vídeo de la finca
_headers          caché de imágenes y vídeo en Cloudflare Pages
robots.txt
```

Para cambiar los colores de toda la web basta con tocar las variables de `:root`
al principio de `css/styles.css` (el modo oscuro tiene las suyas justo debajo).

Para probarla en local, abre `index.html` en el navegador o, mejor, lanza un servidor:
`python -m http.server` dentro de la carpeta y entra en http://localhost:8000

## Publicar en Cloudflare Pages

### 1. Subir a GitHub
1. Crea un repositorio nuevo en GitHub, por ejemplo `el-extremeno` (puede ser privado).
2. Desde esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "Primera versión de la web"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/el-extremeno.git
   git push -u origin main
   ```

### 2. Conectar con Cloudflare Pages
1. Crea una cuenta gratuita en https://dash.cloudflare.com
2. Ve a **Workers & Pages → Create → Pages → Connect to Git**.
3. Autoriza GitHub y elige el repositorio `el-extremeno`.
4. Configuración de compilación:
   - Framework preset: **None**
   - Build command: *(vacío)*
   - Build output directory: `/`
5. Pulsa **Save and Deploy**. En un minuto estará en `https://el-extremeno.pages.dev`
   (si el nombre está cogido, Cloudflare te dará otro parecido).

A partir de aquí, cada `git push` a `main` publica los cambios automáticamente.

### 3. Dominio propio (opcional)
1. Compra el dominio (por ejemplo `elextremeno.es`) en Cloudflare o en otro registrador.
2. En el proyecto de Pages: **Custom domains → Set up a custom domain** y sigue los pasos.
3. Cambia la dirección `https://el-extremeno.pages.dev/` por la nueva en `index.html`
   (etiquetas `canonical`, `og:url`, `og:image` y el bloque `application/ld+json`).

## Si el nombre del proyecto no es `el-extremeno`
Cambia la URL `https://el-extremeno.pages.dev/` en `index.html` (mismas etiquetas que arriba)
para que la vista previa al compartir el enlace por WhatsApp muestre bien la imagen.

## Pendiente
- Texto de "Quién soy": revisarlo con Alfonso.
- Logo en buena calidad: sustituir `img/logo.png` (y regenerar `favicon-32.png` y `apple-touch-icon.png`).
