import {
  RollNode, 
  createTree,
} from './RollNode';

describe('RollNode class', () => {
  test('param-less new node', () => {
  })

  // test('make a new node', () => {
  //   const newNode = new RollNode([1, 1]);
  //   console.log(newNode);
  // });

  // test('create a tree from a terminating node', () => {
  //   const terminatingNode = new RollNode([1, 0]);
  //   const newTree = createTree(terminatingNode);
  //   console.log(newTree);
  // });

  // test('create a tree from a non-terminating node', () => {
  //   const nonTerminatingNode = new RollNode([1, 1]);
  //   const newTree = createTree(nonTerminatingNode);
  //   console.log(newTree);
  //   expect((newTree.children).length).toBe(2);
  // });

  // test('create a tree with depth 3', () => {
  //   const newNode = new RollNode([2,2]);
  //   const newTree = createTree(newNode);
  //   console.log(newTree);
  //   expect(newTree.children.length).toBe(3);
  //   const thirdChild = newTree.children[2];
  //   expect(thirdChild.children.length).toBe(2);
  // });

  // test('deeper tree', () => {
  //   const newNode = new RollNode([4,2]);
  //   const newTree = createTree(newNode);
  //   console.log(newTree);
  //   console.log(newTree.children[0].children[0]);
  // });

  // test('even deeper tree', () => {
  //   const newNode = new RollNode([9,9]);
  //   const newTree = createTree(newNode);
  //   console.log(newTree);
  //   // console.log(newTree.children[0].children[0]);
  // });

  describe('RollNode methods', () => {
    test('depth of a newNode with no parent is 0', () => {
      const newNode = new RollNode([1,1]);
      const nodeDepth = newNode.depth;
      expect(nodeDepth).toBe(0);
      expect(newNode.isLeaf()).toBe(true);
    });
  });
});
