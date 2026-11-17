/**
 * Renders the docs and reads the examples into `generated/`, so the server can run without a file system
 * (Cloudflare Workers has none).
 *
 * Usage: `deno task generate`
 */

import { walk } from "@std/fs";
import { readFSItems } from "#/lib/docs/mod_server.ts";
import { trimJSXImportSource } from "#/lib/examples/trim.ts";

const outDir = new URL("../generated/", import.meta.url);
await Deno.mkdir(outDir, { recursive: true });

const { items, nodes, contents } = await readFSItems({
  root: "./docs",
  isIndex: (suffix) => suffix.startsWith("00_"),
  mapName: (name) =>
    name.map((part) => part.replace(/^\d{2}_/, "").replace(/_/g, "-")),
});
await Deno.writeTextFile(
  new URL("docs.json", outDir),
  JSON.stringify({ items, nodes, contents: Array.from(contents) }),
);

const examples: Record<string, string> = {};
for await (const entry of walk("./examples", { includeDirs: false })) {
  const name = entry.path.replaceAll("\\", "/");
  const code = (await Deno.readTextFile(entry.path)).replaceAll("\r\n", "\n");
  examples[`./${name}`] = trimJSXImportSource(code);
}
await Deno.writeTextFile(
  new URL("examples.json", outDir),
  JSON.stringify(examples),
);

console.log(
  `Generated ${items.length} docs and ${
    Object.keys(examples).length
  } examples.`,
);
