import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from '@ui-kitten/components';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  argTypes: {
    status: {
      control: 'select',
      options: ['basic', 'primary', 'success', 'info', 'warning', 'danger', 'control'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <RadioGroup selectedIndex={selectedIndex} onChange={setSelectedIndex} {...args}>
        <Radio>Option 1</Radio>
        <Radio>Option 2</Radio>
        <Radio>Option 3</Radio>
      </RadioGroup>
    );
  },
};

export const WithStatus: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <RadioGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Radio status="primary">Primary</Radio>
        <Radio status="success">Success</Radio>
        <Radio status="warning">Warning</Radio>
        <Radio status="danger">Danger</Radio>
      </RadioGroup>
    );
  },
};
