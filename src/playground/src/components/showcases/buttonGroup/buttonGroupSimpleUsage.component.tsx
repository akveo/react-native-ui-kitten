import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  ButtonGroup,
  Layout,
  Text,
} from '@ui-kitten/components';

export const ButtonGroupSimpleUsageShowcase = () => {

  const [text, setText] = React.useState('Press any button');

  const onLeftPress = () => {
    setText('Left button pressed');
  };

  const onMiddlePress = () => {
    setText('Middle button pressed');
  };

  const onRightPress = () => {
    setText('Right button pressed');
  };

  return (
    <Layout style={styles.container}>

      <ButtonGroup>
        <Button onPress={onLeftPress}>L</Button>
        <Button onPress={onMiddlePress}>M</Button>
        <Button onPress={onRightPress}>R</Button>
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
