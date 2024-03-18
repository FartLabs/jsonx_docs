import { Head } from "$fresh/runtime.ts";
import PlaygroundIsland from "#/islands/playground/playground_island.tsx";
import Nav from "#/client/nav.tsx";
import { kv } from "#/server/kv.ts";
import { getExampleByName } from "#/server/examples/mod.ts";
import { getPlayground } from "#/server/playgrounds.ts";
import { getMeta } from "#/client/meta.ts";

export default async function Home(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let code = "";
  let version: string | undefined = undefined;
  if (id) {
    const playground = await getPlayground(kv, id);
    if (!playground) {
      throw new Error("Playground not found!");
    }

    code = playground.code;
    version = playground.version;
  } else {
    code = await getExampleByName("01_animals.tsx");
  }

  const meta = await getMeta();

  return (
    <>
      <Head>
        <title>jsonx | Documentation</title>
        <link rel="stylesheet" href="/playground.css" />
      </Head>

      <Nav />

      <main>
        <PlaygroundIsland code={code} version={version} meta={meta} />
      </main>
    </>
  );
}
