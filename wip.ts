import { getTableOfContents } from "#/server/docs/mod.ts";

// deno run -A wip.ts
//
if (import.meta.main) {
  const toc = await getTableOfContents();
  console.log({ toc });
}
