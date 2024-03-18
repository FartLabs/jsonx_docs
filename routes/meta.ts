import type { Handlers } from "$fresh/server.ts";
import { getMeta } from "#/lib/docs/mod.ts";

export const handler: Handlers = {
  async GET(_request, _ctx) {
    const meta = await getMeta();
    return Response.json(meta);
  },
};
