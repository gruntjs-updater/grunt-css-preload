# grunt-css-preload

> Automatically add an image preload rule to your stylesheets.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-preload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-preload');
```

## The "csspreload" task

### Overview
This task scans your stylesheet AST for any declared URL, and preload them using the display:none trick on a typically unused but always present selector (by default, `body:after`).

In your project's Gruntfile, add a section named `csspreload` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  csspreload: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.extraUrls
Type: `Array<String>`
Default value: `[ ]`

An array of any extra file that you wish to include in the preload entry.

#### options.extensions
Type: `Array<String>`
Default value: `[ '.png', '.jpg', '.jpeg', '.bmp', '.gif' ]`

An array of the extensions that should be considered for preload.

#### options.selector
Type: `String`
Default value: `'body:after'`

The selector that should host the preloading rule.

#### options.extendSource
Type: `Boolean`
Default value: `true`

If true, the output will contain the original concatenated source code before the preloading rule. Otherwise, the output will only contain the preloading rule.

Note that this plugin doesn't check to see if a preloading rule already exists - so multiple invocations of the csspreload task with the `extendSource` option set might make the file grow linearly.

### Usage Examples

#### Default Options
```js
grunt.initConfig({
  csspreload: {
    options: {},
    files: {
      'build/output.css': ['build/output.css'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
1.0.0 Initial release
