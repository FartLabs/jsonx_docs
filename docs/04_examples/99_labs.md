---
title: Labs
---

# Labs

[Learn more about Labs](https://github.com/FartLabs/labs).

```ts
import { Lab } from "labs/labs.ts";

interface Note {
  title?: string;
  content: string;
}

const notesLab = new Lab()
  .variable("notes", new Map<string, Note>())
  .procedure(
    "notes.add",
    (note: Note, { notes }) => {
      const id = crypto.randomUUID();
      notes.set(id, note);
      return { id };
    },
    ["notes"],
  )
  .procedure(
    "notes.get",
    ({ id }: { id: string }, { notes }) => {
      return notes.get(id);
    },
    ["notes"],
  )
  .procedure(
    "notes.list",
    (_, { notes }) => {
      return Array.from(notes.values());
    },
    ["notes"],
  );

notesLab.execute(
  "notes.add",
  { title: "Hello", content: "World" },
);

const notes = notesLab.execute(
  "notes.list",
  {},
);

console.log(notes);
```
