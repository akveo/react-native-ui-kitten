import React from 'react';
import { TooltipProps } from '@kitten/ui';
import { TooltipShowcase } from './tooltipShowcase.component';
import {
  tooltipShowcase,
  tooltipSettings,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class TooltipContainer extends React.Component {

  private renderItem = (props: TooltipProps): React.ReactElement<TooltipProps> => {
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

