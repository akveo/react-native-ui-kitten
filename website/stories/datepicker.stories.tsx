import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Datepicker } from '@ui-kitten/components';

const meta: Meta<typeof Datepicker> = {
  title: 'Components/Datepicker',
  component: Datepicker,
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
type Story = StoryObj<typeof Datepicker>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <Datepicker
        {...args}
        date={date}
        onSelect={setDate}
        placeholder="Pick a date"
      />
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <Datepicker
        label="Event Date"
        caption="Select the event date"
        date={date}
        onSelect={setDate}
        placeholder="Pick a date"
      />
    );
  },
};
