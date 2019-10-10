import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Select,
  Layout,
} from 'react-native-ui-kitten';

export class ButtonAppearanceShowcase extends React.Component {

  state = {
    appearance: { text: 'filled' },
  };

  appearances = [
    { text: 'filled' },
    { text: 'outline' },
    { text: 'ghost' },
  ];

  setAppearance = (appearance) => {
    this.setState({ appearance });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Select
          data={this.appearances}
          label='Select Button Appearance'
          style={styles.select}
          selectedOption={this.state.appearance}
          onSelect={this.setAppearance}
        />
        <Button
          style={styles.button}
          appearance={this.state.appearance.text}
          status='primary'>
          BUTTON
        </Button>
        <Button
          style={styles.button}
          appearance={this.state.appearance.text}
          status='success'>
          BUTTON
        </Button>
        <Button
          style={styles.button}
          appearance={this.state.appearance.text}
          status='info'>
          BUTTON
        </Button>
        <Button
          style={styles.button}
          appearance={this.state.appearance.text}
          status='warning'>
          BUTTON
        </Button>
        <Button
          style={styles.button}
          appearance={this.state.appearance.text}
          status='danger'>
          BUTTON
        </Button>
        <Button
          style={styles.button}
          appearance={this.state.appearance.text}
          status='basic'>
          BUTTON
        </Button>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  select: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 10,
  },
});
