import React from 'react';
import {
  Text,
  TextElement,
  TextProps,
} from 'react-native-ui-kitten';

export const TextShowcase = (props?: TextProps): TextElement => {
  return (
    <Text
      {...props}>
      Text
    </Text>
  );
};
