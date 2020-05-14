import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonGroup, Icon, Layout } from '@ui-kitten/components';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

export const ButtonGroupWithIconsShowcase = () => (
  <Layout style={styles.container} level='1'>

    <ButtonGroup style={styles.buttonGroup}>
      <Button accessoryLeft={StarIcon}/>
      <Button accessoryLeft={StarIcon}/>
      <Button accessoryLeft={StarIcon}/>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} appearance='outline' status='success'>
      <Button accessoryLeft={StarIcon}/>
      <Button accessoryLeft={StarIcon}/>
      <Button accessoryLeft={StarIcon}/>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} status='danger'>
      <Button accessoryLeft={StarIcon}/>
      <Button accessoryLeft={StarIcon}/>
      <Button accessoryLeft={StarIcon}/>
    </ButtonGroup>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonGroup: {
    margin: 2,
  },
});
