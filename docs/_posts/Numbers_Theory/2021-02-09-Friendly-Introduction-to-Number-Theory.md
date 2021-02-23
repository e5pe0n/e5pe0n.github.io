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


# Linear Equation Theorem

Let $a$ and $b$ be nonzero integers, and let $g = \gcd(a, b)$.  
The equation  

$$
ax + by = g
$$

always has a solution $(x_1, y_1)$ in integers, and this solution can be found by the *Euclidean algorithm method*.  
Then every solution to the equation can be obtained by substituting integers $k$ into the formula  

$$
(x_1 + k \cdot \frac{b}{g}, \ y_1 - k \cdot \frac{a}{g})
$$

<br>

# Linear Congruence Theorem

Let $a$, $c$ and $m$ be integers with $m \ge 1$, and let $g = \gcd (a,m)$.  

1. If $g \nmid c$, then the congruence $ax \equiv c \pmod m$ has no solutions.  
2. If $g \mid c$, then the congruence $ax \equiv c \pmod m$ has exactly $g$ incongruent solutions.  

first find a solution $(u_0, v_0)$ to $au + mv = g$ then we obtain a complete set of incongruent solutions given by

$$
x_0 \equiv \frac{cu_0}{g} \pmod m \\
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

$\phi (m) = \\# \\{ a: 1 \le a \le m \ and \ \gcd(a, m) = 1 \\}$

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


<br>

# Phi Function Formulas

(a) If $p$ is a prime and $k \ge 1$, then      

$$    
\phi (p^k) = p^k - p^{k - 1}  
$$      
  

(b) If $\gcd (m, n) = 1$, then $\phi(mn) = \phi(m) \phi(n)$  


<br>

# Chinese Remainder Theorem

Let $m$ and $n$ be integers satisfying $\gcd(m, n) = 1$, and let $b$ and $c$ be any integers.  
Then the simultaneous congruences  

$$
x \equiv b \pmod m \ \ \ \ and \ \ \ \ x \equiv c \pmod n
$$

have exactly one solution with $0 \le x \le mn$.  

In general, let $m_1, m_2, ..., m_r$ be integers satisfying $\gcd(m_1, m_2, ..., m_r) = 1$, and let $a_1, a_2, ..., a_r$ be any integers.  
Then the simultaneous congruences  

$$
x \equiv a_1 \pmod {m_1}, \ \ \ x \equiv a_2 \pmod {m_2}, \ \ \ ..., \ \ \ x \equiv a_r \pmod {m_r}
$$

have exactly one solution with $0 \le x \le \prod_{i=1}^{r} m$

<br>

# Infinitely Many Primes Theorem

There are infinitely many prime numbers.  

<br>

# Primes 3 (Mod 4) Theorem

There are infinitely many primes that are congruent to 3 module 4.  


# Dirichlet's Theorem on Primes in Arithmetic Progresions

Let $a$ and $m$ be integers with $\gcd(a, m) = 1$.  
Then there are infinitely many primes that are congruent to $a$ module $m$.  
That is, there are infinitely many prime numbers $p$  satisfying  

$$
p \equiv a \pmod m
$$


<br>

# Legendre's formula

For any prime number $p$ and any positive integer $n$, let $\nu_p (n)$ be the exponent of the largest power of $p$ that divides $n$.  
Then  

$$
\nu_p (n!) = \sum_{i=1}^{\infty} \left \lfloor \frac{n}{p^i} \right \rfloor
$$

e.g.  

$$
\nu_2(6!) = \sum_{i=1}^{\infty} \left \lfloor \frac{6}{2^i} \right \rfloor
= \left \lfloor \frac{6}{2} \right \rfloor + \left \lfloor \frac{6}{4} \right \rfloor
= 3 + 1 = 4
$$

$$
\nu_3(6!) = \sum_{i=1}^{\infty} \left \lfloor \frac{6}{3^i} \right \rfloor
= \left \lfloor \frac{6}{3} \right \rfloor = 2
$$

$$
\nu_5{6!} = \sum_{i=1}^{\infty} \left \lfloor \frac{6}{5} \right \rfloor
= \left \lfloor \frac{6}{5} \right \rfloor = 1
$$

![legendre's formula example]({{site.url}}{{site.baseurl}}/assets/Friendly_Introduction_to_Number_Theory_images/legendres_formula_example.png)
