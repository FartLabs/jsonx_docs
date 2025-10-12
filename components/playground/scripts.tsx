export interface PlaygroundScriptsProps {
  code: string;
  autoplay?: boolean;
}

export default function PlaygroundScripts(props: PlaygroundScriptsProps) {
  return (
    <>
      <script
        id="initialJSONData"
        type="application/json"
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(props) }}
      >
      </script>
      <script
        type="module"
        src="/script.js"
        defer
      />
    </>
  );
}
