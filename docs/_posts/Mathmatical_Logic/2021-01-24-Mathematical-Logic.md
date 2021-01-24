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





<br>

# References

- "情報科学における論理" / 小野 寛晰 / 日本評論社 / 1994
