// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_path_ from "./routes/[...path].ts";
import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_examples_name_ from "./routes/api/examples/[name].ts";
import * as $api_meta from "./routes/api/meta.ts";
import * as $api_playgrounds_id_ from "./routes/api/playgrounds/[id].ts";
import * as $api_playgrounds_index from "./routes/api/playgrounds/index.ts";
import * as $index from "./routes/index.ts";
import * as $p_id_ from "./routes/p/[[id]].tsx";

import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/[...path].ts": $_path_,
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/examples/[name].ts": $api_examples_name_,
    "./routes/api/meta.ts": $api_meta,
    "./routes/api/playgrounds/[id].ts": $api_playgrounds_id_,
    "./routes/api/playgrounds/index.ts": $api_playgrounds_index,
    "./routes/index.ts": $index,
    "./routes/p/[[id]].tsx": $p_id_,
  },
  islands: {},
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
