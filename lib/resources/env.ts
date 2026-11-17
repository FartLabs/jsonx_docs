/**
 * KvNamespace is the subset of a Cloudflare Workers KV namespace that the server uses.
 */
export interface KvNamespace {
  get(key: string, type: "json"): Promise<unknown>;
  put(key: string, value: string): Promise<void>;
}

/**
 * Env is the set of bindings that Cloudflare passes to the Worker.
 */
export interface Env {
  PLAYGROUNDS?: KvNamespace;
}

/**
 * ENV_KEY is the global that `worker.ts` stores the bindings on. The Worker entrypoint and the bundled Fresh server
 * are separate modules, so they share the bindings through `globalThis`.
 */
export const ENV_KEY = "__jsonxEnv";

/**
 * getEnv returns the Worker bindings, or undefined when not running on Cloudflare Workers.
 */
export function getEnv(): Env | undefined {
  return (globalThis as unknown as Record<string, Env | undefined>)[ENV_KEY];
}
