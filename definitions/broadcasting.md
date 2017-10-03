## [Broadcasting](#broadcasting)

[NumPy](#numpy) technique to make array and matrix arithmetic easier.<sup>1</sup>

It stretches the smaller scalar, array, or matrix to match the shape of the larger one, without us having to do any work.

```
>>> from numpy import array
>>> a = array([1,2,3])
>>> b = 2 # will be broadcast and stretched to a 3 item array
>>> a * b
array([2, 4, 6])
```

---
1. Read the [NumPy Docs](https://docs.scipy.org/doc/numpy-1.13.0/user/basics.broadcasting.html)