import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  RangeCalendar,
} from 'react-native-ui-kitten';

export class RangeCalendarSimpleUsageShowcase extends React.Component {

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
        <RangeCalendar
          range={this.state.range}
          onSelect={this.onSelect}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
