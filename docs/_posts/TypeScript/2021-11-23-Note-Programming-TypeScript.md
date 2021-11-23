---
title: "Note: Programming TypeScript"
categories:
  - Note
tags:
  - TypeScript
last_modified_at: 2021-11-23
---

Programming TypeScript / Boris Cherny / O'Reilly

# Tips to understand TypeScript

- Distinguish *type-level* code from *value-level* code

# Chapter 3. All About Types

## Type

A set of values and things you can do with them

- The boolean type is the set of all booleans (`true` and `false`) and the operations you can perform on them (`||`, `&&`, `!`)

![type hierarchy]({{site.url}}{{site.baseurl}}/assets/images/Programming-TypeScript/type-hierarchy.png)


## Objects

```ts
const user: {
  readonly firstName: string;
} = {
  firstName: "abby",
};

user.firstName = "abbey"; // Error TS2540
```

### Empty Object Type

Do **NOT** use the empty object type.
- the empty objec type matches any object except for `undefined` and `null`

```ts
// no error occurs
const empty1: {} = {};
const empty2: {} = 1;
const empty3: {} = [];
const empty4: {} = { x: 1 };
```

### *Object* type vs *object* type

Use the *object* type, Do **NOT** the *Object* type.
- the *object* type does not match primitives, `null` and `undefined`
- the *Object* type does not match only `null` and `undefined`

## Type Aliases

- scoped to the block

```ts
type Cat = { name: string; purrs: boolean };
type Dog = { name: string; barks: boolean; wags: boolean };
type CatOrDogOrBoth = Cat | Dog;
type CatAndDog = Cat & Dog;

// Cat
const cat: CatOrDogOrBoth = {
  name: "Bonkers",
  purrs: true,
};

const dog: Dog = {
  name: "Domino",
  barks: true,
  wags: true,
};

const both: CatOrDogOrBoth = {
  name: "Donkers",
  barks: true,
  purrs: true,
  wags: true,
};

const catAndDog: CatAndDog = {
  name: "Domino",
  barks: true,
  purrs: true,
  wags: true,
};

(a: string, b: number): string | number => a || b;
```

## *Tuple*s

```ts
const a: [number] = [1];
const b: [string, string, number] = ["malcolm", "gladwell", 1963];

const trainFares: [number, number?][] = [[3.75], [8.25, 7.7], [10.5]];

const friends: [string, ...string[]] = ["Sara", "Tali", "Chloe", "Claire"];
const list: [number, boolean, ...string[]] = [1, false, "a", "b", "c"];
```

### readonly arrays

consider to use [immutable](https://www.npmjs.com/package/immutable) instead.

```ts
const a: readonly number[] = [1, 2, 3];
const b: readonly number[] = a.concat(4);
// a[4] = 5; // Error TS2542
// a.push(6) // Error TS2339
```

### *null*, *undefined*, *void* and *never*

|Type|Meaning|
|:---:|:---:|
|*null*|absence of a value|
|*undefined*|variable that has not been assigned a value yet|
|*void*|Function that doesn't have a *return* statement|
|*never*|Function that never returns (it throws an error or runs infinitely)|


# 4. Functions

## Optional/Default Parameters

```ts
const optionalLog = (
  message: string,
  userId?: string // optional param must be at the end
) => {
  const time = new Date().toLocaleTimeString();
  console.log(time, message, userId || "Not signed in");
};

const defaultLog = (
  userId = "Not signed in", // default param do not have to be at the end
  message: string
) => {
  const time = new Date().toLocaleTimeString();
  console.log(time, message, userId);
};
```

## Generics

```ts
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[];
};

const filter: Filter = (array, f) => {
  const res = [];
  for (let i = 0; i < array.length; ++i) {
    const item = array[i];
    if (f(item)) {
      res.push(item);
    }
  }
  return res;
};

console.log(filter([1, 2, 3], (x) => x > 2)); // [ 3 ]
console.log(filter(["a", "b"], (x) => x !== "b")); // [ 'a' ]

const names = [
  { firstName: "beth" },
  { firstName: "caitlyn" },
  { firstName: "xin" },
];
console.log(filter(names, (x) => x.firstName.startsWith("b"))); // [ { firstName: 'beth' } ]
```