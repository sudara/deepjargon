## [Initialization](#initialization)

[Neuron](#neuron)s need to start off with some kind of bullshit value for their [weights](#weight) and [biases](#bias).

We can set the biases to 0, but if the weights are 0, they won't [break symmetry](#break-symmetry). So we need to set them to random numbers such as with Xavier or [He initialization](#he-initialization).