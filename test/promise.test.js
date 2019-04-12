import { delay } from './../src/promise';

describe('test promsie', () => {
  test('delay test', async () => {
    const greeting = () => 'hello';

    const result = await delay(greeting);
    expect(result).toBe('hello');
  });
});
