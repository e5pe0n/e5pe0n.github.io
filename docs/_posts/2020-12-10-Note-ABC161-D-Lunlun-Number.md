---
title: "Note: ABC161 D Lunlun Number"
categories:
  - AtCoder
tags:
  - Competitive Programming
  - C++
  - Python
  - DFS
---

問題: [ABC161 D - Lunlun Number](https://atcoder.jp/contests/abc161/tasks/abc161_d)


こういう数え上げは DFS がイメージしやすいからこれも最初 DFS で書いた．  
C++ は普通に大丈夫だったけど PyPy3 (7.3.0) だと再帰の深さの制限に引っ掛かって RE になった．  
そういえば Python で再帰を使うときは `setrecursionlimit()` で深さの上限を上げなきゃいけなかったなと思ってコードの一番上に書いたけど，どんな値を入れても RE になった．  

```python
from sys import setrecursionlimit
setrecursionlimit(10**9)


K = int(input())


cnt = 0


def dfs(n, k):
    global cnt
    res = 0
    if len(n) >= k:
        cnt += 1
        if cnt == K:
            res = int(n)
        else:
            res = 0
        return res
    if len(n) == 0:
        for i in range(1, 10):
            res += dfs(str(i), k)
        return res
    last = int(n[-1])
    for i in range(max(0, last - 1), min(9, last + 1) + 1):
        res += dfs(n + str(i), k)
    return res


for k in range(1, 10**9):
    if (res := dfs("", k)):
        print(res)
        exit()

```

あれ？って思って Python 3.8.2 のほうで提出したらこっちは正常に動いて AC だった．  
`setrecursionlimit()` って PyPy3 だと使えないんかな？  
調べたけど出てこず．  
かわりに再帰使うときは PyPy だと遅くなるから Python のほうがいいらしいことを知った．  

PyPy3 の AC のコードを見てみたけどみんな再帰使わずに while で書いてた．  
再帰開くのめちゃくちゃ苦手で避けてきたけど，while のほうが速いし両方書けるに越したことないので書いてみた．  
めっちゃ時間かかった...  

```python
K = int(input())
cnt = 0  # Lunlun number の数
for d in range(1, 10**9):   # 桁数
    ub = [9] * d    # upper bound
    n = [1] * d     # LunLun number
    i = 0           # index of ub and n
    while n[0] < 10:        # 最初の桁の数値が 9 を超えたら次の桁数にいく
        if n[i] > ub[i]:    # 見ている桁の数値が上端を超えたら 1 つ前の桁の数値を +1
            n[i - 1] += 1
            i -= 1          # 1 つ左の桁にいく
            continue
        if i == d - 1:      # 所定の桁数になったら 1 つ数える
            cnt += 1
            if cnt == K:    # K 番目ならそのときの n を出力して終了
                print(''.join([str(x) for x in n]))
                exit()
            n[i] += 1       # 最後の桁の数値を +1
            continue
        while i < d - 1:    # 所定の桁数に満たない場合
            ub[i + 1] = min(9, n[i] + 1)    # 右の桁の上端を新しく追加
            n[i + 1] = max(0, n[i] - 1)     # 右の桁の数値として下端を設定
            i += 1  # 右の桁にいく

```

`for d in range(1, 10**9)` で桁数を固定し，それぞれの桁の LunLun Number をつくっていく．  
`n` に LunLun Number の各桁の数値を，`ub` に各桁の上端を保存．  

所定の桁数に足りてないとき 1 つ右の桁をつくる． 
このとき初期値として下端を設定．   
今見ている桁 i の数値が上端を超えたとき，1 つ左の桁 i - 1 の数値を +1 して桁 i - 1 に移る．  
所定の桁数に足りてないので新しく 1 つ右の桁をつくる...  
というのを繰り返す．  

難しいなあ．  
+1 するタイミングと桁を移動するタイミングをかみ合わせるの大変だった．
