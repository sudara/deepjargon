## [Mini-batch](#mini-batch)

A small number of [training examples](#training-example) that you will be sending to the network each [iteration](#iteration).

Usually a group of 64, 128, 512, 1024 examples, or whatever will fit into GPU/CPU memory.

Unlike [batch gradient descent](#batch-gradient-descent), weights and biases will be updated based on partial chunks of the dataset, never the whole dataset at once.

See: [Batch Size](#batch-size)