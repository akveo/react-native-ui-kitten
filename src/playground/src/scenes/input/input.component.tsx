import React from 'react';
import { StyleSheet } from 'react-native';
import {
  InputElement,
  InputProps,
} from 'react-native-ui-kitten';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { InputShowcase } from './inputShowcase.component';
import {
  inputSettings,
  inputShowcase,
} from './type';

export const InputScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: InputProps): InputElement => (
    <InputShowcase
      style={styles.component}
      {...props}
    />
  );

  return (
    <ShowcaseContainer
      showcase={inputShowcase}
      settings={inputSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};

const styles = StyleSheet.create({
  component: {
    flex: 1,
  },
});
