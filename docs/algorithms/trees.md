# Trees

## Find-Union Tree

**DON'T FORGET TO CALL init() !!**

```cpp title="C++"
ll par[MAX_N], rnk[MAX_N];

void init() {
  for (ll i = 0; i < N; ++i) {
    par[i] = i;
    rnk[i] = 0;
  }
}

ll find(ll x) {
  if (x == par[x]) return x;
  return par[x] = find(par[x]);
}

void unite(ll x, ll y) {
  x = find(x);
  y = find(y);
  if (x == y) return;
  if (rnk[x] < rnk[y])
    par[x] = y;
  else {
    par[y] = x;
    if (rnk[x] == rnk[y]) ++rnk[x];
  }
}

bool same(ll x, ll y) {
  return find(x) == find(y);
}

int main() {
  cin >> N >> M;
  init();
}
```

```python title="Python"
N, M = map(int, input().split())

par = list(range(N))
rnk = [0] * N


def find(x):
    global par
    if x == par[x]:
        return x
    par[x] = find(par[x])
    return par[x]


def unite(x, y):
    global par, rnk
    x = find(x)
    y = find(y)
    if x == y:
        return
    if rnk[x] < rnk[y]:
        par[x] = y
    else:
        par[y] = x
        if rnk[x] == rnk[y]:
            rnk[x] += 1


def same(x, y):
    return find(x) == find(y)
```


## Segment Trees

### RMQ: Range Minimum Query

- Each node holds min val in the range
- $O(log N)$

```txt title="test1.txt"
8
5 3 7 9 6 4 1 2
       1
   3       1
 3   7   4   1
5 3 7 9 6 4 1 2
```

```cpp title="C++"
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

```python title="Python"
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


### BIT: Binary Indexed Tree

- Each node holds sum of vals in the range
- $O(log N)$

```txt title="test1.txt"
8
5 3 7 9 6 4 1 2
       37
   24      13
 8   16  10  3
5 3 7 9 6 4 1 2
```

```cpp title="C++"
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
    i -= i & -i;  // minus last 1 bit
  }
  return s;
}

void add(int i, int diff) {
  while (i <= N) {
    B[i] += diff;
    i += i & -i;  // plus last 1 bit
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

```python title="C++"
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
        i -= i & -i # minus last 1 bit
    return s


def _add(i, diff):
    global B
    while i <= N:
        B[i] += diff
        i += i & -i # plus last 1 bit


for i in range(N):
    _add(i + 1, A[i])

print(_sum(7))  # 35
print(_sum(4))  # 24
print(_sum(1))  # 5
```

