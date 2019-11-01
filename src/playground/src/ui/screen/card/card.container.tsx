import React from 'react';
import {
  CardElement,
  CardProps,
} from 'react-native-ui-kitten';
import { CardShowcase } from './cardShowcase.component';
import {
  cardSettings,
  cardShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class CardContainer extends React.Component {

  private renderItem = (props: CardProps): CardElement => {
    return (
      <CardShowcase {...props} />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={cardShowcase}
        settings={cardSettings}
        renderItem={this.renderItem}
      />
    );
  }
}
