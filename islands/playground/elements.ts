/**
 * elements of the playground.
 */
export const elements = {
  get version() {
    const version = document.getElementById("version") as
      | HTMLSelectElement
      | null;
    if (!version) {
      throw new Error("Version input element not found.");
    }

    return version;
  },

  get result() {
    const result = document.getElementById("result") as
      | HTMLIFrameElement
      | null;
    if (!result) {
      throw new Error("Result iframe element not found.");
    }

    return result;
  },

  get editor() {
    const editor = document.getElementById("editor") as HTMLDivElement | null;
    if (!editor) {
      throw new Error("Editor element not found.");
    }

    return editor;
  },

  get play() {
    const play = document.getElementById("play") as HTMLButtonElement | null;
    if (!play) {
      throw new Error("Play button element not found.");
    }

    return play;
  },

  get share() {
    const share = document.getElementById("share") as HTMLButtonElement | null;
    if (!share) {
      throw new Error("Share button element not found.");
    }

    return share;
  },

  get buildOutput() {
    const buildOutput = document.getElementById("buildOutput") as
      | HTMLDivElement
      | null;
    if (!buildOutput) {
      throw new Error("Build output element not found.");
    }

    return buildOutput;
  },

  get clearBuildOutput() {
    const clearBuildOutput = document.getElementById("clearBuildOutput") as
      | HTMLButtonElement
      | null;
    if (!clearBuildOutput) {
      throw new Error("Clear build output button element not found.");
    }

    return clearBuildOutput;
  },

  get consoleOutput() {
    const consoleOutput = document.getElementById("consoleOutput") as
      | HTMLDivElement
      | null;
    if (!consoleOutput) {
      throw new Error("Console output element not found.");
    }

    return consoleOutput;
  },

  get clearConsoleOutput() {
    const clearConsoleOutput = document.getElementById("clearConsoleOutput") as
      | HTMLButtonElement
      | null;
    if (!clearConsoleOutput) {
      throw new Error("Clear console output button element not found.");
    }

    return clearConsoleOutput;
  },

  get consoleDetails() {
    const consoleDetails = document.getElementById("consoleDetails") as
      | HTMLDetailsElement
      | null;
    if (!consoleDetails) {
      throw new Error("Console details element not found.");
    }

    return consoleDetails;
  },

  get buildDetails() {
    const buildDetails = document.getElementById("buildDetails") as
      | HTMLDetailsElement
      | null;
    if (!buildDetails) {
      throw new Error("Build details element not found.");
    }

    return buildDetails;
  },
};
