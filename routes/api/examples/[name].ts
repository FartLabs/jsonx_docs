import { readExample } from "#/lib/examples/mod.ts";
import { Handlers } from "fresh/compat";

export const handler: Handlers = {
  async GET(ctx) {
    const example = await readExample(`./examples/${ctx.params.name}`);
    return new Response(example);
  },
};
