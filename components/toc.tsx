import type { FSItem, Node } from "#/lib/docs/mod_client.ts";

/**
 * ToCProps are the properties for the ToC component.
 */
export interface ToCProps {
  nodes: Node<FSItem>[];
  filter?: (node: Node<FSItem>) => boolean;
}

/**
 * ToC is a recursive component that renders a table of contents.
 */
export default function ToC(props: ToCProps) {
  return (
    <ul>
      {props.nodes.map((node) => (
        <li>
          {node.title && (
            <a href={node.href ?? `/${node.name.join("/")}`}>{node.title}</a>
          )}
          {node.children && (props.filter?.(node) ?? true) && (
            <ToC nodes={node.children} filter={props.filter} />
          )}
        </li>
      ))}
    </ul>
  );
}
