import React from 'react';
import { Layout, Input } from 'react-native-ui-kitten';

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
      <Layout>
        <Input
          size='small'
          placeholder='Small'
          value={this.state.smallValue}
          onChangeText={this.onSmallTextChange}
        />
        <Input
          size='medium'
          placeholder='Medium'
          value={this.state.mediumValue}
          onChangeText={this.onMediumTextChange}
        />
        <Input
          size='large'
          placeholder='Large'
          value={this.state.largeValue}
          onChangeText={this.onLargeTextChange}
        />
      </Layout>
    );
  }
}
