/**
 * Get all the permutations (order matters, repetition allowed) of a set of
 * values. The expected result is an array of length values to the power of 
 * numChoices. 
 * @param {[Array]} values -- array containing possible choices
 * @param {Number} numChoices -- how many selections to make from values. This 
 * defaults to the length of values as the expected behavior would be to
 * generate all possible orders of values.
 */
export const getPermutations = (values, numChoices) => {
  // Check if values is actually an array of values
  if (!Array.isArray(values)) {
    return [];
  }

  // If there isn't a specificied length, we default to the length of values. 
  numChoices = (typeof numChoices !== 'number') 
  ? values.length
  : numChoices;

  const permutations = [];
  const currentPermutation = [];
  const numValues = values.length;

  /* Helper function: recursive case */
  const generatePermutation = (numChoices, currentPermutation) => {
    if (numChoices === 0) permutations.push([...currentPermutation]);
    else {
      for (let i = 0; i < numValues; i++) {
        currentPermutation.push(values[i]);
        generatePermutation(numChoices - 1, currentPermutation);
        currentPermutation.pop();
      }
    }
  }

  generatePermutation(numChoices, currentPermutation);

  return permutations;
};



