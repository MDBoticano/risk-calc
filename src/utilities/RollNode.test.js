import {
  RollNode, 
  createTree,
} from './RollNode';

describe('RollNode class', () => {
  // test('make a new node', () => {
  //   const newNode = new RollNode([1, 1]);
  //   console.log(newNode);
  // });

  // test('create a tree from a terminating node', () => {
  //   const terminatingNode = new RollNode([1, 0]);
  //   const newTree = createTree(terminatingNode);
  //   console.log(newTree);
  // });

  test('create a tree from a non-terminating node', () => {
    const nonTerminatingNode = new RollNode([1, 1]);
    const newTree = createTree(nonTerminatingNode);
    // console.log(newTree);
    console.log(newTree.children[0]);
  });
});
