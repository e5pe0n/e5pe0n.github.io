---
title: AtCoder 水色攻略
categories:
  - AtCoder
tags:
  - Competitive Programming
---


# 最適化

# 2 分探索

単調増加の数列がある，あるいは作れるときは 2 分探索を使いやすい


[ABC172 C - Tsundoku](https://atcoder.jp/contests/abc172/tasks/abc172_c)  
[ABC174 E - Logs](https://atcoder.jp/contests/abc174/tasks/abc174_e)
[ABC109 B - log](https://atcoder.jp/contests/arc109/tasks/arc109_b)  
[ABC157 E - Simple String Queries](https://atcoder.jp/contests/abc157/tasks/abc157_e)  
[ABC153 F - Silver Fox vs Monster](https://atcoder.jp/contests/abc153/tasks/abc153_f)


## DP  

[ABC153 E - Created Ibis vs Monster](https://atcoder.jp/contests/abc153/tasks/abc153_e)

## 尺取法

[ABC153 F - Silver Fox vs Monster](https://atcoder.jp/contests/abc153/tasks/abc153_f)




# 最短路

## BFS

[ABC168 D - .. (Double Dots)](https://atcoder.jp/contests/abc168/tasks/abc168_d)  
[ABC184 E - Third Avenue](https://atcoder.jp/contests/abc184/tasks/abc184_e)  
[ABC176 D - Wizard in Maze](https://atcoder.jp/contests/abc176/tasks/abc176_d)  

## ビット DP

ある時刻での状態を集合で扱う

[ABC183 - C Travel](https://atcoder.jp/contests/abc183/tasks/abc183_c)  
[ABC180 - E Traveling Salesman among Aerial Cities](https://atcoder.jp/contests/abc180/tasks/abc180_e)  





# 数え上げ / 組合せ 

## 基本

- 剰余を考慮した反復二乗法
- 二項係数の前処理  

[ABC156 D - Bouquet](https://atcoder.jp/contests/abc156/tasks/abc156_d)  
[ABC156 E - Roaming](https://atcoder.jp/contests/abc156/tasks/abc156_e)  


何かを固定して考えてみる

[ABC167 E - Colorful Blocks](https://atcoder.jp/contests/abc167/tasks/abc167_e)  


## DP

基本

[ABC178 D - Redistribution](https://atcoder.jp/contests/abc178/tasks/abc178_d)  
[ABC184 D - increment of coins](https://atcoder.jp/contests/abc184/tasks/abc184_d)  
[ABC183 E - Queen on Grid](https://atcoder.jp/contests/abc183/tasks/abc183_e)  
[ABC155 E - Payment](https://atcoder.jp/contests/abc155/tasks/abc155_e)

状態を考慮


[ABC175 E - Picking Goods](https://atcoder.jp/contests/abc175/tasks/abc175_e)  


桁 DP (Digit DP)

[ABC154 E - Almost Everywhere Zero](https://atcoder.jp/contests/abc154/tasks/abc154_e)


## DFS

[ABC161 D - Lunlun Number](https://atcoder.jp/contests/abc161/tasks/abc161_d)



## ビット全探索

N が小さいときはビット全探索で総当たり

[ABC167 C - Skill Up](https://atcoder.jp/contests/abc167/tasks/abc167_c)  
[ABC173 C - H and V](https://atcoder.jp/contests/abc173/tasks/abc173_c)  


## 累積和

区間ごとの和を考えるとき

[ABC179 D - Leaping Tak](https://atcoder.jp/contests/abc179/tasks/abc179_d)  


## セグ木

[ABC157 E - Simple String Queries](https://atcoder.jp/contests/abc157/tasks/abc157_e)



# グラフ

## Union-Find Tree

[ABC177 D - Friends](https://atcoder.jp/contests/abc177/tasks/abc177_d)  
[ABC157 D - Friend Suggestions](https://atcoder.jp/contests/abc157/tasks/abc157_d)  


# Priority Queue


[ABC160 E - Red and Green Apples](https://atcoder.jp/contests/abc160/tasks/abc160_e)  



# ループ

K が N より異様に大きいときはループしている部分を抜き出して余りをとる

[ABC167 D - Teleporter](https://atcoder.jp/contests/abc167/tasks/abc167_d)  
[ABC175 D - Moving Piece](https://atcoder.jp/contests/abc175/tasks/abc175_d)  
[ABC179 E - Sequence Sum](https://atcoder.jp/contests/abc179/tasks/abc179_e)  


# 数学系

## XOR

2 進数にして桁ごとに考える

[ABC171 E - Red Scarf](https://atcoder.jp/contests/abc171/tasks/abc171_e)  



## 数値計算

でかい数があるときは乗算でのオーバーフローに注意．もしくは Python が無難

[ABC175 C - Walking Takahashi](https://atcoder.jp/contests/abc175/tasks/abc175_c)  
[ABC169 B - Multiplicatoin 2](https://atcoder.jp/contests/abc169/tasks/abc169_b)  


実数の計算では誤差に注意  
- 有理化  
- EPS = 1e-10  

[ABC169 C - Multiplication 3](https://atcoder.jp/contests/abc169/tasks/abc169_c)  


## n 進数

[ABC171 C - One Quadrillion and One Dalmatians](https://atcoder.jp/contests/abc171/tasks/abc171_c)  


## 中央値

中央値の集合の中央値を考える

[ABC169 E - Count Median](https://atcoder.jp/contests/abc169/tasks/abc169_e)  



## マンハッタン距離

45 度回転を使う

[ABC178 E - Dist Max](https://atcoder.jp/contests/abc178/tasks/abc178_e)  


