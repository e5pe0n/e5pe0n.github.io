---
title: "Note: A Philosophy of Software Design"
categories:
  - Software Development
tags:
  - Software Development
last_modified_at: 2023-03-01
---

[A Philosophy of Software Design, 2nd Edition](https://www.amazon.co.jp/-/en/John-K-Ousterhout-ebook/dp/B09B8LFKQL)

# Contents

- [Introduction](#introduction)
- [Complexity](#complexity)
  - [Symptoms](#symptoms)
  - [Causes](#causes)
  - [Approaches](#approaches)
- [Modular Design](#modular-design)
  - [Module](#module)
    - [Interface](#interface)
      - [Formal Interface](#formal-interface)
      - [Informal Interface](#informal-interface)
- [Consistency](#consistency)
- [Obvious](#obvious)


# Introduction

- the greatest limitation in writing software is our ability to understand the system we are creating
  - one of the most important goals of good design is for a system to be obvious
  - i.e. reduce complexity of the system

- software design is a continuous process
  - i.e. software design is never done
  - incremental approach works more effectively than *waterfall model*
    - e.g. *agile development*

<br>




# Complexity

- anything related to the structure of a software system that makes it hard to understand and modify the system

## Symptoms

- change amplification
  - a seemingly simple change requires code modifications in many different places
- cognitive load
  - how much a developer needs to know in order to complete a task
- unknown unknowns
  - it's not obvious which pieces of code must be modified to complete a task

## Causes

- dependencies
- obscurity

## Approaches

- make code simpler and more obvious
  - software should be designed for ease of reading, not ease of writing
- [*modular design*](#modular-design)

<br>


# Modular Design

- encapsulate the complexity so that programmer work on a system without being exposed to all of its complexity at once
- goal: minimize the dependencies between modules

## Module

- module consists of an [*interface*](#interface) and an *implementation*
- module should embrace some concept and provides an abstraction in the form of its interface
  - abstraction is a simplified view of an entity which omits unimportant details
- the best modules are those that provide powerful functionality yet have simple interface; *deep modules*
  - more important to have a simple interface than a simple implementation
- avoid *temporal decomposition*
  - temporal decomposition
    - if you're using the modules considering the order, those modules are decomposed as temporal decomposition
  - when designing modules, focus on the knowledge that's needed to perform each task, not the order in which tasks occur
- reduce the number of places where exceptions have to be handled
- the increments of development should be abstractions, not features


![deep module vs. shallow module]({{site.url}}{{site.baseurl}}/assets/Software_Development/deep-module-vs-shallow-module.drawio.svg)


### Interface

- describing *what* the module does but not *how* it does it
- interface consists of [formal interface](#formal-interface) and [informal interface](#informal-interface)
- the most important consideration for an interface is ease of use for higher level software
- interfaces should be designed to make the common case as simple as possible to reduce cognitive load
  - hide information unnecessary to use the module; *information hiding*
  - Be aware of *information leakage* in point of view of both formal interface and informal interface
  - generality leads to better information hiding


#### Formal Interface

- e.g. function signiture

#### Informal Interface

- e.g. comments, documents
  - comments to document the abstraction the module embraces should be written as part of the design process
    - comments provide the only way to fully capture abstractions, and good abstractions are fundamental to good system design
  - if interface comments must also describe the implementation, then the class or method is shallow
- if developer needs to know a particular piece of information in order to use a module, then that information is part of the module's interface
- if users must read the code of a method in order to use it, then there is no abstraction
- developers should be able to understand the abstraction provided by a module without reading any code other than its externally visible declarations

<br>


# Consistency

- useful to reduce the complexity of a system and making its behaviour obvious
- appliable examples
  - names
  - coding styles
  - interfaces
  - design patterns,
  - invariants
- approach to establish and maintain consistency
  - document
  - enforce
    - e.g. linter, formatter
- **don't change existing conventions**
  - having a "better idea" is not a sufficient excuse to introduce inconsistencies

<br>


# Obvious

- "obvious" is in mind of the reader; the best way to determine the obviousness of the code is through code reviews
