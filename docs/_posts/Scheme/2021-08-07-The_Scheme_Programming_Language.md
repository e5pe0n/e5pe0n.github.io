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


# Chapter 03

## Section 3.2. More Recursion

> One restriction on the expressions must be obeyed. It must be possible to evaluate each expr without evaluating any of the variables var .... This restriction is always satisfied if the expressions are all lambda expressions, since even though the variables may appear within the lambda expressions, they cannot be evaluated until the resulting procedures are invoked in the body of the letrec. 

```scheme
; OK
(letrec ([f (lambda () (+ x 2))]
         [x 1])
  (f)) <graphic> 3
```

```scheme
; NG
(letrec ([y (+ x 2)]
         [x 1])
  y)
```

### Tail-Recursions

> When a procedure call is in tail position (see below) with respect to a lambda expression, it is considered to be a tail call, and Scheme systems must treat it properly, as a "goto" or jump. When a procedure tail-calls itself or calls itself indirectly through a series of tail calls, the result is tail recursion. Because tail calls are treated as jumps, tail recursion can be used for indefinite iteration in place of the more restrictive iteration constructs provided by other programming languages, without fear of overflowing any sort of recursion stack.

## Section 3.4. Continuation Passing Style

- Continuation Passing Style; CPS

```scheme
(define print
  (lambda (x)
    (for-each display `(,x "\n"))
  )
)

(define implicit
  (lambda ()
    (letrec (
      [f (lambda (x) (cons 'a x))]
      [g (lambda (x) (cons 'b (f x)))]
      [h (lambda (x) (g (cons 'c x)))]
    )
      (cons 'd (h `()))
    )
  )
)

(define cps
  (lambda ()
    (letrec (
      [f (lambda (x k) (k (cons 'a x)))]
      [g (lambda (x k) (f x (lambda (v) (k (cons 'b v)))))]
      [h (lambda (x k) (g (cons 'c x) k))]
    )
      (h `() (lambda (v) (cons 'd v)))
    )
  )
)

(print (implicit))  ; (d b a c)
(print (cps)) ; (d b a c)
```

<br>

# Chapter 4. Procedures and Variable Bindings

## Section 4.6 Variable Definitions

lazy evaluation of top-level definitions in case that the program are separated into files is allowed only for variables, not keywords for syntax extensions

```scheme
; OK because g is variable binding to procedure
; (NG if g is defined as a syntax extension)
(define f
  (lambda (x)
    (g x)))

(define g
  (lambda (x)
    (+ x x)))
(f 3) => 6
```
