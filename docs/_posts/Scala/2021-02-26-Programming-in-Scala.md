---
title: "Note: Programming in Scala"
categories:
  - Note
tags:
  - Programming
  - Scala
last-modified-at: 2021-02-26
---

# List

## zip vs lazyZip

*zip* Cons  
- *zip* method creates an intermediate list. this can be an important cost if it has large length.  
- *map* method takes a tuple as an argument so *placeholder* `_` cannot be used to take it.  

```scala
val mapped = (List(10, 20) zip List(3, 4, 5)).map { case (x, y) => x * y }
```

*lazyZip* resolves the above problems.  

```scala
val lazyMapped = (List(10, 20) lazyZip List(3, 4, 5)).map(_ * _)
```

## filter vs withFilter

*withFilter* returns *FilterMonadic* instead of a collection to avoid creating an extra intermediate data.    
*for* loop with *yield* is translated to a code using *withFilter*.  

```scala
case class Person(name: String, isMale: Boolean, children: Person*)

val lara = Person("Lara", false)
val bob = Person("Bob", true)
val julie = Person("Julie", false, lara, bob)
val persons = List(lara, bob, julie)

val motherAndChilds = persons filter (p => !p.isMale) flatMap (p =>
  (p.children map (c => (p.name, c.name)))
)
println(motherAndChilds) // List((Julie,Lara), (Julie,Bob))

// withFilter does not make an intermediate data
val motherAndChilds2 = persons withFilter (p => !p.isMale) flatMap (p =>
  (p.children map (c => (p.name, c.name)))
)
println(motherAndChilds2) // List((Julie,Lara), (Julie,Bob))

// translated to the above withFilter version
val motherAndChilds3 =
  for (p <- persons; if !p.isMale; c <- p.children) yield (p.name, c.name)
println(motherAndChilds3)
```

<br>


# Nothing, Null, None, and Nil

## Nothing

a subtype of every Scala's type.  
*Nothing* is also subclass of *Null*.  

## Null

a subtype of every Scala's type that inherits from *AnyRef*.  
*Null* represents that the variable has no reference.  

## None

a value of *Option[T]* type.  
*None* represents that the variable is not *Some(x)*.  

e.g.  

```scala
val fstEven = List(1, 2, 3, 4, 5) find (_ % 2 == 0) // Option[Int] = Some(2)
val fstLower0 = List(1, 2, 3, 4, 5) find (_ <= 0) // Option[Int] = None
```

## Nil

*Nil* is equivalent to empty list, i.e. `List[Nothing]()`.  

```scala
val lst = 1 :: 2 :: 3 :: Nil  // List(1, 2, 3)
```
