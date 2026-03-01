import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal, Button, Card, Text } from '@ui-kitten/components';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button onPress={() => setVisible(true)}>Open Modal</Button>
        <Modal
          visible={visible}
          backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onBackdropPress={() => setVisible(false)}
        >
          <Card disabled>
            <Text category="h6" style={{ marginBottom: 8 }}>Modal Title</Text>
            <Text category="p1" style={{ marginBottom: 16 }}>
              This is a modal dialog. Tap the backdrop to dismiss.
            </Text>
            <Button onPress={() => setVisible(false)}>Dismiss</Button>
          </Card>
        </Modal>
      </>
    );
  },
};
