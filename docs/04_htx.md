---
title: HTX
---

# `@fartlabs/htx`

HTX is a string-based component system that simplifies UI development by
treating components as hypermedia strings rather than virtual DOM nodes.

For clarity, this guide compares HTX patterns against React conventions.

## API reference

Learn more about [`@fartlabs/htx`](https://jsr.io/@fartlabs/htx).

## Core principles

### 1. Components return strings

All HTX components return HTML strings, not React elements:

```tsx
// ✅ Correct - returns string
import { DIV } from "@fartlabs/htx";

export function MyComponent() {
  return <DIV>Hello World</DIV>;
}

// ❌ Incorrect - returns React elements
export function MyComponent() {
  return <div>Hello World</div>; // React JSX
}
```

### 2. Array joining for lists

When rendering arrays of components, always use `.join("")`:

```tsx
// ✅ Correct
{
  items.map((item) => <LI key={item.id}>{item.name}</LI>).join("");
}

// ❌ Incorrect - React style
{
  items.map((item) => <li key={item.id}>{item.name}</li>);
}
```

### 3. Conditional rendering with ternary

Use ternary operators with empty strings, not logical AND:

```tsx
// ✅ Correct
{
  isVisible ? <SPAN>Content</SPAN> : "";
}

// ❌ Incorrect - React style
{
  isVisible && <span>Content</span>;
}
```

### 4. Explicit string typing

Define children as strings in component interfaces:

```tsx
// ✅ Correct
interface ComponentProps {
  children: string;
  title?: string;
}

// ❌ Incorrect - React style
interface ComponentProps {
  children: ReactNode;
  title?: string;
}
```

### 5. Direct DOM manipulation

Use direct DOM methods for dynamic updates:

```tsx
// ✅ Correct
element.insertAdjacentHTML("beforeend", <LI>New item</LI>);

// ❌ Incorrect - React style
setState([...items, newItem]);
```

### 6. Import patterns

#### Convenient import (all components)

```tsx
import { DIV, LI, SPAN, UL } from "@fartlabs/htx";
```

#### Tree-shaking import (individual components)

```tsx
import { DIV } from "@fartlabs/htx/div";
import { LI } from "@fartlabs/htx/li";
import { SPAN } from "@fartlabs/htx/span";
import { UL } from "@fartlabs/htx/ul";
```

Tree-shaking helps reduce bundle size by only including the HTX components you
actually use, rather than importing the entire component library.

**Remember:** HTX components are just functions that return HTML strings. Keep
it simple!

## Mental model

HTX flattens the UI mental model by:

- **Eliminating Virtual DOM** - No diffing, just string concatenation
- **Removing State Complexity** - Direct DOM manipulation
- **Simplifying Lifecycle** - Functions return strings, that's it
- **Making Hypermedia First-Class** - HTML strings are the source of truth

## Benefits

- **Predictable** - What you write is what gets rendered
- **Debuggable** - Direct HTML output is easy to inspect
- **Performant** - No virtual DOM overhead
- **Simple** - No complex state management or reconciliation
