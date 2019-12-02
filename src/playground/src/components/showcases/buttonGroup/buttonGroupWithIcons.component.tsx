import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  ButtonGroup,
  Icon,
  Layout,
} from '@ui-kitten/components';

const StarIcon = (style) => (
  <Icon {...style} name='star'/>
);

export const ButtonGroupWithIconsShowcase = () => (
  <Layout style={styles.container}>

    <ButtonGroup style={styles.buttonGroup}>
      <Button icon={StarIcon}/>
      <Button icon={StarIcon}/>
      <Button icon={StarIcon}/>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} appearance='outline' status='success'>
      <Button icon={StarIcon}/>
      <Button icon={StarIcon}/>
      <Button icon={StarIcon}/>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} status='danger'>
      <Button icon={StarIcon}/>
      <Button icon={StarIcon}/>
      <Button icon={StarIcon}/>
    </ButtonGroup>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonGroup: {
    margin: 8,
  },
});
