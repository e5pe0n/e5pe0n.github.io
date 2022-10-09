---
title: "My First Impression on Rust"
categories:
  - Note
tags:
  - Rust
last_modified_at: 2022-10-09
---

# Pros

- strict static typed language
- not using inheritance
- supports iterator and higher-order functions such as `map` and `filter`
  - lazy evaluation
- can easily setup dev env
- `null` doesn't exist
  - `Option` trait instead
- `if` expression
  - not statement
- pattern matching

# Cons & Wish List

- simply hard to learn
  - ownership
  - borrowing rules
  - various smart pointers
  - personally for the first time confused about
    - ownership and borrowing
    - pointer, reference, and slice
  - various features coming from other languages
    - C/C++, Scala, Haskell, etc.
      - from low-level imperetive languages to functional programming languages
    - i think it's almost impossible to start learning programming from Rust
    - required some experience and understanding about programming languages
  - i'm interested in why Rust is so loved by people using Rust
    - not mean to critisize Rust
    - i want to know how Rust solves conventional problems and satisfies those programmer specifically
- maybe not match functional programming style
  - writing closures is tiresome
    - ownership and lifetime make writing closure hard
    - also there is `function pointer` other than closure
- not support
  - spread syntax like JS
  - struct composition like TS's types
    - trait doesn't allow us to define fields to define ones in common about related structs
    - cannot define partial or extended structs from a base struct
  - default arguments
  - variable-length arguments
    - this can be achived by using macros
    - i.e. have to write macros

## Closures Capturing the Same Vairable

JS/TS

```ts
{
  const counters = () => {
    let cnt = 0;

    const counter1 = () => {
      ++cnt;
      return cnt;
    }

    const counter100 = () => {
      cnt += 100;
      return cnt;
    }

    return [counter1, counter100];
  }

  const [c1, c100] = counters();

  console.log(c1())
  console.log(c1())
  console.log(c100())
  console.log(c100())
  console.log(c1())
  console.log(c100())

// 1
// 2
// 102
// 202
// 203
// 303
}

```


Rust

```rs
use std::cell::RefCell;
use std::rc::Rc;

type Counter = Box<dyn FnMut() -> i32>;

fn counters() -> (Counter, Counter) {
    let cnt1 = Rc::new(RefCell::new(0));
    let cnt2 = Rc::clone(&cnt);

    let counter1 = move || -> i32 {
        *cnt1.borrow_mut() += 1;
        *cnt1.borrow_mut()
    };

    let counter100 = move || -> i32 {
        *cnt2.borrow_mut() += 100;
        *cnt2.borrow_mut()
    };

    (Box::new(count1), Box::new(count100))
}

fn main() {
    let (mut c1, mut c100) = counters();

    println!("{}", c1());
    println!("{}", c1());
    println!("{}", c100());
    println!("{}", c100());
    println!("{}", c1());
    println!("{}", c100());
}
// 1
// 2
// 102
// 202
// 203
// 303

```
