import React from 'react';
import {
  Text,
  TextProps,
} from '@kitten/ui';

export const TextShowcase = (props?: TextProps): React.ReactElement<TextProps> => {
  return (
    <Text
      {...props}>
      Text
    </Text>
  );
};
