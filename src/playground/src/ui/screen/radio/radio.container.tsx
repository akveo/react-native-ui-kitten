import React from 'react';
import {
  RadioElement,
  RadioProps,
} from 'react-native-ui-kitten';
import { RadioShowcase } from './radioShowcase.component';
import {
  radioSettings,
  radioShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class RadioContainer extends React.Component {

  private renderItem = (props: RadioProps): RadioElement => {
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
