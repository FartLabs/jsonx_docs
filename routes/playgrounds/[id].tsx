import type { FreshContext, RouteConfig } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getMeta } from "#/lib/meta/meta.ts";
import { getPlayground } from "#/lib/playgrounds/deno_kv/mod.ts";
import { kv } from "#/lib/resources/kv.ts";
import { defaultExample } from "#/lib/resources/examples.ts";
import PlaygroundAside from "#/components/playground_aside.tsx";
import Playground from "#/components/playground/playground.tsx";
import { parse } from "$std/path/parse.ts";
import { parsePlaygroundExampleExpression } from "#/lib/playgrounds/expressions/mod.ts";
import { readExample } from "#/lib/examples/mod.ts";

export const config: RouteConfig = {
  routeOverride: "/(p|playgrounds){/:id}?",
};

export default async function PlaygroundHandler(
  _request: Request,
  ctx: FreshContext,
) {
  const meta = await getMeta();
  let code = defaultExample;
  let version = meta.latest;
  if (ctx.params.id) {
    const exampleName = parsePlaygroundExampleExpression(ctx.params.id);
    if (exampleName) {
      const example = await readExample(`./examples/${exampleName}`);
      if (!example) {
        return new Response("Not found!", { status: 404 });
      }

      code = example;
    } else {
      const playground = await getPlayground(kv, ctx.params.id);
      if (!playground) {
        return new Response("Not found!", { status: 404 });
      }

      code = playground.code;
      version = playground.version;
    }
  }

  return (
    <>
      <Head>
        <title>jsonx | Playground</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <aside class="aside">
        <PlaygroundAside id={ctx.params.id} version={version} />
      </aside>

      <main class="main">
        <Playground code={code} version={version} meta={meta} />
      </main>
    </>
  );
}
