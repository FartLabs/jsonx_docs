---
title: RTX
---

# `@fartlabs/rtx`

RTX is a jsonx-powered component system that simplifies HTTP server development.

```tsx
import { Get, Router } from "@fartlabs/rtx";

const router = (
  <Router default={() => new Response("Not found", { status: 404 })}>
    <Get
      pattern="/"
      handle={() =>
        new Response("Hello, World!")}
    />
  </Router>
);

export default {
  fetch: (request) => router.fetch(request),
} satisfies Deno.ServeDefaultExport;
```

## API reference

Learn more about [`@fartlabs/rtx`](https://jsr.io/@fartlabs/rtx).
