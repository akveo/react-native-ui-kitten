import React from 'react';
import { Image } from 'react-native';
import { Button } from 'react-native-ui-kitten';

const RemoteBulbIcon = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/bulb-outline.png' }}
  />
);

export const IconExternalSourceShowcase = (props) => (
  <Button icon={RemoteBulbIcon}>
    Login with Facebook
  </Button>
);
