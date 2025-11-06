export interface CopyMarkdownButtonProps {
  md: string;
}

export default function CopyMarkdownButton(props: CopyMarkdownButtonProps) {
  return (
    <>
      <script
        id="copyMarkdownData"
        type="application/json"
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ md: props.md }) }}
      />
      <script
        type="module"
        src="/copy-markdown.js"
        defer
      />
      <button
        id="copyMarkdownButton"
        type="button"
        class="copy-markdown-button"
        disabled
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        </svg>
        <span id="copyMarkdownText">Copy Markdown</span>
      </button>
    </>
  );
}
