---
title: "Note: Friendly Introduction to Number Theory"
categories:
  - Note
tags:
  - Number Theory
  - Algorithm
last-modified-at: 2021-02-09
---

# Prime Divisibility Property

Let $p$ be a prime number, and suppose that $p$ divides the product $a_1a_2 \cdots a_r$.  
Then $p$ divides at least one of the factors $a_1, a_2, ..., a_r$

<br>


# Fundamental Theorem of Arithmetic

Every integer $n \ge 2$ can be factored into a product of primes  

$$
n = p_1p_2 \cdots p_r
$$

in exactly one way.  

<br>

# Linear Congruence Theorem

Let $a$, $c$ and $m$ be integers with $m \ge 1$, and let $g = \gcd (a,m)$.  

1. If $g \nmid c$, then the congruence $ax \equiv c \pmod m$ has no solutions.  
2. If $g \mid c$, then the congruence $ax \equiv c \pmod m$ has exactly $g$ incongruent solutions.  

first find a solution $(u_0, v_0)$ to $au + mv = g$ then we obtain a complete set of incongruent solutions given by

$$
x_0 = \frac{cu_0}{g} \\
x \equiv x_0 + k \cdot \frac{m}{g} \pmod m \ \ for \ k = 1, 2,...,g - 1
$$


## Note

When $\gcd (a, m) = 1$, the congruence $ax \equiv c \pmod m$ has exactly one solution.  

<br>


# Polynomial Roots Mod $p$ Theorem

Let $p$ be a prime number and let   

$$
f(x) = a_0 x^d + a_1 x^{d - 1} + \cdots + a_d
$$

be a polynomial of degree $d \ge 1$ with integer coeeficients and with $p \nmid a_0$.  
The the congruence  

$$
f (x) \equiv 0 \pmod p
$$

has at most $d$ incogruent solutions.  

<br>

# Fermat's Little Theorem

Let $p$ be a prime number, and let $a$ be any number with $a \not \equiv \pmod p$. Then   

$$
a^{p - 1} \equiv 1 \pmod p
$$

<br>

# Euler's Formula

If $gcd(a, m) = 1$, then

$$
a^{\phi (m)} \equiv 1 \pmod m
$$

## Euler's phi function

$\phi (m) = \# \{ a: 1 \le a \le m \ and \ \gcd(a, m) = 1 \}$

e.g.

|  $m$  | $\phi (m)$ |                        |
| :---: | :--------: | :--------------------: |
|  $1$  |    $1$     |        $\{1\}$         |
|  $2$  |    $1$     |        $\{1\}$         |
|  $3$  |    $2$     |       $\{1, 2\}$       |
|  $4$  |    $2$     |       $\{1, 3\}$       |
|  $5$  |    $4$     |    $\{1, 2, 3, 4\}$    |
|  $6$  |    $2$     |       $\{1, 5\}$       |
|  $7$  |    $6$     | $\{1, 2, 3, 4, 5, 6\}$ |
|  $8$  |    $4$     |    $\{1, 3, 5, 7\}$    |
|  $9$  |    $6$     | $\{1, 2, 4, 5, 7, 8\}$ |
| $10$  |    $4$     |    $\{1, 3, 7, 9\}$    |


