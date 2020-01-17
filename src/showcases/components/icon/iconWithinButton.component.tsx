/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  Button,
  Icon,
} from '@ui-kitten/components';

export const IconWithinButtonShowcase = () => {

  const [liked, setLiked] = React.useState(false);

  const onPress = () => {
    setLiked(!liked);
  };

  const renderIcon = (style) => (
    <Icon
      {...style}
      name={liked ? 'heart' : 'heart-outline'}
    />
  );

  return (
    <Button
      icon={renderIcon}
      onPress={onPress}>
      LIKE
    </Button>
  );
};
