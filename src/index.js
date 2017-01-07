import assert from 'assert'

export default function* transform(iterator, rules = []) {
  let ret
  while (true) {
    let { value, done } = iterator.next(ret)
    if (done) {
      return value
    }

    value = rules.reduce((p, t) => t(p), value)
    ret = yield value
  }

  // eslint-disable-next-line no-unreachable
  assert(false, "Something wrong, shouldn't be reached here.")
}
