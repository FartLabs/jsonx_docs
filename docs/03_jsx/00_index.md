---
title: JSX
---

# JSX

JSX is an XML-like syntax extension to ECMAScript that allows programmers to
write HTML-like code in JavaScript. JSX code is transformed into standard
JavaScript through transpilation.

## Transpilation

Here is some JSX code that renders a simple greeting message in HTML:

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

Here's the same code transpiled to JavaScript:

```js
function Greeting(props) {
  return h(DIV, null, h(H1, null, "Hello, ", props.name, "!"));
}

const html = h(Greeting, { name: "World" });

console.log(html);
```

The JSX syntax is shorthand for calling the JSX runtime function `h` with the
component, its props, and any children. `h` is conventionally used to represent
the `createElement` function in [React](https://react.dev/),
[Preact](https://preactjs.com/),
[Vue](https://vuejs.org/guide/extras/render-function#jsx-tsx), and other JSX
runtimes, but it can be configured to use any function via the `jsxFactory` and
`jsxFragment` options in the TypeScript compiler options.

## Syntax

JSX syntax is similar to HTML, but it is not HTML. For example,
[void elements](https://developer.mozilla.org/en-US/docs/Glossary/Void_element)
like `<img>` require a closing slash (`<img />`), and all tags must be closed.

JSX also supports dynamic expressions between `{` and `}`. This is how data is
dynamically inserted into JSX elements.

```tsx
function PokemonLink(props: { pokedexNumber: number }) {
  return (
    <A href={`/pokedex/${props.pokedexNumber}`}>
      Pokemon #{props.pokedexNumber}
    </A>
  );
}
```

## Project setup

### Deno

> [!NOTE]
>
> JSX project setup using 1 or more JSX runtimes coming soon.

## Q&A

### What does JSX stand for?

JSX stands for "JavaScript XML".

### What is JSX known for?

JSX is most commonly known for being a paradigm for writing web applications and
is used by multiple popular libraries such as React and Preact to define and
compose user interfaces at scale.

React is downloaded over 100 million times per week and is the tool of choice
behind many popular platforms such as Facebook and Instagram.

### What is the difference between JSX and TSX?

TSX refers to TypeScript code with JSX syntax. JSX files are often denoted by
the file extension `.jsx` while TSX files are denoted by the file extension
`.tsx`.

It is recommended to use TSX files when writing JSX code in TypeScript projects.
This is because TypeScript offers type checking that can help catch errors early
in the development process.

Learn more about [TypeScript](https://typescriptlang.org/).

### Why do JSX components only use a single argument?

JSX's constraint of limiting components to functions with a single object
argument is a fundamental aspect of its composability.

This argument, often referred to as "props", consolidates all the data a
component needs into one place, simplifying how information is passed to
components and how components are defined.

In essence, JSX's single object argument constraint promotes a structured and
predictable way to pass data between components, which is essential for building
complex programs by composing smaller, reusable pieces.
