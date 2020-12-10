---
title: "競プロで Python を使うとき気を付けること"
categories:
  - Competitive Programming
tags:
  - Competitive Programming
  - AtCoder
  - Python
---

# Sammary
- `setrecursionlimit()` で再帰の深さ制限を上げておく  
  - 再帰を使うときは PyPy ではなく Python を使う
- str の連結は遅いので list を使う
- 速度のため mod を適度にとる
- 順序付き集合がない
  - C++ の `set.lower_bound()` みたいなことができない（Python の set は順序を管理してないので `bisect` は使えない）
  - multiset もない

# `setrecursionlimit()` で再帰の深さ制限を上げておく

再帰の深さ制限として recursion limit が設けられている．  
デフォルト値は 1000．  
足りなくて RE になることがあるので 10^9 にあらかじめ上げておく．  
10^9 って値は適当だけど今んとこ引っかかったことない．  

```python
from sys import setrecursionlimit
setrecursionlimit(10**9)
```

あと再帰を使うときは PyPy より素の Python のほうが速いらしい．  


# str の連結は遅いので list を使う

これは競プロに限らないか．  
Python の str はイミュータブルなので `s += "xxx"` のように連結するときは毎回新しい str オブジェクトを作る．  
このときのオーバーヘッドがけっこう大きい．  

e.g.  

[https://atcoder.jp/contests/abc158/tasks/abc158_d:embed:cite]

文字列を先頭か末尾にどんどん追加していく操作がある問題．  
先頭の文字列を格納する変数として `front`，末尾の文字列を格納する変数として `back` を設ける．    

front, back として str を使ったコード

```python
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

front, back として list を使ったコード

```python
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

実行時間は str のほうが 1975 ms，list のほうが 295 ms．  


# mod をちゃんととる

Python の int は値の上限がないのでいくらでも大きい値を代入できるが，大きい値は計算に時間がかかる．  
mod をとる問題でめんどくさがってすべての計算が終わったあと mod をとろうとすると普通に TLE になるのでちゃんと毎回とったほうがいい．  


