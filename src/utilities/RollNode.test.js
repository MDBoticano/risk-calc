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


  describe('RollNode methods', () => {
    // describe('a new node...', () => {
    //   const newNode = new RollNode([1,1]);
      
    //   test('has a depth of 0', () => {
    //     expect(newNode.depth).toBe(0);
    //   });

    //   test('has its root as itself', () => {
    //     expect(newNode.root).toBe(newNode);
    //     expect(newNode.isRoot()).toBe(true);
    //   });

    //   test('is also a leaf node', () => {
    //     expect(newNode.isLeaf()).toBe(true);
    //   });

    //   test('has a probability of 1.00', () => {
    //     expect(newNode.getRelativeProbability()).toBe(1);
    //   });
    // });

    // test('the root of a depth 1 node is the depth 0 node', () => {
    //   const newNode = new RollNode([1,1]);
    //   newNode.makeOutcomesTree();
    //   expect(newNode.children[0].depth).toBe(1);
    //   expect(newNode.children[0].root.depth).toBe(0);
    //   expect(newNode.children[0].root).toBe(newNode);
    //   expect(newNode.children[0].lossFromParent).toEqual([1, 0]);
    //   expect(newNode.children[1].lossFromParent).toEqual([0, 1]);
    // });

    // describe('battle units count', () => {
    //   test('more than max battle attackers/defenders', () => {
    //     const newNode = new RollNode([4, 4]);
    //     expect(newNode.maxAttackers).toBe(3);
    //     expect(newNode.maxDefenders).toBe(2);
    //   });

    //   test('equal to max battle attackers/defenders', () => {
    //     const newNode = new RollNode([3, 2]);
    //     expect(newNode.maxAttackers).toBe(3);
    //     expect(newNode.maxDefenders).toBe(2);
    //   });

    //   test('below max battle attackers/defenders', () => {
    //     const newNode = new RollNode([1, 1]);
    //     expect(newNode.maxAttackers).toBe(1);
    //     expect(newNode.maxDefenders).toBe(1);
    //   });
    // });

    describe('calculate probabilities for deep nodes', () => {
      const newNode = new RollNode([3,2]);
      newNode.makeOutcomesTree();
      newNode.getRelativeProbability();

      const kid = newNode.children[0];
      const kidRoll = kid.lossFromParent;

      test(`odds of ${kidRoll} is less with defender ammo shortage`, () => {
        const even = kid.getRelativeProbability();
        const defShortage = kid.getRelativeProbability({
          defender: "ammoShortage"
        });
        // console.log(even, defShortage);
        expect(defShortage).toBeLessThan(even);
      });

      test('rootProb of root node is 1', () => {
        const rootProb = newNode.getRootProbability();
        expect(rootProb).toEqual(1);
      });

      test('rootProb of a depth 1 node is same as relative', () => {
        const rootProb = kid.getRootProbability();
        const relProb = kid.getRelativeProbability();
        expect(rootProb).toEqual(relProb);
      });
    });
  });
});
