import {
  getPermutations,
} from './Probabilities';


/* Utilities */
export const sortAscending = (array) => {
  const sorted = array.sort((a, b) => a - b);
  return sorted;
};

export const sortDescending = (array) => {
  const sorted = array.sort((a, b) => b - a); 
  return sorted;
};

/* Dice Object */
class Dice {
  constructor(values) {
    this.VALUES = values;
  }

  get min() { return sortAscending(this.VALUES)[0]};
  get max() { return sortDescending(this.VALUES)[0]};
};

export const DICE_DEFAULT = new Dice([1, 2, 3, 4, 5, 6]);

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

/**
 * Retrieve all possible permutations for a number of dice rolls
 * @param {[]} diceValues -- possible outcomes from dice. Generally a number.
 * @param {Number} numChoices -- number of individual outcomes to collect
 */
export const getDicePermutations = (diceValues = DICE_DEFAULT.VALUES, numChoices = 1) => {
  if (typeof diceValues === 'number') {
    [diceValues, numChoices] = [DICE_DEFAULT.VALUES, diceValues]
  }

  const dicePermutations = getPermutations(diceValues, numChoices);
  return dicePermutations;
};
