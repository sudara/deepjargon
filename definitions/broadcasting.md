## [Broadcasting](#broadcasting)

[NumPy](#numpy) technique to make array and matrix arithmetic easier.<sup>1</sup>

It implicitly stretches the smaller scalar, array, or matrix to match the shape of the larger one.

```
>>> a = array([1.0,2.0,3.0])
>>> b = 2.0
>>> a * b
array([ 2.,  4.,  6.])
```

---
1. Read the [NumPy Docs](https://docs.scipy.org/doc/numpy-1.13.0/user/basics.broadcasting.html)