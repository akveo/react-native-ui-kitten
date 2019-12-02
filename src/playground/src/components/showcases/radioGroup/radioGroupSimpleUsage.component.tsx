import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Radio,
  RadioGroup,
  Text,
} from '@ui-kitten/components';

export const RadioGroupSimpleUsageShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onCheckedChange = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Layout>

      <Text style={styles.text} category='h6'>
        {`Selected Option: Option ${selectedIndex}`}
      </Text>

      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={onCheckedChange}>
        <Radio style={styles.radio} text='Option 1'/>
        <Radio style={styles.radio} text='Option 2'/>
        <Radio style={styles.radio} text='Option 3'/>
      </RadioGroup>

    </Layout>
  );
};

export const styles = StyleSheet.create({
  text: {
    marginVertical: 8,
  },
  radio: {
    marginVertical: 8,
  },
});
