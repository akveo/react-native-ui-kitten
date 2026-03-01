import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Layout, Text } from '@ui-kitten/components';

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  argTypes: {
    level: {
      control: 'select',
      options: ['1', '2', '3', '4'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    level: '1',
  },
  render: (args) => (
    <Layout {...args} style={{ padding: 16 }}>
      <Text category="h6">Layout Level {args.level}</Text>
      <Text category="p1">This is a layout container with background level {args.level}.</Text>
    </Layout>
  ),
};

export const NestedLevels: Story = {
  render: () => (
    <Layout level="1" style={{ padding: 16 }}>
      <Text category="s1">Level 1</Text>
      <Layout level="2" style={{ padding: 16, marginTop: 8 }}>
        <Text category="s1">Level 2</Text>
        <Layout level="3" style={{ padding: 16, marginTop: 8 }}>
          <Text category="s1">Level 3</Text>
          <Layout level="4" style={{ padding: 16, marginTop: 8 }}>
            <Text category="s1">Level 4</Text>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  ),
};
