import type { Playground } from "#/lib/playgrounds/mod.ts";

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
  playground?: Playground;
}

/**
 * Doc is a jsonx documentation page component.
 */
export default function Doc(props: DocProps) {
  return (
    // TODO: Add sidenav for the documentation page.
    <>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: props.html }}
      >
      </div>
    </>
  );
}
