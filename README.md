# Domain Specific Saga

A helper library to realize **Domain Specific Saga** for your [Redux](http://redux.js.org/) apps.

## Installation

**NOT YET RELEASED**

```
npm install --save domain-specific-saga
```


## Usage

```js
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
    }
  },
  value => {
    if (typeof value === 'boolean' && value === false) {
      return put(reset());
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

### Equivalent to...

```js
function* saga() {
  yield put(increment(3));
  yield put(reset());
  yield put(decrement(2));
  // yielding 0 is ignored
}
```


## Features

+ Transform
+ Intercept
+ ...More?


## License

MIT


## Author

Yuki Kodama / [@kuy](https://twitter.com/kuy)
