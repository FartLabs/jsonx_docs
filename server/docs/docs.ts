// import type { RenderOptions } from "@deno/gfm";
// import { render } from "@deno/gfm";
import { toTree } from "./tree.ts";
import { readFSItems } from "./items.ts";

// TODO: Render docs.

// deno run -A server/docs/docs.ts
//
if (import.meta.main) {
  const items = await readFSItems({
    root: ["server", "docs"],
    namespace: "-",
    isIndex: (suffix) => suffix.startsWith("00_"),
  });
  const tree = toTree(items);
  console.dir({ tree }, { depth: null });
}
