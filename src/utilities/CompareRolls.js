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
const compareRolls = (attackRolls, defendRolls, numToCompare = 2) => {
  const smallestCompare = attackRolls.length > defendRolls.length
    ? defendRolls.length
    : attackRolls.length

  if (numToCompare > smallestCompare) { numToCompare = smallestCompare };

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
  // console.log(`Atk ${atkPercent}:${defPercent} Def`);
}

// /** LOOK AT compareRolls()
//  * 
//  * @param {[Number]} atkRolls -- roll results, length 1 - 3
//  * @param {[Number]} defRolls  -- roll results, length 1 - 2
//  */
// const calcRolls = (atkRolls, defRolls) => {
//   const [numAtk, numDef] = [atkRolls.length, defRolls.length];
//   const numToCompare = numAtk > numDef ? numDef : numAtk;
  
//   const [sortedAtk, sortedDef] = [sortRolls(atkRolls), sortRolls(defRolls)];
//   console.log('Attack Rolls:', sortedAtk);
//   console.log('Defense Rolls:', sortedDef);

//   // const bestAtk = [bestRolls(sortedAtk, numToCompare)];
//   // const bestDef = [bestRolls(sortedDef, numToCompare)];

//   for (let i = 0; i < numToCompare; i++) {

//   }
// };

export const calcOdds = (nAtk = 1, nDef = 1) => {
  const [MIN, MAX] = [1, 6];

  const allCombinations = [];
  const combinationResults = [];
  let combinationsCount = -1;

  for (let a = MIN; a <= MAX; a++) {
    for (let d = MIN; d <= MAX; d++) {
      const newCombination = {
        attackRolls: [],
        defenseRolls: [],
      };
      newCombination.attackRolls.push(a);
      newCombination.defenseRolls.push(d);
      allCombinations.push(newCombination);
    }
  }
  combinationsCount = allCombinations.length;

  for (let i = 0; i < combinationsCount; i++) {
    const currentCombination = allCombinations[i];
    const { attackRolls, defenseRolls } = currentCombination;

    const combinationResult = compareRolls(attackRolls, defenseRolls);
    // console.log(`${attackRolls}:${defenseRolls} ==> ${combinationResult}`);
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
  const outcomeKeys = Object.keys(outcomes);
  for (let i = 0; i < outcomeKeys.length; i++) {
    odds[outcomeKeys[i]] = outcomes[outcomeKeys[i]] / combinationsCount;
  }

  // console.log(odds);
  return odds;
};
