import React from 'react';
import {
  SelectProps,
  SelectElement,
} from '@kitten/ui';
import { ShowcaseContainer } from '../common/showcase.container';
import { SelectShowcase } from './selectShowcase.component';
import {
  selectShowcase,
  selectSettings,
} from './type';

export class SelectContainer extends React.Component {

  private renderItem = (props: SelectProps): SelectElement => {
    return (
      <SelectShowcase {...props}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={selectShowcase}
        settings={selectSettings}
        renderItem={this.renderItem}>
      </ShowcaseContainer>
    );
  }
}
