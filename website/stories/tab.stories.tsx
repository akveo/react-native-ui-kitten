import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab, TabBar, TabView, Text, Layout } from '@ui-kitten/components';

const meta: Meta<typeof TabBar> = {
  title: 'Components/Tab',
  component: TabBar,
};

export default meta;
type Story = StoryObj<typeof TabBar>;

export const TabBarDefault: Story = {
  name: 'TabBar',
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <TabBar selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        <Tab title="Users" />
        <Tab title="Orders" />
        <Tab title="Settings" />
      </TabBar>
    );
  },
};

export const TabViewDefault: Story = {
  name: 'TabView',
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <TabView selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        <Tab title="Users">
          <Layout style={{ padding: 16 }}>
            <Text category="p1">Users tab content</Text>
          </Layout>
        </Tab>
        <Tab title="Orders">
          <Layout style={{ padding: 16 }}>
            <Text category="p1">Orders tab content</Text>
          </Layout>
        </Tab>
        <Tab title="Settings">
          <Layout style={{ padding: 16 }}>
            <Text category="p1">Settings tab content</Text>
          </Layout>
        </Tab>
      </TabView>
    );
  },
};
