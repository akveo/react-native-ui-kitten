import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import {
  Input,
  InputProps,
} from '@kitten/ui';
import { Showcase } from '../common/showcase.component';
import { inputShowcase } from './type';
import { StyleSheet } from 'react-native';

export class InputContainer extends React.Component<NavigationScreenProps> {

  private renderItem = (props: InputProps): React.ReactElement<InputProps> => {
    return (
      <Input
        style={styles.component}
        placeholder='Place your text'
        {...props}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <Showcase
        showcase={inputShowcase}
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

