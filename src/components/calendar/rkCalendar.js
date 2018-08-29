import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import { RkComponent } from '../rkComponent';

export class RkCalendar extends RkComponent {
  extractItemKey = (index) => index;

  renderItem = () => (
    <View />
  );

  render() {
    return (
      <FlatList
        renderItem={this.renderItem}
        keyExtractor={this.extractItemKey}
      />
    );
  }
}
