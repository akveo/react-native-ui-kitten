import React from 'react';
import {
  PopoverElement,
  PopoverProps,
} from '@kitten/ui';
import { PopoverShowcase } from './popoverShowcase.component';
import {
  popoverShowcase,
  popoverSettings,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class PopoverContainer extends React.Component {

  private renderItem = (props: PopoverProps): PopoverElement => {
    return (
      <PopoverShowcase {...props} />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={popoverShowcase}
        settings={popoverSettings}
        renderItem={this.renderItem}>
      </ShowcaseContainer>
    );
  }
}

