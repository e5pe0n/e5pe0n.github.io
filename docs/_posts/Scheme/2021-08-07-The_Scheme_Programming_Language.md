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
  (f)) ; 3
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


<br>

# Chapter 6. Operations on Objects

## Generic Equivalence and Type Predicates

### `eq?`

- returns `#t` if *obj1* and *obj2* are identical, otherwise returns `#f`
  - identical means the same address their objects are
- **cannot be used to compare numbers and characters reliably.**

### `eqv?`

- returns `#t` if *obj1* and *obj2* are equivalent

```scheme
(= -0.0 +0.0)     ; #t

(eqv? -0.0 +0.0)  ; #f
; because
(/ 1.0 -0.0)  ; -inf.0
(/ 1.0 +0.0)  ; +inf.0
```

```scheme
(eqv? '(a) '(b)) ; #f
(eqv? '(a) '(a)) ; unspecified
(let ([x '(a . b)]) (eqv? x x)) ; #t
(let ([x (cons 'a 'b)])
  (eqv? x x)) ; #t
(eqv? (cons 'a 'b) (cons 'a 'b)) ; #f
```

### `equal?`

- returns `#t` if *obj1* and *obj2* have the same structure and contents, otherwise returns `#f`

```scheme
(equal? 3 3.0)  ; #f


(equal? '(a) '(b)) ; #f
(equal? '(a) '(a)) ; #t
(let ([x '(a . b)]) (equal? x x)) ; #t
(let ([x (cons 'a 'b)])
  (equal? x x)) ; #t
(equal? (cons 'a 'b) (cons 'a 'b)) ; #t
```

## Lists and Pairs

- empty list `'()` is not a pair
  - cannot apply `(car)` or so

### `memq`, `memv`, `member`

```scheme
(memq obj list)
(memv obj list)
(member obj list)
```

- returns the first *tail* whose the first element evaluates to `#t` by the comparison procedure, otherwise returns `#f`
- returned *tail* is reference; not a copy of the list passed as an argument

| procedure | comparison precedure |
| :-------: | :------------------: |
|  `memq`   |        `eq?`         |
|  `memv`   |        `eqv?`        |
| `member`  |       `equal?`       |


### `remq`, `remv`, `remove`

```scheme
(remq obj list)
(remv obj list)
(remove obj list)
```

- remove all elements evaluted to `#t` by comparison precedure to the *obj* from the passed the *list*

| procedure | comparison precedure |
| :-------: | :------------------: |
|  `remq`   |        `eq?`         |
|  `remv`   |        `eqv?`        |
| `remove`  |       `equal?`       |


### `assq`, `assv`, `assoc`

```scheme
(assq obj alist)
(assv obj alist)
(assoc obj alist)
```

- *alist* must be an *association list* (a proper list of key-value pairs)
- returns the first key-value pair evaluated to `#t` by comparison precedure to *obj*, otherwise returns `#f`

| procedure | comparison precedure |
| :-------: | :------------------: |
|  `assq`   |        `eq?`         |
|  `assv`   |        `eqv?`        |
|  `assoc`  |       `equal?`       |


```scheme
(define print
  (lambda (x)
    (for-each display `(,x "\n"))
  )
)

; assq
(print
  (assq 'b '((a . 1) (b . 2)))
) ; (b . 2)
(print
  (cdr (assq 'b '((a . 1) (b . 2))))
) ; 2
(print
  (assq 'c '((a . 1) (b . 2)))
) ; #f

; assv
(print
  (assv 2/3 '((1/3 . 1) (2/3 . 2)))
) ; (2/3 . 2)
(print
  (assv 2/3 '((1/3 . a) (3/4 . b)))
) ; #f

; assoc
(print
  (assoc '(a) '(((a) . a) (-1 . b)))
) ; ((a) . a)
(print
  (assoc '(a) '(((b) . b) (a . c)))
) ; #f
(print
  (let ([alist (list (cons 2 'a) (cons 3 'b))])
    (set-cdr! (assv 3 alist) 'c)
    alist
  )
) ; ((2 . a) (3 . c))
```

## Section 6.9. Vectors

- the length; the number of elements is fixed
- can access any element in constant time
  - c.f. *list* takes linear time

## Section 6.14. Enumerations

- ordered set of symbols