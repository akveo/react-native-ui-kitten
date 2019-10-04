import React from 'react';
import {
  RadioGroupElement,
  RadioGroupProps,
} from 'react-native-ui-kitten';
import { RadioGroupShowcase } from './radioGroupShowcase.component';
import { radioGroupShowcase } from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class RadioGroupContainer extends React.Component {

  private renderItem = (props: RadioGroupProps): RadioGroupElement => {
    return (
      <RadioGroupShowcase {...props}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={radioGroupShowcase}
        renderItem={this.renderItem}
      />
    );
  }
}
