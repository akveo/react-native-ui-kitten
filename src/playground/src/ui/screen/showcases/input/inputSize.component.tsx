import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Input,
  Layout,
} from 'react-native-ui-kitten';

export class InputSizeShowcase extends React.Component {

  state = {
    smallValue: '',
    mediumValue: '',
    largeValue: '',
  };

  onSmallTextChange = (smallValue) => {
    this.setState({ smallValue });
  };

  onMediumTextChange = (mediumValue) => {
    this.setState({ mediumValue });
  };

  onLargeTextChange = (largeValue) => {
    this.setState({ largeValue });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Input
          style={styles.input}
          size='small'
          placeholder='Small'
          value={this.state.smallValue}
          onChangeText={this.onSmallTextChange}
        />
        <Input
          style={styles.input}
          size='medium'
          placeholder='Medium'
          value={this.state.mediumValue}
          onChangeText={this.onMediumTextChange}
        />
        <Input
          style={styles.input}
          size='large'
          placeholder='Large'
          value={this.state.largeValue}
          onChangeText={this.onLargeTextChange}
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

