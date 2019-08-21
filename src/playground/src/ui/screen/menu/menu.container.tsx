import React from 'react';
import {
  MenuProps,
  MenuElement,
} from '@kitten/ui';
import { ShowcaseContainer } from '../common/showcase.container';
import { MenuShowcase } from './menuShowcase.component';
import {
  menuShowcase,
  menuSettings,
} from './type';

export class MenuContainer extends React.Component {

  private renderItem = (props: MenuProps): MenuElement => {
    return (
      <MenuShowcase{...props} />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={menuShowcase}
        settings={menuSettings}
        renderItem={this.renderItem}>
      </ShowcaseContainer>
    );
  }
}
