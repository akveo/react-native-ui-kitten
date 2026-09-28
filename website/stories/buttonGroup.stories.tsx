import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup, Button } from '@ui-kitten/components';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    appearance: {
      control: 'select',
      options: ['filled', 'outline', 'ghost'],
    },
    status: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'danger', 'basic', 'control'],
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'giant'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    appearance: 'filled',
    status: 'primary',
    size: 'medium',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Left</Button>
      <Button>Mid</Button>
      <Button>Right</Button>
    </ButtonGroup>
  ),
};

export const Outline: Story = {
  args: {
    appearance: 'outline',
    status: 'primary',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>L</Button>
      <Button>M</Button>
      <Button>R</Button>
    </ButtonGroup>
  ),
};

const ToggleGroup = (args: React.ComponentProps<typeof ButtonGroup>): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <ButtonGroup
      {...args}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
    >
      <Button>Day</Button>
      <Button>Week</Button>
      <Button>Month</Button>
    </ButtonGroup>
  );
};

export const Toggle: Story = {
  args: {
    appearance: 'outline',
    status: 'primary',
  },
  render: (args) => <ToggleGroup {...args} />,
};

export const ChildOverrides: Story = {
  args: {
    appearance: 'outline',
    status: 'primary',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Default</Button>
      <Button status="danger">Danger</Button>
      <Button appearance="filled">Filled</Button>
    </ButtonGroup>
  ),
};
