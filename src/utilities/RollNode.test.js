import {
  RollNode,
} from './RollNode';

describe('RollNode class', () => {
  // test('param-less new node', () => {
  //   const newNode = new RollNode();
  //   console.log(newNode);
  // });

  // test('make a new node', () => {
  //   const newNode = new RollNode([1, 1]);
  //   console.log(newNode);
  // });

  // test('create a tree from a terminating node', () => {
  //   const terminatingNode = new RollNode([1, 0]);
  //   const newTree = terminatingNode.makeOutcomesTree();
  //   console.log(newTree);
  // });

  // test('create a tree from a non-terminating node', () => {
  //   const nonTerminatingNode = new RollNode([1, 1]);
  //   const newTree = nonTerminatingNode.makeOutcomesTree();
  //   console.log(newTree);
  //   expect((newTree.children).length).toBe(2);
  // });

  // test('create a tree with depth 3', () => {
  //   const newNode = new RollNode([2,2]);
  //   const newTree = newNode.makeOutcomesTree();
  //   console.log(newTree);
  //   expect(newTree.children.length).toBe(3);
  //   const thirdChild = newTree.children[1];
  //   expect(thirdChild.children.length).toBe(2);
  // });

  // test('deeper tree', () => {
  //   const newNode = new RollNode([4,2]);
  //   const newTree = newNode.makeOutcomesTree();
  //   console.log(newTree);
  //   console.log(newTree.children[0].children[0]);
  // });

  // test('even deeper tree', () => {
  //   const newNode = new RollNode([9,9]);
  //   const newTree = newNode.makeOutcomesTree();
  //   console.log(newTree);
  //   // console.log(newTree.children[0].children[0]);
  // });

  test('make tree with class method', () => {
    const newNode = new RollNode([2, 2]);
    newNode.makeOutcomesTree();
  });


  // describe('RollNode methods', () => {
  //   test('depth of a newNode with no parent is 0', () => {
  //     const newNode = new RollNode([1,1]);
  //     expect(newNode.depth).toBe(0);
  //     expect(newNode.root).toBe(newNode);
  //     expect(newNode.isLeaf()).toBe(true);
  //   });

  //   test('the root of a depth 1 node is the depth 0 node', () => {
  //     const newNode = new RollNode([1,1]);
  //     newNode.makeOutcomesTree();
  //     console.log(newNode);
  //     expect(newNode.children[0].depth).toBe(1);
  //   });
  // });
});
