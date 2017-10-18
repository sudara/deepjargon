## [Vanishing Gradient Problem](#vanishing-gradient)

When you keep multiplying numbers over and over again, they tend to explode or get really small. This happens to the derivatives in neural networks, especially when using activation functions like [sigmoid](#sigmoid): the weights get flattened out until there is no longer any slope.