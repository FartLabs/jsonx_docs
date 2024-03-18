/**
 * Playground is a jsonx playground.
 */
export interface Playground {
  id: string;
  version: string;
  code: string;
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

function playgroundKey(id: string): Deno.KvKey {
  return ["playgrounds", id];
}
