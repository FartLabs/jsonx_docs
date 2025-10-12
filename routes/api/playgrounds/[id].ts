import { kv } from "#/lib/resources/kv.ts";
import { getPlayground, setPlayground } from "#/lib/playgrounds/deno_kv/mod.ts";
import { Context, HandlerFn } from "fresh";

export const handler: Record<string, HandlerFn<unknown, unknown>> = {
  async GET(ctx: Context<unknown>) {
    const playground = await getPlayground(kv, ctx.params.id);
    return Response.json(playground);
  },
  async POST(ctx: Context<unknown>) {
    const request = ctx.req;
    const playground = await request.json();
    await setPlayground(kv, playground);
    return Response.json(playground);
  },
};
