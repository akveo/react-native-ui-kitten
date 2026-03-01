import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, Text } from '@ui-kitten/components';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    status: {
      control: 'select',
      options: ['basic', 'primary', 'success', 'info', 'warning', 'danger'],
    },
    appearance: {
      control: 'select',
      options: ['filled', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <Text>Cards contain content and actions about a single subject.</Text>
    </Card>
  ),
};

export const WithStatus: Story = {
  args: {
    status: 'primary',
  },
  render: (args) => (
    <Card {...args}>
      <Text>Primary status card.</Text>
    </Card>
  ),
};
