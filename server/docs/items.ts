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
  namespace?: string;
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

    // Add namespace to the name.
    if (options.namespace !== undefined) {
      name.unshift(options.namespace);
    }

    // Render the FSItem.
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
