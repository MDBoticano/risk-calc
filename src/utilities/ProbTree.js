export const loseTroops = (attackers, defenders, troopsLost = 2) => {
  const outcomes = [
    [attackers - troopsLost, defenders],
    [attackers, defenders - troopsLost],
  ];

  if (troopsLost === 2) outcomes.push([attackers - 1, defenders - 1]);

  return outcomes;
}

/**
 * 
 * @param {[Number]} pair - pair of numbers. Only two! [Attackers, Defenders]
 */
export const pairOutcomes = (pair) => {
  // it's a pair, should only be two values
  if (!Array.isArray(pair) || pair.length > 2) {
    throw new TypeError('The argument pair is not an Array.');
  }
  if (Array.isArray(pair)) {
    if (pair.length !== 2) {
      throw new RangeError('The argument pair can only have two values');
    }
    if(pair[0] < 0 || pair[1] < 0) {
      throw new RangeError(`The argument pair's values must be 0 or greater`);
    }
  }

  const a = pair[0];
  const b = pair[1];


  // base: a or b are zero
  if (a === 0 || b === 0) {
    console.log('Final outcome:', [a, b]);
    return;
  } else if (a >= 2 && b >= 2) {
    const minusTwos = loseTroops(a, b, 2);
    pairOutcomes(minusTwos[0]);
    pairOutcomes(minusTwos[1]);
    pairOutcomes(minusTwos[2]);
  } else {
    const minusOnes = loseTroops(a, b, 1);
    pairOutcomes(minusOnes[0]);
    pairOutcomes(minusOnes[1]);
  }

};
