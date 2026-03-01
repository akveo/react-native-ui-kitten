import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  argTypes: {
    status: {
      control: 'select',
      options: ['basic', 'primary', 'success', 'info', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const movies = [
  'Star Wars',
  'Star Trek',
  'Stargate',
  'The Matrix',
  'The Lord of the Rings',
  'The Hobbit',
  'Inception',
  'Interstellar',
];

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const filtered = movies.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase()),
    );

    return (
      <Autocomplete
        {...args}
        placeholder="Search movies..."
        value={value}
        onChangeText={setValue}
        onSelect={(index) => setValue(filtered[index])}
      >
        {filtered.map((title, i) => (
          <AutocompleteItem key={i} title={title} />
        ))}
      </Autocomplete>
    );
  },
};
