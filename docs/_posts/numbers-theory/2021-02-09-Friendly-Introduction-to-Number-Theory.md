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

# Theorem 9.1 (Fermat's Little Theorem)

Let $p$ be a prime number, and let $a$ be any number with $a \not \equiv \pmod p$. Then   

$$
a^{p - 1} \equiv 1 \pmod p
$$

<br>

# Lemma 9.2.

Let $p$ be a prime number and let $a$ be a number with $a \equiv 0 \pmod p$.  
Then the numbers  

$$
a, 2a, 3a, ..., (p - 1)a \ \ \ \pmod p
$$

are the same as the numbers   

$$
1, 2, 3, ..., (p - 1) \ \ \ \pmod p
$$

although they may be in a different order.  


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

have exactly one solution with $0 \le x \le \prod_{i=1}^{r} m_i$

<br>

# Infinitely Many Primes Theorem

There are infinitely many prime numbers.  

<br>

# Primes 3 (Mod 4) Theorem

There are infinitely many primes that are congruent to 3 module 4.  

<br>

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


<br>

# The Prime Number Theorem

When $x$ is large, the number of primes less than $x$ is approximately equal to $x / ln(x)$.  
In other words,  

$$
\lim_{x \to \infty} \frac{\pi (x)}{x / \ln (x)} = 1
$$  


<br>

# Goldbach's Conjecture

Every even number $n \ge 4$ is a sum of two primes.  

e.g. 

- 4 = 2 + 2
- 6 = 3 + 3
- 8 = 3 + 5
- 10 = 3 + 7

<br>

# The Twin Primes Conjecture

There are infinitely many prime numbers $p$ such that $p + 2$ is also prime.  

e.g.  (3, 5), (5, 7), (11, 13), (17, 19), (29, 31), (41, 43), ...   


<br>

# The $N^2 + 1$ Conjecture

There are infinitely many primes of the form $N^2 + 1$


<br>

# Geometric Series Formula

$$
x^n - 1 = (x - 1)(x^{n - 1} + x^{n - 2} + \cdots + x^2 + x + 1)
$$


<br>

# Mersenne Primes

If $a^n - 1$ is prime for some numbers $a \ge 2$ and $n \ge 2$, then $a$ must equal $2$ and $n$ must be a prime.  

<br>

# Fermat Primes

primes satisfy $F_k = 2^{2^k} + 1$.  

<br>

# Euclid's Perfect Number Formula 

If $2^p - 1$ is a prime number, then $2^{p - 1}(2^p - 1)$ is a perfect number.  

<br>

# Euler's Perfect Number Theorem

If $n$ is an even perfect number, then $n$ looks like  

$$
n = 2^{p - 1}(2^p - 1)
$$  

where $2^p - 1$ is a *Mersenne prime*.  

<br>

# Sigma Function Formulas  

(a) If $p$ is a prime and $k \ge 1$, then   

$$
\sigma(p^k) = 1 + p + p^2 + \cdots + p^k = \frac{p^{k + 1} - 1}{p - 1}
$$


(b) If $\gcd(m, n) = 1$, then  

$$
\sigma(mn) = \sigma(m) \sigma(n)
$$

<br>


# Successive Squaring to Compute $a^k \pmod m$

The following steps compute the value of $a^k \pmod m$.  

## Step 1

Write $k$ as a sum of powers of 2.  

$$
k = u_0 + u_1 \cdot 2 + u_2 \cdot 2^2 + u_3 \cdot 2^3 + \cdots + u_r \cdot 2^r,  
$$

where each $u_i$ is either 0 or 1.  (This is called the *binary expansion of k*)  

## Step 2

Make a table of powers of a modulo $m$ using successive squaring.  

$$
a^1 \equiv A_0 \pmod m \\
a^2 \equiv (a^1)^2 \equiv A_0^2 \equiv A_1 \pmod m \\
a^4 \equiv (a^2)^2 \equiv A_1^2 \equiv A_2 \pmod m \\
a^8 \equiv (a^4)^2 \equiv A_2^2 \equiv A_3 \pmod m \\
\vdots  \\
a^{2^r} \equiv (a^{2^{r - 1}})^2 \equiv A_{r - 1}^2 \equiv A_r \pmod m
$$

Because  

$$
a^k = a^{u_0 + u_1 \cdot 2 + u_2 \cdot 2^2 + u_3 \cdot 2^3 + \cdots + u_r \cdot 2^r} \\
= a^{u_0} \cdot (a^2)^{u_1} \cdot (a^{2^2})^{u_2} \cdots (a^{2^r})^{u_r} \\
= A_0^{u_0} \cdot A_1^{u_1} \cdot A_2^{u_2} \cdots A_r^{u_r} \pmod m
$$


<br>

# How to Compute $k^{th}$ Roots Molulo $m$ (RSA public key cryptosystem) described in *Friendly Introduction to Number Theory*

Let $b$, $k$ and $m$ be geven integers that satisfy  

$$
\gcd (b, m) = 1 \ \ \ and \ \ \ \gcd (k, \phi(m)) = 1
$$

The following steps give a solution to the congruence  

$$
x^k \equiv b \pmod m
$$

## 1.

Compute $\phi(m)$

## 2.

Find positive integers $u$ and $v$ that satisfy $ku - \phi(m)v = 1$ (The solutions $u$ and $v$ exist because $\gcd(k, \phi(m)) = 1$).  
Another way to say that is that $u$ is a positive integers satisfying $ku \equiv 1 \pmod {\phi(m)}$, so **$u$ is the inverse of $k$ modulo $\phi(m)$**.  

## 3.

Compute $b^u \pmod m$ by *successive squaring*.  
The value obtained gives the solution $x$.  
Because  

$$
b^u = (x^k)^u = x^{ku} = x^{1 + \phi(m)v} = x \cdot (x^{\phi(m)})^v \\
= x \pmod m \ \ \ (\because Euler's formula; if \gcd(x, m) = 1, x^{\phi(m)} \equiv 1 \pmod m)
$$

Checking the solution      

$$
x^k = (b^u)^k = b^{ku} = b^{1 + \phi(m)v} = b \cdot (b^{\phi(m)})^v \\
= b \pmod m \ \ \ (\because Euler's formula; if \gcd(b, m) = 1, b^{\phi(m)} \equiv 1 \pmod m)
$$

### Note:

$\gcd(x, m) = 1$ is equivalent to $\gcd(b, m) = 1$ since $x = b^k$.  


# RSA public key cryptosystem (probably more general version)  

1. Chooses large different prime numbers $p$ and $q$.
2. Calulates $m = pq$.  
3. Chooses a small odd number $k$, which is relative prime to $\phi(m) = (p - 1)(q - 1)$.  
4. Calculates $u$, which is the inverse of $k$ modulo $\phi(m)$.  
5. Exposes the pair $P = (k, m)$ as **RSA public key**.  
6. Conceal the pair $S = (u, m)$ as **secret key**

## Encrypt

To encrypt the message $M$ by the public key $P = (k, m)$, calculates  

$$
P(M) = M^k \pmod m
$$

## Decrypt

To decrypt the chiper $C$ by the secret key $S = (u, m)$, calculates  

$$
S(C) = C^u \pmod m
$$

## Verification

$P(S(M))$ is verification for the digital signature, and $S(P(M))$ is decryption to the encrypted message $P(M)$.  

$$
P(S(M)) = S(P(M)) = M^{ku} \pmod m \\
$$

$$
M^{ku} \equiv M^{1 + \phi(m)v} \pmod p \ \ \ \ \ (\because ku - \phi(m)v = 1) \\
\equiv M^{1 + (p - 1)(q - 1)v} \pmod p \\
\equiv M(M^{p - 1})^{(q - 1)v} \pmod p \\
\equiv M \pmod p \ \ \ \ \ (\because Fermat's \ little \ theorem)
$$

Similarly,  

$$
M^{ku} \equiv M \pmod q
$$

By *Chinsese Remainder Theorem*,  

$$
M^{ku} \equiv M \pmod m
$$

<br>

# Carmichael Numbers

Composite numbers, each $n$ with the property that

$$
a^n \equiv a \pmod n  \ \ \ \ \ for \ every \ integer \ 1 \le a \le n
$$

such as 561, 1105, 1729, 2465, 2821, 6601, 8911


<br>

# Theorem 19.1 (Korselt's Criterion for Carmichael Numbers)

Let $n$ be a composite number.  
Then $n$ is a *Carmichael number* iff it is odd and every prime $p$ dividing $n$ satisfies the following two conditions:  

(1) $p^2$ does not divide $n$  
(2) $p - 1$ divides $n - 1$


<br>

# Theorem 19.2 (A Property of Prime Numbers)

Let $p$ be an odd prime and write 

$$
p - 1 = 2^k q \ \ \ \ \ with \ q \ odd.  
$$ 

Let $a$ be any number not divisible by $p$.  
Then one of the following two conditions is true:  

(i) $a^q$ is congruent to 1 modulo $p$, i.e. $a^q \equiv 1 \pmod p$.  
(ii) One of the numbers $a^q, a^{2q}, a^{4q}, ..., a^{2^{k - 1}q}$ is congruent to -1 module $p$.  

### Note:  
$a^{p - 1} = a^{2^kq} \equiv 1 \pmod p$,  
and $x^2 \equiv 1 \pmod n$ has only trivial solutions, $x \equiv -1 \pmod n$ or $x \equiv 1 \pmod n$ if $n$ is prime.  
Thus, if $n$ is prime, $a^{p - 1} = a^{2^kq} \equiv 1 \pmod n$ and either $a^q \equiv 1 \pmod n$ or one of the squares such as $a^{2q}, a^{4q}, ..., a^{2^{k - 1}q}$ must be congruent to -1 modulo $n$.  


<br>

# Theorem 19.3 (Rabin-Miller Test for Composite Numbers)

Let $n$ be an odd interger and write $n - 1 = 2^k q$ with $q$ odd.  
If both of the following conditions are true for some a not divisible by $n$, then $n$ is a composite number.  

(a) $a^q \not \equiv 1 \pmod n$  
(b) $\forall i = 0, 1, ..., k - 1 \ \ \ \ \  a^{2^{i}q} \not \equiv -1$


<br>

# Theorem 20.1

Let $p$ be an odd prime.  
Then there are exactly $(p - 1) / 2$ quadratic residues modulo $p$ and exactly $(p - 1) / 2$ nonresidues moduoe $p$.  

**quadratic residue modulo p; QR**: nozero numbers that are congruent to a square modulo $p$  
**(quadratic) nonresidue modulo p; NQ**: numbers that not congruent to a square modulo $p$

Because $p = (p - b) + b$ and $(p - b)^2 = p^2 - 2pb + b^2 \equiv b^2 \pmod p$, we only need to compute half of them:  

$1^2 \pmod p, \ \ \ \ \ 2^2 \pmod p, \ \ \ \ \ 3^2 \pmod p, \ \ \ \ \ ..., (\frac{p - 1}{2})^2 \pmod p$  

to get a list of quadratic residues modulo $p$.  


<br>

# Theorem 20.2 (Quadratic Residue Multiplication Rule). ver.1

Let $p$ be an odd prime. Then:  

(i) $QR * QR = QR$: The product of two quadratic residues modulo $p$ as a quadratic residue.  
(ii) $QR * NR = NR$: The product of a quadratic residue and a nonresidue is a nonresidue.  
(iii) $NR * NR = QR$: The product of two nonresidues is a quadratic residue.  


<br>

# The *Legendre symbol* of $a$ modulo $p$

$$
\left(\frac{a}{p} \right) =
\begin{cases}
1 \ \ \ \text{if } a \text{ is a quadratic residue modulo } p. \\  
-1 \ \ \ \text{if } a \text{ is a nonresidue modulo } p.  
\end{cases}
$$

e.g.  

$$
\left(\frac{3}{13} \right) = 1, \ \ \ \left(\frac{11}{13} \right) = -1, \ \ \ \left(\frac{2}{7} \right) = 1, \ \ \ \left(\frac{3}{7} \right) = -1
$$

<br>

# Theoreom 20.3 (Quadratic Residue Multiplication Rule). ver.2

Let $p$ be an odd prime. Then  

$$
\left(\frac{a}{p} \right) \left(\frac{b}{p} \right) = \left(\frac{ab}{p} \right)
$$


<br>


# Theorem 21.1 (Euler's Criterion)

Let $p$ be an odd prime. Then  

$$
a^{(p - 1) / 2} \equiv \left(\frac{a}{p} \right) \pmod p
$$


<br>

# Theorem 21.2 (Quadratic Reciprocity)

## Part I

Let $p$ be an odd prime. Then  

$$
-1 \text{ is a quadratic residue modulo } p \ \ \  \text{ if } p \equiv 1 \pmod 4 \text{, and}
$$

$$
-1 \text{ is a nonresidue modulo } p \ \ \ \ \ \text{ if } p \equiv 3 \pmod 4
$$

In other words, using the *Legendre symbol*,   

$$
\left(\frac{-1}{p} \right) =
\begin{cases}
1 \ \ \ \ \ \ \text{if } p \equiv 1 \pmod 4 \\
-1 \ \ \ \text{if } p \equiv 3 \pmod 4
\end{cases}
$$


## Part II

Let $p$ be an odd prime. Then    

$$
2 \text{ is a quadratic residue modulo } p \ \ \ \text{if } p \equiv 1 \text{ or } 7 \pmod 8
$$

$$
2 \text{ is nonresidue modulo } p \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \text{if } p \equiv 3 \text{ or } 5 \pmod 8
$$

In other words, using the *Legendre symbol* ,  

$$
\left(\frac{2}{p} \right) =
\begin{cases}
1 \ \ \ \ \ \ \text{ if } p \equiv 1 \text{ or } 7 \pmod 8 \\
-1 \ \ \ \text{ if } p \equiv 3 \text{ or } 5 \pmod 8
\end{cases}
$$

<br>

# Theorem 21.3 (Primes 1 (Mod 4) Theorem)

There are infinitely many primes that are congruent to 1 modulo 4.  

## Proof

Assume $A$ such as  

$$
A = (2 p_1 p_2 \cdots p_r)^2 + 1
$$

where $p_1, p_2, \cdots p_r$ are congruent to 1 modulo 4.  

Factorizing $A$, say  

$$
A = q_1 q_2 \cdots q_s
$$

Each $q_i$ is different from each $p_i$ because none of $p_i$ divides $A$.  
Then

$$
(2 p_1 p_2 \cdots p_r)^2 + 1 = A \equiv 0 \pmod {q_i} \\
(2 p_1 p_2 \cdots p_r)^2 \equiv -1 \pmod {q_i} \\
x^2 \equiv -1 \pmod {q_i}
$$

Since -1 is a quadratic residue modulo $q_i$, each $q_i$ is $\equiv 1 \pmod 4$.  
Now we obtain new primes $q_i$s that are congruent 1 modulo 4 and different from $p_i$s.


<br>

# Theorem 22.1 (Law of Quadratic Reciprocity)

Let $p$ and $q$ be distinct odd primes.  

$$
\left(\frac{-1}{p} \right) =
\begin{cases}
1 \ \ \ \text{ if } p \equiv 1 \pmod 4 \\
-1 \ \ \ \text{ if } p \equiv 3 \pmod 4
\end{cases}
$$



$$
\left(\frac{2}{p} \right) =
\begin{cases}
1 \ \ \ \text{ if } p \equiv 1 \text{ or } 7 \pmod 8 \\
-1 \ \ \ \text{ if } p \equiv 3 \text{ or } 5 \pmod 8
\end{cases}
$$

$$
\left(\frac{q}{p} \right) =
\begin{cases}
\left(\frac{p}{q} \right) \ \ \ \text{ if } p \equiv 1 \pmod 4 \text{ or } q \equiv 1 \pmod 4 \\
- \left(\frac{p}{q} \right) \ \ \ \text{ if } p \equiv 3 \pmod 4 \text{ and } q \equiv 3 \pmod 4
\end{cases}
$$


<br>

# Theorem 22.2 (Generalized Law of Quadratic Reciprocity)

Let $a$ and $b$ be odd positive integers.  

$$
\left(\frac{-1}{b} \right) =
\begin{cases}
1 \ \ \ \ \ \ \text{ if } b \equiv 1 \pmod 4 \\
-1 \ \ \ \text{ if } b \equiv 3 \pmod 4
\end{cases}
$$

$$
\left(\frac{2}{b} \right) =
\begin{cases}
1 \ \ \ \ \ \ \text{ if } b \equiv 1 \text{ or } 7 \pmod 8 \\
-1 \ \ \ \text{ if } b \equiv 3 \text{ or } 5 \pmod 8
\end{cases}
$$

$$
\left(\frac{a}{b} \right) =
\begin{cases}
\left(\frac{b}{a} \right) \ \ \ \ \ \ \ \text{ if } a \equiv 1 \pmod 4 \text{ or } b \equiv 1 \pmod 4 \\
-\left(\frac{b}{a} \right) \ \ \ \text{ if } a \equiv b \equiv 3 \pmod 4
\end{cases}
$$
