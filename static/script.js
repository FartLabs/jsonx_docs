import * as esbuild from "https://esm.sh/esbuild-wasm@0.20.1";
import {
  EditorView,
  keymap,
  lineNumbers,
} from "https://esm.sh/@codemirror/view@6.0.1";
import { defaultKeymap } from "https://esm.sh/@codemirror/commands@6.0.1";

document.addEventListener("DOMContentLoaded", () => {
  const initialData = JSON.parse(elements.initialJSONData.innerHTML);
  setup({
    code: initialData.code,
    autoplay: initialData.autoplay,
  })
});

async function transform(options) {
  const transformation = await esbuild.transform(options.code, {
    loader: "tsx",
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        jsxFactory: "h",
        jsxFragmentFactory: "Fragment",
        jsxImportSource:
          `https://esm.sh/jsr/@fartlabs/jsonx@${options.version}`,
      },
    },
  });

  return transformation;
}

let cmEditor;

function createEditor(options) {
  cmEditor = new EditorView({
    doc: options.code,
    parent: options.target,
    extensions: [keymap.of(defaultKeymap), lineNumbers()],
  });
}

/**
 * setup create a playground.
 */
async function setup(options) {
  // Initialize esbuild.
  await esbuild.initialize({
    wasmURL: "https://esm.sh/esbuild-wasm@0.20.1/esbuild.wasm",
  });

  await createEditor({
    target: elements.editor,
    code: options.code,
  });

  // Set up event listeners.
  elements.play.addEventListener("click", () => handlePlay());
  elements.clearBuildOutput.addEventListener(
    "click",
    () => (buildOutput.innerHTML = ""),
  );
  elements. clearConsoleOutput.addEventListener(
    "click",
    () => (consoleOutput.innerHTML = ""),
  );
  addEventListener("message", (event) => {
    if (event.data.type === "console") {
      appendConsoleOutput(
        event.data.method,
        event.data.arguments
          .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
          .join(" "),
      );
    }
  });

  // Enable button interactions.
  play.disabled = false;
  share.disabled = false;
  version.disabled = false;

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
    transformation.warnings.forEach((warning) => {
      appendBuildOutput("warning", warning.text);
    });

    const html =
      `<script type="module">${CONSOLE_INTERCEPT}\n${transformation.code}</script>`;
    result.srcdoc = html;
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

const COLOR = {
  log: "dodgerblue",
  warn: "yellow",
  error: "red",
  info: "lime",
  table: "lavender",
};

function color(type) {
  return COLOR[type.toLowerCase()] || COLOR["log"];
}

function renderPrefix(type) {
  const timestamp = new Date().toISOString();
  return `${timestamp} <strong style="color: ${
    color(type)
  }">[${type.toUpperCase()}]</strong> `;
}

function appendBuildOutput(type, message) {
  const li = document.createElement("li");
  li.innerHTML = `${renderPrefix(type)}${message}`;
  elements.buildOutput.append(li);
  if (!elements.buildDetails.open) {
    elements.buildDetails.open = true;
  }
}

function appendConsoleOutput(type, message) {
  const li = document.createElement("li");
  li.innerHTML = `${renderPrefix(type)}${message}`;
  elements.consoleOutput.append(li);
  if (!elements.consoleDetails.open) {
    elements.consoleDetails.open = true;
  }
}

/**
 * elements of the playground.
 */
export const elements = {
  get version() {
    const version = document.getElementById("version");
    if (!version) {
      throw new Error("Version input element not found.");
    }

    return version;
  },

  get result() {
    const result = document.getElementById("result");
    if (!result) {
      throw new Error("Result iframe element not found.");
    }

    return result;
  },

  get editor() {
    const editor = document.getElementById("editor");
    if (!editor) {
      throw new Error("Editor element not found.");
    }

    return editor;
  },

  get play() {
    const play = document.getElementById("play");
    if (!play) {
      throw new Error("Play button element not found.");
    }

    return play;
  },

  get share() {
    const share = document.getElementById("share");
    if (!share) {
      throw new Error("Share button element not found.");
    }

    return share;
  },

  get buildOutput() {
    const buildOutput = document.getElementById("buildOutput");
    if (!buildOutput) {
      throw new Error("Build output element not found.");
    }

    return buildOutput;
  },

  get clearBuildOutput() {
    const clearBuildOutput = document.getElementById("clearBuildOutput");
    if (!clearBuildOutput) {
      throw new Error("Clear build output button element not found.");
    }

    return clearBuildOutput;
  },

  get consoleOutput() {
    const consoleOutput = document.getElementById("consoleOutput");
    if (!consoleOutput) {
      throw new Error("Console output element not found.");
    }

    return consoleOutput;
  },

  get clearConsoleOutput() {
    const clearConsoleOutput = document.getElementById("clearConsoleOutput");
    if (!clearConsoleOutput) {
      throw new Error("Clear console output button element not found.");
    }

    return clearConsoleOutput;
  },

  get consoleDetails() {
    const consoleDetails = document.getElementById("consoleDetails");
    if (!consoleDetails) {
      throw new Error("Console details element not found.");
    }

    return consoleDetails;
  },

  get buildDetails() {
    const buildDetails = document.getElementById("buildDetails");
    if (!buildDetails) {
      throw new Error("Build details element not found.");
    }

    return buildDetails;
  },

  get initialJSONData() {
    const initialJSONData = document.getElementById("initialJSONData");
    if (!initialJSONData) {
      throw new Error("Initial JSON data element not found.");
    }

    return initialJSONData;
  }
};

