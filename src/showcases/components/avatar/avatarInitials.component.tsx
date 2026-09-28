import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Layout, Text } from '@ui-kitten/components';

const SIZES = ['tiny', 'small', 'medium', 'large', 'giant'] as const;
const STATUSES = ['basic', 'primary', 'success', 'info', 'warning', 'danger'] as const;

export const AvatarInitialsShowcase = (): React.ReactElement => (
  <Layout
    testID='avatar-initials'
    style={styles.container}
    level='1'
  >
    <Text category='c1' style={styles.label}>
      Sizes, no source
    </Text>
    <Layout style={styles.row} level='1'>
      {SIZES.map(size => (
        <Avatar
          key={size}
          testID={`avatar-initials-${size}`}
          style={styles.avatar}
          size={size}
          name='Jane Doe'
        />
      ))}
    </Layout>

    <Text category='c1' style={styles.label}>
      Statuses
    </Text>
    <Layout style={styles.row} level='1'>
      {STATUSES.map(status => (
        <Avatar
          key={status}
          testID={`avatar-initials-${status}`}
          style={styles.avatar}
          status={status}
          name='Ada Lovelace'
        />
      ))}
    </Layout>

    <Text category='c1' style={styles.label}>
      Failed image falls back
    </Text>
    <Layout style={styles.row} level='1'>
      <Avatar
        testID='avatar-initials-failed'
        style={styles.avatar}
        size='large'
        shape='rounded'
        status='primary'
        name='Broken Link'
        source={{ uri: 'https://invalid.invalid/no-such-image.png' }}
      />
      <Avatar
        testID='avatar-initials-loaded'
        style={styles.avatar}
        size='large'
        shape='rounded'
        name='Icon Image'
        source={require('../../assets/icon.png')}
      />
    </Layout>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    marginTop: 8,
    marginBottom: 4,
    color: '#8F9BB3',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  avatar: {
    margin: 4,
  },
});
