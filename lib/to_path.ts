/**
 * toPath returns the path from the path string.
 */
export function toPath(path: string): string[] {
  return path.split("/").filter(Boolean);
}
