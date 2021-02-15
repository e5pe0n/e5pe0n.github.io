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
