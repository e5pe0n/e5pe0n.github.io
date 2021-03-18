---
title: "Note: Programming in Scala"
categories:
  - Note
tags:
  - Programming
  - Scala
last-modified-at: 2021-02-26
---

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
