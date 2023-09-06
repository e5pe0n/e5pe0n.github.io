---
title: "WIP: Software Development Philosophy"
categories:
  - Software Development
tags:
  - Software Development
last_modified_at: 2023-03-01
---

# Discipline

- we must own up to our shortcomings----our ignorance and our mistakes.  
- provide options, don't make lame excuses
  - before you approach anyone to tell them why something can't be done, is late, or is broken, stop and **listen to yourself.**  
- don't leave "broken windows" (bad designs, wrong decisions, or poor code) unrepaired.  
  - decadence is contagious  
    - e.g. complexity of the system increase incrementally
  - list up problems on the board every team member can see naturally  
- keep documents up to date


# Storategies

- tracer bullet development (incremental development approach)
  - overview
    - implement throughout the system to make sure the entire system works at least partially properly as fast as possible
    - then gradually adjust and augment the implementation
  - pros
    - can get feedback fast
    - can have integration platform
  - cautions
    - respect *strategic programming* rather than *tactical programming*
      - just implementing "working code" is not enough
      - don't forget to augment the concept/abstraction along with additional features/implementations if necessary to fit the software design
        - **software design is a continuous process**
        - features/implementations should be in the range of the concept/abstraction
  - opposite storategies
    - implement frontend all, implement backend all, then integrate them at once
  - vs.prototyping
    - prototyping
      - generates disposable code
      - the reconnaissance and intelligence gathering before tracer bullet
    - tracer code is lean but complete, and forms part of the skeleton of the final system

# DX

- don't make utility tools only for your local environment
  - i.e. make utility tools to help team members develop efficiently
  - e.g. scripts to create data to check if the app works properly

# Coding

- ETC principle; Easier to Change
  - good design is easier to change than bad design
  - every design principle out there is simply a special case of ETC.
- DRY principle; Don't Repeat Yourself
  - every piece of knowledge must have a single, unambiguous, authoritative representation within a system

- DBC; Design by Contracts
  - make these below explicit when implementing module, class, function, etc.
    - preconditions
    - postconditions
    - invariants
  - don't just catch and raise each exception as is; just propagate them if each *try-catch*es actually don't handle exceptions
    - e.g.  
      ```ts
      { // Bad code
        function f() {
          try {
            f1(); // possibly throw errors
          } catch (err) {
            // just catch error and throw it as is
            console.error("f1 failed");
            throw err;
          }

          try {
            f2(); // possibly throw errors
          } catch (err) {
            // just catch error and throw it as is
            console.error("f2 failed");
            throw err;
          }
        }

        function supervisor() {
          // having responsibility to handle exceptions
          try {
            f();
          } catch (err) {
            // handling errors here after all
          }
        }
      }

      { // Removing redundant try-catchs; just propagate exceptinos
        function f() {
          f1();
          f2();
        }

        function supervisor() {
          // having responsibility to handle exceptions
          try {
            f();
          } catch (err) {
            // handling propagated errors
          }
        }
      }
      ```

# Refactoring

- **put priority on consitency**
  - confort the current convention even when coming to mind better implementation
  - it just become an exception in the entire software design, that increases the complexity and tends to lose the order
  - before modifying them, share the ideas and consideration in your mind with team members first
    - **software development seems to be close to philosophizing**; we have to share and match our recognition and understanding about abstract images in our mind
      - e.g. does the `User` class actually completely project the same *User* into my mind and yours?  

# Testing

- write test code putting high priority on KISS principle
  - in my experience, one of the most important thing on writing test code is **how we write/read test code without using our brain as much as possible**
  - avoid logics such as if-statement and for-loop in test code
  - condone to copy and paste code
    - organizing test code similarily with application code is often hard work and doesn't correspond to cost to do it and maintain the code
  - create test dataset within each test as much as possible
    - each test should be independent each other  

# References

- [The Pragmatic Programmer (20th Anniversary Ed.)](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/)
- [A Philosophy of Software Design (2nd Ed.)](https://www.amazon.co.jp/-/en/John-Ousterhout/dp/1732102201)
- [The Unix Philosophy (1st Ed.)](https://www.amazon.co.jp/UNIX-Philosophy-Mike-Gancarz/dp/1555581234)