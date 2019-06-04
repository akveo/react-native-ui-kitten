import React from 'react';
import { RadioProps } from '@kitten/ui';
import { RadioShowcase } from './radioShowcase.component';
import {
  radioSettings,
  radioShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class RadioContainer extends React.Component {

  private renderItem = (props: RadioProps): React.ReactElement<RadioProps> => {
    return (
      <RadioShowcase {...props}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={radioShowcase}
        settings={radioSettings}
        renderItem={this.renderItem}
      />
    );
  }
}
