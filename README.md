# Password Generator App

Este proyecto es una aplicación de gestión y generación de contraseñas construida con [Next.js](https://nextjs.org), [Prisma](https://www.prisma.io/) (usando SQLite), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), y [TanStack Query](https://tanstack.com/query/latest).

## Tecnologías utilizadas

-   **Next.js**: Framework de React para aplicaciones web modernas.
-   **Prisma + SQLite**: ORM para Node.js y base de datos ligera para desarrollo local.
-   **Tailwind CSS**: Utilidades CSS para un diseño rápido y responsivo.
-   **shadcn/ui**: Componentes accesibles y personalizables para React.
-   **TanStack Query**: Manejo eficiente de datos asíncronos y caché en React.

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/password-generator.git
    cd password-generator
    ```

2. Instala las dependencias:

    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    # o
    bun install
    ```

3. Configura la base de datos:

    ```bash
    npx prisma migrate dev --name init
    ```

4. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    # o
    yarn dev
    # o
    pnpm dev
    # o
    bun dev
    ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

Puedes comenzar a editar la página modificando `app/page.tsx`. La página se actualizará automáticamente a medida que edites el archivo.

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar automáticamente [Geist](https://vercel.com/font), una nueva familia de fuentes para Vercel.

## Aprender más

Para aprender más sobre Next.js, consulta los siguientes recursos:

-   [Documentación de Next.js](https://nextjs.org/docs) - aprende sobre las características y la API de Next.js.
-   [Aprender Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.

Puedes consultar [el repositorio de Next.js en GitHub](https://github.com/vercel/next.js) - ¡tus comentarios y contribuciones son bienvenidos!

## Desplegar en Vercel

La forma más sencilla de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta nuestra [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
