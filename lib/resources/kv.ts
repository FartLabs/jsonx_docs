/// <reference lib="deno.unstable" />

import { getEnv, type KvNamespace } from "#/lib/resources/env.ts";

/**
 * KvStore is the subset of the Deno KV API that playground storage uses.
 *
 * It is backed by a Workers KV namespace (the `PLAYGROUNDS` binding) on Cloudflare Workers, and by Deno KV
 * when running locally under Deno.
 */
export interface KvStore {
  get<T>(key: readonly string[]): Promise<{ value: T | null }>;
  set(key: readonly string[], value: unknown): Promise<unknown>;
}

function fromWorkersKv(namespace: KvNamespace): KvStore {
  return {
    async get<T>(key: readonly string[]) {
      return {
        value: (await namespace.get(key.join("/"), "json")) as T | null,
      };
    },
    async set(key: readonly string[], value: unknown) {
      await namespace.put(key.join("/"), JSON.stringify(value));
      return { ok: true };
    },
  };
}

let denoKv: Promise<Deno.Kv> | undefined;

function fromDenoKv(): KvStore {
  denoKv ??= Deno.openKv();
  return {
    async get<T>(key: readonly string[]) {
      return { value: (await (await denoKv!).get<T>(key)).value };
    },
    async set(key: readonly string[], value: unknown) {
      return await (await denoKv!).set(key, value);
    },
  };
}

/**
 * kv is the playground store. The backend is chosen on each call, because Worker bindings arrive per request.
 */
export const kv: KvStore = {
  get: (key) => {
    const namespace = getEnv()?.PLAYGROUNDS;
    return (namespace ? fromWorkersKv(namespace) : fromDenoKv()).get(key);
  },
  set: (key, value) => {
    const namespace = getEnv()?.PLAYGROUNDS;
    return (namespace ? fromWorkersKv(namespace) : fromDenoKv()).set(
      key,
      value,
    );
  },
};
