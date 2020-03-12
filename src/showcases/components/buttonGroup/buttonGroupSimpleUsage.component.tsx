import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonGroup, Layout, Text } from '@ui-kitten/components';

export const ButtonGroupSimpleUsageShowcase = () => {

  const [text, setText] = React.useState('Press any button');

  return (
    <Layout style={styles.container} level='1'>

      <ButtonGroup>
        <Button onPress={() => setText('Left button pressed')}>L</Button>
        <Button onPress={() => setText('Middle button pressed')}>M</Button>
        <Button onPress={() => setText('Right button pressed')}>R</Button>
      </ButtonGroup>

      <Text style={styles.text}>{text}</Text>

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
