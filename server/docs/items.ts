import { render, type RenderOptions } from "@deno/gfm";
import { extract } from "@std/front-matter/any";
import { test } from "@std/front-matter/test";
import { walk } from "@std/fs/walk";
import { dirname, parse, SEPARATOR_PATTERN, toFileUrl } from "@std/path";

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
}

/**
 * ReadFSItemsResult represents the result of reading file-based items.
 */
export interface ReadFSItemsResult {
  items: FSItem[];
  contents: Map<string, Content>;
}

/**
 * readFSItems reads the file-based items recursively.
 */
export async function readFSItems(
  options: ReadFSItemsOptions,
): Promise<ReadFSItemsResult> {
  const items: FSItem[] = [];
  const contents = new Map<string, Content>();
  const walkIt = walk(
    options.root,
    { exts: [".md"], includeDirs: false },
  );
  for await (const file of walkIt) {
    let md = await Deno.readTextFile(file.path);
    const html = render(md, options.renderOptions);
    const path = parse(file.path);

    // Remove index suffix from the name.
    const name = options.isIndex?.(path.name) ? [] : [path.name];

    console.dir({
      file,
      path,
      dir1: toFileUrl(path.dir).toString(),
      dir2: dirname(options.root.toString()),
    }, { depth: null });

    // If the path has a directory, add it to the name.
    if (path.dir !== "") {
      // https://discord.com/channels/684898665143206084/684898665151594506/1217030758686785556
      const parent = path.dir
        // .slice(dirname(options.root.toString()).length)
        .split(SEPARATOR_PATTERN);
      name.unshift(...parent);
    }

    // Render the FSItem.
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

      md = extracted.body;
    }

    const item = { name, title, href };
    items.push(item);

    // Store the item contents.
    contents.set(file.path, { md, html });
  }

  return { items, contents };
}
