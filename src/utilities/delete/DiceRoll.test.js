import { 
  rollDice,
  rollMultipleDice,
  calcOutcomes,
}  from './DiceRoll';

// describe('rollDice works', () => {
//   test('rollDice is a function that can be called', () => {
//     rollDice();
//   });
  
//   test('rollDice returns a number', () => {
//     const result = rollDice();
//     const resultType = typeof result;
//     expect(resultType).toBe('number');
//   });
  
//   test('rollDice returns a number between min & max', () => {
//     const [min, max] = [1, 6];
//     const result = rollDice(min, max);
//     expect(result).toBeGreaterThanOrEqual(min);
//     expect(result).toBeLessThanOrEqual(max);
//   });

//   test('rollDice returns a valid result when max < min', () => {
//     const [min, max] = [6, 1];
//     const [expectedMin, expectedMax] = [1, 6];
//     const result = rollDice(min, max);
//     expect(result).toBeGreaterThanOrEqual(expectedMin);
//     expect(result).toBeLessThanOrEqual(expectedMax);
//   });

//   test('rollDice only returns integers', () => {
//     const [min, max] = [1.30, 1.5];
//     // const [expectedMin, expectedMax] = [1, 1];
//     const result = rollDice(min, max);
//     console.log(result);
//     // expect(result).toBe(1 || 2);
//   });
// });

// describe('display possible outcomes...', () => {
//   test('for no min and max (default outcome)', () => {
//     const outcomes = calcOutcomes();
//     // console.log(outcomes);
//     for(let i = 1; i <= calcOutcomes.size + 1; i++) {
//       expect(outcomes.has(i)).toBeTruthy();
//     }
//   });

//   test('for a max & min where max > min', () => {
//     const min = 1;
//     const max = 6;
//     const actualMin = max > min ? min : max;
//     const numOutcomes = Math.abs(max - min) + 1;
//     expect(min < max).toBeTruthy();

//     const outcomes = calcOutcomes(min, max);
//     // console.log(outcomes);
//     for(let i = 0; i < numOutcomes; i++) {
//       expect(outcomes.has(actualMin+ i)).toBeTruthy();
//     }
//   });

//   test('for a max & min where max < min', () => {
//     const min = 6;
//     const max = 1;
//     const actualMin = max > min ? min : max;
//     const numOutcomes = Math.abs(max - min) + 1;
//     expect(min < max).toBe(false);

//     const outcomes = calcOutcomes(min, max);
//     // console.log(outcomes);
//     for(let i = 0; i < numOutcomes; i++) {
//       expect(outcomes.has(actualMin + i)).toBeTruthy();
//     }
//   });

//   test('for a max & min where max === min', () => {
//     const min = 6;
//     const max = 6;
//     const actualMin = max > min ? min : max;
//     const numOutcomes = Math.abs(max - min) + 1;
//     expect(min === max).toBeTruthy();

//     const outcomes = calcOutcomes(min, max);
//     // console.log(outcomes);
//     for(let i = 0; i < numOutcomes; i++) {
//       expect(outcomes.has(actualMin + i)).toBeTruthy();
//     }
//   })
// });

// describe('when we roll multiple times...' , () => {
//   test('each roll for any # of rolls is a possible outcome', () => {
//     const [min, max] = [1, 6];
//     const numRolls = [1, 100, 1000, 1000000];

//     const outcomes = calcOutcomes(min, max);
//     // console.log('outcomes:', outcomes);
    
//     // Make a set for each numRolls
//     for (let r = 0; r < numRolls.length; r++) {
//       const uniqueResults = new Set();
//       for (let i = 0; i < numRolls[r]; i++) {
//         const result = rollDice(min, max);
//         uniqueResults.add(result);
//       }
//       // console.log('num rolls:', r, numRolls[r]);
//       // console.log('uniqueResults:', uniqueResults);
//       uniqueResults.forEach((value) => expect(outcomes.has(value)).toBeTruthy());
//     }
//   });

//   test('each possible outcome exists in the rolls for 100 rolls', () => {
//     const [ min, max] = [1, 6];
//     const numRolls = 1000;

//     const outcomes = calcOutcomes(min, max);
//     // console.log('outcomes:', outcomes);
    
//     const uniqueResults = new Set();
//     for (let i = 0; i < numRolls; i++) {
//       const result = rollDice(min, max);
//       uniqueResults.add(result);
//     }
//     // console.log('uniqueResults:', uniqueResults);

//     outcomes.forEach((value) => expect(uniqueResults.has(value)).toBeTruthy());
//   });
// });

describe('map probabilities', () => {
  const min = 1;
  const max = 6;
  const nRolls = 100000;

  // const t0 = performance.now();
  const result = rollMultipleDice(nRolls, min, max);
  // console.log(result);
  // const t1 = performance.now();
  // console.log(`Time to run ${nRolls}:`, t1 - t0);

  test('making n-rolls returns an array of length n', () => {
    expect(result.length).toBe(nRolls);
  });

  test('there is an equal distribution of each roll', () => {
    const sumRolls = result.reduce((a, b) => a + b);
    const avgRoll = sumRolls / nRolls;

    // TODO: account for some variance
    // expect(sumRolls).toBe(nRolls * ((min + max) / 2));
    // expect(avgRoll).toBe((min + max) / 2);
  });

  test('map distribution of rolls', () => {
    const outcomes = calcOutcomes(min ,max);
    const resultDist = {};
    outcomes.forEach((value) => resultDist[value] = 0);
    console.log('initial dist:', resultDist);

    for (let i = 0; i < nRolls; i++) {
      const roll = result[i];
      resultDist[roll] = resultDist[roll] + 1;
    }
    console.log('final dist:', resultDist);

    const percentDist = {};
    outcomes.forEach((value) => {
      percentDist[value] = resultDist[value] / nRolls;
    });

    // TODO: account for some variance
    console.log('% dist:', percentDist);
  });
});
