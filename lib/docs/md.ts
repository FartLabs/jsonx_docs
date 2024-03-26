import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

/**
 * renderer is the markdown renderer used for rendering markdown content.
 *
 * @see
 * https://github.com/markdown-it/markdown-it/blob/0fe7ccb4b7f30236fb05f623be6924961d296d3d/README.md?plain=1#L154
 */
export const renderer: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(content, lang) {
    const html = lang && hljs.getLanguage(lang)
      ? hljs.highlight(
        content,
        { language: lang, ignoreIllegals: true },
      ).value
      : renderer.utils.escapeHtml(content);
    return `<pre><code class="hljs">${html}</code></pre>`;
  },
});
