// src/components/CalculatorButtons.jsx
import React from 'react';
import './CalculatorButtons.css';

const CalculatorButtons = ({ onButtonClick, activeButton }) => {
  const buttons = [
    'C', '+-', '%', '/',
    '7', '8', '9', 'X',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  return (
    <div className="buttons">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          className={btn === activeButton ? 'active' : ''}
          onClick={() => onButtonClick(btn)}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default CalculatorButtons;
