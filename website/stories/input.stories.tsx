import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@ui-kitten/components';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    status: {
      control: 'select',
      options: ['basic', 'primary', 'success', 'info', 'warning', 'danger', 'control'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    status: 'basic',
    size: 'medium',
    disabled: false,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'john@example.com',
  },
};

export const WithCaption: Story = {
  args: {
    label: 'Password',
    caption: 'Should contain at least 8 symbols',
    placeholder: 'Password',
    status: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};
