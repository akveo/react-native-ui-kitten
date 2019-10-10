import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Radio,
  RadioGroup,
} from 'react-native-ui-kitten';

export class RadioGroupSimpleUsageShowcase extends React.Component {

  state = {
    selectedIndex: 0,
  };

  onGroupSelectionChange = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <RadioGroup
        style={styles.container}
        selectedIndex={this.state.selectedIndex}
        onChange={this.onGroupSelectionChange}>
        <Radio
          style={styles.radio}
          text='Option 1'
        />
        <Radio
          style={styles.radio}
          text='Option 2'
        />
        <Radio
          style={styles.radio}
          text='Option 3'
        />
      </RadioGroup>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  radio: {
    marginVertical: 8,
  },
});
