import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,
} from 'react-native-ui-kitten';

export class SelectStatusShowcase extends React.Component {

  data = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' },
  ];

  state = {
    selectedOptionPrimary: null,
    selectedOptionSuccess: null,
    selectedOptionInfo: null,
    selectedOptionDanger: null,
    selectedOptionWarning: null,
    selectedOptionBasic: null,
  };

  onPrimarySelect = (selectedOptionPrimary) => {
    this.setState({ selectedOptionPrimary });
  };

  onSuccessSelect = (selectedOptionSuccess) => {
    this.setState({ selectedOptionSuccess });
  };

  onInfoSelect = (selectedOptionInfo) => {
    this.setState({ selectedOptionInfo });
  };

  onDangerSelect = (selectedOptionDanger) => {
    this.setState({ selectedOptionDanger });
  };

  onWarningSelect = (selectedOptionWarning) => {
    this.setState({ selectedOptionWarning });
  };

  onBasicSelect = (selectedOptionBasic) => {
    this.setState({ selectedOptionBasic });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Select
          data={this.data}
          status='primary'
          placeholder='Primary'
          selectedOption={this.state.selectedOptionPrimary}
          onSelect={this.onPrimarySelect}
        />
        <Select
          data={this.data}
          status='success'
          placeholder='Success'
          selectedOption={this.state.selectedOptionSuccess}
          onSelect={this.onSuccessSelect}
        />
        <Select
          data={this.data}
          status='info'
          placeholder='Info'
          selectedOption={this.state.selectedOptionInfo}
          onSelect={this.onInfoSelect}
        />
        <Select
          data={this.data}
          status='warning'
          placeholder='Warning'
          selectedOption={this.state.selectedOptionWarning}
          onSelect={this.onWarningSelect}
        />
        <Select
          data={this.data}
          status='danger'
          placeholder='Danger'
          selectedOption={this.state.selectedOptionDanger}
          onSelect={this.onDangerSelect}
        />
        <Select
          data={this.data}
          status='basic'
          placeholder='Basic'
          selectedOption={this.state.selectedOptionBasic}
          onSelect={this.onBasicSelect}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
