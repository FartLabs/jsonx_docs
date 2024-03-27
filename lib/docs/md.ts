import MarkdownIt from "markdown-it";
import anchorPlugin from "markdown-it-anchor";
import tocDoneRightPlugin from "markdown-it-toc-done-right";
import hljs from "highlight.js";

/**
 * renderMd renders markdown content.
 */
export function renderMd(md: string): RenderMdResult {
  const rendered = renderer.render(`[[toc]]\n<!-- toc -->\n${md}`);
  const [toc, body] = rendered.split("<!-- toc -->");
  return { body, toc };
}

/**
 * RenderMdResult represents the result of rendering markdown content.
 */
export interface RenderMdResult {
  body: string;
  toc: string;
}

/**
 * renderer is the markdown renderer used for rendering markdown content.
 *
 * @see
 * https://github.com/markdown-it/markdown-it/blob/0fe7ccb4b7f30236fb05f623be6924961d296d3d/README.md?plain=1#L154
 */
const renderer: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(content: string, language?: string) {
    const html = language && hljs.getLanguage(language)
      ? hljs.highlight(
        content,
        { language, ignoreIllegals: true },
      ).value
      : renderer.utils.escapeHtml(content);
    return `<pre data-lang="${language}"><code class="hljs">${html}</code></pre>`;
  },
});

renderer.use(anchorPlugin, {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: "§",
});

renderer.use(tocDoneRightPlugin);
