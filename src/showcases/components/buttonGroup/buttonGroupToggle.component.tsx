import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonGroup, Layout, Text } from '@ui-kitten/components';

export const ButtonGroupToggleShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <Layout
      testID='button-group-toggle'
      style={styles.container}
      level='1'
    >

      <ButtonGroup
        testID='button-group-toggle-group'
        appearance='outline'
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      >
        <Button testID='button-group-toggle-day'>
          Day
        </Button>
        <Button testID='button-group-toggle-week'>
          Week
        </Button>
        <Button testID='button-group-toggle-month'>
          Month
        </Button>
      </ButtonGroup>

      <Text
        testID='button-group-toggle-value'
        style={styles.text}
      >
        {`Selected: ${selectedIndex}`}
      </Text>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 8,
  },
});
