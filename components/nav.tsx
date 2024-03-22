import ToC from "#/components/toc.tsx";
import { nodes } from "#/server/docs/docs.ts";

/**
 * NavProps are the properties for the Nav component.
 */
export interface NavProps {
  path: string[];
}

/**
 * Nav is the navigation bar for the documentation.
 */
export default function Nav(props: NavProps) {
  return (
    <nav>
      <a href="/">
        <h1>jsonx</h1>
      </a>

      <ToC nodes={nodes} path={props.path} />
    </nav>
  );
}
