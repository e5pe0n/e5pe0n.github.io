---
title: "Note: The Go Programming Language"
categories:
  - Note
tags:
  - Go
last-modified-at: 2021-07-10
---

# Preface

> "Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.” (From the Go web site at golang.org)

## Go  

- general-purpose language
- open-source project
- promise backward compatible

## Go's goal

> be expressive, efficient in both compilation and execution, and effective in writing reliable and robust programs.

## Features

- garbage collection
- a package system
- first-class functions
- lexical scope
- a system call interface
- immutable strings
- concurrency
  - goroutines

## Features Go does not implement

- implicit numeric conversions
- constructors
- destructors
- operator overloading
- default parameter values
- inheritance
- generics
- exceptions
- macros
- function annotations
- thread-local storage

<br>

# Chapter 1. Tutorial

- *main* package: standalone executable program
- *main* function: start point to run
- `:=` is *short variable declaration*

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	var s, sep string
	for i := 1; i < len(os.Args); i++ {
		s += sep + os.Args[i]
		sep = ""
	}
	fmt.Println(s)
}
```

- unused variables cause compilation error
  - use *blank identifier* `_` to ignore the value

- *verbs* table (e.g. `%d`, `%s`): p.35

- *goroutine*: concurrent function execution
  - *main* function runs in a goroutine and the *go* statement creates additional goroutines
- *chanel*: communication mechanism between goroutines

```go
package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"time"
)

func main() {
	start := time.Now()
	ch := make(chan string)
	for _, url := range os.Args[1:] {
		go fetch(url, ch)
	}
	for range os.Args[1:] {
		fmt.Println(<-ch)
	}
	fmt.Printf("%.2fs elapsed\n", time.Since(start).Seconds())
}

func fetch(url string, ch chan<- string) {
	start := time.Now()
	resp, err := http.Get(url)
	if err != nil {
		ch <- fmt.Sprint(err)
		return
	}

	nbytes, err := io.Copy(ioutil.Discard, resp.Body)
	resp.Body.Close()
	if err != nil {
		ch <- fmt.Sprintf("while reading %s: %v", url, err)
		return
	}
	secs := time.Since(start).Seconds()
	ch <- fmt.Sprintf("%.2fs %7d %s", secs, nbytes, url)
}

// # go run fetchall.go https://golang.org http://gopl.io https://godoc.org
// 0.41s    9954 https://golang.org
// 1.14s    4154 http://gopl.io
// 1.43s   12971 https://godoc.org
// 1.43s elapsed
```

## Control flow

### Switch

Cases do not fall through from one to the next as in C-like languages.  

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	heads, tails := 0, 0
	switch coinflip() {
	case "heads":
		heads++
	case "tails":
		tails++
	default:
		fmt.Println("landed on edge!")
	}
}

func coinflip() string {
	if rand.Intn(2) == 1 {
		return "heads"
	} else {
		return "tails"
	}
}
```

*tagless switch*

```go
package main

func main() {}

func Signum(x int) int {
	// tagless switch
	switch {
	case x > 0:
		return +1
	default:
		return 0
	case x < 0:
		return -1
	}
}
```

## Pointers

no pointer arithmetic


# Chapter 2. Program Structure

## Names

- camel case
- package name: begins with a letter
- *exported* names from package: begins with a Upper-case


## Variables

### The *new* Function

- `new(T)` creates an *unnamed variable* of type *T*, initializes it to the zero value of *T*, and returns its address, which is a value of type *T*

```go
p := new(int)
fmt.Println(*p) // 0

*p = 2
fmt.Println(*p) // 2
```

## Scope

|                          scope                          |                                           lietime                                           |
| :-----------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
| a region of the program text; **compile-time property** | the range of time during execution when the variable can be referred; **run-time property** |


```go
package ifscope

import (
	"fmt"
)

var fname string

func main() {
	if x := f(); x == 0 {
		fmt.Println(x)
	} else if y := g(x); x == y {
		fmt.Println(x, y)
	} else {
		fmt.Println(x, y)
	}
}

func f() int {
	return 1
}

func g(x int) int {
	return x * 2
}
```


<br>

# Chapter 3. Basic Data Types

|   data types    |                  instances                  |
| :-------------: | :-----------------------------------------: |
|   basic types   |         numbers, strings, booleans          |
| aggregate types |               arrays, structs               |
| reference types | pointers, slices, maps, functions, channels |
| interface types |                                             |

## Integers

`^`: bitwise XOR as binary operator, or bitwise negation as unary operator
`&^`: bit clear (used to get different bits between numbers)
`>>`: fill the vacated bits with copies of the sign bit for signed ints

```go
package main

import "fmt"

func main() {
	var x uint8 = 1<<1 | 1<<5
	var y uint8 = 1<<1 | 1<<2

	fmt.Printf("%08b\n", x) // 00100010
	fmt.Printf("%08b\n", y) // 00000110

	fmt.Printf("%08b\n", ^x)   // 11011101
	fmt.Printf("%08b\n", x&^y) // 00100000
}
```

## Booleans

there is no implicit conversion from any type to bool, and bools cannot be treated as ints without explicit conversion.  


## Strings

- immutable sequence of bytes
- the i-th byte of a string is not necessarily the i-th character of a string
- *substring* operation creates a new reference to the original string

```go
s := "hello, world"
fmt.Println(len(s))	// 12
fmt.Println(s[0:5])	// hello
```

Raw string literals: enclosed in backquotes

```go
const GoUsage = `Go is a tool for managing Go source code.

Usage:
	go command [arguments]
	`
```

Be aware for unicode characters

```go
package main

import (
	"fmt"
	"unicode/utf8"
)

func main() {
	s := "Hello, 世界"
	fmt.Println(len(s))                    // 13
	fmt.Println(utf8.RuneCountInString(s)) // 9

	for i := 0; i < len(s); {
		r, size := utf8.DecodeRuneInString(s[i:])
		fmt.Printf("%d\t%c\n", i, r)
		i += size
	}
}

// 0       H
// 1       e
// 2       l
// 3       l
// 4       o
// 5       ,
// 6
// 7       世
// 10      界
```

### Strings and Byte Slices

main packages to manipulate strings

- bytes
- strings
- strconv


### Constants

#### iota

```go
package main

import "fmt"

type Weekday int

const (
	Sunday Weekday = iota
	Monday
	Tuesday
	Wednesday
	Thursday
	Friday
	Saturday
)

func main() {
	fmt.Println("Sunday", Sunday)
	fmt.Println("Monday", Monday)
	fmt.Println("Tuesday", Tuesday)
	fmt.Println("Wednesday", Wednesday)
	fmt.Println("Thursday", Thursday)
	fmt.Println("Friday", Friday)
	fmt.Println("Saturday", Saturday)
}

// Sunday 0
// Monday 1
// Tuesday 2
// Wednesday 3
// Thursday 4
// Friday 5
// Saturday 6
```


```go
type Flags uint

const (
	FlagUp Flags = 1 << iota  // LSB
	FlagBroadcast             // last 1st bit
	FlagLoopback              // last 2nd bit
	FlagPointToPoint          // last 3rd bit
	FlagMulticast             // last 4th bit
)
```

## Untyped Constants

see p.144

```go
// size is not determined
i := 0    // untyped integer; implicit int(0)

// size is fixed
f := 0.0  // untyped floating-point; implicit flaot64(0.0)
c := 0i   // untyped complex; implicit complex128(0i)
```

<br>

# Chapter 4. Composite Types

## Arrays

- fixed-length sequence
- homogeneous
- usually used *Slices* than *Arrays*
### `Array1 == Array2`

- Array1 and Array2 must have the same length
- if an array's element type is *comparable* then the array tyep is comparable too.  
- *true* if each elements of two arrays return *true* on `==` 

### Function call

- **an array as an argument is copied and the copy is passed to calling function**

```go
package main

import "fmt"

func main() {
	var a [3]int
	fmt.Println(a[0])        // 0
	fmt.Println(a[len(a)-1]) //0

	for i, v := range a {
		fmt.Printf("%d %d\n", i, v)
	}

	var q [3]int = [3]int{1, 2, 3}
	var r [3]int = [3]int{1, 2}
	fmt.Printf("%x\n", q) // [1 2 3]
	fmt.Println(r[2])     // 0

	q2 := [...]int{1, 2, 3}
	fmt.Printf("%T\n", q2)      // [3]int
	fmt.Printf("%t\n", q == q2) // true
}
```

## Slices

- variable-length sequence
- homogeneous
- three components
  - pointer
    - can modify original elements through *Slices*
  - length
  - capacity
- creating *Slices* takes constant time

### `nil`

- slice having no underlying array
- an empty slice, which is length 0 and capacity 0, is **necessarily not** `nil`

```go
// nil
var s []int // len(s)
s = nil
s = []int(nil)

// not nil
s = []int{}
```

- range can treat `nil`

```go
package main

import "fmt"

func main() {
	var s []int // nil
	for i, v := range s {
		fmt.Println(i, v)
	}
}
```

### Comparison

- ***Slices* are not compariable**; we cannot use `==` to *Slices* except for `nil`


### `make()`

- creates a lice of a specified element type, length and capacity
  - creates an unnamed array and returns a slice of it

```go
make([]T, len)
make([]T, len, cap) // i.e. make([]T, cap)[:len]
```

### `append()`

- returns a new slice which is appended a element passed as the second argument
  - the original slice (the first argument) is not modified
- **we cannot assume that the original slice refers to the same array as the resulting slice, nor that it refers to a different one** (you can notice there is `make()` in `appendInt()` below)
  - so **an old slice passed as an argument is not used** usually after functions such as `append()`

```go
package main

import "fmt"

func main() {
	var x []int
	x = append(x, 1)  // use the new slice instead of the old one
	fmt.Println(x) // [1]

	x = append(x, 2, 3)
	fmt.Println(x) // [1 2 3]

	x = append(x, 4, 5, 6)
	fmt.Println(x) // [1 2 3 4 5 6]

	x = append(x, x...)
	fmt.Println(x) // [1 2 3 4 5 6 1 2 3 4 5 6]
}
```

- Be careful for the order of arguments of `copy()`

```go
package main

import "fmt"

func appendInt(x []int, y int) []int {
	var z []int
	zlen := len(x) + 1
	if zlen <= cap(x) {
		z = x[:zlen]
	} else {
		zcap := zlen
		if zcap < 2*len(x) {
			zcap = 2 * len(x)
		}
		z = make([]int, zlen, zcap)
		copy(z, x) // dst: z <- src: x
	}
	z[len(x)] = y
	return z
}

func main() {
	var x, y []int
	for i := 0; i < 10; i++ {
		y = appendInt(x, i)
		fmt.Printf("%d cap=%d %v\n", i, cap(y), y)
		x = y
	}
}

// 0 cap=1 [0]
// 1 cap=2 [0 1]
// 2 cap=4 [0 1 2]
// 3 cap=4 [0 1 2 3]
// 4 cap=8 [0 1 2 3 4]
// 5 cap=8 [0 1 2 3 4 5]
// 6 cap=8 [0 1 2 3 4 5 6]
// 7 cap=8 [0 1 2 3 4 5 6 7]
// 8 cap=16 [0 1 2 3 4 5 6 7 8]
// 9 cap=16 [0 1 2 3 4 5 6 7 8 9]
```

## Maps

- reference to a hash table
- the order of iteration is unspecified
- zero value of maps is `nil`
- not comparable to maps except for comparison to `nil`

## Set

- **Go does not support *Sets*! use *Maps***

## Struct

- field order is one of the property in *struct* to identify the struct
  - i.e. even the structs, which are the same field names and types, are different if their field orders are different
- struct can be compared by `==` if the every field is comparable
  - can be used a key of *map*

```go
package main

type Employee struct {
	ID            int
	Name, Address string
	string
	DoB       string
	Position  string
	Salary    int
	ManagerID int
}

func main() {
	var dilbert Employee

	dilbert.Salary -= 5000

	position := &dilbert.Position
	*position = "Senior" + *position

	var employeeOfTheMonth *Employee = &dilbert
	employeeOfTheMonth.Position += " (proactive team player)"
}
```

- A named struct type S cannot declare a field of the same type S
  - pointer type *S is allowed

### struct literal

```go
type Point struct{ X, Y int }

p := Point{1, 2}
q := Point{X: 1} // Y := 0
```

### Struct Embedding and Anonymous Field

```go
package main

import "fmt"

type Point struct{ X, Y int }

type Circle struct {
	Point  // embedding struct Point as anonymous field
	Radius int
}

type Wheel struct {
	Circle // embedding struct Circle as anonymous field
	Spokes int
}

func main() {
	var w Wheel

	w = Wheel{Circle{Point{8, 8}, 5}, 20}

	w = Wheel{
		Circle: Circle{
			Point:  Point{X: 8, Y: 8},
			Radius: 5,
		},
		Spokes: 20,
	}

	fmt.Printf("%#v\n", w) // main.Wheel{Circle:main.Circle{Point:main.Point{X:8, Y:8}, Radius:5}, Spokes:20}
	w.X = 42
	fmt.Printf("%v\n", w)
}
```