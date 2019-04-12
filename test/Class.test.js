import { Point } from './../src/Class';

describe('test Class', () => {
  test('Point class', () => {
    const point = new Point(1, 2);
    expect(point.x).toBe(1);
  });
});
