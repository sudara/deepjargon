# Deep Jargon

Coming to Neural Networks from another programming field can be pretty daunting. I created this glossary to help keep things straight as well as to illustrate that things usually sound much worse than they are.

Although "naming things" is purported to be one of the [2 hard things in computer science](https://martinfowler.com/bliki/TwoHardThings.html), apparently:

1) It's highly incentivized in academia to brand anything remotely novel (first!) and
2) In deep learning in particular, there's a literal race to win competitions and stake your branded flag in the ground.

This results in a slew of complex, sophisticated sounding pieces of jargon that are often just straightforward modifications to a few basic recipes.

Ironically, this can make Deep Learning more difficult to actually... learn. You know, as a human. Additionally, an community filled with state-of-the-art jargon artificially inflates the gap between the [in and the outgroups](https://en.wikipedia.org/wiki/Ingroups_and_outgroups), making the perceived bar higher to be a part of the cool kids club.

But rest assured: This stuff is basically like bread baking. It's a straightforward science, sort of. But for great results, it's an art that takes a good amount of practice. There are a shit-ton of variations of bread from all sorts of countries with all sorts of complicated names. Some bread has eggs, other breads have leaveners of different varieties, others have specific seed mixtures on top. But all you really need is flour and water. You know, matrix multiplications and GPUs....uh...wait, does this analogy not really hold up? Shit. Good thing this is just some README. I'll just rename to DONT_README and we'll be all good.

Anyway, if you are like me, and determined to jump into the deep end without a PhD advisor in sight to reassure you: enjoy! You will be saved years of [grad student descent](#https://deepjargon.com/grad-student-descent) and instead are free to ponder how you can make deep learning work for you and/or run away crying because you've totally had it up to here with terms that end in "Net".

Please do add corrections as pull requests!

## Adding or Editing Definitions

You'll want to:

1) Fork the Project
2) Add or edit [the markdown files in the /definitions directory](https://github.com/sudara/deepjargon/tree/master/definitions).
3) Create a Pull Request

Markdown templates look like so:

```
## [Thing Being Defined](#thing-being-defined)

Text definition about what it does and maybe a contextually related [term](#term).

Link to some [other definition](#other-definition).

---
1. Visit [External link](http://google.com) on Google.
2. Watch [Some Video](http:///coursera.com/video/link) on Coursera.
```

## Style Guide

1. Humor is welcome
2. Concise and plain language is encouraged. Aim for one-liners.
3. Multiple short "angles" or contexts is nice.
4. Avoid using part of the term in the definition (for example, the word "cost" when defining "cost function")
5. Code and math blocks are encouraged to supplement words
6. Link to (instead of define) sub terms and related terms that the definition depends on. For example, Regression should link to, but not explain Linear Regression.
7. External links (wikipedia, coursera, etc) belong in the footnotes, not the definition body.
8. Definitions should be singular.

## A Simple Little App

Stupid simple Rails app in back.
Stupid simple Vue.js app in the front.

This is the flow:

1. Concatenate markdown in the [definitions](https://github.com/sudara/deepjargon/tree/master/definitions) directory...
2. Compile it to json...
3. Dump it in the html for vue.js to use...
4. Write out a file for the front end server to cache.

## Installation

```
brew install yarn
gem install bundler
bundle install
yarn install
```

## Running

Run `bundle exec rails s` in terminal.

View http://localhost:3000 in the browser.

