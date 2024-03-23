import type { Meta } from "#/lib/meta/mod.ts";
import Replace from "#/components/replace.tsx";
import Playground from "#/components/playground/playground.tsx";
import {
  getDataByRegExpMatchArray,
  PLAYGROUND_EXPRESSION_REGEX,
} from "./expression.ts";

/**
 * DocProps are the properties for the Doc component.
 */
export interface DocProps {
  /**
   * html is the html content of the documentation page.
   */
  html: string;

  /**
   * meta is the meta data for the documentation page's playgrounds.
   */
  meta: Meta;
}

/**
 * Doc is a jsonx documentation page component.
 */
export default function Doc(props: DocProps) {
  // TODO: Replace with actual MDX parsing because the async isn't working
  // with Preact hydration.
  return (
    <Replace
      html={props.html}
      pattern={PLAYGROUND_EXPRESSION_REGEX}
      component={async ({ match }) => {
        const data = await getDataByRegExpMatchArray(match);
        return (
          <Playground
            meta={props.meta}
            code={data.code}
            version={data.version}
          />
        );
      }}
    />
  );
}
