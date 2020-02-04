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

// describe('list odds for unmodifieds rolls', () => {
//   test('run calcBattleOdds for 2v1', () => {
//     const result = calcBattleOdds(2, 1);
//     console.log(result);
//   });

//   test('run calcBattleOdds for 3v1', () => {
//     const result = calcBattleOdds(3, 1);
//     console.log(result);
//   });

//   test('run calcBattleOdds for 1v2', () => {
//     const result = calcBattleOdds(1, 2);
//     console.log(result);
//   });

//   test('run calcBattleOdds for 2v2', () => {
//     const result = calcBattleOdds(2, 2);
//     console.log(result);
//   });

//   test('run calcBattleOdds for 3v2', () => {
//     const result = calcBattleOdds(3, 2);
//     console.log(result);
//   });
// });

describe('list odds for modified rolls', () => {
  // describe('test modifiers', () => {

  //   // test('create default modifier', () => {
  //   //   const modifier = new Modifiers();
  //   //   console.log(modifier);
  //   // });
      
  //   // test('create modifiers', () => {
  //   //   const modifier = new Modifiers({ defender: 'aaa' });
  //   //   console.log(modifier);
  //   // });
      
  //   // test('run calcBattleOdds for an invalid modifier property', () => {
  //   //   const result = calcBattleOdds(1, 1, { idkerr: "bunker" });
  //   //   console.log(result); // should be default 1v1 odds
  //   // });
        
  //   // test('run calcBattleOdds for an invalid modifier value', () => {
  //   //   const result = calcBattleOdds(1, 1, { defender: "banker" });
  //   //   console.log(result); // should be default 1v1 odds
  //   // });
  // });

  // test('run calcBattleOdds for default 1v1', () => {
  //   const result = calcBattleOdds();
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 1v1 but ammoShortage', () => {
  //   const result = calcBattleOdds(1, 1, { defender: "ammoShortage" });
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 2v1 but ammoShortage', () => {
  //   const result = calcBattleOdds(2, 1, { defender: "ammoShortage" });
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 3v1 but ammoShortage', () => {
  //   const result = calcBattleOdds(3, 1, { defender: "ammoShortage" });
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 1v2 but ammoShortage', () => {
  //   const result = calcBattleOdds(1, 2, { defender: "ammoShortage" });
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 2v2 but ammoShortage', () => {
  //   const result = calcBattleOdds(2, 2, { defender: "ammoShortage" });
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 3v2 but ammoShortage', () => {
  //   const result = calcBattleOdds(3, 2, { defender: "ammoShortage" });
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 1v1 but bunkered', () => {
  //   const result = calcBattleOdds(1, 1, { defender: "bunker" });
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 2v1 but bunkered', () => {
  //   const result = calcBattleOdds(2, 1, { defender: "bunker" });
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 3v1 but bunkered', () => {
  //   const result = calcBattleOdds(3, 1, { defender: "bunker" });
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 1v2 but bunkered', () => {
  //   const result = calcBattleOdds(1, 2, { defender: "bunker" });
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 2v2 but bunkered', () => {
  //   const result = calcBattleOdds(2, 2, { defender: "bunker" });
  //   console.log(result);
  // });

  // test('run calcBattleOdds for 3v2 but bunkered', () => {
  //   const result = calcBattleOdds(3, 2, { defender: "bunker" });
  //   console.log(result);
  // });

  test('run calcBattleOdds for default 1v1 but enclave attacker', () => {
    const result = calcBattleOdds(1, 1, { attacker: "enclave" });
    console.log(result); // first check (num attackers) fails, default result
  });

  test('run calcBattleOdds for 3v1 but enclave attacker', () => {
    const result = calcBattleOdds(3, 1, { attacker: "enclave" });
    console.log(result); // first check (num attackers) passes
  });

  test('run calcBattleOdds for default 3v2 but enclave attacker', () => {
    const result = calcBattleOdds(3, 2, { attacker: "enclave" });
    console.log(result); // first check (num attackers) passes
  });
});