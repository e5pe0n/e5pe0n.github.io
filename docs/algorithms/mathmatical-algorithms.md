# Mathmatical Algorithms

## Combination

calculate $_n C _k$.  

1. robust against overflow  

```cpp title="C++"
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

ll com(ll n, ll k) {
  if (n < 0 || k < 0 || k > n) return 0;
  if (k == 0) return 1;
  ll res = 1;
  for (ll i = 1; i <= k; ++i) {
    res = res * (n - i + 1) / i;
  }
  return res;
}

int main() {
  printf("6C2=%lld\n", com(6, 2)); // 15
  printf("6C0=%lld\n", com(6, 0)); // 1
  printf("6C8=%lld\n", com(6, 8)); // 0
}
```

```python title="Python"
def com(n, k):
    if n < 0 or k < 0 or k > n:
        return 0
    if k == 0:
        return 1
    res = 1
    for i in range(1, k + 1):
        res = res * (n - i + 1) // i
    return res


print(f"6C2={com(6, 2)}")   # 15
print(f"6C0={com(6, 0)}")   # 1
print(f"6C8={com(6, 8)}")   # 0
```

2. memoizing with mod

```cpp title="C++"
#include <bits/stdc++.h>
#define MOD 1'000'000'007
#define MAX_N 2000
using namespace std;
typedef long long ll;

ll N;
ll P[MAX_N + 1], Q[MAX_N + 1];

ll mod_pow(ll x, ll n) {
  ll res = 1;
  while (n > 0) {
    if (n & 1) res = res * x % MOD;
    x = x * x % MOD;
    n >>= 1;
  }
  return res;
}

ll inv(ll x) {
  return mod_pow(x, MOD - 2);
}

void init() {
  P[0] = 1;
  for (ll i = 1; i <= N; ++i) {
    P[i] = P[i - 1] * i % MOD;
  }
  Q[N] = inv(P[N]);
  for (ll i = N; i >= 1; --i) {
    Q[i - 1] = Q[i] * i % MOD;
  }
}

ll mod_com(ll n, ll k) {
  if (n < 0 || k < 0 || k > n) return 0;
  if (k == 0) return 1;
  return ((P[n] * Q[n - k]) % MOD * Q[k]) % MOD;
}

void solve() {
  init();
  printf("6C2=%lld\n", mod_com(6, 2)); // 15
  printf("6C0=%lld\n", mod_com(6, 0)); // 1
  printf("6C8=%lld\n", mod_com(6, 8)); // 0
}

int main() {
  cin >> N;
  solve();
}
```

```python title="Python"
MOD = 10**9 + 7
N = int(input())


def mod_pow(x, n):
    res = 1
    while n > 0:
        if n & 1:
            res = res * x % MOD
        x = x * x % MOD
        n >>= 1
    return res


def inv(x):
    return mod_pow(x, MOD - 2)


P = [1] + [0] * N
Q = [1] + [0] * N

for i in range(1, N + 1):
    P[i] = P[i - 1] * i % MOD
Q[N] = inv(P[N])
for i in range(N, 0, -1):
    Q[i - 1] = Q[i] * i % MOD


def mod_com(n, k):
    if n < 0 or k < 0 or k > n:
        return 0
    if k == 0:
        return 1
    return P[n] * Q[n - k] % MOD * Q[k] % MOD


print(f"6C2={mod_com(6, 2)}")   # 15
print(f"6C0={mod_com(6, 0)}")   # 1
print(f"6C8={mod_com(6, 8)}")   # 0
```


## Primality Test

- $O(\sqrt{N})$

```cpp title="C++"
#include <fstream>
#include <stdio.h>

using namespace std;

int N;

bool is_prime(int n) {
  for (int i = 2; i * i <= n; ++i) {
    if (n % i == 0) {
      return false;
    }
  }
  return n != 1;
}

int main() {
  ifstream ifs("../testset/primality_test/test2.txt");
  ifs >> N;
  if (is_prime(N)) {
    printf("Yes\n");
  } else {
    printf("No\n");
  }
}
```

```python title="Python"
def ns(f):
    return next(f).strip()


with open("../testset/primality_test/test1.txt", 'r') as f:
    N = int(ns(f))


def is_prime(n):
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return n != 1


if is_prime(N):
    print("Yes")
else:
    print("No")
```


## Prime Factorization

- $O(\sqrt{N})$

```txt title="test2.txt"
295927
```

```cpp title="C++"
#include <fstream>
#include <map>
#include <stdio.h>

using namespace std;

int N;

map<int, int> prime_factor(int n) {
  map<int, int> res;
  for (int i = 2; i * i <= n; ++i) {
    while (n % i == 0) {
      ++res[i];
      n /= i;
    }
  }
  if (n != 1) {
    res[n] = 1;
  }
  return res;
}

int main() {
  ifstream ifs("../testset/primality_test/test2.txt");
  ifs >> N;
  map<int, int> fs = prime_factor(N);
  for (auto f : fs) {
    printf("%d^%d ", f.first, f.second);
  }
  printf("\n");
}
// 541^1 547^1
```

```python title="Python"
from collections import Counter


def ns(f):
    return next(f).strip()


with open("../testset/primality_test/test2.txt", 'r') as f:
    N = int(ns(f))


def prime_factor(n):
    res = Counter()
    for i in range(2, int(n ** 0.5) + 1):
        while n % i == 0:
            res[i] += 1
            n //= i
    if n != 1:
        res[n] += 1
    return res


fs = prime_factor(N)
print(" ".join([f"{f[0]}^{f[1]}" for f in fs.most_common()]))
# 541^1 547^1
```


## Sieve of Eratosthenes

```cpp title="C++"
#include <fstream>
#include <stdio.h>

#define MAX_N 1'000'000

using namespace std;

int N;
int primes[MAX_N];
bool is_prime[MAX_N + 1];

int sieve(int n) {
  int p = 0;
  fill(is_prime, is_prime + N + 1, true);
  is_prime[0] = is_prime[1] = false;
  for (int i = 2; i <= n; ++i) {
    if (is_prime[i]) {
      primes[p++] = i;
      for (int j = i * 2; j <= n; j += i) {
        is_prime[j] = false;
      }
    }
  }
  return p;
}

int main() {
  ifstream ifs("../testset/eratosthenes_sieve/test2.txt");
  ifs >> N;
  int res = sieve(N);
  printf("%d\n", res);
}
```

```py title="Python"
def ns(f):
    return next(f).strip()


with open("../testset/eratosthenes_sieve/test2.txt", 'r') as f:
    N = int(ns(f))


primes = []
is_prime = [False] * 2 + [True] * (N - 1)


def sieve(n):
    global primes, is_prime
    for i in range(2, n + 1):
        if is_prime[i]:
            primes.append(i)
            for j in range(i * 2, n + 1, i):
                is_prime[j] = False
    return len(primes)


res = sieve(N)
print(res)
```


## osa_k method (faster prime factorization)

- $O(N log log N + log N)$
  - preprocess: $O(N log log N)$
  - factorization: $O(log N)$

```cpp title="C++"
// O (A log log A + N log A)
#include <bits/stdc++.h>
#define MOD 1'000'000'007
#define MAX_N 10000
#define MAX_A 1'000'000
using namespace std;
typedef long long ll;

ll N;
ll A[MAX_N];

vector<bool> is_prime;
vector<ll> min_factor;

// A log log A
void sieve() {
  is_prime = vector<bool>(MAX_A + 1, true);
  is_prime[0] = is_prime[1] = false;
  min_factor = vector<ll>(MAX_A + 1, -1);
  for (ll i = 2; i <= MAX_A; ++i) {
    if (is_prime[i]) {
      min_factor[i] = i;
      for (ll j = i + i; j <= MAX_A; j += i) {
        is_prime[j] = false;
        if (min_factor[j] == -1) min_factor[j] = i;
      }
    }
  }
}

// log A
map<ll, ll> factorize(ll n) {
  map<ll, ll> res;
  while (n != 1) {
    ll p = min_factor[n];
    ll cnt = 0;
    while (min_factor[n] == p) {
      ++cnt;
      n /= p;
    }
    res[p] = cnt;
  }
  return res;
}
```

```py title="Python"
# O (A log log A + N log A)
from collections import Counter
MOD = 10**9 + 7
MAX_A = 10**6
N = int(input())
A = list(map(int, input().split()))

is_prime = [True] * (MAX_A + 1)
min_factor = [-1] * (MAX_A + 1)


# A loglog A
def sieve():
    for i in range(2, MAX_A + 1):
        if is_prime[i]:
            min_factor[i] = i
            for j in range(i + i, MAX_A + 1, i):
                is_prime[j] = False
                if min_factor[j] == -1:
                    min_factor[j] = i


# log A
def factorize(n):
    res = Counter()
    while n != 1:
        p = min_factor[n]
        cnt = 0
        while min_factor[n] == p:
            cnt += 1
            n //= p
        res[p] = cnt
    return res
```


## Enumerating Divisors

```cpp title="C++"
#include <algorithm>
#include <stdio.h>
#include <vector>
using namespace std;
typedef long long ll;

vector<ll> divisors(ll n) {
  vector<ll> res;
  for (ll i = 1; i * i <= n; ++i) {
    if (n % i == 0) {
      res.push_back(i);
      if (n / i != i) {
        res.push_back(n / i);
      }
    }
  }
  sort(res.begin(), res.end()); // optional
  return res;
}

int main() {
  ll N = 12;
  vector<ll> res = divisors(N);
  for (int i = 0; i < res.size(); ++i) {
    printf("%lld%c", res[i], i == res.size() - 1 ? '\n' : ' '); // 1 2 3 4 6 12
  }
}
```

```python title="Python"
def divisors(n):
    res = []
    for i in range(1, int(n**0.5) + 1):
        if n % i == 0:
            res.append(i)
            if n // i != i:
                res.append(n // i)
    res.sort()  # optional
    return res


N = 12
res = divisors(N)
print(res)
```


## Extended GCD

Determine x and y to satisfy $ax + by = 1$ (a, b are primetive. i.e. `gcd(a, b) == 1`).  


```cpp title="C++"
ll extgcd(ll a, ll b, ll &x, ll &y) {
  ll d = a;
  if (b != 0) {
    d = extgcd(b, a % b, y, x);
    y -= (a / b) * x;
  } else {
    x = 1, y = 0;
  }
  return d;
}
```

```python title="Python"
def extgcd(a, b, x, y):
    d = a
    if b != 0:
        d = extgcd(b, a % b, y, x)
        y[0] = y[0] - (a // b) * x[0]
    else:
        x[0] = 1
        y[0] = 0
    return d
```

## Inverse of $x$ modulo $m$

Compute $x^{-1}$ where $x \cdot x^{-1} \equiv 1 \pmod m$.  
$\gcd(x, m) = 1$ is required.  


```cpp title="C++"
ll extgcd(ll a, ll b, ll &u, ll &v) {
  ll d = a;
  if (b != 0) {
    d = extgcd(b, a % b, v, u);
    v -= (a / b) * u;
  } else
    u = 1, v = 0;
  return d;
}

ll pos(ll x, ll m) {
  x %= m;
  return (x + m) % m;
}

ll mod_inv(ll x, ll m) {
  // returns the inverse of x molulo m
  ll u, v;
  extgcd(x, m, u, v);
  return pos(u, m);
}
```

e.g.  

Determine $x$ to satisfy $A x \equiv B \mod M$ by determining $A^{-1}$ (inverse of $A$ modulo $M$).  

$$
A x \equiv B \mod M \\
A^{-1}A x \equiv B \mod M \\
x \equiv A^{-1}B \mod M
$$

We can obtain $A^{-1}$ by extra gcd.  

$$
ax + by = 1 \\
AA^{-1} + My = 1
$$

In example below, we obtain $x = 4$  

$$
Ax \equiv B \mod M \\
3x \equiv 2 \mod 10
$$

$$
AA^{-1} + My = 1 \\
3 A^{-1} + 10 y = 1
$$

```cpp title="C++"
int extgcd(int a, int b, int &x, int &y) {
  int d = a;
  if (b != 0) {
    d = extgcd(b, a % b, y, x);
    y -= (a / b) * x;
  } else {
    x = 1, y = 0;
  }
  return d;
}

int main() {
  int B = 2;
  int A = 3, M = 10;
  int _A = 0, y = 0;
  extgcd(A, M, _A, y);
  x = _A * B;
  x %= M;
  x = (x + M) % M;
  printf("%d\n", x);  // 4
}
```

```python title="Python"
def extgcd(a, b, x, y):
    d = a
    if b != 0:
        d = extgcd(b, a % b, y, x)
        y[0] = y[0] - (a // b) * x[0]
    else:
        x[0] = 1
        y[0] = 0
    return d

B = 2
A, M = 3, 10
_A, y = [0],[ 0]
extgcd(A, M, _A, y)
x = _A * B
x %= M
x = (x + M) % M
print(x)  # 4
```


## $ax \equiv c \pmod m$ Solver

```cpp title="C++"
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

ll extgcd(ll a, ll b, ll &u, ll &v) {
  // solve a * u + b * v = gcd(a, b)
  ll d = a;
  if (b != 0) {
    d = extgcd(b, a % b, v, u);
    v -= (a / b) * u;
  } else {
    u = 1, v = 0;
  }
  return d;
}

ll pos(ll x, ll m) {
  x %= m;
  return (x + m) % m;
}

ll mod_inv(ll x, ll m) {
  // returns the inverse of x modulo m
  // by solving x * mod_inv(x) + m * v = gcd(x, m)
  ll u, v;
  extgcd(x, m, u, v);
  return pos(u, m);
}

ll solve(ll a, ll c, ll m) {
  // returns x satisfying a * x equiv c (mod m).
  return c * mod_inv(a, m) % m;
}

int main() {
  printf("%lld\n", solve(14, 33, 337)); // 14x equiv 33 (mod 337) -> x = 219
  printf("%lld\n",
         solve(64, 941, 3011)); // 64x equiv 941 (mod 3011) -> x = 2320
}
```

```py title="Python"
def extgcd(a, b, u, v):
    # solves a * u + b * v = gcd(a, b)
    d = a
    if b != 0:
        d = extgcd(b, a % b, v, u)
        v[0] -= (a // b) * u[0]
    else:
        u[0] = 1
        v[0] = 0
    return d


def pos(x, m):
    x %= m
    return (x + m) % m


def mod_inv(x, m):
    # returns the inverse of x modulo m
    # by solving x * mod_inv(x) + m * v = gcd(x, m)
    u, v = [0], [0]
    extgcd(x, m, u, v)
    u = u[0]
    return pos(u, m)


def solve(a, c, m):
    # return x satisfying a * x equiv c (mod m)
    return c * mod_inv(a, m) % m


print(solve(14, 33, 337))   # 14x equiv 33 (mod 337) -> x = 219
print(solve(64, 941, 3011))  # 64x equiv 941 (mod 3011) -> x = 2320
```




## Eular's phi

```cpp title="C++"
map<ll, ll> prime_factorize(ll n) {
  map<ll, ll> res;
  for (ll i = 2; i * i <= n; ++i) {
    while (n % i == 0) {
      ++res[i];
      n /= i;
    }
  }
  if (n > 1) res[n] = 1;
  return res;
}

ll phi(ll n) {
  map<ll, ll> ps = prime_factorize(n);
  ll res = n;
  for (auto p : ps) {
    res = res / p.first * (p.first - 1);
  }
  return res;
}
```


## Sigma (sum of divisors)

```cpp title="C++"
map<ll, ll> prime_factorize(ll n) {
  map<ll, ll> res;
  for (ll i = 2; i * i <= n; ++i) {
    while (n % i == 0) {
      ++res[i];
      n /= i;
    }
  }
  if (n > 1) res[n] = 1;
  return res;
}

ll _pow(ll x, ll n) {
  ll res = 1;
  while (n > 0) {
    if (n & 1) res *= x;
    x *= x;
    n >>= 1;
  }
  return res;
}

ll sigma_p(ll p, ll k) {
  return ((ll)_pow(p, k + 1) - 1) / (p - 1);
}

ll sigma(ll n) {
  map<ll, ll> ps = prime_factorize(n);
  ll res = 1;
  for (auto p : ps) {
    res *= sigma_p(p.first, p.second);
  }
  return res;
}
```



## $x^k \equiv b \pmod m$ Solver

```cpp title="C++"
map<ll, ll> prime_factorize(ll n) {
  map<ll, ll> res;
  for (ll i = 2; i * i <= n; ++i) {
    while (n % i == 0) {
      ++res[i];
      n /= i;
    }
  }
  if (n > 1) res[n] = 1;
  return res;
}

ll _pow(ll x, ll n) {
  ll res = 1;
  while (n > 0) {
    if (n & 1) res *= x;
    x *= x;
    n >>= 1;
  }
  return res;
}

ll mod_pow(ll x, ll n, ll m) {
  ll res = 1;
  while (n > 0) {
    if (n & 1) res = res * x % m;
    x = x * x % m;
    n >>= 1;
  }
  return res;
}

ll extgcd(ll a, ll b, ll &u, ll &v) {
  ll d = a;
  if (b != 0) {
    d = extgcd(b, a % b, v, u);
    v -= (a / b) * u;
  } else {
    u = 1, v = 0;
  }
  return d;
}

ll pos(ll x, ll m) {
  x %= m;
  return (x + m) % m;
}

ll mod_inv(ll x, ll m) {
  ll u, v;
  extgcd(x, m, u, v);
  return pos(u, m);
}

ll phi(ll n) {
  map<ll, ll> ps = prime_factorize(n);
  ll res = n;
  for (auto p : ps) {
    res = res / p.first * (p.first - 1);
  }
  return res;
}

ll solve(ll k, ll b, ll m) {
  // solve x^k = b (mod m) and return x
  ll ms = phi(m);
  ll u = mod_inv(k, ms);
  return mod_pow(b, u, m);
}
```


## Ternary Search

to find the **minimum** value in `[left, right]`.  
( https://atcoder.jp/contests/arc054/tasks/arc054_b )


```cpp title="C++"
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef long double ld;

ld P;
const ld MIN_X = 0;
const ld MAX_X = 1e9;

ld ternary_search(const function<ld(ld)> &f, ld left, ld right, ll iter) {
  // find the minimum value in [left, right]
  while (iter--) {
    ld left_third = left + (right - left) / 3;
    ld right_third = right - (right - left) / 3;

    if (f(left_third) > f(right_third))
      left = left_third;
    else
      right = right_third;
  }
  return (right + left) / 2;
}

int main() {
  cin >> P;
  auto f = [](ld x) { return x + P / pow(2, x / 1.5); };
  ld x = ternary_search(f, MIN_X, MAX_X, 500);
  printf("%.9Lf\n", f(x));
}
```

```python title="Python"
MIN_X = 0.0
MAX_X = 1e9
P = float(input())


def ternary_search(f, left, right, itr=500):
  for _ in range(itr):
      left_third = left + (right - left) / 3
      right_third = right - (right - left) / 3

      if f(left_third) > f(right_third):
          left = left_third
      else:
          right = right_third
  return (left + right) / 2


def f(x):
    return x + P * (2**(-x/1.5))


x = ternary_search(f, MIN_X, MAX_X)
print(f"{f(x):.9f}")
```

to find the **maximum** value in `[left, right]`.  

```cpp title="C++"
ld ternary_search(const function<ld(ld)> &f, ld left, ld right, ll iter) {
  // find the maximum value in [left, right]
  while (iter--) {
    ld left_third = left + (right - left) / 3;
    ld right_third = right - (right - left) / 3;

    if (f(left_third) < f(right_third))
      left = left_third;
    else
      right = right_third;
  }
  return (right + left) / 2;
}
```

```python title="Python"
def ternary_search(f, left, right, itr=500):
  # find the maximum value in [left, right]
  for _ in range(itr):
      left_third = left + (right - left) / 3
      right_third = right - (right - left) / 3

      if f(left_third) < f(right_third):
          left = left_third
      else:
          right = right_third
  return (left + right) / 2
```



## Enumerating

### Enumerating Set


- the same as *Bit-full search*

```cpp title="C++"
#include <stdio.h>
#include <string>

using namespace std;

int main() {
  int n = 4;
  for (int i = 0; i < 1 << n; ++i) {
    string b;
    for (int j = n - 1; j >= 0; --j) {
      b += to_string(i >> j & 1);
    }
    printf("%s\n", b.c_str());
  }
}

// 0000
// 0001
// 0010
// 0011
// 0100
// 0101
// 0110
// 0111
// 1000
// 1001
// 1010
// 1011
// 1100
// 1101
// 1110
// 1111
```

```python title="Python"
n = 4
for i in range(1 << n):
    b = ""
    for j in range(n - 1, -1, -1):
        b += str(i >> j & 1)
    print(b)
```

### Enumerating Subset

```cpp title="C++"
#include <stdio.h>
#include <string>

using namespace std;

string d2b(int n, int len) {
  string res;
  while (n > 0) {
    if (n % 2 == 0) {
      res = "0" + res;
    } else {
      res = "1" + res;
    }
    n >>= 1;
  }
  int _len = res.size();
  for (int i = 0; _len + i < len; ++i) {
    res = "0" + res;
  }
  return res;
}

int main() {
  int sup = stoi("01101101", 0, 2);
  int sub = sup;
  do {
    // do something for sub
    printf("%s\n", d2b(sub, 8).c_str());
    sub = (sub - 1) & sup;
  } while (sub != sup);
}

// 01101101
// 01101100
// 01101001
// 01101000
// 01100101
// 01100100
// 01100001
// 01100000
// 01001101
// 01001100
// 01001001
// 01001000
// 01000101
// 01000100
// 01000001
// 01000000
// 00101101
// 00101100
// 00101001
// 00101000
// 00100101
// 00100100
// 00100001
// 00100000
// 00001101
// 00001100
// 00001001
// 00001000
// 00000101
// 00000100
// 00000001
// 00000000
```

```python title="Python"
sup = int("01101101", 2)
sub = sup
# do something for sub
sub = (sub - 1) & sup
while sub != sup:
    # do something for sub
    print(f"{sub:08b}")
    sub = (sub - 1) & sup
```


### Enumerating Combination

```cpp title="C++"
#include <stdio.h>
#include <string>

using namespace std;

string d2b(int n, int len) {
  string res;
  while (n > 0) {
    if (n % 2 == 0) {
      res = "0" + res;
    } else {
      res = "1" + res;
    }
    n >>= 1;
  }
  int _len = res.size();
  for (int i = 0; i + _len < len; ++i) {
    res = "0" + res;
  }
  return res;
}

int main() {
  int k = 4;
  int n = 7;
  int comb = (1 << k) - 1;
  while (comb < 1 << n) {
    // do something for comb
    printf("%s\n", d2b(comb, n).c_str());
    int x = comb & -comb;
    int y = comb + x;
    comb = ((comb & ~y) / x >> 1) | y;
  }
}

// 0001111
// 0010111
// 0011011
// 0011101
// 0011110
// 0100111
// 0101011
// 0101101
// 0101110
// 0110011
// 0110101
// 0110110
// 0111001
// 0111010
// 0111100
// 1000111
// 1001011
// 1001101
// 1001110
// 1010011
// 1010101
// 1010110
// 1011001
// 1011010
// 1011100
// 1100011
// 1100101
// 1100110
// 1101001
// 1101010
// 1101100
// 1110001
// 1110010
// 1110100
// 1111000
```

```python title="Python"
k = 4
n = 7
comb = (1 << k) - 1
while comb < 1 << n:
    # do something for comb
    print(f"{comb:07b}")
    x = comb & -comb
    y = comb + x
    comb = ((comb & ~y) // x >> 1) | y
```

