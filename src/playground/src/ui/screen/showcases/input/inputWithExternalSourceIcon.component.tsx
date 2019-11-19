import React from 'react';
import { Input } from 'react-native-ui-kitten';
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
