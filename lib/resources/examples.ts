import { readExample } from "#/lib/examples/examples.ts";

export const defaultExample = (await readExample("./examples/01_animals.tsx"))!;
