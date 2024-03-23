import ToC from "#/components/toc.tsx";
import { nodes } from "#/lib/resources/docs.ts";

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

/**
 * toPath returns the path from the path string.
 */
export function toPath(path: string): string[] {
  return path.split("/").filter(Boolean);
}
