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
