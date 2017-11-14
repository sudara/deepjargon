# Deep Jargon

Coming to Neural Networks from another programming field can be pretty daunting. I created this glossary to help keep things straight as well as to illustrate that things usually sound much worse than they are.

Although "naming things" is purported to be one of the [2 hard things in computer science](https://martinfowler.com/bliki/TwoHardThings.html):

1. It's highly incentivized in academia to name anything remotely novel, even if it's useless (first!!!)
2. Deep Learning has high profile competitions in which you get to stake your branded flag in the ground.
3. The field is moving fast and furiously, with buy-in from all major tech companies

So apparently naming things is like totes easy now. Aaaaand oh look! We are drowning in a sea of complex, sophisticated sounding pieces of jargon that are often fairly straightforward modifications to a few basic recipes.

Ironically, this can make Deep Learning more difficult to actually... learn. You know, as a human. Additionally, a community filled with state-of-the-art jargon can artificially inflate the gap between the [in and the outgroups](https://en.wikipedia.org/wiki/Ingroups_and_outgroups), raising the perceived bar higher to be a part of the cool kids club.

Rest assured: This stuff is basically like bread baking, right? It's totally a straightforward science, kind-of-sort-of. Ok, but we can say this for sure: it takes a good amount of practice to do it well. There are a shit-ton of variations of bread from all sorts of countries with all sorts of complicated names. Some bread has eggs, other breads have leaveners of different varieties, others have specific seed mixtures on top or specific ways they need to be slashed.

But all you really need at the end of the day is flour and water. You know, matrix multiplications and GPUs....uh...wait, does this analogy not actually hold up? Shit. Good thing this is just some README. If anyone complains, I'll rename to DONT_README.md and we'll be all good.

Anyway, if you are like me, and are determined to jump into the deep end without a PhD advisor in sight to hold your hand: enjoy! You will be saved years of [grad student descent](https://deepjargon.com/grad-student-descent) and instead are free to ponder how you can make deep learning work for you. Or run away crying because you've totally had it up to here with terms that end in "Net" and you actually need 5 GPUs and a team of 10 to accomplish anything useful whatsoever.

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

