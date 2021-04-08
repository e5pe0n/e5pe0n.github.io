---
title: Basic Usage
categories:
  - Note
tags:
  - Competitive Programming
  - Algorithm
last_modified_at: 2021-02-21
---

# Sort

## Comparison Function

### C++  

Asc

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
  vector<ll> V{1, 5, 3};
  auto cmp_asc = [](const ll &left, const ll &right) { return left < right; };
  sort(V.begin(), V.end(), cmp_asc);
  for (auto v : V)
    printf("%lld\n", v); // 1 3 5
}
```

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
  vector<ll> V{1, 5, 3};
  sort(V.begin(), V.end(), less<ll>());
  for (auto v : V)
    printf("%lld\n", v); // 1 3 5
}
```

Dsc

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
  vector<ll> V{1, 5, 3};
  auto cmp_dsc = [](const ll &left, const ll &right) { return left > right; };
  sort(V.begin(), V.end(), cmp_dsc);
  for (auto v : V)
    printf("%lld\n", v); // 5 3 1
}
```

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
  vector<ll> V{1, 5, 3};
  sort(V.begin(), V.end(), greater<ll>());
  for (auto v : V)
    printf("%lld\n", v); // 5 3 1
}
```

### Python

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


<br>

# Priority Queue

## C++

**the order of priority_queue is reverse to one of sort!**

| functions |  priority_queue   | sort  |
| :-------: | :---------------: | :---: |
|  greater  | min heap i.e. asc |  dsc  |
|   less    | max heap i.e. dsc |  asc  |


Max Heap

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
  priority_queue<ll> q; // default is MAX heap
  q.push(1);
  q.push(5);
  q.push(3);
  while (q.size()) {
    ll p = q.top();
    q.pop();
    printf("%lld\n", p); // 5 3 1
  }
}
```

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

struct Edge {
  ll u, v, w;
};

int main() {
  auto cmp = [](const Edge &e1, const Edge &e2) { return e1.w < e2.w; };
  priority_queue<Edge, vector<Edge>, decltype(cmp)> q(cmp);
  q.push(Edge{0, 1, 1});
  q.push(Edge{0, 2, 5});
  q.push(Edge{1, 2, 3});
  while (q.size()) {
    Edge e = q.top();
    q.pop();
    printf("%lld\n", e.w); // 5 3 1
  }
}
```

Min Heap

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
  priority_queue<ll, vector<ll>, greater<vector<ll>::value_type>> q;
  q.push(1);
  q.push(5);
  q.push(3);
  while (q.size()) {
    ll p = q.top();
    q.pop();
    printf("%lld\n", p); // 1 3 5
  }
}
```

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

struct Edge {
  ll u, v, w;
};

int main() {
  auto cmp = [](const Edge &e1, const Edge &e2) { return e1.w > e2.w; };
  priority_queue<Edge, vector<Edge>, decltype(cmp)> q(cmp);
  q.push(Edge{0, 1, 1});
  q.push(Edge{0, 2, 5});
  q.push(Edge{1, 2, 3});
  while (q.size()) {
    Edge e = q.top();
    q.pop();
    printf("%lld\n", e.w); // 1 3 5
  }
}
```

## Python

### Min Heap

Python has only min heap.  

```py
from heapq import heapify, heappop, heappush

q = []
heapify(q)
heappush(q, 1)
heappush(q, 5)
heappush(q, 3)
while len(q):
    p = heappop(q)
    print(p)    # 1 3 5
```

```py
from heapq import heapify, heappop, heappush


class Edge:
    def __init__(self, u, v, w):
        self.u = u
        self.v = v
        self.w = w

    def __lt__(self, other):
        return self.w < other.w

    def __gt__(self, other):
        return self.w > other.w


q = []
heapify(q)
heappush(q, Edge(1, 2, 1))
heappush(q, Edge(0, 1, 5))
heappush(q, Edge(0, 2, 3))
while len(q):
    e = heappop(q)
    print(e.w)    # 1 3 5
```

### Max Heap

Python does not have max heap.  
We can get the same effect by negating values both when pushing and popping them.   

```py
from heapq import heapify, heappop, heappush

q = []
heapify(q)
heappush(q, -1)
heappush(q, -5)
heappush(q, -3)
while len(q):
    p = -heappop(q)
    print(p)    # 5 3 1
```

```py
from heapq import heapify, heappop, heappush


class Edge:
    def __init__(self, u, v, w):
        self.u = u
        self.v = v
        self.w = w

    def __lt__(self, other):
        return self.w > other.w

    def __gt__(self, other):
        return self.w < other.w


q = []
heapify(q)
heappush(q, Edge(1, 2, 1))
heappush(q, Edge(0, 1, 5))
heappush(q, Edge(0, 2, 3))
while len(q):
    e = heappop(q)
    print(e.w)    # 5 3 1
```

<br>

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
