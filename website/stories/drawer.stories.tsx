import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer, DrawerGroup, DrawerItem, IndexPath } from '@ui-kitten/components';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
    return (
      <Drawer selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        <DrawerItem title="Users" />
        <DrawerItem title="Orders" />
        <DrawerItem title="Transactions" />
      </Drawer>
    );
  },
};

export const WithGroups: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0, 0));
    return (
      <Drawer selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        <DrawerGroup title="Akveo">
          <DrawerItem title="UI Kitten" />
          <DrawerItem title="Eva Design System" />
        </DrawerGroup>
        <DrawerGroup title="Other">
          <DrawerItem title="Settings" />
          <DrawerItem title="About" />
        </DrawerGroup>
      </Drawer>
    );
  },
};
