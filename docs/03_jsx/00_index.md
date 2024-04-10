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

JSX's constraint of limiting components to functions with a single object
argument is a fundamental aspect of its composability. Here's why:

- **Single Object Argument:** This argument, often referred to as props,
  consolidates all the data a component needs into one place. This makes it
  easier to pass information between components and promotes reusability.
  Imagine components like functions that take a single box (the props object)
  containing everything they need to work.
- **Composability:** Because components receive their data through a single
  object, they become more predictable and easier to combine. You can take
  smaller, well-defined components and assemble them into more complex UIs
  without worrying about order or mixing data types.

Let's look at an analogy:

- **Traditional Functions:** Imagine baking a cake. You might have a recipe that
  lists ingredients one by one (sugar, flour, eggs, etc.). If you forget the
  order or miss an ingredient, the cake might not turn out well.
- **JSX Components:** With JSX components, it's like having a recipe that uses a
  single "cake mix" object. This object contains all the pre-measured
  ingredients (props) needed for the component to function. You can easily
  combine different cake mixes (components) to create delicious desserts (UIs).

**Benefits of Single Object Argument:**

- **Readability:** Props make code easier to understand by keeping data
  organized.
- **Maintainability:** Changes to props are centralized, making updates simpler.
- **Flexibility:** Components can accept different props or no props at all,
  increasing reusability.

**In essence, JSX's single object argument constraint promotes a structured and
predictable way to pass data between components, which is essential for building
complex UIs by composing smaller, reusable pieces.**

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
