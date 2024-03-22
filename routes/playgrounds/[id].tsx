import type { FreshContext } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Nav from "#/components/nav.tsx";
import Playground from "#/components/playground/playground.tsx";
import { getMeta } from "#/client/meta.ts";
import { getPlayground } from "#/server/kv/playgrounds.ts";
import { kv } from "#/server/kv/kv.ts";

export default async function PlaygroundHandler(
  _request: Request,
  ctx: FreshContext,
) {
  const playground = await getPlayground(kv, ctx.params.id);
  if (!playground) {
    return new Response("Not found!", { status: 404 });
  }

  const meta = await getMeta();
  return (
    <>
      <Head>
        <title>jsonx | Playground</title>
      </Head>

      <Playground
        code={playground.code}
        version={playground.version}
        meta={meta}
      />
    </>
  );
}
