# Lelit Logistics — sitio web

Landing page de **Lelit Logistics LLC** (Amazon DSP, Station DOB7, Glastonbury CT).
Construido con **Astro v5**. Estático, rápido, responsive, con view transitions.


## Marca

- Logo: `public/logo.png` (fondo transparente, recortado del original).
- **Naranja Lelit:** `#F87800` · **Azul Lelit:** `#2088F8`
- Tema oscuro estilo Linear/Vercel. Tokens de color en `src/styles/global.css` (`:root`).

## Estructura

```
lelit-web/
├─ astro.config.mjs
├─ package.json
├─ public/            # favicon, robots.txt (assets estáticos)
└─ src/
   ├─ layouts/Base.astro       # <head>, fuentes, SEO, scroll-reveal
   ├─ components/
   │  ├─ Nav.astro
   │  ├─ Hero.astro            # titular + panel "ruta en vivo"
   │  ├─ About.astro           # #company
   │  ├─ Operation.astro       # #operation (stats + pilares, fondo midnight)
   │  ├─ Careers.astro         # #careers (tarjetas de roles + perks)
   │  ├─ Contact.astro         # #contact (form con honeypot)
   │  └─ Footer.astro
   ├─ pages/index.astro        # ensambla todo
   └─ styles/global.css        # design system (colores, tipografía, botones)
```

## Correr en local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera /dist
npm run preview  # sirve /dist
```

## Conectar el formulario

El form en `src/components/Contact.astro` ya valida campos, corre el **honeypot**
anti-spam y muestra el estado de éxito. Para que envíe de verdad, edita la
constante al inicio del `<script>`:

```js
const ENDPOINT = 'https://hireflow-production-04a4.up.railway.app/api/apply';
```

Hace un `POST` JSON con: `name, phone, email, role, message`.
Si lo dejas vacío (`''`), el form funciona en modo demo (no envía, solo confirma).

## Deploy

### Railway
1. Repo nuevo → push del proyecto.
2. Railway detecta Node con Nixpacks.
3. Variables: ninguna obligatoria (si conectas el form, configura tu API aparte).
4. Settings:
   - **Build command:** `npm run build`
   - **Start command:** `npm run preview`  ← usa el `$PORT` de Railway
5. Deploy. Si Railway no redeploya, empty commit como con HireFlow.

### Vercel (alternativa, más simple para estático)
- Framework preset: **Astro** (auto).
- Build: `npm run build` · Output: `dist`.
- Cero config extra.

## Personalizar

- **Colores / tipografía:** `src/styles/global.css` (variables `:root`).
- **Textos / stats / roles:** editar los arrays al inicio de cada componente.
- **Dominio:** cambiar `site` en `astro.config.mjs`.
- **Bilingüe (ES/EN):** se puede agregar con i18n routing de Astro — avísame.

---
© Lelit Logistics LLC · Glastonbury, Connecticut
