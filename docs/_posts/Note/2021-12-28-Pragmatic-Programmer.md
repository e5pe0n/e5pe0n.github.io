---
title: Note: Pragmatic Programmer
categories:
  - Note
tags:
  - Programming Language
last_modified_at: 2021-12-28
---

The Pragmatic Programmer (20th Aniversary Edition) / David Thomas, Andrew Hunt / Pearson Addison-Wesley

# Keep in Mind

## General

- review my technical portfolio regulary

## Coding

- a good design produces something that's easier to change than a bad design.
  - -> effective on agile development
    - we refactor our code to respond to feedbacks frequently
- consider reversibility of code
- get familiar with shell commands
- get familiar with editor shortcuts
- think of a program as a data transformation, converting input data to outputs
- prefer inheritance to these below
  - interfaces and protocols
  - delegation
  - mixins and traits
- refactor early, refactor often
  - a medical analogy
    - take out it while it is small, or it grows and spreads so it will be hard to remove it
## Debugging

- try to explain to someone or a rubber duck why the problem is caused
- binary chop
- test realistic end-user usage patterns

## Project

- do not embed business policy to code
  - implement the general case with the policy as an example the system needs to support
- requirements documents are not for clients
  - clients might not read them

# Principles

- ETC; Eeasier to Change
- DRY; Don't Repeat Yourself
- [DBC; Design by Contract](#DBC;-Design-by-Contract)

<br>

## DBC; Design by Contract

Be strict with what you will accept and promise as little as possible in return.

### Expectations

- Preconditions
  - domain of a function
- Postconditions
  - range of a function
- Class Invariants

<br>

- validation for the arguments should be in a *caller*, not a *routine*
  - because a preconditions are guaranteed for a routine.
  - we can implement routines for only domain.

## TDA; Tell, Don't Ask

```js
// Bad
const applyDiscount = (customer, orderId, discount) {
  customer
    .orders
    .find(orderId)
    .getTotals()
    .applyDiscount(discount)
}
```

```js
// Improved
const applyDiscount = (customer, orderId, discount) {
  customer
    .findOrder(orderId)
    .applyDiscount(discount)
}
```
