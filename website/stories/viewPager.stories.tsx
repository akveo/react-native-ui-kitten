import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Layout, PageIndicator, Text, ViewPager } from '@ui-kitten/components';

const meta: Meta<typeof PageIndicator> = {
  title: 'Components/ViewPager',
  component: PageIndicator,
  argTypes: {
    status: {
      control: 'select',
      options: ['basic', 'primary', 'success', 'info', 'warning', 'danger', 'control'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageIndicator>;

const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4'];

const PagerWithIndicator = (args: React.ComponentProps<typeof PageIndicator>): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  return (
    <Layout style={{ width: 320 }}>
      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        onLayout={event => setPageWidth(event.nativeEvent.layout.width / PAGES.length)}
        onOffsetChange={offset => pageWidth > 0 && setProgress(offset / pageWidth)}
      >
        {PAGES.map(title => (
          <Layout key={title} level="2" style={{ height: 160, alignItems: 'center', justifyContent: 'center' }}>
            <Text category="h5">{title}</Text>
          </Layout>
        ))}
      </ViewPager>
      <PageIndicator
        {...args}
        pageCount={PAGES.length}
        selectedIndex={selectedIndex}
        progress={progress}
        onSelect={setSelectedIndex}
      />
    </Layout>
  );
};

export const WithPageIndicator: Story = {
  args: { status: 'primary' },
  render: (args) => <PagerWithIndicator {...args} />,
};

export const IndicatorStatuses: Story = {
  render: () => (
    <Layout style={{ gap: 8 }}>
      {(['basic', 'primary', 'success', 'info', 'warning', 'danger'] as const).map(status => (
        <PageIndicator key={status} pageCount={5} selectedIndex={2} status={status} />
      ))}
    </Layout>
  ),
};
