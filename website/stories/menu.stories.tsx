import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu, MenuGroup, MenuItem, IndexPath } from '@ui-kitten/components';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
    return (
      <Menu selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        <MenuItem title="Users" />
        <MenuItem title="Orders" />
        <MenuItem title="Transactions" />
      </Menu>
    );
  },
};

export const WithGroups: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0, 0));
    return (
      <Menu selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        <MenuGroup title="Akveo">
          <MenuItem title="UI Kitten" />
          <MenuItem title="Eva Design System" />
        </MenuGroup>
        <MenuGroup title="Other">
          <MenuItem title="Settings" />
          <MenuItem title="About" />
        </MenuGroup>
      </Menu>
    );
  },
};
