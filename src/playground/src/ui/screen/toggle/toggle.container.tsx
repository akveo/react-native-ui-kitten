import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import {
  Toggle,
  ToggleProps,
} from '@kitten/ui';
import { Showcase } from '../common/showcase.component';
import { toggleShowcase } from './type';

export class ToggleContainer extends React.Component<NavigationScreenProps> {

  private renderItem = (props: ToggleProps): React.ReactElement<ToggleProps> => {
    return (
      <Toggle checked={true} {...props} />
    );
  };

  public render(): React.ReactNode {
    return (
      <Showcase
        showcase={toggleShowcase}
        renderItem={this.renderItem}
      />
    );
  }
}
