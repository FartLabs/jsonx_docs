import type { PageProps } from "$fresh/server.ts";
import { toPath } from "#/lib/to_path.ts";
import Nav from "#/components/nav.tsx";
import Foot from "#/components/foot.tsx";
// import Hljs from "#/components/hljs.tsx";

export default function App({ Component, url }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>jsonx | Documentation</title>
        <link rel="stylesheet" href="/global.css" />
        {/* <Hljs /> */}
      </head>
      <body>
        <Nav path={toPath(url.pathname)} />

        <main>
          <Component />
        </main>

        <aside>
          <h2>On this page</h2>
          {/* <ToC /> */}
        </aside>

        <Foot />
      </body>
    </html>
  );
}
