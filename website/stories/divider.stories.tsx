import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider, Layout, Text } from '@ui-kitten/components';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <Layout style={{ padding: 16 }}>
      <Text category="h6">Section 1</Text>
      <Divider style={{ marginVertical: 8 }} />
      <Text category="h6">Section 2</Text>
    </Layout>
  ),
};
