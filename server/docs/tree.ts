/**
 * FSItem is an item represented in the file system.
 */
export interface FSItem {
  name: string[];
  title?: string;
  href?: string;
}

/**
 * Node is a node in a tree.
 */
export type Node<T> =
  & T
  & { children?: Node<T>[] };

/**
 * NAME_SEPARATOR is the separator for an FSItem name.
 */
export const NAME_SEPARATOR = "/";

/**
 * toTree converts an array of FSItems to a tree.
 */
export function toTree(items: FSItem[]): Node<FSItem>[] {
  const root: Node<FSItem> = { name: [] };
  let visitedRoot = false;
  for (const item of items) {
    let node = root;
    if (item.name.length === 0) {
      visitedRoot = true;
    }

    for (let i = 0; i < item.name.length; i++) {
      const part = item.name.slice(0, i + 1).join(NAME_SEPARATOR);
      let child = node.children?.find((child) =>
        child.name.join(NAME_SEPARATOR) === part
      );
      if (child === undefined) {
        if (node.children === undefined) {
          node.children = [];
        }

        child = { name: item.name.slice(0, i + 1) };
        node.children.push(child);
      }

      node = child;
    }
    node.title = item.title;
    node.href = item.href;
  }

  sortChildren(
    root,
    (a, b) =>
      a.name.join(NAME_SEPARATOR).localeCompare(b.name.join(NAME_SEPARATOR)),
  );

  const children = root.children ?? [];
  if (visitedRoot) {
    children.unshift({ name: [], title: root.title, href: root.href });
  }

  return children;
}

function sortChildren<T>(
  node: Node<T>,
  fn: (a: Node<T>, b: Node<T>) => number,
): void {
  if (node.children !== undefined) {
    node.children.sort(fn);
    node.children.forEach((child) => sortChildren(child, fn));
  }
}
