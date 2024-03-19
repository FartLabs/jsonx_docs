/**
 * getExampleByName gets an example by example name.
 */
export async function getExampleByName(name: string): Promise<string> {
  const text = await Deno.readTextFile(
    new URL(import.meta.resolve("./" + name)),
  );
  return trimJSXImportSource(text);
}

function trimJSXImportSource(code: string): string {
  const jsxImportSource = "/** @jsxImportSource @fartlabs/jsonx */\n\n";
  if (code.startsWith(jsxImportSource)) {
    return code.substring(jsxImportSource.length);
  }

  return code;
}
