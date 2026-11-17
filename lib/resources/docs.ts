import generated from "#/generated/docs.json" with { type: "json" };
import type { Content } from "#/lib/docs/fs.ts";
import type { FSItem } from "#/lib/docs/items.ts";
import type { Node } from "#/lib/docs/nodes.ts";

// The docs are rendered ahead of time by `codegen/generate.ts`, so no file system is needed at runtime.
export const items = generated.items as unknown as FSItem[];
export const nodes = generated.nodes as unknown as Node<FSItem>[];
export const contents = new Map<string, Content>(
  generated.contents as unknown as [string, Content][],
);
