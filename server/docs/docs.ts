import { readFSItems } from "./fs.ts";

export const { items, contents, nodes } = await readFSItems({
  root: new URL(".", import.meta.url),
  isIndex: (suffix) => suffix.startsWith("00_"),
});
