# Deep Jargon

## A Simple Little App

Stupid simple Rails app in back. Stupid simple Vue.js app in the front. It takes markdown in the `app/views/definitions` directory, compiles it to json and dumps it in the html for vue to use.

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
2) Add or edit [the markdown files in the app/views/definition directory](https://github.com/sudara/deepjargon/tree/master/app/views/definitions).
3) Create a Pull Request

Markdown templates look like so:

```
## [Thing Being Defined](#thing-being-defined)

Text definition. [External link](http://google.com) or link to [other definition](#other-definition).
```

## Style Guide

1. Humor is welcome
2. Concise and plain language is encouraged. Aim for one-liners.
3. Multiple short "angles" or contexts is nice.
4. Don't use part of the term in the definition (for example, don't use the word "cost" when defining "cost function")
5. Code and math blocks are encouraged to supplement words
6. Link to (instead of define) sub terms and related terms. For example, Regression should link to, but not explain Linear Regression.
7. External links (wikipedia, coursera, etc) belong in the footnotes, not the definition body.

