# fs-extra

`fs-extra` adds file system methods that aren't included in the native `fs` module and adds promise support to the `fs` methods. It also uses [`graceful-fs`](https://github.com/isaacs/node-graceful-fs) to prevent `EMFILE` errors. It should be a drop in replacement for `fs`.

[![npm Package](https://camo.githubusercontent.com/c4ba0cccf0964a58385fa52013d118ff1b71cf712ad9ab0be98f289ae3ce8405/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f66732d65787472612e737667)](https://www.npmjs.org/package/fs-extra) [![License](https://camo.githubusercontent.com/87d155628d3ea94b0a5b913bdc71806dd10c511a81850ac0c50ad91a5a6afba2/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f66732d65787472612e737667)](https://github.com/jprichardson/node-fs-extra/blob/master/LICENSE) [![build status](https://camo.githubusercontent.com/8e605a60a6f03f980514c9cbf79086a8b73231b2625ba06999d7ab501c85d62f/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f776f726b666c6f772f7374617475732f6a7072696368617264736f6e2f6e6f64652d66732d65787472612f4e6f64652e6a7325323043492f6d6173746572)](https://github.com/jprichardson/node-fs-extra/actions/workflows/ci.yml?query=branch%3Amaster) [![downloads per month](https://camo.githubusercontent.com/766a1f5e63ddbf4a300dd937dd09f315ce90278007a5b3a33c5a4f3b7fbe4ef4/687474703a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f66732d65787472612e737667)](https://www.npmjs.org/package/fs-extra) [![JavaScript Style Guide](https://camo.githubusercontent.com/bde227e3207c7143032c0feb73889ffbda8eb1ef234b820b915ccaf74f9c66d7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64655f7374796c652d7374616e646172642d627269676874677265656e2e737667)](https://standardjs.com/)

## Why?

I got tired of including `mkdirp`, `rimraf`, and `ncp` in most of my projects.

## Installation

```shell
npm install fs-extra
```

## Usage

`fs-extra` is a drop in replacement for native `fs`. All methods in `fs` are attached to `fs-extra`. All `fs` methods return promises if the callback isn't passed.

You don't ever need to include the original `fs` module again:

```javascript
const fs = require('fs') // this is no longer necessary
```

you can now do this:

```javascript
const fs = require('fs-extra')
```

or if you prefer to make it clear that you're using `fs-extra` and not `fs`, you may want to name your `fs` variable `fse` like so:

```javascript
const fse = require('fs-extra')
```

you can also keep both, but it's redundant:

```javascript
const fs = require('fs')
const fse = require('fs-extra')
```

## Sync vs Async vs Async/Await

Most methods are async by default. All async methods will return a promise if the callback isn't passed.

Sync methods on the other hand will throw if an error occurs.

Also Async/Await will throw an error if one occurs.

Example:

```javascript
const fs = require('fs-extra')

// Async with promises:
fs.copy('/tmp/myfile', '/tmp/mynewfile')
  .then(() => console.log('success!'))
  .catch(err => console.error(err))

// Async with callbacks:
fs.copy('/tmp/myfile', '/tmp/mynewfile', err => {
  if (err) return console.error(err)
  console.log('success!')
})

// Sync:
try {
  fs.copySync('/tmp/myfile', '/tmp/mynewfile')
  console.log('success!')
} catch (err) {
  console.error(err)
}

// Async/Await:
async function copyFiles () {
  try {
    await fs.copy('/tmp/myfile', '/tmp/mynewfile')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

copyFiles()
```