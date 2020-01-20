# Generator Gulp Foundation Emails

> Yeoman generator for creating responsive emails using [ZURB Foundation for Emails 2 framework](http://foundation.zurb.com/emails.html).

## Changelog

**0.2.1**
* replaced `gulp-sass` to `gulp-dart-sass`
* build packages updated to the latest version

**0.2.0**
* added HEML support
* build packages updated to the latest version

## Requirements

* [Node.js](http://nodejs.org/)
* [Yeoman](http://yeoman.io/)
```
npm install -g yo
```

## Built-in tools

* [Gulp](http://gulpjs.com/) (Task Manager)
* [Sass](http://sass-lang.com/) (CSS Preprocessor)
* [Browsersync](https://www.browsersync.io/) (livereload)

## Template systems (on your choice)

1. [Pug (Jade)](https://pugjs.org) template engine
2. Inky + Panini template engine ([ZURB framework](http://foundation.zurb.com/emails.html))
3. Pure HTML
4. [HEML](https://heml.io/) (with inline css only)
<!-- 5. Cerberus
6. mjml -->

## Built-in features

* ZURB Foundation for Emails 2 responsive email templates
* Webserver with liverelaod
* Sass compilation (SCSS)
* CSS concating and inlining
* Minifying images

## Installation guide

1. Install via npm `npm install -g generator-gulp-foundation-emails`
2. Create folder for your project and run inside: `yo gulp-foundation-emails`
3. Complete installation

## Usage

Package.json contains some useful NPM tasks:

1. `npm run serve` for development with livereload
2. `npm run build` for building from sources to `dist` folder

## Contributors
 * Roman Sukochev (rsukochev@yandex.com)
