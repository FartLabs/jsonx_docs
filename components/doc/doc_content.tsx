import type { PlaygroundData } from "#/lib/playgrounds/mod.ts";
import { Meta } from "#/lib/meta/mod.ts";
import Playground from "#/components/playground/playground.tsx";
import { Head } from "$fresh/runtime.ts";
import Hljs from "#/components/hljs.tsx";

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
  const title = `jsonx | ${props.title ?? "Documentation"}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <link rel="stylesheet" href="/md.css" />

        <Hljs id="monokai" />
        <script src="/copy.js" defer></script>
      </Head>

      <aside class="aside">
        <h2>On this page</h2>
        <div dangerouslySetInnerHTML={{ __html: props.toc ?? "" }}></div>
      </aside>

      <main class="main">
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: props.body }}
        >
        </div>
        {props.playground && (
          <Playground
            code={props.playground.data.code}
            version={props.playground.data.version}
            meta={props.playground.meta}
          />
        )}
      </main>
    </>
  );
}
