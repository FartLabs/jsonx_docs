import type { PageProps } from "$fresh/server.ts";
import Nav, { toPath } from "#/components/nav.tsx";

export default function App({ Component, route }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>jsonx | Documentation</title>
        <link rel="stylesheet" href="/global.css" />
      </head>
      <body>
        <Nav path={toPath(route)} />

        <main>
          <Component />
        </main>
      </body>
    </html>
  );
}
