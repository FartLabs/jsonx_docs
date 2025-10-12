import type { AddPlaygroundRequest } from "#/lib/playgrounds/mod.ts";
import { addPlayground } from "#/lib/playgrounds/deno_kv/mod.ts";
import { kv } from "#/lib/resources/kv.ts";
import { Context, HandlerFn } from "fresh";

export const handler: Record<string, HandlerFn<unknown, unknown>> = {
  async POST(ctx: Context<unknown>) {
    const request = ctx.req;
    const data: AddPlaygroundRequest = await request.json();
    const playground = await addPlayground(kv, data);
    return Response.json(playground);
  },
};
