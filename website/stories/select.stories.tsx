import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';

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

const ScrollToSelectedSelect = (args: React.ComponentProps<typeof Select>): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(29));
  return (
    <Select
      {...args}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
    >
      {Array.from({ length: 30 }, (_, index) => (
        <SelectItem key={index} title={`Option ${index + 1}`} />
      ))}
    </Select>
  );
};

export const ScrollToSelected: Story = {
  args: {
    label: 'Opens scrolled to the selected option',
  },
  render: (args) => <ScrollToSelectedSelect {...args} />,
};
