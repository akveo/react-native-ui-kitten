import React from 'react';
import { StyleSheet } from 'react-native';
import { InputProps } from '@kitten/ui';
import { InputShowcase } from './inputShowcase.component';
import {
  inputSettings,
  inputShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class InputContainer extends React.Component {

  private renderItem = (props: InputProps): React.ReactElement<InputProps> => {
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
