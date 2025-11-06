import type { PageProps } from "fresh";
import { toPath } from "#/lib/to_path.ts";
import Nav from "#/components/nav.tsx";
import Foot from "#/components/foot.tsx";
import Header from "#/components/header.tsx";
import { nodes } from "#/lib/resources/docs.ts";

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
        <script type="module" src="/nav.js" defer></script>
      </head>
      <body>
        <Header path={toPath(url.pathname)} nodes={nodes} />
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
              // Close mobile nav dialog when clicking outside or pressing Escape
              document.addEventListener('click', (e) => {
                const dialog = document.getElementById('navDialog');
                const overlay = document.getElementById('navOverlay');
                if (dialog && dialog.open && 
                    e.target === overlay) {
                  dialog.close();
                  overlay?.classList.remove('active');
                }
              });
              
              // Close dialog on Escape key
              document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                  const dialog = document.getElementById('navDialog');
                  const overlay = document.querySelector('.nav-overlay');
                  if (dialog && dialog.open) {
                    dialog.close();
                    overlay?.classList.remove('active');
                  }
                }
              });
              
              // Close dialog when clicking a link inside it
              document.addEventListener('click', (e) => {
                const dialog = document.getElementById('navDialog');
                const target = e.target;
                if (dialog && dialog.open && target instanceof HTMLAnchorElement) {
                  const navContent = dialog.querySelector('.nav-dialog-content');
                  if (navContent && navContent.contains(target)) {
                    dialog.close();
                    document.querySelector('.nav-overlay')?.classList.remove('active');
                  }
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
