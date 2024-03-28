/**
 * Node is a node in a tree.
 */
export type Node<T> =
  & T
  & { children?: Node<T>[] };

/**
 * sortChildren sorts the children of a node recursively.
 */
export function sortChildren<T>(
  node: Node<T>,
  fn: (a: Node<T>, b: Node<T>) => number,
): void {
  return walkChildren(node.children ?? [], (node) => {
    if (node.children !== undefined) {
      node.children.sort(fn);
    }
  });
}

/**
 * walkChildren walks the children of a node recursively.
 */
export function walkChildren<T>(
  children: Node<T>[],
  fn: (node: Node<T>) => void,
): void {
  for (const child of children) {
    fn(child);
    if (child.children !== undefined) {
      walkChildren(child.children, fn);
    }
  }
}
