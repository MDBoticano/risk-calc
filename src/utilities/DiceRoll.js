const MIN = 1;
const MAX = 6;

/**
 * Swap performed via destructuring
 * @param {*} numA 
 * @param {*} numB 
 */
const orderMinMax = (numA, numB) => {
  const order = numA < numB ? [numA, numB] : [numB, numA];
  return order;
}

/**
 * 
 * @param {Number} min -- MIN inclusive possible roll
 * @param {Number} max -- MAX inclusive possible roll
 */
export const rollDice = (min = MIN, max = MAX) => {
  /* In case min is bigger than max, swap */
  // [min, max] = orderMinMax[min, max];

  const roll = Math.floor(min + (Math.random() * (max - min + 1)));
  return roll;
};

/**
 * 
 * @param {Number} numRolls -- number of times to 'roll the dice'
 * @param {Number} min -- MIN inclusive possible roll
 * @param {Number} max -- MAX inclusive possible roll
 */
export const rollMultipleDice = (numRolls = 1, min = MIN, max = MAX) => {
  const rollResults = [];
  for (let i = 0; i < numRolls; i++) {
    const result = rollDice(min, max);
    rollResults.push(result);
  }
  return rollResults;
};

export const calcOutcomes = (min = MIN, max = MAX) => {
  [min, max] = orderMinMax(min, max);

  const possibleOutcomes = new Set();
  for (let i = min; i <= max; i++) {
    // possibleOutcomes[i] = i;
    possibleOutcomes.add(i);
  }
  return possibleOutcomes;
};
