import { readFSItems } from "#/lib/docs/mod_server.ts";
import { Renderer } from "@deno/gfm";

export const { items, contents, nodes } = await readFSItems({
  root: "./docs",
  isIndex: (suffix) => suffix.startsWith("00_"),
  renderOptions: {
    // TODO: Reference
    // https://github.com/denoland/fresh/blob/main/www/utils/markdown.ts
    //
    renderer: new Renderer(),
  },
});
