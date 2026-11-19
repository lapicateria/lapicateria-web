This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
// deploy jueves,  9 de abril de 2026, 16:55:10 CEST

## Panel APPCC de La Picatería

El acceso interno es `/appcc`. La integración procede de
`xavvvibo/kioskoalfresko@63e3c65` y parte con el historial de La Picatería vacío.

1. Crea o elige un proyecto Supabase dedicado al APPCC de La Picatería. Aplica
   `supabase/migrations` en orden con Supabase CLI (`supabase db push` después de
   vincular ese proyecto). Las migraciones crean también el bucket privado
   `picateria-appcc-documents`.
2. Usa `.env.appcc.example` como referencia para `.env.local` y las variables del
   despliegue. Genera valores independientes para la contraseña de arranque,
   la firma de sesión y el token del puente de impresión.
3. El panel incluye los equipos de frío de La Picatería. Para sustituir el listado, configura
   `NEXT_PUBLIC_APPCC_TEMPERATURE_EQUIPMENT` antes de compilar. Las zonas admitidas
   son `Puesto 32`, `Barra`, `Cocina` y `Almacén`. Los tipos son `refrigerated` y `freezer`.
   Entra a `/appcc` con la contraseña inicial y crea las cuentas nominales desde
   Usuarios. Revisa las fichas del centro documental y carga los documentos y
   proveedores del establecimiento.
4. Para GoDEX, configura en el PC de la impresora `ERP_API_URL=https://lapicateria.es`,
   `ERP_API_TOKEN` con el valor de `PRINT_JOBS_API_TOKEN`, `PRINTER_KEY=picateria_godex_g500`
   y la dirección de la GoDEX de La Picatería en `GODEX_HOST`. Ejecuta
   `npm run printer:bridge`. Zebra utiliza Browser Print en el equipo que imprime.

Comprobaciones locales del código y la cola de impresión:

```sh
npm ci
npm run build
npm run printer:test:unit
```
