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
