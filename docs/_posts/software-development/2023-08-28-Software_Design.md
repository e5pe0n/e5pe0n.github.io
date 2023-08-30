---
title: "WIP: System Architecture"
categories:
  - Software Design
tags:
  - Software Design
  - Clean Architecture
  - DDD
last_modified_at: 2023-08-28
---

# SOLID Principles

suggest how to arrange functions and data structures into classes, and how those classes should be interconnected to design the mid-level (module level) software architectures that
- tolerate change
- are easy to undarstand
- are reusable in many software systems

## SRP; Single Responsibility Principle

- a module should be responsible to one, and only one, actor
  - actor: group of user or stakeholder who wants the system changed in the same way
- a moule should NOT have multiple reasons to change

## OCP; Open-Closed Principle

- a software architect should be open for extension but closed for modification
- if SRP is obeyed, a feature extension won't affect to modules for other features
- associated with CCP

## LSP; Liskov Substitution Principle
  - polymorphism

## ISP; Interface Segregation Principle

- avoid depending on things that they don't use
- have clear abstraction/concept of the module

## DIP; Dependency Inversion Principle

- implement interfaces for the high-level module which uses lower-level modules
- lower-level modules should NOT know the implementation details of higher-level modules
- have lower-level modules obey the interfaces
  - now we can have inverted dependency from lower-level to higher-level without knowledge about implemetation details of higher-level module

# Components

## Component-level Principles

### REP; Reuse/Release Equivalence Principle

- the granule of reuse is the granule of release

### CCP; Common Closure Principle

- component-level SRP
  - a component should NOT have multiple reasons to change

### CRP; Common Reuse Principle

- component-level IRP


# Referencies

- Clearn Architecture
- Domain-Driven Design
