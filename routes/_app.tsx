import type { PageProps } from "$fresh/server.ts";
import { toPath } from "#/lib/to_path.ts";
import Nav from "#/components/nav.tsx";
import Foot from "#/components/foot.tsx";

export default function App({ Component, url }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>jsonx | Documentation</title>
        <meta property="og:title" content="jsonx | Documentation" />
        <meta property="og:description" content="Learn how to use jsonx." />
        <link rel="stylesheet" href="/global.css" />
      </head>
      <body>
        <Nav path={toPath(url.pathname)} />
        <Component />
        <Foot />
      </body>
    </html>
  );
}
