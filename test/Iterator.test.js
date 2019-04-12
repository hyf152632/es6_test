import { makeIterator } from './../src/Iterator';

describe('makeIterator test', () => {
  test('call makeIterator', () => {
    const arr = [1, 2, 3];

    const ret = makeIterator(arr);

    expect(ret.next()).toEqual({ value: 1, done: false });
    expect(ret.next()).toEqual({ value: 2, done: false });
    expect(ret.next()).toEqual({ value: 3, done: false });
    expect(ret.next()).toEqual({ value: undefined, done: true });
  });
});
