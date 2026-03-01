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
