import type { FSItem, Node } from "#/lib/docs/mod_client.ts";

/**
 * ToCProps are the properties for the ToC component.
 */
export interface ToCProps {
  path: string[];
  nodes: Node<FSItem>[];
}

/**
 * ToC is a recursive component that renders a table of contents.
 */
export default function ToC(props: ToCProps) {
  return (
    <ul>
      {props.nodes.map((node) => {
        return (
          <li>
            {node.title && (
              <a href={node.href ?? `/${node.name.join("/")}`}>{node.title}</a>
            )}
            {node.children && startsWith(props.path, node.name) && (
              <ToC
                nodes={node.children}
                path={props.path}
              />
            )}
          </li>
        );
      })}
    </ul>
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
