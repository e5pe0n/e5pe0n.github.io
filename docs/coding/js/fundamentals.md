# JavaScript: The Definitive Guide

- 7th Edtion
- David Flanagan
- O'Relly

## Chapter 1. Introduction to JavaScript

### ECMAScript

| version | released |
| :-----: | :------: |
|   ES5   |   2010   |
|   ES6   |   2015   |
| ES2016  |   2016   |
| ES2017  |   2017   |
|   ...   |   ...    |

## Chapter 3. Types, Values, and Variables

### Primitives

#### Numbers

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

##### `NaN`

comparison including a `NaN` always returns `false`,
therefore must use *Number.isNaN()*.

```javascript
x = NaN

x === NaN       // => false!
Number.isNan(x) // => true

```

#### BigInt

- 64-bit integer

```javascript
0 == 0n   // => true
0 === 0n  // => false!
```


#### Strings

- **immutable**
- two strings are equal if and only if the length and the character at each index is the same.


#### `null` and `undefined`

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

#### Symbols

- every *Symbol* is different from every other *Symbol*
  - this is useful to create unique property names
  - e.g. when you want to add a new property to an object but not to overwrite an existing property with the same name accidentally.  


### Objects

#### Arrays

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

#### Date

```js
d1 = new Date(2021, 10, 5, 20, 32, 10);
d2 = new Date(2021, 10, 5, 20, 32, 11);
d1 < d2; // true; `>` operator converts Date objects to numbers (timestamp)
```

### Type Conaversions

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

|  Algorithms   |           Method            |
| :-----------: | :-------------------------: |
| prefer-string | `toString()` -> `ValueOf()` |
| prefer-number | `ValueOf()` -> `toString()` |


### *var*

Don't Use *var*!

see the reason why strict mode is used => p.56

it is legal to declare the same variable multiple times with *var*; re-initialized each time

#### *hoisting*

declaration with *var* is *hoisted* to the top of the enclosing function.  
therefore undeclared variables can be used before the declaration!

```js
// this is legal code

x = 5; // Assign 5 to x

elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x;                     // Display x in the element

var x; // Declare x -> hoisted to the top
```

### Destructing Assignment

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

## Chapter 4. Expressions and Operators

### Property Access Expressions

```js
const a = [10, 11, 12, 13, 14];
a[0]; // 10
a["0"]; // 10!

const o = {};
o.m;  // undefined; no error occurs!
```

#### Conditional Property Access

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

#### Conditional Invocation

- since ES2020

- checks `null` or `undefined`

```js
function square(x, log) { // `log` is a function as an optional arg
  log?.(x);
  return x * x;
};
```

### Operators

see p.69

#### Associative

right-to-left associatives

```js
y = a ** b ** c;  // ((a ** b) ** c)
x = --y;          // (-(-y))
w = x = y = z     // (x = (y = z))
q = a ? b : c ? d : e ? f : g;  // (a ? b : (c ? d : (e ? f : g)))
```

#### `**` operator

- since ES2016

**operators `??` and `**` are not defined clearly about their precedence so must parentheses expression using them (since ES2020)**.


#### `/` operator

**Does not trancate the fraction part!**

```js
5 / 1;  // 5
5 / 2;  // 2.5
```

#### `+` operator

```js
1 + 2;          // 3
"1" + "2";      // "12"
"1" + 2;        // "12"
1 + {};         // 1[object Object]
true + true;    // 2
2 + null;       // 2
2 + undefined;  // Nan
```

#### Bitwise Operators

first, operands are converted to 32-bit int (`NaN`, `Infinity`, `-Infinity` are converted to 0).  

`>>>` is not used for *BigInt* because *BigInt* is not implemented as 2's complement.  

#### `in` operator

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

#### `eval()`

**Don't use eval()!!**
- `eval()` can be a security hole because user can run code by passing strings to `eval()`.  


#### `??` operator

- since ES2020
- first-defined operator
- returns the left-side expression result if the left-side operand is **NOT** `null` or *NOT* `undefined`; otherwise returns the right-side expression result.  

```js
// if maxWidth === 0 then max === 0
const max = maxWidth ??  500;

// if maxWidth === 0 then max === 500
const max = maxWidth || 500
```

#### `typeof` operator

Be aware of `null`

```js
typeof null   // "object"
```


#### `delete` operator

```js
const o = { x: 1, y: 2 };
delete o.x;
"x" in o  // false

const a = [1, 2, 3];
delete a[2];
2 in a    // false
a.length  // 3  <- Be careful!!
```


## Chapter 5. Statements

### *if* statement

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

### *switch* statement

**Don't forget *break* or *return*!**

**Note:**  

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

### *for/of* statement

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

### *for/in* statement

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

### *try/catch/finally*

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

### strict mode

see p.122 for detail

- the *with* statement is not allowed
- all variables must be declared (not be hoisted)
- functions invoked as functions (rather than as methods) have a *this* value of `undefined`

**Note:**  

any code in a *class* body or in an ES6 module is automatically strict code


### *class*

**class declarations are not hoisted!!**  
i.e. cannot use a *class* before the declaration in code


## Chapter 6. Objects

### Testing Properties

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

### Shorthand Properties

- since ES6

```js
const x = 1, y = 2;
const o = { x, y }; // {x: 1, y: 2}
```

### Computed Property Names

- since ES6

```js
const PROPERTY_NAME = "p1";
const computePropertyName = () => "p" + 2;

const o = {
  [PROPERTY_NAME]: 1,
  [computePropertyName()]: 2,
}; // { p1: 1, p2: 2 }
```

### Spread Operator

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

### Shorthand Methods

```js
const square = {
  area() { return this.side * this.side; },  // area: function() { ... }
  side: 10,
};
```

### Getter/Setter

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


## Chapter 7. Arrays

- JavaScript *array*s are simply a special type of object
  - index is a property whose name is an integer between 0 to 2^32 - 1
    - `a[1]` is equivalent to `a["1"]`
  - *out of bounds* error does not exist because arrays simply return `undefined` if accessed to an index greater than the length

### The Spread Operator

```js
const letters = [..."hello world"];
const rem_dups = [...new Set(letters)];
console.log(rem_dups); // ['h', 'e', 'l','o', ' ', 'w', 'r', 'd']
```

### *Array.from()*

- *Array.from()* can copy not only *array*s but also array-like object

```js
const copy = [...iterable]

const copy = Array.from(arraylike);
```

### *Array.length*

**Be Careful!**


```js
const a = [1, 2, 3, 4, 5];

a.length = 3;
console.log(a); // [ 1, 2, 3 ]

a.length = 0;
console.log(a); // []

a.length = 5;
console.log(a); // [ <5 empty items> ]
```

### *entries()*

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

### *forEach()*

- cannot break the loop in the middle

### *find()*

- return `undefined` if the matching element does not exist in the array

### *findIndex()*

- return `-1` if the matching element does not exist in the array

### *every()*

- return `false` as soon as a falsy value is found
- return `true` for an empty array

### *some()*

- return `true` as soon as a truthy value is found
- return `true` for an empty array


### *slice()*

```js
const a = [1, 2, 3, 4, 5];
const b = a.slice(-4, -1);
console.log(`a=${a}, b=${b}`); // a=1,2,3,4,5, b=2,3,4
b[0] = 100;
console.log(`a=${a}, b=${b}`); // a=1,2,3,4,5, b=100,3,4
```

### *splice()*

- return deleted elements as an array

**Note:**  

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

### *indexOf()*

- compare elements by `===`
- but **cannot** find `NaN`

### *includes()*

- compare elements by `===`
- can find `NaN`

```js
const a = [1, true, 3, NaN];

a.includes(NaN); // true
a.indexOf(NaN); // -1
```

### *sort()*

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

### *reverse()*

- in-place


## Chapter 8. Functions

JavaScript functions are simply a kind of JavaScript obects.  

### Properties

- length: arity of the function
- name: the name of the function


### Declarations

- **function declarations are hoisted** to the top of the code
  - functions defined as expression are **not** hoisted
- a function defined within a block only exists within that block

### `this`

**`this` is a *keyward*, not a variable**

### Arrows vs. Others

|             |                  arrows                   |       others       |
| :---------: | :---------------------------------------: | :----------------: |
|   `this`    | the environment in which they are defined | invocation context |
| `prototype` |                 not exist                 |       exists       |


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

### Constructor

- parentheses can be omitted

```js
o = new Object();
o = new Object; // equivalent to new Object()
```

### Indirect Invocation

- JavaScript functions are objects which has two methods
  - *call()*
  - *apply()*
- **a function is callable as a method of any object** even if it is not actually a method of the object

#### *call()* and *apply()*

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

#### *bind()*

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


### Implicit Function Invocation

JavaScript language features implicitly invoke functions.  

see p.191

### Parameter Defaults

- since ES6
- default arguments are evaluated **when the function is called**, not defined

```js
const rectangle = (width, height = width * 2) => ({ width, height });

rectangle(1); // { width: 1, height: 2 }
```

### Rest Parameters

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

### Destructing Function Arguments into Parameters


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

### Function Properties


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

### Closures

#### lexical scope

functions are executed using the variable scope that was in effect **when they were defined**, not the variable scope that is in effect when they are invoked.  


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


## Chapter 9. Classes

> it is bast to understand up front that JavaScript's classes and prototype-based inheritance mechanism are substantially different from the classes and class-based inheritance mechanism of Java and similar languages.  

- in JavaScript, a class is a set of objects that inherit properties from the same prototype object; *prototype-based inheritance*


### Constructors

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

**Note:**  

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

### *class* keyword

- **class declarations are NOT hoisted**


```js
class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  static parse(s) {
    const matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
    if (!matches) {
      throw new TypeError(`Cannot parse Range from "${s}".`);
    }
    return new Range(parseInt(matches[1]), parseInt(matches[2]));
  }

  includes(x) {
    return this.from <= x && x <= this.to;
  }
  *[Symbol.iterator]() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) {
      yield x;
    }
  }
  toString() {
    return `(${this.from}...${this.to})`;
  }
}

const r = new Range(1, 3);
console.log(r.includes(2)); // true
console.log(r.toString()); // (1..3)
const a = [...r];
console.log(a); // [ 1, 2, 3 ]

const r2 = Range.parse("(1...10)");
console.log(r2); // Range { from: 1, to: 10 }
```

#### *instanceof()*

```js
o instanceof C
```

- returns `true` if `o` inherits from `C.prototype`
- the inheritance need not be direct
  - e.g. `true` when right-hand side is a subclass of `C`

#### *isPrototypeOf()*

```js
range.methods.isPrototypeOf(r);
```

- a way to test the prototype chain of an object without the constructor

### Static Methods

- static methods are **defined as properties of the constructor** rather than properties of the prototype object
  - in *Range* class example above, we call static method *parse* such as `Range.parse()` rather than `Range.prototype.parse()`


### Static Fields

- static fields must be defined out of the class body
  - the class should be defined already

```js
class Complex {
  constructor(real, imaginary) {
    this.r = real;
    this.i = imaginary;
  }

  plus(that) {
    return new Complex(this.r + that.r, this.i + that.i);
  }
  times(that) {
    return new Complex(
      this.r * that.r - this.i * that.i,
      this.r * that.i + this.i * that.r
    );
  }

  static sum(c, d) {
    return c.plus(d);
  }
  static product(c, d) {
    return c.times(d);
  }

  get real() {
    return this.r;
  }
  get imaginary() {
    return this.i;
  }
  get magnitude() {
    return Math.hypot(this.r, this.i);
  }

  toString() {
    return `{${this.r}, ${this.i}}`;
  }

  equals(that) {
    return that instanceof Complex && this.r === that.r && this.i === that.i;
  }
}

// static fields
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);

const c = new Complex(2, 3);
const d = new Complex(c.i, c.r);
console.log(c.plus(d).toString()); // {5, 5}
console.log(c.magnitude); // 3.6055512754639896
console.log(Complex.product(c, d)); // Complex { r: 0, i: 13 }
console.log(Complex.ZERO.toString()); // {0, 0}
```


### Adding Methods to Existing Classes

- JavaScript inheritance is to refer to a prototype object
- therefore an object inherits properties from its prototype **even if the properties of the prototype change after the object is created.**


### Subclasses

you can create subclass to share the behavior of an object, but **prefer *composition* (or *delegation*)** to *inheritance*

#### JavaScript Inheritance Mechanism

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

function Span(start, span) {
  if (span >= 0) {
    this.from = start;
    this.to = start + span;
  } else {
    this.to = start;
    this.from = start + span;
  }
}

// Span prototype object inherits properties of Range prototype object
Span.prototype = Object.create(Range.prototype);
Span.prototype.constructor = Span;

Span.prototype.toString = function () {
  return `(${this.from}... +${this.to - this.from})`;
};

// Span instance s inherits not only the properties of the prototype of Span
// but also the properties of the prototype of Range
// because Span prototype object inherits the properties of the Range prototype object
const s = new Span(0, 10);
console.log(s.toString()); // (0... +10)
```

#### *extends* and *super*

- since ES6

```js
class TypedMap extends Map {
  constructor(keyType, valueType, entries) {
    if (entries) {
      for (const [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
        }
      }
    }
    super(entries);

    // `this` must be placed after `super`
    this.keyType = keyType;
    this.valueType = valueType;
  }

  set(key, value) {
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }
    return super.set(key, value);
  }
}
```

### Delegation Instead of Inheritance

```js
class Histogram {
  constructor() {
    this.map = new Map();
  }

  count(key) {
    return this.map.get(key) || 0;
  }
  has(key) {
    return this.count(key) > 0;
  }
  get size() {
    return this.map.size;
  }
  add(key) {
    this.map.set(key, this.count(key) + 1);
  }
  delete(key) {
    const cnt = this.count(key);
    if (cnt === 1) {
      this.map.delete(key);
    } else if (cnt > 1) {
      this.map.set(key, cnt - 1);
    }
  }
  [Symbol.iterator]() {
    return this.map.keys();
  }
  keys() {
    return this.map.keys();
  }
  values() {
    return this.map.values();
  }
  entries() {
    return this.map.entries();
  }
}
```


## Chapter 10. Modules

### Node Modules

#### Exports one by one

```
dir/
  - stats.js
  - main.js
```

```js
// stats.js
const sum = (x, y) => x + y;
const square = (x) => x * x;

exports.mean = (data) => data.reduce(sum) / data.length;
exports.stddev = function (d) {
  const m = exports.mean(d);
  return Math.sqrt(
    d
      .map((x) => x - m)
      .map(square)
      .reduce(sum) /
      (d.length - 1)
  );
};
```

```js
// main.js
const stats = require("./stats.js");
console.log(stats.mean([1, 2, 3, 4, 5])); // 3

const { stddev } = require("./stats");  // js ext can be omit
console.log(stddev([1, 2, 3, 4, 5])); // 1.5811388300841898
```

#### Exports all together

```
dir/
  - stats2.js
  - main2.js
```

```js
// stats2.js
const sum = (x, y) => x + y;
const square = (x) => x * x;
const mean = (data) => data.reduce(sum) / data.length;
const stddev = (d) => {
  const m = mean(d);
  return Math.sqrt(
    d
      .map((x) => x - m)
      .map(square)
      .reduce(sum) /
      (d.length - 1)
  );
};

module.exports = { mean, stddev };
```

```js
// main2.js
const stats = require("./stats2.js");
console.log(stats.mean([1, 2, 3, 4, 5])); // 3

const { stddev } = require("./stats2");
console.log(stddev([1, 2, 3, 4, 5])); // 1.5811388300841898
```

### ES6 Modules

- *import* and *export* are static
  - *import*s are hoisted to the top of the code

#### Re-Exports

```js
import { mean } from "./stats/mean.js";
import { stddev } from "./stats/stddev.js";
export { mean, stddev };

// re-export statement equivalent to above
export { mean } from "./stats/mean.js";
export { stddev } from "./stats/stddev.js";
```


## Chapter 11. The JavaScript Standard Library

### Sets

- members are distinguished by `===`
  - it determines object equality by reference (arrays are compared by reference too)
- holds insertion order

#### Constructor

```js
const s = new Set(iterable);
```


#### size

```js
s.size  // array.length like
```

#### *add()*

returns the set itself

```js
s.add("a").add("b").add("c")
```

#### *delete()*

returns `true` if an element is deleted from the set


#### iteration

```js
const s = new Set([1, 2, 3]);
for (const x of s) {
  console.log(x); // 1 2 3
}

const arr = [...s];
const ma = Math.max(...s);
```

### Maps

- holds insertion order (at iteration)

#### Constructor

```js
const m = new Map([
  ["one", 1],
  ["two", 2],
]);

const clone = new Map(m);

const o = { x: 1, y: 2 };
const p = new Map(Object.entries(o)); // new Map([["x", 1], ["y", 2]])
```

#### size

```js
m.size  // array.length like
```

#### *set()*

```js
m.set("one", 1).set("two", 2);
```

#### *get()*

returns `undefined` if given a key does not exist in the map.

#### *delete()*

returns `true` if the deletion succeeded.

#### iteration

```js
const m = new Map([
  ["one", 1],
  ["two", 2],
]);

for (const [key, value] of m) {
  console.log(`${key}: ${value}`);
}
// one: 1
// two: 2

const arr = [...m]; // [["one", 1], ["two", 2]]
```

### Typed Arrays

- since ES6
- `Array.isArray(typedArray)` returns `false`

#### Constructors

- *Int8Array()*
- *Uint8Array()*
- *Uint8ClampedArray()*
- *Int16Array()*
- *Uint16Array*
- *Int32Array()*
- *Uint32Array()*
- *BigInt64Array()*
- *BigUint64Array()*
- *Float32Array()*
- *Float64Array()*

#### Initialization

```js
const bytes = new Uint8Array(1024); // 1024 bytes

const white = Uint8ClampedArray.of(255, 255, 255, 0)

const ints = Uint32Array.from(white);
```

#### Array Buffer

- a *TypedArray* object has *buffer* property holding an *ArrayBuffer* object
- *ArrayBuffer* object itself cannot be accessed to read and write the bytes

```js
const buf = new ArrayBuffer(1024 * 1024);
buf.size  // 1 MB

const asbytes = new Uinit8Array(buf);
const asints = new Int32Array(buf);
const lastKB = new Uint8Array(buf, 1023 * 1024)
const ints2ndKB = new Int32Array(buf, 1024, 256);
```

#### Methods

- *slice()*: returns **new** array
- *subarray()*: returns a reference

```js
const bytes = new Uint8Array(12);
const pattern = new Uint8Array([0, 1, 2, 3]);

bytes.set(pattern);
console.log(bytes.slice(0, 12));
// Uint8Array(12) [0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0]

bytes.set(pattern, 4);
console.log(bytes.slice(0, 12));
// Uint8Array(12) [0, 1, 2, 3, 0, 1, 2, 3, 0, 0, 0, 0]

bytes.set([0, 1, 2, 3], 8);
console.log(bytes.slice(0, 12));
// Uint8Array(12) [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]

const last3 = bytes.subarray(bytes.length - 3, bytes.length);
console.log(last3); // Uint8Array(3) [ 1, 2, 3 ]
```

### RegExp

#### *replace()*

- g-flag: replace all occurence
- i-flag: case-insensitive

```js
const s = "JAVASCRIPT\tjavaSCRIPT\nJAVAscript";
const t = s.replace(/javascript/gi, "JavaScript");
console.log(t);
// JavaScript      JavaScript
// JavaScript

const quote = /"([^"]*)"/g;
const text = 'He said "stop"';
const res = text.replace(quote, "!!$1!!");
console.log(res); // He said !!stop!!

const quote2 = /"(?<quotedText>[^"]*)"/g;
const res2 = text.replace(quote2, "!!$<quotedText>!!");
console.log(res2); // He said !!stop!!

const d = "15 times 15 is 225";
console.log(d.replace(/\d+/gu, (n) => parseInt(n).toString(16)));
// f times f is e1
```

#### *match()*

- if g-flag is given, returns an array containing all matched substrings;
  - otherwise returns an *match* object

##### *match* Object

- `m[0]`: entire matching substring
- `m[1]`, `m[2]`, ...: groups in `m[0]`
- `m.input`
- `m.index`
- `m.gruops.<group_name>`

```js
const ms = "7 plus 8 equals 15".match(/\d+/g);
console.log(ms); // [ '7', '8', '15' ]


const urlPattern = /(?<protocol>\w+):\/\/(?<host>[\w.]+)\/(?<path>\S*)/;
const text = "Visit my blog at http://www.example.com/~david";
const m = text.match(urlPattern);

console.log(m[0]); // http://www.example.com/~david
console.log(m[1]); // http
console.log(m[2]); // www.example.com
console.log(m[3]); // ~david

console.log(m.input); // Visit my blog at http://www.example.com/~david
console.log(m.index); // 17

console.log(m.groups.protocol); // http
console.log(m.groups.host); // www.example.com
console.log(m.groups.path); // ~david
```

#### *matchAll()*

- returns an array of match objects
  - c.f. *match()* with g-flag returns an array of matched substrings
- prefer *matchAll* to *exec()* because *lastIndex* property of *RegExp* object that *exec()* uses makes your code error prone

```js
const wordsPattern = /\b\p{Alphabetic}+\b/gu;
const text = "This is a naïve test of the matchAll() method.";
for (const w of text.matchAll(wordsPattern)) {
  console.log(`${w.index}: ${w[0]}`);
}

// 0: This
// 5: is
// 8: a
// 10: naïve
// 16: test
// 21: of
// 24: the
// 28: matchAll
// 39: method
```


### Dates and Times

#### Date

- **Be careful that month starts with 0 but day of a month starts with 1!!**
- use *Date.UTC()* constructor to create a Date object from UTC datetime
- *console.log(dateObject)* display the datetime as local time zone by default
  - use *dateObject.toUTCString()* to display datetime as UTC
- use whether to use *getXXX* and *setXXX*, or *getUTCXXX* and *setUTCXXX* properly

- use *performance* object (such as *perf_hooks* in Node.js) for high-precision timer

```js
const now = new Date();

const epoch = new Date(0); // given interger is interpreted as milliseconds from epoch
console.log(epoch); // 1970-01-01T00:00:00.000Z

const century = new Date(
  2100, // year
  0, // January; month starts with 0!
  1, // 1st; day of a month starts with 1!
  2, // hour
  3, // minute
  4, // second
  5 // millisecond
);
console.log(century); // 2100-01-01T02:03:04.005Z

console.log(`day of month: ${century.getDate()}`); // day of month: 1
// Sunday is 0, Saturday is 6
console.log(`day of week: ${century.getDay()}`); // day of week: 5; Friday


const utcCentury = new Date(Date.UTC(2100, 0, 1));
console.log(utcCentury.toUTCString()); // Fri, 01 Jan 2100 00:00:00 GMT

// get and set year as local time zone
utcCentury.setFullYear(utcCentury.getFullYear() + 1);

// set and set year as UTC
utcCentury.setUTCFullYear(utcCentury.getUTCFullYear() + 1);

console.log(`timestamp [ms]: ${century.getTime()}`); // timestamp [ms]: 4102452184005
console.log(`current time as timestamp [ms]: ${Date.now()}`); // current time as timestamp [ms]: 1635766448134

start = Date.now();
// something do
end = Date.now();
const duration_ms = end - start;
```

### Error Classes

- JavaScript *throw* and *catch* statement can throw and catch any JavaScript value, including primitive values

#### Constructor

```js
throw new Error(message);
```

#### properties

- *name*: constructor name such as `Error`
- *message*
- *toString()*: `<name>: <message>`
- *stack*: a multi-line string of a stack trace

```js
class HTTPError extends Error {
  constructor(status, statusText, url) {
    super(`${status} ${statusText}: ${url}`);
    this.status = status;
    this.statusText = statusText;
    this.url = url;
  }

  get name() {
    return "HTTPError";
  }
}

const err = new HTTPError(404, "Not Found", "http://example.com/");
```

### JSON

```js
JSON.parse(string, revivier)
```

#### *JSON.parse()*

```js
const data = JSON.parse(text, (k, v) => { // revivier function
  if (key[0] === "_") return undefined; // exclude properties like `_internal_prop`
  if (
    typeof v === "string" &&
    /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(value)
  ) {
    return new Date(v);
  }
});
```

#### *JSON.stringify()*

```js
JSON.stringify(object, filter: string[] | int[], indent: number)
JSON.stringify(object, replacer:  (string, any) => object, indent: number)
```

- it uses a *toJSON()* method of a serialized object which is not json serializable as default

- when an array of strings or ints is given as the second argument, stringify only specified properties holding the order
- when an replacer function is given as the second argument, stringify properties filtered with the replacer



```js
const address = {
  city: "Sapporo",
  prefecture: "Hokkaido",
  country: "Japan",
  zip: "000-0000",
  id: 0,
};

const text = JSON.stringify(address, ["country", "zip", "city"]);
console.log(text);
// {"country":"Japan","zip":"000-0000","city":"Sapporo"}
// holding the order of properties in the passed array

const json = JSON.stringify(address, (k, v) =>
  typeof v === "string" ? undefined : v // exclude strings
);
console.log(json); // {"id":0}
```

### URL APIs

#### URL class

```js
const url = new URL("https://example.com:8000/path/name?q=term#fragment");

console.log(url.href); // https://example.com:8000/path/name?q=term#fragment
console.log(url.origin); // https://example.com:8000
console.log(url.protocol); // https:
console.log(url.host); // example.com:8000
console.log(url.hostname); // example.com
console.log(url.port); // 8000
console.log(url.pathname); // /path/name
console.log(url.search); // ?q=term
console.log(url.hash); // #fragment
```

see also *url.searchParams* property (p.321)

```js
const url = new URL("https://example.com");

url.pathname = "path with spaces";
url.search = "q=foo#bar";

// automatically escaping
console.log(url.pathname); // /path%20with%20spaces
console.log(url.search); // ?q=foo%23bar
console.log(url.href); // https://example.com/path%20with%20spaces?q=foo%23bar
```


## Chapter 12. Iterators and Generators

- since ES6

### Iterator

- *iterable* objects
  - any object with a special iterator method that returns an iterator object
- *iterator* objects
  - any object with a *next()* method that returns an iteration result object
  - we can implement clean up processes as *return()* optionally
    - *return()* is called when a iterator object returns before it exhausts
- *iteration result* object
  - an object with *value* property and *done* property

```js
const iterable = [99, 100, 101];
const iterator = iterable[Symbol.iterator]();
for (let res = iterator.next(); !res.done; res = iterator.next()) {
  console.log(res.value); // 99, 100, 101
}

const list = [1, 2, 3, 4, 5];
const iter = list[Symbol.iterator]();
const head = iter.next().value;
const tail = [...iter];
console.log(tail); // [ 2, 3, 4, 5 ]
```

```js
class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  has(x) {
    return typeof x === "number" && this.from <= x && x <= this.to;
  }

  toString() {
    return `{ x | ${this.from} <= x <= ${this.to} }`;
  }

  [Symbol.iterator]() {
    let next = Math.ceil(this.from);
    const last = this.to;
    return {
      next() {
        return next <= last ? { value: next++ } : { done: true };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
}

for (const x of new Range(1, 10)) {
  console.log(x);
}

const a = [...new Range(-2, 2)];
console.log(a); // [ -2, -1, 0, 1, 2 ]
```
```js
function map(iterable, f) {
  const iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const v = iterator.next();
      if (v.done) {
        return v;
      } else {
        return { value: f(v.value) };
      }
    },
  };
}

const a = [...map(new Range(1, 4), (x) => x * x)];
console.log(a); // [ 1, 4, 9, 16 ]
```

```js
const { Range } = require("./Range");

function filter(iterable, predicate) {
  const iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      for (;;) {
        const v = iterator.next();
        if (v.done || predicate(v.value)) {
          return v;
        }
      }
    },
  };
}

const a = [...filter(new Range(1, 10), (x) => x % 2 === 0)];
console.log(a); // [ 2, 4, 6, 8, 10 ]
```

### Generators

- a kind of iterator defined with ES6 syntax


- *generator function*
  - returns *generator* object when invoked, instead of executing the body
- *generator* object
  - runs to the next *yield* expression in the body when *next()* is called
  - returns the value of *yield* expression each call
  - we **cannot** implement *return()* as with iterator objects


```js
// generator function
function* oneDigitPrimes() {
  yield 2;
  yield 3;
  yield 5;
  yield 7;
}

// generator
const primesGenerator = oneDigitPrimes();

console.log(primesGenerator.next().value); // 2
console.log(primesGenerator.next().value); // 3
console.log(primesGenerator.next().value); // 5
console.log(primesGenerator.next().value); // 7
console.log(primesGenerator.next().done); // true

const primes = [...oneDigitPrimes()];
console.log(primes); // [ 2, 3, 5, 7 ]

let sum = 0;
for (const prime of oneDigitPrimes()) {
  sum += prime;
}
console.log(sum); // 17
```

```js
const seq = function* (from, to) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
};

const a = [...seq(3, 5)];
console.log(a); // [ 3, 4, 5 ]
```

```js
const o = {
  x: 1,
  y: 2,
  z: 3,
  *g() {
    for (const key of Object.keys(this)) {
      yield key;
    }
  },
};

const a = [...o.g()];
console.log(a); // [ 'x', 'y', 'z', 'g' ]
```

such lazy evaluation

```js
function* fibonacciSequence() {
  let x = 0,
    y = 1;
  for (;;) {
    yield y;
    [x, y] = [y, x + y];
  }
}

function* take(n, iterable) {
  const it = iterable[Symbol.iterator]();
  while (n-- > 0) {
    const next = it.next();
    if (next.done) {
      return;
    } else {
      yield next.value;
    }
  }
}

const head_5 = [...take(5, fibonacciSequence())];
console.log(head_5); // [ 1, 1, 2, 3, 5 ]
```

```js
function* zip(...iterables) {
  const iterators = iterables.map((i) => i[Symbol.iterator]());
  let index = 0;
  while (iterators.length > 0) {
    if (index >= iterators.length) {
      index = 0;
    }
    const item = iterators[index].next();
    if (item.done) {
      iterators.splice(index, 1);
    } else {
      yield item.value;
      index++;
    }
  }
}

const a = [...zip([1, 2, 3], ["a", "b"], [100])];
console.log(a); // [ 1, 'a', 100, 2, 'b', 3 ]
```

#### *yield**

```js
function* sequence(...iterables) {
  for (const iterable of iterables) {
    for (const item of iterable) {
      yield item;
    }
  }
}

function* sequence2(...iterables) {
  // equivalent to sequence() above
  for (const iterable of iterables) {
    yield* iterable;
  }
}

const a = [...sequence2([1, 2, 3], ["a", "b"], [100])];
console.log(a); // [ 1, 2, 3, 'a', 'b', 100 ]
```


## Chapter 13. Asynchronous JavaScript

- *Promise*
  - since ES6
- *async* and *await*
  - since ES2017
- *for/await* loop
  - since ES2018


### Promise

- represent the future results of single asynchronous computations
  - e.g. *setTimeout()*, *load* event handler
- **cannot** represent **repeated** asynchronous computations
  - e.g. *setInterval()*, *click* event handler


#### Terminologies

- *fulfilled*
- *rejected*
- *pending*
- *settled*
- *resolved*
  - assume that `const p: Promise = f.then(c)`
    - `c` is a callback function which takes an Promise an arugment
    - `then()` returns a Promise `p`
    - `c` returns a value `v` after `c` is asynchronously invoked
      - when the callback returns, `p` is *resolved* with the value `v`
        - if `v` is not a Promise, `p` is *fulfilled* as well
        - if `v` itself is a Promise, `p` is *resolved but not yet fulfilled*
          - if `v` is fulfilled, then `p` will be fulfilled to the same value
          - if `v` is rejected, then `p` will be rejected for the same reason

e.g.  

```js
function c1(response) {
  const p4 = response.json();
  return p4;
}

function c2(json) {
  displayUser(json);
}

fetch("/api/user/profile").then(c1).then(c2);
```

break it down to promises

```js
const p1: Promise = fetch("/api/user/profile");
const p2: Promise = p1.then(c1);
const p3: Promise = p2.then(c2);
```

![promises](./img/promises.png)


#### Error Handlings

- normal *try/catch* does not work for an asynchronous code
  - we cannot handle an error caused in an asynchronous function at the point of calling the asynchronous function because the point is not on a call stack already when the asynchronous function runs

```js
getJson("/api/user/profile").then(displayUserProfile, handleProfileError)
```

- *catch()* is equivalent to *then(null, error)*
- *catch()* can catch an error thrown in both *getJson()* and *displayUserProfile()*

```js
// better way
getJSON("/api/user/profile").then(displayUserProfile).catch(handleProfileError);
```

##### multi-catch methods

```js
startAsyncOperation()
  .then(doStageTwo)
  .catch(recoverFromStageTwoError)
  .then(doStageThree)
  .then(doStageFour)
  .then(logStageThreeAndFourErrors);
```

- when *startAsyncOperation()* or *doStageTwo()* throws and error, *recoverFromStageTwoError()* is called
  - if *recoverFromStageTwoError()* returns a value, *doStageThree()* is called
  - if *recoverFromStageTwoError()* throws a new error, *logStageThreeAndFourErrors* is called



this can be used to retry an asynchronous process

```js
queryDatabase()
  .catch(e => wait(500).then(queryDatabase))
  .then(displayTable)
  .catch(displayDatabaseError);
```

#### *Promise.all()*

- fulfills if all promises are fulfilled; otherwise rejects
- rejects if any promise is rejected immediately


```js
const urls = [...]

const promises = urls.map(url => fetch(url).then(r => r.text()));

Promise.all(promises)
  .then(bodies => {/* do something */})
  .catch(e => console.error(e));
```

#### *Promise.allSettled()*

```js
Promise.allSettled([Promise.resolve(1), Promise.reject(2), 3])
  .then(res => {
    res[0]; // { status: "fulfilled", value: 1 }
    res[1]; // { status: "rejected", value: 2 }
    res[2]; // { status: "fulfilled", value: 3 }
  })
```

#### *Promise.race()*

- resolves when any promise is resolved

#### Handmade Promise

```js
function wait(duration) {
  return new Promise((resolve, reject) => {
    if (duration < 0) {
      reject(new Error("Time travel not yet implemented"));
    }
    setTimeout(resolve, duration);
  });
}
```

```js
const http = require("http");

function getJSON(url) {
  return new Promise((resolve, reject) => {
    request = http.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP status ${response.statusCode}`));
        response.resume();
      } else if (response.headers["content-type"] !== "application/json") {
        reject(new Error("Invalid content-type"));
        response.resume();
      } else {
        let body = "";
        response.setEncoding("utf-8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          try {
            const parsed = JSON.parse(body);
            resolve(parsed);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    request.on("error", (error) => {
      reject(error);
    });
  });
}
```

#### Promise Sequence

```js
function fetchSequentially(urls) {
  const bodies = [];

  function fetchOne(url) {
    return fetch(url)
      .then((response) => response.text())
      .then((body) => {
        bodies.push(body);
      });
  }

  let p = Promise.resolve(undefined);
  for (url of urls) {
    p = p.then(() => fetchOne(url));
  }
  return p.then(() => bodies);
}
```

```js
function promiseSequence(input, promiseMaker) {
  inputs = [...inputs];

  function handleNextInput(outputs) {
    if (inputs.length === 0) {
      return outputs;
    } else {
      const nextInput = inputs.shift();
      return promiseMaker(nextInput)
        .then((output) => outputs.concat(output))
        .then(handleNextInput);
    }
  }
  return Promise.resolve([]).then(handleNextInput);
}

function fetchBody(url) {
  return fetch(url).then((r) => r.text());
}

promiseSequence(urls, fetchBody)
  .then((bodies) => {
    /* do something */
  })
  .catch(console.error);
```
`promiseSequence()` above is recursive such as

```js
Promise.resolve([])
  .then((outputs) => {
    ...
    return promiseMaker(nextInput)
      .then((output) => outpus.concat(output))
      .then((outputs) => {
        ...
        return promiseMaker(nextInput)
          .then((output) => outputs.concat(output))
          .then((outputs) => {
            ...
            return outputs
          })
      })
  })
```

#### *await* and *async*

- since ES2017

```js
async function f(x) { /* body */ }

function f(x) {
  return new Promise(function(resolve, reject) {
    try {
      resolve(function(x) {/* body */})
    } catch(e) {
      reject(e);
    }
  })
}
```

```js
async function getJSON(url) {
  const response = await fetch(url);
  const body = await response.json();
  return body;
}

// parallel fetch
const [value1, value2] = await Promise.all([getJSON(url1), getJSON(url2)])
```

#### *for/await*

- since ES2018

```js
for (const promise of promises) {
  response = await promise;
  handle(response);
}

// using for/await
for await (const response of promises) {
  handle(response);
}
```

#### Asynchronous Iterators and Generators


```js
class AsyncQueue {
  constructor() {
    this.value = [];
    this.resolvers = [];
    this.closed = false;
  }
  enqueue(value) {
    if (this.closed) {
      throw new Error("AsyncQueue closed");
    }
    if (this.resolvers.length > 0) {
      const resolve = this.resolvers.shift();
      resolve(value);
    } else {
      this.values.push(value);
    }
  }
  dequeue() {
    if (this.values.length > 0) {
      const value = this.values.shift();
      return Promise.resolve(value);
    } else if (this.closed) {
      return Promise.resolve(AsyncQueue.EOS);
    } else {
      return new Promise((resolve) => {
        this.resolvers.push(resolve);
      });
    }
  }
  close() {
    while (this.resolvers.length > 0) {
      this.resolvers.shift()(AsyncQueue.EOS);
    }
    this.closed = true;
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  next() {
    return this.dequeue().then((value) =>
      value === AsyncQueue.EOS
        ? { value: undefined, done: true }
        : { value: value, done: false }
    );
  }
}

AsyncQueue.EOS = Symbol("end-of-stream");
```

```js
const { AsyncQueue } = require("AsyncQueue");

function eventStream(elt, type) {
  const q = new AsyncQueue();
  elt.addEventListener(type, (e) => q.enqueue(e));
  return q;
}

async function handleKeys() {
  for await (const event of eventStream(document, "keypress")) {
    console.log(event.key);
  }
}
```


## Chapter 14. Metaprogramming

### Property Attributes

- *writable*
  - whether or not the value can be changed
- *enumerable*
  - whether or not it can be enumerated by *for/in* loop and *Object.keys()*
- *configurable*
  - whether or not it can be deleted and the property's attributes can changed

#### *property descriptor* object

- JavaScript methods for querying and setting the attributes of a property use a *property descriptor* object

properties of a property descriptor of a data property
- value
- writable
- enumerable
- configurable

properties of a property descriptor of a accessor property
- get
- set
- enumerable
- configurable

```js
const o = Object.getOwnPropertyDescriptor({ x: 1 }, "x");
console.log(o); // { value: 1, writable: true, enumerable: true, configurable: true }

const random = {
  get octet() {
    return Math.floor(Math.random() * 256);
  },
};

console.log(Object.getOwnPropertyDescriptor(random, "octet"));
// {
//   get: [Function: get octet],
//   set: undefined,
//   enumerable: true,
//   configurable: true
// }

console.log(Object.getOwnPropertyDescriptor({}, "x")); // undefined
console.log(Object.getOwnPropertyDescriptor({}, "toString")); // undefined
```

```js
"use strict";
const o = {};

Object.defineProperty(o, "x", {
  value: 1,
  writable: true,
  enumerable: false,
  configurable: true,
});

console.log(o.x); // 1
console.log(Object.keys(o)); // []

Object.defineProperty(o, "x", { writable: false });
try {
  o.x = 2;
} catch (err) {
  console.log(err);
  // TypeError: Cannot assign to read only property 'x' of object '#<Object>'
}
console.log(o.x); // 1

Object.defineProperty(o, "x", { value: 2 });
console.log(o.x); // 2

// change x from a data property to accessor property
Object.defineProperty(o, "x", {
  get: function () {
    return 0;
  },
});
console.log(Object.getOwnPropertyDescriptor(o, "x"));
// {
//   get: [Function: get],
//   set: undefined,
//   enumerable: false,
//   configurable: true
// }
```

```js
const p = Object.defineProperties(
  {},
  {
    x: { value: 1, writable: true, enumerable: true, configurable: true },
    y: { value: 1, writable: true, enumerable: true, configurable: true },
    r: {
      get() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      enumerable: true,
      configurable: true,
    },
  }
);
console.log(p.r); // 1.4142135623730951
```

```js
Object.defineProperty(Object, "assignDescriptors", {
  writable: true,
  enumerable: false,
  configurable: true,
  value: function (target, ...sources) {
    for (const source of sources) {
      for (const name of Object.getOwnPropertyNames(source)) {
        const desc = Object.getOwnPropertyDescriptor(source, name);
        Object.defineProperty(target, name, desc);
      }
      for (const symbol of Object.getOwnPropertySymbols(source)) {
        const desc = Object.getOwnPropertyDescriptor(source, symbol);
        Object.defineProperty(target, symbol, desc);
      }
    }
    return target;
  },
});

const o = {
  c: 1,
  get count() {
    return this.c++;
  },
};
const p = Object.assign({}, o);
const q = Object.assignDescriptors({}, o);

console.log(p.count); // 1
console.log(p.count); // 1; because of just a data property

console.log(q.count); // 2
console.log(q.count); // 3; because copied as getter
```

### Object Extensibility

whether new properties can be added to an object or not

- *Object.isExtensible()*
  - return `true` if an object is extensible
- *Object.preventExtensions()*
  - makes an object non-extensible
  - a non-extensible object cannot be extensible


#### *Object.seal()*

- makes the object non-extensible and all the properties noncofiguable
  - new properties cannot be added to the object
  - existing properties cannot be deleted or configured
  - existing writable properties can still be set

#### *Object.freeze()*

- makes the object non-extensible and all the properties nonconfigurable and read-only


### Symbols

#### *Symbol.toStringTag*

```js
function classof(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}

console.log(classof(null)); // Null
console.log(classof(undefined)); // Undefined
console.log(classof(1)); // Number
console.log(classof(10n ** 100n)); // BigInt
console.log(classof("")); // String
console.log(classof(false)); // Boolean
console.log(classof(Symbol())); // Symbol
console.log(classof({})); // Object
console.log(classof([])); // Array
console.log(classof(/./)); // RegExp
console.log(classof(() => {})); // Function
console.log(classof(new Map())); // Map
console.log(classof(new Set())); // Set
console.log(classof(new Date())); // Date

class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  get [Symbol.toStringTag]() {
    return "Range";
  }
}
const r = new Range(1, 10);
console.log(classof(r)); // Range
```

### Pattern-Matching Symbols

```js
class Glob {
  constructor(glob) {
    this.glob = glob;
    const regexpText = glob.replace("?", "([^/])").replace("*", "([^/]*)");
    this.regexp = new RegExp(`^${regexpText}`, "u");
  }
  toString() {
    return this.glob;
  }
  [Symbol.search](s) {
    return s.search(this.regexp);
  }
  [Symbol.match](s) {
    return s.match(this.regexp);
  }
  [Symbol.replace](s, replacement) {
    return s.replace(this.regexp, replacement);
  }
}

module.exports = { Glob };
```

```js
const { Glob } = require("./Glob");

const pattern = new Glob("docs/*.txt");

console.log("docs/sample.txt".search(pattern)); // 0
console.log("docs/sample.htlm".search(pattern)); // -1

const m = "docs/sample.txt".match(pattern);
console.log(m[0]); // docs/sample.txt
console.log(m[1]); // sample
console.log(m.index); // 0

console.log("docs/sample.txt".replace(pattern, "web/$1.html")); // web/sample.html
```


### *Symbol.toPrimitive*

- define how to convert an object to primitive value

```js
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  [Symbol.toPrimitive](arg) {
    if (arg == "string") {
      return `(${this.x}, ${this.y})`;
    } else if (arg == "number") {
      return this.x * this.x + this.y * this.y;
    } else {
      return this.x * this.x + this.y * this.y;
    }
  }
}

const v = new Vector(3, 4);
console.log(`v=${v}`); // v=(3, 4)
console.log(v + v); // 50
console.log(v + 100); // 125
console.log(v + "100"); // 25100
```

### Proxy Class

```js
new Proxy(target, handler)
```

```js
function readOnlyProxy(o) {
  function readonly() {
    throw new TypeError("Readonly");
  }
  return new Proxy(o, {
    set: readonly,
    defineProperty: readonly,
    deleteProperty: readonly,
    setPrototypeOf: readonly,
  });
}

const o = { x: 1, y: 2 };
const p = readOnlyProxy(o);
console.log(p.x); // 1
try {
  p.x = 2;
} catch (err) {
  console.log(err); // TypeError: Readonly
}
try {
  delete p.y;
} catch (err) {
  console.log(err); // TypeError: Readonly
}
try {
  p.z = 3;
} catch (err) {
  console.log(err); // TypeError: Readonly
}
```


## Chapter 15. JavaScript in Web Browsers

### Namespace

- with non-module scripts, the contents such as variables, functions, classes defined in top-level code are shared with all other scripts in the same document.


### Web Worker

- a controlled form of concurrency 
- background thread for performing computationally intensive tasks
- the thread does not share any state with the main thread or with other workers

### The same-origin policy

- `origin = protocol + host + port` of a loaded **document**, not a script

### Custom Event

```js
document.dispatchEvent(new CustomEvent(
  "busy",   // custom event type
  { detail: true }  // custom properties
));

fetch(url)
  .then(handleNetworkResponse)
  .catch(handleNetworkError)
  .finally(() => {
    document.dispatchEvent(new CustomEvent("bosy", { detail: false }));
  })

document.addEventListener("busy", (e) => {
  if (e.detail) {
    showSpinner();
  } else {
    hideSpinner();
  }
});
```

### The *class* attribute

- *className*
- *classList*

```js
const spinner = document.querySelector("#spinner");
spinner.classList.remove("hidden");
spinner.classList.add("animated");
```

### Dataset attributes

```html
<h2 id="title" data-section-number="16.1">Attributes</h2>
```

```js
const number = document.querySelector("#title").dataset.sectionNumber;  // 16.1
```

### Coordinate Systems

- document coordinates
- viewport coordinates (window coordinates)
  - *viewport*
    - the portion of the browser that actually displays document content
  - preferred to document coordinates


### *Location* Object


```js
const url = new URL(window.location);

// just assign a string to load new page
window.location = "http://www.oreilly.com";

// replace a current page with a passed URL in browser history
document.location.replace("staticpage.html");
```

### *fetch* API

- *Headers* object
  - *headers* property of Response object
  - *has()* and *get()* are case-**in**sensitive

- rejects the *Promise* if it cannot contact the web server.  
  - the user's computer is offline
  - the server is unresponsive
  - the URL specifies a hostname that does not exist
- recommended to put *fetch()* in try-catch clause

```js
try {
  const res = await fetch();
} catch (err) {

}
```

a streaming API example

```js
fetch("big.json")
  .then(response => streamBody(response, updateProgress))
  .then(bodyText => JSON.parse(bodyText))
  .then(handleBigJSONObject);

async function streamBody(response, reportProgress, processChunk) {
  const expectedBytes = parseInt(response.headers.get("Content-Length"));
  let bytesRead = 0;
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let body = "";

  while (true) {
    const {done, value} = await reader.read();

    if (value) {
      if (processChunk) {
        const processed = processChunk(value);
        if (processed) {
          body += processed;
        }
      } else {
        body += decoder.decode(value, {stream: true});
      }

      if (reportProgress) {
        bytesRead += value.length;
        reportProgress(bytesRead, bytesRead / expectedBytes);
      }
    }
    if (done) {
      break;
    }
  }
  return body;
}
```

#### Aborting a request

```js
function fetchWithTimeout(url, options={}) {
  if (options.timeout) {
    const controller = new AbortController();
    options.signal = controller.signal;
    setTimeout(() => { controller.abort(); }, options.timeout);
  }
  return fetch(url, options);
}
```

### *LocalStorage*

- `window.localStorage`
- the property values must be string
- the properties persist
  - if you set a property of the *localStorage* object and then the user reloads the page, the value is still available
- the lifetime is permanent
  - it does not expire until the user deletes it
- scoped to the document origin (= protocol + hostname + port) and browser
  - all documents with the same origin share the same *localStorage* data
  - we cannot access *localStorage* data of different browsers even if the document is from same origin

```js
const name = localStorage.username;
if (!name) {
  name = prompt("What is your name?");
  localStorage.username = name;
}
```

### *sessionStorage*

- `window.sessionStorage`
- the lifetime is the same as the top-level window or browser tab
  - but if a browser reopens tabs and restores the sessions, *sessionStorage* data is also restored
- scoped to the document origin
  - we cannot access *sessionStorage* data of different tabs even if the document is from same origin


### *Cookie*s

- intended for storage of small amouts of data by server-side scripts
  - 4 KB size limit

```js
function getCookies() {
  const cookies = new Map();
  const all = document.cookie;
  const list = all.split("; ");
  for (const cookie of list) {
    if (!cookie.includes("=")) continue;
    const p = cookie.indexOf("=");
    const name = cookie.substring(0, p);
    const value = cookie.substring(p + 1);
    value = decodeURIComponent(value);
    cookies.set(name, value);
  }
  return cookies;
}

function setCookie(name, value, daysToLive=null) {
  // cookie value cannot include `;`, `,`, ` ` so we need to encode it
  const cookie = `${name}=${encodeURIComponent(value)}`;
  if (daysToLive !== null) {
    cookie += `; max-age=${daysToLive * 60 * 60 * 24}`;
  }
  document.cookie = cookie;
}
```

### *IndexedDB*

- scoped to an origin of a document
  - documents of the same origin can share an *IndexedDB*


## Chapter 16. Server-Side JavaScript with Node

### Module System

- ES6 module
  - `import` and `export`
  - `.mjs`
  - `type: module` in package.json
- CommonJS module
  - `require` and `exports`
  - `.cjs`
  - `type: commonjs` in package.json

- How Node recognizes the module type
  - first, Node search for a nearest package.json
  - if found, treats programs as a module of *type* in package.json
  - if not found, treats programs as CommonJS module

### Asynchrony

- Node was designed and optimized I/O intensive programs such as network servers
  - easily implement highly concurrent servers that can handle many requests at the same time
- But Node uses the single-threaded JavaScript model like web browsers
  - event-based concurrency
  - Node maps the OS event to the JavaScript callback you registered and then invokes that function


- Node makes its API asynchronous and nonblocking by default for concurrency
- Node APIs are callback-based (*error-first callbacks*)


```js
const fs = require("fs");

function readConfigFile(path, callback) {
  fs.readFile(path, "utf8", (err, text) => {
    if (err) {
      console.error(err);
      callback(null);
      return;
    }
    const data = null;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error(err);
    }
    callback(data);
  });
}
```

```js
const util = require("util");
const fs = require("fs");
const pfs = {
  readFile: util.promisify(fs.readFile),
};

// handmade promise versions
function promiseRaadConfigFile(path) {
  return pfs.readFile(path, "utf-8").then((text) => {
    return JSON.parse(text);
  });
}

async function asyncReadConfigFile(path) {
  const text = await pfs.readFile(path, "utf-8");
  return JSON.parse(text);
}

// using predefined
function promiseReadConfigFile2(path) {
  return fs.promises.readFile(path, "utf-8").then((text) => {
    return JSON.parse(text);
  });
}
```

```js
const fs = require("fs");

function readConfigFileSync(path) {
  const text = fs.readFileSync(path, "utf-8");
  return JSON.parse(text);
}
```

```js
const fs = require("fs");
const path = require("path");

fs.writeFileSync(
  path.resolve(__dirname, "settings.json"),
  JSON.stringify(settings)
);
```

#### Lowest API to read and write a file

|File Mode String|Description|
|:---:| :---: |
|`r`|read; default|
|`w`|write|
|`w+`|read/write|
|`wx`|create a new file to write; fails if the named file already exists|
|`wx+`|create a new file to read/write; fails if the named file already exists|
|`a`|append|
|`a+`|read/append|

```js
const fs = require("fs");

fs.open("tmp.txt", "w", (err, fd) => { // do something })
fs.writeFileSync("tmp.txt", "hello", { flag: "a" });
fs.createWriteStream("tmp.txt", { flags: "wx" });
```


```js
const fs = require("fs");

fs.open("data", (err, fd) => {
  if (err) {
    return;
  }
  try {
    fs.read(
      fd, // file descriptor
      Buffer.alloc(400),
      0, // offset (in the allocated buffer where to start fill bytes)
      400, // longth (to read bytes)
      20, // position (in the file where to start read bytes)
      (err, n, b) => {
        // n is the number of bytes actually read.
        // b is the buffer that they bytes were read into.
      }
    );
  } finally {
    fs.close(fd);
  }
});
```

```js
const fs = require("fs");

function readData(filename) {
  const fd = fs.openSync(filename);
  try {
    const header = Buffer.alloc(12);
    fs.readSync(fd, header, 0, 12, 0);

    const magic = header.readInt32LE(0);
    if (magic !== 0xdadafeed) {
      throw new Error("File is of wrong type");
    }

    const offset = header.readInt32LE(4);
    const length = header.readInt32LE(8);

    const data = Buffer.alloc(length);
    fs.readSync(fd, data, 0, length, offset);
    return data;
  } finally {
    fs.closeSync(fd);
  }
}
```

### *Event*s and *EventEmitter*

```js
const EventEmitter = require("events");
const net = require("net");

const server = new net.Server(); // Server class is a subclass of EventEmitter
server.on("connection", (socket) => {
  socket.end("Hello World", "utf-8");
});
server.on("error", (err) => {
  console.error(err);
});
```

### *Stream*s

- Use when a data that you want to read/write cannot be in memory at once

```js
const fs = require("fs");

const output = fs.createWriteStream("numbers.txt");
for (let i = 0; i < 100; i++) {
  output.write(`${i}\n`);
}
output.end();
```

#### *Pipe*s

- handles *backpressure* automatically
  - keeps a pace to push a chunk to and pop a chunk from a buffer

```js
const fs = require("fs");

function pipeFileToSocket(filename, socket) {
  fs.createReadStream(filename).pipe(socket);
}
```

```js
function pipe(readable, writable, callback) {
  function handleError(err) {
    readable.close();
    writable.close();
    callback(err);
  }

  readable
    .on("error", handleError)
    .pipe(writable)
    .on("error", handleError)
    .on("finish", callback);
}
```

```js
const fs = require("fs");
const zlib = require("zlib");

function gzip(filename, callback) {
  const source = fs.createReadStream(filename);
  const destination = fs.createWriteStream(filename + ".gz");
  const gzipper = zlib.createGzip();

  source
    .on("error", callback)
    .pipe(gzipper)
    .pipe(destination)
    .on("error", callback)
    .on("finish", callback);
}
```

```js
const stream = require("stream");

class GrepStream extends stream.Transform {
  constructor(pattern) {
    super({ decodeStrings: false });
    this.pattern = pattern;
    this.incompleteLine = "";
  }

  _transform(chunk, encoding, callback) {
    if (typeof chunk !== "string") {
      callback(new Error("Expected a string but got a buffer"));
      return;
    }

    const lines = (this.incompleteLine + chunk).split("\n");

    this.incompleteLine = lines.pop();

    let output = lines.filter((line) => this.pattern.test(line)).join("\n");

    if (output) {
      output += "\n";
    }

    callback(null, output);
  }

  // called right before the stream is closed
  _flush(callback) {
    if (this.pattern.test(this.incompleteLine)) {
      callback(null, this.incompleteLine + "\n");
    }
  }
}

const pattern = new RegExp(process.argv[2]);
process.stdin
  .setEncoding("utf8")
  .pipe(new GrepStream(pattern))
  .pipe(process.stdout)
  .on("error", () => process.exit());
```

#### *for/await*

```js
// this example does not handle backpressure
async function grep(source, destination, pattern, encoding = "utf8") {
  source.setEncoding(encoding);
  destination.on("error", (err) => process.exit());

  let incompleteLine = "";
  for await (const chunk of source) {
    const lines = (incompleteLine + chunk).split("\n");
    incompleteLine = lines.pop();
    for (const line of lines) {
      if (pattern.test(line)) {
        destination.write(line + "\n", encoding);
      }
    }
  }
  if (pattern.test(incompleteLine)) {
    destination.write(incompleteLine + "\n", encoding);
  }
}

const pattern = new RegExp(process.argv[2]);
grep(process.stdin, process.stdout, pattern).catch((err) => {
  console.log(err);
  process.exit();
});
```

### *path*

```js
const os = require("os");

process.cwd(); // absolute path of the current directory
__filename; // absolute path of the file
__dirname; // absolute path of the directory containing the file
os.homedir(); // absolute path of user's home directory

const path = require("path");

"parent_dir" + path.sep + "child_dir"; // parent_dir/child_dir

const p = "src/pkg/test.js";
path.basename(p); // test.js
path.extname(p); // .js
path.dirname(p); // src/pkg
path.basename(path.dirname(p)); // pkg
path.dirname(path.dirname(p)); // src

path.normalize("a/b/c/../c/"); // a/b/c/
path.normalize("a/./b"); // a/b
path.normalize("//a//b//"); // /a/b/

path.join("src", "pkg", "t.js"); // src/pkg/t.js

// path.resolve() is just a string manipulation method.
// It does not actually resolve the path though a file system.
// Use fs.realpath() and fs.realpathSync() to resolve symbolic links
path.resolve(); // equivalent to process.cwd()
path.resolve("t.js"); // path.join(process.cwd(), t.js)
path.resolve("/tmp", "t.js"); // /tmp/t.js
path.resolve("/a", "/b", "t.js"); // /b/t.js
```

### File Utils

```js
const fs = require("fs");

fs.copyFileSync("src.txt", "dst.txt");
fs.copyFile(
  "src.txt",
  "dst.txt",
  fs.constants.COPYFILE_EXCL, // copy a file only when a file with the same name does not exist
  (err) => {
    // handle error
  }
);

fs.promises
  .copyFile(
    "src.txt",
    "dst.txt",
    fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE
  )
  .then(() => {
    console.log("copy complete");
  })
  .catch((err) => {
    console.error("copy failed", err);
  });
```

```js
const fs = require("fs");

const stats = fs.statSync("./argv.js");
stats.isFile(); // true
stats.isDirectory(); // false
stats.size; // 259
stats.atime; // 2021-11-18T13:13:22.483Z ; last access
stats.mtime; // 2021-11-18T10:24:51.191Z ; last modified
stats.uid; // 0
stats.gid; // 0
stats.mode.toString(8); // 100644 ; file permission as an octal
```

```js
const os = require("os");
const fs = require("fs");
const path = require("path");

let tempDirPath;
try {
  tempDirPath = fs.mkdtempSync(path.join(os.tmpdir(), "d-"));
  console.log(tempDirPath); // /tmp/d-til3mB
  // do something
} finally {
  fs.rmdirSync(tempDirPath);
}
```

```js
const fs = require("fs");

const dirPath = "/workspaces/jdg";

const filePaths = fs.readdirSync(dirPath);
console.log(filePaths);
// [
//   '.devcontainer',
//   '.git',
//   '.gitignore',
//   'README.md',
//   'ch03_Types-Values-and-Variables',
//   'ch04_Expressions-and-Operators',
//   'ch06_Objects',
//   'ch07_Arrays',
//   'ch08_Functions',
//   'ch09_Classes',
//   'ch10_Modules',
//   'ch11_The_JavaScript_Standard_Library',
//   'ch12_Iterators-and-Generators',
//   'ch13_Asynchronous-JavaScript',
//   'ch14_Metaprogramming',
//   'ch16_Server-Side-JavaScript-with-Node',
//   'node_modules'
// ]

fs.promises
  .readdir(dirPath, { withFileTypes: true })
  .then((entries) => {
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .forEach((name) => console.log(name));
  })
  .catch(console.error);

// .devcontainer
// .git
// ch03_Types-Values-and-Variables
// ch04_Expressions-and-Operators
// ch06_Objects
// ch07_Arrays
// ch08_Functions
// ch09_Classes
// ch10_Modules
// ch11_The_JavaScript_Standard_Library
// ch12_Iterators-and-Generators
// ch13_Asynchronous-JavaScript
// ch14_Metaprogramming
// ch16_Server-Side-JavaScript-with-Node
// node_modules
```

```js
const fs = require("fs");
const path = require("path");

async function listDirectory(dirpath) {
  const dir = await fs.promises.opendir(dirpath);
  for await (const entry of dir) {
    let name = entry.name;
    if (entry.isDirectory()) {
      name += "/";
    }
    const stats = await fs.promises.stat(path.join(dirpath, name));
    const size = stats.size;
    console.log(String(size).padStart(10), name);
  }
}

listDirectory("/workspaces/jdg");
// 4096 node_modules/
// 4096 ch03_Types-Values-and-Variables/
// 4096 ch04_Expressions-and-Operators/
// 4096 ch16_Server-Side-JavaScript-with-Node/
// 2453 .gitignore
// 4096 ch12_Iterators-and-Generators/
//   89 README.md
// 4096 ch10_Modules/
// 4096 .devcontainer/
// 4096 .git/
// 4096 ch07_Arrays/
// 4096 ch09_Classes/
// 4096 ch11_The_JavaScript_Standard_Library/
// 4096 ch14_Metaprogramming/
// 4096 ch06_Objects/
// 4096 ch13_Asynchronous-JavaScript/
// 4096 ch08_Functions/
```

### HTTP Clients and Servers

```js
const https = require("https");

function postJSON(host, endpoint, body, port, username, password) {
  return new Promise((resolve, reject) => {
    const bodyText = JSON.stringify(body);

    const requestOptions = {
      method: "POST",
      host: host,
      path: endpoint,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(bodyText),
      },
    };
    if (port) {
      requestOptions.port = port;
    }
    if (username && password) {
      requestOptions.auth = `${username}:${password}`;
    }

    const request = https.request(requestOptions);
    request.write(bodyText);
    request.end();

    request.on("error", (e) => reject(e));

    request.on("response", (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP status ${response.statusCode}`));

        response.resume(); // open memory used this response body
        return;
      }

      response.setEncoding("utf-8");
      let body = "";
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(err);
        }
      });
    });
  });
}
```

### Child Processes

- with blocking

```js
const child_process = require("child_process");
const listing = child_process.execSync("ls -l ./*.js", { encoding: "utf8" });
console.log(listing);
// -rw-r--r-- 1 root root  259 Nov 18 10:24 ./argv.js
// -rw-r--r-- 1 root root  693 Nov 18 12:24 ./buffer.js
// -rw-r--r-- 1 root root  263 Nov 22 01:45 ./child-process.js
// ...
// -rw-r--r-- 1 root root  567 Nov 20 06:28 ./sha256-paused-mode.js
// -rw-r--r-- 1 root root  170 Nov 20 14:08 ./tcp-client.js
// -rw-r--r-- 1 root root 1469 Nov 20 14:05 ./tcp-server.js

const listing2 = child_process.execFileSync("ls", ["-l", "./"], {
  encoding: "utf-8",
});
console.log(listing2);
// total 108
// -rw-r--r-- 1 root root  259 Nov 18 10:24 argv.js
// -rw-r--r-- 1 root root  693 Nov 18 12:24 buffer.js
// -rw-r--r-- 1 root root  263 Nov 22 01:45 child-process.js
// ...
// -rw-r--r-- 1 root root  567 Nov 20 06:28 sha256-paused-mode.js
// -rw-r--r-- 1 root root  170 Nov 20 14:08 tcp-client.js
// -rw-r--r-- 1 root root 1469 Nov 20 14:05 tcp-server.js
```

- non-blocking

```js
const child_process = require("child_process");
const util = require("util");
const execP = util.promisify(child_process.exec);

function parallelExec(commands) {
  const promises = commands.map((command) =>
    execP(command, { encoding: "utf8" })
  );

  return Promise.all(promises).then((outputs) =>
    outputs.map((out) => out.stdout)
  );
}

module.exports = parallelExec;
```

#### *spawn()*

- a parent process can communicate with a child process through streams to pipe stdin, stdout, stderr of each

#### *fork()*

- communication between process is easy

```js
const child_process = require("child_process");

const child = child_process.fork(`${__dirname}/child.js`);

child.send({ x: 4, y: 3 }); // parent -> child

child.on("message", (message) => {
  console.log(message.hypotenuse);
  child.disconnect();
});
```

```js
// child.js
process.on("message", (message) => {
  process.send({ hypotenuse: Math.hypot(message.x, message.y) });
});
```

#### *Worker Threads*

- thread-base asynchronous

```js
const threads = require("worker_threads");

if (threads.isMainThread) {
  module.exports = function reticulateSplines(splines) {
    return new Promise((resolve, reject) => {
      const reticulator = new threads.Worker(__filename);
      reticulator.postMessage(splines);
      reticulator.on("message", resolve);
      reticluator.on("error", reject);
    });
  };
} else {
  threads.parentPort.once("message", (splines) => {
    for (const spline of splines) {
      spline.reticulate ? spline.reticulate() : (spline.reticulated = true);
    }
    threads.parentPort.postMessage(splines);
  });
}
```


