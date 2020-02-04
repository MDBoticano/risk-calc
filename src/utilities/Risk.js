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
 * Compare dice rolls specifically in enclave condition
 * @param {[Number]} attackerRolls -- rolls by attacker
 * @param {[Number]} defenderRolls -- rolls by defender
 * @returns {[Number]} -- [0] is attack troops lost, [1] is defense troops lost
 */
const enclaveCompareRolls = (attackerRolls, defenderRolls) => {
  const [numAtk, numDef ] = [attackerRolls.length, defenderRolls.length];
  
  // if there are three attack dice
  // and if the three numbers are the same (e.g. 5,5,5 or 3,3,3)
  // and if that number is bigger than the lowest of defender
  // OBLITERATE
  // enclave ability check
  if (
    numAtk === 3
    && attackerRolls[0] === attackerRolls[1]
    && attackerRolls[1] === attackerRolls[2]
    && attackerRolls[0] > defenderRolls[numDef - 1])
  {
    // console.log('OBLITERATE'); // interact with actual troop counter
    /**
     * add 100 just so we get a clearly different outcome. However this messes
     * up average loss since it doesn't know the normal troops, so change this
     * later
     */ 
    return [0, numDef + 100]; 
  } else {
    // just do a regular comparison
    return compareRolls(attackerRolls, defenderRolls);
  }
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

  const { dice, defender, attacker } = modifiers;

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

    if (attacker === 'enclave') {

      const result = enclaveCompareRolls(atkRolls, defRolls);
      // console.log('Enclave result:', result);
      combinationResults.push(result);

      continue; // don't do the regular compare, just go to next permutation

      // expect to have a slightly better percentage than unmodified comparison
    }

    const combinationResult = compareRolls(atkRolls, defRolls);
    // console.log(`${atkRolls}:${defRolls} ==> ${combinationResult}`);
    combinationResults.push(combinationResult);
  }

  const outcomes = {};
  for (let i = 0; i < permutationsCount; i++) {
    const atkLosses = combinationResults[i][0];
    const defLosses = combinationResults[i][1];
    const outcomeKey = `ATK -${atkLosses}, DEF -${defLosses}`;

    if(!outcomes[outcomeKey]) {
      outcomes[outcomeKey] = 1;
    } else {
      outcomes[outcomeKey] += 1;
    }
  }
  // console.log(outcomes);

  const odds = {};
  odds.situation = `${nAtk}Atk v ${nDef}Def`;
  // odds.modifiers = `${modifiers.defender} ${modifiers.attacker}`;
  odds.modifiers = modifiers;
  // odds.totalOutcomes = Math.pow(dice.min + dice.max - 1, nAtk + nDef);
  const outcomeKeys = Object.keys(outcomes);
  for (let i = 0; i < outcomeKeys.length; i++) {
    const outcomePercent =  (
      outcomes[outcomeKeys[i]] / permutationsCount * 100
    ).toFixed(3);
    // odds[outcomeKeys[i]] = `${outcomePercent} (${outcomes[outcomeKeys[i]]})`;
    odds[outcomeKeys[i]] = `${outcomePercent}`;
  }
  // console.log(odds);
  return odds;
};
