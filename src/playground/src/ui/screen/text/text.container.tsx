import React from 'react';
import { TextProps } from '@kitten/ui';
import { TextShowcase } from './textShowcase.component';
import {
  textSettings,
  textShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class TextContainer extends React.Component {

  private renderItem = (props: TextProps): React.ReactElement<TextProps> => {
    return (
      <TextShowcase {...props}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={textShowcase}
        settings={textSettings}
        renderItem={this.renderItem}
      />
    );
  }
}
