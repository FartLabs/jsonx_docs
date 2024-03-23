---
title: Install
---

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
