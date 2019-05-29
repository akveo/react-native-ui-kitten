import React from 'react';
import { StyleSheet } from 'react-native';
import { ButtonProps } from '@kitten/ui';
import { ButtonShowcase } from './buttonShowcase.component';
import {
  buttonShowcase,
  buttonSettings,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class ButtonContainer extends React.Component {

  private renderItem = (props: ButtonProps): React.ReactElement<ButtonProps> => {
    return (
      <ButtonShowcase
        {...props}
        style={[styles.component, props.style]}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={buttonShowcase}
        settings={buttonSettings}
        renderItem={this.renderItem}>
      </ShowcaseContainer>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
  },
});

