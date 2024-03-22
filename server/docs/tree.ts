const from = [
  { name: [], title: "Overview", href: undefined },
  {
    name: ["01_getting_started"],
    title: "Getting Started",
    href: undefined,
  },
  {
    name: ["01_getting_started", "01_install"],
    title: "Install",
    href: undefined,
  },
  {
    name: ["01_getting_started", "02_use"],
    title: "Use",
    href: undefined,
  },
  {
    name: ["99_view_on_github"],
    title: "View on GitHub",
    href: "https://github.com/FartLabs/jsonx",
  },
].sort(() => Math.random() - 0.5);

const to = [
  { name: [], title: "Overview", href: undefined },
  {
    name: ["01_getting_started"],
    title: "Getting Started",
    href: undefined,
    children: [
      {
        name: ["01_getting_started", "01_install"],
        title: "Install",
        href: undefined,
      },
      {
        name: ["01_getting_started", "02_use"],
        title: "Use",
        href: undefined,
      },
    ],
  },
  {
    name: ["99_view_on_github"],
    title: "View on GitHub",
    href: "https://github.com/FartLabs/jsonx",
  },
];

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
 * toTree converts an array of FSItems to a tree.
 */
export function toTree(items: FSItem[]): Node<FSItem>[] {
  const root: Node<FSItem> = { name: [] };
  for (const item of items) {
    let node = root;
    for (const part of item.name) {
      let child = node.children?.find((child) => child.name[0] === part);
      if (child === undefined) {
        if (node.children === undefined) {
          node.children = [];
        }

        child = { name: [part] };
        node.children.push(child);
      }

      node = child;
    }
    node.title = item.title;
    node.href = item.href;
  }

  sortChildren(
    root,
    (a, b) => a.name.join("/").localeCompare(b.name.join("/")),
  );
  return root.children ?? [];
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
