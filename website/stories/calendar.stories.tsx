import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from '@ui-kitten/components';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState(new Date());
    return <Calendar date={date} onSelect={setDate} />;
  },
};

export const WithBounds: Story = {
  render: () => {
    const [date, setDate] = useState(new Date());
    const now = new Date();
    const min = new Date(now.getFullYear(), now.getMonth(), 1);
    const max = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return <Calendar date={date} onSelect={setDate} min={min} max={max} />;
  },
};
