import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircularProgressBar } from '@ui-kitten/components';

const meta: Meta<typeof CircularProgressBar> = {
  title: 'Components/CircularProgressBar',
  component: CircularProgressBar,
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
    },
    status: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'danger', 'basic', 'control'],
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'giant'],
    },
    animating: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgressBar>;

export const Default: Story = {
  args: {
    progress: 0.75,
    status: 'primary',
    size: 'medium',
    animating: false,
  },
};

export const Indeterminate: Story = {
  args: {
    animating: true,
    status: 'info',
    size: 'large',
  },
};
