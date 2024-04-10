---
title: JSX
---

# JSX

JSX is an XML-like syntax extension to ECMAScript that allows programmers to
write HTML-like code in JavaScript. JSX code is transformed into standard
JavaScript through transpilation.

```tsx
function Greeting(props: { name: string }) {
  return (
    <DIV>
      <H1>Hello, {props.name}!</H1>
    </DIV>
  );
}

const html = <Greeting name="World" />;

console.log(html);
```

<details>
<summary>Click to see transpiled JavaScript.</summary>

```js
function Greeting(props) {
  return h("DIV", null, h("H1", null, "Hello, ", props.name, "!"));
}

const html = h(Greeting, { name: "World" });

console.log(html);
```

</details>

## What does JSX stand for?

JSX stands for JavaScript XML.

## What is JSX known for?

JSX is most commonly known for being a paradigm for writing web applications and
is used by multiple popular libraries such as React and Preact to define and
compose user interfaces at scale.

## What is JSX good for?

JSX is good for writing declarative, composable, and reusable components.

**Imagine JSX as a shortcut for building user interfaces (UI) in React.**

- It looks similar to HTML, the language used to create webpages. This makes it
  familiar and easy to learn.
- Instead of writing separate HTML and JavaScript code, JSX lets you combine
  them.
- You write the structure of your UI (headings, buttons, etc.) using JSX code
  directly within JavaScript functions.
- These functions are called components and can be reused throughout your
  application.

**Benefits of JSX:**

- **Readability:** Seeing the UI structure and logic together makes your code
  easier to understand.
- **Maintainability:** Reusing components keeps your code organized and reduces
  errors.
- **Flexibility:** You can arrange the component properties (like colors, sizes)
  in any order, making it less prone to mistakes.

**Think of it like building with Lego bricks.**

- Each Lego brick represents a component with its own properties (color, size).
- You can snap these bricks together in any order to build different structures
  (your UI).
- JSX makes building these structures (UIs) in React more efficient and
  enjoyable.

## What does JSX solve?

## Why does jsonx use JSX?

> [!NOTE]
>
> Coming soon.

## JSX vs TSX

> [!NOTE]
>
> Difference between JSX and TSX coming soon.

## Syntax

> [!NOTE]
>
> JSX syntax tutorial coming soon.

## Project setup

> [!NOTE]
>
> JSX project setup using 1 or more JSX runtimes coming soon.

```
```
