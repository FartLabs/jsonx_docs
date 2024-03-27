import type { Playground } from "#/lib/playgrounds/mod.ts";

/**
 * PlaygroundAside represents the aside content of a playground page.
 */
export default function PlaygroundAside(props: { playground: Playground }) {
  return (
    <>
      <h2>On this page</h2>
      <p>
        <a href={`/p/${props.playground.id}`}>p/{props.playground.id}</a>
      </p>
      <p>
        Using jsonx version{" "}
        <a href={makeVersionURL(props.playground.version)}>
          {props.playground.version}
        </a>
      </p>
    </>
  );
}

function makeVersionURL(version: string) {
  return `https://jsr.io/@fartlabs/jsonx@${version}`;
}
