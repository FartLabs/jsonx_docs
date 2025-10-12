import { getMeta } from "#/lib/meta/mod.ts";
import { Handlers } from "fresh/compat";

export const handler: Handlers = {
  async GET(_ctx) {
    const meta = await getMeta();
    return Response.json(meta);
  },
};
