import React from 'react';
import { IconProps } from '@kitten/ui';
import {
  iconSettings,
  iconShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';
import { IconShowcase } from './iconShowcase.component';

export class IconContainer extends React.Component {

  private renderItem = (props: IconProps): React.ReactElement<IconProps> => {
    return (
      <IconShowcase {...props} />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={iconShowcase}
        settings={iconSettings}
        renderItem={this.renderItem}>
      </ShowcaseContainer>
    );
  }
}

