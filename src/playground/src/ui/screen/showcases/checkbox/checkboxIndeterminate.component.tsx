import React from 'react';
import { StyleSheet } from 'react-native';
import {
  CheckBox,
  Layout,
} from 'react-native-ui-kitten';

export class CheckboxIndeterminateShowcase extends React.Component {

  state = {
    mainCheckboxChecked: false,
    mainCheckboxIndeterminate: false,
    checkbox1Checked: false,
    checkbox2Checked: false,
    checkbox3Checked: false,
  };

  onMainCheckboxChange = (checked) => {
    if (checked) {
      this.setState({
        checkbox1Checked: true,
        checkbox2Checked: true,
        checkbox3Checked: true,
      });
    } else {
      this.setState({
        checkbox1Checked: false,
        checkbox2Checked: false,
        checkbox3Checked: false,
      });
    }
    this.setState({ mainCheckboxChecked: checked });
  };

  onCheckbox1Change = (checked) => {
    this.setState({ checkbox1Checked: checked }, this.setMainCheckboxDependingState);
  };

  onCheckbox2Change = (checked) => {
    this.setState({ checkbox2Checked: checked }, this.setMainCheckboxDependingState);
  };

  onCheckbox3Change = (checked) => {
    this.setState({ checkbox3Checked: checked }, this.setMainCheckboxDependingState);
  };

  setMainCheckboxDependingState = () => {
    const { checkbox1Checked, checkbox2Checked, checkbox3Checked } = this.state;
    const states = [checkbox1Checked, checkbox2Checked, checkbox3Checked];
    const someChecked = states.some((item) => item === true);
    const everyChecked = states.every((item) => item === true);

    if (someChecked && !everyChecked) {
      this.setState({
        mainCheckboxChecked: true,
        mainCheckboxIndeterminate: true,
      });
    } else if (!someChecked && !everyChecked) {
      this.setState({
        mainCheckboxChecked: false,
        mainCheckboxIndeterminate: false,
      });
    } else if (everyChecked) {
      this.setState({
        mainCheckboxChecked: true,
        mainCheckboxIndeterminate: false,
      });
    }
  };

  render() {
    const {
      mainCheckboxChecked,
      mainCheckboxIndeterminate,
      checkbox1Checked,
      checkbox2Checked,
      checkbox3Checked,
    } = this.state;

    return (
      <Layout style={styles.container}>
        <CheckBox
          style={styles.checkbox}
          text='Main'
          checked={mainCheckboxChecked}
          indeterminate={mainCheckboxIndeterminate}
          onChange={this.onMainCheckboxChange}
        />
        <CheckBox
          text='Checkbox 1'
          style={[styles.checkbox, styles.leftSpace]}
          checked={checkbox1Checked}
          onChange={this.onCheckbox1Change}
        />
        <CheckBox
          text='Checkbox 2'
          style={[styles.checkbox, styles.leftSpace]}
          checked={checkbox2Checked}
          onChange={this.onCheckbox2Change}
        />
        <CheckBox
          text='Checkbox 3'
          style={[styles.checkbox, styles.leftSpace]}
          checked={checkbox3Checked}
          onChange={this.onCheckbox3Change}
        />
      </Layout>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  checkbox: {
    marginVertical: 4,
  },
  leftSpace: {
    marginHorizontal: 4,
  },
});
