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
    <nav class="nav">
      <h1>
        <a href="/">jsonx</a>
      </h1>

      <ToC
        nodes={nodes}
        filter={(node) =>
          startsWith(props.path, node.name) &&
          node.name.length <= props.path.length + 1}
      />
    </nav>
  );
}

function startsWith(path: string[], prefix: string[]): boolean {
  if (path.length < prefix.length) {
    return false;
  }

  for (let i = 0; i < prefix.length; i++) {
    if (path[i] !== prefix[i]) {
      return false;
    }
  }

  return true;
}
