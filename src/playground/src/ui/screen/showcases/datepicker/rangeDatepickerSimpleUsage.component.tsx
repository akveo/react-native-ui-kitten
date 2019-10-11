import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  RangeDatepicker,
} from 'react-native-ui-kitten';

export class RangeDatepickerSimpleUsageShowcase extends React.Component {

  state = {
    range: {
      startDate: null,
      endDate: null,
    },
  };

  onSelect = (range) => {
    this.setState({ range });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <RangeDatepicker
          range={this.state.range}
          onSelect={this.onSelect}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 400,
    padding: 16,
  },
});

