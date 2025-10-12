import type { AddPlaygroundRequest } from "#/lib/playgrounds/mod.ts";
import { addPlayground } from "#/lib/playgrounds/deno_kv/mod.ts";
import { kv } from "#/lib/resources/kv.ts";
import { Handlers } from "fresh/compat";

export const handler: Handlers = {
  async POST(_ctx) {
    const request = ctx.req;
    const data: AddPlaygroundRequest = await request.json();
    const playground = await addPlayground(kv, data);
    return Response.json(playground);
  },
};
