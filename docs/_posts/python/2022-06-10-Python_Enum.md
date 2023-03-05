---
title: "Note: Python Enum"
categories:
  - Note
tags:
  - Programming
  - Python
last-modified-at: 2022-06-10
---

# Don't Use The Same Value for Different Names

Enum members with the same value are considered as the same member.  
Don't use duplicated value, this cause some unexpected results.  

```python
from enum import Enum


class Color(Enum):
    BLUE = 0
    RED = 1     # dup
    GREEN = 2
    ORANGE = 1  # dup


Color["ORANGE"].name  # RED
Color["ORANGE"] is Color["RED"]  # True
Color.RED is Color.ORANGE # True
Color.RED.name == Color.ORANGE.name # True
```
