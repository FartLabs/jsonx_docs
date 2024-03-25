import type { PlaygroundData } from "#/lib/playgrounds/mod.ts";
import { Meta } from "#/lib/meta/mod.ts";
import Playground from "#/components/playground/playground.tsx";

/**
 * DocProps are the properties for the Doc component.
 */
export interface DocProps {
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
 * Doc is a jsonx documentation page component.
 */
export default function Doc(props: DocProps) {
  return (
    <>
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
    </>
  );
}
