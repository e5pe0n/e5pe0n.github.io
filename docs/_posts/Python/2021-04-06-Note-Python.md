---
title: "Note: Python"
categories:
  - Note
tags:
  - Programming
  - Python
last-modified-at: 2021-04-06
---

# Global Scope

Using *global* to refer to outer variables from the function (to prevent from defining a new `lst1` in `f()`)

```py
lst1 = [0, 1, 2]
lst2 = [0, 1, 2]


def f():
    global lst1
    lst1 = [10, 11]
    lst2 = [10, 11]


f()

print(lst1)  # [10, 11]: modified by f()
print(lst2)  # [0, 1, 2]
```

An access to the attributes are resolved for an existing variable.  

```py
lst1 = [0, 1, 2]
lst2 = [0, 1, 2]


def g():
    lst1[:] = [10, 11]
    lst2 = [10, 11]


g()

print(lst1)  # [10, 11]: modified by g()
print(lst2)  # [0, 1, 2]
```
