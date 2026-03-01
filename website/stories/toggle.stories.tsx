import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from '@ui-kitten/components';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    status: {
      control: 'select',
      options: ['basic', 'primary', 'success', 'info', 'warning', 'danger', 'control'],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    children: 'Toggle',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    children: 'Enabled',
    checked: true,
  },
};
