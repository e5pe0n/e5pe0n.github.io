# Fundamentals

## Vector

### Copy and Reference

C++'s function returns copied vector with **copied objects** it has.  

```cpp
#include <string>
#include <vector>
using namespace std;

struct Node {
  int id;
  Node(int _id) : id(_id) {}
};

struct Graph {
  vector<Node> nodes;
  vector<Node> get_nodes() {
    return nodes;
  }
};

int main() {
  Graph g;
  g.nodes.push_back(Node(0));
  vector<Node> _nodes = g.get_nodes();
  _nodes[0].id = 100;
  printf("%d\n", g.nodes[0].id); // 0
}
```

Use pointer with *shared_ptr* in `<memory>`.  

```cpp
#include <memory>
#include <string>
#include <vector>
using namespace std;

struct Node {
  int id;
  Node(int _id) : id(_id) {}
};

struct Graph {
  vector<shared_ptr<Node>> nodes;
  vector<shared_ptr<Node>> get_nodes() {
    return nodes;
  }
};

int main() {
  Graph g;
  g.nodes.push_back(make_shared<Node>(0));
  vector<shared_ptr<Node>> _nodes = g.get_nodes();
  _nodes[0].get()->id = 100;
  printf("%d\n", g.nodes[0].get()->id); // 100
}
```

### Vector of Pointers

*vector* does not clean pointers when it reaches out of the scope.  

```cpp
#include <string>
#include <vector>
using namespace std;

struct A {
  ~A() {
    printf("deleted");
  }
};

int main() {
  vector<A *> v;
  v.emplace_back(new A);
} // memory leaks (~A is not called)
```

Use *unique_ptr* or *shared_ptr* in `<memory>` to make memory maintenace easy.  

```cpp
#include <memory>
#include <string>
#include <vector>
using namespace std;

struct A {
  ~A() {
    printf("deleted\n");
  }
};

int main() {
  vector<unique_ptr<A>> v;
  v.emplace_back(unique_ptr<A>(new A));
  v.emplace_back(make_unique<A>()); // the same as above
}
// deleted (~A is called)
// deleted (~A is called)
```

### Sort

#### Asc

```cpp title="Using lambda"
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

```cpp title="Using the less comparison function"
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

#### Dsc

```cpp title="Using lambda"
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

```cpp title="Using the greater comparison function"
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

## Priority Queue

**the order of priority_queue is reverse to one of sort!**

| functions |  priority_queue   | sort  |
| :-------: | :---------------: | :---: |
|  greater  | min heap i.e. asc |  dsc  |
|   less    | max heap i.e. dsc |  asc  |


### Max Heap

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

### Min Heap

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

## Dynamic Cast

### Down Cast

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

struct A {
  virtual void dummy() = 0;
};

struct B : public A {
  string _name;
  void dummy() override {}
  B(string name) : _name(name) {}
};

struct C : public A {
  ll _value;
  void dummy() override {}
  C(ll value) : _value(value) {}
};

int main() {
  vector<shared_ptr<A>> v;
  v.push_back(make_shared<B>("B"));
  v.push_back(make_shared<C>(3));
  for (auto _v : v) {
    if (auto b = dynamic_cast<B *>(_v.get())) {
      cout << b->_name << endl;
    } else if (auto c = dynamic_cast<C *>(_v.get())) {
      cout << c->_value << endl;
    }
  }
}

// B
// 3
```

## XOR

Be careful for the operation precedence.  
Should write it with parentheses if not sure.

```cpp
3 ^ 6 == 3    // true because evaluated as 3 ^ (6 == 3)
(3 ^ 6) == 3  // false
```

## Random

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

## Read Lines


```txt title="01.txt"
line1-1 line1-2 line1-3
line2-1 line2-2 line2-3
```

```cpp
#include <fstream>
#include <string>
using namespace std;
int main() {
  ifstream ifs{"01.txt"};
  string lines{};
  for (string s; getline(ifs, s);) {
    lines += s;
  }
// line1-1 line1-2 line1-3
// line2-1 line2-2 line2-3
}
```

