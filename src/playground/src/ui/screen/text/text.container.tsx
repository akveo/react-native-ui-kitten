import React from 'react';
import {
  TextElement,
  TextProps,
} from 'react-native-ui-kitten';
import { TextShowcase } from './textShowcase.component';
import {
  textSettings,
  textShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class TextContainer extends React.Component {

  private renderItem = (props: TextProps): TextElement => {
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
