---
title: "Note: The Scheme Programming Language"
categories:
  - Note
tags:
  - Programming
  - Scheme
  - Lisp
last-modified-at: 2021-08-07
---

https://www.scheme.com/tspl4/

<br>

# My Questions

- difference between *proper* list and *improper* list
  - -> *pair*s used for other data structures such as *tree*


# Chapter 02. Getting Started

## Section 2.2. Simple Expressions

reason to adopt the simple notation

> You might wonder why applications and variables share notations with lists and symbols. The shared notation allows Scheme programs to be represented as Scheme data, simplifying the writing of interpreters, compilers, editors, and other tools in Scheme. This is demonstrated by the Scheme interpreter given in Section 13.7, which is itself written in Scheme. Many people believe this to be one of the most important features of Scheme.

## Section 2.3. Evaluating Scheme Expressions

Scheme expressions are evaluated in any order.

> A Scheme evaluator is free to evaluate the expressions in any order---left to right, right to left, or any other sequential order. In fact, the subexpressions may be evaluated in different orders for different applications, even in the same implementation.

## Section 2.7. Conditional Expressions

### *or* expression

> To be more precise, in case (a), the value of the or expression is the value of the last subexpression evaluated.

### Values evaluated to *false*

> Every Scheme object, however, is considered to be either true or false by conditional expressions and by the procedure not. Only #f is considered false; all other objects are considered true.

```scheme
(if #t 'true 'false) => true
(if #f 'true 'false) => false
(if '() 'true 'false) => true
(if 1 'true 'false) => true
(if '(a b c) 'true 'false) => true

(not #t) => #f
(not "false") => #f
(not #f) => #t

(or) => #f
(or #f) => #f
(or #f #t) => #t
(or #f 'a #f) => a
```

### Equivalencies

```scheme
(eqv? (cons 'a 'b) (cons 'a 'b)) => #f
```

