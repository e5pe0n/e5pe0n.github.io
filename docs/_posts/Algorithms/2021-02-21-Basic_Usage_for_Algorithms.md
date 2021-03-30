---
title: Basic Usage for Algorithms
categories:
  - Note
tags:
  - Competitive Programming
  - Algorithm
last_modified_at: 2021-02-21
---

# Sort

## Comparison Function

```c++
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
  ll A[] = {0, 1, 2, 3, 4};
  auto cmp_dsc = [](ll &x, ll &y) { return x > y; };
  auto cmp_asc = [](ll &x, ll &y) { return x < y; };
  sort(A, A + 5, cmp_dsc);
  for (ll i = 0; i < 5; ++i) {
    printf("%lld%c", A[i], i == 4 ? '\n' : ' ');  // 4 3 2 1 0
  }
  sort(A, A + 5, cmp_asc);
  for (ll i = 0; i < 5; ++i) {
    printf("%lld%c", A[i], i == 4 ? '\n' : ' ');  // 0 1 2 3 4
  }
}
```

```python
from functools import cmp_to_key


def cmp_asc(x, y):
    if x < y:
        return -1
    elif x > y:
        return 1  # the case to exchange x for y
    return 0


def cmp_dsc(x, y):
    if x < y:
        return 1  # the case to exchange x for y
    elif x > y:
        return -1
    return 0

A = [0, 1, 2, 3, 4]
A.sort(key=cmp_to_Key(cmp_dsc))
print(A)  # [4, 3, 2, 1, 0]

A.sort(key=cmp_to_key(cmp_asc))
print(A)  # [0, 1, 2, 3, 4]
```


# Random

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef chrono::high_resolution_clock hrc;

auto seed = hrc::now().time_since_epoch().count();
default_random_engine generator(seed);
uniform_int_distribution<ll> distribution(1, 6);  // 1, 2, 3, 4, 5, 6
ll x = distribution(generator);
```

```python
import random
x = int(random.uniform(1, 6)) # 1, 2, 3, 4, 5, 6
```
