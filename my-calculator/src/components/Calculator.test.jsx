// src/components/Calculator.test.jsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Calculator from './Calculator';

test('Calculator performs basic addition', () => {
  render(<Calculator />);
  
  fireEvent.click(screen.getByRole('button', { name: '2' }));
  fireEvent.click(screen.getByRole('button', { name: '+' }));
  fireEvent.click(screen.getByRole('button', { name: '3' }));
  fireEvent.click(screen.getByRole('button', { name: '=' }));

  const display = screen.getByTestId('display');
  console.log(`Display content: ${display.textContent}`);
  expect(display).toHaveTextContent('5');
});

test('Calculator handles decimal input', () => {
  render(<Calculator />);

  fireEvent.click(screen.getByRole('button', { name: '2' }));
  fireEvent.click(screen.getByRole('button', { name: '.' }));
  fireEvent.click(screen.getByRole('button', { name: '5' }));
  fireEvent.click(screen.getByRole('button', { name: '+' }));
  fireEvent.click(screen.getByRole('button', { name: '1' }));
  fireEvent.click(screen.getByRole('button', { name: '.' }));
  fireEvent.click(screen.getByRole('button', { name: '5' }));
  fireEvent.click(screen.getByRole('button', { name: '=' }));

  const display = screen.getByTestId('display');
  console.log(`Display content: ${display.textContent}`);
  expect(display).toHaveTextContent('4');
});

test('Calculator handles division', () => {
  render(<Calculator />);

  fireEvent.click(screen.getByRole('button', { name: '8' }));
  fireEvent.click(screen.getByRole('button', { name: '/' }));
  fireEvent.click(screen.getByRole('button', { name: '2' }));
  fireEvent.click(screen.getByRole('button', { name: '=' }));

  const display = screen.getByTestId('display');
  console.log(`Display content: ${display.textContent}`);
  expect(display).toHaveTextContent('4');
});

test('Calculator handles +/- operation', () => {
  render(<Calculator />);

  fireEvent.click(screen.getByRole('button', { name: '5' }));
  fireEvent.click(screen.getByRole('button', { name: '+-' }));

  const display = screen.getByTestId('display');
  console.log(`Display content: ${display.textContent}`);
  expect(display).toHaveTextContent('-5');
});

test('Calculator handles keyboard input', () => {
  render(<Calculator />);
  
  fireEvent.keyDown(window, { key: '2' });
  fireEvent.keyDown(window, { key: '+' });
  fireEvent.keyDown(window, { key: '3' });
  fireEvent.click(screen.getByRole('button', { name: '=' }));

  const display = screen.getByTestId('display');
  console.log(`Display content: ${display.textContent}`);
  expect(display).toHaveTextContent('5');
});
