import React from 'react';
import { StyleSheet } from 'react-native';
import { Datepicker, Text } from '@ui-kitten/components';

const MyDatepicker = (props) => (
  <Datepicker
    {...props}
    controlStyle={styles.control}
    label={evaProps => <Text {...evaProps}>{props.label}</Text>}
    caption={evaProps => <Text {...evaProps}>{props.caption}</Text>}
  />
);

const styles = StyleSheet.create({
  control: {},
});

export const DatepickerStylingShowcase = () => {

  const [value, setValue] = React.useState('');

  return (
    <MyDatepicker
      value={value}
      placeholder='Place your Text'
      label='Label'
      caption='Caption'
      onChangeText={nextValue => setValue(nextValue)}
    />
  );
};
