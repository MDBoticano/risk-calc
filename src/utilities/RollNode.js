import {
  loseTroops,
} from './ProbTree';

export const RollNode = class {
  constructor(rollPair) {
    this.parent = null;
    this.children = [];
    this.rollPair = rollPair;
  }

  // Methods //
  // set parent (parentNode) { this.parent = parentNode };

  addChild (childNode) { this.children.push(childNode) };

  get nAttackers () { return this.rollPair[0] };
  get nDefenders () { return this.rollPair[1] };

  // calculate probabilities: child to parent
  // Q: calculate from within or pass as a calculated value when creating node? 
  // Or maybe make it part of loseTroops. So rollPair will be three values:
  // 1. total number of attackers (can be greater than 3)
  // 2. total number of defenders (can be greater than 2)
  // 3. probability relative to parent
}

export const createTree = (parentNode) => {
  if (!(parentNode instanceof RollNode)) return;

  // check values for zero
  const [nodeAtk, nodeDef] = [ parentNode.nAttackers, parentNode.nDefenders ];
  if (nodeAtk <= 0 || nodeDef <= 0) return parentNode;

  let children;  
  // otherwise, create the tree
  if (nodeAtk >= 2 && nodeDef >= 2) {
    children = loseTroops(nodeAtk, nodeDef, 2);
  } else {
    children = loseTroops(nodeAtk, nodeDef, 1);
  }

  for (let i = 0; i < children.length; i++) {
    // turn child into a node
    const newNode = new RollNode(children[i]);
    newNode.parent = parentNode;

    // CREATE tree from children
    const childTree = createTree(newNode);

    parentNode.addChild(childTree);
    return parentNode;
  }

}
