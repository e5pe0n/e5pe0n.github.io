---
title: "Note: JavaScript: The Definitive Guide"
categories:
  - Note
tags:
  - Programming
  - JavaScript
last-modified-at: 2021-08-07
---

# JavaScript: The Definitive Guide

- 7 the Edtion
- David Flanagan
- O'Relly

<br>

# Chapter 3. Types, Values, and Variables

## Primitives

### Numbers

- arithmetic operations do not raise errors in cases of overflow, underflow, or division by zero
  - evaluate to
    - `Nan`
    - `Infinity` or `-Infinity`
    - `0` or `-0`

```javascript
0 == -0   // true
0 === -0  // true
```

string conversions

```javascript
let n = 123456.789;

n.toFixed(0); // "123457"
n.toFixed(2); // "123456.79"
n.toFixed(5); // "123456.78900"

n.toExponential(1); // "1.2e+5"
n.toExponential(3); // "1.235e+5"

n.toPrecision(4); // "1.235e+5"
n.toPrecision(7); // "123456.8"
n.toPrecision(10); // "123456.7890"
```

#### `NaN`

comparison including a `NaN` always returns `false`,
therefore must use *Number.isNaN()*.

```javascript
x = NaN

x === NaN       // => false!
Number.isNan(x) // => true

```

### BigInt

- 64-bit integer

```javascript
0 == 0n   // => true
0 === 0n  // => false!
```


### Strings

- **immutable**
- two strings are equal if and only if the length and the character at each index is the same.


### `null` and `undefined`

```javascript
null == undefined   // => true
null === undefined  // => false


null == false;      // => false!
undefined == false; // => false!

let x = null; // or undefined
if (x) console.log("true");
else console.log("false");  // => false; Boolean(null) returns false
```


## Objects

### Arrays

two distinct arrays are not equal even if they have the same elements in the same order

```javascript
let a = [], b = [];
a === b   // => false!

let a = [];
let b = a;
a === b   // => true

function equalArrays(a, b) {
  if (a === b) return true;
  if (a.length != b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] != b[i]) return false;
  }
  return true;
}
```

copy an array

```javascript
let a = ["a", "b", "c"];
let b = Array.from(a);
```

### Date

```js
d1 = new Date(2021, 10, 5, 20, 32, 10);
d2 = new Date(2021, 10, 5, 20, 32, 11);
d1 < d2; // true; `>` operator converts Date objects to numbers (timestamp)
```

## Type Conaversions

see p.45 for details

```javascript
10 + " object";   // "10 object"
"7" + "4";        // 28
let n = 1 - "x";  // n == NaN
n + " objects"    // "NaN object"

null + 1;   // 1; null == 0
```

```javascript
null + 1; // => 1
"" + 1; // => 1

Boolean({}); // => true!
Boolean([]); // => true!
```

idioms for type conversion

```javascript
x + ""  // => String(x)
+x      // => Number(x)
x-0     // => Number(x)
!!x     // => Boolean(x)
```

|Algorithms|Method|
|:---:|:---:|
|prefer-string|`toString()` -> `ValueOf()`|
|prefer-number|`ValueOf()` -> `toString()`|


## *var*

Don't Use *var*!

see the reason why strict mode is used => p.56

it is legal to declare the same variable multiple times with *var*; re-initialized each time

### *hoisting*

declaration with *var* is *hoisted* to the top of the enclosing function.  
therefore undeclared variables can be used before the declaration!

```js
// this is legal code

x = 5; // Assign 5 to x

elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x;                     // Display x in the element

var x; // Declare x -> hoisted to the top
```

## Destructing Assignment

- since ES6

```js
let [x, y] = [1, 2];
[x, y] = [x + 1, y + 1];

[x, y] = [y, x] // swap
```

```js
let o = { x: 1, y: 2 };
for (const [name, value] of Object.entries(o)) {
  console.log(name, value);
}
```

```js
let [x, y] = [1];         // x == 1, y == undefined
[x, y] = [1, 2, 3];       // x == 1, y == 2
[, x, , y] = [1, 2, 3, 4] // x == 2, y == 4


let [x, ...y] = [1, 2, 3, 4];  // x == 1, y == [2, 3, 4]
let [a, [b, c]] = [1, [2, 2.5], 3]; // a == 1, b == 2, c == 2.5


let [first, ...rest] = "Hello"; // first == "H", rest == ["e", "l", "l", "o"]
```

```js
let transparent = { r: 0.0, g: 0.1, b: 0.2, a: 1.0 };
let {r, g, b} = transparent;  // r == 0.0, g == 0.1, b == 0.2

let {r: red, g: green, b: blue} = transparent;
console.log(red, green blue); // 0.0, 0.1, 0.2
```

```js
let points = { p1: [1, 2], p2: [3, 4] };
let { p1: [x1, y1], p2: [x2, y2] } = points;  // x1 == 1, y1 ==2, x2 == 3, y2 == 4
```

<br>

# Chapter 4. Expressions and Operators

## Property Access Expressions

```js
const a = [10, 11, 12, 13, 14];
a[0]; // 10
a["0"]; // 10!

const o = {};
o.m;  // undefined; no error occurs!
```

### Conditional Property Access

- since ES2020

```
expression ?. identifier
expression ?. [ expression ]
```

if expression before `?.` evaluates to `null` or `undefined`, the entire expression immediately evaluates to `undefined` (remaining expressions are not evaluated).  

```js
let a = { b: null };
// called *optional chaining*
a.b?.c.d  // undefined

let index = 0;
let a;
a?.[index++]; // => undefined; index == 0
```

### Conditional Invocation

- since ES2020

- checks `null` or `undefined`

```js
function square(x, log) { // `log` is a function as an optional arg
  log?.(x);
  return x * x;
};
```

## Operators

see p.69

### Associative

right-to-left associatives

```js
y = a ** b ** c;  // ((a ** b) ** c)
x = --y;          // (-(-y))
w = x = y = z     // (x = (y = z))
q = a ? b : c ? d : e ? f : g;  // (a ? b : (c ? d : (e ? f : g)))
```
### `**` operator

- since ES2016

**operators `??` and `**` are not defined clearly about their precedence so must parentheses expression using them (since ES2020)**.


### `/` operator

**Does not trancate the fraction part!**

```js
5 / 1;  // 5
5 / 2;  // 2.5
```

### `+` operator

```js
1 + 2;          // 3
"1" + "2";      // "12"
"1" + 2;        // "12"
1 + {};         // 1[object Object]
true + true;    // 2
2 + null;       // 2
2 + undefined;  // Nan
```

### Bitwise Operators

first, operands are converted to 32-bit int (`NaN`, `Infinity`, `-Infinity` are converted to 0).  

`>>>` is not used for *BigInt* because *BigInt* is not implemented as 2's complement.  

### `in` operator

**Not the same as Python's one at all!!**

first, left-side operand is converted to string.  
then **returns `true` if right-side object has left-side operand as a property**.  

```js
const point = { x: 1, y: 1 };
"x" in point;         // true
"z" in point;         // false
"toString" in point;  // true

const data = [7, 8, 9];
"0" in data;  // true
1 in data;    // true
3 in data;    // false
```
