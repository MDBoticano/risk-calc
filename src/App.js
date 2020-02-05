import React from 'react';
import './App.scss';

import { 
  RollNode,
  createTree,
} from './utilities/RollNode';

const Node = ({ node }) => {
  const renderNode = (node) => {
    return (
      <div className="node">
        <p className="node-rollPair">
          {`${node.rollPair[0]}, ${node.rollPair[1]}`}
        </p>
        { node.children.length > 0 &&
          <div className={`node-children-${node.children.length}`}>
            { node.children.map((child) => { return renderNode(child); }) }
          </div>
        }
      </div>
    );
  };

  return (
    <div className="node-wrapper">
      {renderNode(node)}
    </div>
  );
};

const App = () => {
  // const newNode = new RollNode([1,0]);
  const newNode = new RollNode([3,2]);
  const nodeTree = createTree(newNode);

  const displayTree = (tree) => {
    return(
      <div className="rollNode-tree">
        <Node node={tree} />
      </div>
    );
  };
  
  return (
    <div className="App">
      {displayTree(nodeTree)}
    </div>
  );
};

export default App;
