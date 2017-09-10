# Deep Jargon

## This is a simple app

Stupid simple Rails app in back. Stupid simple Vue.js app in the front. It takes markdown in the `app/views/definitions` directory, compiles it to json and dumps it in the html for vue to use.

## Installation

`brew install yarn`

## Running

Run `bundle exec rails s` in terminal.

View http://localhost:3000 in the browser.


## Want to add definitions or fix a typo?

You'll want to:

1) Fork the Project
2) Add or edit [the markdown files in the app/views/definition directory](https://github.com/sudara/deepjargon/tree/master/app/views/definitions).
3) Create a Pull Request

Markdown templates look like so:

```
## [Thing Being Defined](#thing-being-defined)

Text definition. [External link](http://google.com) or link to [other definition](#other-definition).

