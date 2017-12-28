## [Initialization](#initialization)

[Neuron](#neuron)s need to start off with some kind of value for their [weights](#weight) and [biases](#bias).

We can set the biases to 0, but if the weights are 0, they won't [break symmetry](#break-symmetry). So we need to set them to random numbers such as with Xavier or [He initialization](#he-initialization).

---
1. Read [Initialization](http://cs231n.github.io/neural-networks-2/#init) on cs231n