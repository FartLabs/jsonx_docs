document.addEventListener("DOMContentLoaded", () => {
  console.log("Copy markdown script loaded");

  const copyButton = document.getElementById("copyMarkdownButton");
  const copyText = document.getElementById("copyMarkdownText");
  const copyData = document.getElementById("copyMarkdownData");

  console.log("Elements found:", { copyButton, copyText, copyData });

  if (!copyButton || !copyText || !copyData) {
    console.log("Missing elements, exiting");
    return;
  }

  // Parse the markdown data
  const data = JSON.parse(copyData.innerHTML);
  console.log("Markdown data:", data);

  // Enable the button
  copyButton.disabled = false;
  console.log("Button enabled");

  // Add click event listener
  copyButton.addEventListener("click", async () => {
    try {
      // Check if clipboard API is available
      if (!navigator.clipboard) {
        console.error("Clipboard API not available");
        return;
      }

      // Write the markdown to the clipboard
      await navigator.clipboard.writeText(data.md);

      // Update button text to show success
      copyText.textContent = "Copied!";

      // Reset button text after 2 seconds
      setTimeout(() => {
        copyText.textContent = "Copy Markdown";
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  });
});
