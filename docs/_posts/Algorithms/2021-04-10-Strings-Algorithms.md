---
title: "Note: Strings Algorithms"
categories:
  - Note
tags:
  - Algorithm
  - Competitive Programming
  - C++
  - Python
last-modified-at: 2021-04-10
---

# Rabin-Karp

```cpp
const ll D = 256; // the number of distinct characters
const ll Q = 1'000'000'007; // a prime number being larger than D

ll mod_pow(ll x, ll n, ll m) {
  ll res = 1;
  while (n > 0) {
    if (n & 1) res = res * x % m;
    x = x * x % m;
    n >>= 1;
  }
  return res;
}

bool rabin_karp(const string &pat,
                const string &txt,
                const ll &d,
                const ll &q) {
  ll m = pat.size();
  ll n = txt.size();
  ll h = mod_pow(d, m - 1, q);  // the value of the highest digit
  ll p = 0, t = 0;
  for (ll i = 0; i < m; ++i) {
    p = (d * p + pat[i]) % q;
    t = (d * t + txt[i]) % q;
  }
  printf("%lld, %lld\n", p, t);
  for (ll i = 0; i <= n - m; ++i) {
    if (p == t && txt.substr(i, m) == pat) return true;
    if (i < n - m) {
      t = (d * (t - txt[i] * h) + txt[i + m]) % q;
      t = (t + q) % q;
    }
  }
  return false;
}

bool is_substr(const string &pat, const string &str) {
  return rabin_karp(pat, str, D, Q);
}

int main() {
  printf("%s\n", is_substr("cde", "abcdefg") ? "true" : "false"); // true
  printf("%s\n", is_substr("adg", "abcdefg") ? "true" : "false"); // false
}
```

```py
D = 256
Q = 10**9 + 7


def mod_pow(x, n, m):
    res = 1
    while n > 0:
        if n & 1:
            res = res * x % m
        x = x * x % m
        n >>= 1
    return res


def rabin_karp(pat, txt, d, q):
    _pat = list(map(ord, pat))
    _txt = list(map(ord, txt))
    m = len(pat)
    n = len(txt)
    h = mod_pow(d, m - 1, q)
    p, t = 0, 0
    for i in range(m):
        p = (d * p + _pat[i]) % q
        t = (d * t + _txt[i]) % q
    for i in range(n - m + 1):
        if p == t and txt[i:i + m] == pat:
            return True
        if i < n - m:
            t = (d * (t - _txt[i] * h) + _txt[i + m]) % q
            t = (t + q) % q
    return False


def is_substr(pat, string):
    return rabin_karp(pat, string, D, Q)


print(is_substr("cde", "abcdefg"))  # True
print(is_substr("adg", "abcdefg"))  # False
```