import type { PageProps } from "$fresh/server.ts";
import Nav from "#/components/nav.tsx";

export default function App({ Component, route }: PageProps) {
  const path = route.split("/").filter(Boolean);
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>jsonx | Documentation</title>
        <link rel="stylesheet" href="/global.css" />
      </head>
      <body>
        <Nav path={path} />

        <main>
          <Component />
        </main>
      </body>
    </html>
  );
}
