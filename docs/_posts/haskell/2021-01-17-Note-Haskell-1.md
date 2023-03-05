---
title: "Note: Haskell 1"
categories:
  - Note
tags:
  - Haskell
last-modified-at: 2021-01-23
---

# Lazy Evaluation

## Concept

**No computation should be performed until its result is actually required**

# Naming Requirements of Functions

These are *keywords*; reversed words.  

```
case  class  data  default  deriving
do  else  foreign  if  import  in
infix  infixl  infixr  instance  let
module  newtype  of  then  type  where
```

<br>

# Standard Prelude

```hs
main = do
  let x = [1, 2, 3, 4, 5]
  print (head x) -- 1
  print (tail x) -- [2, 3, 4, 5]
  print (init x) -- [1, 2, 3, 4]
  print (last x) -- 5
  print (x !! 2) -- 3
  print (take 3 x) -- [1, 2, 3]
  print (drop 3 x) -- [4, 5]
  print (length x) -- 5
  print (sum x) -- 15
  print (product x) -- 120
  print ([1, 2, 3] ++ [4, 5]) -- [1 , 2, 3, 4, 5]
  print (reverse x) -- [5, 4, 3, 2, 1]
```

<br>

# Types

A *type* is a collection of related values.  

## Notation 1

`v :: T` means `e` is a value in the type `T`.  

```
False :: Bool
True :: Bool
not :: Bool -> Bool
```

## Notation 2

`e :: T` means evaluation of the expression `e` will produce a value of type `T`.  

```
not False :: Bool
not True :: Bool
not (not False) :: Bool
```

Typing rule

```
f :: A -> B  e :: A
-------------------
      f e -> B
```

## Type Interface and Type Safe

**type interface** that evaluates types under typing rule.  
type interface precedes evaluation of values so Haskell programs are **type safe**.

## Basic Types

|  types  |                             description                             |
| :-----: | :-----------------------------------------------------------------: |
|  Bool   |                                                                     |
|  Char   |                                                                     |
| String  |                                                                     |
|   Int   | fixed-precision intergers <br> the range is $[-2^{63}, 2^{63} - 1]$ |
| Integer |                    arbitarary-precision integers                    |
|  Float  |               single-precision floating-point numbers               |
| Double  |               double-precision floating-point numbers               |

## List Types

```hs
[['a', 'b'], ['c', 'd', 'e']] :: [[Char]]
```
## Tuple Types
 
*arity*: the number of components in a tuple
- arity zero: `()`; the empty tuple
- arity one: **Not Permitted**
- arity two: *pairs*
- arity three: *triples*

```hs
tp1 = ("Yes", True, 'a') :: (String, Bool, Char)
tp2 = (3, "Blue") :: (Int, String)

main = do
  print (fst tpl) -- 3
  print (snd tpl) -- "Blue"
```

## Function Types

A `function` is mapping from arguments of one type to results of another type.

```hs
add :: (Int, Int) -> Int
add (x, y) = x + y

add (1, 2)  -- 3


zeroto :: Int -> [Int]
zeroto n = [0..n]
```
### Curried Functions


```hs
add' :: Int -> (Int -> Int)
add' x y = x + y

add' 1 2  -- 3


mult :: Int -> (Int -> (Int -> Int))
mult x y z = x * y * z
```

Don't confuse currying and partial application
- Currying: divide a function into functions with only one argument and nest them.
- Partial Application: create a new function by fixing partial arguments of a original function

```hs
-- currying
add' :: Int -> (Int - > Int)
add' x y = x + y

add' 1 2

-- partial application 1
add'' = add' 1
add'' 2 -- 3

-- partial application 2
add'' y = add (1, y)
add'' 2 -- 3
```

## Polymorphic Types

```hs
fst :: (a, b) -> a
head :: [a] -> a
take :: Int -> [a] -> [a]
zip :: [a] -> [b] -> [(a, b)]
id :: a -> a
```

### Type Variable

must begin with a lower-case letter

```hs
length :: [a] -> Int
```

## Overloaded Types

contains one or more class constraints

```hs
(+) :: Num a => a -> a -> a
negate :: Num a => a -> a
abs :: Num a => a -> a
```

### Class Constraint

```
-- C: class name
-- a: type variable (an assined type to `a` is called `instance` of class `C`)
C a
```

<br>

# Classes

A *class* is a collection of types that support certain overloaded operatoins; *methods* (e.g. `(==), (/=)` in Eq)

## Eq - equality types

```hs
(==) :: a -> a -> Bool
(/=) :: a -> a -> Bool
```

All the basic types Bool, Char, String, Int, Integer, Float and Double are instances of the Eq class.  
As are list and tuple types, provided that element and component types of the basic types are instances.

## Ord - ordered types

```hs
(<) :: a -> a -> Bool
(<=) :: a -> a -> Bool
(>) :: a -> a -> Bool
(>=) :: a -> a -> Bool
min :: a -> a -> a
max :: a -> a -> a
```

## Show - showable types

```hs
show :: a -> String
```

## Read - readable types

```hs
read :: String -> a
```

## Num - numeric types

```hs
(+) :: a -> a -> a
(-) :: a -> a -> a
(*) :: a -> a -> a
negate :: a -> a
abs :: a -> a signum :: a -> a
```

## Integral - integral types

Types to support the methods of integer division and integer remainder.
*Int* and *Integer* are *instances* of *Integral*.  

```hs
div :: a -> a -> a
mod :: a -> a -> a
```

## Fractional - fractional types

support the methods of fractional division and fractinal reciprocation

```
(/) :: a -> a -> a
recip :: a -> a
```

```hs
> 7.0 / 2.0
3.5

> recip 2.0
0.5
```

<br>

# Definning Functions

## Conditional Expressions

```hs
abs :: Int -> Int
abs n = if n >= 0 then n else -n

signum :: Int -> Int
signum n = if n < 0 then -1 else
  if n == 0 then 0 else 1
```

## Guarded Equations

```hs
abs n
  | n >= 0 = n
  | otherwise = - n

signum n
  | n < 0 = -1
  | n == 0 = 0
  | otherwise = 1
```

The symbol `|` is read as *such that*.


## Pattern matching

```hs
not :: Bool -> Bool
not False = True
not True = False

(&&) :: Bool -> Bool -> Bool
True && True = True
_ && _ = False
```

### Tuple Patterns

```hs
fst :: (a, b) -> a
fst (x, _) = x

snd :: (a, b) -> b
snd (_, y) = y
```

### List Patterns

matches any list of the same length whose elements all match the corresponding patterns in order.  

```hs
test :: [Char] -> Bool
test ['a', _, _] = True
test _ = False
```

*cons* operator `:` prepends a new element to an existing list.  

```hs
[1, 2, 3]
= 1:[2, 3]
= 1:(2:[3])
= 1:(2:(3:[]))
```

```hs
test :: [Char] -> Bool
test ('a':_) = True
test _ = False

head :: [a] -> a
head (x:_) = x

tail :: [a] -> [a]
tail (_:xs) = xs
```

## Lambda Expressions

```hs
\x -> x + x

> (\x -> x + x) 2
4
```

```hs
add :: Int -> Int -> Int
add x y = x + y
add = \x -> (\y -> x + y)
```

```hs
const :: a -> b -> a
const x _ = x
const x = \_ -> x
```

```hs
odds :: Int -> [Int]
odds n = map f [0..n-1]
  where f x = x * 2 + 1
odds n = map (\x -> x * 2 + 1) [0..n-1]
```

## Operator Sections

- operators: functions with two arguments
- sections: operators formed as `(#)`, `(x #)`, or so

```hs
(#) = \x -> (\y -> x # y)
(x #) = \y -> x # y
(# y) = \x -> x # y
```

<br>

# List Comprehensions

$\{x^2 | x \in \{ 1 .. 5 \} \}$

```hs
xs = [x^2 | x <- [1..5]]  -- [1, 4, 9, 16, 25]
```

- `|`: *such that*
- `<-`: *drawn from*
- `x <- [1..5]`: **generator**

```hs
xs2 = [(x, y) | x <- [1, 2, 3,], y <- [4, 5]]
-- [(1, 4), (1, 5), (2, 4), (2, 5), (3, 4), (3, 5)]

xs3 = [(x, y) | y <- [4, 5], x <- [1, 2, 3]]
-- [(1, 4), (2, 4), (3, 4), (1, 5), (2, 5), (3, 5)]

xs4 = [(x, y) | x <- [1..3], y <- [x..3]]
-- [(1, 1), (1, 2), (1, 3), (2, 2), (2, 3), (3, 3)]
```

```hs
concat :: [[a]] -> [a]
concat xss = [x | xs <- xss, x <- xs]

firsts :: [(a, b)] -> [a]
firsts ps = [x | (x, _) <- ps]

length :: [a] -> Int
length xs = sum [1 | _ <- xs]


main = do
  print (concat [[1, 2, 3], [4, 5, 6]]) -- [1,2,3,4,5,6]
  print ([1, 2, 3] ++ [4, 5, 6]) -- [1,2,3,4,5,6]
  print (firsts [(1, 2), (3, 4), (5, 6)]) -- [1, 3, 5]
  print (length [1, 2, 3]) -- 3
```

## Guard

expressions to filter generated values

```hs
evens :: Integral a => a -> [a]
evens n = [x | x <- [0 .. n], even x]

factors :: Integral a => a -> [a]
factors n = [x | x <- [1 .. n], n `mod` x == 0]

prime :: Integral a => a -> Bool
prime n = factors n == [1, n]
{- Note:
  Deciding that a number is prime does not require 
  the `prime` to produce all of its factors, 
  because under lazy evaluation the result `False` is returned 
  as soon as any factor other than one or the number itself is produced.
  e.g. `prime 15` returns `False` when 3 in its factors `[1, 3, 5, 15]` is produced in `factors`.
-}

primes :: Integral a => a -> [a]
primes n = [x | x <- [2 .. n], prime x]

find :: Eq a1 => a1 -> [(a1, a2)] -> [a2]
find k t = [v | (k', v) <- t, k == k']

main = do
  print (evens 10) -- [0,2,4,6,8,10]
  print (factors 12) -- [1,2,3,4,6,12]
  print (prime 15) -- False
  print (prime 7) -- True
  print (primes 40) -- [2,3,5,7,11,13,17,19,23,29,31,37]
  print (find 'b' [('a', 1), ('b', 2), ('c', 3), ('b', 4)]) -- [2, 4]
```

## zip function

```hs
pairs :: [b] -> [(b, b)]
pairs xs = zip xs (tail xs)

sorted :: Ord a => [a] -> Bool
sorted xs = and [x <= y | (x, y) <- pairs xs]

positions :: (Num a1, Enum a1, Eq a2) => a2 -> [a2] -> [a1]
positions x xs = [i | (x', i) <- zip xs [0 ..], x == x']

main = do
  print (zip ['a', 'b', 'c'] [1, 2, 3, 4]) -- [('a',1),('b',2),('c',3)]
  print (pairs [1, 2, 3, 4]) -- [(1,2),(2,3),(3,4)]
  print (sorted [1, 2, 3, 4]) -- True
  print (sorted [1, 3, 2, 4]) -- False
  print (positions False [True, False, True, False]) -- [1, 3]
```

## String comprehensions

*String* is a list of *Char*

```hs
lowers :: [Char] -> Int
lowers xs = length [x | x <- xs, x >= 'a' && x <= 'z']

count :: Eq a => a -> [a] -> Int
count x xs = length [x' | x' <- xs, x == x']

main = do
  print ("abcde" !! 2) -- 'c'
  print (take 3 "abcde") -- "abc"
  print (length "abcde") -- 5
  print (zip "abc" [1, 2, 3, 4]) -- [('a',1),('b',2),('c',3)]

  print (lowers "Haskell") -- 6
  print (count 's' "Mississippi") -- 4
```

# Recursive Functions

```hs
fac :: Int -> Int
fac 0 = 1
fac n = n * fac (n - 1)

(*) :: Int -> Int -> Int
m * 0 = 0
m * n = m + (m * (n - 1))
```

## Recursion on Lists

```hs
product :: Num a => [a] -> a
product [] = 1
product (n:ns) = n * product ns

length :: [a] -> Int
length [] = 1
length (_:xs) = 1 + length xs

reverse :: [a] -> a
reverse [] = []
reverse (x:xs) = reverse xs ++ [x]

(++) :: [a] -> [a] -> [a]
[] ++ ys = ys
(x:xs) ++ ys = x:(xs ++ ys)

insert :: Ord a => a -> [a] -> [a]
insert x [] = [x]
insert x (y:ys)
  | x <= y = x:y:ys
  | otherwise = y:insert x ys

-- insertion sort
isort :: Ord a => [a] -> [a]
isort [] = []
isort (x:xs) = insert x (isort xs)
```

## Multiple Arguments

```hs
zip :: [a] -> [a] -> [(a, b)]
zip [] _ = []
zip _ [] = []
zip (x:xs) (y:ys) = (x, y):zip xs ys

drop :: Int -> [a] -> [a]
drop 0 xs = xs
drop _ [] = []
drop n (x:xs) = drop (n - 1) xs
```

## Multiple Recursion

```hs
fib :: Int -> Int
fib 0 = 0
fib 1= 1
fib n = fib (n - 2) + fib (n - 1)

qsort :: Ord a => [a] -> [a]
qsort [] = []
qsort (x:xs) = qsort smaller ++ [x] ++ qsort larger
  where 
    smaller = [a | a <- xs, a <= x]
    larger = [b | b <- xs, b > x]
```

## Mutual Recursion

```hs
even :: Int -> Bool
even 0 = True
even n = odd (n - 1)

odd :: Int -> Bool
odd 0 = False
odd n = even (n - 1)


evens :: [a] -> [a]
evens [] = []
evens (x:xs) = x:odds xs

odds :: [a] -> [a]
odds [] = []
odds (_:xs) = evens xs
```

## Generalizing and Simplifying

```hs
-- before
product :: Num a => [a] -> a
product [] = 1
product (n:ns) = n * product ns

-- after
product :: Num a => [a] -> a
product = foldr (*) 1
```

```hs
-- before
init :: [a] -> [a]
init (x:xs)
  | null xs = []
  | otherwise = x:init xs

-- after
init :: [a] -> [a]
init [_] = []
init (x:xs) = x:init xs
```

<br>

# Higher-Order Functions

Functions that take a function as an argument or return a function as a result

## Processing Lists

```hs
-- list conprehension ver.
map :: (a -> b) -> [a] -> [b]
map f xs = [f x | x <- xs]

-- recursive ver.
map :: (a -> b) -> [a] -> [b]
map f [] = []
map f (x : xs) = f x : map f xs


-- list conprehension ver.
filter :: (a -> Bool) -> [a] -> [a]
filter p xs = [x | x <- xs, p x]

-- recursive ver.
filter :: (a -> Bool) -> [a] -> [a]
filter p [] = []
filter p (x : xs)
  | p x = x : filter p xs
  | otherwise = filter p xs


main = do
  print (all even [2, 4, 6, 8]) -- True
  print (any odd [2, 4, 6, 8]) -- False
  print (takeWhile even [2, 4, 6, 7, 8]) -- [2, 4, 6]
  print (dropWhile odd [1, 3, 5, 6, 7]) -- [6, 7]
```

## foldr()

```hs
foldr (#) v [x0, x1, ..., xn] = x0 # (x1 # (... (xn # v)))

f v

-- recursive ver.
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr f v [] = v
foldr f v (x : xs) = f x (foldr f v xs)
```

```hs
sum :: Num a => [a] -> a
-- sum [] = 0
-- sum (x : xs) = x + sum(xs)
sum = foldr (+) 0

product :: Num a => [a] -> a
product = foldr (*) 1

or :: [Bool] -> Bool
or = foldr (||) False

and :: [Bool] -> Bool
and = foldr (&&) True

length :: [a] -> Int
-- length [] = 0
-- length (_:xs) = 1 + length xs
length = foldr (\_ n -> 1 + n) 0


-- snoc is `cons` backwards
snoc :: a -> [a] -> [a]
snoc x xs = xs ++ [x]

reverse :: [a] -> [a]
-- reverse [] = []
-- reverse (x : xs) = reverse xs ++ [x]
reverse :: [a] -> [a]
reverse = foldr snoc []
```

## foldl()

*v* is *accumlator*.  

```hs
foldl (#) v [x0, x1, ..., xn] = (((v # x0) # x1)...) # xn

-- recursive ver.
foldl :: (a -> b -> a) -> a -> [b] -> a
foldl f v [] = v
fold f v (x : xs) = foldl f (v + x) xs
```

```hs
sum' :: Num a => [a] -> a
sum' = sum'' 0
  where
    sum'' v [] = v
    sum'' v (x : xs) = sum'' (v + x) xs

sum :: Num a => [a] -> a
sum = foldl (+) 0

product :: Num a => [a] -> a
product = foldl (*) 1

or :: [Bool] -> Bool
or = foldl (||) False

and :: [Bool] -> Bool
and = foldr (&&) True

length :: [a] -> Int
length = foldl (\n _ -> n + 1) 0

reverse :: [a] -> [a]
reverse = foldl (\xs x -> x : xs) []
```

## Composition Operator

`f . g` is read as *f composed with g* .  

```hs
(.) :: (b -> c) -> (a -> b) -> (a -> c)
f . g = \x -> f (g x)
```

```hs
-- odd n = not (even n)
odd = not . even

-- twice f x = f (f x)
twice = f . f

-- sumsqreven ns = sum (map (^2) (filter even ns))
sumsqreven = sum . map (^2) . filter even
```

```hs
-- identity function; id.f = f, f.id = f
id :: a -> a
id = \x -> x

compose :: [a -> a] -> (a -> a)
compose = foldr (.) id  -- make the composition of a list of functions
```

```hs
-- produces an infinite list
iterate f x = [x, f x, f(f x), f(f(f x)), ...]

iterate (*2) 1  -- [1, 2, 4, 8, ...]


-- repeat :: a -> [a]: procudes an infinite list of copies of a value
repeat 0  -- [0, 0, 0, 0, ...]
take 8 (repeat 0) -- [0, 0, 0, 0, 0, 0, 0, 0] -- lazy evaluation
```

<br>

# Type Declarations

```hs
type String = [Char]

type Pos = (Int, Int)
type Trans = Pos -> Pos

type Pair a = (a, a)
type Assoc k v = [(k, v)]

find :: Eq k => k -> Assoc k v -> v
find k t = head [v | (k', v) <- t, k == k']
```

# Data Declarations

- `|` is read as *or*.  
- **constructors** new values of the type (e.g. `False` and `True` are constructors of *Bool*)

```hs
data Bool = False | True
```

```hs
data Move = North | South | East | West

move :: Move -> Pos -> Pos
move North (x, y) = (x, y + 1)
move South (x, y) = (x, y - 1)
move East (x, y) = (x + 1, y)
move West (x, y) = (x - 1, y)

moves :: [Move] -> Pos -> Pos
moves [] p = p
moves (m : ms) p = moves ms (move m p)
```

## Cosntructor Functions

### vs. normal functions

- have no defining equations and exist as data
- e.g. 
  - `negate 1.0` can be evaluated to -1.0 by definition of negate
  - `Circle 1.0` is already fully evaluated and cannot be further simplified

```hs
-- Circle :: Float -> Shape
-- Rect :: Float -> Float -> Shape
data Shape = Circle Float | Rect Float Float

square :: Float -> Shape
square n = Rect n n

area :: Shape -> Float
area (Circle r) = pi * r ^ 2
area (Rect x y) = x * y
```

type as a argument

```hs
data Maybe a = Nothing | Just a

safediv :: Int -> Int -> Maybe Int
safediv _ 0 = Nothing
safediv m n = Just (m `div` n)

safehead :: [a] -> Maybe a
safehead [] = Nothing
safehead xs = Just (head xs)
```

## Newtype Declarations

newtype declarations are to improve type safety without affecting perfomance.  
it must have *Constructor* such as `N` in below example.  

```hs
newtype Nat = N Int

type Nat = Int
data Nat = N Int
```

### vs. type

- Using newtype rather than type means that `Nat` and `Int` are different types rather than synonyms
- The type system of Haskell ensures that they cannot accidentally be mixed up in programs

### vs. data

- Using newtype rather than data brings an efficiency benefit
- newtype constructors such as `N` do not incur any cost when programs are evaluated, as they are automatically removed by the compiler once type checking is completed


## Recursive Types

```hs
data Nat = Zero | Succ Nat

nat2int :: Nat -> Int
nat2int Zero = 0
nat2int (Succ n) = 1 + nat2int n

int2nat :: Int -> Nat
int2nat 0 = Zero
int2nat n = Succ (int2nat (n - 1))

add :: Nat -> Nat -> Nat
add m n = int2nat (nat2int m + nat2int n)

add' :: Nat -> Nat -> Nat
add' Zero n = n
add' (Succ m) n = Succ (add' m n)


{- e.g. 2 + 1
    add (Succ (Succ Zero)) (Succ Zero)
  = (Succ add (Succ Zero) (Succ Zero))
  = Succ (Succ (add Zero (Succ Zero)))
  = Succ (Succ (Succ Zero))
-}
```

```hs
data Tree a = Leaf a | Node (Tree a) a (Tree a)

t :: Tree Int
t = Node (Node (Leaf 1) 3 (Leaf 4)) 5 (Node (Leaf 6) 7 (Leaf 9))

flatten :: Tree a -> [a]
flatten (Leaf x) = [x]
flatten (Node l x r) = flatten l ++ [x] ++ flatten r

occurs :: Eq a => a -> Tree a -> Bool
occurs x (Leaf y) = x == y
occurs x (Node l y r) = x == y || occurs x l || occurs x r

occurs' :: Ord a => a -> Tree a -> Bool
occurs' x (Leaf y) = x == y
occurs' x (Node l y r)
  | x == y = True
  | x < y = occurs' x l
  | otherwise = occurs' x r
```

<br>

# Class and Instance Declarations

- type `a` is an instance of the class `Eq`
- types of instance must support functions; `(==)`, `(/=)`
- `(/=)` is defined as *default definition*, so declaring an instance only requires a definition of `(==)`

```hs
class Eq a where
  (==), (/=) :: a -> a -> Bool
  x /= y = not (x == y)

instance Eq Bool where
  False == False = True
  True == True = True
  _ == _ = False
```

- type `a` to be instance of class `Ord` must be an instance of class `Eq`

```hs
class Eq a => Ord a where
  (<), (<=), (>), (>=) :: a -> a -> Bool
  min, max :: a -> a -> a
  min x y
    | x <= y = x
    | otherwise = y
  max x y
    | x <= y = y
    | otherwise = x

instance Ord Bool where
  False < True = True
  _ < _ = False

  b <= c = (b < c) || (b == c)
  b > c = c < b
  b >= c = c <= b
```

<br>

# Derived Instances

```hs
data Bool = False | True  -- this order is reflected on False < True
  deriving (Eq, Ord, Show, Read)
```