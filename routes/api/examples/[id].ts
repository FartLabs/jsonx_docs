import type { Handlers } from "$fresh/server.ts";
import { getExampleByName } from "#/server/examples/mod.ts";

export const handler: Handlers = {
  async GET(_request, ctx) {
    const example = await getExampleByName(ctx.params.id);
    return new Response(example);
  },
};
