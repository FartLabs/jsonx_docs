import { JSX } from "preact/jsx-runtime";

export interface DrawerProps {
  summary: string;
  children: JSX.Element[];
}

// Reference:
// https://web.dev/articles/codelab-building-a-sidenav-component

// Note: I do not want to have to build an entire drawer component
// just to show the playground on documentation pages. For now,
// it is much easier to just place the playground at the bottom of
// the documentation page. I will revisit this later when I have
// more time to work on it. TODO: Remove this comment when done.

export default function Drawer(props: DrawerProps) {
  return (
    <details>
      <summary>
        <h2>{props.summary}</h2>
      </summary>
      {props.children}
    </details>
  );
}
