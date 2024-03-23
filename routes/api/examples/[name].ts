import type { Handlers } from "$fresh/server.ts";
import { readExample } from "#/lib/examples/mod.ts";

export const handler: Handlers = {
  async GET(_request, ctx) {
    const example = await readExample(`./examples/${ctx.params.name}`);
    return new Response(example);
  },
};
