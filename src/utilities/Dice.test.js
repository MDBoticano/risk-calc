import {
  DICE_DEFAULT,
  getDicePermutations,
} from './Dice';

const numValues = DICE_DEFAULT.VALUES.length;

describe('get dice permutations', () => {
  test('default', () => {
    const result = getDicePermutations();
    // console.log(result);

    expect(result.length).toBe(numValues);
  });

  test('2 dice permutations:', () => {
    const numDice = 2;
    const result = getDicePermutations(numDice);
    // console.log(result);
    
    expect(result.length).toBe(Math.pow(numValues, numDice));
  });

  test('5 dice permutations:', () => {
    const numDice = 5;
    const result = getDicePermutations(numDice);
    // console.log(result);
    
    expect(result.length).toBe(Math.pow(numValues, numDice));
  });
});

describe('get dice permutations for non-default dice', () => {
  describe('default but dice is three', () => {
    const diceToThree = [1, 2, 3];

    test('default on diceToThree', () => {
      const result = getDicePermutations(diceToThree);
      // console.log(result);
      expect(result.length).toBe(diceToThree.length);
    });

    test('diceToThree but three dice', () => {
      const numDice = 3;
      const result = getDicePermutations(diceToThree, numDice);
      expect(result.length).toBe(Math.pow(diceToThree.length, numDice));
    });
  });

  describe('default but dice is array of strings', () => {
    const stringArr = ['Jack', 'John', 'James'];
    
    test('default on stringArr', () => {
      const result = getDicePermutations(stringArr);
      expect(result.length).toBe(stringArr.length);
    });

    test('stringArr but three times', () => {
      const numDice = 3;
      const result = getDicePermutations(stringArr, numDice);
      expect(result.length).toBe(Math.pow(stringArr.length, numDice));
    });
  });
});
