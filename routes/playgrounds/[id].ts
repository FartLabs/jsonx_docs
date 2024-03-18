import type { Handlers } from "$fresh/server.ts";
import { getPlayground, setPlayground } from "#/lib/docs/mod.ts";
import { kv } from "#/lib/kv/mod.ts";

export const handler: Handlers = {
  async GET(_request, ctx) {
    const playground = await getPlayground(kv, ctx.params.id);
    return Response.json(playground);
  },
  async POST(request, _ctx) {
    const playground = await request.json();
    await setPlayground(kv, playground);
    return Response.json(playground);
  },
};
