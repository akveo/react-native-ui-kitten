import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Toggle,
} from 'react-native-ui-kitten';

export class ToggleStatusShowcase extends React.Component {

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
        <Toggle
          style={styles.toggle}
          checked={this.state.primaryChecked}
          text='Primary'
          status='primary'
          onChange={this.onPrimaryChange}
        />
        <Toggle
          style={styles.toggle}
          checked={this.state.successChecked}
          text='Success'
          status='success'
          onChange={this.onSuccessChange}
        />
        <Toggle
          style={styles.toggle}
          checked={this.state.infoChecked}
          text='Info'
          status='info'
          onChange={this.onInfoChange}
        />
        <Toggle
          style={styles.toggle}
          checked={this.state.warningChecked}
          text='Warning'
          status='warning'
          onChange={this.onWarningChange}
        />
        <Toggle
          style={styles.toggle}
          checked={this.state.dangerChecked}
          text='Danger'
          status='danger'
          onChange={this.onDangerChange}
        />
        <Toggle
          style={styles.toggle}
          checked={this.state.basicChecked}
          text='Basic'
          status='basic'
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
  toggle: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
});
