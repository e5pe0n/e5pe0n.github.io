---
title: "Note: Bitwise OR as Math.floor()"
categories:
  - Note
tags:
  - Programming
  - JavaScript
last-modified-at: 2022-06-06
---

# TL;DR

Don't use `|` to floor a number, use *Math.floor()* instead.  

<br>

# Explanation

In JavaScript, bitwise OR `|` can be used to floor a number like below.  

```js
console.log(1.23 | 0)  // 1.0
```

This works because one of the operands is an integer, the other is casted to an integer so its decimals are truncated.  
But this time, operands are considered as **32-bit** int, so if you give a large number then the calculation result might overflow.  

```js
console.log(2147483647.123 | 0)  // 2147483647
console.log(2147483648.123 | 0)  // -2147483648
```
