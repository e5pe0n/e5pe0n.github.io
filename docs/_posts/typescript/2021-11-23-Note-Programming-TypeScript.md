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

```ts
const filter = <T>(array: T[], f: (item: T) => boolean) => {
  const res = [];
  for (let i = 0; i < array.length; ++i) {
    const item = array[i];
    if (f(item)) {
      res.push(item);
    }
  }
  return res;
};
```

```ts
// using Type Alias
type Filter<T> = {
  (array: T[], f: (item: T) => boolean): T[];
};

const numberFilter: Filter<number> = (array, f) => [];
const stringFilter: Filter<string> = (array, f) => [];
```

## Bounded Polymorphism

- *upper bound* on *U*
  - i.e. the type *U* should be *at least T*

![upper_bound_on_U]({{site.url}}{{site.baseurl}}/assets/images/Programming-TypeScript/upper_bound_on_U.png)

```ts
type TreeNode = {
  value: string;
};
type LeafNode = TreeNode & {
  isLeaf: true;
};
type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode];
};

const mapNode = <T extends TreeNode>(
  node: T,
  f: (value: string) => string
) => ({ ...node, value: f(node.value) });
```

Multi-constraint

```ts
type HasSides = {
  numberOfSides: number;
};
type SidesHaveLength = {
  sideLength: number;
};

const logPerimeter = <Shape extends HasSides & SidesHaveLength>(s: Shape) => {
  console.log(s.numberOfSides * s.sideLength);
  return s;
};
```

For variadic paramter

```ts
const call = <T extends unknown[], R>(f: (...args: T) => R, ...args: T) =>
  f(...args);

const fill = (length: number, value: string) =>
  Array.from({ length }, () => value);

const a = call(fill, 10, "a");
```

## Generic Type Defaults

```ts
type MyEvent<Type extends string, Target extends HTMLElement = HTMLElement> = {
  target: Target;
  type: Type;
};
```

# Chapter 5. Classes

- accessibility
  - public: default
  - protected
  - private
- *super()*
  - e.g. `super.supersMethod()`
  - you can only access super class's methods, not its properties

```ts
// Piece.ts
import Position from "Position";

export type Color = "Black" | "White";
export type _File = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

abstract class Piece {
  protected position: Position;
  constructor(private readonly color: Color, file: _File, rank: Rank) {
    this.position = new Position(file, rank);
  }
  moveTo(position: Position) {
    this.position = position;
  }
  abstract canMoveTo(position: Position): boolean;
}

export class King extends Piece {
  canMoveTo(position: Position): boolean {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2;
  }
}
export class Queen extends Piece {}
export class Bishop extends Piece {}
export class Knight extends Piece {}
export class Rook extends Piece {}
export class Pawn extends Piece {}
```

```ts
// Position.ts
import type { _File, Rank } from "Piece";

export default class Position {
  constructor(private file: _File, private rank: Rank) {}
  distanceFrom(position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0)),
    };
  }
}
```

```ts
// Game.ts
import { King, Queen, Bishop, Knight, Rook, Pawn } from "Piece";

class Game {
  private pieces = Game.makePieces();

  private static makePieces() {
    return [
      new King("White", "E", 1),
      new King("Black", "E", 8),

      new Queen("White", "D", 1),
      new Queen("Black", "D", 8),

      new Bishop("White", "C", 1),
      new Bishop("White", "F", 1),
      new Bishop("Black", "C", 8),
      new Bishop("Black", "F", 8),

      ...
    ];
  }
}
```

## `this` as Return Type

```ts
class MySet {
  has(value: number): boolean {
    // ...
  };
  add(value: number): this {
    // ...
  }
}

class MutableSet extends Set {
  delete(value: number): boolean {
    // ...
  }
}

const s = new MySet();
s.add(1).add(2).add(3);
```

## Type Aliases as Interfaces


```ts
{ // these interfaces equivalent to the blow type aliaes
  interface Food {
    calories: number;
    tasty: boolean;
  }
  interface Sushi extends Food {
    salty: boolean;
  }
  interface Cake extends Food {
    seet: boolean;
  }
}
{
  type Food = {
    calories: number;
    tasty: boolean;
  };
  type Sushi = Food & {
    salty: boolean;
  };
  type Cake = Food & {
    sweet: boolean;
  };
}
```

Type aliases can take types and type expressions (intefaces cannot).  

```ts
// only type aliaes can do
type A = number;
type B = A | string;
```

The interface you are extending must assignable to your extension.   
On the other hand, the intersection type assumes union of the both types.  


```ts
{
  interface A {
    good(x: number): string;
    bad(x: number): string;
  }
  // Error 2430
  // interface A must be assignable to B
  // but `bad(x: number): string` cannot be assigend to `bad(x: string): string`
  interface B extends A {
    good(x: string | number): string;
    bad(x: string): string;
  }
}

{
  type A = {
    good(x: number): string;
    bad(x: number): string;
  };
  // Type B is interpreted as
  // type B = {
  //   good(x: string | number): string;
  //   bad(x: string | number): string;
  // }
  type B = A & {
    good(x: string | number): string;
    bad(x: string): string;
  };
}
```

## Declaration Merging

```ts
{
  interface User {
    name: string;
  }
  interface User {
    age: number;
  }
  // OK
  // two User are merged into one
  const u: User = {
    name: "Ashley",
    age: 30,
  };
}
{
  // Error TS2300: Duplicate identifier "User".
  type User = {
    name: string;
  };
  type User = {
    age: number;
  };
}
```

## Classes Implementing Types

```ts
{
  interface Animal {
    readonly name: string;
    eat(food: string): void;
    sleep(hours: number): void;
  }
  interface Feline {
    meow(): void;
  }
  class Cat implements Animal, Feline {
    name = "Whiskers";
    eat(food: string) {
      console.log(`Ate some ${food}. Mmm!`);
    }
    sleep(hours: number) {
      console.log(`Sleep for ${hours} hours`);
    }
    meow() {
      console.log("Meow");
    }
  }
}
{
  type Animal = {
    readonly name: string;
    eat(food: string): void;
    sleep(hours: number): void;
  };
  interface Feline {
    meow(): void;
  }
  class Cat implements Animal, Feline {
    name = "Whiskers";
    eat(food: string) {
      console.log(`Ate some ${food}. Mmm!`);
    }
    sleep(hours: number) {
      console.log(`Sleep for ${hours} hours`);
    }
    meow() {
      console.log("Meow");
    }
  }
}
```

## Namespaces

- TypeScript separates the namespace into for *value*s and for *type*s

## Types Class Declaring

`StringDatabase` declares two types
  - instance type
    - constitutes structural typing
  - constructor type
    - used by *instanceof* or *typeof*

```ts
type State = {
  [key: string]: string;
};

class StringDatabase {
  constructor(public state: State = {}) {}
  get(key: string) {
    return key in this.state ? this.state[key] : null;
  }
  set(key: string, value: string): void {
    this.state[key] = value;
  }
  static from(state: State) {
    const db = new StringDatabase();
    for (const key in state) {
      db.set(key, state[key]);
    }
    return db;
  }
}
```

```ts
// instance type
interface StringDatabase {
  get(key: string): string | null;
  set(key: string, value: string): void;
}

// constructor type
interface StringDatabaseConstructor {
  new(state: State): StringDatabase;
  from(state: State): StringDatabase;
}
```

## Generics

```ts
class MyMap<K, V> {
  constructor(initialKey: K, initialValue: V) {
    // ...
  }
  get(key: K): V {
    // ...
  }
  set(key: K, value: V): void {
    // ...
  }
  merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1> {
    // ...
  }
  // static methods cannot access K and V that the class declare
  // so they need to declare K and V for themselvs
  static of<K, V>(k: K, v: V): MyMap<K, V> {
    // ...
  }
}
```

## Simulating *final* Classes

```ts
class MessageQueue {
  private constructor (private messages: string[]) {}
  static create(messages: string[]) {
    return new MessageQueue(messages);
  }
}

class BadQueue extends MessageQueue {}  // Error TS2675
```

# Chapter 6. Advanced Types

## Variance

- *Invariance*
  - You want to exactly a *T*
- *Covariance*
  - You want a *<: T*
    - objects
    - classes
    - arrays
    - function return types
- *Contravariance*
  - You want a *>: T*
    - function parameter types
- *Bivariance*
  - You're OK with either *<: T* or *>: T*


```ts
class Animal {}
class Bird extends Animal {
  chirp() {}
}
class Crow extends Bird {
  caw() {}
}

function chirp(bird: Bird): Bird {
  bird.chirp();
  return bird;
}

chirp(new Animal()); // Error TS2345; Animal is not assigneable to Bird
chirp(new Bird());
chirp(new Crow());

// Asignable a function to f must satisfy below
// - parameter type is :> Bird
// - return type is :< Bird
function clone(f: (b: Bird) => Bird): void {
  const parent = new Bird();
  const babyBird = f(parent);
  babyBird.chirp(); // at least babyBird should have chirp()
}


// varaint return type
function birdToBird(b: Bird): Bird {
  return b;
}
clone(birdToBird); // OK; Bird :< Bird

function birdToCrow(b: Bird): Crow {
  return new Crow();
}
clone(birdToCrow); // OK; Crow :< Bird

function birdToAnimal(b: Bird): Animal {
  return new Animal();
}
clone(birdToAnimal); // Error TS2345; Animal >: Bird


// variant parameter type
function animalToBird(a: Animal): Bird {
  return new Bird();
}
clone(animalToBird);  // OK; Animal :> Bird

function crowToBird(c: Crow): Bird {
  c.caw(); // Crow is an upper bound on types that have caw()
  return new Bird();
}
clone(crowToBird); // Error TS2345; Crow :< Bird
```

## *key-in* and *keyof* operator

```ts
type Account = {
  id: number;
  isEmployee: boolean;
  notes: string[];
};

type OptionalAccount = {
  [K in keyof Account]?: Account[K];
};
type NullableAccount = {
  [K in keyof Account]: Account[K] | null;
};
type ReadonlyAccount = {
  readonly [K in keyof Account]: Account[K];
};

// make all fields writable again
type Account2 = {
  -readonly [K in keyof ReadonlyAccount]: Account[K];
};
// make all fields required again
type Account3 = {
  [K in keyof OptionalAccount]-?: Account[K];
};
```

### Built-in Mapped Types

- `Record<Keys, Values>`
  - An object with keys of type *Keys* and values of type *Value*
- `Partial<Object>`
  - Marks every field in *Object* as optional
- `Required<Object>`
  - Marks every field in *Object* as nonoptional
- `Readonly<Object>`
  - Marks every field in *Object* as read-only
- `Pick<Object, Keys>`
  - Returns a subtype of *Object*, with just the given *Keys*


## Companion Object Pattern

```ts
type Currency = {
  unit: "EUR" | "GBP" | "JPY" | "USD";
  value: number;
};

const Currency = {
  DEFAULT: "USD",
  form(value: number, unit = Currency.DEFAULT): Currency {
    return { unit, value };
  },
};
```

## Conditional Types

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

```ts
type Without<T, U> = T extends U ? never : T;

type A = Without<
  boolean | number | string,
  boolean
>;  // number | string
```

because

```ts
type A = Without<boolean | number | string, boolean>

       = Without<boolean, boolean>
       | Without<number, boolean>
       | Without<string, boolean>

       = (boolean extends boolean ? never : boolean)
       | (number extends boolean ? never : number)
       | (string extends boolean ? never : string)

       = never | number | string
       = number | string
```

### *infer* keyword

```ts
{
  type ElementType<T> = T extends unknown[] ? T[number] : T;
  type A = ElementType<number[]>; // number
}
{
  type ElementType<T> = T extends (infer U)[] ? U : T;
  type B = ElementType<number[]>; // number
}
{
  type ElementUgly<T, U> = T extends U[] ? U : T;
  type C = ElementUgly<number[]>; // Error TS2314; we must pass both T and U
}
```

```ts
type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never;

type F = typeof Array["prototype"]["slice"];
type A = SecondArg<F>; // number | undefined
```

### Build-in Conditional Types

#### *Execlue<T, U>*

Computes those types in *T* that are not in *U*

```ts
type A = number | string;
type B = string;

type C = Exclude<A, B>; // number
```

#### *Extract<T, U>*

Computes the types in *T* that you can assign to *U*

```ts
type A = number | string;
type B = string;

type C = Extract<A, B>; // string;
```

#### *NonNullable<T>*

Computes a version of *T* that excludes *null* and *undefined*

```ts
type A = { a?: number | null; };

type B = NonNullable<A["a"]>;  // number
```

#### *ReturnType<F>*

Computes a function's return type (not work for generic and overloaded functions)  

```ts
type F = (a: number) => string;

type R = ReturnType<F>;  // string
```

#### *InstanceType<C>*

Computes the instance type of a class constructor

```ts
type A = { new(): B };
type B = { b: number };

type I = InstanceType<A>; // { b: number }
```

### *Type Brand* (Simulating Nominal Types)

```ts
type CompanyID = string & { readonly brand: unique symbol };
type OrderID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
type ID = CompanyID | OrderID | UserID;

function CompanyID(id: string) {
  return id as CompanyID;
}
function OrderID(id: string) {
  return id as OrderID;
}
function UserID(id: string) {
  return id as UserID;
}

function queryForUser(id: UserID) {
  // ...
}

const companyId = CompanyID("8a607cf");
const orderId = OrderID("9994acc1");
const userId = UserID("d21b1dbf");

queryForUser(userId);
queryForUser(companyId); // Error TS2345
```

### Safely Extending Prototype

```ts
// zip.ts
// commonJS ver
interface Array<T> {
  zip<U>(list: U[]): [T, U][];
}

Array.prototype.zip = function <T, U>(this: T[], list: U[]): [T, U][] {
  return this.map((v, k) => tuple(v, list[k]));
};
```
```ts
// zip.mts
// ESmodule ver
declare global {
  interface Array<T> {
    zip<U>(list: U[]): [T, U][];
  }
}

Array.prototype.zip = function <T, U>(this: T[], list: U[]): [T, U][] {
  return this.map((v, k) => tuple(v, list[k]));
};

export {};
```

```json
// tsconfig.json
{
  "exclude": [
    "./zip.ts"  // makes us to import manually in files using zip()
  ]
}
```

<br>

# Chapter 7. Handling Errors

- Returning `null`
  - pros
    - easy to implement
  - cons
    - difficult to know the cause of failure
    - once `null` is returned, we have to check whether the variable is `null` or not again and again
- Throwing Exceptions
  - pros
    - easy to know why the process failed
  - cons
    - we cannot know what exceptions are thrown from the function because JS/TS does not have *throws* clause like Java
- Returning Exceptions
  - pros
    - easy to know why the process failed
    - force caller to handle results for all types
  - cons
    - implementation might be complicated
- The Option Type
  - pros
    - easy to implement a function **chain** handling processes that possibly fails
  - cons
    - difficult to know the cause of failure
    - we cannot insert an interoperation to processes handling *Option*s (because of a function chain)


## Returning Exceptions

```ts
function ask() {
  return prompt("When is your birthday?");
}

class InvalidDateFormatError extends RangeError {}
class DateIsInTheFutureError extends RangeError {}

function parse(
  birthday: string
): Date | InvalidDateFormatError | DateIsInTheFutureError {
  const date = new Date(birthday);
  if (!isValid(date)) {
    return new InvalidDateFormatError("Enter a date in the from YYYY/MM/DD");
  }
  if (date.getTime() > Date.now()) {
    return new DateIsInTheFutureError("Are you a timelord?");
  }
  return date;
}

const res = parse(ask());
if (res instanceof InvalidDateFormatError) {
  console.error(res);
} else if (res instanceof DateIsInTheFutureError) {
  console.error(res);
} else {
  console.info("Date is", res.toISOString());
}
```

## The *Option* Type

kinds of *Option* type (not built-in types)
- *Try*
- *Option*
- *Either*

```ts
interface Option<T> {
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Option<U>): Option<U>;
  getOrElse(value: T): T;
}

function _Option<T>(value: null | undefined): None;
function _Option<T>(value: T): Some<T>;
function _Option<T>(value: T): Option<T> {
  if (value == null) {
    return new None();
  }
  return new Some(value);
}

class Some<T> implements Option<T> {
  constructor(private value: T) {}
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Some<U>): Some<U>;
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }
  getOrElse(): T {
    return this.value;
  }
}

class None implements Option<never> {
  flatMap(): None {
    return this;
  }
  getOrElse<U>(value: U): U {
    return value;
  }
}


const res = _Option(6)
  .flatMap((n) => _Option(n * 3))
  .flatMap((n) => new None())
  .getOrElse(7); // 7
```


