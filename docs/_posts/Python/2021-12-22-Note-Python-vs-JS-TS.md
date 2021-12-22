---
title: "Note: Python vs JavaScript/TypeScript"
categories:
  - Note
tags:
  - Programming
  - Python
  - JavaScript
  - TypeScript
last-modified-at: 2021-12-22
---

# Scope of *for*-loop

```ts
fs = ["0", "1", "2"].map((v) => (x) => (x + v));
fs.map((f) => f("x"));  // [0x, 1x, 2x]
```

Python does **NOT** create a scope each loop.  

```python
fs = [lambda x: k + x for k in ["0", "1", "2"]]
[f("x") for f in fs]  # [2x, 2x, 2x]
```

for-loop version here, which is equivalent to above.  
`k` is the same as a global variable so `k` in `f` is overwritten for each loop.  

```python
fs = []
for k in ["0", "1", "2"]:
    def f(x):
      return k + x
    fs.append(f)

[f("x") for f in fs]  # [2x, 2x, 2x]
```

We need to use another closure to capture `k` if we want to do the same thing with JS code above.  

```python
fs = [
  (lambda k:
    lambda x: k + x
  )(key)
  for key in key in ["0", "1", "2"]
]
[f("x") for f in fs]  # [0x, 1x, 2x]
```

```python
fs = []
for key in ["0", "1", "2"]:
    def g(k):
        def f(x):
            return k + x
        return f
    fs.append(g(key))

[f("x") for f in fs]  # [0x, 1x, 2x]
```


# Datetime

- ISO format
  - Python: `2021-12-22T08:19:01.000+00:00`
  - JS/TS: `2021-12-22T08:19:01.000Z`
- UNIX timestamp's unit is
  - Python: sec
  - JS/TS: **milli sec**


```python
from datetime import datetime

# "2021-12-22T08:19:01.000Z" -> 1640161141
def dt_str_to_timestamp(dt_str: str) -> int:
    dt = datetime.fromisoformat(dt_str)
    return int(dt.timestamp())

# 1640161141 -> "2021-12-22T08:19:01.000Z"
def timestamp_to_dt_str(timestamp: int) -> str:
    dt = datetime.fromtimestamp(timestamp, tz=timezone.utc)
    return dt.isoformat()
```

```python
from datetime import datetime

# "2021-12-22T08:19:01.000+00:00" -> 1640161141
def dt_str_to_timestamp(dt_str: str) -> int:
    dt = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
    return int(dt.timestamp())

# 1640161141 -> "2021-12-22T08:19:01.000+00:00"
def timestamp_to_dt_str(timestamp: int) -> str:
    dt = datetime.fromtimestamp(timestamp, tz=timezone.utc)
    return dt.isoformat().replace("+00:00", "Z")
```

<br>

```ts
// "2021-12-22T08:19:01.000Z" -> 1640161141
const dtStrToTimestamp = (dtStr: string) =>
  (new Date(dtStr).valueOf() / 1000) | 0; // s -> ms

// 1640161141 -> "2021-12-22T08:19:01.000Z"
const timestampToDtStr = (timestamp: number) =>
  new Date(timestamp * 1000).toISOString(); // ms -> s
```


# Range

```ts
const range = (start: number, end: number, step: number) => {
  if (step === 0) {
    throw new RangeError(`invalid argument: step=${step}; step must not be 0.`);
  }
  const len = Math.ceil((end - start) / step);
  return len <= 0 ? [] : Array.from(new Array(len), (v, i) => start + i * step);
};

const eRange = (end: number) => range(0, end, 1);
```
