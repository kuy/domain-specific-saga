[![NPM Package][npm_img]][npm_site]
[![Travis][ci_img]][ci_site]
[![Coverage Status][ca_img]][ca_site]
[![Dependency Status][david_img]][david_site]

# Domain Specific Saga

A helper library to realize **Domain Specific Saga** for your [Redux](http://redux.js.org/) + [redux-saga](https://github.com/redux-saga/redux-saga) apps.

## Installation

```
npm install --save domain-specific-saga
```


## Features

+ [*] Transform
+ [] Intercept
+ ...More?


## Usage

```js
import transform from 'domain-specific-saga'

const rules = [
  value => {
    if (typeof value === 'number') {
      return value.toString()
    } else {
      return value
    }
  },
]

function* generator() {
  yield 3
  yield 'hoge'
  yield -2
}

const i = transform(generator(), rules)
i.next() // => '3'
i.next() // => 'hoge'
i.next() // => '-2'
```


## The Goal

```js
import 

const rules = [
  value => {
    if (typeof value === 'number') {
      if (value === 0) {
        return INTERCEPT;
      } else if (0 < value) {
        return put(increment(value));
      } else {
        return put(decrement(Math.abs(value)));
      }
      return value;
    }
  },
  value => {
    if (typeof value === 'boolean' && value === false) {
      return put(reset());
    } else {
      return value;
    }
  },
];

function* saga() {
  yield 3;
  yield false;
  yield -2;
  yield 0;
}

function* rootSaga() {
  yield call(createDSS(saga, rules));
}
```


## License

MIT


## Author

Yuki Kodama / [@kuy](https://twitter.com/kuy)


[npm_img]: https://img.shields.io/npm/v/domain-specific-saga.svg
[npm_site]: https://www.npmjs.org/package/domain-specific-saga
[ci_img]: https://img.shields.io/travis/kuy/domain-specific-saga/master.svg?style=flat-square
[ci_site]: https://travis-ci.org/kuy/domain-specific-saga
[ca_img]: https://coveralls.io/repos/github/kuy/domain-specific-saga/badge.svg?branch=master
[ca_site]: https://coveralls.io/github/kuy/domain-specific-saga?branch=master
[david_img]: https://img.shields.io/david/kuy/domain-specific-saga.svg
[david_site]: https://david-dm.org/kuy/domain-specific-saga
