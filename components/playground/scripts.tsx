export interface PlaygroundScriptsProps {
  code: string;
  autoplay?: boolean;
}

export default function PlaygroundScripts(props: PlaygroundScriptsProps) {
  return (
    <>
      <script id="initialJSONData" type="application/json">
        {JSON.stringify(props)}
      </script>
      <script
        type="module"
        src="/script.js"
        defer
      />
    </>
  );
}
