/**
 * trimJSXImportSource removes the JSX import source pragma from example code.
 */
export function trimJSXImportSource(code: string): string {
  const jsxImportSource = "/** @jsxImportSource @fartlabs/jsonx */\n\n";
  if (code.startsWith(jsxImportSource)) {
    return code.substring(jsxImportSource.length);
  }

  return code;
}
