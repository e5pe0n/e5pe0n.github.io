---
title: "Note: One-Phrase-Descriptions"
categories:
  - Note
tags:
  - Math
---


# 大数の法則: Law of Large Numbers; LLN
$N \rightarrow \infty$ で，標本の確率や平均，分散といった $N$ が分母にある数値がいくらでも理論値 (母集団の値) に近づく．  

### 注意
ズレ量 $\Delta$ が $N \rightarrow \infty$ で $\Delta \rightarrow 0$ となるわけではない．  
$N \rightarrow \infty$ で $\Delta \rightarrow \infty$ である．  
しかし，$N \gg \Delta$ であり，ズレ量 $\Delta$ は相対的にいくらでも小さくなるため，サンプル数 $N$ が十分大きいのとき $N$ が分母である数値 (標本確率，標本平均，標本分散) を母集団における確率，平均，分散と一致するとみなしてもよい，という意味  

<br>
<hr>
<br>

# 最適化
与えられた制約条件のもとで関数の値を最大または最小にする変数の値を求めること  
- 勾配法
  - Pros
    - 単純かつ極めて有効
  - Cons
    - 勾配 $\nabla f$ を計算に含むため，微分できない関数は都合が悪い．
    - 初期値の与え方によっては最大値，最小値でない極値に到達する可能性がある．
    - 極値が一つの場合でも到達に時間のかかる場合がある (極値が細長い尾根の上や細長い谷の底にある場合)
- ニュートン法
  - Pros
    - 真の解に近い近似値から反復を開始すると収束が速い
      - 2次収束 ($(K+1)$ 回目の近似値と真値との差 $\epsilon^{(K+1)}$ が $\epsilon^{(K)^2}$ の定数倍)
        - e.g. K回目で誤差0.1 -> (K + 1) 回目で誤差 0.01
  - Cons
    - 勾配 $\nabla f$ を計算に含むため，微分できない関数は都合が悪い．
    - 初期値の与え方によっては最大値，最小値でない極値に到達する可能性がある．
    - ヘッセ行列 $\boldsymbol{H}$ を計算するのにすべての2階の導関数 $\frac{\partial^2 f}{\partial x_i \partial x_j}$ が与えられなければならない  
    - $\boldsymbol{H}^{-1}$ の計算が必要  
- 共役勾配法
  - Pros
    - 逆行列の計算を避ける
  - Cons
    - 勾配 $\nabla f$ を計算に含むため，微分できない関数は都合が悪い．
    - 初期値の与え方によっては最大値，最小値でない極値に到達する可能性がある．
- 乱数による最適化
  - 最適解が求まる保証はないが，そこそこの解を素早く (=全ての組合せに対して非常に少ない試行回数で) 求めることができる

## 勾配法  


## ニュートン法  
多変数用アルゴリズム  
1. $\boldsymbol{x}$ の初期値を与える
2. 勾配 $\nabla f(\boldsymbol{x})$，ヘッセ行列$\boldsymbol{H}(\boldsymbol{x})$ を計算
3. 連立1次方程式の解 $\Delta x$ を計算 (ガウスの消去法 or LU分解)  
   $$
   \boldsymbol{H} \Delta x = -\Delta f
   $$
4. $\boldsymbol{x}$ の更新  
   $$
   \boldsymbol{x} \leftarrow \boldsymbol{x} + \Delta \boldsymbol{x}
   $$
5. $\lVert \Delta x \rVert < \delta$ なら $\boldsymbol{x}$ を返して終了．そうでなければステップ2．

<br>

特に1変数の場合  
1. $x$ の初期値を与える
2. $\bar{x} \leftarrow x$ と置き，以下のように $x$ を更新
   $$
   x \leftarrow \bar{x} - \frac{f'(\bar{x})}{f''(\bar{x})}
   $$
3. $\lvert x - \bar{x} \rvert < \delta$ であれば $x$ 返して終了． そうでなければステップ2．

<br>
<hr>
<br>

# 最小p乗法  
データに対する関数の当てはめ(データを式で表すのにどんな関数が最適か)．  

$$
J = \sum_{\alpha=1}^{N}\ (y_{\alpha} - (ax_{\alpha} + b))^p\ \rightarrow min
$$

特に，p = 2 で最小二乗法．  
最小二乗法は最尤推定の特殊．  
$$
J = \sum_{\alpha=1}^{N}\ (y_{\alpha} - (ax_{\alpha} + b))^2\ \rightarrow min
$$


## 連立1次方程式
- 解が一意に定まる(線形独立)の場合 ($m > n$)
- 不定の場合
    - 無数に解が存在する場合，なるべく小さい解を計算．  
    - 最小二乗法を制約とし，未知数の二乗和を最小にする問題 -> ラグランジュの未定乗数法
        - 二乗和: $J = \frac{1}{2} \Sigma_{i=1}^{n} x_{i}^{2} \rightarrow min$

## (ムーア・ペンローズ)一般逆行列 (Muoore-Penrose inverse)
- Called also
  - generalized inverse: 一般逆行列
  - pseudo-inverse matrix: 擬似逆行列
- 解が一意に定まる場合と不定の場合について一般化した逆行列
- 使用例
  - ロボット工学
    - 動特性の同定
      - 同定: identification
    - 冗長ロボットの制御

## 特異値分解 (singular value decomposition; SVD)
- 使用例
  - 擬似逆行列の計算 <- 最小二乗法
  - 数値計算上で
    - 特異値を用いて行列の有効な階数を求めることができる
    - 丸め誤差により階数が退化した行列に対し，非常に小さいが0ではない特異値が得られてしまう場合に有効
      - 画像変換
  - 行列の近似

$\boldsymbol{V} = \{\boldsymbol{v_1, ..., \boldsymbol{v_r}}\}$: $\boldsymbol{M}$の入力空間の正規直交基底  
$\boldsymbol{U} = \{\boldsymbol{u_1, ..., \boldsymbol{u_r}}\}$: $\boldsymbol{M}$の出力空間の正規直交基底
$\boldsymbol{U} = \{\boldsymbol{u_1, ..., \boldsymbol{u_r}}\}$  
$\sigma_i = \sqrt{\lambda_i}$  

とおいて，

$$
\boldsymbol{A} = \boldsymbol{U} \boldsymbol{M} \boldsymbol{V^{T}} =
\boldsymbol{U}\left(
    \begin{array}{cccc}
      \sigma_1 & & & \\
      & \sigma_2 &  & \\
      & & \ddots \\
      & & & \sigma_r
    \end{array}
  \right) \boldsymbol{V^{T}}
$$

特に，一般逆行列$\boldsymbol{A}^{-}$について，$\lambda_i$を$\boldsymbol{AA^{T}}$の固有値，$\boldsymbol{U}$を正規直交系固有ベクトルとすると，  

$$
\boldsymbol{A^{-}} = \boldsymbol{V} \boldsymbol{M} \boldsymbol{U^{T}} =
\boldsymbol{V}\left(
    \begin{array}{cccc}
      1/\sigma_1 & & & \\
      & 1/\sigma_2 &  & \\
      & & \ddots \\
      & & & 1/\sigma_r
    \end{array}
  \right) \boldsymbol{U^{T}}
$$

<br>
<hr>
<br>

# 非線形最小二乗法
測定誤差を含めて，理論値との誤差が小さくなるよう近似する．  

$$
J = \frac{1}{2} \sum_{\alpha=1}^{N} \sum_{l=1}^{r} F_l (\boldsymbol{x_{\alpha}}, \boldsymbol{u})^2 \rightarrow min
$$

手法
- ガウス・ニュートン法: Gauss-Newton method
- レーベンバーグ・マーカート法: Levenberg-Marquardt method

<br>
<hr>
<br>

# 最尤推定
N個の観測値 $x_1, ..., x_N$ が得られた．  
-> $x_1, ..., xN$ は既に同時に生じている．  
-> 同時確率分布 $p(x_1)p(x_2)...p(x_N)$ = 観測値 $x_1, ..., x_N$ が観測される確率  
-> これを最大にする未知パラメータを推定 = 確率密度関数$p(x)$を推定 = **最尤推定**  
= 観測値から母集団の尤もらしいパラメータを推定  

e.g.  
観測値 $x_1, ..., x_N$ が観測されたとき，観測値が正規分布(=母集団の確率分布)に従って独立に発生したと仮定する．  
= 観測値 $x_1, ..., x_N$ が観測されたとき，観測値が正規分布に従って生じたと仮定した場合，その正規分布を決定するために必要な未知パラメータ母平均$\mu$，母分散$\sigma^2$を推定する  
-> 観測値 $x_1, ..., x_N$ から母平均$\mu$，母分散$\sigma^2$を最尤推定する．  

このとき，母平均$\mu$，母分散$\sigma^2$の最尤推定量$\hat{\mu}$，$\hat{\sigma^2}$ はそれぞれ標本平均(=観測値の平均)，標本分散(=観測値の分散)に等しい．  


<br>
<hr>
<br>

# (統計的)モデル
観測データは真値にどのような誤差が加わって生じたのかという解釈．   
e.g.
- 出力誤差モデル
    - 出力 $y_{\alpha}$ を誤差 $\epsilon_{\alpha}$ の問題に置き換える．i.e. $y_a$ は真値にどのような誤差 $\epsilon_{\alpha}$ が加わって生じたか？
    - たとえば，誤差が正規分布 $\frac{1}{\sqrt{2 \pi \sigma^{2}}} e^{-(x - \mu)^2 / 2\sigma^2}$ に従って生じると仮定したとき，最尤推定は最小二乗法(誤差の二乗和を最小にする問題)に等しくなる．  
- 入力誤差モデル
    - $x_\alpha$, $y_\alpha$ をxy平面上にプロットし，真値(直線)との誤差が最小になるような関数を求める
      - 直線の当てはめの場合，最尤推定値 $\hat{x_\alpha}$, $\hat{y_\alpha}$ は観測値 $x_\alpha$，$y_\alpha$ から直線 $Ax + By + C = 0$ に下ろした垂線との交点となる． 

<br>
<hr>
<br>

# 標本共分散行列 $\boldsymbol{V}$
$m_x, m_y = \sum_{\alpha=1}^N x_{\alpha}, \sum_{\alpha=1}^N y_{\alpha}$ として，  

$$
\boldsymbol{V} = 
\left(
    \begin{array}{cc}
      \sum_{\alpha=1}^N (x_{\alpha} - m_x)^2 / N & \sum_{\alpha=1}^{N} (x_{\alpha} - m_x) (y_{\alpha} - m_y) / N \\
      \sum_{\alpha=1}^{N} (x_{\alpha} - m_x) (y_{\alpha} - m_y) / N & \sum_{\alpha=1}^{N} (y_{\alpha} - m_y)^2 / N \\
    \end{array}
  \right)
$$

## シュワルツの不等式  
$$
-\sqrt{\sum_{i=1}^n a_i^2 \sum_{i=1}^n b_i^2} \le \sum_{i=1}^n a_i b_i \le \sqrt{\sum_{i=1}^n a_i^2 \sum_{i=1}^n b_i^2}
$$

特に，ベクトルの内積について  
$$
-1 \le \frac{\boldsymbol{a} \cdot \boldsymbol{b}}{\|\boldsymbol{a}\| \|\boldsymbol{b}\|} \le 1 \\
\boldsymbol{a} \cdot \boldsymbol{b} = \|\boldsymbol{a}\| \|\boldsymbol{b}\|cos \theta
$$  

## 相関係数 $r_{xy}$
$$
r_{xy} = \frac{\sum_{\alpha=1}^{N} (x_{\alpha} - m_x)(y_{\alpha} - m_y) / N}{\sqrt{\sum_{\alpha=1}^{N} (x_{\alpha} - m_x)^2 / N} \sqrt{\sum_{\alpha=1}^{N} (y_{\alpha} - m_y)^2 / N}}
$$

シュワルツの不等式より $-1 \le r_{xy} \le 1$  
$\boldsymbol{a} = ((x_1 - m_x), ..., (x_N - m_x)),\ \boldsymbol{b} = ((y_1 - m_y), ..., (y_N - m_y))$ と当てはめると，  
$r_{xy}$はデータ$x_{\alpha}$ 誤差ベクトルとデータ $y_{\alpha}$ 誤差ベクトルの向きがどれだけ一致しているかを表す．  
i.e. データ $x_{\alpha}$ とデータ $y_{\alpha}$ の誤差の傾向がどれだけ似ているかを表す．  
誤差モデルは，入力 $x$ と出力 $y$ の問題を誤差の問題に置き換えて考えていたため，$誤差の傾向 = データ x, y の傾向$ となる．  

![rxy.png]({{site.url}}{{site.baseurl}}/assets/One_Phrase_Discriptions_images/rxy.png)

<br>
<hr>
<br>

# クラス判別(教師なし学習)
- 事前確率: $\pi_k$  
  - N個のクラスの中でクラス $k$ が選択される確率  
    $\equiv$ 各クラスに属するデータ $x$ の分布  
    = 確率変数 $x$ がクラス $k$ に属する確率
- 条件付き確率密度: $p_k(x)$
  - $x$ がクラス $k$ に属することがわかっているときの確率密度  
    = クラス $k$ におけるデータの発生確率
- $p_k(\alpha)$
  - クラス $k$ で $x_{\alpha}$ が観測される確率
- 事後確率: $w_{\alpha}^{(k)}$
  - 観測された $x_{\alpha}$ がクラス $k$ に属する確率


$$
w_{\alpha}^{(k)} = \frac{\pi_k p_k(x_{\alpha})}{\sum_{l=1}^{K} \pi_l p_l(x_{\alpha})}, \ (\pi_k = \frac{N_k}{N})
$$

$p_k(x)$で事前確率$\pi_k$を重み付けする  
= 各クラスでのデータの発生確率に基づいて，データがどのクラスに属するか(=データがどのクラスに属するのが尤もらしいか)を計算する

## 補足
ベイズの定理風に書くと    
$$
p(k|x_{\alpha}) = \frac{p(k)p(x_{\alpha}|k)}{p(x_{\alpha})}
$$

<br>
<hr>
<br>

# イェンセンの不等式: Jensen's inquality
$f(x)$が凸関数のとき，期待値$E[X]$について次の不等式が成り立つ．  
  
$$
E[f(X)] \le f(E[X])
$$

応用例:  $log(E[x]) \le E[log{x}]$

証明  
$f(x)$ が上に凸の関数のとき，交点 $(x_0, f(x_0))$ 以外のすべての点で $f(x)$ より大きい値をとる直線 $f(x) \le a(x - x_0) + f(x_0)$ が引ける．(交点がなくても常に $f(x)$ より大きな値をとる直線が引ければよい．1つの交点を持つ直線は，不等式が成り立つための最低限の直線である)  
  
$$
E[f(X)] \le E[a(X - x_0) + f(E[X])] \\
= a(E[X] - x_0) + f(x_0) \\
= f(E[X])
$$

![jensen_inquality.png]({{site.url}}{{site.baseurl}}/assets/One_Phrase_Discriptions_images/jensen_inquality.png)

<br>
<hr>
<br>

# EMアルゴリズム
不完全データから母集団のパラメータ $\boldsymbol{\theta}$ について最尤推定を行う際に用いられる．  
初期値から反復によって最尤推定量を求めるが，このとき各反復での対数尤度 $log\ p(\boldsymbol{x}|\boldsymbol{\theta})$ は単調に増加する．  
  
<br>

$\boldsymbol{x}$: 観測値
$\boldsymbol{y}$: 欠損データ

1. 未知パラメータ $\boldsymbol{\theta}$ の初期値 $\boldsymbol{\theta^{(0)}}$ を与え， $K = 0$ とする
2. $Q_K(\boldsymbol{\theta})$ を計算する: *E Step*
3. $Q_K(\boldsymbol{\theta})$ を最大にする $\boldsymbol{\theta}$ を $\boldsymbol{\theta^{(K + 1)}}$ とする: *M Step*
4. $K \leftarrow K + 1$ としてStep 2に戻り，収束するまで反復

$$
Q_K(\boldsymbol{\theta}) = E_{\boldsymbol{y}|\boldsymbol{x}, \theta^{(K)}}[\log p(\boldsymbol{x}, \boldsymbol{y}|\boldsymbol{\theta})] \\\\
= \int \log p(\boldsymbol{x}, \boldsymbol{y}|\boldsymbol{\theta})p(\boldsymbol{y}|\boldsymbol{x}, \boldsymbol{\theta^{(K)}}) d\boldsymbol{y} \  \  (\leftarrow E(X) = \int xf(x) dx) \\\\
= \int \log p(\boldsymbol{x}, \boldsymbol{y}|\boldsymbol{\theta}) \frac{p(\boldsymbol{x}, \boldsymbol{y}|\boldsymbol{\theta})}{\int p(\boldsymbol{x}, \boldsymbol{y}| \boldsymbol{\theta}) d\boldsymbol{y}} d\boldsymbol{y} \\\\
= \int \log p(\boldsymbol{x}, \boldsymbol{y}|\boldsymbol{\theta}) \frac{p(\boldsymbol{x}, \boldsymbol{y}|\boldsymbol{\theta})}{p(\boldsymbol{x}|\boldsymbol{\theta})} d\boldsymbol{y} \\\\
$$

<br>
<hr>
<br>

# 線形計画法: Linear Programming
$$
制約条件(constraint):\ 
\begin{cases}
a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n \le b_1 \\
a_{21}x_1 + a_{22}x_2 + \dots + a_{2n}x_n \le b_2 \\
\dots & \\
a_{m1}x_1 + a_{m2}x_2 + \dots + a_{mn}x_n \le b_m 
\end{cases}
\\
x_1, x_2, ..., x_3 \ge 0 \\
目的関数(objective function):\ f = c_{1}x_1 + c_{2}x_2 + \dots + c_{n}x_n \rightarrow max
$$

<br>
  
## 線形計画の基本定理
最適解が存在すれば，目的関数は可能領域(凸多面体)の頂点で最大値をとる  
i.e. 目的関数 $f$ が最大となる $x_{\alpha}$ を求めたいなら，凸多面体の頂点の座標のみを調べて $f$ が最大となるものを選べばよい  

考え方  
- $f$ は線形(直線)だから可能領域(凸多面体)内部で極値をとらない    
  i.e. 直線がいずれ衝突する可能領域の面で $f$ は最大となり得る
- n 次元凸多面体の方向への直線の衝突を考える
  - 最も多くの凸多面体へ衝突する直線 = 凸多面体の頂点を通る直線  
    i.e 可能領域内で $f$ を最大にする点は凸多面体の頂点のいずれかである


<br>
<hr>
<br>

# 非線形計画法
## 動的計画法 (Dynamic Programming)
最適経路問題に等しい  

1. $i = 1, ..., n - 1$について，

  $$
  f_{i + 1}(x_{i + 1}) = \max_{x_i}[f_i(x_i) = h_i(x_i, x_{i + 1})]
  $$

  およびその最大値のときの $x_i$ を関数 $\hat{x_i}(x_{i + 1})$ として配列に記憶する．  

2. $f_n(x_n)$ を最大にする $x_n$ の値 $x_n^\ast$ を探索し，その最大値を $J^\ast = f_n(x_n^\ast)$ とする
3. $i = n - 1, ..., 1$ に対して $x_i^\ast = \hat{x_{i + 1}}^\ast$ を計算する
4. $(x_1^\ast, x_2^\ast, ..., x_n^\ast)$ と $J^\ast$ を返す  

i.e, $i = 1$ から $i = n$ まで，すべての $x_i$ について $f(x_i)$ を計算し，$f_{i + 1}(x_{i + 1})$ を最大化する $x_i$ を記録しておき，計算し終わったら，今度は逆に,
$f_{n}$ が最大となる$x_n$を選び，$i = n$ から $f_i(x_i)$ を最大にする $x_{i - 1}$ を辿っていくと，辿った $x_n, ..., x_1$ が最適解である．  

<br>
<hr>
<br>

# 多項式
## 係数表現
次数上界 $n$ の多項式 $A(x) = \sum_{j=0}^{n-1} {a_{j}x^{j}}$ の係数ベクトル $a = (a_0, a_1, ..., a_{n-1})$ を $A(x)$ の係数表現という．  

## Hornerの公式 (Horner's rule)
与えられた点 $x = x_0$ における $A(x)$ の評価 (evaluation of a polynominal) = $A(x_0)$ はHornerの公式を用いて $\Theta(n)$ 時間で計算できる  

$$
A(x_0) = a_0 + x_0(a_1 + x_0(a_2 + \cdots + x_0(a_{n-2} + x_0(a_{n-1}))\cdots))
$$

## 座標表現
次数上界 $n$ の多項式 $A(x)$ に対して n 個の座標 (point-value pair) の集合  

$$
{(x_0, y_0), (x_1, y_1), ..., (x_{n-1}, y_{n-1})}
$$

を $A(x)$ の座標表現 (point-value representation) という ($y_k = A(x_k)$)．

<br>

# 離散フーリエ変換(DFT; discrete Fourier transform)
次数上界 $n$ の多項式 $A(x)$ の 1 の複素 n 乗根 $\omega_n^0, \omega_n^1, ..., \omega_n^{n-1}$ での評価 $y = (y_0, y_1, ..., y_{n-1}) = DFT_n(a)$  

$$
y_k = A(\omega_n^k) = \sum_{j=0}^{n-1}{a_j\omega_n^{kj}}
$$

i.e.  

$$
\left(
  \begin{array}{c}
    y_0 \\
    y_1 \\
    y_2 \\
    y_3 \\
    \vdots \\
    y_{n-1} 
  \end{array}
\right) = 
\left(
  \begin{array}{cccccc}
    1 & 1 & 1 & 1 & \cdots & 1 \\
    1 & \omega_n & \omega_n^2 & \omega_n^3 & \cdots & \omega_n^{n-1} \\
    1 & \omega_n^2 & \omega_n^4 & \omega_n^6 & \cdots & \omega_n^{2(n-1)} \\
    1 & \omega_n^3 & \omega_n^6 & \omega_n^9 & \cdots & \omega_n^{3(n-1)} \\
    \vdots & \vdots & \vdots & \vdots & \ddots & \vdots \\
    1 & \omega_n^{n-1} & \omega_n^{2(n-1)} & \omega_n^{3(n-1)} & \cdots & \omega_n^{(n-1)(n-1)} \\
  \end{array}
\right) 
\left(
  \begin{array}{c}
    a_0 \\
    a_1 \\
    a_2 \\
    a_3 \\
    \vdots \\
    a_{n-1} \\
  \end{array}
\right)
$$


<br>

# 高速フーリエ変換(FFT; fast Fourier transform)
1 の複素根の性質を利用して DFT を $\Theta(nlgn)$ で計算する．  
-> 通常係数表現で $\Theta(n^2)$ 時間の多項式の乗算を $\Theta(nlgn)$ 時間で計算できる．  

<br>

# 係数表現された多項式の高速乗算
係数表現
- ($a_0, a_1, ..., a_{n-1}$)
- {$b_0, b_1, ..., b_{n-1}$}
  
↓ 評価(<b>DFT</b>): $\Theta(nlgn$)  
  
座標表現
- $A(\omega_{2n}^0), B(\omega_{2n}^0)$  
  $A(\omega_{2n}^1), B(\omega_{2n}^1)$  
  $\vdots$  
  $A(\omega_{2n}^{2n-1}), B(\omega_{2n}^{2n-1})$  
  
↓ 座標上の乗算: $\Theta(n)$
  
- $C(\omega_{2n}^0)$  
  $C(\omega_{2n}^1)$  
  $\vdots$  
  $C(\omega_{2n}^{2n-1})$  
  
↓  補間 (**逆DFT**): $\Theta(nlgn)$

<br>
<hr>
<br>

# 中国人剰余定理 (Chinese remainder theorem)
任意の $a \in \mathbb{Z}_n$ に対して（一意となる）対応 $a \leftrightarrow (a_1, a_2, ..., a_k)$ を考えると，$a_i \in \mathbb{Z_n}_i$ は $a_i = a\ mod\ n_i$ である．   
i.e. 法 $n$ の下で演算 $\oplus$ について閉じている数 $a$ は，$a$ を，$n$ を構成する各素数 $n_k$ で割ったときの剰余 $a_i$ の組合せによって一意に定まる．（$a_i$ は線形代数でいう基底ベクトル）   
  
## 応用
ビット演算の回数の点では，法 $n$ の下で計算するより，各 $\mathbb{Z_n}_i$ 上で計算する方が効率が良いため，効率の良いアルゴリズムの設計に利用できる．

<br>

# フェルマの定理 (Fermat's Theorem)
$p$ を任意の素数とする．すべての $a \in \mathbb{Z^*_p}$ に対して  

$$
a^{p-1} \equiv 1\ (mod\ p)
$$
  
## 注意  
$p$ が素数ならば必ず $a^{p-1} \equiv 1\ (mod\ p)$ となるが，$a^{n-1} \equiv 1\ (mod\ n)$ となる合成数も存在するので，$a^{n-1} \equiv 1\ (mod\ n)$ となる $n$ が必ず素数というわけではない．  
-> 疑似素数判定


# 原始根 (primitive root)
$ord_n(g) = \lvert \mathbb{Z^\ast_n} \rvert$ ならば，$\mathbb{Z^\ast_n}$ のすべての要素は法 $n$ の下で $g$ のべき乗である（$g^1 \ mod \ n, g^2 \ mod \ n, ..., g^{n-1} \ mod \ n$ で $1...n - 1$ をすべて表せる）．  
$g$ を $\mathbb{Z^\ast_n}$ の **原始根(primitive root)** あるいは **生成元(generator)** という．  
e.g. 3は法7の下で原始根だが，2は法7の下で原始根ではない．  
e.g. $\omega_8 = e^{2 \pi i / 8}$ は1の原始8乗根

# 離散対数 (discrete logarithm)
$g$ を $\mathbb{Z^\ast_n}$ の原始根，$a \in \mathbb{Z^\ast_n}$ のとき，$g^z \equiv a\ (mod\ n)$ を満たす $z$ を，$n$ を法とし $g$ を底とする **離散対数(discrete logarithm)** あるいは $a$ の **指数(index)** と呼び，$ind_{n,g} (a)$ で表す．
    
e.g.   
原始根 $g = 3$, 法 $n = 7$ とするとき，$a = 6$ となるのは $3^3\ mod\ 7 = 6$ なので $z = ind_{7,3} = 3$．

<br>

# ラグランジュの未定乗数法 (Lagrange multiplier)
束縛条件のもとで最適化を行うための数学(解析学)的な方法．  
ラグランジュ関数 $L(x, y, \lambda) = f(x) - \lambda(g(x))$ の微分が 0 の点，すなわち極値について解くため，厳密にはそのときの $x$ と $y$ が $f(x)$ を最大あるいは最小にすることは保証されていない（ $f(x)$ の形状に依る）．  

e.g. $x^2 + y^2$ のもとで $f(x, y) = 2x + 3y$ の最大値を求める    

$$
L(x, y, \lambda) = 2x + 3y - \lambda(x^2 + y^2 - 1)\\\\
\frac{\partial L}{\partial x} = 2 - 2x\lambda = 0\\\\
\frac{\partial L}{\partial y} = 3 - 2y\lambda = 0\\\\
\frac{\partial L}{\partial \lambda} = -x^2 - y^2 + 1 = 0\\\\
$$

これを解いて

$$
(x, y) = (\pm\frac{2}{\sqrt{13}}, \pm\frac{3}{\sqrt{13}})
$$  

<br>

# フーリエ級数 (Fourier series)

<br>

# フーリエ変換 (Fourier transform)
信号空間の座標変換
- 特に，基底ベクトル $a_i(t)$ を，信号空間に属する別の基底ベクトル $A_i(\omega)$ に置き換えること

<br>

# 時間と周波数の不確定性関係
$\Delta t\Delta\omega \ge \frac{1}{2}$  
e.g. 時間-周波数領域が $T-W$ の信号空間の次元数 (信号の個数) は $TW / \frac{1}{2} = 2TW$ である．（面積 $TW$ を信号 1 個あたりの面積 $\frac{1}{2}$ で割る）


<hr>

# Role-Oriented Programming

*Role-Oriented Programming* describes *can* and *has-a* relationship other than *is-a* relationship.   
It can be implemented by *trait*s or *mixin*s.  

