import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  Button,
  ButtonProps,
} from '@kitten/ui';
import { Showcase } from '../common/showcase.component';
import { buttonShowcase } from './type';

export class ButtonContainer extends React.Component<NavigationScreenProps> {

  private renderItem = (props: ButtonProps): React.ReactElement<ButtonProps> => {
    return (
      <Button
        style={styles.component}
        {...props}>
        BUTTON
      </Button>
    );
  };

  public render(): React.ReactNode {
    return (
      <Showcase
        showcase={buttonShowcase}
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

