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
  );

const noteID = notesLab.execute(
  "notes.add",
  { title: "Hello", content: "World" },
);

const note = notesLab.execute(
  "notes.get",
  { id: noteID.id },
);

console.log(note); // { title: "Hello", content: "World" }
```
