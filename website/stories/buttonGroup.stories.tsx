import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup, Button } from '@ui-kitten/components';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
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
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    appearance: 'filled',
    status: 'primary',
    size: 'medium',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Left</Button>
      <Button>Mid</Button>
      <Button>Right</Button>
    </ButtonGroup>
  ),
};

export const Outline: Story = {
  args: {
    appearance: 'outline',
    status: 'primary',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>L</Button>
      <Button>M</Button>
      <Button>R</Button>
    </ButtonGroup>
  ),
};
