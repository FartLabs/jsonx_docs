import { default as esbuild } from "https://esm.sh/esbuild-wasm";
import * as monaco from "https://cdn.jsdelivr.net/npm/monaco-editor/+esm";

document.addEventListener("DOMContentLoaded", () => {
  const initialData = JSON.parse(elements.initialJSONData.innerHTML);
  setup({
    code: initialData.code,
    autoplay: initialData.autoplay,
  });
});

function makeTSConfig(version) {
  return {
    jsx: "react-jsx",
    jsxFactory: "h",
    jsxFragmentFactory: "Fragment",
    jsxImportSource: `https://esm.sh/jsr/@fartlabs/jsonx@${version}`,
  };
}

async function transform(options) {
  const transformation = await esbuild.transform(options.code, {
    loader: "tsx",
    tsconfigRaw: {
      compilerOptions: makeTSConfig(options.version),
    },
  });

  return transformation;
}

let monacoEditor;

// Define custom theme to match the site's green-on-dark aesthetic
function defineCustomTheme() {
  monaco.editor.defineTheme("jsonx-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "7fee64", background: "0d180a" },
      { token: "comment", foreground: "4a7c3a", fontStyle: "italic" },
      { token: "keyword", foreground: "9fff7a", fontStyle: "bold" },
      { token: "string", foreground: "7fee64" },
      { token: "number", foreground: "9fff7a" },
      { token: "type", foreground: "7fee64" },
      { token: "class", foreground: "9fff7a" },
      { token: "function", foreground: "7fee64" },
      { token: "variable", foreground: "7fee64" },
      { token: "operator", foreground: "9fff7a" },
      { token: "delimiter", foreground: "7fee64" },
      { token: "tag", foreground: "9fff7a" },
      { token: "attribute.name", foreground: "7fee64" },
      { token: "attribute.value", foreground: "9fff7a" },
    ],
    colors: {
      "editor.background": "#0d180a",
      "editor.foreground": "#7fee64",
      "editor.lineHighlightBackground": "rgba(127, 238, 100, 0.05)",
      "editor.selectionBackground": "rgba(230, 230, 250, 0.3)",
      "editor.inactiveSelectionBackground": "rgba(230, 230, 250, 0.1)",
      "editorCursor.foreground": "#7fee64",
      "editorWhitespace.foreground": "rgba(127, 238, 100, 0.2)",
      "editorIndentGuide.background": "rgba(127, 238, 100, 0.1)",
      "editorIndentGuide.activeBackground": "rgba(127, 238, 100, 0.2)",
      "editorLineNumber.foreground": "rgba(127, 238, 100, 0.5)",
      "editorLineNumber.activeForeground": "#7fee64",
      "editorLineNumber.errorForeground": "rgba(127, 238, 100, 0.5)",
      "editorLineNumber.warningForeground": "rgba(127, 238, 100, 0.5)",
      "editorGutter.background": "#0d180a",
      "editorBracketMatch.background": "rgba(230, 230, 250, 0.15)",
      "editorBracketMatch.border": "rgba(230, 230, 250, 0.6)",
      "editorBracketHighlight.foreground1": "#e6e6fa",
      "editorBracketHighlight.foreground2": "#dda0dd",
      "editorBracketHighlight.foreground3": "#ba55d3",
      "editorBracketHighlight.foreground4": "#9370db",
      "editorBracketHighlight.foreground5": "#8a2be2",
      "editorBracketHighlight.foreground6": "#7b68ee",
      "editorBracketPairGuide.activeBackground1": "rgba(230, 230, 250, 0.3)",
      "editorBracketPairGuide.activeBackground2": "rgba(221, 160, 221, 0.3)",
      "editorBracketPairGuide.activeBackground3": "rgba(186, 85, 211, 0.3)",
      "editorBracketPairGuide.activeBackground4": "rgba(147, 112, 219, 0.3)",
      "editorBracketPairGuide.activeBackground5": "rgba(138, 43, 226, 0.3)",
      "editorBracketPairGuide.activeBackground6": "rgba(123, 104, 238, 0.3)",
      "editorBracketPairGuide.background1": "rgba(230, 230, 250, 0.15)",
      "editorBracketPairGuide.background2": "rgba(221, 160, 221, 0.15)",
      "editorBracketPairGuide.background3": "rgba(186, 85, 211, 0.15)",
      "editorBracketPairGuide.background4": "rgba(147, 112, 219, 0.15)",
      "editorBracketPairGuide.background5": "rgba(138, 43, 226, 0.15)",
      "editorBracketPairGuide.background6": "rgba(123, 104, 238, 0.15)",
      "editorWidget.background": "rgba(13, 24, 10, 0.95)",
      "editorWidget.border": "rgba(127, 238, 100, 0.2)",
      "editorSuggestWidget.background": "rgba(13, 24, 10, 0.95)",
      "editorSuggestWidget.border": "rgba(127, 238, 100, 0.2)",
      "editorSuggestWidget.foreground": "#7fee64",
      "editorSuggestWidget.selectedBackground": "rgba(127, 238, 100, 0.1)",
      "editorHoverWidget.background": "rgba(13, 24, 10, 0.95)",
      "editorHoverWidget.border": "rgba(127, 238, 100, 0.2)",
      "editorError.foreground": "#d4a574",
      "editorError.border": "rgba(212, 165, 116, 0.4)",
      "editorWarning.foreground": "#d4a574",
      "editorWarning.border": "rgba(212, 165, 116, 0.3)",
      "scrollbarSlider.background": "rgba(127, 238, 100, 0.35)",
      "scrollbarSlider.hoverBackground": "rgba(127, 238, 100, 0.55)",
      "scrollbarSlider.activeBackground": "rgba(127, 238, 100, 0.7)",
    },
  });
}

function createEditor(options) {
  // Define the custom theme before creating the editor
  defineCustomTheme();

  monacoEditor = monaco.editor.create(
    options.target,
    {
      theme: "jsonx-dark",
      fontSize: 18,
      fontFamily: "Fira Code",
      model: monaco.editor.createModel(
        options.code,
        "typescript",
        monaco.Uri.parse("inmemory://model/main.tsx"),
      ),
    },
  );

  function handleResize() {
    // Make the editor as small as possible.
    monacoEditor.layout({ width: 0, height: 0 });

    // Wait for last layout shift to complete.
    requestAnimationFrame(() => {
      const rect = elements.editor.parentElement.getBoundingClientRect();
      monacoEditor.layout({ width: rect.width, height: rect.height });
    });
  }

  // Set up event listeners.
  globalThis.addEventListener("resize", handleResize);
  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(elements.editor);
  let isChanged = false;
  monacoEditor.getModel().onDidChangeContent(() => {
    if (!isChanged) {
      globalThis.onbeforeunload = () => {
        return "";
      };

      isChanged = true;
    }
  });
}

function sharePlayground() {
  if (
    !confirm(
      "Are you sure you want to share this playground?\nPlaygrounds cannot be searched or deleted at a later time.",
    )
  ) {
    return;
  }

  const data = {
    code: getEditorCode(),
    version: getVersion(),
  };

  elements.share.disabled = true;
  fetch(
    `/api/playgrounds`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data.id) {
        throw new Error("Failed to create a new playground.");
      }

      location.href = `/p/${data.id}`;
    })
    .finally(() => {
      elements.share.disabled = false;
    });
}

/**
 * setup create a playground.
 */
async function setup(options) {
  const esbuildInitPromise = esbuild.initialize({
    wasmURL: "https://esm.sh/esbuild-wasm/esbuild.wasm",
  });
  await createEditor({
    target: elements.editor,
    code: options.code,
  });

  // Set up event listeners.
  elements.play.addEventListener("click", () => handlePlay());
  elements.clearConsoleOutput.addEventListener(
    "click",
    () => (consoleOutput.innerHTML = ""),
  );
  elements.share.addEventListener("click", () => {
    sharePlayground();
  });
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

  // Initialize esbuild.
  await esbuildInitPromise;

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
    const code = getEditorCode();
    if (!code) {
      logBuildOutput("error", "No code to build.");
      return;
    }

    const transformation = await transform({
      code,
      version: getVersion(),
    });
    transformation.warnings.forEach((warning) => {
      logBuildOutput("warning", warning.text);
    });

    const html =
      `<script type="module">${CONSOLE_INTERCEPT}\n${transformation.code}</script>`;
    result.srcdoc = html;
  } catch (error) {
    logBuildOutput("error", error.message);
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

function logBuildOutput(type, message) {
  alert(`[${type.toUpperCase()}] ${message}`);
}

function appendConsoleOutput(type, message) {
  const li = document.createElement("li");
  li.innerHTML = `${renderPrefix(type)}${message}`;
  elements.consoleOutput.append(li);
  if (!elements.consoleDetails.open) {
    elements.consoleDetails.open = true;
  }
}

function getEditorCode() {
  return monacoEditor.getModel().getValue();
}

function getVersion() {
  return elements.version.value;
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

  get initialJSONData() {
    const initialJSONData = document.getElementById("initialJSONData");
    if (!initialJSONData) {
      throw new Error("Initial JSON data element not found.");
    }

    return initialJSONData;
  },
};
