import {
  getDicePermutations,
} from './Dice';

import {
  calcBattleOdds,
  Modifiers,
} from './Risk';

// describe('list all permutations', () => {
//   test('roll two dice', () => {
//     getDicePermutations(2);
//   });
  
//   test('roll 3 dice, min 1, max 3', () => {
//     getDicePermutations([1, 2, 3], 3);
//   });

//   test('roll 5 dice', () => {
//     getDicePermutations(5);
//   });
// });

describe('list odds for modified rolls', () => {
  // test('create default modifier', () => {
  //   const modifier = new Modifiers();
  //   console.log(modifier);
  // });

  // test('create modifiers', () => {
  //   const modifier = new Modifiers({ defender: 'aaa' });
  //   console.log(modifier);
  // });

  // test('run calcBattleOdds for default 1v1', () => {
  //   const result = calcBattleOdds();
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 1v1 but ammoShortage', () => {
  //   const result = calcBattleOdds(1, 1, new Modifiers({ defender: "ammoShortage" }));
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 1v1 but fortified', () => {
  //   const result = calcBattleOdds(1, 1, { defender: "fortified" });
  //   console.log(result);
  // });

  test('run calcBattleOdds for an invalid modifier', () => {
    const result = calcBattleOdds(1, 1, { idkerr: "fortified" });
    console.log(result);
  });
});