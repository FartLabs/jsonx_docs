import type { Handlers } from "$fresh/server.ts";
import type { AddPlaygroundRequest } from "#/client/playgrounds.ts";
import { addPlayground } from "#/server/kv/playgrounds.ts";
import { kv } from "#/server/kv/kv.ts";

export const handler: Handlers = {
  async POST(request, _ctx) {
    const data: AddPlaygroundRequest = await request.json();
    const playground = await addPlayground(kv, data);
    return Response.json(playground);
  },
};
