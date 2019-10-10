import React from 'react';
import { Layout, Input } from 'react-native-ui-kitten';

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
      <Layout>
        <Input
          status='primary'
          placeholder='Primary'
          value={this.state.primaryValue}
          onChangeText={this.onPrimaryTextChange}
        />
        <Input
          status='success'
          placeholder='Success'
          value={this.state.successValue}
          onChangeText={this.onSuccessTextChange}
        />
        <Input
          status='info'
          placeholder='Info'
          value={this.state.infoValue}
          onChangeText={this.onInfoTextChange}
        />
        <Input
          status='warning'
          placeholder='Warning'
          value={this.state.warningValue}
          onChangeText={this.onWarningTextChange}
        />
        <Input
          status='danger'
          placeholder='Danger'
          value={this.state.dangerValue}
          onChangeText={this.onDangerTextChange}
        />
        <Input
          status='basic'
          placeholder='Basic'
          value={this.state.basicValue}
          onChangeText={this.onBasicTextChange}
        />
      </Layout>
    );
  }
}
