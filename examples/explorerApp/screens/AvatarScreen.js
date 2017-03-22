import React, {Component}from 'react';
import {StyleSheet, ScrollView} from 'react-native'

import {Avatar} from '../components/avatar'

export class AvatarScreen extends Component {
  render() {
    return (
      <ScrollView style={[styles.container]}>
        <Avatar rkType="round" name="John Doe"/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 45,
    paddingVertical: 10
  },

});