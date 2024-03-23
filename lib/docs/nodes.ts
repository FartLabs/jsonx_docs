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
  if (node.children !== undefined) {
    node.children.sort(fn);
    node.children.forEach((child) => sortChildren(child, fn));
  }
}
