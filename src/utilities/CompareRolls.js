import {
  rollMultipleDice
} from './DiceRoll';

const ATK_ROLLS = 3;
const DEF_ROLLS = 2;

export const sortRolls = (rolls) => {
  if (!rolls) return;

  const sorted = rolls.sort((a, b) => b - a);
  return sorted;
}

/**
 * 
 * @param {[Number]} rolls -- array of rolls
 * @param {[Number]} returnedRolls -- default 2
 */
export const bestRolls = (rolls, returnedRolls = 2) => {
  if (!rolls) return;

  const sortedRolls = sortRolls(rolls);
  const bestRolls = [];
  for (let i = 0; i < returnedRolls; i++) {
    bestRolls.push(sortedRolls[i]);
  }
  return bestRolls;
}

const combatRoll = (numAttackers = ATK_ROLLS, numDefenders = DEF_ROLLS) => {
  const attackResult = rollMultipleDice(numAttackers);
  const defendResult = rollMultipleDice(numDefenders);

  // console.log('Attack Roll:', attackResult);
  // console.log('Defend Roll:', defendResult);

  const attackBest = bestRolls(attackResult);
  const defendBest = bestRolls(defendResult);

  return [attackBest, defendBest];
}

/**
 * 
 * @param {*} attackRolls 
 * @param {*} defendRolls 
 * @param {*} numToCompare 
 * @returns {[Number, Number]} -- [troops attack loses, troops defense loses]
 */
const compareRolls = (attackRolls, defendRolls) => {
  const numToCompare = attackRolls.length >= defendRolls.length
    ? defendRolls.length
    : attackRolls.length

  let [defenseLosses, attackLosses]  = [0, 0];

  for (let i = 0; i < numToCompare; i++) {
    // console.log(`${attackRolls[i]} vs ${defendRolls[i]}`);
    // Compare rolls: attack only wins when higher than defense roll (lose tie)
    attackRolls[i] > defendRolls[i]
    ? defenseLosses += 1 // def loses, remove defending troop
    : attackLosses += 1 // atk loses, remove attacking troop
  }

  // return [defenseLoses, attackLoses];
  return [attackLosses, defenseLosses];
}

const calcResult = (atkWins, atkLosses, totalAttackers, totalDefenders) => {
  const [remainingAttackers, remainingDefenders] = [
    totalAttackers - atkLosses, totalDefenders - atkWins
  ];
  return [remainingAttackers, remainingDefenders];
}

export const simulateRound = (totalAttackers = 0, totalDefenders = 0) => {
  const [atkRoll, defRoll] = combatRoll();
  const [atkWins, atkLoss] = compareRolls(atkRoll, defRoll);
  const [remainingAttackers, remainingDefenders] = calcResult(
    atkWins, atkLoss, totalAttackers, totalDefenders
  );

  return [remainingAttackers, remainingDefenders];
}

export const simulateMultipleRounds = (rounds, attackers, defenders ) => {
  let attackersLost = 0;
  let defendersLost = 0;

  for (let i = 0; i < rounds; i++) {
    const result = simulateRound(attackers, defenders);
    attackersLost += result[0];
    defendersLost += result[1];
  }

  const averageAttack = attackersLost / rounds;
  const averageDefense = defendersLost / rounds;

  const atkPercent = (averageAttack / - 2 * 100).toPrecision(3);
  const defPercent = (averageDefense / - 2 * 100).toPrecision(3);

  // console.log('Average Attacker result:', averageAttack);
  // console.log('Average Defender result:', averageDefense);
  // console.log(`Atk ${averageAttack / -2}:${averageDefense / -2} Def`);
  console.log(`Atk ${atkPercent}:${defPercent} Def`);
}

/* recursive backtrace via UWash */
export const getRollPermutations = (numDice, minRoll = 1, maxRoll = 6) => {
  const allPerms = [];
  const permutation = [];

  const helpDiceRolls = (numDice, permutation) => {
    if (numDice === 0) {
      allPerms.push([...permutation]);
    } else {
      for (let i = minRoll; i <= maxRoll; i++) {
        permutation.push(i); // push value into current permutation
        // console.log(permutation);
        helpDiceRolls(numDice - 1, permutation); // recurse call to remainder values
        permutation.pop(); // remove last element
      }
    }
  }

  // Recursive back-track helper
  helpDiceRolls(numDice, permutation);

  // console.log('Number of permutations:', allPerms.length);
  // console.log(`${allPerms[0]} ... ${allPerms[allPerms.length - 1]}`);

  return allPerms;
};

const defaultDice = {
  diceMin: 1,
  diceMax: 6,
  values: [ 1, 2, 3, 4, 5, 6],
};

/**
 * 
 * @param {*} nAtk -- number attackers, 1 - 3
 * @param {*} nDef -- number dependers, 1 - 3
 * @param {*} dice -- dice max & min
 * @param {*} modifiers 
 */
export const calcOdds = (nAtk = 1, nDef = 1, modifiers) => {
  const { diceMin, diceMax } = defaultDice;
  const allCombinations = getRollPermutations(nAtk + nDef, diceMin, diceMax);
  const combinationResults = [];
  let combinationsCount = -1;

  
  combinationsCount = allCombinations.length;
  // console.log(`${nAtk}v${nDef}: ${combinationsCount}`);

  for (let i = 0; i < combinationsCount; i++) {
    const currentCombination = allCombinations[i];
    const atkRolls = sortRolls(currentCombination.slice(0, nAtk));
    const defRolls = sortRolls(currentCombination.slice(nAtk, nAtk + nDef));

    if (modifiers.includes("ammoShortage")) {
      // console.log('ammo shortage: -1 to highest defensive roll');
      defRolls[0] = defRolls[0] - 1;
    } else if (modifiers.includes("fortified")) {
      // console.log('fortified: +1 to highest defensive roll');
      defRolls[0] = defRolls[0] + 1;
    }

    const combinationResult = compareRolls(atkRolls, defRolls);
    // console.log(`${atkRolls}:${defRolls} ==> ${combinationResult}`);
    combinationResults.push(combinationResult);
  }

  const outcomes = {};
  for (let i = 0; i < combinationsCount; i++) {
    const atkLosses = combinationResults[i][0];
    const defLosses = combinationResults[i][1];
    const outcomeKey = `ATK_-${atkLosses}:DEF_-${defLosses}`;

    if(!outcomes[outcomeKey]) {
      outcomes[outcomeKey] = 1;
    } else {
      outcomes[outcomeKey] += 1;
    }
  }
  // console.log(outcomes);

  const odds = {};
  odds.situation = `${nAtk}Atk v ${nDef}Def & ${modifiers}`;
  odds.totalOutcomes = Math.pow(diceMin + diceMax - 1, nAtk + nDef);
  const outcomeKeys = Object.keys(outcomes);
  for (let i = 0; i < outcomeKeys.length; i++) {
    odds[`${outcomeKeys[i]}(%)`] = (
      outcomes[outcomeKeys[i]] / combinationsCount * 100
    ).toFixed(2);
    odds[outcomeKeys[i]] = outcomes[outcomeKeys[i]];
  }

  // console.log(odds);
  return odds;
};
