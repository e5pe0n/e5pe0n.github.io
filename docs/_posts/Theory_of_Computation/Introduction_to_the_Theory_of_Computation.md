---
title: "Note: Introduction to the Theory of Computation"
categories:
  - Note
tags:
  - Programming
  - Theory of Computation
last-modified-at: 2021-02-25
---


# Regualr Expression

*Regular expression* is translated to "正規表現", but *expression* means "式" rather than "表現".  
An expression ("式") evaluates to a value.  

### e.g.1 Arithmetic expression  

`(5 + 4) * 4` evaluates to a value, `32`.  
This means an arithmetic expression evaluates to a number as a value.  


### e.g.2 Regular expression

$(0 \cup 1) 0^*$ evaluates to a value, $\{ 0, 1, 00, 10, 000, 1000, \dots \}$.  
This means a regular expression evaluates to a **language** as a value.  

