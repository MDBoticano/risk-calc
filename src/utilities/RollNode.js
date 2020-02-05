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

  // --------------------- Getters/Setters (properties) --------------------- //
  get nAttackers () { return this.rollPair[0]; };
  get nDefenders () { return this.rollPair[1]; };

  // TODO: calculate probabilities: child to parent
  // Q: calculate from within or pass as a calculated value when creating node? 
  // Or maybe make it part of loseTroops. So rollPair will be three values:
  // 1. total number of attackers (can be greater than 3)
  // 2. total number of defenders (can be greater than 2)
  // 3. probability relative to parent

  /**
   * The depth of a node is the number of edges from it to the root node. For
   * each parent including the root node, increase node depth by 1. 
   * @return {number} nodeDepth: any positive integer including 0
   */
  get depth () {
    const getDepth = (node, depth = 0) => {
      if (node.parent === null) { return depth; } // base case no parent
      else { return getDepth(node.parent, depth + 1); } // recursive case
    };
    const nodeDepth = getDepth(this);
    return nodeDepth;
  };

  /**
   * The root node of a tree is the top-most node, that is, it has no parent.
   * Find the root by checking for parent nodes.
   * @return {RollNode} rootNode: return a RollNode
   */
  get root () {
    const getRoot = (node) => { 
      if (node.parent === null) { return node; } // base case: no parent
      else { return getRoot(node.parent); } // recursive case: check parent
    };
    const rootNode = getRoot(this);
    return rootNode;
  };

  // ------------------------------- Methods ------------------------------- //
  /**
   * Add a RollNode to the end of the RollNode's children array
   * @param {RollNode} childNode -- node to add to children
   */
  addChild (childNode) { this.children.push(childNode); };

  /**
   * Check if the node is a leaf node (has no children)
   * Q: is it still a leaf if it has no parent either?
   * @return {boolean}
   */
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
