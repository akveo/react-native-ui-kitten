import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from '@ui-kitten/components';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
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
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    status: 'primary',
    size: 'medium',
    animating: true,
  },
};

export const Large: Story = {
  args: {
    status: 'info',
    size: 'large',
  },
};
