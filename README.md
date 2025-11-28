# Matur — Ultra-modern Landing (React + TS + Vite)

Jednostránková, space-themed landing page pre slovenskú appku „Matur“ s plynulými animáciami, prístupnosťou a vysokým výkonom.

## Požiadavky
- React + TypeScript + Vite
- TailwindCSS
- Animácie: Framer Motion (+ GSAP voliteľne)
- Lottie (voliteľné), react-three-fiber/drei (voliteľné)
- Vitest + Testing Library
- ESLint + Prettier

## Rýchly štart
```bash
npm install
npm run dev
```

Build:
```bash
npm run build
npm run preview
```

## Scripty
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx",
    "test": "vitest"
  }
}
```

## Štruktúra
```
src/
  assets/
    images/         # hviezdy (CC/public), lottie json, gltf
  components/
    Navbar.tsx
    HeroStage.tsx
    StarsBackground.tsx
    PhoneMockup.tsx
    HowItWorks.tsx
    Features.tsx
    Roadmap.tsx
    BetaCard.tsx
    Footer.tsx
  hooks/
    useScrollUnlock.ts
  styles/
    globals.css
    tailwind.css
  App.tsx
  main.tsx
```

## Implementácia
- StarsBackground: performant canvas s parallax efektom (mouse/scroll), rešpektuje `prefers-reduced-motion`.
- HeroStage: úvodný veľký nápis „matur“ + podnadpis; scroll sekvencia: text fade-out → príchod telefónu → odomknutie a odhalenie obsahu.
- PhoneMockup: SVG fallback (bez assetov), hover tilt; voliteľne nahraď Lottie/GLTF (lazy-load).
- HowItWorks/Features/Roadmap/BetaCard/Footer: prístupné sekcie s glassmorphism štýlom.
- Navigácia: sticky glass navbar, zmenšovanie pri scrolle, CTA link (APK).

## Prístupnosť
- Všetky interaktívne prvky sú fokusovateľné, ARIA atribúty doplnené.
- `prefers-reduced-motion` vypína intenzívne animácie.
- Kontrast tlačidiel vs pozadia >= 4.5:1 (tmavý režim, neon akcenty).

## Performance & SEO
- Vite + ESBuild, Tailwind purge v produkte.
- Lazy-load pre ťažké moduly (Lottie, three) odporúčané (pripravené na doplnenie).
- `vite-imagetools` povolené v `vite.config.ts` (importovanie optimalizovaných obrázkov).

Príklad použitia imagetools:
```ts
// import star from '@/assets/images/star.png?w=600;900;1200&format=webp;avif&as=picture';
```

## Testy
```bash
npm run test
```
Obsahuje jednoduchý smoke test na prítomnosť CTA odkazu.

## Assets & Licencie
Používaj iba Creative Commons alebo public domain:
- Hviezdne pozadie: NASA / Wikimedia Commons (public domain/CC).
- 3D model telefónu: GLTF s CC-BY/CC0/Public Domain.
- Lottie: kolekcie s povolením na komerčné použitie.

Miesta na vloženie:
- `src/assets/images/` — obrázky hviezd (optimalizované cez imagetools).
- `src/assets/lottie/phone.json` — Lottie animácia odomknutia (voliteľné).
- `src/assets/models/phone.glb` — 3D model (voliteľné).

Po pridaní assetov uveď zdroje (URL + licencia + autor) sem:
- Hviezdy: [URL] — [Licencia] — [Autor]
- Telefón GLTF: [URL] — [Licencia] — [Autor]
- Lottie: [URL] — [Licencia] — [Autor]

## Akceptačné kritériá (checklist)
- Hero load: iba hviezdy + veľký „matur“ (nav/cta povolené).
- Scroll sekvencia: fade-out textu → zamknutý telefón → odomknutie → obsah.
- CTA (APK) smeruje na `https://release.matur.sk/matur-preview-0.5.2.apk`.
- Navbar: sticky, glass, keyboard nav, focus states.
- HowItWorks: 4 kroky, ikony reagujú na hover/focus.
- Roadmap: horizontálny slider, klávesmi ovládateľný.
- Beta: formulár posiela request na `/api/beta` (mock v dev).
- Performance: Lighthouse (desktop) >= 95.
- Accessibility: ARIA, prefers-reduced-motion, keyboard navigable.
- Assets: licencované a zdrojované v README.

## Nasadenie
- Build: `npm run build` → obsah v `dist/`.
- Odporúčané: Nginx static hosting + Cloudflare CDN pre obrázky a assets.
- V prípade SPA nasadenia nastav `try_files` na fallback `index.html`.

## Poznámky
- Projekt nepoužíva stock fotky; telefón je SVG fallback (nahraditeľný za GLTF/Lottie).
- Pre hladké pinovanie sekvencií možno doplniť `gsap/ScrollTrigger` a timeline scrub.
```bash
npm i gsap
```
Registrácia (príklad):
```ts
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);
```








