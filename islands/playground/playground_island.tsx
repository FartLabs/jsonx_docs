import type { Meta } from "#/client/meta.ts";
import PlaygroundScript from "./playground_script.tsx";

export interface PlaygroundProps {
  code: string;
  meta: Meta;
  version?: string;
  autoplay?: boolean;
}

export default function PlaygroundIsland(props: PlaygroundProps) {
  return (
    <>
      <PlaygroundScript autoplay={props.autoplay} code={props.code} />
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

      {/* <!-- TODO: Consider sending build logs to console element. --> */}
      <details id="buildDetails">
        <summary>
          <span>Build logs</span>
          <button id="clearBuildOutput">Clear</button>
        </summary>
        <ul id="buildOutput"></ul>
      </details>

      {/* <!-- TODO: Consider hiding iframe entirely. --> */}
      <details id="resultDetails">
        <summary>
          <span>Result</span>
          <span>
            <button id="refresh" disabled>Refresh</button>
          </span>
        </summary>
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
      </details>
    </>
  );
}
