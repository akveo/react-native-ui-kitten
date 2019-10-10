import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Toggle,
} from 'react-native-ui-kitten';

export class ToggleSizeShowcase extends React.Component {

  state = {
    tinyChecked: false,
    smallChecked: false,
    mediumChecked: false,
    largeChecked: false,
    giantChecked: false,
  };

  onTinyChange = (tinyChecked) => {
    this.setState({ tinyChecked });
  };

  onSmallChange = (smallChecked) => {
    this.setState({ smallChecked });
  };

  onMediumChange = (mediumChecked) => {
    this.setState({ mediumChecked });
  };

  onLargeChange = (largeChecked) => {
    this.setState({ largeChecked });
  };

  onGiantChange = (giantChecked) => {
    this.setState({ giantChecked });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Toggle
          style={styles.toggle}
          checked={this.state.tinyChecked}
          text='Tiny'
          size='tiny'
          onChange={this.onTinyChange}
        />
        <Toggle
          style={styles.toggle}
          checked={this.state.smallChecked}
          text='Small'
          size='small'
          onChange={this.onSmallChange}
        />
        <Toggle
          style={styles.toggle}
          checked={this.state.mediumChecked}
          text='Medium'
          size='medium'
          onChange={this.onMediumChange}
        />
        <Toggle
          style={styles.toggle}
          checked={this.state.largeChecked}
          text='Large'
          size='large'
          onChange={this.onLargeChange}
        />
        <Toggle
          style={styles.toggle}
          checked={this.state.giantChecked}
          text='Giant'
          size='giant'
          onChange={this.onGiantChange}
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
