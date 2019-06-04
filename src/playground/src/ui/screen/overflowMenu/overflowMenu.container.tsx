import React from 'react';
import { OverflowMenuProps } from '@kitten/ui';
import { OverflowMenuShowcase } from './overflowMenuShowcase.component';
import {
  overflowMenuShowcase,
  overflowMenuSettings,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class OverflowMenuContainer extends React.Component {

  private renderItem = (props: OverflowMenuProps): React.ReactElement<OverflowMenuProps> => {
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

