import { Head } from "$fresh/runtime.ts";
import PlaygroundIsland from "#/islands/playground/playground_island.tsx";
import Nav from "#/client/nav.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>jsonx | Documentation</title>
        <link rel="stylesheet" href="./playground.css" />
      </Head>

      <Nav />

      <main>
        <PlaygroundIsland />
      </main>
    </>
  );
}
