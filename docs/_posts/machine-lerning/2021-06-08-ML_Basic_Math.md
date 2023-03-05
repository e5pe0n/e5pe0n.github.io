---
title: "Note: ML Basic Math"
categories:
  - Note
tags:
  - Machine Learning
---

# Bayes' Theorem

$$
\underbrace{p(\boldsymbol{x} \mid \boldsymbol{y})}_{posterior}  = \frac{\overbrace{p(\boldsymbol{y} \mid \boldsymbol{x})}^{likelihood} \overbrace{p(\boldsymbol{x})}^{prior}}{\underbrace{p(\boldsymbol{y})}_{evidence}} \\
$$

<br>


- $p(\boldsymbol{x})$: prior
  - encapsulates our subjective prior knowledge of the **unobserved** (latent) variable $\boldsymbol{x}$ before observing any data
- $p(\boldsymbol{y})$: evidence / marginal likelihood
  - $p(\boldsymbol{y}) = \int p(\boldsymbol{y} \mid \boldsymbol{x}) p(\boldsymbol{x}) \, d \boldsymbol{x} = \mathbb{E_{X}} [p(\boldsymbol{y} \mid \boldsymbol{x})]$


<br>

# Gaussian Distribution

$$
p(x \mid \mu, \sigma^2) = \frac{1}{\sqrt{2 \pi \sigma^2}} \exp \left[-\frac{(x - \mu)^2}{2 \sigma^2} \right]
$$

$$
p(\boldsymbol{x} \mid \boldsymbol{\mu}, \Sigma) = (2 \pi)^{-\frac{D}{2}} \lvert \Sigma \rvert \exp \left[ - \frac{1}{2}  (\boldsymbol{x} - \boldsymbol{\mu})^{\top} \Sigma^{-1} (\boldsymbol x - \boldsymbol \mu) \right]
$$

<br>


# Models

## Predictor as a Function

### MLE; Maximum Likelihood Estimation

$$
\mathcal {L_x} (\boldsymbol{\theta}) = - \log{p(\boldsymbol{x} \mid \boldsymbol{\theta})}
$$


### MAP Estimation; Maximum A Posteriori Estimation

$$
p(\boldsymbol{\theta} \mid \boldsymbol{x}) = \frac{p(\boldsymbol{x} \mid \boldsymbol{\theta}) p(\boldsymbol{\theta})}{p(\boldsymbol{\theta})} \\
p(\boldsymbol{\theta} \mid \boldsymbol{x}) \propto p(\boldsymbol{x} \mid \boldsymbol{\theta}) p(\boldsymbol{\theta})
$$

## Predictor as a Distribution

### Bayesian Inference

posterior is

$$
p(\boldsymbol{\theta} \mid \mathcal{X}) = \frac{p(\mathcal{X} \mid \boldsymbol{\theta}) p(\boldsymbol{\theta})}{p(\mathcal{X})} \\
p(\mathcal{X}) = \int {p(\mathcal{X} \mid \boldsymbol{\theta}) p(\boldsymbol{\theta})}\, d \boldsymbol{\theta}
$$

predictor is

$$
p(\boldsymbol{x}) = \int p(\boldsymbol{x} \mid \boldsymbol{\theta})p(\boldsymbol{\theta})\, d \boldsymbol{\theta} = \mathbb{E_{\boldsymbol{\theta}} [p(\boldsymbol{x} \mid \boldsymbol{\theta})]}
$$

<br>


# Dimensionality Reduction

## PCA; Principal Component Analysis

$$
\tilde{\boldsymbol X}_{M} := \argmin_{rk(\boldsymbol{A}) \le M} \left\| \boldsymbol{X} - \boldsymbol{A} \right\|_2 \in \mathbb R^{D \times N}
$$

$$
\boldsymbol{X} = \boldsymbol{U} \boldsymbol{\Sigma} \boldsymbol{V} \\
\tilde{\boldsymbol{X}_M} = \underbrace{\boldsymbol{U}_M}_{D \times M} \underbrace{\boldsymbol{\Sigma}_M}_{M \times M} \underbrace{\boldsymbol{V}^{\top}_{M}}_{M \times N} \in \mathbb R^{D \times N}
$$


# Density Estimation

## EM Algorithm; Expectation Maximization Algorithm

- E-step: Evaluate expected log-likelihood

$$
Q(\boldsymbol{\theta} \mid \boldsymbol{\theta}^{(t)}) = \mathbb E_{\boldsymbol{z} \mid \boldsymbol{x}, \boldsymbol{\theta^{(t)}}} \left[\log p(\boldsymbol{x}, \boldsymbol{z} \mid \boldsymbol{\theta}) \right] \\
= \int \log p(\boldsymbol{x}, \boldsymbol{z} \mid \boldsymbol{\theta}) p(\boldsymbol{z} \mid \boldsymbol{x}, \boldsymbol{\theta}^{(t)})\, d\boldsymbol{z}
$$

- M-step: Select an updated set of model parameters $\boldsymbol{\theta}^{(t + 1)}$

$\boldsymbol{z}$: latent variable

### Note:

There are no guarantees that EM converges to the maximum likelihood solution i.e., it is possible that EM algorithm converges to a local maximum.  



