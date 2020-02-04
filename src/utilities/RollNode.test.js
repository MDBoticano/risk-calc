import {
  RollNode, 
  createTree,
} from './RollNode';

describe('RollNode class', () => {
  // test('make a new node', () => {
  //   const newNode = new RollNode([1, 1]);
  //   console.log(newNode);
  // });

  test('create a tree from a terminating node', () => {
    const terminatingNode = new RollNode([1, 0]);
    const newTree = createTree(terminatingNode);
    console.log(newTree);
  });

  test('create a tree from a non-terminating node', () => {
    const nonTerminatingNode = new RollNode([1, 1]);
    const newTree = createTree(nonTerminatingNode);
    console.log(newTree);
    expect((newTree.children).length).toBe(2);
  });

  test('create a tree with depth 3', () => {
    const newNode = new RollNode([2,2]);
    const newTree = createTree(newNode);
    console.log(newTree);
    expect(newTree.children.length).toBe(3);
    const thirdChild = newTree.children[2];
    expect(thirdChild.children.length).toBe(2);
  });
});
