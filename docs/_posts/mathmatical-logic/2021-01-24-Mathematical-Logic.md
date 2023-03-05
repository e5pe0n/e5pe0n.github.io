---
title: "Note: Mathematical Logic"
categories:
  - Note
tags:
  - Math
  - Mathematical Logic
last-modified-at: 2021-01-24
---

# Predicate Logic (述語論理)

## Tautological logical expressions

### $5) \ \forall {x} B \land \forall {x} C \equiv \forall {x} (B \land C), \ \ \exists {x} B \lor \exists {x} C \equiv \exists {x} (B \lor C)$

### $6) \ (\forall x B \lor \forall x C) \supset \forall x (B \lor C), \ \ \exists x (B \land C) \supset (\exists x B \land \exists x C)$

why not $\forall x B \lor \forall x C \equiv \forall x (B \lor C)$:

$\because$ when $U = \{ x_1, x_2 \}$ and $A(x_1) = T, \ A(x_2) = F, \ B(x_1) = F, \ B(x_2) = T$

$(\forall x A \lor \forall x B) = F$ but $(\forall x (A \lor B)) = T$  


why not $\exists x A \land \exists x B \equiv \exists x (A \land B)$:  

$\because$ when $U = \{ x_1, x_2 \}$ and $A(x_1) = T, \ A(x_2) = F, \ B(x_1) = F, \ B(x_2) = T$

$(\exists x A \land \exists x B) = T$ but $\exists x (A \land B) = F$


### $8) \ \exists {x} \forall {y} D \supset \forall {y} \exists {x} D$

$\because$ when $U = \{ x_1, x_2, y_1, y_2 \}$ and  

|   x   |   y   |       |
| :---: | :---: | :---: |
|  x1   |  y1   |   T   |
|  x1   |  y2   |   T   |
|  x2   |  y1   |   F   |
|  x2   |  y2   |   F   |

$\exists x \forall y D = T$ and $\forall y \exists x D = T$

why not $\exists x \forall y D \equiv \forall y \exists x D$:  

$\because$ when $U = \{ x_1, x_2, y_1, y_2 \}$ and  

|   x   |   y   |       |
| :---: | :---: | :---: |
|  x1   |  y1   |   T   |
|  x1   |  y2   |   F   |
|  x2   |  y1   |   F   |
|  x2   |  y2   |   T   |

$\forall y \exists x D = T$ but $\exists x \forall y D = F$


### $12) \ \forall x B \supset A \equiv \exists x (B \supset A), \ \ \exists x B \supset A \equiv \forall x (B \supset A)$

the left expression  

$\because$ when $U = \{ x_1, x_2 \}$  
1. and $B(x_1) = T, B(x_2) = T$ i.e. $\forall x B = T$,  
   if $A = T$ then for example,  $(B(x_1) \supset A) = T$ so $(\exists x (B \supset A)) = T$
2. and $B(x_1) = T, B(x_2) = F$ i.e. $\forall x B = F$, 
   $(\forall x B \supset A) = T$ irrespective of $A = T$ or $A = F$ so $(\exists x (B \supset A)) = T$

the right expression

$\because$ when $U = \{ x_1, x_2 \}$ and $B(x_1) = T, B(x_2) = F$,  
if $(B(x_1) \supset A) = T$ then $\exists x (B \supset A)$  
if $(B(x_1) \supset A) = F$ but $(B(x_2) \supset A) = T$ then $\exists x (B \supset A)$

## Inference Rules about Quantifier

### $\forall \ left$

「ある特定の一例 $t$ について $A$ が成り立つ」ことを仮定して結論を導いた場合は，「全ての $x$ について $A$ が成り立つ」ことを確かめなければ結論が常に成り立つとはいえない

### $\forall \ right$

「任意の $z$ について $A$ が成り立つ」ことが導かれたなら，「全ての $x$ について $A$ が成り立つ」といってよい

### $\exists \ left$

「任意の $z$ について $A$ が成り立つ」ことを仮定して結論を導いた場合は，「$A$ を成り立たせる $x$ が存在する」と仮定を言い換えてよい


### $\exists \ right$

「ある特定の一例 $t$ について $A$ が成り立つ」ことが導かれたなら，「$A$ を成り立たせる $x$ が存在する」と結論を言い換えてよい


<br>

<hr>

<br>

# Modal Logic (様相論理)

文の **様相** (mode)，i.e. (ある文が事実として正しいこと) と (それが必然的に正しいこと) とを区別し，それらの間になりたつ論理的関係を明らかにする．  

- 必然的に $A$ である: $\Box A$
- $A$ は必然的でない: $\neg \Box A$
- $A$ でないことは必然的である = A である可能性はない: $\Box \neg A$
- $A$ である可能性がある: $\Diamond A = \neg \Box \neg A$

## Normal Modal Logic (正規な様相論理)

推論規則として ($\Box$) を含む様相論理

| Axiom Scheme (公理型) |      Additional Initial Sequent      |
| :-------------------: | :----------------------------------: |
|      $\bold{D}$       |     $\Box A \supset \Diamond A$      |
|      $\bold{T}$       |          $\Box A \supset A$          |
|      $\bold{4}$       |     $\Box A \supset \Box \Box A$     |
|      $\bold{B}$       |     $A \supset \Box \Diamond A$      |
|      $\bold{5}$       | $\Diamond A \supset \Box \Diamond A$ |


## Accecibility Relations (到達可能関係)

|                                                                                                                                              |
| :------------------------------------------------------------------------------------------------------------------------------------------: |
|                 $\bold{T}$ が $(M, R)$ で恒真 $\Longleftrightarrow$ $R$ は反射的 $\Longleftrightarrow$ $xRx$ が常になりたつ                  |
|             $\bold{4}$ が $(M, R)$ で恒真 $\Longleftrightarrow$ $R$ は推移的 $\Longleftrightarrow$ $xRy$ かつ $xRy$ ならば $xRz$             |
| $\bold{D}$ が $(M, R)$ で恒真 $\Longleftrightarrow$ $R$ は継続的 (serial) $\Longleftrightarrow$ どの $x$ に対してもある $y$ が存在して $xRy$ |
|                  $\bold{B}$ が $(M, R)$ で恒真 $\Longleftrightarrow$ $R$ は対称的 $\Longleftrightarrow$ $xRy$ ならば $yRx$                   |
|         $\bold{5}$ が $(M, R)$ で恒真 $\Longleftrightarrow$ $R$ はユークリッド的 $\Longleftrightarrow$ $xRy$ かつ $xRz$ ならば $yRz$         |

|                                                                                      |
| :----------------------------------------------------------------------------------: |
|                対称的かつ推移的 $\Longleftrightarrow$ ユークリッド的                 |
|               対称的かつ推移的かつ継続的 $\Longleftrightarrow$ 反射的                |
| 反射的かつユークリッド的 $\Longleftrightarrow$ 同値関係 (反射的かつ推移的かつ対象的) |

### Note:

対象的: $x \models p$ としたとき，$yRx$ かつ $x \models p$ i.e. $y \models \Diamond A$ となる $y$ が必ず存在する．  

ユークリッド的: 

![euclid_model]({{ site.url }}{{site.baseurl}}/assets/Mathmatical_Logic_images/euclid_model.png  

(1) $a \models \Diamond A$ とする．  
このとき $aRb$ と $aRc$ がなりたっているので $a \models \Diamond A$ より少なくとも $b \models A$ か $c \models A$．  

- i. $b \models A$ のとき，$cRb$ かつ $b \models A$ より $c \models \Diamond A$  
- ii. $c \models A$ のとき，$bRc$ かつ $c \models A$ より $b \models \Diamond A$  

よって $a \models \Diamond A$ としたとき $\Box \Diamond A$．  
(1) で $b \models \Diamond A$，$c \models \Diamond A$ としたときも同じことがいえるから $\Diamond A \supset \Box \Diamond A$   



<br>
<hr>
<br>

# References

- "情報科学における論理" / 小野 寛晰 / 日本評論社 / 1994
