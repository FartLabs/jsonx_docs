/**
 * @fileoverview
 *
 * This file contains the helper functions for parsing and evaluating playground
 * expressions. Playground expressions are a simple syntax for embedding
 * playgrounds directly into markdown files.
 */

import { getPlayground } from "#/lib/playgrounds/deno_kv/mod.ts";
import { kv } from "#/lib/resources/kv.ts";
import { readExample } from "#/lib/examples/mod.ts";

/**
 * PLAYGROUND_EXPRESSION_REGEX is the regular expression for parsing playground
 * expressions.
 */
export const PLAYGROUND_EXPRESSION_REGEX =
  /<!--\s*playground\s+(id|example):[a-zA-Z0-9-_.]+\s*-->/g;

/**
 * fromRegExpMatchArray converts a regular expression match array to a
 * PlaygroundExpression.
 */
export function fromRegExpMatchArray(
  match: RegExpMatchArray,
): PlaygroundExpression {
  return parsePlaygroundExpression(match[0]);
}

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
 * getDataByRegExpMatchArray converts a regular expression match array to
 * playground data.
 */
export async function getDataByRegExpMatchArray(
  match: RegExpMatchArray,
): Promise<{ code: string; version?: string }> {
  const expr = fromRegExpMatchArray(match);
  console.log({ expr });
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
