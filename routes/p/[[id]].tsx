import type { PageProps } from "fresh";
import { getMeta } from "#/lib/meta/meta.ts";
import { getPlayground } from "#/lib/playgrounds/deno_kv/mod.ts";
import { kv } from "#/lib/resources/kv.ts";
import { defaultExample } from "#/lib/resources/examples.ts";
import PlaygroundAside from "#/components/playground_aside.tsx";
import Playground from "#/components/playground/playground.tsx";
import { parsePlaygroundExampleExpression } from "#/lib/playgrounds/expressions/mod.ts";
import { readExample } from "#/lib/examples/mod.ts";

export default async function PlaygroundHandler(
  props: PageProps,
) {
  const meta = await getMeta();
  let code = defaultExample;
  let version = meta.latest;
  if (props.params.id) {
    const exampleName = parsePlaygroundExampleExpression(props.params.id);
    if (exampleName) {
      const example = await readExample(`./examples/${exampleName}`);
      if (!example) {
        return new Response("Not found!", { status: 404 });
      }

      code = example;
    } else {
      const playground = await getPlayground(kv, props.params.id);
      if (!playground) {
        return new Response("Not found!", { status: 404 });
      }

      code = playground.code;
      version = playground.version;
    }
  }

  const pageTitle = "jsonx | Playground";
  return (
    <>
      <head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content="Edit and run jsonx code in your browser."
        />
        <meta name="robots" content="noindex, nofollow" />
      </head>

      <aside class="aside">
        <PlaygroundAside id={props.params.id} version={version} />
      </aside>

      <main class="main">
        <Playground code={code} version={version} meta={meta} />
      </main>
    </>
  );
}
