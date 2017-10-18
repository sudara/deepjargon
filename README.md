# Deep Jargon

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
