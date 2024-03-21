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
 * FSItem is an item represented in the file system.
 */
export interface FSItem {
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
  children: Node<FSItem>[];
}

/**
 * getTableOfContents gets the file-based table of contents.
 */
export async function getTableOfContents(
  root = ["server", "docs"],
): Promise<TableOfContents> {
  const children: FSItem[] = [];
  const walkIt = walk(join(...root), { exts: [".md"], includeDirs: false });
  for await (const file of walkIt) {
    const path = parse(file.path);
    const name = [path.name];
    const content = await Deno.readTextFile(file.path);
    const docs = parseDocs({ name, content });
    const child: FSItem = { name, title: docs.title };
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

  return { children };
}

export type Node<T> =
  & T
  & { children?: Node<T>[] };

function sortChildren<T>(node: Node<T>, fn: (node: Node<T>) => number): void {
  if (node.children !== undefined) {
    node.children.sort(fn);
    node.children.forEach((child) => sortChildren(child, fn));
  }
}

// function dfs_sort(entry) {
//   // If current node has children, sort them
//   if (entry.children !== undefined) {
//     // Write a sort function that sorts by string order of the first element in the name field
//     //entry.children.sort((a, b) => a.name[0].localeCompare(b.name[0]));
//     entry.children.sort((a, b) =>
//       a.name.join("/").localeCompare(b.name.join("/"))
//     );
//   }

//   // For each child, if they have children, sort them
//   for (let i = 0; i < entry.children.length; i++) {
//     if (entry.children[i].children !== undefined) {
//       dfs_sort(entry.children[i]);
//     }
//   }
// }

const rootKey = "-";

function makeAdjacencies(
  children: FSItem[],
): { [key: string]: Node<FSItem>[] } {
  // Store an adjacency list of the sections and their paths.
  const adjacencies: { [key: string]: Node<FSItem>[] } = { [rootKey]: [] };

  // Loop through children and store them in the adjacency list.
  for (
    const item of children.toSorted((a, b) => a.name.length - b.name.length)
  ) {
    const suffix = item.name[item.name.length - 1];
    if (suffix.startsWith("00") && item.name.length !== 1) {
      item.name.pop();
      adjacencies[rootKey].push(item);
      continue;
    }

    let path = item.name.slice(0, -1).join("/");
    path = path === "" ? rootKey : path;
    if (adjacencies[path] === undefined) {
      adjacencies[path] = [];
    }

    adjacencies[path].push(item);
  }

  return adjacencies;
}

function makeTableOfContents(
  children: FSItem[],
): TableOfContents {
  const adjacencies = makeAdjacencies(children);
  console.log({ adjacencies });

  // Loop through the adjacencies and build the table of contents.
  const paths = Object.keys(adjacencies)
    .toSorted((b, a) => a.split("/").length - b.split("/").length);
  for (const path of paths) {
    // Save the root path for last.
    if (path === rootKey) {
      continue;
    }

    // Get parent path.
    const parentPath = path.split("/").slice(0, -1).join("/");

    // Find parent.
    const parent = adjacencies[parentPath]
      ?.find((item) => item.name.join("/") === path);
    if (parent === undefined) {
      continue;
    }

    // Add children to parent.
    parent.children = adjacencies[path];
    delete adjacencies[path];
  }

  // Add virtual root to children.
  for (const item of adjacencies[rootKey]) {
    // WIP: Suffix '00_index' should be omitted from name.
  }

  console.log({ adjacencies });
  const toc = { children: [] };
  return toc;
}

// deno run -A server/docs/docs.ts
//
if (import.meta.main) {
  // TODO: Rename to getFSItems.
  const toc = await getTableOfContents();
  // console.log(toc);
  // TODO: Rename to getTableOfContents.
  const toc2 = makeTableOfContents(toc.children);
  // console.log(toc2);
}

/*
  // We now have a hashmap of "path/to/a/section" => [section_entry]
  // Where a section_entry is an object with it's data: {name: ["path", "to", "section"], title: "Section Title", Optional[children]: [], Optional[href]: "https://example.com"}

  // Now loop through our entries by depth
  const paths = Object.keys(sections);
  paths.sort((b, a) => a.split("/").length - b.split("/").length);
  for (let i = 0; i < paths.length; i++) {
    // Save the root path for last
    if (paths[i] === "") continue;
    // Get what our parent's "name" field would be
    const parent_name_field = paths[i].split("/");
    // Get where our parent's path would be stored
    let parent_path = "";
    if (parent_name_field.length !== 1) {
      parent_path = parent_name_field.slice(0, -1).join("/");
    }
    // Search for our parent
    for (let j = 0; j < sections[parent_path].length; j++) {
      // If their field matches what would be our field
      if (
        sections[parent_path][j].name.join("/") == parent_name_field.join("/")
      ) {
        // Add our children to our parent
        sections[parent_path][j].children = sections[paths[i]];
        // Remove our children from the list of sections
        delete sections[paths[i]];
        break;
      } else {
      }
    }
  }

  // Finally, re_add the "00_index" to children at root
  for (let i = 0; i < sections[""].length; i++) {
    const name_field = sections[""][i].name;
    if (name_field[0] === "00_index" || name_field[0].slice(0, 2) == "99") {
      continue;
    } else {
      name_field.push("00_index");
    }
  }

  // Sort titles
  const ret = { children: sections[""] };
  dfs_sort(ret);
  return ret;
}
*/
