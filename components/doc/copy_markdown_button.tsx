import type { Signal } from "@preact/signals";

export interface CopyMarkdownButtonProps {
  md: string;
  copied: Signal<boolean>;
}

export default function CopyMarkdownButton(props: CopyMarkdownButtonProps) {
  const copy = async (event: Event) => {
    event.preventDefault();

    console.log("Copy button clicked, markdown length:", props.md.length);

    try {
      // Check if clipboard API is available
      if (!navigator.clipboard) {
        console.error("Clipboard API not available");
        return;
      }

      // Write the markdown to the clipboard.
      await navigator.clipboard.writeText(props.md);
      console.log("Successfully copied to clipboard");

      // Set the copied signal to true.
      props.copied.value = true;

      // Reset the copied signal after 2 seconds.
      setTimeout(() => {
        props.copied.value = false;
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <button
      type="button"
      class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
      onClick={copy}
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
        class="w-4 h-4"
      >
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      </svg>
      <span>
        {props.copied.value ? "Copied!" : "Copy Markdown"}
      </span>
    </button>
  );
}
