import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollView, View } from 'react-native';
import { Button, Tab, TabBar, TabView, Text, Layout } from '@ui-kitten/components';

const meta: Meta<typeof TabBar> = {
  title: 'Components/Tab',
  component: TabBar,
};

export default meta;
type Story = StoryObj<typeof TabBar>;

export const TabBarDefault: Story = {
  name: 'TabBar',
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <TabBar selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        <Tab title="Users" />
        <Tab title="Orders" />
        <Tab title="Settings" />
      </TabBar>
    );
  },
};

export const TabViewDefault: Story = {
  name: 'TabView',
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <TabView selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        <Tab title="Users">
          <Layout style={{ padding: 16 }}>
            <Text category="p1">Users tab content</Text>
          </Layout>
        </Tab>
        <Tab title="Orders">
          <Layout style={{ padding: 16 }}>
            <Text category="p1">Orders tab content</Text>
          </Layout>
        </Tab>
        <Tab title="Settings">
          <Layout style={{ padding: 16 }}>
            <Text category="p1">Settings tab content</Text>
          </Layout>
        </Tab>
      </TabView>
    );
  },
};

const ROWS = Array.from({ length: 40 }, (_, index) => `Row ${index + 1}`);

// #1498: content taller than the tab must scroll on the web. The TabView needs a bounded height
// (here the parent's 320px) and its pages fill it, so the ScrollView inside has something to scroll.
export const TabViewScroll: Story = {
  name: 'TabView scrolling content',
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <View style={{ height: 320 }}>
        <TabView style={{ flex: 1 }} selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
          <Tab title="Long">
            <ScrollView testID="tab-scroll" style={{ flex: 1 }}>
              {ROWS.map((row) => (
                <Layout key={row} style={{ padding: 12 }} level="2">
                  <Text category="p1">{row}</Text>
                </Layout>
              ))}
            </ScrollView>
          </Tab>
          <Tab title="Short">
            <Layout style={{ padding: 16 }}>
              <Text category="p1">Short tab content</Text>
            </Layout>
          </Tab>
        </TabView>
      </View>
    );
  },
};

// #1397: a screen a web navigator keeps mounted but hidden lays the pager out at zero width; the
// pager must stay quiet while hidden and respond again once shown.
export const TabViewHidden: Story = {
  name: 'TabView hidden and shown again',
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [hidden, setHidden] = useState(false);
    const [selects, setSelects] = useState(0);
    const onSelect = (index: number): void => {
      setSelects((count) => count + 1);
      setSelectedIndex(index);
    };
    return (
      <View>
        <Button testID="tab-hide" size="small" onPress={() => setHidden((value) => !value)}>
          {hidden ? 'SHOW' : 'HIDE'}
        </Button>
        <Text testID="tab-state">{`selected: ${selectedIndex}, onSelect calls: ${selects}`}</Text>
        <View style={hidden ? { display: 'none' } : undefined}>
          <TabView selectedIndex={selectedIndex} onSelect={onSelect}>
            <Tab title="First">
              <Layout style={{ padding: 16 }}>
                <Text category="p1">First tab content</Text>
              </Layout>
            </Tab>
            <Tab title="Second">
              <Layout style={{ padding: 16 }}>
                <Text category="p1">Second tab content</Text>
              </Layout>
            </Tab>
          </TabView>
        </View>
      </View>
    );
  },
};

// #1234: pages loaded on demand must not bounce when tapping tabs.
export const TabViewLazy: Story = {
  name: 'TabView lazy pages',
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selects, setSelects] = useState<number[]>([]);
    const onSelect = (index: number): void => {
      setSelects((all) => [...all, index]);
      setSelectedIndex(index);
    };
    return (
      <View>
        <Text testID="lazy-state">{`selected: ${selectedIndex}, calls: ${selects.join(',')}`}</Text>
        <TabView selectedIndex={selectedIndex} onSelect={onSelect} shouldLoadComponent={(index) => index === selectedIndex}>
          {['One', 'Two', 'Three', 'Four'].map((title, index) => (
            <Tab key={title} title={title}>
              <Layout style={{ padding: 16, height: 60 + index * 40 }}>
                <Text category="p1">{`${title} content`}</Text>
              </Layout>
            </Tab>
          ))}
        </TabView>
      </View>
    );
  },
};
