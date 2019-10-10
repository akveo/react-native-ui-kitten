import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Icon,
  Layout,
  Select,
} from 'react-native-ui-kitten';

const EVA_APPEARANCES = [
  'filled',
  'outline',
  'ghost',
];

const EVA_STATUSES = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
  'basic',
];

const EVA_SIZES = [
  'tiny',
  'small',
  'medium',
  'large',
  'giant',
];

const StarIcon = (style) => (
  <Icon {...style} name='star'/>
);

export class ButtonPlaygroundShowcase extends React.Component {

  state = {
    appearance: { text: EVA_APPEARANCES[0] },
    status: { text: EVA_STATUSES[0] },
    size: { text: EVA_SIZES[0] },
  };

  appearanceSelectData = EVA_APPEARANCES.map((appearance) => ({ text: appearance }));
  statusSelectData = EVA_STATUSES.map((status) => ({ text: status }));
  sizeSelectData = EVA_STATUSES.map((size) => ({ text: size }));

  setAppearance = (appearance) => {
    this.setState({ appearance });
  };

  setStatus = (status) => {
    this.setState({ status });
  };

  setSize = (size) => {
    this.setState({ size });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Layout style={styles.optionsContainer}>
          <Select
            data={this.appearanceSelectData}
            label='APPEARANCE'
            selectedOption={this.state.appearance}
            onSelect={this.setAppearance}
          />
          <Select
            data={this.statusSelectData}
            label='STATUS'
            selectedOption={this.state.status}
            onSelect={this.setStatus}
          />
          <Select
            data={this.sizeSelectData}
            label='SIZE'
            selectedOption={this.state.size}
            onSelect={this.setSize}
          />
        </Layout>
        <Button
          style={styles.button}
          appearance={this.state.appearance.text}
          status={this.state.status.text}
          size={this.state.size.text}>
          BUTTON
        </Button>
        <Button
          style={styles.button}
          appearance={this.state.appearance.text}
          status={this.state.status.text}
          size={this.state.size.text}
          icon={StarIcon}>
          BUTTON
        </Button>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8,
  },
  button: {
    marginVertical: 8,
  },
});
