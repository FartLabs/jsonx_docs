import * as esbuild from "https://esm.sh/esbuild-wasm@0.20.1";
import type { Meta } from "#/lib/docs/mod.ts";
import { transform } from "./build.ts";
import { cmEditor, createEditor } from "./editor.ts";
import { appendBuildOutput, appendConsoleOutput } from "./output.ts";
import { elements } from "./elements.ts";

/**
 * PlaygroundOptions is the options for creating a playground.
 */
export interface PlaygroundOptions {
  code: string;
  version?: string;
  autoplay?: boolean;
}

/**
 * createPlayground create a playground.
 */
export async function createPlayground(options: PlaygroundOptions) {
  // Fetch the module meta.
  await fetch("./meta")
    .then((response) => response.json())
    .then((json: Meta) => {
      // Set up version input element.
      elements.version.value = json.latest;
      json.versions.forEach((versionTag) => {
        const option = document.createElement("option");
        option.value = versionTag;
        option.textContent = `Version: ${versionTag}`;
        elements.version.append(option);
      });
    });

  // Set up default values.
  if (options.version) {
    elements.version.value = options.version;
  }

  await createEditor({
    target: elements.editor,
    code: options.code,
  });

  // Set up event listeners.
  elements.play.addEventListener("click", () => handlePlay());
  elements.clearBuildOutput.addEventListener(
    "click",
    () => (elements.buildOutput.innerHTML = ""),
  );
  elements.clearConsoleOutput.addEventListener(
    "click",
    () => (elements.consoleOutput.innerHTML = ""),
  );
  addEventListener("message", (event) => {
    if (event.data.type === "console") {
      appendConsoleOutput(
        event.data.method,
        event.data.arguments
          .map((
            arg: unknown,
          ) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
          .join(" "),
      );
    }
  });

  // Enable button interactions.
  elements.play.disabled = false;
  elements.share.disabled = false;
  elements.version.disabled = false;

  // Play the code if autoplay is enabled.
  if (options.autoplay) {
    handlePlay();
  }
}

async function handlePlay() {
  try {
    const code = cmEditor?.state?.doc?.toString();
    if (!code) {
      appendBuildOutput("error", "No code to build.");
      return;
    }

    const transformation = await transform({
      code: cmEditor.state.doc.toString(),
      version: elements.version.value,
    });
    transformation.warnings.forEach((warning: { text: string }) => {
      appendBuildOutput("warning", warning.text);
    });

    const html =
      `<script type="module">${CONSOLE_INTERCEPT}\n${transformation.code}</script>`;
    elements.result.srcdoc = html;
  } catch (error) {
    appendBuildOutput("error", error.message);
  }
}

const CONSOLE_INTERCEPT = `const _console = { ...console };
for (const key in _console) {
  if (typeof _console[key] === "function") {
    console[key] = function () {
      _console[key](...arguments);
      parent.postMessage({ type: "console", method: key, arguments: [...arguments] });
    };
  }
}
window.onerror = function (message, source, lineno, colno, error) {
  parent.postMessage({ type: "console", method: "error", arguments: [error ? error.stack : message] });
}`;

/**
 * initializePlayground initializes the playground.
 */
export async function initializePlayground() {
  // Create the playground.
  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  // Initialize esbuild.
  await esbuild.initialize({
    wasmURL: "https://esm.sh/esbuild-wasm@0.20.1/esbuild.wasm",
  });

  // Fetch the playground.
  let code;
  let version;
  try {
    if (id) {
      const playground = await fetch(`./playgrounds/${id}`).then((response) =>
        response.json()
      );
      code = playground.code;
      version = playground.version;
    }

    // Fetch default code if unset.
    if (!code) {
      code = await fetch("./examples/animals.tsx").then((response) =>
        response.text()
      );
    }
  } finally {
    await createPlayground({ code, version, autoplay: true });
  }
}
