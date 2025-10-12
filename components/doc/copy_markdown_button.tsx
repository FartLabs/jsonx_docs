import type { Signal } from "@preact/signals";

export interface CopyMarkdownButtonProps {
  md: string;
  copied: Signal<boolean>;
}

export default function CopyMarkdownButton(props: CopyMarkdownButtonProps) {
  const copy = () => {
    // Write the markdown to the clipboard.
    navigator.clipboard.writeText(props.md);

    // Set the copied signal to true.
    props.copied.value = true;

    // Reset the copied signal after 2 seconds.
    setTimeout(() => {
      props.copied.value = false;
    }, 2000);
  };

  return (
    <button
      class="flex items-center gap-2 px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700"
      onClick={copy}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-5 h-5"
      >
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      </svg>
      <span class="font-semibold">
        {props.copied.value ? "Copied!" : "Copy Markdown"}
      </span>
    </button>
  );
}