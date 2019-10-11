import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Radio,
  RadioGroup,
} from 'react-native-ui-kitten';

export class RadioGroupSimpleUsageShowcase extends React.Component {

  state = {
    selectedIndex: 0,
  };

  onChange = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <RadioGroup
        style={styles.container}
        selectedIndex={this.state.selectedIndex}
        onChange={this.onChange}>
        <Radio style={styles.radio} text='Option 1' />
        <Radio style={styles.radio} text='Option 2' />
        <Radio style={styles.radio} text='Option 3' />
      </RadioGroup>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  radio: {
    marginVertical: 4,
  },
});
