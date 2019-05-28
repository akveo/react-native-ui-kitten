import React from 'react';
import { CheckBoxProps } from '@kitten/ui';
import { CheckBoxShowcase } from './checkboxShowcase.component';
import {
  checkboxSettings,
  checkboxShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class CheckBoxContainer extends React.Component {

  private renderItem = (props: CheckBoxProps): React.ReactElement<CheckBoxProps> => {
    return (
      <CheckBoxShowcase {...props}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={checkboxShowcase}
        settings={checkboxSettings}
        renderItem={this.renderItem}
      />
    );
  }
}
