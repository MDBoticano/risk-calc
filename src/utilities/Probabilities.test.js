import {
  getPermutations
} from './Probabilities';

describe('get all permutations for a six sided die', () => {
  test('default case', () => {
    const result = getPermutations();
    console.log(result);
  });
});