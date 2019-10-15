import React from 'react';
import {
  ButtonGroupElement,
  ButtonGroupProps,
} from 'react-native-ui-kitten';
import { ButtonGroupShowcase } from './buttonGroupShowcase.component';
import {
  buttonGroupSettings,
  buttonGroupShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class ButtonGroupContainer extends React.Component {

  private renderItem = (props: ButtonGroupProps): ButtonGroupElement => {
    return (
      <ButtonGroupShowcase {...props}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={buttonGroupShowcase}
        settings={buttonGroupSettings}
        renderItem={this.renderItem}
      />
    );
  }
}
