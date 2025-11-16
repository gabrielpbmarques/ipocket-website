## iPocket Brasil – Landing Page

Landing page em Next.js com Tailwind CSS v4, componentes reutilizáveis e animações on-scroll para vender o produto iPocket Brasil.

### Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

### Tech stack
- Next.js (App Router)
- Tailwind CSS v4 (@tailwindcss/postcss)
- Framer Motion (animações on-scroll)
- Radix UI Accordion (FAQ)
- Embla Carousel (depoimentos)
- React Hook Form + Zod (formulário)

### Estrutura principal
- `app/page.tsx`: todas as seções da landing com âncoras
- `app/api/encomenda/route.ts`: endpoint de envio do formulário (mock)
- `app/styles/tokens.css`: tokens de design (cores, sombras, raios)
- `components/*`: componentes reutilizáveis (Button, Section, etc.)
- `public/mock-*.svg`: imagens mock para visual

### Personalização
- Ajuste paleta em `app/styles/tokens.css`
- Imagens reais podem substituir os mocks em `public/`
- Integração real de backend: adaptar `app/api/encomenda/route.ts`


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
