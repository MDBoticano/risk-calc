import React, { useState } from 'react';
import './App.scss';

import { RadioButtons } from './RadioButtons';

import { 
  RollNode,
} from './utilities/RollNode';

const App = () => {
  const [numAttackers, setNumAttackers] = useState(3);
  const [numDefenders, setNumDefenders] = useState(2);
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

  const formatPercent = (decimal) => {
    const number = parseFloat(decimal) * 100;
    return `${number.toFixed(2)}%`;
  };

  const displayTotalOutcome = (outcomeArray, label) => {
    let probabilitiesSum = "--";
    if (outcomeArray.length > 0) {
      probabilitiesSum = outcomeArray.map((outcome) => outcome.probability)
        .reduce((a,b) => a + b)
      probabilitiesSum = formatPercent(probabilitiesSum);
    } 
    return (
      <>
        <p className="outcomesTable__columnLabel">{label}</p>
        <p className="outcomesTable__columnTotal">
          {probabilitiesSum}
        </p>
      </>
    );
  };

  const displayOutcomes = (outcomeArray) => {
    const displayedOutcomes = outcomeArray.map((outcome) => {
      return (
        <div className="outcomesTable__outcomeItem" key={outcome.outcome}>
          <p>{outcome.outcome}</p>
          <p>{formatPercent(outcome.probability)}</p>
        </div>
      );
    });

    return (
      <ul className="outcomesTable__outcomesList">
        <div className="outcomesTable__outcomeItemLabel">
          <p>Outcome</p>
          <p>Probability</p>
        </div>
        {displayedOutcomes}
      </ul>
    );
  };

  // Only works for defenders for now
  const modifyModifiers = (modifier) => {
    setModifiers({ defender: modifier });
  };

  // TODO: calculate median/average outcome

  return (
    <div className="App">
      <header className="appHeader">
        <p className="appHeader__title">Risk Legacy</p>
        <p className="appHeader__subtitle">Battle Odds Calculator</p>
      </header>

      <div className="outcomesTable">
        <div className="outcomesTable__column">
          { displayTotalOutcome(oddsAttackWins, "Attacker Wins") }
          { displayOutcomes(oddsAttackWins) }
        </div>
        <div className="outcomesTable__column">
          { displayTotalOutcome(oddsAttackLoses, "Attacker Loses") }
          { displayOutcomes(oddsAttackLoses) }
        </div>
      </div>

      <form className="inputsForm" onSubmit={(event) => calculateOdds(event)}>
        <div className="inputsForm__section troopCount">
          <p className="inputsForm__sectionLabel">Troops</p>
          <div className="troopsInput">

          <div className="inputsForm__input troopsInput__rowItem">
            <label className="inputsForm__inputLabel" htmlFor="numAttackers">
              Attackers
            </label>
            <div className="inputsForm__inputField">
              <input
                type="number" required
                name="numAttackers" id="numAttackers"
                min="1" max="15"
                value={numAttackers} placeholder="0"
                onChange={(event) => setNumAttackers(event.target.value)}
              />
            </div>
          </div>

          <div className="inputsForm__input troopsInput__rowItem">
            <label className="inputsForm__inputLabel" htmlFor="numDefenders">
              Defenders
            </label>
            <div className="inputsForm__inputField">
              <input
                type="number" required
                name="numDefenders" id="numDefenders"
                min="1" max="15"
                value={numDefenders} placeholder="0"
                onChange={(event) => setNumDefenders(event.target.value)}
              />
            </div>
          </div>
          </div>
        </div>

        <div className="inputsForm__section">
          <p className="inputsForm__sectionLabel">Modifiers</p>
          <div className="inputsForm__input">
            <label htmlFor="defenderModifiers">Territory Scar</label>
            <div className="inputsForm__inputField">
              <RadioButtons
                buttons={[
                  { value: "", label: "None" },
                  { value: "bunker", label: "Bunker" },
                  { value: "ammoShortage", label: "Ammo Shortage" },
                ]}
                callback={modifyModifiers}
              />
            </div>
          </div>
        </div>

        <button className="inputsForm__submit" type="submit" autoFocus>
          Calculate
        </button>
      </form>
    </div>
  );
};

export default App;
