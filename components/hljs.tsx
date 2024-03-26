/**
 * Hljs is a component that loads the highlight.js styles.
 */
export default function Hljs(props: { id: string }) {
  return (
    <>
      <link
        rel="stylesheet"
        href={`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${props.id}.min.css`}
      />
    </>
  );
}
