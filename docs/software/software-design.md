# Software Design

## Axioms

- software design is not a solid stuff
  - designing software architecture never ends
  - it is changing over development
- the primary purpose of architecture is to support the life cycle of the system
  - good architecture makes the system easy to understand, easy to develop, easy to maintain, and easy to deploy
  - the ultimate goal is to minimize the lifetime cost of the system and to maxmize programmer productivity
- the architecture of the system should elevate the use cases, the features, and the required behaviours of the system to first-class entities that are visible landmarks for the developers
- good architecture centered on use cases so that architects can safely describe the structures that support those use cases without commiting to frameworks, tools, and environments

## Software Architecture

- Structure
  - type of architecture style
    - microservice
    - layered
    - microkernel
- Architecture Charactaristics
  - success criteria of a system
    - availability
    - reliability
    - testability
    - scalability
    - security
    - agility
    - fault tolerance
    - elasticity
    - receverability
    - performance
    - deployablility
    - learnability
- Architecture Decision
  - rules for how a system should be constructed
- Design Principles
  - a guideline

## Symptoms of Complexity

- change amplification
- cognitive load
- unknown unknown

## Causes of Complexity

- dependendies
- obscurity

## Modular Design

- goal of modular design is moinimize the dependencies between modules
- module consists of *interface* and *implementation*

### Interfaces

- **any information a developer needs to know in order to use a module**
  - e.g.
    - signiture
      - name
      - parameters
      - returns
    - comments, documents
  - if users need to read the code of a method in order to use it, then there is no abstraction
- **more important for a module to have a simple interface than a simple implementation**

### Implementations

- **reduce the number of places where exceptions have to be handled**
  - **define errors out of existence**

## Performance

- **before attempting to improve performance, measure the system's existing behaviour**


## Domain

- subject area to which users applies the program
- subject area of the problem we solve using software

## Model

- simplification
- abstraction
  - **filter out extraneous details**
- effective modeling
  - knowledge crunching
  - cultivating a language based on the model
    - Ubiquitous Language
      - changes in the Ubiquitous Language are changes to the model
  - iteration
    - software development is all design
- don't just model reality (e.g. actual manual operations that will be automated by software/system) as is
  - model them from the perspective of software/system too

## SOLID Principles

suggest how to arrange functions and data structures into classes, and how those classes should be interconnected to design the mid-level (module level) software architectures that
- tolerate change
- are easy to undarstand
- are reusable in many software systems

### SRP; Single Responsibility Principle

- a module should be responsible to one, and only one, actor
  - actor: group of user or stakeholder who wants the system changed in the same way
- a moule should NOT have multiple reasons to change

### OCP; Open-Closed Principle

- a software architect should be open for extension but closed for modification
- if SRP is obeyed, a feature extension won't affect to modules for other features
- associated with CCP

### LSP; Liskov Substitution Principle

- polymorphism

### ISP; Interface Segregation Principle

- avoid depending on things that they don't use
- have clear abstraction/concept of the module

### DIP; Dependency Inversion Principle

- implement interfaces for the high-level module which uses lower-level modules
- lower-level modules should NOT know the implementation details of higher-level modules
- have lower-level modules obey the interfaces
  - now we can have inverted dependency from lower-level to higher-level without knowledge about implemetation details of higher-level module

## Components

### Component-level Principles

#### REP; Reuse/Release Equivalence Principle

- the granule of reuse is the granule of release

#### CCP; Common Closure Principle

- component-level [SRP](#srp-single-responsibility-principle)
  - a component should NOT have multiple reasons to change

#### CRP; Common Reuse Principle

- component-level [ISP](#isp-interface-segregation-principle)

### Component Dependencies

- component structure cannot be designed from the top down
  - component dependencies graph is created for the first time if it reached the time dependency management was necessary
  - component dependencies graphs is for mapping to buildability and maintainability of the application; not for describing the function of the application

#### ADP; Asynclic Dependencies Principle

- allow no cycles in the component dependency graph

#### SDP; Stable Dependencies Principle

- depend in the direction of stability
- ensure that modules that are intended to be easy to change are not depended on by modules that are harder to change

#### SAP; Stable Abstraction Principle

- a component should be as abstract as it is stable
- [SDP](#sdp-stable-dependencies-principle) + [SAP](#sap-stable-abstraction-principle) -> dependencies run in the direction of abstraction

## Business Rules

- Critical Business Rules
  - make or save the business money
  - some of them are purelly irrespective of whether they were implemented on a computer
- Entity
  - Critical Business Data
    - data required by critical business rules
  - generalized concept; not *application-specific*
- Use Cases
  - define *application-specific* business rules
    - automated operation to make or save the business money
    - at lower-level than Entities since Use Cases depend on the application/system; not generalized as much as Entities
  - e.g. apply an estimation (validation) to user info for loan then create Customer entity if acceptable
  - have input and ouput
    - but should not depend on how input and output are delivered
      - e.g. HTTP request and response, HTML, SQL


```mermaid
classDiagram
    class Loan{
        - principle
        - rate
        - period
        + makePayment() // Business Rule
        + applyInterest() // Business Rule
        + chargeLateFee() // Business Rule
    }
```

## Humble Objects

- separate behaviours into tastables and non-testables
- from the uesr's point of view, an object is simply a set of operations; an object represent behaviours
  - becaues users cannot see private fields

## Layered Architecture

- User Interface (or Presentation Layer)
- Application Layer
  - services
  - not contain business rules or knowledge
  - not have state reflecting business situation
  - only coordinates tasks and delegates work to collaborations of domain objects in the next layer down
- Domain Layer (or Model Layer)
  - business situation
  - business rules
  - control and use state reflecting the business situation
- Infrastructure Layer
  - ORM


## Model-Driven Design

```mermaid
flowchart LR
  mdd(Model-Driven Design) -->|express model with|s(services)
  mdd(Model-Driven Design) -->|express model with|e(Entities)
  mdd(Model-Driven Design) -->|express model with|vo(Value Object)
  mdd(Model-Driven Design) -->|isolate domain with|la(Layered Architecture)

  e -->|access with|r(Repositories)
  e -->|maintain integrity with|a(Aggregates)
  e -->|act as root of|a
  e -->|encapsulate with|f(Factories)

  vo -->|encapsulate with|a
  vo -->|encapsulate with|f

  a -->|encapsulate with|f
  a -->|access with|r
```

### Components

#### Entities

- distinguished by its identity
  - guaranteed the uniqueness
- need to maintain the life cycle
- e.g. user

#### Value Objects

- representing a descriptive aspect of the domain with no conceptual identity
  - representing elements of the design that we care about only for *what* they are, not *who* or *which* they are
- immutable
- disposable
- e.g.
  - attributes of an Entity
  - used as parameters in messages between objects

```mermaid
classDiagram
  note for Customer "Entity"
  note for Address "Value Object"
  Customer *-- Address
  class Customer{
    customerID
    name
    address
  }
  class Address{
    street
    city
    state
  }
```

#### Services

- overview
  - an operation offered as an interface that stands alone in the model, without encapsulating state, as Entities and Value Objects do
    - operation names should come from the Ubiquitous Language or be introduced into it
    - parameters and results should be domain objects
- characteristics
  - the operation relates to a domain concept that is not a natural part of an Entity or Value Object
  - the interface is defined in terms of other elements of the domain model
  - the operation is stateless

### Life Cycle Management of Domain Objects

#### Aggregates

- a cluster of associated objects that we treat as a unit for the purpose of data changes
  - transaction against the associated objects
- responsibilities
  - invariant enforcement
  - change management
- consists of a root and a boundary
  - root
    - a single, specific Entity
    - objects outside the Aggregate can reference to only the root
    - can be obtained directly from resource (e.g. database)
      - other objects must be found by traversal of associations
  - boundary
    - a delete operation must remove everything within the boundary at once
    - when a change to any object within the boundary is commited, all invariants of the whole Aggregate must be satisfied

#### Factories

- manage the beginning of the object's life cycle
- create and reconstitute complex objects
  - delegate invariant checking to objects or aggregate
  - ensure that creating objects satisfy client and internal rules

#### Repositories

- manage the middle and end of the object's life cycle
- motivation
  - allowing free access from client to infrastructure such as database leads to complicate the client and obscure model-driven design
- **emulate access to infrastructure as if it is just like to manipulate a in-memory collection such as lists and maps**
  - but leave transaction control to the client
- **don't fight frameworks**; look for affinities between the concepts of domain-driven design and the concenpts in the framework
- **Repositories as object are not necessary when contructing a workflow placing I/O process to the edge in the workflow**

```mermaid
flowchart LR
  jxi(JSON/XML)
  ds(Desirialize)
  di("DTO-In; Data Transfer Object")
  di2dm(DTO-In to Domain Model)
  dm(Domain Model)
  dm2do(Domain Model to DTO-Out)
  do("DTO-Out; Data Transfer Object")
  so(Serialize)
  jxo(JSON/XML)

  subgraph From Upstream Context
  jxi --> ds
  ds --> di
  end

  subgraph Bounded Context
    subgraph I/O-In
      di --> di2dm
    end

  di2dm --> dm
  dm --> dm2do

    subgraph Pure Code
      dm
    end
    subgraph I/O-Out
      dm2do
    end
  end

  subgraph To Donwstream Context
  dm2do --> do
  do --> so
  so --> jxo
  end
```

## Supple Design

```mermaid
flowchart LR
  ul(Ubiquitous Language)
  iri(Intention-Revealing Interfaces)
  mmd(Model-Driven Design)
  sc(Standalone Classes)
  cc(Conceptual Contours)
  coo(Closure of Operations)
  seff(Side-Effect-Free Functions)
  a(Assertions)

  iri -->|draw from| ul
  iri -->|simplify interpretation| coo
  iri -->|make safe and simple| seff
  iri -->|make side effects explicit| a

  seff <-->|make composition safe| a

  mmd -->|simplify interpretation| sc
  mmd -->|express model through| iri
  mmd -->|reduce cost of change| cc


  sc -->|may use| coo

```

## Model Integrity Patterns

```mermaid
flowchart TD
  bc(Bounded Context)
  ul(Ubiquitous Language)
  ci(Continuous Integration)
  cm(Context Map)
  sk(Shared Kernel)
  cst(Customer/Supplier Teams)
  c(Conformist)
  ohs(Open Host Service)
  pl(Published Language)
  sw(Separate Ways)
  al(Anticorruption Layer)

  bc -->|names enter| ul
  bc -->|keep model unified by| ci
  bc -->|assess/overview relationships with| cm
  cm -->|oeverlap allied contexts through| sk
  cm -->|relate allied contexts as| cst
  cm -->|overlap unilaterally as| c
  cm -->|support multiple clients through| ohs
  ohs -->|formalize as| pl
  cm -->|free teams to go| sw
  cm -->|traslate and insulate unilaterally with| al

```

## Smart Constructor

- validate initial values ensuring the created object is valid and holds invariants


## Referencies

- [A Philosophy of Software Design](https://www.amazon.co.jp/-/en/John-K-Ousterhout-ebook/dp/B09B8LFKQL)
- [Clean Architecture: A Craftsman’s Guide to Software Structure and Design](https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/)
- [Fundamentals of Software Architecture](https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/)
- [Domain-Driven Design: Tackling Complexity in the Heart of Software](https://www.oreilly.com/library/view/domain-driven-design-tackling/0321125215/)
- [Domain Modeling Made Functional - Tackle Software Complexity with Domain-Driven Design and F#](https://pragprog.com/titles/swdddf/domain-modeling-made-functional/)
- [Effective Haskell](https://effective-haskell.com/)
