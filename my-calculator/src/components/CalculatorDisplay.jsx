import React from 'react';
import './CalculatorDisplay.css';

const CalculatorDisplay = ({ displayValue, history }) => {
  return (
    <div className="display">
      <div className="history">{history}</div>
      <div data-testid="display">{displayValue}</div>
    </div>
  );
};

export default CalculatorDisplay;
