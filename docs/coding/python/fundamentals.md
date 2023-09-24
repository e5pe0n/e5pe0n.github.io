# Fundamentals

## Sort

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

## Random

```python
import random
x = int(random.uniform(1, 7)) # 1, 2, 3, 4, 5, 6
```

## Read Lines

```txt title="01.txt"
line1-1 line1-2 line1-3
line2-1 line2-2 line2-3
```

```py
with open("01.txt", "r") as f:
    lines: str = f.read()
```

```py
with open("01.txt", "r") as f:
    lines: list[str] = f.readlines()  # including newline chars
# lines = [
#   "line1-1 line1-2 line1-3\n",
#   "line2-1 line2-2 line2-3\n"
# ]
```

```py
with open("01.txt", "r") as f:
    lines: list[str] = list(f)
# lines = [
#   "line1-1 line1-2 line1-3\n",
#   "line2-1 line2-2 line2-3\n"
# ]
```
