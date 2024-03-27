import { readFSItems } from "#/lib/docs/mod_server.ts";

export const { items, contents, nodes } = await readFSItems({
  root: "./docs",
  isIndex: (suffix) => suffix.startsWith("00_"),
});
