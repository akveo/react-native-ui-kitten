import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Layout } from '@ui-kitten/components';

export const AvatarShapeShowcase = () => (
  <Layout style={styles.container} level='1'>

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
  },
  avatar: {
    margin: 8,
  },
});
