import { contents } from "#/lib/resources/docs.ts";
import { fromExpression } from "#/lib/playgrounds/expressions/mod.ts";
import { getMeta } from "#/lib/meta/mod.ts";
import { toPath } from "#/lib/to_path.ts";
import type { DocProps } from "#/components/doc.tsx";
import Doc from "#/components/doc.tsx";

export default async function DocumentationPage(request: Request) {
  const content = contentOf(request);
  let playground: DocProps["playground"];
  if (content.playground) {
    playground = {
      data: await fromExpression(content.playground),
      meta: await getMeta(),
    };
  }

  return <Doc html={content.html} playground={playground} />;
}

function contentOf(request: Request) {
  const url = new URL(request.url);
  const path = toPath(url.pathname).join("/");
  const content = contents.get(path);
  if (!content) {
    throw new Error(`Content not found: ${path}`);
  }

  return content;
}
