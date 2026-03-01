import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  argTypes: {
    appearance: {
      control: 'select',
      options: ['default', 'noIndicator'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {
  render: (args) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <BottomNavigation selectedIndex={selectedIndex} onSelect={setSelectedIndex} {...args}>
        <BottomNavigationTab title="Users" />
        <BottomNavigationTab title="Orders" />
        <BottomNavigationTab title="Settings" />
      </BottomNavigation>
    );
  },
};

export const NoIndicator: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      >
        <BottomNavigationTab title="Users" />
        <BottomNavigationTab title="Orders" />
        <BottomNavigationTab title="Settings" />
      </BottomNavigation>
    );
  },
};
