import { go } from "@fartlabs/go";
import { contents } from "#/lib/resources/docs.ts";
import { fromExpression } from "#/lib/playgrounds/expressions/mod.ts";
import { getMeta } from "#/lib/meta/mod.ts";
import { toPath } from "#/lib/to_path.ts";
import type { DocContentProps } from "./doc_content.tsx";
import DocContent from "./doc_content.tsx";

export default async function DocumentationPage(request: Request) {
  const url = new URL(request.url);

  // Redirect backwards-compatible paths to new paths.
  const redirectURL = go(url, {
    "jsx": "/concepts/jsx",
    "htx": "/concepts/htx",
    "rtx": "/concepts/rtx",
    "fartkit": "/concepts/fartkit",
  });
  if (url.toString() !== redirectURL.toString()) {
    return Response.redirect(redirectURL, 301);
  }

  const content = contentOf(request);
  const playground = await playgroundOf(content.playground);
  const path = toPath(url.pathname);
  return (
    <DocContent
      title={content.title}
      body={content.body}
      toc={content.toc}
      playground={playground}
      md={content.md}
      currentPath={path}
    />
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
