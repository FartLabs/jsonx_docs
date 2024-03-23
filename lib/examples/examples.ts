/**
 * readExample reads the example file and returns the content.
 */
export async function readExample(path: string | URL): Promise<string | null> {
  try {
    const text = await Deno.readTextFile(path);
    return trimJSXImportSource(text);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return null;
    }

    throw error;
  }
}

function trimJSXImportSource(code: string): string {
  const jsxImportSource = "/** @jsxImportSource @fartlabs/jsonx */\n\n";
  if (code.startsWith(jsxImportSource)) {
    return code.substring(jsxImportSource.length);
  }

  return code;
}
