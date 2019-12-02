import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar,
  Layout,
} from '@ui-kitten/components';

export const AvatarSizeShowcase = () => (
  <Layout style={styles.container}>

    <Avatar style={styles.avatar} size='tiny' source={require('../../../assets/images/brand-logo.png')}/>

    <Avatar style={styles.avatar} size='small' source={require('../../../assets/images/brand-logo.png')}/>

    <Avatar style={styles.avatar} size='medium' source={require('../../../assets/images/brand-logo.png')}/>

    <Avatar style={styles.avatar} size='large' source={require('../../../assets/images/brand-logo.png')}/>

    <Avatar style={styles.avatar} size='giant' source={require('../../../assets/images/brand-logo.png')}/>

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
