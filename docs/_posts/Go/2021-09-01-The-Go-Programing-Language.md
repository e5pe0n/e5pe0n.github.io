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
