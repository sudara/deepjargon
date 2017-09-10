## [Dot Product](#dot-product)

Matrix Multiplication. *Not* the element-wise product. In numpy

```
a = np.random.randn(3, 3)
b = np.random.randn(3, 1)
a.dot(b) # dot product, results in matrix with shape (3, 1)
np.dot(a,a) # identical to above
a * b # element-wise multiplication, results in shape (3, 3)
```