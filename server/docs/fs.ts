import { extract } from "@std/front-matter/any";
import { test } from "@std/front-matter/test";
import { walk } from "@std/fs/walk";
import { join, parse, SEPARATOR_PATTERN } from "@std/path";

/**
 * FSItem is an item represented in the file system.
 */
export interface FSItem {
  name: string[];
  title?: string;
  href?: string;
}

/**
 * RenderFSItemsOptions represents the options for rendering file-based items.
 */
export interface ReadFSItemsOptions {
  root: string[];
  isIndex?: (suffix: string) => boolean;
}

/**
 * readFSItems reads the file-based items recursively.
 */
export async function readFSItems(
  options: ReadFSItemsOptions,
): Promise<FSItem[]> {
  const items: FSItem[] = [];
  const walkIt = walk(
    join(...options.root),
    { exts: [".md"], includeDirs: false },
  );
  for await (const file of walkIt) {
    const md = await Deno.readTextFile(file.path);
    const path = parse(file.path);
    // Remove index suffix from the name.
    const name = options.isIndex?.(path.name) ? [] : [path.name];

    // If the path has a directory, add it to the name.
    if (path.dir !== "") {
      // https://discord.com/channels/684898665143206084/684898665151594506/1217030758686785556
      const parents = path.dir
        .split(SEPARATOR_PATTERN)
        .slice(options.root.length);
      name.unshift(...parents);
    }

    const item = renderFSItem(name, md);
    items.push(item);
  }

  return items;
}

/**
 * renderFSItem renders the FSItem.
 */
export function renderFSItem(name: string[], md: string): FSItem {
  let title: string | undefined;
  let href: string | undefined;
  if (test(md)) {
    const extracted = extract<{ title: string; href: string }>(md);
    if (extracted.attrs.title !== undefined) {
      title = extracted.attrs.title;
    }

    if (extracted.attrs.href !== undefined) {
      href = extracted.attrs.href;
    }
  }

  return { name, title, href };
}

const ROOT_PARENT = "-";
const NAME_SEPARATOR = "/";

function directoriesOf(items: FSItem[]): Map<string, string[][]> {
  const relationships = new Map<string, string[][]>();
  for (const item of items) {
    const parentKey =
      (item.name.length > 1 ? item.name.slice(0, -1) : [ROOT_PARENT])
        .join(NAME_SEPARATOR);
    if (!relationships.has(parentKey)) {
      relationships.set(parentKey, []);
    }

    relationships.get(parentKey)!.push(item.name);
  }

  return relationships;
}

/**
 * Node is a node in a tree.
 */
export type Node<T> =
  & T
  & { children?: Node<T>[] };

// function sortChildren<T>(node: Node<T>, fn: (node: Node<T>) => number): void {
//   if (node.children !== undefined) {
//     node.children.sort(fn);
//     node.children.forEach((child) => sortChildren(child, fn));
//   }
// }

/**
 * addItem recursively adds an item to the result.
 */
function addItem(
  result: Node<FSItem>[],
  items: FSItem[],
  index: number,
  depth = 0,
): void {
  const item = items[index];
  const current = item.name.at(depth);
  if (current === undefined) {
    return;
  }

  let parent = result.find((node) => node.name.at(depth) === current);
  if (parent === undefined) {
    parent = { ...item, children: [] };
    result.push(parent);
  }

  if (parent !== undefined) {
    parent.children ??= [];
  }
}

function tocOf(input: FSItem[]): Node<FSItem>[] {
  // Restructure the input in terms of directories.
  const directories = directoriesOf(input);

  // Add the item to the table of contents.

  // Construct the table of contents.
  const result: Node<FSItem>[] = [];
  const visited = new Set<string>();
  const queue = [ROOT_PARENT];
  while (queue.length > 0) {
    const parent = queue.shift()!;
    if (visited.has(parent)) {
      continue;
    }

    const children = directories.get(parent);
    if (!children) {
      throw new Error(`no children for ${parent}`);
    }

    for (const child of children) {
      const item = input.find((item) =>
        item.name.join(NAME_SEPARATOR) === child.join(NAME_SEPARATOR)
      );
      if (!item) {
        throw new Error(`no item for ${child}`);
      }

      // Write item to result recursively.
      addItem(item);
    }

    visited.add(parent);
  }

  return result;
}

// deno run -A server/docs/fs.ts
//
if (import.meta.main) {
  const items = await readFSItems({
    root: ["server", "docs"],
    isIndex: (suffix) => suffix.startsWith("00_"),
  });
  const toc = tocOf(items);
  console.log({ toc });
}
