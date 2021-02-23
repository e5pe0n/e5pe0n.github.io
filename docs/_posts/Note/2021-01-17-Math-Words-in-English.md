---
title: "Note: Math Words in English"
categories:
  - Note
tags:
  - Math
last-modified-at: 2021-01-17
---

- （式や性質が）成り立つ: hold
  - associative property on addition holds for all natural numbers
- 適切な: appropreate
- 数 A が数 B を上回る: go above
  - at which x goes above 128
- 分子: n**u**merator (ニュームレイター)
- 分母: d**e**nominator (ディノミネイター)
- 商: quotient
- 剰余: remainder
  - 余りをとる: taking the remainder
- A で B を割る: divide B by A
- A は B を割り切る:
  - A divides B
    - We say that $m$ *divides* $n$ if $n$ is a multiple of $m$, that is, if there is an integer $k$ such that $n = mk$  
    - $3 \mid 6$ : 3 divides 6
    - $5 \nmid 7$ : 5 does not divide 7
  - B is divisible by A
    - 6 is divisible by 3
- 多項式: polynomial
- 二次方程式: quadratic equation 
- 微分方程式: differential equation
- A とする: let
  - we rewrite the first equation as $16 = a - 2b$, where we let $a = 60$ and $b = 22$
- 代入する: substitute
  - Substitute the second equation into the first.
  - 2 つ目の方程式を 1 つ目に代入
- 有理数: rational
- 合成数: composite number
- 既約，(互いに)素: primitive
- 約分: normalization
- 結合法則: associative property, associative law
  - 加算は結合法則を満たしている: addition is associative.
- 10 進数: decimal (number)
- weight, digit
  - 2345 represents the sum of the products of the weights 1000, 100, 10, 1 with the digits 2, 3, 4, 5.
- ピタゴラス数: Pythagorean triples
- 観測値: observed value
- カイ 2 乗統計量: chi-square statistic
- denote: 表す

e.g. $n$ denotes the length of the two lists, and $xs_i$ denotes the $i$th element of a list $xs$ counting from zero

$$
\sum_{i=0}^{n-1} \frac{(os_i - es_i)^2}{es_i}
$$

- minimux (saddle point): 
  - 考えられる最大損失を最小限に抑えようとするゲームの手
  - ある一組の極大値の中の最小値
- 可換: commutative
  - commutative property of addition: 加算の可換性
  - commutativity of addition: 加算の可換性
- 合成関数: composite function
  - $f \circ g$ : *f composed with g*
- 単位元: identity (element)
- 単一の: identical
  - a list of identical elements: 単一要素のリスト
- equational reasoning (`=` での式展開)
  - e.g. $(x + a)(x + b) = (x + a)x + (x + a)b = x^2 + ax + bx + ab = x^2 + (a + b)x + ab$
- 合同: congruence
- A と合同な: congruent to A
  - $m$ を法として $a$ は $b$ と合同である
  - We say that $a$ is congruent to $b$ modulo $m$, and we write $a \equiv b \pmod m$.  
- 法: modulus
  - The number $m$ is called the *modulus* of the congruence.  
- （数学的）帰納法: induction <-> 演繹法: deduction (<- deduce)
  - base case: n = 0
  - induction case: n = k + 1
- 背理法: Proof by Contradiction
- 反例: counterexample
- 仮説: hypothesis
- 命題: proposition
- 数学的命題: mathematical statement
- トートロジー: tautology
- 含意; $\supset$ or $\implies$: implication
  - implies; if ... then
- 演繹する: derive
  - theorem derived from axioms: 公理から演繹された定理
- deduce: (結論などを)(基地の事実・仮説・根拠などから)推定する，推論する，演繹する
  - What consequences can be deduced from this hypothesis?
  - この仮説からどんな結果を導き出せますか？
- 推測する: guess, infer
  - *infer* is more likely to be based on evidence than a *guess*
  - *infer* is more formal, and not likely to be used in conversation
- 推論: inference
- reasoning: 推論，推論の結果，証明
- 類推: analogy
  - by analogy: 類推によって
  - by analogy with A: A から類推して
  - on the analogy of A: A から類推して
- 真理値: truth tables
- predicate
  - 断定する: predicate 23 to be primitive / predicate that 23 is primitive
  - 属性 (or property): collect numbers that satisfy the predicate
- trivial: objects with a very simple structure
  - Empty set
  - Trivial group: contains only the identity element
  - Trivial ring: defined on a singleton set
  - $y(x) = 0$ is the trivial solution of $y' = y$  where $y = y(x)$
- lemma: 補題 (auxiliary theorem)
- 系: corollary
- 予想: conjecture
  - The Modularity Conjecture
  - モジュラー性予想
- 主張: assertion

e.g.  

## The Fundamental Theorem of Arithmetic

 Every integer $n \ge 2$ can be factored into a product of primes $n = p_1p_2 \cdots p_r$ in exactly one way.  

### Proof.

The Fundamental Theorem of Arithmetic contains two assertions.  

#### Assertion 1.

The number $n$ can be factored into a product of primes in some way

#### Assertion 2. 

There is only one such factorization (aside from rearranging the factors)  


- （証明内で）この方法を続けていって: continuing in this fashion
  - Continuing in this fashion, we must eventually find some $a_i$ that is divisible by $p$
- 結合: conjunction
- `∧` (AND): conjunction
  - operand is called *conjunct*
- `∨` (OR): disjunction
  - operand is called *disjunct*
- 最後から2番目の: penultimate
  - 最後から2行目: penultimate line
- わかる（観測する）: observe
- to recapitulate (recap**i**tulate):（今まで述べてきたことを）まとめると，要約すると
  - To recapitulate, We have shown that if Assertion 1 is true for all numbers less than or equal to $N$, then it is true for $N + 1$
- 円周: circumference
- 直径: diameter
- 楕円: ellipse
- ellipsis (イリプシス): 省略，省略記号 (-, ...)

# Set

- 冪集合: power set
- Cartesian 積 (Cartesian product) = 直積 (cross product): $A \times B$
  - when $A = \{1, 2\}$ and $B = \{ x, y, z \}$, $A \times B = \{ (1, x), (1, y), (1, z), (2, x), (2, y), (2, z) \}$

- 写像: mapping
- 定義域: domain
- 値域: range
- 上への関数: onto

- k 個の引数をもつ関数: k-ary function
- k 項関係: k-ary relation
  - 2 項関係: binary relation
- 同値関係: equivalence relation
  - 反射律: reflexive
  - 対称律: symmetric
  - 推移律: transitive

# Others

- k 個組: k-tuple
  - 2個組 (対): pair