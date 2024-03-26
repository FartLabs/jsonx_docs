import { contents } from "#/lib/resources/docs.ts";
import { fromExpression } from "#/lib/playgrounds/expressions/mod.ts";
import { getMeta } from "#/lib/meta/mod.ts";
import { toPath } from "#/lib/to_path.ts";
import type { DocContentProps } from "./doc_content.tsx";
import DocContent from "./doc_content.tsx";

export default async function DocumentationPage(request: Request) {
  const content = contentOf(request);
  const playground = await playgroundOf(content.playground);
  return (
    <DocContent body={content.body} toc={content.toc} playground={playground} />
  );
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

async function playgroundOf(expression?: string) {
  let playground: DocContentProps["playground"];
  if (expression) {
    playground = {
      data: await fromExpression(expression),
      meta: await getMeta(),
    };
  }

  return playground;
}
