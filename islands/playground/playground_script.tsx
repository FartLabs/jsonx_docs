export interface PlaygroundScriptProps {
  code: string;
  autoplay?: boolean;
}

export default function PlaygroundScript(props: PlaygroundScriptProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `${
          initializeConstants(props)
        }<script type="module" src="/script.js" defer></script>`,
      }}
    >
    </div>
  );
}

function initializeConstants(props: PlaygroundScriptProps) {
  return Object.keys(props).map((key) => {
    return `const INITIAL_${key.toUpperCase()} = ${
      JSON.stringify(props[key as keyof PlaygroundScriptProps])
    };`;
  }).join();
}
