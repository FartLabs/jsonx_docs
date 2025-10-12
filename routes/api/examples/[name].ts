import { readExample } from "#/lib/examples/mod.ts";
import { Context, HandlerFn } from "fresh";

export const handler: Record<string, HandlerFn<unknown, unknown>> = {
  async GET(ctx: Context<unknown>) {
    const example = await readExample(`./examples/${ctx.params.name}`);
    return new Response(example);
  },
};
