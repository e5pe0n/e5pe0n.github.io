---
title: "Note: TypeScript"
categories:
  - Note
tags:
  - TypeScript
---

# JavaScript

## Standard Specification

**JavaScript** is the product name.  
The name of standard specification is **ECMAScript (エクマスクリプト)**.  

|    Edition    | Published |                            Description                             |
| :-----------: | :-------: | :----------------------------------------------------------------: |
|      ES5      |   2009    |                       ECMAScript 5th Edition                       |
| ES6 (=ES2015) |   2015    | 6 th Edition.   <br> Language specification is changed drastically |
|    ES2020     |   2020    |                                                                    |

## Modules

|       API       | Published |                                   Description                                    |     API example      |
| :-------------: | :-------: | :------------------------------------------------------------------------------: | :------------------: |
|    CommonJS     |   2009    |                                   with Node.js                                   | `require`, `exports` |
| ES Modules; ESM |   2015    | with ES2015 <br> `"type": "module"` in package.json is option to use ESM on Node |  `import`, `export`  |


|   Tools    |   Desription   |   supported API   |
| :--------: | :------------: | :---------------: |
| Browserify | Module bundler |     CommonJS      |
|  webpack   | Module bundler | ComonJS, ESM, etc |



# Class

In TypeScript, class is not only *Type* but also *Function*.   
When a class is defined, these two are declared.  
  - Interface type of the class instance
  - Constructor function


```ts
class Point {
  x: number = 0;
  y: number = 0;
}

const pointA = new Point(); // class is treated as constructor function
const pointB: Point = { x: 2, y: 4 }; // class is treated as type

interface Point3d extends Point {
  z: number;
}

const pointC: Point3d = { x: 5, y: 5, z: 10 };
```

## Inheritance vs Composition

Composition is better than inheritance in maintainability.  


# Overloads

In case of overloads, function definition statement is better than arrow expression in readability.   

```ts
let suits = ["heats", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: any): any {
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  } else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "heats", card: 4 },
];

let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

NG example  
- `a: number | string, b: number | string` includes cases of `{a: number, b: string}` or `{a: string, b: number}`

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number | string, b: number | string): number | string {
  let res = Number(a) + Number(b);
  if (typeof a == "nubmer" && typeof b == "number") {
    return res;
  } else if (typeof a == "string" && typeof b == "number") {
    return String(res);
  } else {
    throw new Error("Invalid Arguments");
  }
}
```

Correct code   

```ts
type NumPair = {
  a: number;
  b: number;
};

type strPair = {
  a: string;
  b: string;
}

const isNumPair = (arg: unknown): arg is NumPair => {
  const n = arg as NumPair;
  return typeof n.a === "number" && typeof n.b === "number";
}

function add(x: NumPair): number;
function add(x: strPair): string;
function add(x: NumPair | strPair): number | string {
  let res = Number(x.a) + Number(x.b);
  if (isNumPair(x)) {
    return res;
  } else {
    return String(res);
  }
}
```

### Note:   
TypeScript has no way to check type of any object on runtime (number, string are primitive type. these are *value*, not *object*), just only to compare object structures (**Structural Subtyping**).  
Don't forget that TypeScript codes are compiled to JavaScript and JavaScript has no type of object.    
So we can't write codes like below.  

```ts
// NG
function add(x: NumPair | strPair): number | string {
  let res = Number(x.a) + Number(x.b);
  if (typeof x === "NumPair") {
    return res;
  } else {
    return String(res);
  }
}
```

```ts
// NG
function add(x: NumPair | strPair): number | string {
  let res = Number(x.a) + Number(x.b);
  if (x instanceof NumPair) {
    return res;
  } else {
    return String(res);
  }
}
```

And be aware about that `typeof null` returns `"object"`.   


# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext", // set "commonjs" when use Node
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src", // enable absolute import setting src as root dir
    "downlevelIteration": true  // enable iteration statements even though target is before es2015
  },
  "include": [
    "src"
  ]
}
```

## jsx

|   Value   |                                          Description                                           |
| :-------: | :--------------------------------------------------------------------------------------------: |
| react-jsx | emittable `import React from 'react'`. <br> Available `TypeScript (> 4.1) and React (>= 17.0)` |
|    jsx    |                                                                                                |
