import type { JSX } from "preact/jsx-runtime";

/**
 * ReplaceProps
 */
export interface ReplaceProps {
  /**
   * html is the html content to be replaced.
   */
  html: string;

  /**
   * pattern is the pattern to inject the component by.
   */
  pattern: RegExp;

  /**
   * component is the component to be injected in place of the content.
   */
  component: (
    props: { match: RegExpMatchArray },
  ) => JSX.Element | Promise<JSX.Element>;
}

/**
 * Replace is a component that replaces the content of the element with the content of the component.
 */
export default function Replace(props: ReplaceProps) {
  const segments = props.html.split(props.pattern);
  if (segments.length === 1) {
    return <Raw>{props.html}</Raw>;
  }

  const matches = [...props.html.matchAll(props.pattern)];
  return (
    <>
      {segments.map(async (segment, index) => (
        <>
          <Raw>{segment}</Raw>
          {index < matches.length &&
            await props.component({ match: matches[index] })}
        </>
      ))}
    </>
  );
}

function Raw(props: { children: string }) {
  return <div dangerouslySetInnerHTML={{ __html: props.children }}></div>;
}
