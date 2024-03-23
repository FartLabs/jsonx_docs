/**
 * Playground is a jsonx playground.
 */
export interface Playground {
  id: string;
  version: string;
  code: string;
}

/**
 * AddPlaygroundRequest is the request to add a playground.
 */
export type AddPlaygroundRequest = Omit<Playground, "id">;

// TODO: Write HTML comment parser for rendering comments in playground.

// function parsePlaygroundExpression(expression: string): string {
// }
