import ToC from "#/components/toc.tsx";
import type { FSItem, Node } from "#/lib/docs/mod_client.ts";

/**
 * HeaderProps are the properties for the Header component.
 */
export interface HeaderProps {
  path: string[];
  nodes: Node<FSItem>[];
}

/**
 * Header is the site header component.
 */
export default function Header(props: HeaderProps) {
  return (
    <header class="header">
      <h1>
        <a href="/">jsonx</a>
      </h1>

      <button
        type="button"
        class="nav-toggle"
        id="navToggle"
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <dialog id="navDialog" class="nav-dialog">
        <div class="nav-dialog-header">
          <h2>TABLE OF CONTENTS</h2>
          <button
            type="button"
            class="nav-dialog-close"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>
        <div class="nav-dialog-content">
          <ToC
            nodes={props.nodes}
            filter={(node) =>
              startsWith(props.path, node.name) &&
              node.name.length <= props.path.length + 1}
          />
        </div>
      </dialog>
    </header>
  );
}

function startsWith(path: string[], prefix: string[]): boolean {
  if (path.length < prefix.length) {
    return false;
  }

  for (let i = 0; i < prefix.length; i++) {
    if (path[i] !== prefix[i]) {
      return false;
    }
  }

  return true;
}
