## [Padding](#padding)

The [convolutional](#convolve) process shrinks the input images, since they aggregate values from a chunk of the image at at time. Padding ensures the dimensions of input images stay the same.

Additionally, without padding, the information on the edges of the image wouldn't be as strongly represented in the output.

To calculate the image size after convolution with padding:

```
n + 2p - f + 1
```

Where `n` is the dimension, `p` is the padding amount, `f` is the [filter](#filter) size.