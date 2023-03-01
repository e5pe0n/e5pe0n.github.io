---
title: "WIP: Note: A Philosophy of Software Design"
categories:
  - Software Development
tags:
  - Software Development
last_modified_at: 2023-03-01
---

- the greatest limitation in writing software is our ability to understand the system we are creating
  - one of the most important goals of good design is for a system to be obvious

- software design is a continuous process
  - i.e. software design is never done
  - incremental approach works more effectively than *waterfall model*
    - e.g. *agile development*

- complexity
  - definition
    - anything related to the structure of a software system that makes it hard to understand and modify the system
  - symptoms
    - change amplification
      - a seemingly simple change requires code modifications in many different places
    - cognitive load
      - how much a developer needs to know in order to complete a task
    - unknown unknowns
      - it's not obvious which pieces of code must be modified to complete a task
  - causes
    - dependencies
    - obscurity
  - approaches
    - make code simpler and more obvious
    - *modular design*
      - definition
        - encapsulate the complexity so that programmer work on a system without being exposed to all of its complexity at once
      - goal
        - minimize the dependencies between modules

- module
  - module consists of an *interface* and an *implementation*
    - interface
      - interface consists of formal interface and informal interface
        - formal interface
          - e.g. function signiture
        - informal interface
          - if developer needs to know a particular piece of information in order to use a module, then that information is part of the module's interface
      - interfaces should be designed to make the common case as simple as possible to reduce cognitive load
        - hide information unnecessary to use the module
    - implementation
  - module should embrace some concept and provides an abstraction in the form of its interface
    - abstraction is a simplified view of an entity which omits unimportant details