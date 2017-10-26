## [Dropout](#dropout)

My personal university status. Don't do this, or you'll never be a Hero Of Deep Learning.

Popular [regularization](#regularization) technique. Randomly shuts down a percentage of neurons during each [iteration](#iteration).

By masking individual neurons, they are discouraged from being individually relied upon, as they might not be available on each iteration.

Technically this means each iteration is training a different model. Mind blown?

"Inverted dropout" is the common implementation, which ensures that the [cost function](#cost-function) returns the same value with or without the dropped neuron values.

---
1. Watch [Dropout Regularization](https://www.coursera.org/learn/deep-neural-network/lecture/eM33A/dropout-regularization) on Coursera.