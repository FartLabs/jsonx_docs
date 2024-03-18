import { compare, greaterThan, parse } from "@std/semver";

/**
 * Meta is the module metadata.
 */
export interface Meta {
  latest: string;
  versions: string[];
}

/**
 * getMeta gets the latest module metadata.
 */
export function getMeta(): Promise<Meta> {
  return fetch("https://jsr.io/@fartlabs/jsonx/meta.json")
    .then((response) => response.json())
    .then((meta) => playgroundMeta(meta));
}

function playgroundMeta({ latest, versions }: {
  latest: string;
  versions: Record<string, unknown>;
}): Meta {
  // https://github.com/FartLabs/jsonx/issues/13
  const minCompatible = parse("0.0.8");
  return {
    latest: latest,
    versions: Object.keys(versions)
      .filter((versionTag) => greaterThan(parse(versionTag), minCompatible))
      .sort((a, b) => compare(parse(b), parse(a))),
  };
}
