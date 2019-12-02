/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { Input } from '@ui-kitten/components';
import { Image } from 'react-native';

export const InputWithExternalSourceIconShowcase = () => {

  const [value, setValue] = React.useState('');

  const renderIcon = (style) => (
    <Image
      style={style}
      source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/eye-off.png' }}
    />
  );

  return (
    <Input
      value={value}
      placeholder='Place your Text'
      icon={renderIcon}
      secureTextEntry={true}
      onChangeText={setValue}
    />
  );
};
