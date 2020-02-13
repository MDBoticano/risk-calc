import React, { useState } from 'react';
import './App.scss';

import { 
  RollNode,
} from './utilities/RollNode';

const App = () => {
  const [numAttackers, setNumAttackers] = useState("");
  const [numDefenders, setNumDefenders] = useState("");
  const [modifiers, setModifiers] = useState({ defender: "" });

  const [oddsAttackWins, setOddsAttackWins] = useState([]);
  const [oddsAttackLoses, setOddsAttackLoses] = useState([]);

  const calculateOdds = (event) => {
    event.preventDefault();

    const rollTree = new RollNode([numAttackers, numDefenders]);
    const treeLeafOdds = rollTree.getOdds(modifiers);

    const attackWins = [];
    const attackLoses = [];

    for (let i = 0; i < treeLeafOdds.length; i++) {
      if (treeLeafOdds[i].outcome[0] !== '0') { 
        attackWins.push(treeLeafOdds[i]);
      } else {
        attackLoses.push(treeLeafOdds[i]);
      }
    }

    setOddsAttackWins(attackWins);
    setOddsAttackLoses(attackLoses);
  };

  const resetForm = () => {
    setNumAttackers(0);
    setNumDefenders(0);
    setModifiers({ defender: "" });
  };
  
  const displayOutcomes = (outcomeArray) => {
    const displayedOutcomes = outcomeArray.map((outcome) => {
      return (
        <div className="outcomesTable__outcomeItem" key={outcome.outcome}>
          <p>{outcome.outcome}</p>
          <p>{((outcome.probability)*100).toFixed(2)}</p>
        </div>
      );
    });

    return (
      <ul className="outcomesTable__outcomesList">
        {displayedOutcomes}
      </ul>
    );
  };

  const displayTotalOutcome = (outcomeArray) => {
    if (outcomeArray.length <= 0) { return 0; }
    const probabilitiesSum = outcomeArray.map((outcome) => outcome.probability)
      .reduce((a,b) => a + b)
      .toFixed(2);
    return probabilitiesSum;
  };

  // Only works for defenders for now
  const modifyModifiers = (modifier) => {
    setModifiers({ defender: modifier });
  };

  // TODO: calculate median/average outcome

  return (
    <div className="App">
      <form className="inputsForm" onSubmit={(event) => calculateOdds(event)}>

        <div className="inputsForm__troopsCount">
          <h2>Troops</h2>
          <div className="inputsForm__input">
            <label htmlFor="numAttackers">Attackers</label>
            <input
              type="number" name="numAttackers" min="1" max="99"
              value={numAttackers} placeholder="0" required
              onChange={(event) => setNumAttackers(event.target.value)}
            />

            <label htmlFor="numDefenders">Defenders</label>
            <input
              type="number" name="numDefenders" min="1" max="99"
              value={numDefenders} placeholder="0" required
              onChange={(event) => setNumDefenders(event.target.value)}
            />
          </div>
        </div>

        <div className="inputsForm__modifiers">
          <h2>Modifiers</h2>
          <label htmlFor="defenderModifiers">Defenders Scar:</label>
          <select onChange={(event) => modifyModifiers(event.target.value)}>
            <option value="n/a">none</option>
            <option value="bunker">Bunker</option>
            <option value="ammoShortage">Ammo Shortage</option>
          </select>
        
        </div>

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
