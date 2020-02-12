import {
  getOutcomeProbability,
} from './Risk';


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
  // Number of total troops on the territory that can attack or defend
  get nAttackers () { return this.rollPair[0]; };
  get nDefenders () { return this.rollPair[1]; };

  // Number of troops in attacker's best-case scenario battle
  get maxAttackers () { return this.nAttackers >= 3 ? 3 : this.nAttackers; };
  get maxDefenders () { return this.nDefenders >= 2 ? 2 : this.nDefenders; };

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

  /**
   * Compare this rollPair to parent rollPair to see where troops were lost
   * @return {[number]} [attackers lost, defenders lost]
   */
  get lossFromParent () {
    if (this.parent === null) { return [0, 0]; }

    const lossFromParent = [
      this.parent.nAttackers - this.nAttackers,
      this.parent.nDefenders - this.nDefenders,
    ];
    return lossFromParent;
  };

  /**
   * Get all leaf-nodes.
   * @return {[RollNode]} -- array of leaf nodes
   */
  get leaves () {
    const retrieveLeaves = (node, leaves = []) => {
      if (node.isLeaf()) {
        leaves.push(node);
        return leaves;
      } else {
        for (let i = 0; i < node.children.length; i++) {
          retrieveLeaves(node.children[i], leaves);
        }
      }
      return leaves;
    };

    const allLeaves = retrieveLeaves(this);
    return allLeaves;
  };

  /**
   * Sum probabilities of leaf nodes with matching outcomes
   * @param {[{ outcome: string, probability: number }]} outcomes 
   */
  static reduceOutcomes (outcomes) {
    const finalProbs = [];
    
    for (let i = 0; i < outcomes.length; i++) {
      const { outcome, probability } = outcomes[i];
      const outcomeStrings = finalProbs.map(obj => obj.outcome);
      const outcomeIndex = outcomeStrings.indexOf(`${outcome}`);

      // add the probability to the outcome
      if (outcomeIndex >= 0) {
        finalProbs[outcomeIndex].probability = 
        finalProbs[outcomeIndex].probability + probability;
      } else {
        // make a new object if none of the objects have the outcome
        finalProbs.push({ 
          outcome: `${outcome}`, 
          probability: probability,
        });
      }
    }
    return finalProbs;
  };


  // ------------------------------- Methods ------------------------------- //
  /**
   * Get probability of rollPair based on parent's rollPair
   * @return {number} probability - probability out of 100% (1.00); for a
   * specific fraction, use odds instead. 
   */
  getRelativeProbability (modifiers) {
    if (this.isRoot()) { return 1.00; } // base: node isRoot

    // get battle roll from parent
    const pMaxAtk = this.parent.maxAttackers;
    const pMaxDef = this.parent.maxDefenders;
    const losses = this.lossFromParent;

    const odds = getOutcomeProbability(pMaxAtk, pMaxDef, losses, modifiers);
    return odds;
    // const probability = odds.outcome / odds.total;
    // return probability;
  };

  // like relative probability, but multiple by all probabilities from this to
  // root
  getRootProbability (modifiers) {
    // Helper: get probabilities and store them in an array
    const parentProbs = (node, probabilityArray = []) => {
      // Add the node's probability to the array
      probabilityArray.push(node.getRelativeProbability(modifiers));

      // Recursive case: if a parent exists, add its probability
      if (!node.isRoot()) { parentProbs(node.parent, probabilityArray); }
      return probabilityArray; 
    };

    const probabilities = parentProbs(this);
    // console.log(probabilities);

    // Reduce probabilities by multiplying all values together
    const rootProbability = probabilities.reduce((a, b) => a * b);
    return rootProbability;
  };

  /**
   * Add a RollNode to the end of the RollNode's children array
   * @param {RollNode} childNode -- node to add to children
   */
  addChild (childNode) { this.children.push(childNode); };

  /**
   * Check if the node is a leaf node (has no children)
   * @return {boolean}
   */
  isLeaf () { return (this.children.length === 0) ? true : false; };

  /**
   * Check if the node is a root node (has no parent)
   * @return {boolean}
   */
  isRoot () { return (this.parent === null) ? true : false; };

  // TODO: calculate total number of nodes

  /** 
   * Helper function to calculate possible outcomes for next battle
   * @param {number} attackers - total number of attacking troops
   * @param {number} defenders - total number of defending troops
   */ 
  static loseTroops (attackers, defenders) {
    const troopsLost = (attackers >= 2 && defenders >= 2) ? 2 : 1;

    // Outcomes -- Left: attack loses most, Right: defense loses most
    const outcomes = [ 
      [attackers - troopsLost, defenders], 
      [attackers, defenders - troopsLost], 
    ];
  
    if (troopsLost === 2) {
      outcomes.push([attackers - 1, defenders - 1]); // Middle
      [outcomes[1], outcomes[2]] = [outcomes[2], outcomes[1]]; // Swap to middle
    }  
    return outcomes;
  };

  getLeafProbabilities (modifiers) {
    const getLeafProbs = (node, probs = []) => {
      if (node.isLeaf()) {
        probs.push({
          // outcome: node.lossFromParent,
          outcome: node.rollPair,
          probability: node.getRootProbability(modifiers),
        });
        return probs;
      } else {
        for(let i = 0; i < node.children.length; i++) {
          getLeafProbs(node.children[i], probs);
        }
      }
      return probs;
    };

    const leafProbabilities = getLeafProbs(this);
    return leafProbabilities;
  };

  /**
   * Generate the tree of possible outcomes. The root node will be the node that
   * the function is called on. This modifies that node directly. 
   */
  makeOutcomesTree () { 
    const rootNode = this;

    // Base case: if the node's pair has any zeroes, it cannot have children
    /**
     * Note: this is modifiable. For example, you can change the condition to
     * generate the tree up to when defenders are equal to attackers
     */ 
    const [nodeAtk, nodeDef] = [ rootNode.nAttackers, rootNode.nDefenders ];
    if (nodeAtk === 0 || nodeDef === 0) { return rootNode };

    // Recursive case: create children nodes
    const outcomes = RollNode.loseTroops(nodeAtk, nodeDef);
    for (let i = 0; i < outcomes.length; i++) {
      // Turn the outcomes into RollNodes, make children, and add connect them
      const newNode = new RollNode(outcomes[i]);
      newNode.parent = rootNode;
      newNode.makeOutcomesTree();
      rootNode.addChild(newNode);
    }
    return rootNode;    
  };

  // combine getting leaf probabilities and reducing them
  getOdds (modifiers) {
    this.makeOutcomesTree();
    const probabilities = this.getLeafProbabilities(modifiers);
    const reducedOutcomes = RollNode.reduceOutcomes(probabilities);
    return reducedOutcomes;
  };
 
};
