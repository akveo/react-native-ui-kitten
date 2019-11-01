import React from 'react';
import {
  Card,
  CardProps,
  CardElement,
} from 'react-native-ui-kitten';

export const CardShowcase = (props: CardProps): CardElement => {
  return (
    <Card {...props}/>
  );
};
