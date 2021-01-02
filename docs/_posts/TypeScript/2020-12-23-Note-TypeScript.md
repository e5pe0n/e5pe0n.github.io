---
title: "Note: TypeScript"
categories:
  - Note
tags:
  - TypeScript
last_modified_at: 2020-12-29
---

# JavaScript

## Standard Specification

**JavaScript** is the product name.  
The name of standard specification is **ECMAScript (エクマスクリプト)**.  

|    edition    | published |                             description                             |
| :-----------: | :-------: | :-----------------------------------------------------------------: |
|      ES5      |   2009    |                       ECMAScript 5th Edition                        |
| ES6 (=ES2015) |   2015    | 6 th Edition.   <br> Language specification was changed drastically |
|    ES2020     |   2020    |                                                                     |

## Modules

|       API       | published |                                   description                                    |     API example      |
| :-------------: | :-------: | :------------------------------------------------------------------------------: | :------------------: |
|    CommonJS     |   2009    |                                   with Node.js                                   | `require`, `exports` |
| ES Modules; ESM |   2015    | with ES2015 <br> `"type": "module"` in package.json is option to use ESM on Node |  `import`, `export`  |


|   tools    |   desription   |   supported API   |
| :--------: | :------------: | :---------------: |
| Browserify | Module bundler |     CommonJS      |
|  webpack   | Module bundler | ComonJS, ESM, etc |


<br>

# Types

## Any

## Unknown

- Introduced from TypeScript 3.0
- Be like safety *any*
  - *unknown* has no property and prototype method

## Never

- Any object cannot be assigned into a variable of never type

Correct code  

```ts
const greet = (n: 1 | 2 | 3) => {
  switch (n) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    default: {
      const check: never = n;
    }
  }
}
```

Incorrect code.  
The value of `n` cannot be assigned to check so a linter notifies us of the error.  
This prevents us from forgetting to implement some cases.  

```ts
const greet = (n: 1 | 2 | 3) => {
  switch (n) {
    case 1:
      return "one";
    case 2:
      return "two";
    default: {
      const check: never = n; // compile error because 3 is not be assignable to check
    }
  }
}
```

To be honest, I don't know what is good.  

## typeof

```ts
console.log(typeof 100) // number

cosnt arr = [1, 2, 3];
console.log(typeof arr) // 'object'


type NumArr = typeof arr;
const val: NumArr = [4, 5, 6];
const val2: NumArr = ["foo", "bar", "baz"]; // compile error
```

## in

```ts
const obj = { a: 1, b: 2, c: 3 };
console.log("a" in obj);  // true
for (const key in obj) { console.log(key); }  // a b c


type Fig = "one" | "two" | "three";
type FigMap = { [k in Fig]?: number };  // Mapped Type

const figMap: FigMap = {
  one: 100,
  two: 200,
  three: 300
};
figMap.four = 400;  // compile error
```

## keyof

```ts
const permissions = {
  r: 0b100,
  w: 0b010,
  x: 0b001,
} as const; // Const Assertions

type PermsChar = keyof typeof permissions; // "r" | "w" | "x"
const readable: PermsChar = "r";
const writable: PermsChar = "z";  // compile error

type ValueOf<T> = T[keyof T];
type PermsNum = ValueOf<typeof permissions>;  // 1 | 2 | 4

const permissions2 = {
  r: 0b100,
  w: 0b010,
  x: 0b001,
};

type PermsNum2 = Value<typeof permissions>; // number if without `as const`
```


## Built-in Utility Types

|     types     |              description              |
| :-----------: | :-----------------------------------: |
| `Partial<T>`  | Makes all properties of `T` omittable |
| `Required<T>` | Makes all properties of `T` required  |
| `Readonly<T>` | Makes all properties of `T` readonly  |

|    types     |                description                 |
| :----------: | :----------------------------------------: |
| `Pick<T, K>` | Extracts properties by key of `K` from `T` |
| `Omit<T, K>` |   Omits properties of key of `K` in `T`    |

```ts
type Todo = {
  title: string;
  description: string;
  isDone: boolean;
};

type PickedTodo = Pick<Todo, "title" | "isDone">;
type OmittedTodo = Omit<Todo, "description">;
```

|      types      |            description            |
| :-------------: | :-------------------------------: |
| `Extract<T, U>` | Extracts elements of `U` from `T` |
| `Exclude<T, U>` | Excludes elements of `U` from `T` |

```ts
type Permission = "r" | "w" | "x";

type RW1 = Extract<Permission, "r" | "w">;
type RW2 = Exclude<Permission, "x">;
```

|      types       |                                                     description                                                      |
| :--------------: | :------------------------------------------------------------------------------------------------------------------: |
| `NonNullable<T>` | Exclude `null` and `undefined` from `T`. <br> Needs `"strictNullChecks" : true` or `"strict": true` in tsconfig.json |

```ts
type T1 = NonNullable<string | number | null>;
type T2 = NonNullable<number[] | null | undefined>;

const str: T1 = null;     // compile error
const arr: T2 = undefined // compile error
```


<br>

# Nullish Coalescing

ternary operator  

```ts
type Item = {
  id: string,
  name: string,
  description: string?
};

const item = { "001", "item1"};
const d = item.description ? item.description : "???"
```

nullish coalescing (TypeScript >= 3.7, ES >= ES2020) 

```ts
const d = item.description ?? "???"
```

<br>

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

<br>

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

<br>

# TypeScript Config


tsconfig.json

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
| react-jsx | Emittable `import React from 'react'`. <br> Available `TypeScript (> 4.1) and React (>= 17.0)` |
|    jsx    |                                                                                                |


tsconfig.eslint.json  

```json
{
  "extends": "./tsconfig.json",
  "include": [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

<br>

# ESLint

Parckages of ESLint's Ecosystem

|       Part       |         Description          |             Examples             |
| :--------------: | :--------------------------: | :------------------------------: |
|      Parser      | Static code analysis library |    @typescript-eslint/parser     |
|      Plugin      |    Adding original rules     | @typescript-eslint/eslint-plugin |
| Shareable Config |       Multi rules sets       |       eslint-config-airbnb       |


eslintrc.js  

```js
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['.eslintrc.js'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: './tsconfig.eslint.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'prefer-arrow',
    'react',
    'react-hooks',
  ],
  root: true,
  rules: {
    // occur error in `import React from 'react'` with react-scripts 4.0.1
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '_',
        ignoreRestSiblings: false,
        varsIgnorePattern: '_',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'ignore',
      },
    ],
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
```

.eslintignore  

```
build/
public/
**/coverage/
**/node_modules/
**/*.min.js
*.config.js
.*lintrc.js
```
