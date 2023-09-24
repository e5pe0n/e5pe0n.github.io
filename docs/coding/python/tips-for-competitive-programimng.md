# Tips for Competitive Programming


## Increase the limit of recursion

- default is 1000.  
- set to like *10^9* using `setrecursionlimit()`
  - not sure that *10^9* is appropriate value but had never failed so far at AtCoder

```python
from sys import setrecursionlimit
setrecursionlimit(10**9)
```

## Use *Python* if you use recursion, instead of *PyPy*

ordinaly *PyPy* performs better than *Python*, but when using recursion it looks slower than *Python*.


## Use *list* to join strings, instead of *str*

Python's *str* instance is immutable object so every join like `s += xxx` create a new *str* instance. this couse big overhead.


e.g. [AtCoder ABC158](https://atcoder.jp/contests/abc158/tasks/abc158_d:embed:cite)

proglem that string manipulation is needed to like append or prepend string.

```python title="Using str (1975 ms)"
S = input()
Q = int(input())
f = False
front, back = "", ""
for _ in range(Q):
    query = input().split()
    if len(query) == 1:
        f = not f
    else:
        F, C = query[1:]
        if F == "1":
            if f:
                back += C
            else:
                front += C
        else:
            if f:
                front += C
            else:
                back += C
if f:
    res = back[::-1] + S[::-1] + front
else:
    res = front[::-1] + S + back
print(res)
```

```python title="Using list (295 ms)"
S = input()
Q = int(input())
f = False
front, back = [], []
for _ in range(Q):
    query = input().split()
    if len(query) == 1:
        f = not f
    else:
        F, C = query[1:]
        if F == "1":
            if f:
                back.append(C)
            else:
                front.append(C)
        else:
            if f:
                front.append(C)
            else:
                back.append(C)
if f:
    res = "".join(back[::-1]) + S[::-1] + "".join(front)
else:
    res = "".join(front[::-1]) + S + "".join(back)
print(res)
```

## Take mod appropriately

- Python's *int* can have infinite value, but calculations involving big integers take a long time.  
- take mode appropriately to keep the integer small

## Priority Queue

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
