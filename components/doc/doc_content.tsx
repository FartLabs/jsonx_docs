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
   * html is the html content of the documentation page.
   */
  html: string;

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
  return (
    <>
      <Head>
        <Hljs id="github" />
      </Head>

      <aside>
        <h2>On this page</h2>
        {/* <ToC /> */}
      </aside>

      <main>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: props.html }}
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
