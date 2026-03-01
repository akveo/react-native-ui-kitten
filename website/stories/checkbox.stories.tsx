import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckBox } from '@ui-kitten/components';

const meta: Meta<typeof CheckBox> = {
  title: 'Components/CheckBox',
  component: CheckBox,
  argTypes: {
    status: {
      control: 'select',
      options: ['basic', 'primary', 'success', 'info', 'warning', 'danger', 'control'],
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {
  args: {
    children: 'CheckBox',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    children: 'Checked',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    children: 'Indeterminate',
    indeterminate: true,
  },
};
