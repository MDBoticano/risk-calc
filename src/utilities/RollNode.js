export const loseTroops = (attackers, defenders, troopsLost = 2) => {
  const outcomes = [
    [attackers - troopsLost, defenders],
    [attackers, defenders - troopsLost],
  ];

  if (troopsLost === 2) { outcomes.push([attackers - 1, defenders - 1]) };

  // TODO: sort outcomes in a way to easily traverse the resulting tree

  return outcomes;
}

/**
 * RollNode object to create tree
 * @param {[Number]} rollPair -- array of two numbers: [nAtk, nDef]
 */
export const RollNode = class {
  constructor(rollPair) {
    this.parent = null;
    this.children = [];
    this.rollPair = rollPair;
  }

  // Methods //
  // set parent (parentNode) { this.parent = parentNode };

  addChild (childNode) { this.children.push(childNode); };

  get nAttackers () { return this.rollPair[0]; };
  get nDefenders () { return this.rollPair[1]; };

  // TODO: calculate probabilities: child to parent
  // Q: calculate from within or pass as a calculated value when creating node? 
  // Or maybe make it part of loseTroops. So rollPair will be three values:
  // 1. total number of attackers (can be greater than 3)
  // 2. total number of defenders (can be greater than 2)
  // 3. probability relative to parent

  // TODO: calculate depth (levels of children). no children is depth 1.
  
  // TODO: calculate total number of nodes 
}

/**
 * Create a tree of all possible outcomes
 * @param {RollNode} parentNode - node to attach children to
 */
export const createTree = (parentNode) => {
  // Check that the parameter is a node
  if (!(parentNode instanceof RollNode)) { return; };

  // Base case: if the node's pair has any zeroes, it cannot have kids
  const [nodeAtk, nodeDef] = [ parentNode.nAttackers, parentNode.nDefenders ];
  if (nodeAtk === 0 || nodeDef === 0) { return parentNode };

  // otherwise, create the tree
  let children;  
  if (nodeAtk >= 2 && nodeDef >= 2) {
    children = loseTroops(nodeAtk, nodeDef, 2);
  } else {
    children = loseTroops(nodeAtk, nodeDef, 1);
  }
  // console.log(children, children.length);
  for (let i = 0; i < children.length; i++) {
    // turn child into a node
    const newNode = new RollNode(children[i]);
    newNode.parent = parentNode; // attach the child to the parent

    // recursive case: CREATE tree from children
    const childTree = createTree(newNode); 

    // add that node to the parent node
    parentNode.addChild(childTree);
  }
  return parentNode;
}
