---
title: "Note: Programming in Scala - 2"
categories:
  - Note
tags:
  - Programming
  - Scala
last-modified-at: 2021-03-23
---

# Injection and Extraction

- `apply()` is called *injection* method  
- `unapply()` is called *extraction* method

<br>

- an object having only `unapply()` is called *extractor*

## Note:

recommended to implement both *apply()* and *unapply()* for the duality.  

```scala
object EMail {
  // optional
  def apply(user: String, domain: String) = user + "@" + domain

  // mandatory
  def unapply(str: String): Option[(String, String)] = {
    var parts = str split "@"
    if (parts.length == 2) Some(parts(0), parts(1)) else None
  }
}
```

## Case Classes vs. Extractors

Case classes

|                       Pros                       |                         Cons                         |
| :----------------------------------------------: | :--------------------------------------------------: |
|           easy to set up and define it           |             expose representaion of data             |
| more efficient pattern matches than *extractor*s | changing class name or hierarchy affects client code |
| check whether the cases cover all possibilities  |                                                      |


Extractors

|                                 Pros                                  |                Cons                |
| :-------------------------------------------------------------------: | :--------------------------------: |
|                  provide more flexible pattern match                  | less effective than *case class*es |
| robust to implementing update because of *representaion independence* |                                    |
|                                                                       |                                    |


# Annotations

## Deprecation

```scala
@deprecated def bigMistake() = // ...

@deprecated("use newShinyMethod() instead")
def bigMistake() = // ...
```

## Volatile fields

informs the compiler that the variable will be used by multiple thread.  
such variables implemented so that reads and writes to the variable are slower, but accesses form multiple threads behave more predictably.  

```scala
@volatile
```

## Binary serialization

to serialize it, mix in the *scala.Serializable* trait.    

`@SerialVersionUID` attaches a version number to the binary.  

```scala
@SerialVersionUID(1234)
```

`@trasient` specifies the field that you do **not** want to save in binary.  
The default value is assigned to the field when the object which has it is loaded.  

```scala
@trasient
```

## Automatic *get* and *set* methods

may use this not at all.  

```scala
@scala.reflect.BeanProperty
```
### Note:

The generated *get* and *set* methods are only available after a compilation pass completes.  


## Tailrec

applies the optimization to tail recursive function.  

```scala
@Trailrec
```

## Unchecked

ignore warning about a lack of cases in the pattern match.

```scala
@unchecked
```

## Native methods

imforms the compiler that a method's implementation is supplied by the runtime rather than in Scala code.  

```scala
@native
def beginCountdown() = {}
```


# XML

need scala-xml library, https://github.com/scala/scala-xml.  
see how to at https://github.com/scala/scala-xml/wiki/Getting-started

```scala
abstract class CCTherm {
  val description: String
  val yearMade: String
  val dateObtained: String
  val bookPrice: Int // in US cents
  val purchasePrice: Int // in US cents
  val condition: Int // 1 to 10

  override def toString = description

  def toXML =
    <cctherm>
      <description>{description}</description>
      <yearMade>{yearMade}</yearMade>
      <dateObtained>{dateObtained}</dateObtained>
      <bookPrice>{bookPrice}</bookPrice>
      <purchasePrice>{purchasePrice}</purchasePrice>
      <condition>{condition}</condition>
    </cctherm>
}

object CCThermMain extends App {
  val therm = new CCTherm {
    val description = "hot dog #5"
    val yearMade = "1952"
    val dateObtained = "March 14, 2006"
    val bookPrice = 2199
    val purchasePrice = 500
    val condition = 9
  }

  println(therm.toXML)
// <cctherm>
//   <description>hot dog #5</description>
//   <yearMade>1952</yearMade>
//   <dateObtained>March 14, 2006</dateObtained>
//   <bookPrice>2199</bookPrice>
//   <purchasePrice>500</purchasePrice>
//   <condition>9</condition>
// </cctherm>
}
```

## Extracting text

```scala
val txt = <a>Sounds <tag/> good</a>.text
println(txt) // Sounds  good

val txt2 = <a>input ---&gt; output </a>.text
println(txt2) // input ---> output
```

## Extracting sub-elements

```scala
val b = <a><b><c>hello</c></b></a> \ "b"
println(b) // <b><c>hello</c></b>
```

## Extracting sub-sub-elements

```scala
val c = <a><b><c>hello</c></b></a> \ "c"
println(c) // NodeSeq()

val c1 = <a><b><c>hello</c></b></a> \\ "c"
println(c1) // <c>hello</c>
```

## Extracting attributes

```scala
val joe = <employee
  name="Joe"
  rank="code monkey"
  serial="123"
/>
val name = joe \ "@name"
val serial = joe \ "@serial"
println(s"name=$name, serial=$serial") // name=Joe, serial=123
```

## Pattern matches

```scala
def proc(node: scala.xml.Node): String = node match {
  case <a>{contents}</a> => "It's an a: " + contents
  case <b>{contents}</b> => "It's a b: " + contents
  case _                 => "It's something else."
}

val p1_1 = proc(<a>apple</a>)
println(p1_1) // It's an a: apple

val p1_2 = proc(<b>banana</b>)
println(p1_2) // It's a b: banana

val p1_3 = proc(<c>cherry</c>)
println(p1_3) // It's something else.

val p1_4 = proc(<a>a <em>red</em> apple</a>)
println(p1_4) // It's something else.

val p1_5 = proc(<a/>)
println(p1_5) // It's something else.
```

```scala
def proc2(node: scala.xml.Node): String = node match {
  case <a>{contents @ _*}</a> => "It's an a: " + contents
  case <b>{contents @ _*}</b> => "It's a b: " + contents
  case _                      => "It's something else."
}

val p2_1 = proc2(<a>a <em>red</em> apple</a>)
println(p2_1) // It's an a: a <em>red</em> apple

val p2_2 = proc2(<a/>)
println(p2_2) // It's an a: List()
```

## *for* expressions

```scala
val catalog = scala.xml.XML.load("resources/catalog.xml")
catalog match {
  case <catalog>{therms @ _*}</catalog> =>
    for (therm @ <cctherm>{_*}</cctherm> <- therms)
      println("processing: " + (therm \ "description").text)
}
// processing: hot dog #5
// processing: Sprite Boy
```

<br>

# Object Equality


`x eq y`: whether variables *x* and *y* refer to the same object.  
`x == y`: 
  - if *x* and *y* are value types, whether variables *x* and *y* have the same value   
  - if *x* and *y* are reference types, compare *x* with *y* by the *equals* method
    - *equals* method is the same `x eq y` by default but can be overridden in the class
