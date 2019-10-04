import React from 'react';
import {
  IconElement,
  IconProps,
} from 'react-native-ui-kitten';
import {
  iconSettings,
  iconShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';
import { IconShowcase } from './iconShowcase.component';

export class IconContainer extends React.Component {

  private renderItem = (props: IconProps): IconElement => {
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

