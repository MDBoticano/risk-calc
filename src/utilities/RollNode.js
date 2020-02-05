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

  // Getters & Setters (properties) //
  // set parent (parentNode) { this.parent = parentNode };

  get nAttackers () { return this.rollPair[0]; };
  get nDefenders () { return this.rollPair[1]; };

  // TODO: calculate probabilities: child to parent
  // Q: calculate from within or pass as a calculated value when creating node? 
  // Or maybe make it part of loseTroops. So rollPair will be three values:
  // 1. total number of attackers (can be greater than 3)
  // 2. total number of defenders (can be greater than 2)
  // 3. probability relative to parent

  // TODO: calculate depth (levels of children). no children is depth 1.
  /**
   * The depth of a node is the distance from it to the parent node. A node with
   * no parent has a depth of zero.
   */
  get depth () {
    // no parent: depth 0
    if (this.parent === null) {
      return 0;
    } else {
      // move up the tree until you hit a parent node with no parent
      return -1;
    }
  };

  // traverse up to tree until there's parent is null, which is the root node
  get root () { }

  // Methods //

  // Add a RollNode to a node's children array
  addChild (childNode) { this.children.push(childNode); };

  // leaf if no children
  // is it still a leaf if it has no parent either?
  isLeaf () { return this.children.length === 0 ? true : false; };


  
  // TODO: calculate total number of nodes 
};

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
