## [Batch Size](#batch-size)

The number of [training examples](#training-example) sent to the network at once, in one [iteration](#iteration).

The more data you try and process at once, the more parallel computing power you will need. Batches spread learning into smaller more manageable datasets. A batch is like a single day at school for the machine.

[Mini-batches](#mini-batch) usually have sizes of 64, 128, 512, 1024 – whatever will fit into GPU/CPU memory.

Batches make up an [epoch](#epoch).