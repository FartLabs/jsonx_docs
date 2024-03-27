import { Head } from "$fresh/runtime.ts";
import type { Meta } from "#/lib/meta/mod.ts";
import PlaygroundScripts from "./scripts.tsx";

export interface PlaygroundProps {
  code: string;
  meta: Meta;
  version?: string;
  autoplay?: boolean;
}

export default function Playground(props: PlaygroundProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/playground.css" />
      </Head>
      <PlaygroundScripts autoplay={props.autoplay ?? true} code={props.code} />
      <details id="codeDetails" open>
        <summary>
          <span>TSX</span>
          <span>
            <select
              id="version"
              disabled
              value={props.version ?? props.meta.latest}
            >
              {props.meta.versions.map((version) => (
                <option value={version}>{`Version: ${version}`}</option>
              ))}
            </select>
            <button id="play" disabled>Play</button>
            <button id="share" disabled>Share</button>
          </span>
        </summary>

        <div id="editor"></div>
      </details>

      <details id="consoleDetails" open>
        <summary>
          <span>Console</span>
          <button id="clearConsoleOutput">Clear</button>
        </summary>
        <ul id="consoleOutput"></ul>
      </details>

      <iframe
        id="result"
        name="jsonx"
        title="jsonx playground"
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation"
        allow="accelerometer *; camera *; encrypted-media *; display-capture *; geolocation *; gyroscope *; microphone *; midi *; clipboard-read *; clipboard-write *; web-share *; serial *; xr-spatial-tracking *"
        scrolling="auto"
        allowTransparency={true}
        allowFullScreen={true}
        loading="lazy"
        spellCheck={false}
      >
      </iframe>
    </>
  );
}
