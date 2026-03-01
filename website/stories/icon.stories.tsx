import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, Layout } from '@ui-kitten/components';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: 'select',
      options: [
        'star', 'heart', 'home', 'settings', 'search',
        'person', 'bell', 'email', 'lock', 'eye',
        'arrow-back', 'arrow-forward', 'checkmark', 'close', 'plus',
      ],
    },
    animation: {
      control: 'select',
      options: ['zoom', 'pulse', 'shake', 'infinite'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'star',
  },
  render: (args) => (
    <Layout style={{ padding: 16 }}>
      <Icon
        {...args}
        style={{ width: 32, height: 32 }}
        fill="#3366FF"
      />
    </Layout>
  ),
};

export const IconGallery: Story = {
  render: () => {
    const icons = [
      'star', 'heart', 'home', 'settings', 'search',
      'person', 'bell', 'email', 'lock', 'eye',
      'arrow-back', 'arrow-forward', 'checkmark', 'close', 'plus',
    ];
    return (
      <Layout style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, padding: 16 }}>
        {icons.map((name) => (
          <Icon
            key={name}
            name={name}
            style={{ width: 24, height: 24 }}
            fill="#3366FF"
          />
        ))}
      </Layout>
    );
  },
};
