---
title: "Note: Programming in Scala"
categories:
  - Note
tags:
  - Programming
  - Scala
last-modified-at: 2021-03-22
---

# Import

```scala
import Fruits._ // import any classes or functions
import Fruits.{Apple, Orange} // import only Apple and Orange
import Fruits.{Apple => MacIntosh} // import only Apple as MacIntosh
```

<br>

# Accecibility

## private

visible only inside the class or object that contains the member definition.  
This applies also for inner classes.  

```scala
class Outer {
  class Inner {
    private def f() = {}
    class InnerMost {
      f() // OK
    }
  }
  (new Inner).f() // NG
}


class C {
  private[this] val v // access only from same object

  def add(that: C) = v + C.v  // NG
}
```

## protected

only accesible from subclasses of the class in which the member is defined.  

```scala
package p {
  class Super {
    protected def f() = {}
  }
  class Sub extends Super {
    f()
  }
  class Other {
    (new Super).f() // NG
  }
}
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

<br>

# Scala Collections

- Immutable or Mutable
- Strict or Non-strict
  - strict: eagerly evaluate the elements
    - List, Set, etc
  - non-strict: delay evaluation until each element is needed
    - LazyList, View, etc

<br>


# *Iterable*

see p.572 for *Iterable*'s methods.    

<br>

# *Seq*

The *Seq* trait represents sequences.  
A sequence is a kind of iterable that has a *length* and whose elements have fixed index positions, starting from 0.  

see p.580 for *Seq*'s methods.    


<br>

# List

### Note:

*List* can access the head in constant time but **cannot** access other element in constant time! (it takes linear time to the length of List)    
If you want a collection for random access, use *Vector* or *ArraySeq*.  

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

## *View*s

*view* method converts the collection to another collection evaluated lazily, so we can avoid to create unecessary intermediate data.  

```scala
val v = Vector(1 to 10: _*)
println(v)

val v2 = v map (_ + 1) map (_ * 2) // creates intermediate vectors, which is waste
println(v2) // Vector(4, 6, 8, 10, 12, 14, 16, 18, 20, 22)

val v3 = (v.view map (_ + 1) map (_ * 2)).to(Vector) // not creates intermediate vectors
println(v3) // Vector(4, 6, 8, 10, 12, 14, 16, 18, 20, 22)
```

<br>

# *for* expressions and loops

*map*, *flatMap*, *foreach*, and *withFilter* are defined in arbitrary class, *for* expressions and loops to the class are translated to applications of these methods.    
i.e. you can use *for* expressions and loops instead of these methods.  


<br>

# *LazyList*

```scala
val str = 1 #:: 2 #:: 3 #:: LazyList.empty
println(str) // LazyList(<not computed>)
println(str.toList) //List(1, 2, 3)

def fibFrom(a: Int, b: Int): LazyList[Int] = a #:: fibFrom(b, a + b)
val fibs = fibFrom(0, 1).take(10)
println(fibs) // LazyList(<not computed>)
println(fibs.toList) // List(0, 1, 1, 2, 3, 5, 8, 13, 21, 34)
```

<br>

# *ArraySeq*

Can access any element of the collection in constant time.  
On the other hand, **cannot** prepend an *ArraySeq*, add or update a element in constant time, which takes linear time to the length of *ArraySeq*.  


<br>


# *Vector*

Access and update to any elements takes only effectively constant time.  

<br>

# *Set*

see p.585 for *Set*'s methods.  

<br>

# *Map*

see p.591 for *Map*'s methods.  

<br>


# *Range*

```scala
val rng1_3 = 1 to 3
println(rng1_3) // Range 1 to 3

val rng5_14_3 = 5 to 14 by 3
println(rng5_14_3) //Range 5 to 14 by 3

val rng1_2 = 1 until 3 // 3 is not included
println(rng1_2) // Range 1 until 
```

<br>

# *BitSet*

Testing for inclusion takes constant time.  
Adding an item to the set takes time proportional to the number of *Long*s in the bit set's array, which is typically a small number.  

## Immutable

```scala
import scala.collection.immutable.BitSet

val bits = .BitSet.empty
val moreBits = bits + 3 + 4 + 4
println(moreBits) // BitSet(3, 4)
println(moreBits(3)) // true
println(moreBits(0)) // false
```

## Mutable

```scala
import scala.collection.mutable.BitSet

val b = BitSet.empty
b += 1
b += 3
println(b) // BitSet(1, 3)
```

<br>


# *VectorMap*

keeps the insertion order.  

```scala
val vm = scala.collection.immutable.VectorMap.empty[Int, String]
val vm1 = vm + (1 -> "one")
val vm3 = vm1 + (3 -> "three")
val vm2 = vm3 + (2 -> "two")
println(vm2) // VectorMap(1 -> one, 3 -> three, 2 -> two)
println(vm2 == Map(2 -> "two", 1 -> "one", 3 -> "three")) // true
```


<br>

# *ArrayBuffer*

```scala
import scala.collection.mutable.ArrayBuffer

val buf = ArrayBuffer.empty[Int]
buf += 1
println(buf) // ArrayBuffer(1)
buf += 10
println(buf) // ArrayBuffer(1, 10)
val arr = buf.toArray
println(arr.mkString("Array(", ", ", ")")) // Array(1, 10)
```

<br>

# *ListBuffer*

Use *ListBuffer* if you may convert the buffer later.  

```scala
import scala.collection.mutable.ListBuffer

val listBuf = ListBuffer.empty[Int]
listBuf += 1
listBuf += 10
println(listBuf) // ListBuffer(1, 10)
println(listBuf.toList) // List(1, 10)
```

<br>

# *StringBuilder*

```scala
val strBuf = new StringBuilder
strBuf += 'a'
strBuf ++= "bcdef"
println(strBuf) // abcdef
val str = strBuf.toString
```

<br>

# *Queue*

```scala
import scala.collection.mutable.Queue

val q = Queue[String]()

q += "a"
println(q) // Queue(a)

q ++= List("b", "c")
println(q) // Queue(a, b, c)

q.dequeue
println(q) // Queue(b, c)
```


# *Stack*

<br>


# Hash tables

Iteration over a hash table is **not** guaranteed to occur in any particular odrder.  
Use *LinkedHashSet* or *LinkedHashMap* to guarantee iteration order instead.  

## *HashSet*

## *HashMap*


```scala
import scala.collection.mutable.HashMap

val m = HashMap.empty[Int, String]

m += (1 -> "make a web site")
println(m) // HashMap(1 -> make a web site)

m += (3 -> "profit!")
println(m) // HashMap(1 -> make a web site, 3 -> profit!)

println(m(1)) // make a web site
println(m contains 2) // false
```

## *WeakHashMap*

removes entries which are not refered by any others from the map.  
Main application is caching.  


<br>

# *Array*

Scala arrays correspond one-to-one to Java arrays, such as *Array[Int]* and *int[]*, *Array[Double]* and *double[]*, or so.  
also all sequence methods are available.  

<br>

# *String*

All sequence methods are available.  

<br>


# *IterableOnce*

![iterableOnce]({{ site.url }}{{site.baseurl}}/assets/Scala_images/iterableOnce.png

## *Iterator*

Use *Iterator* if you never access an iterator again after invoking a method on it.  

See p.626 for available methods.  

```scala
def mkIt = Iterator("a", "number", "of", "words")

val it = mkIt
for (i <- it) println(i)
// println(it.next()) // Exception in thread "main" java.util.NoSuchElementException: next on empty iterator

val it2 = mkIt
val it2WithMap = it2.map(_.length)
println(it2WithMap.hasNext) // true
it2WithMap foreach println // 1 6 2 5
println(it2WithMap.hasNext) // false

val it3 = mkIt
val it3WithDropWhile = it3 dropWhile (_.length < 2)
println(it3WithDropWhile.next()) // number

val (it4_1, it4_2) =
  mkIt.duplicate // it4_1 and it4_2 are independent each otehr
```

## *BufferedIterator*

has *head* method to look at the next value without advancing the iterator.  

```scala
def skipEmptyWordsNOT(it: Iterator[String]) = while (it.next().isEmpty) {}
// skip the first string even if it is not empty.

def skipEmptyWords(it: BufferedIterator[String]) =
  while (it.head.isEmpty) { it.next() }

val it = Iterator(1, 2, 3, 4)
val bit: BufferedIterator[Int] = it.buffered
println(bit.head) // 1
println(bit.next()) // 1
println(bit.next()) // 2
```

<br>


# The Architecture of Scala Collections

- same-result-type principle
  - wherever possible, a transformation operation on a collection will yield a collection of the same type.  

```scala
trait IterableOps[+A, +CC[_], +C] {
  // A: element type
  // CC: type constructor
  // C: complete type
  def filter(pred: A => Boolean): C = 
    iterableFactory.fromSpecific(new View.Filter(this, pred))

  def map[B](f: A => B): CC[B] = 
    iterableFactory.from(new View.Map(this, f))

  def iterableFactory: IterableFactory[CC]

  // these methods are for decision to evaluate the source elements in either a strict or non-strict way.
  protected def fromSpecific(source: IterableOnce[A]): C
  protected def from[E](source: IterableOnce[E]): CC[E]

  protected def newSpecificBuilder: Builder[A, C]
}

trait IterableFactory[++C[_]] {
  def from[A](source: IterableOnce[A]): CC[A]

  def newBuilder[A]: Builder[A, CC[A]]
}


trait List[+A] extends Iterable[A] with IterableOps[A, List, List[A]] {
  // List is strict type  
  def from[E](source: IterableOnce[E]): List[E] = 
    (new ListBuffer[E] ++= source).toList
}
```

```scala
trait SetOps[A, +CC[_], +C] extends IterableOps[A, CC, C] 


trait Set[A] extends Iterable[A] with SetOps[A, Set, Set[A]]
```

```scala
trait MapOps[K, +V, +CC[_, _], +C] extends IterableOps[(K, V), Iterable, C] {
  def map[K2, V2](f: ((K, V)) => (K2, V2)): CC[K2, V2] =
    mapFactory.from(new View.Map(this, f))
  
  def mapFactory: MapFactory[CC]
}

trait MapFactory[++C[_, _]] {
  def from[K, V](source: IterableOnce[(K, V)]): CC[K, V]
}


// Map[K, V] trait inherits two overloaded forms of the map operation.
// Inherited from MapOps
def map[K2, V2](f: ((K, V)) => (K2, V2)): Map[K2, V2]

// Inherited from IterableOps
def map[B](f: ((K, V)) => B): Iterable[B]
```

```scala
trait SortedSetOps[A, +CC[_], +C] extends SetOps[A, Set, C] {
  def map[B](f: A => B)(implicit ord: Ordering[B]): CC[B]
}


trait SortedSet[A] extends SortedSetOps[A, SortedSet, SortedSet[A]]

// SortedSet[A] trait inherits two overloaded forms of the map operation.  
// Inherited from SortedSetOps
def map[B](f: A => B)(implicit ord: Ordering[B]): SortedSet[B]

// Inherited from IterableOps, by way of SetOps
def map[B](f: A => B): Set[B]
```

```scala
trait View[+A] extends Iterable[A] with IterableOps[A, View, View[A]] {
  def iterator: Iterator[A]
}
```

```scala
package scala.collection.mutable

trait Builder[-A, +C] {
  def addOne(elem: A): this.type

  def result(): C

  def clear(): Unit
}
```


## Collection Implementation Examples

Points to implement original collections  

1. Decide whether the collection should be mutable or immutable.
2. Pick the right base traits for the collection.
3. Inherit from the right template trait to implement most collection operations.
4. Overload desired operations that do not return, by default, a collection as specific as they could.

### Capped Sequences

```scala
package chapter25_The_Architecture_of_Scala_Collections

import scala.collection._

final class Capped[A] private (
    val capacity: Int,
    val length: Int,
    offset: Int,
    elems: Array[Any]
) extends immutable.Iterable[A]
    with IterableOps[A, Capped, Capped[A]]
    with StrictOptimizedIterableOps[A, Capped, Capped[A]] {
  self =>

  def this(capacity: Int) =
    this(capacity, length = 0, offset = 0, elems = Array.ofDim(capacity))

  def appended[B >: A](elem: B): Capped[B] = {
    val newElems = Array.ofDim[Any](capacity)
    Array.copy(elems, 0, newElems, 0, capacity)
    val (newOffset, newLength) = {
      if (length == capacity) {
        newElems(offset) = elem
        ((offset + 1) % capacity, length)
      } else {
        newElems(length) = elem
        (offset, length + 1)
      }
    }
    new Capped[B](capacity, newLength, newOffset, newElems)
  }

  @inline def :+[B >: A](elem: B): Capped[B] = appended(elem)

  def apply(i: Int): A = elems((i + offset) % capacity).asInstanceOf[A]

  def iterator: Iterator[A] = view.iterator

  override def view: IndexedSeqView[A] = new IndexedSeqView[A] {
    def length: Int = self.length
    def apply(i: Int): A = self(i)
  }

  override def knownSize: Int = length

  override def className = "Capped"

  override val iterableFactory: IterableFactory[Capped] = new CappedFactory(
    capacity
  )

  override protected def fromSpecific(coll: IterableOnce[A]): Capped[A] =
    iterableFactory.from(coll)

  override protected def newSpecificBuilder: mutable.Builder[A, Capped[A]] =
    iterableFactory.newBuilder

  override def empty: Capped[A] = iterableFactory.empty
}

class CappedFactory(capacity: Int) extends IterableFactory[Capped] {
  def from[A](source: IterableOnce[A]): Capped[A] =
    source match {
      case capped: Capped[A] if capped.capacity == capacity => capped
      case _                                                => (newBuilder[A] ++= source).result()
    }

  def empty[A]: Capped[A] = new Capped[A](capacity)

  def newBuilder[A]: mutable.Builder[A, Capped[A]] =
    new mutable.ImmutableBuilder[A, Capped[A]](empty) {
      def addOne(elem: A): this.type = {
        elems = elems :+ elem
        this
      }
    }
}
```

### RNA sequences

```scala
package chapter25_The_Architecture_of_Scala_Collections

abstract class Base
case object A extends Base
case object U extends Base
case object G extends Base
case object C extends Base

object Base {
  val fromInt: Int => Base = Array(A, U, G, C)
  val toInt: Base => Int = Map(A -> 0, U -> 1, G -> 2, C -> 3)
}


import scala.collection.{
  AbstractIterator,
  SpecificIterableFactory,
  StrictOptimizedSeqOps,
  View,
  mutable
}
import scala.collection.immutable.{IndexedSeq, IndexedSeqOps}

final class RNA private (
    val groups: Array[Int],
    val length: Int
) extends IndexedSeq[Base]
    with IndexedSeqOps[Base, IndexedSeq, RNA]
    with StrictOptimizedSeqOps[Base, IndexedSeq, RNA] {
  rna =>

  import RNA._

  def apply(idx: Int): Base = {
    if (idx < 0 || length <= idx) throw new IndexOutOfBoundsException
    Base.fromInt(groups(idx / N) >> ((idx % N) * S) & M)
  }

  override def className = "RNA"

  override protected def fromSpecific(source: IterableOnce[Base]): RNA =
    RNA.fromSpecific(source)

  override protected def newSpecificBuilder: mutable.Builder[Base, RNA] =
    RNA.newBuilder

  override def empty: RNA = RNA.empty

  def appended(base: Base): RNA =
    (newSpecificBuilder ++= this += base).result()

  def appendedAll(suffix: IterableOnce[Base]): RNA =
    strictOptimizedConcat(suffix, newSpecificBuilder)

  def concat(suffix: IterableOnce[Base]): RNA =
    strictOptimizedConcat(suffix, newSpecificBuilder)

  def flatMap(f: Base => IterableOnce[Base]): RNA =
    strictOptimizedFlatMap(newSpecificBuilder, f)

  def map(f: Base => Base): RNA =
    strictOptimizedMap(newSpecificBuilder, f)

  def prepended(base: Base): RNA =
    (newSpecificBuilder += base ++= this).result()

  def prependedAll(prefix: IterableOnce[Base]): RNA =
    (newSpecificBuilder ++= prefix ++= this).result()

  @inline final def ++(suffix: IterableOnce[Base]): RNA =
    concat(suffix)

  override def iterator: Iterator[Base] =
    new AbstractIterator[Base] {
      private var i = 0
      private var b = 0
      def hasNext: Boolean = i < rna.length
      def next(): Base = {
        b = if (i % N == 0) groups(i / N) else b >>> S
        i += 1
        Base.fromInt(b & M)
      }
    }
}

// inheriting from SpecificIterableFactory enable to apply `to` method.
// SpecificIterableFactory difines abstract methods: `empty`, `newBuilder`, `fromSpecific`
object RNA extends SpecificIterableFactory[Base, RNA] {
  private val S = 2
  private val M = (1 << S) - 1
  private val N = 32 / S

  def fromSeq(buf: collection.Seq[Base]): RNA = {
    val groups = new Array[Int]((buf.length + N - 1) / N)
    for (i <- 0 until buf.length)
      groups(i / N) |= Base.toInt(buf(i)) << ((i % N) * S)
    new RNA(groups, buf.length)
  }

  def empty: RNA = fromSeq(Seq.empty)

  def newBuilder: mutable.Builder[Base, RNA] =
    mutable.ArrayBuffer.newBuilder[Base].mapResult(fromSeq)

  def fromSpecific(it: IterableOnce[Base]): RNA = it match {
    case seq: collection.Seq[Base] => fromSeq(seq)
    case _                         => fromSeq(mutable.ArrayBuffer.from(it))
  }
}

object RNAMain extends App {
  // inheriting from SpecificIterableFactory enable to apply `to` method.
  val rna = List(U, A, G, C).to(RNA)
  println(rna) // RNA(U, A, G, C)
}
```

### Prefix maps

```scala
package chapter25_The_Architecture_of_Scala_Collections

import scala.collection._
import scala.language.implicitConversions

class PrefixMap[A]
    extends mutable.Map[String, A]
    with mutable.MapOps[String, A, mutable.Map, PrefixMap[A]]
    with StrictOptimizedIterableOps[
      (String, A),
      mutable.Iterable,
      PrefixMap[A]
    ] {
  private var suffixes: immutable.Map[Char, PrefixMap[A]] =
    immutable.Map.empty

  private var value: Option[A] = None

  def get(s: String): Option[A] =
    if (s.isEmpty) value
    else suffixes get (s(0)) flatMap (_.get(s substring 1))

  def addOne(kv: (String, A)): this.type = {
    withPrefix(kv._1).value = Some(kv._2)
    this
  }

  def subtractOne(s: String): this.type = {
    if (s.isEmpty) {
      val prev = value
      value = None
      prev
    } else suffixes get (s(0)) flatMap (_.remove(s substring 1))
    this
  }

  def withPrefix(s: String): PrefixMap[A] =
    if (s.isEmpty) this
    else {
      val leading = s(0)
      suffixes get leading match {
        case None => suffixes = suffixes + (leading -> empty)
        case _    =>
      }
      suffixes(leading) withPrefix (s substring 1)
    }

  def iterator: Iterator[(String, A)] =
    (for (v <- value.iterator) yield ("", v)) ++
      (for ((chr, m) <- suffixes.iterator; (s, v) <- m.iterator)
        yield (chr +: s, v))

  override def className = "PrefixMap"

  def map[B](f: ((String, A)) => (String, B)): PrefixMap[B] =
    strictOptimizedMap(PrefixMap.newBuilder[B], f)

  def flatMap[B](f: ((String, A)) => IterableOnce[(String, B)]): PrefixMap[B] =
    strictOptimizedFlatMap(PrefixMap.newBuilder[B], f)

  def concat[B >: A](suffix: Iterable[(String, B)]): PrefixMap[B] =
    strictOptimizedConcat(suffix, PrefixMap.newBuilder[B])

  override def clear(): Unit = suffixes = immutable.Map.empty

  // specify PrefixMap[A] as the return type instead of mutable.Map
  override protected def fromSpecific(
      source: IterableOnce[(String, A)]
  ): PrefixMap[A] = PrefixMap.from(coll)

  // specify PrefixMap[A] as the return type instead of mutable.Map
  override protected def newSpecificBuilder
      : mutable.Builder[(String, A), PrefixMap[A]] = PrefixMap.newBuilder

  override def empty: PrefixMap[A] = new PrefixMap
}

object PrefixMap {
  def empty[A] = new PrefixMap[A]

  def from[A](source: IterableOnce[(String, A)]): PrefixMap[A] =
    source match {
      case pm: PrefixMap[A] => pm
      case _                => (newBuilder[A] ++= source).result()
    }

  def apply[A](kvs: (String, A)*): PrefixMap[A] = from(kvs)

  def newBuilder[A]: mutable.Builder[(String, A), PrefixMap[A]] =
    new mutable.GrowableBuilder[(String, A), PrefixMap[A]](empty)

  // triggered by List("foo" -> 3).to(PrefixMap)
  // `to` operation takes a `Factory` but the `PrefixMap` companion object does not extend `Factory` and it can not because a `Factory` fixes the type of collection elements, whereas `PrefixMap` has a polymorphic type of values.
  implicit def toFactory[A](
      self: this.type
  ): Factory[(String, A), PrefixMap[A]] =
    new Factory[(String, A), PrefixMap[A]] {
      def fromSpecific(source: IterableOnce[(String, A)]): PrefixMap[A] =
        self.from(source)
      def newBuilder: mutable.Builder[(String, A), PrefixMap[A]] =
        self.newBuilder
    }
}

object PrefixMapMain extends App {
  val m = PrefixMap("abc" -> 0, "abd" -> 1, "al" -> 2, "all" -> 3, "xy" -> 4)
  println(m) // PrefixMap(abc -> 0, abd -> 1, al -> 2, all -> 3, xy -> 4)

  val m2 = m withPrefix "a"
  println(m2) // PrefixMap(bc -> 0, bd -> 1, l -> 2, ll -> 3)

  m2 += "pple" -> 5
  println(m)
  // PrefixMap(abc -> 0, abd -> 1, al -> 2, all -> 3, apple -> 5, xy -> 4)
}
```