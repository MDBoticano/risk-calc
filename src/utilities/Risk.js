import {
  DICE_DEFAULT,
  sortDescending,
  getDicePermutations,
} from './Dice';

export class Modifiers {
  constructor({ dice , defender, attacker } = {
    dice: DICE_DEFAULT, defender : '', attacker : ''
  }) {
    this.dice = dice || DICE_DEFAULT;
    this.defender = defender || '';
    this.attacker = attacker || '';
  }
}

const defMod = new Modifiers();

/**
 * Compare dice rolls. 
 * @param {[Number]} attackerRolls -- rolls by attacker
 * @param {[Number]} defenderRolls -- rolls by defender
 * @returns {[Number]} -- [0] is attack troops lost, [1] is defense troops lost
 */
const compareRolls = (attackerRolls, defenderRolls) => {
  const numToCompare = attackerRolls.length >= defenderRolls.length
    ? defenderRolls.length
    : attackerRolls.length;

  let [attackLosses, defenseLosses]  = [0, 0];
  for (let i = 0; i < numToCompare; i++) {
    // Compare rolls: attack only wins when higher than defense roll (lose tie)
    attackerRolls[i] > defenderRolls[i]
    ? defenseLosses += 1 // def loses, remove defending troop
    : attackLosses += 1; // atk loses, remove attacking troop
  }
  return [attackLosses, defenseLosses];
}




/**
 * calculate battle outcome probabilities
 * @param {Number} nAtk -- number attackers, usually between 1 - 3
 * @param {Number} nDef -- number dependers, usually 1 or 2
 * @param {[String]} modifiers 
 */
export const calcBattleOdds = (nAtk = 1, nDef = 1, modifiers = defMod) => {
  if (!(modifiers instanceof Modifiers)) {

    if (modifiers['dice'] || modifiers['defender'] || modifiers['attacker']) {
      modifiers = new Modifiers(modifiers);
      // console.log(modifiers);
    } else {
      modifiers = defMod;
    }
  }

  const { dice, defender } = modifiers;

  const dicePermutations = getDicePermutations(dice.VALUES, nAtk + nDef);
  const permutationsCount = dicePermutations.length;
  
  const combinationResults = [];

  for (let i = 0; i < permutationsCount; i++) {
    const currentCombination = dicePermutations[i];
    const atkRolls = sortDescending(currentCombination.slice(0, nAtk));
    const defRolls = sortDescending(currentCombination.slice(nAtk));

    if (defender === 'ammoShortage') {
      // console.log('ammo shortage: -1 to highest defensive roll');
      defRolls[0] = defRolls[0] - 1;
    } else if (defender === 'bunker') {
      // console.log('bunker: +1 to highest defensive roll');
      defRolls[0] = defRolls[0] + 1;
    }

    const combinationResult = compareRolls(atkRolls, defRolls);
    // console.log(`${atkRolls}:${defRolls} ==> ${combinationResult}`);
    combinationResults.push(combinationResult);
  }

  const outcomes = {};
  for (let i = 0; i < permutationsCount; i++) {
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
  odds.totalOutcomes = Math.pow(dice.min + dice.max - 1, nAtk + nDef);
  const outcomeKeys = Object.keys(outcomes);
  for (let i = 0; i < outcomeKeys.length; i++) {
    odds[`${outcomeKeys[i]}(%)`] = (
      outcomes[outcomeKeys[i]] / permutationsCount * 100
    ).toFixed(2);
    odds[outcomeKeys[i]] = outcomes[outcomeKeys[i]];
  }

  // console.log(odds);
  return odds;
};
