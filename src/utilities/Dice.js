import {
  getPermutations,
} from './Probabilities';


export const DICE_DEFAULT = {
  MIN: 1,
  MAX: 6,
  VALUES: [1, 2, 3, 4, 5, 6],
};

/* Utilities */
export const sortAscending = (array) => {
  const sorted = array.sort((a, b) => a - b);
  return sorted;
};

export const sortDescending = (array) => {
  const sorted = array.sort((a, b) => b - a); 
  return sorted;
};


/* Dice functions */
const getRandomNumInclusive = (min = 0, max = 1) => {
  [min, max] = sortAscending(min, max); // sort to determine real min/max
  const randomNum = Math.floor(min + (Math.random() * (max - min + 1)));
  return randomNum;
};

/**
 * Get an inclusive number between min and max values
 * @param {Number} min -- smallest possible dice roll
 * @param {Number} max -- largest possible dice roll
 */
export const rollDice = (min = DICE_DEFAULT.MIN, max = DICE_DEFAULT.MAX) => {
  const roll = getRandomNumInclusive(min, max);
  return roll;
};

/**
 * Get an array of inclusive values between min and max values 
 * @param {Number} min -- smallest possible dice roll
 * @param {Number} max -- largest possible dice roll
 */
export const rollMultipleDice = (numDice = 1, min, max) => {
  const rolls = [];
  for (let i = 0; i < numDice; i++) {
    const roll = rollDice(min, max);
    rolls.push(roll);
  }
  return rolls;
};

export const getDicePermutations = (diceValues = DICE_DEFAULT.VALUES, 
  numChoices = 1
) => {
  if (typeof diceValues === 'number') {
    [diceValues, numChoices] = [DICE_DEFAULT.VALUES, diceValues]
  }

  const dicePermutations = getPermutations(diceValues, numChoices);
  return dicePermutations;
}
