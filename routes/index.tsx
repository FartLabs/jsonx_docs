import Playground from "#/components/playground/playground.tsx";
import { getMeta } from "#/client/meta.ts";
import { kv } from "#/server/kv/kv.ts";
import { getExampleByName } from "#/server/examples/mod.ts";
import { getPlayground } from "#/server/kv/playgrounds.ts";

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
      <h1>Meet jsonx.</h1>
      <Playground code={code} version={version} meta={meta} />
    </>
  );
}
