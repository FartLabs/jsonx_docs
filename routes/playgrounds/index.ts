import type { Handlers } from "$fresh/server.ts";
import type { AddPlaygroundRequest } from "#/server/playgrounds.ts";
import { addPlayground } from "#/server/playgrounds.ts";
import { kv } from "#/server/kv.ts";

export const handler: Handlers = {
  async POST(request, _ctx) {
    const data: AddPlaygroundRequest = await request.json();
    const playground = await addPlayground(kv, data);
    return Response.json(playground);
  },
};
