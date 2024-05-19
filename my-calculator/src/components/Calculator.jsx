import React, { useState, useEffect } from 'react';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButtons from './CalculatorButtons';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [activeButton, setActiveButton] = useState(null);

  const evaluateExpression = (expression) => {
    try {
      const result = eval(expression.replace('X', '*').replace('%', '/100'));
      return result.toString().slice(0, 9);
    } catch {
      return 'Error';
    }
  };

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setDisplay('0');
    } else if (value === '+-') {
      setDisplay((prev) => 
        prev.charAt(0) === '-' ? prev.substring(1) : '-' + prev
      );
    } else if (value === '=') {
      const result = evaluateExpression(display);
      setDisplay(result);
    } else if (value === '.') {
      const lastNumber = display.split(/[\+\-\*\/]/).pop();
      if (!lastNumber.includes('.')) {
        setDisplay((prev) => (prev.length < 9 ? prev + value : prev));
      }
    } else {
      setDisplay((prev) => 
        prev.length < 9 ? (prev === '0' ? value : prev + value) : prev
      );
    }
  };

  const handleKeyPress = (event) => {
    const key = event.key;
    const keyMap = {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      'C': 'C', 'c': 'C', '+': '+', '-': '-', '/': '/',
      '*': 'X', '=': '=', 'Enter': '=', '.': '.', '%': '%',
      '_': '+-', 'x': 'X'
    };
    if (keyMap[key]) {
      event.preventDefault();
      handleButtonClick(keyMap[key]);
      setActiveButton(keyMap[key]);
      setTimeout(() => setActiveButton(null), 200);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="calculator">
      <CalculatorDisplay displayValue={display} />
      <CalculatorButtons onButtonClick={handleButtonClick} activeButton={activeButton} />
    </div>
  );
};

export default Calculator;
