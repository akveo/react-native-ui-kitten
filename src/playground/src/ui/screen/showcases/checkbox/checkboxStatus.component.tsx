import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  CheckBox,
  Layout,
} from 'react-native-ui-kitten';

export class CheckboxStatusShowcase extends React.Component {

  state = {
    primaryChecked: false,
    successChecked: false,
    infoChecked: false,
    warningChecked: false,
    dangerChecked: false,
    basicChecked: false,
  };

  onPrimaryChange = (primaryChecked) => {
    this.setState({ primaryChecked });
  };

  onSuccessChange = (successChecked) => {
    this.setState({ successChecked });
  };

  onInfoChange = (infoChecked) => {
    this.setState({ infoChecked });
  };

  onWarningChange = (warningChecked) => {
    this.setState({ warningChecked });
  };

  onDangerChange = (dangerChecked) => {
    this.setState({ dangerChecked });
  };

  onBasicChange = (basicChecked) => {
    this.setState({ basicChecked });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <CheckBox
          style={styles.checkbox}
          status='primary'
          text='Primary'
          checked={this.state.primaryChecked}
          onChange={this.onPrimaryChange}
        />
        <CheckBox
          style={styles.checkbox}
          status='success'
          text='Success'
          checked={this.state.successChecked}
          onChange={this.onSuccessChange}
        />
        <CheckBox
          style={styles.checkbox}
          status='info'
          text='Info'
          checked={this.state.infoChecked}
          onChange={this.onInfoChange}
        />
        <CheckBox
          style={styles.checkbox}
          status='warning'
          text='Warning'
          checked={this.state.warningChecked}
          onChange={this.onWarningChange}
        />
        <CheckBox
          style={styles.checkbox}
          status='danger'
          text='Danger'
          checked={this.state.dangerChecked}
          onChange={this.onDangerChange}
        />
        <CheckBox
          style={styles.checkbox}
          status='basic'
          text='Basic'
          checked={this.state.basicChecked}
          onChange={this.onBasicChange}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  checkbox: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
});
