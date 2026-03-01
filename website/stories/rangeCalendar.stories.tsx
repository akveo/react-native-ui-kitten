import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RangeCalendar, CalendarRange } from '@ui-kitten/components';

const meta: Meta<typeof RangeCalendar> = {
  title: 'Components/RangeCalendar',
  component: RangeCalendar,
};

export default meta;
type Story = StoryObj<typeof RangeCalendar>;

export const Default: Story = {
  render: () => {
    const [range, setRange] = useState<CalendarRange<Date>>({});
    return <RangeCalendar range={range} onSelect={setRange} />;
  },
};
