import React from 'react';
import {
  OverflowMenuElement,
  OverflowMenuProps,
} from 'react-native-ui-kitten';
import { OverflowMenuShowcase } from './overflowMenuShowcase.component';
import {
  overflowMenuShowcase,
  overflowMenuSettings,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class OverflowMenuContainer extends React.Component {

  private renderItem = (props: OverflowMenuProps): OverflowMenuElement => {
    return (
      <OverflowMenuShowcase {...props} />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={overflowMenuShowcase}
        settings={overflowMenuSettings}
        renderItem={this.renderItem}>
      </ShowcaseContainer>
    );
  }
}

