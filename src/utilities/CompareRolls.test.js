import {
  rollMultipleDice
} from './DiceRoll';

import {
  getRollPermutations,
  sortRolls,
  bestRolls,
  simulateRound,
  simulateMultipleRounds,
  calcOdds,
} from './CompareRolls';

// describe('rollMultipleDice is a function', () => {
//   test('call rollMultipleDice', () => {
//     rollMultipleDice();
//   });
// });

// describe('sortRolls is a function', () => {
//   test('call sortRolls', () => {
//     sortRolls();
//   });

//   test('rolls are sorted descending', () => {
//     const sorted = sortRolls([100, 200, 300]);
//     expect(sorted[0]).toBe(300);
//     expect(sorted[1]).toBe(200);
//     expect(sorted[2]).toBe(100);
//   });
// });

// describe('bestNRolls...', () => {
//   test('call bestNRolls', () => {
//     bestRolls();
//   });

//   test('only get two best rolls by default', () => {
//     const sampleRolls = [1, 3, 6];
//     const rolls = bestRolls(sampleRolls);

//     expect(rolls[0]).toBe(6);
//     expect(rolls[1]).toBe(3);
//     expect(rolls[2]).toBe(undefined);
//   });
// });

// describe('simulate round', () => {
//   test('call simulateRound', () => {
//     const [attackers, defenders] = simulateRound();
//     // console.log('Attackers:', attackers);
//     // console.log('Defenders:', defenders);
//   });

//   test('call simulateMultipleRounds', () => {
//     simulateMultipleRounds(100000);
//   });

//   test('1 atk vs 1 def ~ 41.7 to 58.3 (defender wins)', () => {
//     simulateMultipleRounds(10000, 1, 1);
//   });

//   test('2 atk vs 2 def', () => {
//     simulateMultipleRounds(100000, 2, 2);
//   });
// });

describe('test calc odds', () => {
  test('run calcOdds for default 1v1', () => {
    const result = calcOdds();
    console.log(result);
  });

  test('run calcOdds for 2v1', () => {
    const result = calcOdds(2, 1);
    console.log(result);
  });

  test('run calcOdds for 3v1', () => {
    const result = calcOdds(3, 1);
    console.log(result);
  });

  test('run calcOdds for 1v2', () => {
    const result = calcOdds(1, 2);
    console.log(result);
  });

  test('run calcOdds for 2v2', () => {
    const result = calcOdds(2, 2);
    console.log(result);
  });

  test('run calcOdds for 3v2', () => {
    const result = calcOdds(3, 2);
    console.log(result);
  });

  // test('run calcOdds for 1atk/1def/dice[1-3]', () => {
  //   const result = calcOdds(1, 1, 1, 3);
  //   console.log(result);
  // });

  // test('run calcOdds for 2atk/1def/dice[1-3]', () => {
  //   const result = calcOdds(2, 1, 1, 3);
  //   console.log(result);
  // });
});

// describe('list all permutations', () => {
//   // test('roll two dice', () => {
//   //   getRollPermutations(2);
//   // });
  
//   // test('roll 3 dice, min 1, max 3', () => {
//   //   getRollPermutations(3, 1, 3);
//   // });

//   // test('roll 5 dice', () => {
//   //   getRollPermutations(5);
//   // });
// });
