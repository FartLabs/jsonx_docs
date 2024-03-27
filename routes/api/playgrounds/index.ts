import type { Handlers } from "$fresh/server.ts";
import type { AddPlaygroundRequest } from "#/lib/playgrounds/mod.ts";
import { addPlayground } from "#/lib/playgrounds/deno_kv/mod.ts";
import { kv } from "#/lib/resources/kv.ts";

export const handler: Handlers = {
  async POST(request, _ctx) {
    const data: AddPlaygroundRequest = await request.json();
    const playground = await addPlayground(kv, data);
    return Response.json(playground);
  },
};
