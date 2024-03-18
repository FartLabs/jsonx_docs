import { elements } from "./elements.ts";

const COLOR = {
  log: "dodgerblue",
  warn: "yellow",
  error: "red",
  info: "lime",
  table: "lavender",
} as const;

function color(type: string) {
  return COLOR[type.toLowerCase() as keyof typeof COLOR] ?? COLOR["log"];
}

export function renderPrefix(type: string) {
  const timestamp = new Date().toISOString();
  return `${timestamp} <strong style="color: ${
    color(type)
  }">[${type.toUpperCase()}]</strong> `;
}

export function appendBuildOutput(type: string, message: string) {
  const li = document.createElement("li");
  li.innerHTML = `${renderPrefix(type)}${message}`;
  elements.buildOutput.append(li);
  if (!elements.buildDetails.open) {
    elements.buildDetails.open = true;
  }
}

export function appendConsoleOutput(type: string, message: string) {
  const li = document.createElement("li");
  li.innerHTML = `${renderPrefix(type)}${message}`;
  elements.consoleOutput.append(li);
  if (!elements.consoleDetails.open) {
    elements.consoleDetails.open = true;
  }
}
