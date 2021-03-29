---
title: "Note: Introduction to the Theory of Computation"
categories:
  - Note
tags:
  - Programming
  - Theory of Computation
last-modified-at: 2021-03-13
---


# Regualr Expressions

*Regular expression* is translated to "正規表現", but *expression* means "式" rather than "表現".  
An expression ("式") evaluates to a value.  

### e.g.1 Arithmetic expression  

`(5 + 4) * 4` evaluates to a value, `32`.  
This means an arithmetic expression evaluates to a number as a value.  


### e.g.2 Regular expression

$(0 \cup 1) 0^*$ evaluates to a value, $\{ 0, 1, 00, 10, 000, 1000, \dots \}$.  
This means a regular expression evaluates to a **language** as a value.  


## Applications

- commands
  - *awk*, *grep*
- a part of compiler
  - *lexical analyzer* （字句解析）

<br>

# Context-Free Grammers

## Application

- a part of compiler
  - *parser*


# 6. Decidability of Logical Theories


## Theorem 6.17 (p.259)

The sentence $\psi_{unprovable} = \neg \exists{c} \ [\phi_{S, 0}]$ is unprovable.  

$\phi_{unprovable}$ is true iff $S$ does not accept 0.  

### case 1.  
If $S$ finds a proof of $\psi_{unprovable}$, $S$ must accept 0 to verify whether $\phi_{unprovable}$ is true.  
So $\phi_{unprovable}$ is false.  
A false statement cannot be provable so this is absurdity.  

### case 2.
If $S$ does not find a proof of $\psi_{unprovable}$, i.e. $S$ cannot verify whether $\phi_{unprovable}$ is true, that means $S$ does not accept 0.  
Thus, we cannot verify whether $\phi_{unprovable}$ is true even if $\phi_{unprovable}$ were true.  
