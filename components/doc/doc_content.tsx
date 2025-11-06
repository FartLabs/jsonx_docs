import type { PlaygroundData } from "#/lib/playgrounds/mod.ts";
import { Meta } from "#/lib/meta/mod.ts";
import Playground from "#/components/playground/playground.tsx";
import Hljs from "#/components/hljs.tsx";
import CopyMarkdownButton from "./copy_markdown_button.tsx";
import NavArrows from "./nav_arrows.tsx";

/**
 * DocContentProps are the properties for the DocContent component.
 */
export interface DocContentProps {
  /**
   * title is the title of the documentation page.
   */
  title?: string;

  /**
   * body is the html content of the documentation page.
   */
  body: string;

  /**
   * md is the markdown content of the documentation page.
   */
  md: string;

  /**
   * toc is the table of contents of the documentation page.
   */
  toc?: string;

  /**
   * playground is the playground data for the documentation page.
   */
  playground?: {
    data: PlaygroundData;
    meta: Meta;
  };

  /**
   * currentPath is the current path of the documentation page.
   */
  currentPath?: string[];
}

/**
 * DocContent is the content of a jsonx documentation page.
 */
export default function DocContent(props: DocContentProps) {
  const title = `jsonx | ${props.title ?? "Documentation"}`;
  return (
    <>
      <head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <link rel="stylesheet" href="/md.css" />
        <link rel="stylesheet" href="/nav-arrows.css" />
        <link rel="stylesheet" href="/copy-markdown.css" />

        {/* Choose an ID: https://highlightjs.org/examples */}
        <Hljs id="github-dark-dimmed" />
        <script src="/copy.js" defer></script>
        {props.currentPath && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.addEventListener('keydown', (e) => {
                  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                  const prev = document.querySelector('.nav-arrow-prev:not(.nav-arrow-disabled)');
                  const next = document.querySelector('.nav-arrow-next:not(.nav-arrow-disabled)');
                  if (e.key === 'ArrowLeft' && prev) {
                    prev.click();
                  } else if (e.key === 'ArrowRight' && next) {
                    next.click();
                  }
                });
              `,
            }}
          />
        )}
      </head>

      <aside class="aside">
        <h2>On this page</h2>

        <div
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: props.toc ?? "" }}
        >
        </div>
      </aside>

      <main class="main">
        <div class="page-toc-mobile">
          <h2>On this page</h2>
          <div
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: props.toc ?? "" }}
          >
          </div>
        </div>
        <div class="copy-markdown-button-wrapper">
          <CopyMarkdownButton md={props.md} />
        </div>
        <div
          className="markdown-body"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: props.body }}
        >
        </div>
        {props.playground !== undefined
          ? (
            <Playground
              code={props.playground.data.code}
              version={props.playground.data.version}
              meta={props.playground.meta}
            />
          )
          : null}
        {props.currentPath && <NavArrows currentPath={props.currentPath} />}
      </main>
    </>
  );
}
