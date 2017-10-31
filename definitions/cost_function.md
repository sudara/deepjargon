## [Cost Function](#cost-function)

How well the [model](#model) fits the [dataset](#dataset).

A way to measure the accuracy of predictions.

Usually involves averaging the difference between the [ground truth](#ground-truth) values and the predicted values.

As [3blue1brown](#3blue1brown) puts it:

> A single measure of lousiness based on the training examples

You might recognize it in a form such as:

$$
J = -\frac{1}{m}\sum_{i=1}^{m}y^{(i)}\log(a^{(i)})+(1-y^{(i)})\log(1-a^{(i)})
$$