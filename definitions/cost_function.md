## [Cost Function](#cost-function)

A way to measure the accuracy of predictions.

Usually involves averaging the difference between the [ground truth](#ground-truth) values and the predicted values.


$$
J = -\frac{1}{m}\sum_{i=1}^{m}y^{(i)}\log(a^{(i)})+(1-y^{(i)})\log(1-a^{(i)})
$$