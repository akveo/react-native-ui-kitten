import React from 'react';
import { Layout, Radio } from 'react-native-ui-kitten';

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
      <Layout>
        <Radio
          status='primary'
          checked={this.state.primaryChecked}
          onChange={this.onPrimaryChange}
        />
        <Radio
          status='success'
          checked={this.state.successChecked}
          onChange={this.onSuccessChange}
        />
        <Radio
          status='info'
          checked={this.state.infoChecked}
          onChange={this.onInfoChange}
        />
        <Radio
          status='warning'
          checked={this.state.warningChecked}
          onChange={this.onWarningChange}
        />
        <Radio
          status='danger'
          checked={this.state.dangerChecked}
          onChange={this.onDangerChange}
        />
        <Radio
          status='basic'
          checked={this.state.basicChecked}
          onChange={this.onBasicChange}
        />
      </Layout>
    );
  }
}
