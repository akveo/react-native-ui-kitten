/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  Icon,
  Layout,
} from 'react-native-ui-kitten';

const CalendarIcon = (style) => (
  <Icon {...style} name='calendar'/>
);

export class DatepickerWithIconShowcase extends React.Component {

  state = {
    date: new Date(),
  };

  onSelect = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Datepicker
          date={this.state.date}
          icon={CalendarIcon}
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
