## [Sigmoid](#sigmoid)

One of the original [activation functions](#activation-function). Usually avoided in modern networks.

S shaped. Range of 0 to 1.

Causes [vanishing gradients](#vanishing-gradient).

$$
{\displaystyle f(x)={\frac {1}{1+e^{-x}}}}
$$

In python:

```
1 / (1 + np.exp(-x))
```