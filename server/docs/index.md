---
title: Overview
---

# Overview

The jsonx library exposes a JSX runtime for composing JSON data.

## Install

Install as usual via NPM:

```sh
npx jsr add @fartlabs/jsonx
```

Or if you're using Deno:

```sh
deno add @fartlabs/jsonx
```

Add the following values to your `deno.json(c)` file.

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxFactory": "@fartlabs/jsonx"
  }
}
```

## Use

Add a file ending in `.[j|t]sx` to your project. For example, `example.tsx`.

```tsx
function Cat() {
  return { animals: ["🐈"] };
}

function Dog() {
  return { animals: ["🐕"] };
}

const data = (
  <>
    <Cat />
    <Dog />
  </>
);

Deno.writeTextFileSync(
  "data.json",
  JSON.stringify(data, null, 2),
);
```

Compile your jsonx by running the `.[j|t]sx` file.

```sh
deno run --allow-write example.tsx
```

Preview the `data.json` file.

```sh
cat data.json
```

Resulting `data.json`:

```json
{
  "animals": [
    "🐈",
    "🐕"
  ]
}
```

## Motivation

Optimize developer ergonomics with improved modularity and maintainability by
enabling developers to compose JSON data like React components, using JSX.

## Contribute

Contributions are welcome! Check out the relevant GitHub repositories:

- [FartLabs/jsonx](https://github.com/FartLabs/jsonx): JSX runtime for composing
  JSON data.
- [FartLabs/jsonx_docs](https://github.com/FartLabs/jsonx_docs): Documentation
  site for the jsonx runtime.
