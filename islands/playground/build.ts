import { esbuild } from "./deps.ts";

/**
 * TransformOptions are the options for transforming the code.
 */
export interface TransformOptions {
  code: string;
  version: string;
}

/**
 * transform transforms the code to JavaScript.
 */
export async function transform(options: TransformOptions) {
  const transformation = await esbuild.transform(options.code, {
    loader: "tsx",
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        jsxFactory: "h",
        jsxFragmentFactory: "Fragment",
        jsxImportSource:
          `https://esm.sh/jsr/@fartlabs/jsonx@${options.version}`,
      },
    },
  });

  return transformation;
}
