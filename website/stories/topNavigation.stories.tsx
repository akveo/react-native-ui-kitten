import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';

const meta: Meta<typeof TopNavigation> = {
  title: 'Components/TopNavigation',
  component: TopNavigation,
  argTypes: {
    alignment: {
      control: 'select',
      options: ['start', 'center'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopNavigation>;

const BackIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="arrow-back" />
);

const MenuIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="more-vertical" />
);

export const Default: Story = {
  args: {
    title: 'Application',
    alignment: 'center',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Application',
    subtitle: 'Subtitle',
    alignment: 'center',
  },
};

export const WithAccessories: Story = {
  render: () => (
    <TopNavigation
      title="Application"
      subtitle="Subtitle"
      alignment="center"
      accessoryLeft={() => <TopNavigationAction icon={BackIcon} />}
      accessoryRight={() => <TopNavigationAction icon={MenuIcon} />}
    />
  ),
};
