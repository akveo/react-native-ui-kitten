import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '@ui-kitten/components';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    category: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 's1', 's2', 'p1', 'p2', 'c1', 'c2', 'label'],
    },
    appearance: {
      control: 'select',
      options: ['default', 'alternative', 'hint'],
    },
    status: {
      control: 'select',
      options: ['basic', 'primary', 'success', 'info', 'warning', 'danger', 'control'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'Sample Text',
    category: 'p1',
    appearance: 'default',
  },
};

export const Heading: Story = {
  args: {
    children: 'Heading 1',
    category: 'h1',
  },
};

export const Caption: Story = {
  args: {
    children: 'Caption text',
    category: 'c1',
    appearance: 'hint',
  },
};

export const StatusColors: Story = {
  render: () => (
    <>
      <Text status="primary">Primary</Text>
      <Text status="success">Success</Text>
      <Text status="info">Info</Text>
      <Text status="warning">Warning</Text>
      <Text status="danger">Danger</Text>
    </>
  ),
};
