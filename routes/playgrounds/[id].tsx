import type { FreshContext, RouteConfig } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Playground from "#/components/playground/playground.tsx";
import { getMeta } from "#/lib/meta/meta.ts";
import { getPlayground } from "#/lib/playgrounds/deno_kv/mod.ts";
import { kv } from "#/lib/resources/kv.ts";
import PlaygroundAside from "#/components/playground_aside.tsx";

export const config: RouteConfig = {
  routeOverride: "/(p|playgrounds)/:id",
};

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
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <aside class="aside">
        <PlaygroundAside playground={playground} />
      </aside>

      <main class="main">
        <Playground
          code={playground.code}
          version={playground.version}
          meta={meta}
        />
      </main>
    </>
  );
}
