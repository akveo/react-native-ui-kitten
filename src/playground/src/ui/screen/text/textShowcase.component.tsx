import React from 'react';
import {
  Text,
  TextElement,
  TextProps,
} from '@kitten/ui';

export const TextShowcase = (props?: TextProps): TextElement => {
  return (
    <Text
      {...props}>
      Text
    </Text>
  );
};
