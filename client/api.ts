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

/**
 * getPLaygroundByID gets a playground by playground ID.
 */
export function getPlaygroundByID(id: string): Promise<Playground> {
  return fetch(
    `/playgrounds/${id}`,
    {
      headers: { accept: "application/json" },
    },
  ).then((response) => response.json());
}

/**
 * addPlayground adds a new playground.
 */
export function addPlayground(
  request: AddPlaygroundRequest,
): Promise<Playground> {
  return fetch(
    `/playgrounds`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    },
  ).then((response) => response.json());
}
