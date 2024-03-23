import { readFSItems } from "#/lib/docs/mod_server.ts";

export const { items, contents, nodes } = await readFSItems({
  root: "./docs",
  isIndex: (suffix) => suffix.startsWith("00_"),
  renderOptions: {
    // Preserve HTML comments as-is.
    disableHtmlSanitization: true,
    //
    // TODO: Define the base URL for the site with environment variables.
    //
  },
});