import React, { useState } from 'react';
import './App.scss';

import { 
  RollNode,
} from './utilities/RollNode';

const App = () => {
  const [numAttackers, setNumAttackers] = useState(0);
  const [numDefenders, setNumDefenders] = useState(0);

  const [oddsAttackWins, setOddsAttackWins] = useState([]);
  const [oddsAttackLoses, setOddsAttackLoses] = useState([]);

  // make form 

  // make modifiers

  // return outcomes percentages in a table

  const calculateOdds = (event) => {
    event.preventDefault();

    const rollTree = new RollNode([numAttackers, numDefenders]);
    const treeLeafOdds = rollTree.getOdds();
    console.log(treeLeafOdds);

    console.log('Keys:', Object.keys(treeLeafOdds));
    console.log('Values:', Object.values(treeLeafOdds));

    const oddsKeys = Object.keys(treeLeafOdds);
    const oddsValues = Object.values(treeLeafOdds);

    const attackWins = [];
    const attackLoses = [];

    for (let i = 0; i < oddsKeys.length; i++) {
      const oddsObject = {};
      oddsObject[oddsKeys[i]] = oddsValues[i];
      if (oddsKeys[i][0] !== '0') {
        // setOddsAttackWins([...oddsAttackWins, oddsObject ]);
        attackWins.push(oddsObject);
      } else {
        // setOddsAttackLoses([...oddsAttackLoses, oddsObject ]);
        attackLoses.push(oddsObject);
      }
    }
    console.log(attackWins);
    console.log(attackLoses);

    setOddsAttackWins(attackWins);
    setOddsAttackLoses(attackLoses);
  };

  const resetForm = () => {
    setNumAttackers(0);
    setNumDefenders(0);
  };
  
  return (
    <div className="App">
      <form onSubmit={(event) => calculateOdds(event)}>
        <label htmlFor="numAttackers">Attackers</label>
        <input
          type="number" name="numAttackers" min="0" max="99"
          value={numAttackers}
          onChange={(event) => setNumAttackers(event.target.value)}
        />
        <label htmlFor="numDefenders">Defenders</label>
        <input
          type="number" name="numDefenders" min="0" max="99"
          value={numDefenders}
          onChange={(event) => setNumDefenders(event.target.value)}
        />
        <button type="reset" onClick={() => resetForm()}>Reset</button>
        <button type="submit">Calculate Odds</button>
      </form>
      
      <div>
        {/* {odds} */}
      </div>
    </div>
  );
};

export default App;
