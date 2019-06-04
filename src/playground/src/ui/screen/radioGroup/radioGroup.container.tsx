import React from 'react';
import { RadioGroupProps } from '@kitten/ui';
import { RadioGroupShowcase } from './radioGroupShowcase.component';
import { radioGroupShowcase } from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class RadioGroupContainer extends React.Component {

  private renderItem = (props: RadioGroupProps): React.ReactElement<RadioGroupProps> => {
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
