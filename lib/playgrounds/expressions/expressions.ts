/**
 * @fileoverview
 *
 * This file contains the helper functions for parsing and evaluating playground
 * expressions. Playground expressions are a simple syntax for embedding
 * playgrounds directly into markdown files.
 */

import type { PlaygroundData } from "#/lib/playgrounds/mod.ts";
import { getPlayground } from "#/lib/playgrounds/deno_kv/mod.ts";
import { readExample } from "#/lib/examples/mod.ts";
import { kv } from "#/lib/resources/kv.ts";

/**
 * PlaygroundExpression is a playground expression.
 */
export type PlaygroundExpression =
  | { id: string }
  | { example: string };

/**
 * parsePlaygroundExpression parses a playground expression.
 *
 * Example playground expressions:
 *
 * <!-- playground id:abc123 -->
 * <!-- playground example:hello_world -->
 */
export function parsePlaygroundExpression(
  expression: string,
): PlaygroundExpression {
  const idMatch = expression.match(/id:([a-zA-Z0-9-_.]+)/);
  if (idMatch) {
    return { id: idMatch[1] };
  }

  const exampleMatch = expression.match(/example:([a-zA-Z0-9-_.]+)/);
  if (exampleMatch) {
    return { example: exampleMatch[1] };
  }

  throw new Error(`Invalid playground expression: ${expression}`);
}

/**
 * fromExpression converts a playground expression to playground data.
 */
export async function fromExpression(
  expression: string,
): Promise<PlaygroundData> {
  const expr = parsePlaygroundExpression(expression);
  if ("id" in expr) {
    const playground = await getPlayground(kv, expr.id);
    if (!playground) {
      throw new Error(`Playground not found: ${expr.id}`);
    }

    return { code: playground.code, version: playground.version };
  }

  if ("example" in expr) {
    const example = await readExample(`./examples/${expr.example}`);
    if (!example) {
      throw new Error(`Example not found: ${expr.example}`);
    }

    return { code: example };
  }

  throw new Error(`Invalid playground expression: ${expr}`);
}
