import React from 'react';
import {
  SpinnerProps,
  SpinnerElement,
} from 'react-native-ui-kitten';
import { SpinnerShowcase } from './spinnerShowcase.component';
import {
  spinnerSettings,
  spinnerShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class SpinnerContainer extends React.Component {

  private renderItem = (props: SpinnerProps): SpinnerElement => {
    return (
      <SpinnerShowcase {...props}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={spinnerShowcase}
        settings={spinnerSettings}
        renderItem={this.renderItem}
      />
    );
  }
}
