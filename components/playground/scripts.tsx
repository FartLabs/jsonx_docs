export interface PlaygroundScriptsProps {
  code: string;
  autoplay?: boolean;
}

export default function PlaygroundScripts(props: PlaygroundScriptsProps) {
  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/ace-builds@1.32.8/src-min-noconflict/ace.js">
      </script>
      <script src="https://cdn.jsdelivr.net/npm/ace-builds@1.32.8/src-min-noconflict/theme-chrome.min.js">
      </script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/ace-builds@1.32.8/css/ace.min.css"
      >
      </link>
      <script
        id="initialJSONData"
        type="application/json"
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
