import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Radio,
} from 'react-native-ui-kitten';

export class RadioStatusShowcase extends React.Component {

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
        <Radio
          style={styles.radio}
          status='primary'
          text='Primary'
          checked={this.state.primaryChecked}
          onChange={this.onPrimaryChange}
        />
        <Radio
          style={styles.radio}
          status='success'
          text='Success'
          checked={this.state.successChecked}
          onChange={this.onSuccessChange}
        />
        <Radio
          style={styles.radio}
          status='info'
          text='Info'
          checked={this.state.infoChecked}
          onChange={this.onInfoChange}
        />
        <Radio
          style={styles.radio}
          status='warning'
          text='Warning'
          checked={this.state.warningChecked}
          onChange={this.onWarningChange}
        />
        <Radio
          style={styles.radio}
          status='danger'
          text='Danger'
          checked={this.state.dangerChecked}
          onChange={this.onDangerChange}
        />
        <Radio
          style={styles.radio}
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
  radio: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
});
