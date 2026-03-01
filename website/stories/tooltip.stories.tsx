import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, Button, Layout } from '@ui-kitten/components';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
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
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false);
    return (
      <Layout style={{ padding: 40, alignItems: 'center' }}>
        <Tooltip
          visible={visible}
          placement={args.placement || 'top'}
          anchor={() => (
            <Button onPress={() => setVisible(!visible)}>Toggle Tooltip</Button>
          )}
          onBackdropPress={() => setVisible(false)}
        >
          Hi! I'm a tooltip.
        </Tooltip>
      </Layout>
    );
  },
};
