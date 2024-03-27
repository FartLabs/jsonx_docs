/**
 * PlaygroundAside represents the aside content of a playground page.
 */
export default function PlaygroundAside(
  props: { id?: string; version: string },
) {
  return (
    <>
      <h2>On this page</h2>
      <p>
        {props.id
          ? <a href={`/p/${props.id}`}>p/{props.id}</a>
          : <em>Unsaved</em>}
      </p>
      <p>
        Using jsonx version{" "}
        <a href={makeVersionURL(props.version)}>{props.version}</a>
      </p>
    </>
  );
}

function makeVersionURL(version: string) {
  return `https://jsr.io/@fartlabs/jsonx@${version}`;
}
