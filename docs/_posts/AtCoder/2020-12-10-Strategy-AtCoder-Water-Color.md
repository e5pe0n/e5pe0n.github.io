---
title: AtCoder 水色攻略
categories:
  - AtCoder
tags:
  - Competitive Programming
last_modified_at: 2021-01-14
---


# 最適化

## 2 分探索

単調増加の数列がある，あるいは作れるときは 2 分探索を使いやすい


[ABC143 D - Triangles](https://atcoder.jp/contests/abc143/tasks/abc143_d)  
[CODEFESTIVAL 2016 Final B - Exactly N points](https://atcoder.jp/contests/cf16-final/tasks/codefestival_2016_final_b)  
[ABC172 C - Tsundoku](https://atcoder.jp/contests/abc172/tasks/abc172_c)  
[ABC174 E - Logs](https://atcoder.jp/contests/abc174/tasks/abc174_e)
[ABC109 B - log](https://atcoder.jp/contests/arc109/tasks/arc109_b)  
[ABC157 E - Simple String Queries](https://atcoder.jp/contests/abc157/tasks/abc157_e)  
[ABC153 F - Silver Fox vs Monster](https://atcoder.jp/contests/abc153/tasks/abc153_f)


## 貪欲法

スケジュール問題

[キーエンスプログラミングコンテスト 2020](https://atcoder.jp/contests/keyence2020/tasks/keyence2020_b)  

## DP  

[ABC153 E - Created Ibis vs Monster](https://atcoder.jp/contests/abc153/tasks/abc153_e)

## 尺取法

[ABC153 F - Silver Fox vs Monster](https://atcoder.jp/contests/abc153/tasks/abc153_f)




# 最短路

## BFS

[AGC033 A - Darker and Darker](https://atcoder.jp/contests/agc033/tasks/agc033_a)  
[ABC151 D - Maze Master](https://atcoder.jp/contests/abc151/tasks/abc151_d)  
[ABC168 D - .. (Double Dots)](https://atcoder.jp/contests/abc168/tasks/abc168_d)  
[ABC184 E - Third Avenue](https://atcoder.jp/contests/abc184/tasks/abc184_e)  
[ABC176 D - Wizard in Maze](https://atcoder.jp/contests/abc176/tasks/abc176_d)  

## ビット DP

ある時刻での状態を集合で扱う

[ABC183 - C Travel](https://atcoder.jp/contests/abc183/tasks/abc183_c)  
[ABC180 - E Traveling Salesman among Aerial Cities](https://atcoder.jp/contests/abc180/tasks/abc180_e)  
[ABC190 - E Magical Ornament](https://atcoder.jp/contests/abc190/tasks/abc190_e)  





# 数え上げ / 組合せ 

## 基本

- 剰余を考慮した反復二乗法
- 二項係数の前処理  

[AGC017 A - Biscuits](https://atcoder.jp/contests/agc017/tasks/agc017_a)  
[ABC156 D - Bouquet](https://atcoder.jp/contests/abc156/tasks/abc156_d)  
[ABC156 E - Roaming](https://atcoder.jp/contests/abc156/tasks/abc156_e)  
[ABC098 C - March](https://atcoder.jp/contests/abc089/tasks/abc089_c)  
[AGC031 A - Colorful Subsequence](https://atcoder.jp/contests/agc031/tasks/agc031_a)  
[ABC 151 E - Max-Min Sums](https://atcoder.jp/contests/abc151/tasks/abc151_e)  
[ABC132 D - Blue and Red Balls](https://atcoder.jp/contests/abc132/tasks/abc132_d)  

- 何かを固定して考えてみる

[ABC167 E - Colorful Blocks](https://atcoder.jp/contests/abc167/tasks/abc167_e)  


- 包除定理

[ABC131 C - Anti-Division](https://atcoder.jp/contests/abc131/tasks/abc131_c)  


## DP

基本

[ABC129 C - Typical Stairs](https://atcoder.jp/contests/abc129/tasks/abc129_c)  
[ABC178 D - Redistribution](https://atcoder.jp/contests/abc178/tasks/abc178_d)  
[ABC184 D - increment of coins](https://atcoder.jp/contests/abc184/tasks/abc184_d)  
[ABC183 E - Queen on Grid](https://atcoder.jp/contests/abc183/tasks/abc183_e)  
[ABC155 E - Payment](https://atcoder.jp/contests/abc155/tasks/abc155_e)

状態を考慮


[ABC175 E - Picking Goods](https://atcoder.jp/contests/abc175/tasks/abc175_e)  


桁 DP (Digit DP)

[ABC154 E - Almost Everywhere Zero](https://atcoder.jp/contests/abc154/tasks/abc154_e)


## DFS

[ABC042 C - Iroha's Obsession](https://atcoder.jp/contests/abc042/tasks/arc058_a)  
[ABC161 D - Lunlun Number](https://atcoder.jp/contests/abc161/tasks/abc161_d)  
[ABC114 C - 755](https://atcoder.jp/contests/abc114/tasks/abc114_c)  
[ABC152 D - Handstand 2](https://atcoder.jp/contests/abc152/tasks/abc152_d)  



## ビット全探索

N が小さいときはビット全探索で総当たり

[ABC128 C - Switches](https://atcoder.jp/contests/abc128/tasks/abc128_c)  
[ABC167 C - Skill Up](https://atcoder.jp/contests/abc167/tasks/abc167_c)  
[ABC173 C - H and V](https://atcoder.jp/contests/abc173/tasks/abc173_c)  


## 累積和

区間ごとの和を考えるとき

[ABC122 C - GeT AC](https://atcoder.jp/contests/abc122/tasks/abc122_c)  
[ABC179 D - Leaping Tak](https://atcoder.jp/contests/abc179/tasks/abc179_d)  


## セグ木

[ABC157 E - Simple String Queries](https://atcoder.jp/contests/abc157/tasks/abc157_e)

## BIT

転倒数  

[ABC190 F - Shift and Inversions](https://atcoder.jp/contests/abc190/tasks/abc190_f)  


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

## 素数 / 約数

[ABC 142 D - Disjoint Set of Common Divisors](https://atcoder.jp/contests/abc142/tasks/abc142_d)  

## 最大公約数

[AGC 018 A - Getting Difference](https://atcoder.jp/contests/agc018/tasks/agc018_a)  

## 剰余

[ABC133 C - Remainder Minimization 2019](https://atcoder.jp/contests/abc133/tasks/abc133_c)  
[ARC111 A - Simple Math 2](https://atcoder.jp/contests/arc111/tasks/arc111_a)  


## 期待値

[ABC078 C - HSI](https://atcoder.jp/contests/abc078/tasks/arc085_a)  


## XOR

[AGC035 A - XOR Circle](https://atcoder.jp/contests/agc035/tasks/agc035_a)  

2 進数にして桁ごとに考える

[ABC171 E - Red Scarf](https://atcoder.jp/contests/abc171/tasks/abc171_e)  



## 数値計算

でかい数があるときは乗算でのオーバーフローに注意．もしくは Python が無難

[ABC175 C - Walking Takahashi](https://atcoder.jp/contests/abc175/tasks/abc175_c)  
[ABC169 B - Multiplicatoin 2](https://atcoder.jp/contests/abc169/tasks/abc169_b)  


実数の計算では誤差に注意  
- 有理化  
- EPS = 1e-10  

[Panasonic2020 C - Sqrt Inequality](https://atcoder.jp/contests/panasonic2020/tasks/panasonic2020_c)  
[ABC169 C - Multiplication 3](https://atcoder.jp/contests/abc169/tasks/abc169_c)  


## n 進数

[ABC171 C - One Quadrillion and One Dalmatians](https://atcoder.jp/contests/abc171/tasks/abc171_c)  
[ABC099 C - Strange Bank](https://atcoder.jp/contests/abc099/tasks/abc099_c)  
[ABC105 C - Base -2 Number](https://atcoder.jp/contests/abc105/tasks/abc105_c)  


## 中央値

中央値の集合の中央値を考える

[ABC169 E - Count Median](https://atcoder.jp/contests/abc169/tasks/abc169_e)  



## マンハッタン距離

45 度回転を使う

[ABC178 E - Dist Max](https://atcoder.jp/contests/abc178/tasks/abc178_e)  


# マス目

[ABC129 D - Lamp](https://atcoder.jp/contests/abc129/tasks/abc129_d)  

# 2 分的な

[ABC115 D - Christmas](https://atcoder.jp/contests/abc115/tasks/abc115_d)  

# 発想

[AGC023 A - Zero-Sum Ranges](https://atcoder.jp/contests/agc023/tasks/agc023_a)  
