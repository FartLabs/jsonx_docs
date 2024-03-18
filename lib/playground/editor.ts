import { defaultKeymap, EditorView, keymap, lineNumbers } from "./deps.ts";

export let cmEditor: EditorView;

/**
 * EditorOptions are the options for creating an editor.
 */
export interface EditorOptions {
  code: string;
  target: HTMLElement;
}

/**
 * createEditor creates an editor.
 */
export function createEditor(options: EditorOptions) {
  cmEditor = new EditorView({
    doc: options.code,
    parent: options.target,
    // deno-lint-ignore no-explicit-any
    extensions: [keymap.of(defaultKeymap as any), lineNumbers()],
  });
}
