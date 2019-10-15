import React from 'react';
import { StyleSheet } from 'react-native';
import {
  InputElement,
  InputProps,
} from 'react-native-ui-kitten';
import { InputShowcase } from './inputShowcase.component';
import {
  inputSettings,
  inputShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class InputContainer extends React.Component {

  private renderItem = (props: InputProps): InputElement => {
    return (
      <InputShowcase
        style={styles.component}
        {...props}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={inputShowcase}
        settings={inputSettings}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
  },
});
