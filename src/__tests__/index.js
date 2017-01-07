import test from 'ava';
import transform from '../index';

test('transform - null', t => {
  function* fn() {
    yield 0;
    yield 1;
    return 2;
  }
  const i = transform(fn());
  t.deepEqual(i.next(), { value: 0, done: false });
  t.deepEqual(i.next(), { value: 1, done: false });
  t.deepEqual(i.next(), { value: 2, done: true });
});

test('transform - basic', t => {
  const rules = [
    value => value % 2 === 0 ? 'even' : 'odd',
  ];
  function* fn() {
    for (let i = 0; i < 3; i++) yield i;
  }
  const i = transform(fn(), rules);
  t.deepEqual(i.next(), { value: 'even', done: false });
  t.deepEqual(i.next(), { value: 'odd', done: false });
  t.deepEqual(i.next(), { value: 'even', done: false });
  t.deepEqual(i.next(), { value: undefined, done: true });
});

test('transform - fallback', t => {
  const rules = [
    function double(value) {
      if (typeof value === 'number') {
        return 2 * value;
      } else {
        return value;
      }
    },
    function boolToStr(value) {
      if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
      } else {
        return value;
      }
    },
    function strToNum(value) {
      if (typeof value === 'string') {
        const i = parseInt(value, 10);
        return i === i ? i : value;
      } else {
        return value;
      }
    },
  ];
  function* fn() {
    yield '42';
    yield true;
    yield 64;
    yield false;
    yield 'PPAP';
  }
  const i = transform(fn(), rules);
  t.deepEqual(i.next(), { value: 42, done: false });
  t.deepEqual(i.next(), { value: 'true', done: false });
  t.deepEqual(i.next(), { value: 128, done: false });
  t.deepEqual(i.next(), { value: 'false', done: false });
  t.deepEqual(i.next(), { value: 'PPAP', done: false });
  t.deepEqual(i.next(), { value: undefined, done: true });
});
