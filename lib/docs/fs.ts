import type { RenderOptions } from "@deno/gfm";
import { render } from "@deno/gfm";
import { test } from "@std/front-matter";
import { extract } from "@std/front-matter/any";
import { walk } from "@std/fs";
import { fromFileUrl, normalize, parse, SEPARATOR_PATTERN } from "@std/path";
import type { FSItem } from "./items.ts";
import type { Node } from "./nodes.ts";
import { sortChildren } from "./nodes.ts";

/**
 * RenderFSItemsOptions represents the options for rendering file-based items.
 */
export interface ReadFSItemsOptions {
  root: string | URL;
  isIndex?: (suffix: string) => boolean;
  renderOptions?: RenderOptions;
}

/**
 * Content represents the content of an item.
 */
export interface Content {
  md: string;
  html: string;
  playground?: string;
  // TODO: Add recursive list of heading nodes (ID and title). Render the
  // heading nodes as a sidenav component.
}

/**
 * ReadFSItemsResult represents the result of reading file-based items.
 */
export interface ReadFSItemsResult {
  items: FSItem[];
  nodes: Node<FSItem>[];
  contents: Map<string, Content>;
}

/**
 * readFSItems reads the file-based items recursively.
 */
export async function readFSItems(
  options: ReadFSItemsOptions,
): Promise<ReadFSItemsResult> {
  // Normalize the root.
  const root = normalize(
    options.root instanceof URL
      ? fromFileUrl(options.root.toString())
      : options.root,
  ).split(SEPARATOR_PATTERN);
  if (root[root.length - 1] === "") {
    root.pop();
  }

  // Read the file-based items.
  const items: FSItem[] = [];
  const contents = new Map<string, Content>();
  const walkIt = walk(
    options.root,
    { exts: [".md"], includeDirs: false },
  );
  for await (const file of walkIt) {
    let md = await Deno.readTextFile(file.path);
    const path = parse(file.path);

    // Remove index suffix from the name.
    const name = options.isIndex?.(path.name) ? [] : [path.name];

    // If the path has a directory, add it to the name.
    if (path.dir !== "") {
      // https://discord.com/channels/684898665143206084/684898665151594506/1217030758686785556
      const parent = path.dir
        .split(SEPARATOR_PATTERN)
        .slice(root.length);
      name.unshift(...parent);
    }

    // Render the FSItem.
    let title: string | undefined;
    let href: string | undefined;
    let playground: string | undefined;
    if (test(md)) {
      const extracted = extract<
        { title: string; href: string; playground: string }
      >(md);
      if (extracted.attrs.title !== undefined) {
        title = extracted.attrs.title;
      }

      if (extracted.attrs.href !== undefined) {
        href = extracted.attrs.href;
      }

      if (extracted.attrs.playground !== undefined) {
        playground = extracted.attrs.playground;
      }

      md = extracted.body;
    }

    const item = { name, title, href };
    items.push(item);

    // Store the item contents.
    const html = render(md, options.renderOptions);
    contents.set(
      name.join(NAME_SEPARATOR),
      { md, html, playground },
    );
  }

  // Return items relative to the root.
  return { items, contents, nodes: toNodes(items) };
}

/**
 * NAME_SEPARATOR is the separator for an FSItem name.
 */
export const NAME_SEPARATOR = "/";

/**
 * toNodes converts an array of FSItems to list of tree nodes.
 */
export function toNodes(items: FSItem[]): Node<FSItem>[] {
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
