import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@ui-kitten/components';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    appearance: {
      control: 'select',
      options: ['filled', 'outline', 'ghost'],
    },
    status: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'danger', 'basic', 'control'],
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'giant'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'BUTTON',
    appearance: 'filled',
    status: 'primary',
    size: 'medium',
    disabled: false,
  },
};

export const Outline: Story = {
  args: {
    children: 'OUTLINE',
    appearance: 'outline',
    status: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'GHOST',
    appearance: 'ghost',
    status: 'primary',
  },
};

export const Danger: Story = {
  args: {
    children: 'DANGER',
    appearance: 'filled',
    status: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    children: 'DISABLED',
    disabled: true,
  },
};
