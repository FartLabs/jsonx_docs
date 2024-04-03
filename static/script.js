import * as esbuild from "https://esm.sh/esbuild-wasm@0.20.1";
import * as monaco from "https://cdn.jsdelivr.net/npm/monaco-editor@0.47.0/+esm";

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

function createEditor(options) {
  // TODO: Figure out how to resolve this error.
  //
  // codicon.ttf:1
  // Failed to load resource: the server responded with a status of 500 (Internal Server Error)

  monacoEditor = monaco.editor.create(
    options.target,
    {
      theme: "vs-dark",
      fontSize: 18,
      model: monaco.editor.createModel(
        options.code,
        "typescript",
        monaco.Uri.parse("inmemory://model/main.tsx"),
      ),
      // TODO: Figure out how to paste content into the editor.
      // TODO: Figure out how to change fontFamily.
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
  elements.version.addEventListener("change", () => {
    setMonacoTSConfig(getVersion());
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
    version: elements.version.value,
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
    wasmURL: "https://esm.sh/esbuild-wasm@0.20.1/esbuild.wasm",
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
      version: elements.version.value,
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
