import { 
  rollDice,
  // rollMultipleDice,
  calcOutcomes,
}  from './DiceRoll';

describe('rollDice works', () => {
  test('rollDice is a function that can be called', () => {
    rollDice();
  });
  
  test('rollDice returns a number', () => {
    const result = rollDice();
    const resultType = typeof result;
    expect(resultType).toBe('number');
  });
  
  test('rollDice returns a number between min & max', () => {
    const [min, max] = [1, 6];
    const result = rollDice(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});

describe('display possible outcomes...', () => {
  test('for no min and max (default outcome)', () => {
    const outcomes = calcOutcomes();
    // console.log(outcomes);
    for(let i = 1; i <= calcOutcomes.size + 1; i++) {
      expect(outcomes.has(i)).toBeTruthy();
    }
  });

  test('for a max & min where max > min', () => {
    const min = 1;
    const max = 6;
    const actualMin = max > min ? min : max;
    const numOutcomes = Math.abs(max - min) + 1;
    expect(min < max).toBeTruthy();

    const outcomes = calcOutcomes(min, max);
    // console.log(outcomes);
    for(let i = 0; i < numOutcomes; i++) {
      expect(outcomes.has(actualMin+ i)).toBeTruthy();
    }
  });

  test('for a max & min where max < min', () => {
    const min = 6;
    const max = 1;
    const actualMin = max > min ? min : max;
    const numOutcomes = Math.abs(max - min) + 1;
    expect(min < max).toBe(false);

    const outcomes = calcOutcomes(min, max);
    // console.log(outcomes);
    for(let i = 0; i < numOutcomes; i++) {
      expect(outcomes.has(actualMin + i)).toBeTruthy();
    }
  });

  test('for a max & min where max === min', () => {
    const min = 6;
    const max = 6;
    const actualMin = max > min ? min : max;
    const numOutcomes = Math.abs(max - min) + 1;
    expect(min === max).toBeTruthy();

    const outcomes = calcOutcomes(min, max);
    // console.log(outcomes);
    for(let i = 0; i < numOutcomes; i++) {
      expect(outcomes.has(actualMin + i)).toBeTruthy();
    }
  })
});

describe('when we roll multiple times...' , () => {
  test('each roll should exist in possible outcomes', () => {
    const [min, max] = [1, 6];
    const numRolls = 1000;

    const outcomes = calcOutcomes(min, max);
    // console.log('outcomes:', outcomes);
    
    const uniqueResults = new Set();
    for (let i = 0; i < numRolls; i++) {
      const result = rollDice(min, max);
      uniqueResults.add(result);
    }
    // console.log('uniqueResults:', uniqueResults);

    uniqueResults.forEach((value) => expect(outcomes.has(value)).toBeTruthy());
  });

  test('each possible outcome exists in the rolls', () => {
    const [ min, max] = [1, 6];
    const numRolls = 1000;

    const outcomes = calcOutcomes(min, max);
    // console.log('outcomes:', outcomes);
    
    const uniqueResults = new Set();
    for (let i = 0; i < numRolls; i++) {
      const result = rollDice(min, max);
      uniqueResults.add(result);
    }
    // console.log('uniqueResults:', uniqueResults);

    outcomes.forEach((value) => expect(uniqueResults.has(value)).toBeTruthy());
  });
});
