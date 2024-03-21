import { extract } from "@std/front-matter/any";
import { test } from "@std/front-matter/test";
import type { RenderOptions } from "@deno/gfm";
import { render } from "@deno/gfm";
import { walk } from "@std/fs/walk";
import { join, parse, SEPARATOR_PATTERN } from "@std/path";

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

// function adjacenciesOf(items: FSItem[]): Map<string[], string[]> {
//   const adjacencies = new Map<string[], string[]>();
//   for (const item of items) {
//     const parent = item.name.slice(0, -1);
//     if (!adjacencies.has(parent)) {
//       adjacencies.set(parent, []);
//     }

//     adjacencies.get(parent)!.push(item.name[item.name.length - 1]);
//   }

//   return adjacencies;
// }

const ROOT_PARENT = "-";
const NAME_SEPARATOR = "/";

function parentRelationshipsOf(items: FSItem[]): Map<string, string[][]> {
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

export type Node<T> =
  & T
  & { children?: Node<T>[] };

// function sortChildren<T>(node: Node<T>, fn: (node: Node<T>) => number): void {
//   if (node.children !== undefined) {
//     node.children.sort(fn);
//     node.children.forEach((child) => sortChildren(child, fn));
//   }
// }

function tocOf(input: FSItem[]): Node<FSItem>[] {
  // Get the parent relationships of the input.
  const parentRelationships = parentRelationshipsOf(input);

  // Construct the table of contents.
  const children: Node<FSItem>[] = [];

  // function appendChildren(name: string[]) {
  //   // Add the item to the table of contents.
  //   const key = name.join(NAME_SEPARATOR);
  //   const item = input.find((item) => item.name.join(NAME_SEPARATOR) === key);
  //   let node: Node<FSItem>=
  //   while (node.children !== undefined) {
  //   }

  //   // if (parentRelationships.has(key)) {
  //   // }
  // }

  // appendChildren([ROOT_PARENT]);
  console.log({ children });

  // const memo = new Map<string[], number[]>();
  // while (true) {
  //   for (const child of children) {
  //   if (!memo.has(child.name)) {
  //     memo.set(child.name, []);
  //   }

  // Iterate over top level of children.
  // For each child, check if it has a parent.
  // children.forEach((child) => {
  //   if (memo.has(child.name)) {
  // If a child has a parent, add it to the parent's children array.

  // If a child has no parent, add it to the top level of the table of contents.
  // }
  //
  //
  //// memo: Map<string[], number[]>
  // children = [
  // {name: ["00_index"], title: "Overview"},
  // {name: ["01_getting_started"], title: "Getting Started"},
  // {name: ["01_getting_started", "01_installation"], title: "Installation"},
  // {name: ["01_getting_started", "02_hello_world"], title: "Hello World"},
  // ]
  // memo = [
  // ([01_getting_started] => [1])
  // ([01_getting_started, 01_installation] => [1, 0])
  // ([01_getting_started, 02_hello_world] => [1, 0])
  // ]
  // Data structure gives us ability to look up the index of a child in the parent's children array by the child's name.
  // TODO: Remove name suffix starting with prefix 00.
  return children;
}

// deno run -A server/docs/docs.ts
//
if (import.meta.main) {
  const items = await readFSItems({
    root: ["server", "docs"],
    isIndex: (suffix) => suffix.startsWith("00_"),
  });
  // const parentRelationships = parentRelationshipsOf(items);
  const toc = tocOf(items);
  console.log({ toc });
}
