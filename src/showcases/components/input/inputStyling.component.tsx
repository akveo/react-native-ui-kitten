import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, Text } from '@ui-kitten/components';

const MyInput = (props) => (
  <Input
    {...props}
    textStyle={styles.inputText}
    label={evaProps => <Text {...evaProps}>{props.label}</Text>}
    caption={evaProps => <Text {...evaProps}>{props.caption}</Text>}
  />
);

const styles = StyleSheet.create({
  inputText: {},
});

export const InputStylingShowcase = () => {

  const [value, setValue] = React.useState('');

  return (
    <MyInput
      value={value}
      placeholder='Place your Text'
      label='Label'
      caption='Caption'
      onChangeText={nextValue => setValue(nextValue)}
    />
  );
};
