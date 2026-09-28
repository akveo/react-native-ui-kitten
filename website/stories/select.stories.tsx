import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, SelectItem } from '@ui-kitten/components';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    status: {
      control: 'select',
      options: ['basic', 'primary', 'success', 'info', 'warning', 'danger', 'control'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    placeholder: 'Select an option',
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem title="Option 1" />
      <SelectItem title="Option 2" />
      <SelectItem title="Option 3" />
    </Select>
  ),
};

export const PlacementAndWidth: Story = {
  args: {
    placeholder: 'Opens above, wider than the control',
    placement: 'top start',
    popoverProps: { fullWidth: false, style: { width: 320 } },
    style: { width: 200, marginTop: 200 },
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem title="Narrow control, wide list, option 1" />
      <SelectItem title="Narrow control, wide list, option 2" />
      <SelectItem title="Narrow control, wide list, option 3" />
    </Select>
  ),
};
