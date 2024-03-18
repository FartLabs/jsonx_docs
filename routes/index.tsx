import { Head } from "$fresh/runtime.ts";
import PlaygroundIsland from "#/islands/playground_island.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>jsonx | Documentation</title>
        <link rel="stylesheet" href="./playground.css" />
      </Head>

      <nav>
        <a href="/">
          <h1>jsonx</h1>
        </a>

        <span class="badges">
          <a href="https://jsr.io/@fartlabs/jsonx">
            <span>API&nbsp;</span>
            <img
              class="jsr-badge"
              src="https://jsr.io/badges/@fartlabs/jsonx/score"
              alt="JSR badge"
            />
          </a>
          <a href="https://github.com/FartLabs/jsonx">
            <span>GitHub&nbsp;</span>
            <img
              class="github-badge"
              src="https://simpleicons.org/icons/github.svg"
              alt="GitHub badge"
            />
          </a>
        </span>
      </nav>

      <main>
        <PlaygroundIsland />
      </main>
    </>
  );
}
