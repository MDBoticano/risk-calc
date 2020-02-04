import {
  pairOutcomes,
} from './ProbTree';

describe('test error conditions:', () => {
  test('default run: no parameters', () => {
    expect(() => pairOutcomes()).toThrowError();
  });

  test('use a number as only parameter', () => {
    const pairArg = 10;
    expect(typeof pairArg).toBe('number');
    expect(() => pairOutcomes(pairArg)).toThrowError();
  });

  // test array of length 3
  test('use an array of length 3', () => {
    const pairArg = [10, 10, 10];
    expect(pairArg.length).toBeGreaterThan(2);
    expect(() => pairOutcomes(pairArg)).toThrowError();
  });
});
