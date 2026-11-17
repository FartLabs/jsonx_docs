import server from "./_fresh/server/server-entry.mjs";

/**
 * Cloudflare Workers entrypoint for jsonx.fart.tools.
 *
 * `deno task build` produces `_fresh/`. Its `client/` directory is uploaded as static assets, which are served
 * before the Worker runs, and this Worker handles everything else with the Fresh server.
 *
 * The bindings are stored on `globalThis` under the same key as `lib/resources/env.ts`, because this file is bundled
 * separately from the Fresh server.
 */
export default {
  fetch(request: Request, env: unknown): Promise<Response> | Response {
    (globalThis as unknown as Record<string, unknown>)["__jsonxEnv"] = env;
    return server.fetch(request);
  },
};
