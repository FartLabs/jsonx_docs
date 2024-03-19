export interface PlaygroundScriptsProps {
  code: string;
  autoplay?: boolean;
}

export default function PlaygroundScripts(props: PlaygroundScriptsProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `${
          initializeData(props)
        }<script type="module" src="/script.js" defer></script>`,
      }}
    >
    </div>
  );
}

function initializeData(props: PlaygroundScriptsProps) {
  return `<script id="initialJSONData" type="application/json">${
    JSON.stringify(props)
  }</script>`;
}
