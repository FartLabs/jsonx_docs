/**
 * getExampleByName gets an example by example name.
 */
export function getExampleByName(name: string): Promise<string> {
  return Deno.readTextFile(new URL(import.meta.resolve("./" + name)));
}
