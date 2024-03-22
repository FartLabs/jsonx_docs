/// <reference lib="deno.unstable" />

import { ulid } from "@std/ulid";
import type { AddPlaygroundRequest, Playground } from "#/client/playgrounds.ts";

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
 * addPlayground adds a new playground.
 */
export async function addPlayground(
  kv: Deno.Kv,
  request: AddPlaygroundRequest,
): Promise<Playground> {
  const id = ulid();
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

// TODO: Add list recent playgrounds.

function playgroundKey(id: string): Deno.KvKey {
  return ["playgrounds", id];
}
