import React from 'react';
import {
  CheckBoxElement,
  CheckBoxProps,
} from 'react-native-ui-kitten';
import { CheckBoxShowcase } from './checkboxShowcase.component';
import {
  checkboxSettings,
  checkboxShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class CheckBoxContainer extends React.Component {

  private renderItem = (props: CheckBoxProps): CheckBoxElement => {
    return (
      <CheckBoxShowcase {...props} />
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
