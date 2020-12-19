---
title: "Note: Algorithms"
categories:
  - Note
tags:
  - Algorithm
  - Competitive Programming
  - C++
  - Python
---

# Single Source Shortest Paths (単一始点最短路問題)

## Bellman-Ford Algorithm

- $O(\lvert V \rvert)$
- **detect negative loop**
- relax edges for $\lvert V \rvert - 1$
  - see all vertexes in each loop
- based on *triangle inequality*

![bellman_ford_graph1]({{ site.url }}{{site.baseurl}}/assets/Algorithms_images/bellman_ford_graph1.png)

```
// test1.txt
7 10 1 7
1 2 2
1 3 5
2 3 4
2 4 6
2 5 10
3 4 2
4 6 1
5 6 3
5 7 5
6 7 9
16
```

```c++
#include <fstream>
#include <stdio.h>
#include <vector>

#define MAX_N 10'000
#define MAX_K 10'000
#define INF 1'000'000'000

using namespace std;

struct Edge {
  int u, v, weight;
};

int N, K, S, G;
int dist[MAX_N], path[MAX_N];
Edge E[MAX_K];

void init(int s) {
  for (int i = 0; i < N; ++i) {
    dist[i] = INF;
    path[i] = -1;
  }
  dist[s] = 0;
}

void relax(int u, int v, int weight) {
  if (dist[v] > dist[u] + weight) {
    dist[v] = dist[u] + weight;
    path[v] = u;
  }
}

bool bellman_ford() {
  for (int i = 0; i < N - 1; ++i) {
    for (auto e : E) {
      relax(e.u, e.v, e.weight);
    }
  }
  for (auto e : E) {
    if (dist[e.v] > dist[e.u] + e.weight) {
      return false;
    }
  }
  return true;
}

void print_path(int s, int v) {
  if (s == v) {
    printf("%d", s + 1);
  } else if (v < 0) {
    printf("\n No path");
  } else {
    print_path(s, path[v]);
    printf("->%d", v + 1);
  }
}

int main() {
  ifstream ifs("../testset/single_source_shortest_path/test1.txt");
  ifs >> N >> K >> S >> G;
  --S;
  --G;
  for (int i = 0; i < K * 2; i += 2) {
    int u, v, weight;
    ifs >> u >> v >> weight;
    --u;
    --v;
    E[i] = Edge{u, v, weight};
    E[i + 1] = Edge{v, u, weight};
  }
  init(S);
  if (bellman_ford()) {
    printf("dist=%d\n", dist[G]);
    printf("path=");
    print_path(S, G);
    printf("\n");
  } else {
    printf("detect negative loop\n");
  }
}

// dist=16
// path=1->3->4->6->5->7
```

```python
INF = float('inf')


def ns(f):
    return next(f).strip()


class Edge:
    def __init__(self, u, v, weight):
        self.u = u
        self.v = v
        self.weight = weight


with open("../testset/single_source_shortest_path/test1.txt", 'r') as f:
    N, K, S, T = map(int, ns(f).split())
    S -= 1
    T -= 1
    E = []
    for _ in range(K):
        u, v, weight = map(int, ns(f).split())
        u -= 1
        v -= 1
        E.append(Edge(u, v, weight))
        E.append(Edge(v, u, weight))
dist = [INF] * N
dist[S] = 0
path = [-1] * N


def relax(u, v, weight):
    global dist, path
    if dist[v] > dist[u] + weight:
        dist[v] = dist[u] + weight
        path[v] = u


def bellman_ford():
    # return True if the graph has negative loops.
    for _ in range(N - 1):
        for e in E:
            relax(e.u, e.v, e.weight)

    for e in E:
        if dist[e.v] < dist[e.u] + e.weight:
            return False
    return True


def _print_path(s, v):
    if s == v:
        print(s + 1, end='')
    elif v < 0:
        print('\nNo path', end='')
    else:
        _print_path(s, path[v])
        print(f"->{v + 1}", end='')


def print_path(s, v):
    _print_path(s, v)
    print()


bellman_ford()
print(f"shortest distance={dist[T]}")
print("shortest path=", end='')
print_path(S, T)

# shortest distance=16
# shortest path=1->3->4->6->5->7
```

## Dijkstra's Algorithm

- $O(V^2)$ -> $O(\lvert E \rvert log \lvert V \rvert)$ (used heap queue)
- use priority queue
  - see only the most nearest vertex

```c++
#include <fstream>
#include <queue>
#include <stdio.h>
#include <vector>

#define MAX_N 10'000
#define MAX_K 10'000
#define INF 1'000'000'000

using namespace std;

typedef pair<int, int> P;

struct Edge {
  int u, v, weight;
  Edge(int u, int v, int weight) : u(u), v(v), weight(weight) {}
};

int N, K, S, T;
vector<Edge> G[MAX_N];
int dist[MAX_N], path[MAX_N];

void init(int s) {
  fill(dist, dist + N, INF);
  fill(path, path + N, -1);
  dist[s] = 0;
}

void dijkstra(int s) {
  init(s);
  priority_queue<P, vector<P>, greater<P>> q;
  q.push(P(0, s));
  while (!q.empty()) {
    P p = q.top();
    q.pop();
    int u = p.second;
    if (dist[u] < p.first) {
      continue;
    }
    for (auto e : G[u]) {
      if (dist[e.v] > dist[u] + e.weight) {
        // relax
        dist[e.v] = dist[u] + e.weight;
        path[e.v] = u;
        q.push(P(dist[e.v], e.v));
      }
    }
  }
}

void _print_path(int s, int v) {
  if (s == v) {
    printf("%d", s + 1);
  } else if (v < 0) {
    printf("No path\n");
  } else {
    _print_path(s, path[v]);
    printf("->%d", v + 1);
  }
}

void print_path(int s, int v) {
  _print_path(s, v);
  printf("\n");
}

int main() {
  ifstream ifs("../testset/single_source_shortest_path/test1.txt");
  ifs >> N >> K >> S >> T;
  --S;
  --T;
  for (int i = 0; i < K; ++i) {
    int u, v, weight;
    ifs >> u >> v >> weight;
    --u;
    --v;
    G[u].emplace_back(u, v, weight);
    G[v].emplace_back(v, u, weight);
  }
  dijkstra(S);
  printf("shortest distance=%d\n", dist[T]);
  printf("shortest path=");
  print_path(S, T);
}

// shortest distance=16
// shortest path=1->3->4->6->5->7
```

```python
from heapq import heapify, heappop, heappush


INF = float('inf')


def ns(f):
    return next(f).strip()


class Edge:
    def __init__(self, u, v, weight):
        self.u = u
        self.v = v
        self.weight = weight


with open("../testset/single_source_shortest_path/test1.txt", 'r') as f:
    N, K, S, T = map(int, ns(f).split())
    S -= 1
    T -= 1
    G = [[] for _ in range(N)]
    for _ in range(K):
        u, v, weight = map(int, ns(f).split())
        u -= 1
        v -= 1
        G[u].append(Edge(u, v, weight))
        G[v].append(Edge(v, u, weight))

dist = [INF] * N
dist[S] = 0
path = [-1] * N


def dijkstra():
    global dist, path
    q = [[0, S]]
    heapify(q)
    while len(q) > 0:
        p = heappop(q)
        u = p[1]
        if dist[u] < p[0]:
            continue
        for e in G[u]:
            if dist[e.v] > dist[u] + e.weight:
                dist[e.v] = dist[u] + e.weight
                path[e.v] = u
                heappush(q, [dist[e.v], e.v])


def _print_path(s, v):
    if s == v:
        print(s + 1, end='')
    elif v < 0:
        print('\nNo path', end='')
    else:
        _print_path(s, path[v])
        print(f"->{v + 1}", end='')


def print_path(s, v):
    _print_path(s, v)
    print()


dijkstra()
print(f"shortest distance={dist[T]}")
print("shortest path=", end='')
print_path(S, T)

# shortest distance=16
# shortest path=1->3->4->6->5->7
```


<br>

# All Pairs Shortest Paths (全点対最短路問題)

## Warshall-Floyd Algorithm

- use DP to consider a path from $i$ to $j$ is through $k$ or not
  - which more shorter is path through $k$ or not

![all_pairs_shortest_paths]({{site.url}}{{site.baseurl}}/assets/Algorithms_images/all_pairs_shortest_paths.png)

```
// test1.txt
5 9
1 2 3
1 3 8
1 5 -4
2 4 1
2 5 7
3 2 4
4 1 2
4 3 -5
5 4 6
0 1 -3 2 -4
3 0 -4 1 -1
7 4 0 5 3
2 -1 -5 0 -2
8 5 1 6 0
```

```c++
#include <algorithm>
#include <fstream>
#include <iostream>
#include <stdio.h>

#define MAX_N 1'000
#define INF 1'000'000'000

using namespace std;

int N, K;
int d[MAX_N][MAX_N];

void warshall_floyd() {
  for (int k = 0; k < N; ++k) {
    for (int i = 0; i < N; ++i) {
      for (int j = 0; j < N; ++j) {
        d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
      }
    }
  }
}

int main() {
  ifstream ifs("../testset/all_pairs_shortest_path/test1.txt");
  ifs >> N >> K;
  for (int i = 0; i < N; ++i) {
    for (int j = 0; j < N; ++j) {
      if (i == j) {
        d[i][j] = 0;
      } else {
        d[i][j] = INF;
      }
    }
  }
  for (int i = 0; i < K; ++i) {
    int u, v, weight;
    ifs >> u >> v >> weight;
    --u;
    --v;
    d[u][v] = weight;
    // if non-direction graph add d[v][u]
    // d[v][u] = weight;
  }
  warshall_floyd();
  for (int i = 0; i < N; ++i) {
    for (int j = 0; j < N; ++j) {
      printf("%d ", d[i][j]);
    }
    printf("\n");
  }
}
```

```python
INF = float('inf')


def ns(f):
    return next(f).strip()


with open("../testset/all_pairs_shortest_path/test1.txt", 'r') as f:
    N, K = map(int, ns(f).split())
    d = [[0 if i == j else INF for j in range(N)] for i in range(N)]
    for _ in range(K):
        u, v, weight = map(int, ns(f).split())
        u -= 1
        v -= 1
        d[u][v] = weight
        # if non-direction graph add d[v][u]
        # d[v][u] = weight


def warshall_floyd():
    global d
    for k in range(N):
        for i in range(N):
            for j in range(N):
                d[i][j] = min(d[i][j], d[i][k] + d[k][j])


warshall_floyd()
for _d in d:
    print(' '.join(map(str, _d)))
```

<br>

# MST: Minimum Spanning Tree (最小全域木)

## Kruscal's Algorithm

- be similar to Bellman-Ford Algorithm
- $O(\lvert E \rvert log \lvert V \rvert)$
- use *Union-Find Tree*
- add vertexes of the min weight edge into tree repeatedly if the tree doesn't include the vertexes

![mst]({{site.url}}{{site.baseurl}}/assets/Algorithms_images/mst.png)

```
// test1.txt
7 9
1 3 1
2 3 2
2 5 10
3 4 3
3 6 7
4 6 1
4 7 5
5 6 5
6 7 8
17
```

```c++
#include <algorithm>
#include <fstream>
#include <memory.h>
#include <stdio.h>

#define MAX_N 10'000
#define MAX_K 10'000

using namespace std;

struct Edge {
  int u, v, weight;
};

int N, K, ans;
int par[MAX_N], rnk[MAX_N]{};
Edge E[MAX_K];

void init() {
  for (int i = 0; i < N; ++i) {
    par[i] = i;
  }
}

int find(int u) {
  if (par[u] == u) {
    return u;
  }
  return par[u] = find(par[u]);
}

void unite(int u, int v) {
  u = find(u);
  v = find(v);
  if (u == v) {
    return;
  }
  if (rnk[u] < rnk[v]) {
    par[u] = v;
  } else {
    par[v] = u;
    if (rnk[u] == rnk[v]) {
      ++rnk[u];
    }
  }
}

bool same(int u, int v) { return find(u) == find(v); }

int kruscal() {
  int res = 0;
  sort(E, E + K, [](const Edge &e1, const Edge &e2) { return e1.weight < e2.weight; });
  init();
  for (auto e : E) {
    if (!same(e.u, e.v)) {
      res += e.weight;
      unite(e.u, e.v);
    }
  }
  return res;
}

int main() {
  ifstream ifs("../testset/minimum_spanning_tree/test1.txt");
  ifs >> N >> K;
  for (int i = 0; i < K; ++i) {
    int u, v, weight;
    ifs >> u >> v >> weight;
    E[i] = Edge{--u, --v, weight};
  }
  ans = kruscal();
  printf("%d\n", ans);
}
```

```python
def ns(f):
    return next(f).strip()


class Edge:
    def __init__(self, u, v, weight):
        self.u = u
        self.v = v
        self.weight = weight


with open("../testset/minimum_spanning_tree/test1.txt", 'r') as f:
    N, K = map(int, ns(f).split())
    E = []
    for _ in range(K):
        u, v, weight = map(int, ns(f).split())
        E.append(Edge(u - 1, v - 1, weight))

par = [i for i in range(N)]
rnk = [0] * N


def find(u):
    global par
    if par[u] == u:
        return u
    par[u] = find(par[u])
    return par[u]


def unite(u, v):
    global par, rnk
    u = find(u)
    v = find(v)
    if u == v:
        return
    if rnk[u] < rnk[v]:
        par[u] = v
    else:
        par[v] = u
        if rnk[u] == rnk[v]:
            rnk[u] += 1


def same(u, v):
    return find(u) == find(v)


def kruscal():
    res = 0
    E.sort(key=lambda x: x.weight)
    for e in E:
        if not same(e.u, e.v):
            res += e.weight
            unite(e.u, e.v)
    return res


ans = kruscal()
print(ans)
```

## Prim's Algorithm

- be similar to Dijkstra's Algorithm
- use priority queue -> $O(\lvert E \rvert log \lvert V \rvert)$
- add vertex having the shortest distance from added vertexes in the tree into tree repeatedly

```c++
#include <fstream>
#include <queue>
#include <stdio.h>
#include <utility>
#include <vector>

#define MAX_N 10'000
#define MAX_K 10'000

using namespace std;

typedef pair<int, int> P;

struct Edge {
  int u, v, weight;
  Edge(int u, int v, int weight) : u(u), v(v), weight(weight) {}
};

int N, K, ans;
vector<Edge> G[MAX_N];
bool used[MAX_N]{};

int prim() {
  int res = 0;
  used[0] = true;
  priority_queue<P, vector<P>, greater<P>> q;
  for (auto e : G[0]) {
    q.push(P(e.weight, e.v));
  }
  while (!q.empty()) {
    P p = q.top();
    q.pop();
    int u = p.second;
    if (used[u]) {
      continue;
    }
    used[u] = true;
    res += p.first;
    for (auto e : G[u]) {
      if (!used[e.v]) {
        q.push(P(e.weight, e.v));
      }
    }
  }
  return res;
}

int main() {
  ifstream ifs("../testset/minimum_spanning_tree/test1.txt");
  ifs >> N >> K;
  for (int i = 0; i < K; ++i) {
    int u, v, weight;
    ifs >> u >> v >> weight;
    --u;
    --v;
    G[u].emplace_back(u, v, weight);
    G[v].emplace_back(v, u, weight);
  }
  ans = prim();
  printf("%d\n", ans);
}
```

```python
from heapq import heapify, heappop, heappush


def ns(f):
    return next(f).strip()


class Edge:
    def __init__(self, u, v, weight):
        self.u = u
        self.v = v
        self.weight = weight


with open("../testset/minimum_spanning_tree/test1.txt", 'r') as f:
    N, K = map(int, ns(f).split())
    G = [[] for _ in range(N)]
    for _ in range(K):
        u, v, weight = map(int, ns(f).split())
        u -= 1
        v -= 1
        G[u].append(Edge(u, v, weight))
        G[v].append(Edge(v, u, weight))

used = [False] * N


def prim():
    global used
    res = 0
    used[0] = True
    q = [[e.weight, e.v] for e in G[0]]
    heapify(q)
    while len(q) > 0:
        p = heappop(q)
        u = p[1]
        if used[u]:
            continue
        used[u] = True
        res += p[0]
        for e in G[u]:
            if not used[e.v]:
                heappush(q, [e.weight, e.v])
    return res


ans = prim()
print(ans)
```

# Mathmatical

## Primality Test (素数判定)

- $O(\sqrt{N})$

```c++
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

```python
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

## Prime Factorization (素因数分解)

- $O(\sqrt{N})$

```
// test2.txt
295927
```

```c++
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

```python
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

<br>

## Extra GCD

Determine x and y to satisfy $ax + by = 1$ (a, b are primetive. i.e. `gcd(a, b) == 1`).  


```cpp
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

```python
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

e.g.  

Determine $x$ to satisfy $A x \equiv B \mod M$ by determining $A^{-1}$ (inverse of $A$ modulo $M$).  

$$
A x \equiv B \mod M  \\
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

```cpp
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

```python
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
A = 3, M = 10
_A = 0, y = 0
extgcd(A, M, _A, y)
x = _A * B
x %= M
x = (x + M) % M
print(x)  # 4
```


<br>

# Enumerating

## Enumerating Set

- the same as *Bit-full search*

```c++
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

```python
n = 4
for i in range(1 << n):
    b = ""
    for j in range(n - 1, -1, -1):
        b += str(i >> j & 1)
    print(b)
```

## Enumerating Subset

```c++
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

```python
sup = int("01101101", 2)
sub = sup
# do something for sub
sub = (sub - 1) & sup
while sub != sup:
    # do something for sub
    print(f"{sub:08b}")
    sub = (sub - 1) & sup
```


## Enumerating Combination

```c++
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

```python
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


# Segment Trees

## RMQ: Range Minimum Query

- Each node holds min val in the range
- $O(log N)$

```
// test1.txt
8
5 3 7 9 6 4 1 2
       1
   3       1
 3   7   4   1
5 3 7 9 6 4 1 2
```

```c++
#include <algorithm>
#include <climits>
#include <fstream>
#include <stdio.h>

using namespace std;

const int MAX_N = 1 << 17;
int n;
int dat[MAX_N * 2 - 1];

void init(int n_) {
  n = 1;
  while (n < n_)
    n *= 2;
  for (int i = 0; i < n * 2 - 1; ++i) {
    dat[i] = INT_MAX;
  }
}

void update(int k, int a) {
  k += n - 1;
  dat[k] = a;
  while (k > 0) {
    k = (k - 1) / 2;
    dat[k] = min(dat[k * 2 + 1], dat[k * 2 + 2]);
  }
}

int query(int a, int b, int k, int left, int right) {
  // return min val in [a, b)
  if (right <= a || b <= left) {
    return INT_MAX;
  }
  if (a <= left && right <= b) {
    return dat[k];
  } else {
    int vl = query(a, b, k * 2 + 1, left, (left + right) / 2);
    int vr = query(a, b, k * 2 + 2, (left + right) / 2, right);
    return min(vl, vr);
  }
}

int main() {
  ifstream ifs("../testset/segment_tree_rmq/test1.txt");
  int N;
  ifs >> N;
  init(N);
  for (int i = 0; i < N; ++i) {
    int x;
    ifs >> x;
    update(i, x);
  }
  printf("%d\n", query(0, 7, 0, 0, n)); // 1
  printf("%d\n", query(2, 6, 0, 0, n)); // 4
  printf("%d\n", query(7, 8, 0, 0, n)); // 2
}
```

```python
INF = float('inf')


def ns(f):
    return next(f).strip()


with open("../testset/segment_tree_rmq/test1.txt", 'r') as f:
    N = int(ns(f))
    X = list(map(int, ns(f).split()))

n = 1
while n < N:
    n *= 2
dat = [INF] * (n * 2 - 1)


def update(k, a):
    global dat
    k += n - 1
    dat[k] = a
    while k > 0:
        k = (k - 1) // 2
        dat[k] = min(dat[k * 2 + 1], dat[k * 2 + 2])


def query(a, b, k, left, right):
    if right <= a or b <= left:
        return INF
    if a <= left and right <= b:
        return dat[k]
    else:
        vl = query(a, b, k * 2 + 1, left, (left + right) // 2)
        vr = query(a, b, k * 2 + 2, (left + right) // 2, right)
        return min(vl, vr)


for i, x in enumerate(X):
    update(i, x)
print(query(0, 7, 0, 0, n))  # 1
print(query(2, 6, 0, 0, n))  # 4
print(query(7, 8, 0, 0, n))  # 2
```


## BIT: Binary Indexed Tree

- Each node holds sum of vals in the range
- $O(log N)$

```
// test1.txt
8
5 3 7 9 6 4 1 2
       37
   24      13
 8   16  10  3
5 3 7 9 6 4 1 2
```

```c++
#include <fstream>
#include <stdio.h>

#define MAX_N 100'000

using namespace std;

int N;
int B[MAX_N + 1];

int sum(int i) {
  // return sum of vals in [0, i]
  int s = 0;
  while (i > 0) {
    s += B[i];
    i -= i & -i;
  }
  return s;
}

void add(int i, int diff) {
  while (i <= N) {
    B[i] += diff;
    i += i & -i;
  }
}

int main() {
  ifstream ifs("../testset/binary_indexed_tree/test1.txt");
  ifs >> N;
  for (int i = 1; i <= N; ++i) {
    int b;
    ifs >> b;
    add(i, b);
  }
  printf("%d\n", sum(7)); // 35
  printf("%d\n", sum(4)); // 24
  printf("%d\n", sum(1)); // 5
}
```

```python
def ns(f):
    return next(f).strip()


with open("../testset/binary_indexed_tree/test1.txt", 'r') as f:
    N = int(ns(f))
    A = list(map(int, ns(f).split()))

B = [0] * (N + 1)


def _sum(i):
    s = 0
    while i > 0:
        s += B[i]
        i -= i & -i
    return s


def _add(i, diff):
    global B
    while i <= N:
        B[i] += diff
        i += i & -i


for i in range(N):
    _add(i + 1, A[i])

print(_sum(7))  # 35
print(_sum(4))  # 24
print(_sum(1))  # 5
```


# Flow Networks

## Ford-Fulkerson

- determine maximum flow
- $O(F \lvert E \rvert)$

![flow_network]({{site.url}}{{site.baseurl}}/assets/Algorithms_images/flow_network.png)
![residual_network]({{site.url}}{{site.baseurl}}/assets/Algorithms_images/residual_network.png)

```
// test1.txt
5 7 0 4
0 1 10
0 2 2
1 2 6
1 3 6
2 4 5
3 2 3
3 4 8
11
```

```c++
// O(F|E|)
#include <fstream>
#include <memory.h>
#include <stdio.h>
#include <vector>

#define MAX_N 100
#define INF 1'000'000'000

using namespace std;

struct Edge {
  int v, cap, rev;
};

int n, m, s, t;
vector<Edge> G[MAX_N];
bool used[MAX_N];

void add_edge(int u, int v, int cap) {
  G[u].push_back(Edge{v, cap, G[v].size()});
  G[v].push_back(Edge{u, 0, G[u].size() - 1});
}

int dfs(int u, int t, int f) {
  if (u == t) {
    return f;
  }
  used[u] = true;
  for (int i = 0; i < G[u].size(); ++i) {
    Edge &e = G[u][i];
    if (!used[e.v] && e.cap > 0) {
      int d = dfs(e.v, t, min(f, e.cap));
      if (d > 0) {
        e.cap -= d;
        G[e.v][e.rev].cap += d;
        return d;
      }
    }
  }
  return 0;
}

int max_flow(int s, int t) {
  int res = 0;
  for (;;) {
    memset(used, 0, sizeof(used));
    int f = dfs(s, t, INF);
    if (f == 0) {
      return res;
    }
    res += f;
  }
}

void solve() {
  int res = max_flow(s, t);
  printf("%d\n", res);
}

int main() {
  ifstream ifs("../testset/maximum_traffic/test1.txt");
  ifs >> n >> m >> s >> t;
  for (int i = 0; i < m; ++i) {
    int u, v, cap;
    ifs >> u >> v >> cap;
    add_edge(u, v, cap);
  }
  solve();
}
```

```python
INF = int(1e9)


def ns(f):
    return next(f).strip()


class Edge:
    def __init__(self, v, cap, rev):
        self.v = v
        self.cap = cap
        self.rev = rev


with open("../testset/maximum_traffic/test1.txt", 'r') as f:
    n, m, s, t = map(int, ns(f).split())
    G = [[] for _ in range(n)]

    def add_edge(u, v, cap):
        global G
        G[u].append(Edge(v, cap, len(G[v])))
        G[v].append(Edge(u, 0, len(G[u]) - 1))

    for _ in range(m):
        add_edge(*map(int, ns(f).split()))


def dfs(u, t, f, used):
    if u == t:
        return f
    used[u] = True
    for e in G[u]:
        if not used[e.v] and e.cap > 0:
            d = dfs(e.v, t, min(f, e.cap), used)
            if d > 0:
                e.cap -= d
                G[e.v][e.rev].cap += d
                return d
    return 0


def max_flow(s, t):
    res = 0
    while True:
        used = [False] * n
        f = dfs(s, t, INF, used)
        if f == 0:
            return res
        res += f


print(max_flow(s, t))
```

## Bipartite Matching

![bipartite_matching]({{site.url}}{{site.baseurl}}/assets/Algorithms_images/bipartite_matching.png)

```
// test1.txt
3 3 4
1 1
1 3
2 2
3 2
2
```

```c++
#include <fstream>
#include <stdio.h>
#include <vector>

#define MAX_N 1000
#define MAX_M 1000
#define MAX_V MAX_N + MAX_M

using namespace std;

int N, M, K;
vector<int> G[MAX_V];
int match[MAX_V];
bool used[MAX_V];

void add_edge(int u, int v) {
  G[u].push_back(v);
  G[v].push_back(u);
}

bool dfs(int u) {
  used[u] = true;
  for (auto v : G[u]) {
    int _u = match[v];
    if (_u < 0 || (!used[_u] && dfs(_u))) {
      // u is computers, _u is computer which is already assigned to work v, v is work
      // increase num of matching only when w < 0 i.e. _u find a new work.
      match[u] = v;
      match[v] = u;
      return true;
    }
  }
  return false;
}

int bipartite_matching() {
  int res = 0;
  fill(match, match + N + M, -1);
  for (int u = 0; u < N; ++u) { // only left side vertexes
    if (match[u] < 0) {
      fill(used, used + N + M, 0);
      if (dfs(u)) {
        ++res;
      }
    }
  }
  return res;
}

void solve() { printf("%d\n", bipartite_matching()); }

int main() {
  ifstream ifs("../testset/work_assignment/test2.txt");
  ifs >> N >> M >> K;
  for (int i = 0; i < K; ++i) {
    int u, v;
    ifs >> u >> v;
    --u;
    --v;
    add_edge(u, N + v);
    add_edge(N + v, u);
  }
  solve();
}
```

```python
def ns(f):
    return next(f).strip()


with open("../testset/work_assignment/test1.txt", 'r') as f:
    N, M, K = map(int, ns(f).split())
    V = N + M
    G = [[] for _ in range(V)]
    for _ in range(K):
        u, v = map(int, ns(f).split())
        u -= 1
        v -= 1
        G[u].append(N + v)
        G[N + v].append(u)


def dfs(u, used, match):
    used[u] = True
    for v in G[u]:
        _u = match[v]
        if _u < 0 or (not used[_u] and dfs(_u, used, match)):
            match[u] = v
            match[v] = u
            return True
    return False


def bipartite_matching():
    res = 0
    match = [-1] * V
    for u in range(N):
        if match[u] < 0:
            used = [False] * V
            if dfs(u, used, match):
                res += 1
    return res


print(bipartite_matching())
```