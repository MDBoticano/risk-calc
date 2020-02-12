import React, { useState } from 'react';
import './App.scss';

import { 
  RollNode,
} from './utilities/RollNode';

const App = () => {
  const [numAttackers, setNumAttackers] = useState(0);
  const [numDefenders, setNumDefenders] = useState(0);
  const [modifiers] = useState(); // not yet used

  const [oddsAttackWins, setOddsAttackWins] = useState([]);
  const [oddsAttackLoses, setOddsAttackLoses] = useState([]);

  // return outcomes percentages in a table

  const calculateOdds = (event) => {
    event.preventDefault();

    const rollTree = new RollNode([numAttackers, numDefenders]);
    const treeLeafOdds = rollTree.getOdds(modifiers);
    // console.log(treeLeafOdds);

    // console.log('Keys:', Object.keys(treeLeafOdds));
    // console.log('Values:', Object.values(treeLeafOdds));

    // const oddsOutcomes = treeLeafOdds.map((obj) => obj.outcome);
    // const oddsProbabilities = treeLeafOdds.map((obj) => obj.probability);

    const attackWins = [];
    const attackLoses = [];

    for (let i = 0; i < treeLeafOdds.length; i++) {
      // const oddsObject = {};
      const outcome = treeLeafOdds[i].outcome;
      console.log('outcome:', outcome);
      if (treeLeafOdds[i].outcome[0] !== '0') { 
        attackWins.push(treeLeafOdds[i]);
      } else {
        attackLoses.push(treeLeafOdds[i]);
      }
    }
    // console.log(attackWins);
    // console.log(attackLoses);

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
        <div key={outcome.outcome}>
          <p>{outcome.outcome}</p>
          <p>{((outcome.probability)*100).toFixed(2)}</p>
        </div>
      );
    });

    return displayedOutcomes;
  };

  // TODO: redo leaf probabilities first to have easier object to work with
  const displayTotalOutcome = (outcomeArray) => {
    if (outcomeArray.length <= 0) { return 0; }
    const probabilitiesSum = outcomeArray.map((outcome) => outcome.probability)
      .reduce((a,b) => a + b)
      .toFixed(2);
    return probabilitiesSum;
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
          { displayTotalOutcome(oddsAttackWins) }
          { displayOutcomes(oddsAttackWins) }
        </div>
        <div className="outcomesTable__losses">
          <p>Attack Loses</p>
          { displayTotalOutcome(oddsAttackLoses) }
          { displayOutcomes(oddsAttackLoses) }
        </div>
      </div>
    </div>
  );
};

export default App;
