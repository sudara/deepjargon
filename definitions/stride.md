## [Stride](#stride)

The amount (in number of pixels) that you move a [filter](#filter).

The larger the stride, the more the output dimensions will shrink, as the filter is applied fewer times on the source image (and there is less overlap).

When the stride is larger than 1, you can calculate the output dimensions with:

```
(n + 2p - f) / s + 1
```

Where `n` is the dimension, `p` is the padding amount, `f` is the [filter](#filter) size.