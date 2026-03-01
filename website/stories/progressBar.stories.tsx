import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from '@ui-kitten/components';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
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
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    progress: 0.5,
    status: 'primary',
    size: 'medium',
    animating: false,
  },
};

export const Indeterminate: Story = {
  args: {
    animating: true,
    status: 'primary',
  },
};
