import {
  rollMultipleDice
} from './DiceRoll';

import {
  sortRolls,
  bestRolls,
  simulateRound,
  simulateMultipleRounds,
} from './CompareRolls';

describe('rollMultipleDice is a function', () => {
  test('call rollMultipleDice', () => {
    rollMultipleDice();
  });
});

describe('sortRolls is a function', () => {
  test('call sortRolls', () => {
    sortRolls();
  });

  test('rolls are sorted descending', () => {
    const sorted = sortRolls([100, 200, 300]);
    expect(sorted[0]).toBe(300);
    expect(sorted[1]).toBe(200);
    expect(sorted[2]).toBe(100);
  });
});

describe('bestNRolls...', () => {
  test('call bestNRolls', () => {
    bestRolls();
  });

  test('only get two best rolls by default', () => {
    const sampleRolls = [1, 3, 6];
    const rolls = bestRolls(sampleRolls);

    expect(rolls[0]).toBe(6);
    expect(rolls[1]).toBe(3);
    expect(rolls[2]).toBe(undefined);
  });
});

describe('simulate round', () => {
  test('call simulateRound', () => {
    const [attackers, defenders] = simulateRound();
    // console.log('Attackers:', attackers);
    // console.log('Defenders:', defenders);
  });

  test('call simulateMultipleRounds', () => {
    simulateMultipleRounds(100000);
  })
});
