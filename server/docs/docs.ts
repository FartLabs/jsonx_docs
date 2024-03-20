import { extract } from "@std/front-matter/any";
import { test } from "@std/front-matter/test";
import type { RenderOptions } from "@deno/gfm";
import { render } from "@deno/gfm";
import { walk } from "@std/fs/walk";
import { join, parse, SEPARATOR_PATTERN } from "@std/path";

/**
 * Docs represents a documentation page.
 */
export type Docs =
  & { name: string[]; title: string }
  & (
    | { md: string; html: string }
    | { href: string }
  );

/**
 * getDocsByName gets the content of a markdown file by name.
 */
export async function getDocsByName(
  name: string[],
  renderOptions?: RenderOptions,
): Promise<Docs> {
  const content = await Deno.readTextFile(
    `./server/docs/${name.join("/")}.md`,
  );
  return parseDocs({ name, content, renderOptions });
}

/**
 * DocsInput represents the options for parsing documentation.
 */
export interface DocsInput {
  name: string[];
  content: string;
  renderOptions?: RenderOptions;
}

/**
 * parseDocs parses the documentation from a markdown file.
 */
export function parseDocs(input: DocsInput): Docs {
  let title = "";
  let md = input.content;
  if (test(input.content)) {
    const extracted = extract<{ title: string; href: string }>(input.content);
    title = extracted.attrs.title || title;
    md = extracted.body;
    if (extracted.attrs.href) {
      return { name: input.name, title, href: extracted.attrs.href };
    }
  }

  const html = render(md, input.renderOptions);
  return { name: input.name, title, md, html };
}

/**
 * TableOfContentsChild represents a child of the table of contents.
 */
export interface TableOfContentsChild {
  name: string[];
  title: string;

  /**
   * href is a custom documentation link.
   */
  href?: string;
}

/**
 * TableOfContents represents the table of contents for the documentation.
 */
export interface TableOfContents {
  children: (
    & TableOfContentsChild
    & { children?: TableOfContentsChild[] }
  )[];
}

/**
 * getTableOfContents gets the file-based table of contents.
 */
export async function getTableOfContents(
  root = ["server", "docs"],
): Promise<TableOfContents> {
  const children: TableOfContentsChild[] = [];
  const walkIt = walk(join(...root), { exts: [".md"] });
  for await (const file of walkIt) {
    if (file.isDirectory) {
      continue;
    }

    const path = parse(file.path);
    const name = [path.name];
    const content = await Deno.readTextFile(file.path);
    const docs = parseDocs({ name, content });
    const child: TableOfContentsChild = { name, title: docs.title };
    if (path.dir !== "") {
      // https://discord.com/channels/684898665143206084/684898665151594506/1217030758686785556
      const parents = path.dir.split(SEPARATOR_PATTERN).slice(root.length);
      child.name.unshift(...parents);
    }

    if ("href" in docs) {
      child.href = docs.href;
    }

    children.push(child);
  }

  console.log({ children });
  const toc: TableOfContents = { children: [] };

  return toc;
}
