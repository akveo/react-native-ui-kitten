import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import {
  Radio,
  RadioProps,
} from '@kitten/ui';
import { Showcase } from '../common/showcase.component';
import { radioShowcase } from './type';

export class RadioContainer extends React.Component<NavigationScreenProps> {

  private renderItem = (props: RadioProps): React.ReactElement<RadioProps> => {
    return (
      <Radio checked={true} {...props}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <Showcase
        showcase={radioShowcase}
        renderItem={this.renderItem}
      />
    );
  }
}
