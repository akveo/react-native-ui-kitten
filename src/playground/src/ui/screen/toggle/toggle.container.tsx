import React from 'react';
import {
  ToggleElement,
  ToggleProps,
} from 'react-native-ui-kitten';
import { ToggleShowcase } from './toggleShowcase.component';
import {
  toggleSettings,
  toggleShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class ToggleContainer extends React.Component {

  private renderItem = (props: ToggleProps): ToggleElement => {
    return (
      <ToggleShowcase {...props} />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={toggleShowcase}
        settings={toggleSettings}
        renderItem={this.renderItem}
      />
    );
  }
}
