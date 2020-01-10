import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar,
  Layout,
} from '@ui-kitten/components';

export const AvatarShapeShowcase = () => (
  <Layout style={styles.container}>

    <Avatar style={styles.avatar} shape='square' source={require('../../assets/icon.png')}/>

    <Avatar style={styles.avatar} shape='rounded' source={require('../../assets/icon.png')}/>

    <Avatar style={styles.avatar} shape='round' source={require('../../assets/icon.png')}/>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 8,
  },
  avatar: {
    margin: 8,
  },
});
