import { contents } from "#/lib/resources/docs.ts";
import Doc from "#/components/doc/doc.tsx";
import { getMeta } from "#/lib/meta/mod.ts";

export default async function Home(_request: Request) {
  const html = contents.get("")!.html;
  const meta = await getMeta();
  return <Doc html={html} meta={meta} />;
}
