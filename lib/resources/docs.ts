import { readFSItems } from "#/lib/docs/mod_server.ts";

export const { items, contents, nodes } = await readFSItems({
  root: "./docs",
  isIndex: (suffix) => suffix.startsWith("00_"),
  mapName: (name) =>
    name.map((part) => part.replace(/^\d{2}_/, "").replace(/_/g, "-")),
});
