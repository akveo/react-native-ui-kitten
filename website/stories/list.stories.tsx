import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { List, ListItem } from '@ui-kitten/components';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
};

export default meta;
type Story = StoryObj<typeof List>;

const data = [
  { title: 'Item 1', description: 'Description for Item 1' },
  { title: 'Item 2', description: 'Description for Item 2' },
  { title: 'Item 3', description: 'Description for Item 3' },
  { title: 'Item 4', description: 'Description for Item 4' },
];

export const Default: Story = {
  render: () => (
    <List
      style={{ maxHeight: 300 }}
      data={data}
      renderItem={({ item }) => (
        <ListItem title={item.title} description={item.description} />
      )}
    />
  ),
};

export const SimpleList: Story = {
  render: () => (
    <List
      style={{ maxHeight: 300 }}
      data={data}
      renderItem={({ item }) => <ListItem title={item.title} />}
    />
  ),
};
