/// <reference lib="deno.unstable" />

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
 * AddPlaygroundRequest is the request to add a playground.
 */
export type AddPlaygroundRequest = Omit<Playground, "id">;

/**
 * addPlayground adds a new playground.
 */
export async function addPlayground(
  kv: Deno.Kv,
  request: AddPlaygroundRequest,
): Promise<Playground> {
  const id = crypto.randomUUID();
  const playground = { ...request, id };
  const result = await kv.set(playgroundKey(id), playground);
  if (!result) {
    throw new Error("Failed to add playground!");
  }

  return playground;
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
