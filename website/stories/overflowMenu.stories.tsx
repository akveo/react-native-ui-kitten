import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { OverflowMenu, MenuItem, Button, Layout, IndexPath } from '@ui-kitten/components';

const meta: Meta<typeof OverflowMenu> = {
  title: 'Components/OverflowMenu',
  component: OverflowMenu,
};

export default meta;
type Story = StoryObj<typeof OverflowMenu>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | null>(null);

    const onItemSelect = (index: IndexPath) => {
      setSelectedIndex(index);
      setVisible(false);
    };

    return (
      <Layout style={{ padding: 40, alignItems: 'center' }}>
        <OverflowMenu
          visible={visible}
          anchor={() => (
            <Button onPress={() => setVisible(!visible)}>Menu</Button>
          )}
          selectedIndex={selectedIndex}
          onSelect={onItemSelect}
          onBackdropPress={() => setVisible(false)}
        >
          <MenuItem title="Edit" />
          <MenuItem title="Copy" />
          <MenuItem title="Delete" />
        </OverflowMenu>
      </Layout>
    );
  },
};
