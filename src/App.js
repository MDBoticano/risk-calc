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
    // console.log(treeLeafOdds);

    // console.log('Keys:', Object.keys(treeLeafOdds));
    // console.log('Values:', Object.values(treeLeafOdds));

    const oddsKeys = Object.keys(treeLeafOdds);
    const oddsValues = Object.values(treeLeafOdds);

    const attackWins = [];
    const attackLoses = [];

    for (let i = 0; i < oddsKeys.length; i++) {
      const oddsObject = {};
      oddsObject[oddsKeys[i]] = oddsValues[i];
      if (oddsKeys[i][0] !== '0') { 
        attackWins.push(oddsObject);
      } else {
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
  
  const displayOutcomes = (outcomeArray) => {
    const displayedOutcomes = outcomeArray.map((outcome) => {
      return (
        <div key={Object.keys(outcome)[0]}>
          <p>{Object.keys(outcome)[0]}</p>
          <p>{((Object.values(outcome)[0])*100).toFixed(2)}</p>
        </div>
      );
    });

    return displayedOutcomes;
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
      
      <div className="outcomesTable">
        <div className="outcomesTable__wins">
          <p>Attack Wins</p>
          { displayOutcomes(oddsAttackWins) }
        </div>
        <div className="outcomesTable__losses">
          <p>Attack Loses</p>
          { displayOutcomes(oddsAttackLoses) }
        </div>
      </div>
    </div>
  );
};

export default App;
