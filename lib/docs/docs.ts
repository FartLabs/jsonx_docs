import { compare, greaterThan, parse } from "@std/semver";

/**
 * Playground is a jsonx playground.
 */
export interface Playground {
  id: string;
  version: string;
  code: string;
}

/**
 * Meta is the module metadata.
 */
export interface Meta {
  latest: string;
  versions: string[];
}

/**
 * getPlayground gets a playground by ID.
 */
export async function getPlayground(
  kv: Deno.Kv,
  id: string,
): Promise<Playground | null> {
  const result = await kv.get<Playground>(playgroundKey(id));
  return result.value;
}

/**
 * setPlayground sets a playground by ID.
 */
export async function setPlayground(
  kv: Deno.Kv,
  playground: Playground,
): Promise<void> {
  const result = await kv.set(playgroundKey(playground.id), playground);
  if (!result) {
    throw new Error("Failed to set playground!");
  }
}

/**
 * getMeta gets the latest module metadata.
 */
export function getMeta(): Promise<Meta> {
  return fetch("https://jsr.io/@fartlabs/jsonx/meta.json")
    .then((response) => response.json())
    .then((meta) => playgroundMeta(meta));
}

function playgroundMeta({ latest, versions }: {
  latest: string;
  versions: Record<string, unknown>;
}): Meta {
  // https://github.com/FartLabs/jsonx/issues/13
  const minCompatible = parse("0.0.8");
  return {
    latest: latest,
    versions: Object.keys(versions)
      .filter((versionTag) => greaterThan(parse(versionTag), minCompatible))
      .sort((a, b) => compare(parse(b), parse(a))),
  };
}

function playgroundKey(id: string): Deno.KvKey {
  return ["playgrounds", id];
}
