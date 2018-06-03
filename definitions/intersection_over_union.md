##[Intersection Over Union (IoU)](intersection-over-union)

Function that takes 2 bounding boxes and calculates the ratio of area that overlaps (intersection) to the total area in both boxes (union).

The two bounding boxes are the [ground truth](#ground-truth) and the [preduction](#y-hat) for [object detection](#object-detection). 

When the ratio is larger than 0.5, then it's often considered accurate enough to say the preduction is accurate. 