---
title: "Note: Hands-on ML"
categories:
  - Note
tags:
  - Machine Learning
last-modified-at: 2021-07-10
---

# Chapter 02: End-to-End Machine Learning Project

- Grid Search

# Chapter 03: Classification

- MNIST
- Stochastic Gradient Descent Classifier; SGDClassifier
- RandomForestClassifier
- One vs One; OvO
- One vs Rest; OvR
- Support Vector Machine Classifier; SVC

<br>

- Multilabel Classification
  - KNeighborsClassifier

# Chapter 04: Training Models
- Linear Regression

ways to train models
- Using a direct "closed-form" equation that directly computes the model parameters
- Using an iterative optimization approach called *Gradient Descent; GD*

## By closed-form equation

- Normal Equation
- SVD

## GD

- Batch GD
- SGD
- Mini-batch GD

Batch 

## Regularized Linear Models

- Ridge Regression (Tikhonov regularization)
- Lasso Regression; Least Absolute Shrinkage and Selection Operator Regression
- Elastic Net

<br>

- Early Stopping


<br>

## Logistic Regression

- classification
  - estimate the probability that an instance belongs to a particular class
- sigmoid function

<br>

- Softmax Regression
  - cross entropy cost function


<br>

# Chapter 05: Support Vector Machines

- Kernel trick

<br>

- Linear SVC
- Polynomial SVC
  - Polynomial Kernel
  - Gaussian RBF Kernel
    - Gaussian Radial Basis Function


<br>

- SVM Regression


<br>

# Chapter 06: Decision Trees

## Decision Trees

fundamental components of Random Forests

### Usecases

- classification
- regression
- multioutput
- fitting complex datasets

## Key Factors

- *Gini impurity*
- entropy


### Training Algos

algos to make Decision Trees

- the CART training Algorithm



<br>

# Chapter 07: Ensemble Learning and Random Forests

## Key concept

- the law of large numbers

<br>

- bagging; *bootstrap aggregating*: with replacement
- pasting: without replacement

<br>

- BaggingClassifier
- RandomForestClassifier
  - computes feature importances

<br>

## Ensemble Methods

- Random Forest
- Boosting (hypothesis boosting)
  - AdaBoosting
    - I cannot understand the reason why *weight update rule* is that.
  - Gradient Boosting
    - GBRT; Gradient Boosted Regression Trees
      - GradientBoostingRegressor
      - *shrinkage*
- Stacking; stacked generalization


<br>

# Chapter 08: Dimensionality Reduction

## PCA; Principal Component Analysis

projects data onto low-dimensional hyperplane.

<br>

# Chapter 09: Unsupervised Learning Techniques

## Clustering

- KMeans
- DBSCAN
- GMM; Gaussian Mixture Model
  - minimize *theoritical information criterion*
    - BIC; Bayesian information criterion
    - AIC; Akaike information criterion

<br>

# Chapter 10: Introduction to Artificial Neural Networks with Keras

$h_{\boldsymbol W, \boldsymbol b}(\boldsymbol{X}) = \phi(\boldsymbol{X} \boldsymbol{W} + \boldsymbol{b})$

- $\boldsymbol{X}$: $instances \times features$
- $\boldsymbol{W}$: $input neuron \times artificial \ neuron \ in \ the \ layer$
- $\boldsymbol{b}$: bias
- $\phi$: *activation function*

## Use Cases

- Regression
- Classification


## Loss Functions

- MSE; Mean Squared Error
- MAE: Mean Absolute Error
- Huber: mix MSE and MAE


<br>

# Chapter 11: Training Deep Neural Networks

## Optimizers

- modify gradient updating for fast converge and better performance
- learning rate is constant

<br>

- Momemtum Optimization
- Nesterov Accelerated Gradient
- AdaGrad
- RMSProp
- Adam
  - AdaMax
  - Nadam

## Learning Rate Schedules

- learning rate is variable
  - update learning rate per epochs or iterations

<br>

- Power scheduling
- Exponential scheduling
- Piecewise constant scheduling
- Performance scheduling
- 1cycle sheduling

<br>

## Regularization to avoid overfitting

- $l_1$, $l_2$ regularization
- dropout
- mote carlo (MC) dropout
- max-norm


<br>

# Chapter 14: Deep Computer Vision Using Convolutional Neural Networks

## Computer Vision Tasks

- classification
- localization
- object detection = classification + localization for moltiple objects
  - non-max suppression
  - FCN; Fully Convolutional Network
  - bounding box
- segmentation: each pixel is classified
  - semantic segmentation
  - instance segmentation


## Classification
### Layers

- Convolutional layers
- Pooling layers
  - max pooling*
  - average pooling
  - global average pooling

### Architechtures

- LeNet-5 (1998)
- AlexNet (2012)
  - local response normalization; LRN
- GoogLeNet (2014)
  - inception modules
- VGGNet (2014)
- ResNet (2015)
  - residual unit; RU
- Xception (2016)
  - depthwise separable convolution layer
- SENet; Squeeze-and-Excitation Network (2017)
  - SE block


## Object Detection

- non-max suppression
- FCN; Fully Convolutional Network
### Architechtures

- YOLO; You Only Look Once

### Metrics

- mAP; Mean Average Precision


## Semantic Segmentation

- upsampling layer
  - transpose convolution layer



<br>

# Chapter 15: Processing Sequences Using RNNs and CNNs

- BPTT; backpropagation through time

## Unstable Gradient Problem

- layer normalization

## Short-Term Memory Problem

- LSTM (Long Short-Term Memory) cells
  - GRU (Gated Recurrent Unit) cells
- 1D convolution layers to shorten sequences
- WaveNet

<br>

# Chapter 16: Natural Language Processing with RNNs and Attention

- RNNs
- truncated backpropagation through time

## Architechtures

- Char-RNN
- Stateful RNN
- Encoder-Decoder
- Bidirectional RNN
- Beam Search

- Attention mechanisms
  - can translate long sentences


<br>

# Chapter 17: Representation Learning and Generative Learning Using Autoencoders and GANs

- Autoencoder
- GANs; generative adversarial networks

## GANs

- generator
- descriminator

## Architecture

- deep convolutional GANs; DCGANs

## Algorithms

- on-policy algorithms
  - PC (policy gradients) algorithms
    - Q-Value Iteration
- off-policy algorithms
  - Q-Learning

<br>

- DQN; Deep Q-Network (DNN using Q-Values)
  - DQL; Deep Q-Learning (DQN using Approximate Q-Learning)