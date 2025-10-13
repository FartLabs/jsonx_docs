import type { PlaygroundData } from "#/lib/playgrounds/mod.ts";
import { Meta } from "#/lib/meta/mod.ts";
import Playground from "#/components/playground/playground.tsx";
import Hljs from "#/components/hljs.tsx";
import CopyMarkdownButton from "./copy_markdown_button.tsx";
import { useSignal } from "@preact/signals";

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
}

/**
 * DocContent is the content of a jsonx documentation page.
 */
export default function DocContent(props: DocContentProps) {
  const copied = useSignal(false);
  const title = `jsonx | ${props.title ?? "Documentation"}`;
  return (
    <>
      <head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <link rel="stylesheet" href="/md.css" />

        {/* Choose an ID: https://highlightjs.org/examples */}
        <Hljs id="github-dark-dimmed" />
        <script src="/copy.js" defer></script>
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
        <div class="flex justify-end mb-4">
          <CopyMarkdownButton md={props.md} copied={copied} />
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
      </main>
    </>
  );
}
