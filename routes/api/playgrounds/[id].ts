import { kv } from "#/lib/resources/kv.ts";
import { getPlayground, setPlayground } from "#/lib/playgrounds/deno_kv/mod.ts";
import { Handlers } from "fresh";

export const handler: Handlers = {
  async GET(ctx) {
    const playground = await getPlayground(kv, ctx.params.id);
    return Response.json(playground);
  },
  async POST(ctx) {
    const request = ctx.req;
    const playground = await request.json();
    await setPlayground(kv, playground);
    return Response.json(playground);
  },
};
