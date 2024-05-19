// src/stories/CalculatorButtons.stories.jsx

import React from 'react';
import CalculatorButtons from '../components/CalculatorButtons';

export default {
  title: 'Components/CalculatorButtons',
  component: CalculatorButtons,
};

const Template = (args) => <CalculatorButtons {...args} />;

export const Default = Template.bind({});
Default.args = {
  onButtonClick: (btn) => console.log(btn),
  activeButton: null,
};
