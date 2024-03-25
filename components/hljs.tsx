/**
 * Hljs is a component that loads the highlight.js library and styles.
 */
export default function Hljs() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js">
      </script>

      <script dangerouslySetInnerHTML={{ __html: "hljs.highlightAll();" }}>
      </script>
    </>
  );
}
