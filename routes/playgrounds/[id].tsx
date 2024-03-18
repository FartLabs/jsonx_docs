import type { Handlers, PageProps } from "$fresh/server.ts";
import { getPlaygroundByID } from "#/client/playgrounds.ts";
import { getPlayground, setPlayground } from "#/server/playgrounds.ts";
import { kv } from "#/server/kv.ts";

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

export default async function PlaygroundHandler(props: PageProps) {
  const playground = await getPlaygroundByID(props.params.id);
  // TODO: Render playground island component.
  return (
    <>
      <pre><code>{JSON.stringify(playground, null, 2)}</code></pre>
    </>
  );
}
