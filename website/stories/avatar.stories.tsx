import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '@ui-kitten/components';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    shape: {
      control: 'select',
      options: ['round', 'rounded', 'square'],
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'giant'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    source: { uri: 'https://picsum.photos/200' },
    shape: 'round',
    size: 'medium',
  },
};

export const Square: Story = {
  args: {
    source: { uri: 'https://picsum.photos/200' },
    shape: 'square',
    size: 'large',
  },
};

export const Rounded: Story = {
  args: {
    source: { uri: 'https://picsum.photos/200' },
    shape: 'rounded',
    size: 'large',
  },
};
