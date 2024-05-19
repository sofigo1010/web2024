import React from 'react';
import CalculatorDisplay from '../components/CalculatorDisplay';

export default {
  title: 'Components/CalculatorDisplay',
  component: CalculatorDisplay,
};

const Template = (args) => <CalculatorDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
  displayValue: '0',
};
