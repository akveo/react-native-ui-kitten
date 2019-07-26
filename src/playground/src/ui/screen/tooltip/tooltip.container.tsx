import React from 'react';
import {
  TooltipElement,
  TooltipProps,
} from '@kitten/ui';
import { TooltipShowcase } from './tooltipShowcase.component';
import {
  tooltipShowcase,
  tooltipSettings,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class TooltipContainer extends React.Component {

  private renderItem = (props: TooltipProps): TooltipElement => {
    return (
      <TooltipShowcase {...props} />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={tooltipShowcase}
        settings={tooltipSettings}
        renderItem={this.renderItem}>
      </ShowcaseContainer>
    );
  }
}

