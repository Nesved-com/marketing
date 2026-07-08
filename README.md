# Nesved Marketing Site

The public marketing site for Nesved, Quickbuk and Invobuk — built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion and GSAP.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## Structure

- `src/app` — routes (App Router)
- `src/components` — UI primitives, layout, and page sections
- `src/config` — site nav/footer config, pricing, FAQ, feature and screenshot data
- `src/lib` — utilities, motion helpers, Lenis smooth-scroll and GSAP setup
- `public/brand`, `public/screenshots` — brand assets and real product screenshots

## Deployment

Deployed on Vercel from the `main` branch, with security headers configured in `vercel.json`.
