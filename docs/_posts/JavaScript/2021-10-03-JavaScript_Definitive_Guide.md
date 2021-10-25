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

# Chapter 1. Introduction to JavaScript

## ECMAScript

|version|released|
|:---:|:---:|
|ES5|2010|
|ES6|2015|
|ES2016|2016|
|ES2017|2017|
|...|...|

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

i think it better to use `null` rather than `undefined` when you initialize a variable or a property with either one, because `undefined` seems like accidental, whereas `null` looks like intended to use the variable or the property.  

```javascript
null == undefined   // => true
null === undefined  // => false


null == false;      // => false!
undefined == false; // => false!

let x = null; // or undefined
if (x) console.log("true");
else console.log("false");  // => false; Boolean(null) returns false
```

### Symbols

- every *Symbol* is different from every other *Symbol*
  - this is useful to create unique property names
  - e.g. when you want to add a new property to an object but not to overwrite an existing property with the same name accidentally.  

```js
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

### `eval()`

**Don't use eval()!!**
- `eval()` can be a security hole because user can run code by passing strings to `eval()`.  


### `??` operator

- since ES2020
- first-defined operator
- returns the left-side expression result if the left-side operand is **NOT** `null` or *NOT* `undefined`; otherwise returns the right-side expression result.  

```js
// if maxWidth === 0 then max === 0
const max = maxWidth ??  500;

// if maxWidth === 0 then max === 500
const max = maxWidth || 500
```

### `typeof` operator

Be aware of `null`

```js
typeof null   // "object"
```


### `delete` operator

```js
const o = { x: 1, y: 2 };
delete o.x;
"x" in o  // false

const a = [1, 2, 3];
delete a[2];
2 in a    // false
a.length  // 3  <- Be careful!!
```


# Chapter 5. Statements

## *if* statement

*else* clause is part of the **nearest** *if* statement.  

```js
if (exp1)
  if (exp2)
    statement1
else
  statement2
```

this is equivalent to

```js
if (exp1) {
  if (exp2) {
    statement1
  } else {
    statement2
  }
}
```

## *switch* statement

**Don't forget *break* or *return*!**

### Note:

*default* statement can be placed anywhere in the body (no need to consider the order of *case*s).


```js
switch (exp) {
  case exp:
    statement;
    [break/return;]
  case exp:
    statement;
    [break/return;]
  ...
  default:
    statement;
    [break/return;]
}
```

e.g.

```js
function convert(x) {
  switch (typeof x) {
    case "number":
      return x.toString(16);
    case "string":
      return '"' + x + '"';
    default:
      return String(x);
  }
}
```

## *for/of* statement

- since ES6
- works with *iterable* objects
  - *iterable* objects: *array*s, *string*s, *set*s, *map*s

```js
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sum = 0;
for (const element of data) {
  sum += element;
}
console.log(sum); // 45
```

- infinite loop

```js
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sum = 0;
for (const element of data) {
  sum += element;
  data.push(sum); // pushed element is also iterated
}
```

- iterating object's properties

```js
const o = { x: 1, y: 2, z: 3 };
for (const k of Object.keys(o)) {
  console.log(k); // x, y, z
}

for (const v of Object.values(o)) {
  console.log(v); // 1, 2, 3
}

for (const [k, v] of Object.entries(o)) {
  console.log(k, v);  // x 1, y 2, z 3
}
```

- *string*s are iterated by Unicode codepoint, not by UTF-16 characters

<br>

- iterating *map*s

```js
const m = new Map([
  [0, "one"],
  [1, "two"],
  [2, "three"],
]);
for (const [k, v] of m) {
  console.log(k, v); // 0 "one", 2 "two", 3 "three"
}
```

## *for/in* statement

**Use *for/of* with *Object.keys()* instead of *for/in***

- works with any object
- if object is `null` or `undefined`, the loop is skipped
- iterates the neme of *enumerable* properties

```js
const o = { x: 1, y: 2, z: 3 };
for (const k in o) {
  console.log(k, o[k]); // x 1, y 2, z 3
}
```

## *try/catch/finally*

- *finally* block is executed even when
  - the program returns in the middle of *try* block by *return*, *break*, or *continue*
  - an exception which cannot be handled *catch* block occurs

- *catch*
  - since ES2019: bare *catch* allowed

```js
// bare catch

try {
  // do something
} catch { // catch any exception
  // do something
}
```

## strict mode

see p.122 for detail

- the *with* statement is not allowed
- all variables must be declared (not be hoisted)
- functions invoked as functions (rather than as methods) have a *this* value of `undefined`

### Note:

any code in a *class* body or in an ES6 module is automatically strict code


## *class*

**class declarations are not hoisted!!**  
i.e. cannot use a *class* before the declaration in code


# Chapter 6. Objects

## Testing Properties

use *propertyIsEnumerable()* unless you have a certain reason.  

```js
const o = { x: 1 };
"x" in o; // true
"y" in o; // false
"toString" in o; // true

o.hasOwnProperty("x"); // true
o.hasOwnProperty("y"); // false
o.hasOwnProperty("toString"); // false

o.propertyIsEnumerable("x"); // true
o.propertyIsEnumerable("toString"); // false
Object.prototype.propertyIsEnumerable("toString"); // false

o.x !== undefined; // true
o.y !== undefined; // false
o.toString !== undefined; // true
```

## Shorthand Properties

- since ES6

```js
const x = 1, y = 2;
const o = { x, y }; // {x: 1, y: 2}
```

## Computed Property Names

- since ES6

```js
const PROPERTY_NAME = "p1";
const computePropertyName = () => "p" + 2;

const o = {
  [PROPERTY_NAME]: 1,
  [computePropertyName()]: 2,
}; // { p1: 1, p2: 2 }
```

## Spread Operator

- since ES2018
- works with only own properties, not inherited ones
- **Don't forget it takes O(n) to spread properties**
  - be careful for many spreading in *for* loop

```js
const position = { x: 0, y: 0 };
const dimensions = { width: 100, height: 75 };
const rect = { ...position, ...dimensions };
// { x: 0, y: 0, width: 100, height: 75 }
```

## Shorthand Methods

```js
const square = {
  area() { return this.side * this.side; },  // area: function() { ... }
  side: 10,
};
```

## Getter/Setter

- since ES5
- inheritable

```js
const p = {
  x: 1.0,
  y: 1.0,

  get r() {
    return Math.hypot(this.x, this.y);
  },
  set r(newvalue) {
    const oldvalue = Math.hypot(this.x, this.y);
    const ratio = newvalue / oldvalue;
    this.x *= ratio;
    this.y *= ratio;
  },
  get theta() {
    return Math.atan2(this.y, this.x);
  },
};

console.log(p.r);
console.log(p.theta);
```


<br>

# Chapter 7. Arrays

- JavaScript *array*s are simply a special type of object
  - index is a property whose name is an integer between 0 to 2^32 - 1
    - `a[1]` is equivalent to `a["1"]`
  - *out of bounds* error does not exist because arrays simply return `undefined` if accessed to an index greater than the length

## The Spread Operator

```js
const letters = [..."hello world"];
const rem_dups = [...new Set(letters)];
console.log(rem_dups); // ['h', 'e', 'l','o', ' ', 'w', 'r', 'd']
```

## *Array.from()*

- *Array.from()* can copy not only *array*s but also array-like object

```js
const copy = [...iterable]

const copy = Array.from(arraylike);
```

## *Array.length*

- こマ？ｗ

```js
const a = [1, 2, 3, 4, 5];

a.length = 3;
console.log(a); // [ 1, 2, 3 ]

a.length = 0;
console.log(a); // []

a.length = 5;
console.log(a); // [ <5 empty items> ]
```

## *entries()*

```js
const letters = [..."Hello world"];
let everyother = "";
for (const [index, letter] of letters.entries()) {
  if (index % 2 === 0) {
    everyother += letter;
  }
}
console.log(everyother); // Hlowrd
```

## *forEach()*

- cannot break the loop in the middle

## *find()*

- return `undefined` if the matching element does not exist in the array

## *findIndex()*

- return `-1` if the matching element does not exist in the array

## *every()*

- return `false` as soon as a falsy value is found
- return `true` for an empty array

## *some()*

- return `true` as soon as a truthy value is found
- return `true` for an empty array


## *slice()*

```js
const a = [1, 2, 3, 4, 5];
const b = a.slice(-4, -1);
console.log(`a=${a}, b=${b}`); // a=1,2,3,4,5, b=2,3,4
b[0] = 100;
console.log(`a=${a}, b=${b}`); // a=1,2,3,4,5, b=100,3,4
```

## *splice()*

- return deleted elements as an array

### Note:

the second arg is a **length (or the num of elements to be deleted)**, not an end position.

```
splice(start, length)
```

```js
const a = [1, 2, 3, 4, 5, 6, 7, 8];
const x = a.splice(4);    // x=5,6,7,8, a=1,2,3,4
const y = a.splice(1, 2); // y=5,6,7,8, a=1,4
const z = a.splice(1, 1); // z=4, a=1

const a = [1, 2, 3, 4, 5];
a.splice(2, 0, 100, 200);             // [1, 2, 100, 200, 3, 4, 5]
a.splice(2, 2, [1, 2], 3);            // [ 1, 2, [ 1, 2 ], 3, 3, 4, 5 ]
a.splice(a.length, 0, ...[300, 400]); // [ 1, 2, [ 1, 2 ], 3, 3, 4, 5, 300, 400 ]
```

## *indexOf()*

- compare elements by `===`
- but **cannot** find `NaN`

## *includes()*

- compare elements by `===`
- can find `NaN`

```js
const a = [1, true, 3, NaN];

a.includes(NaN); // true
a.indexOf(NaN); // -1
```

## *sort()*

- sorts an array by **alphabetical** order as default
- *function(a, b)* as the second argument
  - returns greater than 0 -> should replace *a* and *b*
  - returns 0 -> order of *a* and *b* is irrelevant
  - returns less than 0 -> should not replace *a* and *b*

```js
const a = [33, 4, 1111, 222];
a.sort(); // [ 1111, 222, 33, 4 ] <- be careful!!

a.sort((a, b) => a - b); // [ 4, 33, 222, 1111 ]

a.sort((a, b) => b - a); // [ 1111, 222, 33, 4 ]
```

```js
const ss = ["ant", "Bug", "cat", "Dog"];
ss.sort(); // [ 'Bug', 'Dog', 'ant', 'cat' ]

ss.sort((s: string, t: string) => {
  const a = s.toLowerCase();
  const b = t.toLowerCase();

  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}); // [ 'ant', 'Bug', 'cat', 'Dog' ]
```

## *reverse()*

- in-place

<br>

# Chapter 8. Functions

JavaScript functions are simply a kind of JavaScript obects.  

## Properties

- length: arity of the function
- name: the name of the function


## Declarations

- **function declarations are hoisted** to the top of the code
  - functions defined as expression are **not** hoisted
- a function defined within a block only exists within that block

## `this`

**`this` is a *keyward*, not a variable**

## Arrows vs. Others

||arrows|others|
|:---:|:---:|:---:|
|`this`|the environment in which they are defined|invocation context|
|`prototype`|not exist|exists|


```js
const o = {
  m: function () {
    const self = this;
    console.log("this === o in m:", this === o); // true

    function f() {
      console.log("this === o in f:", this === o); // false
      console.log("self === o in f:", self === o); // true
    }

    const g = () => {
      console.log("this === o in g:", this === o); // true
    };

    f();
    g();
  },
};
o.m();
```

## Constructor

- parentheses can be omitted

```js
o = new Object();
o = new Object; // equivalent to new Object()
```

## Indirect Invocation

- JavaScript functions are objects which has two methods
  - *call()*
  - *apply()*
- **a function is callable as a method of any object** even if it is not actually a method of the object

### *call()* and *apply()*

- first argument: invocation context which becomes the value of the `this` within the body of the function
  - cannot override `this` of array funcitons


```js
function compose(f, g) {
  return function (...args) {
    return f.call(this, g.apply(this, args));
  };
}
```

```js
const trace = (o, m) => {
  const original = o[m];
  o[m] = function (...args) {
    console.log(new Date(), "Entering:", m);
    const result = original.apply(this, args);
    console.log(new Date(), "Exiting:", m);
    return result;
  };
};

const o = {
  sum: function (start, end) {
    let s = 0;
    for (let i = start; i < end; i++) {
      s += i;
    }
    return s;
  },
};

trace(o, "sum", 3, 7);
console.log(o["sum"](3, 7));
// 2021-10-24T13:28:43.769Z Entering: sum
// 2021-10-24T13:28:43.773Z Exiting: sum
// 18
```

### *bind()*

- binds function *f* to *object* (i.e. let *f* to be a method of *object*)
- apply *args* to the parameters of *f* partially

```
f.bind(object, ...args)
```

```js
function f(y) {
  return this.x + y;
}
const o = { x: 1 };
const g = f.bind(o); // bind f to o
console.log(g(2)); // 3; equivalent to o.f(2)

const p = { x: 10, g };
console.log(p.g(2)); // 3; g is still bound to o
```

```js
const sum = (x, y) => x + y;
const succ = sum.bind(null, 1);
console.log(succ(2)); // 3
```


## Implicit Function Invocation

JavaScript language features implicitly invoke functions.  

see p.191

## Parameter Defaults

- since ES6
- default arguments are evaluated **when the function is called**, not defined

```js
const rectangle = (width, height = width * 2) => ({ width, height });

rectangle(1); // { width: 1, height: 2 }
```

## Rest Parameters

- since ES6
  - `arguments` object used before
- if there is no any rest argument, the value of the parameter get to be an empty array.

```js
const max = (first = -Infinity, ...rest) => {
  let maxValue = first;
  for (const n of rest) {
    if (n > maxValue) maxValue = n;
  }
  return maxValue;
};

max(1, 10, 100, 2, 3, 1000, 4, 5, 6); // 1000
```

```js
const timed = (f) => {
  return (...args) => {
    console.log(`Entering function ${f.name}`);
    const startTime = Date.now();
    try {
      return f(...args);
    } finally {
      console.log(`Exiting ${f.name} after ${Date.now() - startTime}ms`);
    }
  };
};

const benchmark = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; ++i) sum += i;
  return sum;
};

console.log(timed(benchmark)(1_000_000));
// Entering function benchmark
// Exiting benchmark after 3ms
// 500000500000
```

## Destructing Function Arguments into Parameters


```js
const vectorMultiply = ({ x, y, z=0 }, scalar) => (
  { x: x * scalar, y: y * scalar , z: z * scalar}
);

console.log(vectorMultiply({ x: 1, y: 2 }, 2)); // { x: 2, y: 4, z: 0 }


// {property name: parameter name}
const vectorAdd = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => ({
  x: x1 + x2,
  y: y1 + y2,
});

console.log(vectorAdd({ x: 1, y: 2 }, { x: 3, y: 4 })); // { x: 4, y: 6 }
```

rest props are spreadable
- since ES2018

```js
const vectorMultiply = ({ x, y, z = 0, ...props }, scalar) => ({
  x: x * scalar,
  y: y * scalar,
  z: z * scalar,
  ...props,
});
```

## Function Properties

なるほど～

```js
const uniqueInteger = () => uniqueInteger.counter++;
uniqueInteger.counter = 0;

console.log(uniqueInteger()); // 0
console.log(uniqueInteger()); // 1
```

```js
const factorial = (n) => {
  if (Number.isInteger(n) && n > 0) {
    if (!(n in factorial)) {
      factorial[n] = n * factorial(n - 1);
    }
    return factorial[n];
  } else {
    return NaN;
  }
};

factorial[1] = 1; // initialize factorial function

console.log(factorial(6)); // 720
console.log(factorial[5]); // 120; cached value
```

## Closures

### lexical scope

functions are executed using the variable scope that was in effect **when they were defined**, not the variable scope that is in effect when they are invoked.  

おもしろい

```js
const counter = () => {
  let n = 0;
  return {
    count: () => ++n,
    reset: () => {n = 0;},
  };
};

const c1 = counter(), c2 = counter();

console.log(c1.count()); // 1
console.log(c2.count()); // 1

c1.reset();

console.log(c1.count()); // 1
console.log(c2.count()); // 2
```


```js
const counter = (n) => ({
  get count() {
    return ++n;
  },
  set count(m) {
    if (m > n) n = m;
    else throw Error("count can only be set to a larger value");
  },
});

const c = counter(1000);

console.log(c.count); // 1001
console.log(c.count); // 1002
c.count = 2000;
console.log(c.count); // 2001
c.count = 2000; // Error: count can only be set to a larger value
```

fantastic!

```js
function memoize(f) {
  const cache = new Map();

  return function (...args) {
    const key = args.length + args.join("+");
    if (cache.has(key)) {
      return cache.get(key);
    } else {
      const res = f.apply(this, args);
      cache.set(key, res);
      return res;
    }
  };
}

// recursive functions share the map object
const factorial = memoize(function (n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
});

console.log(factorial(5)); // 120
```

<br>

# Chapter 9. Classes

> it is bast to understand up front that JavaScript's classes and prototype-based inheritance mechanism are substantially different from the classes and class-based inheritance mechanism of Java and similar languages.  

- in JavaScript, a class is a set of objects that inherit properties from the same prototype object; *prototype-based inheritance*


## Constructors

**constructors are the public identity of a class**
- in JavaScript, which of a class a object is which from a constructor the object is created

```js
function range(from, to) {
  const r = Object.create(range.methods);

  r.from = from;
  r.to = to;

  return r;
}

range.methods = {
  includes(x) {
    return this.from <= x && x <= this.to;
  },
  *[Symbol.iterator]() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) {
      yield x;
    }
  },
  toString() {
    return "(" + this.from + "..." + this.to + ")";
  },
};

const r = range(1, 3);
console.log(r.includes(2)); // true
console.log(r.toString()); // (1...3)
const a = [...r];
console.log(a); // [ 1, 2, 3 ]
```

if you use a constructor with *new* keyword
- a new object is created automatically before the constructor is called
- the new object inherits from *prototype* property of the function
- the constructor can access the new object through `this`
  - i.e. the constructor is called as a method of the object
- the new object is returned automatically

### Note:

arrow functions cannot be used as constructor as this way because arrows inherit `this` from the context in which the arrows are defined, which means that the `this` of an arrow refers to the prototype object, not a new object.  

```js
function Range(from, to) {
  this.from = from;
  this.to = to;
}

Range.prototype = {
  includes: function (x) {
    return this.from <= x && x <= this.to;
  },
  [Symbol.iterator]: function* () {
    for (let x = Math.ceil(this.from); x <= this.to; x++) {
      yield x;
    }
  },
  toString: function () {
    return "(" + this.from + "..." + this.to + ")";
  },
};

const r = new Range(1, 3);
console.log(r.includes(2)); // true
console.log(r.toString()); // (1...3)
const a = [...r];
console.log(a); // [ 1, 2, 3 ]
```

### *instanceof()*

```js
o instanceof C
```

- returns `true` if `o` inherits from `C.prototype`
- the inheritance need not be direct
  - e.g. `true` when right-hand side is a subclass of `C`

### *isPrototypeOf()*

```js
range.methods.isPrototypeOf(r);
```

- a way to test the prototype chain of an object without the constructor
