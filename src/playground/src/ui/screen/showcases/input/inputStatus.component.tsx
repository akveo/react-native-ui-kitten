import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Input,
  Layout,
} from 'react-native-ui-kitten';

export class InputStatusShowcase extends React.Component {

  state = {
    primaryValue: '',
    successValue: '',
    infoValue: '',
    warningValue: '',
    dangerValue: '',
    basicValue: '',
  };

  onPrimaryTextChange = (primaryValue) => {
    this.setState({ primaryValue });
  };

  onSuccessTextChange = (successValue) => {
    this.setState({ successValue });
  };

  onInfoTextChange = (infoValue) => {
    this.setState({ infoValue });
  };

  onWarningTextChange = (warningValue) => {
    this.setState({ warningValue });
  };

  onDangerTextChange = (dangerValue) => {
    this.setState({ dangerValue });
  };

  onBasicTextChange = (basicValue) => {
    this.setState({ basicValue });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Input
          style={styles.input}
          status='primary'
          placeholder='Primary'
          value={this.state.primaryValue}
          onChangeText={this.onPrimaryTextChange}
        />
        <Input
          style={styles.input}
          status='success'
          placeholder='Success'
          value={this.state.successValue}
          onChangeText={this.onSuccessTextChange}
        />
        <Input
          style={styles.input}
          status='info'
          placeholder='Info'
          value={this.state.infoValue}
          onChangeText={this.onInfoTextChange}
        />
        <Input
          style={styles.input}
          status='warning'
          placeholder='Warning'
          value={this.state.warningValue}
          onChangeText={this.onWarningTextChange}
        />
        <Input
          style={styles.input}
          status='danger'
          placeholder='Danger'
          value={this.state.dangerValue}
          onChangeText={this.onDangerTextChange}
        />
        <Input
          style={styles.input}
          status='basic'
          placeholder='Basic'
          value={this.state.basicValue}
          onChangeText={this.onBasicTextChange}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  input: {
    marginVertical: 4,
  },
});

