// Source: https://www.roboleary.net/2022/01/13/copy-code-to-clipboard-blog.html
//
const copyButtonLabel = "Copy Code";
const copiedButtonLabel = "Code Copied";

// use a class selector if available
const blocks = document.querySelectorAll("pre");

blocks.forEach((block) => {
  // only add button if browser supports Clipboard API
  if (navigator.clipboard) {
    const button = document.createElement("button");

    button.innerText = copyButtonLabel;
    block.appendChild(button);

    button.addEventListener("click", async () => {
      await copyCode(block, button);
    });
  }
});

async function copyCode(block, button) {
  const code = block.querySelector("code");
  const text = code.innerText;
  await navigator.clipboard.writeText(text)
    .then(() => {
      // visual feedback that task is completed
      button.innerText = copiedButtonLabel;

      setTimeout(() => {
        button.innerText = copyButtonLabel;
      }, 1e3);
    });
}
