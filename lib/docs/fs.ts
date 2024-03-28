import { test } from "@std/front-matter";
import { extract } from "@std/front-matter/any";
import { walk } from "@std/fs";
import { fromFileUrl, normalize, parse, SEPARATOR_PATTERN } from "@std/path";
import type { FSItem } from "./items.ts";
import type { Node } from "./nodes.ts";
import { sortChildren } from "./nodes.ts";
import { renderMd } from "./md.ts";
import { walkChildren } from "#/lib/docs/nodes.ts";

/**
 * RenderFSItemsOptions represents the options for rendering file-based items.
 */
export interface ReadFSItemsOptions {
  root: string | URL;
  isIndex?: (suffix: string, override?: string) => boolean;
  mapName?: (name: string[]) => string[];
}

/**
 * Content represents the content of an item.
 */
export interface Content {
  /**
   * md is the markdown representation of the content.
   */
  md: string;

  /**
   * html is the HTML representation of the content.
   */
  body: string;

  /**
   * title is the title of the content.
   */
  title?: string;

  /**
   * toc is the HTML table of contents of the content.
   */
  toc?: string;

  /**
   * playground is a playground expression.
   */
  playground?: string;
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
  function nameOf(path: string, override?: string): string[] {
    // Parse the path.
    const parsed = parse(path);

    // Remove index suffix from the name.
    const current = override ?? parsed.name;
    const name: string[] = [];
    if (!options.isIndex?.(parsed.name, override)) {
      name.push(current);
    }

    // If the path has a directory, add it to the name.
    if (parsed.dir !== "") {
      // https://discord.com/channels/684898665143206084/684898665151594506/1217030758686785556
      const parent = parsed.dir
        .split(SEPARATOR_PATTERN)
        .slice(root.length);
      name.unshift(...parent);
    }

    return name;
  }

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
  let id = 0;
  const contentsByID = new Map<number, Content>();
  const items: (FSItem & { id: number })[] = [];
  const walkIt = walk(
    options.root,
    { exts: [".md"], includeDirs: false },
  );
  for await (const file of walkIt) {
    let md = await Deno.readTextFile(file.path);

    // Render the FSItem.
    let nameOverride: string | undefined;
    let title: string | undefined;
    let href: string | undefined;
    let playground: string | undefined;
    if (test(md)) {
      const extracted = extract<
        { name: string; title: string; href: string; playground: string }
      >(md);
      nameOverride = extracted.attrs.name ?? nameOverride;
      title = extracted.attrs.title ?? title;
      href = extracted.attrs.href ?? href;
      playground = extracted.attrs.playground ?? playground;
      md = extracted.body;
    }

    // Get the name of the item.
    const name = nameOf(file.path, nameOverride);

    // Store the item contents.
    const { body, toc } = renderMd(md);
    contentsByID.set(
      id,
      { md, body, title, toc, playground },
    );

    // Store the item in the items array.
    const item = { id, name, title, href };
    items.push(item);
    id++;
  }

  // Construct recursive nodes from items.
  const nodes = toNodes(items);

  // Map the item names and nodes in place.
  if (options.mapName) {
    for (const item of items) {
      item.name = options.mapName(item.name);
    }

    walkChildren(nodes, (node) => {
      node.name = options.mapName!(node.name);
    });
  }

  // Copy contents to the contents map with the mapped name.
  const contents = new Map<string, Content>();
  for (const [id, content] of contentsByID) {
    const item = items.find((item) => item.id === id);
    if (!item) {
      throw new Error(`Item not found for content ID: ${id}`);
    }

    contents.set(item.name.join(NAME_SEPARATOR), content);
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
