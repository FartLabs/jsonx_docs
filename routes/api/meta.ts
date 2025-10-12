import { getMeta } from "#/lib/meta/mod.ts";
import { Context, HandlerFn } from "fresh";

export const handler: Record<string, HandlerFn<unknown, unknown>> = {
  async GET(_ctx: Context<unknown>) {
    const meta = await getMeta();
    return Response.json(meta);
  },
};
