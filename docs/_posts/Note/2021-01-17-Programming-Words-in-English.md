---
title: "Note: Words about Programming in English"
categories:
  - Note
tags:
  - Programming
last-modified-at: 2021-01-17
---

- 命令型言語: imperative language
  - series of instructions that specify how the computation should proceed
- `\``: back quote
- `'`: forward quote
- 関数名をダブルクォートで閉じる
  - enclosing the name of the function in double quotes
- A に括弧をつける: parenthesise A
- A に括弧をつける: place A in parentheses.  
  - whenever you call a method that takes multiple arguments using operator notation, you have to place those arguments in parentheses.  
- `()`: (round) brackets, (round) parentheses
- `{}`: curly brackets, curly parentheses
- `[]`: square brackets, square parentheses
- `<>`: angle brackets, square parentheses
- 節: clause (クローズ)
  - *if* clause: if 節
- irrespective: A に関係なく
  - *length* function calculates the length of any list, irrespective of the type of the elements of the list
- prepend: 先頭に追加する
  - prepend a new element to an list
- auxiliary (オグゼリアリー): 補助の，予備の
  - auxiliary memory
- prune: 刈り込む
  - prune game trees to a particular depth
- quadratic time: $O(n^2)$
- 参照透過性: referentially  transparent
- interoperatability: 相互運用性
  - e.g. Scala <-> Java
- compile: 自動詞
  - Scala programs compile to JVM bytecodes
- defect
  - 欠陥，欠点
- in short
  - 要するに，一言でいえば
- 単項: unary (アナリー)
- 3 項: ternary 
  - 3 項演算子: ternary operator
- decimal: 10 進数
- hexadecimal (base 16): 16 進数
- exponent potion: 指数部
- precondition: 前提条件
- 分岐: branch
  - the *if* has two branches.  

```scala
val filename =
  if (!args.isEmpty) args(0)
  else "default.txt"
```


- デフォルトの値がセットされたままになる
  - if no arguments were supplied, it leaves the variable set to the default value.  

```scala
var filename = "default.txt"
if (!args.isEmpty)
  filename = args(0)
```

- ing**re**dients (イングリーディェント): 成分，要素，構成分子
- store
  - we store the resulting array in the *filesHere* variable
- off-by-one error; OBOE
  - ループが正しい回数より1回多く，または1回少なく実行された場合などに発生する

- nuts and bolts: 基本，基幹
- 取り除く: get rid of, leave out
- (構成要素の一部を)取り除く: factor out
- leave off: やめる，中止する
  - one way to make a function literal more brief is to leave off the parameter types
- puzzle out: 見出す，解く
- invocation: 発動
  - The Scala compiler translates the expression `a(1, 2, 3)` into an invocation of the function value's `apply` method, passing in the three arguments 1, 2, and 3.
- condense: 要約する，濃縮する
- 反対に: by contrast

- loan pattern
  - loan: 貸与，貸付
  - an implement technique that define a function for clients (an API function) to open a resource and loan it to a function passed by the client
    - assure the resource is closed so clients do not need to take care of a preprocess or a postprocess.  

e.g.  

```scala
def withPrintWriter(fiie: File, op: PrintWriter => Unit) = {  // API function
  val writer = new PrintWriter(file)  // open file (resource) and loan file to PrintWriter (function passed by the client)
  try {
    op(writer)
  } finally {
    writer.close()
  }
}
```

- modifier: 修飾子
  - `override`, `abstract`, `private`, etc.
- further
  - traits further to the right take effect first. in the below case, Increment is prior to Filtering.  
    - `new BasicIntQueue with Increment with Filtering`
- inherit from A: A を継承する
  - class *Cat* inherits from *Animal*
    - `class Cat extends Animal`
- augment: 増大する，拡大する
  - access modifiers in Scala can be augmented with *qualifier*s.
- vice versa: 逆もしかり
- Let's say: 例えば
  - What if, Let's suppose
  - Let's say this does not work. Do you have a backup plan?
