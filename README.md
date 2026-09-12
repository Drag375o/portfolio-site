# atahar-portfolio

Personal site for Atahar Hossain Piash. Next.js 15 (App Router), TypeScript,
Tailwind v4, Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # catches content/schema mistakes before build
npm run build
```

## Add your files

| What | Path |
|---|---|
| Portrait | `public/portrait.jpg` — 4:5, min 1200×1500, **unedited** |
| CV | `public/atahar-hossain-piash-cv.pdf` |
| Screenshots | `public/projects/<project-slug>/01-name.png` |
| Favicon | `app/icon.png` — 512×512 |

After adding the portrait, set `HAS_PORTRAIT = true` in
`components/hero/PortraitPlate.tsx`.

## Add a project

Append one object to `content/projects.ts`. It appears on the homepage, in
`/projects`, in the sitemap and at `/projects/<slug>` with no other edits.
`evidence` is required by the type — every item declares what backs it.

## Change the typeface

One line: the `Geist(...)` call in `app/layout.tsx`. No component names a font.

## Change the palette

One place: the `@theme` block in `app/globals.css`.
