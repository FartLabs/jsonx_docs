import examples from "#/generated/examples.json" with { type: "json" };

/**
 * readExample returns the example code for a path such as `./examples/01_animals.tsx`.
 *
 * Examples are read from the generated bundle (see `codegen/generate.ts`) so this works without a file system.
 */
export function readExample(path: string | URL): Promise<string | null> {
  const code = (examples as Record<string, string>)[String(path)];
  return Promise.resolve(code ?? null);
}
