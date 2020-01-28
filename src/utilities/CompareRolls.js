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

const compareRolls = (attackRolls, defendRolls, numToCompare = 2) => {
  const smallestCompare = attackRolls.length > defendRolls.length
    ? defendRolls.length
    : attackRolls.length

  if (numToCompare > smallestCompare) { numToCompare = smallestCompare };

  let [attackWins, attackLoses]  = [0, 0];

  for (let i = 0; i < numToCompare; i++) {
    // console.log(`${attackRolls[i]} vs ${defendRolls[i]}`);
    attackRolls[i] > defendRolls[i]
    ? attackWins += 1 // per win, remove a defender
    : attackLoses += 1 // per loss, remove an attacker
  }

  return [attackWins, attackLoses];
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
  let totalAttackers = 0;
  let totalDefenders = 0;

  for (let i = 0; i < rounds; i++) {
    const result = simulateRound();
    totalAttackers += result[0];
    totalDefenders += result[1];
  }

  const averageAttack = totalAttackers / rounds;
  const averageDefense = totalDefenders / rounds;

  console.log('Average Attacker result:', averageAttack);
  console.log('Average Defender result:', averageDefense);
  console.log(`Atk:Def -- ${averageAttack / -2} : ${averageDefense / -2}`);
}
