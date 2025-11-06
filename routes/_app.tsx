import type { PageProps } from "fresh";
import { toPath } from "#/lib/to_path.ts";
import Nav from "#/components/nav.tsx";
import Foot from "#/components/foot.tsx";
import Header from "#/components/header.tsx";

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
        <Header />
        <div class="main-content">
          <Nav path={toPath(url.pathname)} />
          {/* @ts-ignore */}
          <Component />
        </div>
        <Foot />
        <script
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{
            __html: `
              // Close mobile nav when clicking outside
              document.addEventListener('click', (e) => {
                const nav = document.querySelector('.nav');
                const navToggle = document.getElementById('navToggle');
                const overlay = document.getElementById('navOverlay');
                if (nav && nav.classList.contains('open') && 
                    !nav.contains(e.target) && 
                    !navToggle?.contains(e.target)) {
                  nav.classList.remove('open');
                  overlay?.classList.remove('active');
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
