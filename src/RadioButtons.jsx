import React, { useState } from 'react';
import styled from 'styled-components';

const RadioButton = styled.button`
  appearance: none;
  padding: 0.5rem 0.75rem;
  border: solid 1px ${props => props.selected ? `blue` : `grey`};
  color: ${props => props.selected ? `blue` : `grey` };

  &:focus,
  &:hover {
    text-decoration: underline;
    outline: thin;
  }
`;

export const RadioButtons = ({ buttons, callback }) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (value) => {
    setSelected(value);
    callback(value);
  };

  const makeButtons = (buttons) => {
    const radioButtons = buttons.map((button) => {
      const { label, value } = button;

      const isSelected = () => { return value === selected ? true : false };

      return (
        <RadioButton
          key={value}
          type="button"
          selected={isSelected(value)}
          onClick={() => handleSelect(value)}
        >
          {label}
        </RadioButton> 
      );
    });

    return radioButtons;
  };

  return (
    <div className="radioButtons">
      {makeButtons(buttons)}
    </div>
  );
};


