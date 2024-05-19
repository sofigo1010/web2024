import React from 'react';
import Calculator from '../components/Calculator';

export default {
  title: 'Components/Calculator',
  component: Calculator,
};

const Template = (args) => <Calculator {...args} />;

export const Default = Template.bind({});
Default.args = {};
