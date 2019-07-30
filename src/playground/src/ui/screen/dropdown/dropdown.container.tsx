import React from 'react';
import {
  DropdownProps,
  DropdownElement,
} from '@kitten/ui';
import { ShowcaseContainer } from '../common/showcase.container';
import { DropdownShowcase } from './dropdownShowcase.component';
import {
  dropdownShowcase,
  dropdownSettings,
} from './type';

export class DropdownContainer extends React.Component {

  private renderItem = (props: DropdownProps): DropdownElement => {
    return (
      <DropdownShowcase {...props}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={dropdownShowcase}
        settings={dropdownSettings}
        renderItem={this.renderItem}>
      </ShowcaseContainer>
    );
  }
}
