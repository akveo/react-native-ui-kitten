import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
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
      <View style={styles.container}>
        <RadioGroup
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
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  radio: {
    marginBottom: 16,
  },
});
