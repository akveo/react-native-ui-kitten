import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import {
  CheckBox,
  CheckBoxProps,
} from '@kitten/ui';
import { Showcase } from '../common/showcase.component';
import { checkboxShowcase } from './type';

export class CheckBoxContainer extends React.Component<NavigationScreenProps> {

  private renderItem = (props: CheckBoxProps): React.ReactElement<CheckBoxProps> => {
    return (
      <CheckBox checked={true} {...props}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <Showcase
        showcase={checkboxShowcase}
        renderItem={this.renderItem}
      />
    );
  }
}
