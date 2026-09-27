import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover, Button, Text, Layout } from '@ui-kitten/components';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top', 'top start', 'top end',
        'bottom', 'bottom start', 'bottom end',
        'left', 'left start', 'left end',
        'right', 'right start', 'right end',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false);
    return (
      <Layout style={{ padding: 40, alignItems: 'center' }}>
        <Popover
          visible={visible}
          placement={args.placement || 'bottom'}
          anchor={() => (
            <Button onPress={() => setVisible(!visible)}>Toggle Popover</Button>
          )}
          onBackdropPress={() => setVisible(false)}
        >
          <Layout style={{ padding: 16 }}>
            <Text category="p1">Popover content</Text>
          </Layout>
        </Popover>
      </Layout>
    );
  },
};

export const AnchorFlex: Story = {
  name: 'Anchors sharing a row',
  render: () => {
    const [visible, setVisible] = useState<number | null>(null);
    const renderPopover = (index: number, flex: number, label: string) => (
      <Popover
        key={index}
        visible={visible === index}
        anchorContainerStyle={{ flex }}
        anchor={() => (
          <Button style={{ marginHorizontal: 4 }} onPress={() => setVisible(index)}>{label}</Button>
        )}
        onBackdropPress={() => setVisible(null)}
      >
        <Layout style={{ padding: 16 }}>
          <Text category="p1">{`${label} content`}</Text>
        </Layout>
      </Popover>
    );
    return (
      <Layout style={{ padding: 40, flexDirection: 'row' }}>
        {renderPopover(0, 1, 'One third')}
        {renderPopover(1, 2, 'Two thirds')}
      </Layout>
    );
  },
};
