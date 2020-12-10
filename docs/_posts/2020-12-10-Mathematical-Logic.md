---
title: "Note: Mathmatical Logic"
categories:
  - Note
tags:
  - Math
  - Mathmatical Logic
---


# ZFC Axioms

- Zermelo-Fraenkel set theory + the axiom of choice
  - Ernst Zermelo
  - Abrahm Fraenkel
- ZF Axioms : not include the axiom of choice (AC)
- exclude Russell's paradox

<br>

数理基礎論講義 -論理・集合・位相- / 金子 晃 / サイエンス社

## ZFC 1 (空集合の存在)

$$\exists{x} \forall{u} \lnot(u \in x)$$


## ZFC 2 (外延性公理)

$$\forall{x} \forall{y} (\forall{u} (u \in x \equiv u \in y) \to x = y)$$

- $A \equiv B := (A \to B) \land (B \to A)$
- 同じ元より成る集合は等しい

<br>

- ZF 1, ZF 2 より空集合はただ 1 つに定まるため，それを $\emptyset$ と表す


## ZF 3 (非順序対の存在)

$$\forall{x} \forall{y} \exists{z} \forall{u} (u \in z \equiv (u = x \lor u = y))$$

- 2 つの集合から新しい集合をつくれる (順序が定義されている場合その集合は順序対と呼ばれる)
  - 非順序対 : $\{x, y\}$
  - 順序対 : $\{x, \{x, y\}\}$ -> $(x, y)$


## ZF 4 (和集合の公理)

$$\forall{x} \exists{y} \forall{u} (u \in y \equiv \exists{v} (u \in v \land v \in x))$$

- $\sigma(x) = \cup_{v \in x} v := y$ : $x$ の要素である集合すべての和集合


### 包含記号の定義

- $x \subset y := \forall{u} (u \in x \to u \in y)$


## ZF 5 (冪集合の公理)

$$\forall {x} \exists{y} \forall{u} (u \in y \equiv u \subset x)$$

- 集合 $x$ のすべての部分集合を要素とするような集合 $y$ が存在する


## ZF 6 (置換公理)

$$\forall{u} \forall{v} \forall{w} (A(u, v) \land A(u, w) \to v = w) \to \forall{x} \exists{y} \forall{v} (v \in y \equiv \exists{u} (u \in x \land A(u, v)))$$

- $A(u, v)$ : 任意の論理式
- 集合 $x$ の任意の元に対して集合 $y$ の元が一意に定まる 2 項関係 = 写像
- 集合 $x$ の写像 $A$ による像 $y$ もまた集合になる


## ZF 7 (正則性公理)

$$\exists{x} A(x) \to \exists{x} (A(x) \land \lnot \exists{y} (A(y) \land y \in x))$$

- $A$ を満たす元があるとき，それらの中で $\in$ に関する順序で最小の元が存在する  

対偶をとって $A$ を $\lnot A$ にとりかえると順序 $\in$ に関する**超限帰納法** ↓

$$\forall{x} (\forall{y} (y \in x \to A(y)) \to A(x)) \to \forall{x} A(x)$$


### 正則性公理の系

#### (1) $\forall{x} (\lnot x \in x)$

- $A(u) := u \notin x$ に対して超限帰納法の前提部分   
$$\forall{x}(\forall{y}(y \in x \to y \notin x) \to x \notin x) \equiv \forall{x}(\forall{y}(y \notin x \lor y \notin x)) \Leftrightarrow \forall{x} (\forall{y} (y \notin x) \to x \notin x)$$

が自明に真なので $\forall{x} (x \notin x)$ は真 -> ラッセルのパラドックスを除外

- $A(u) := u \in x$ とすると超限帰納法の全体が $\forall{x} (x \in x) \to \forall{x} (x \in x)$ となり何も言えない


#### (2) 無限降下列 $x_1 \ni x_2 \ni x_3 \ni \cdots$ は存在しない

- 集合の集合の ... の集合 i.e. 集合全体の集合は定義できない <- ラッセルのパラドックス
- $x_1 \supset x_2 \supset x_3 \supset \cdots$ は存在できる <- 無限集合

## ZF 8 (選択公理)

$$\forall{x} [\emptyset \notin x \land \forall{u} \forall{v}((u \in x \land v \in x \land \lnot (u = v)) \to u \cap v = \emptyset)] \to \exists{y} (y \subset \sigma(x) \land \forall{u} (u \in x \to \exists{1} z \in u \cap y))$$

- $\emptyset \notin x := \forall{u} (u \in x \to \exists{v} (v \in u))$
- $u \cap v = \emptyset := \lnot \exists{w} (w \in u \land w \in v)$
- $\exists{1} z \in u \cap y := \exists{z} (z \in u \land z \in y \land \forall{w} (w \in u \land w \in y \to w = z))$

<br>

- $u \mapsto z$ : 選択関数

## ZF 9 (無限公理)

$$\exists{x} (\exists{u} (u \in x) \land \forall{u} (u \in x \to \exists{v} (v \in x \land u \subset v \land \lnot (v = u))))$$
