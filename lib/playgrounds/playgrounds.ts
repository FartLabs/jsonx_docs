/**
 * Playground is a stored jsonx playground.
 */
export interface Playground extends PlaygroundData {
  /**
   * id is the playground ID.
   */
  id: string;

  /**
   * version is the playground version.
   */
  version: string;
}

/**
 * PlaygroundData is the data for a playground.
 */
export interface PlaygroundData {
  /**
   * code is the playground code.
   */
  code: string;

  /**
   * version is the playground version.
   */
  version?: string;
}

/**
 * AddPlaygroundRequest is the request to add a playground.
 */
export type AddPlaygroundRequest = Omit<Playground, "id">;
