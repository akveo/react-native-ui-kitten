import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar,
  Layout,
} from 'react-native-ui-kitten';

export const AvatarSizeShowcase = () => (
  <Layout style={styles.container}>

    <Avatar style={styles.avatar} size='tiny' source={require('../../../../assets/brand-logo.png')}/>

    <Avatar style={styles.avatar} size='small' source={require('../../../../assets/brand-logo.png')}/>

    <Avatar style={styles.avatar} size='medium' source={require('../../../../assets/brand-logo.png')}/>

    <Avatar style={styles.avatar} size='large' source={require('../../../../assets/brand-logo.png')}/>

    <Avatar style={styles.avatar} size='giant' source={require('../../../../assets/brand-logo.png')}/>

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
