import React from 'react';
import {
  Image,
  ImageProps,
  View,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import {
  Text,
  CheckBox,
  ListItem,
  ListItemProps,
  CheckBoxProps,
  Button,
} from '@kitten/ui';

export const ListItemIconShowcase = (props?: ListItemProps): React.ReactElement<ListItemProps> => {

  const Icon = (style: StyleType, index: number): React.ReactElement<ImageProps> => (
    <Image source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>
  );

  return (
    <ListItem {...props} icon={Icon}/>
  );
};

export const ListItemAccessoryShowcase = (props?: ListItemProps): React.ReactElement<ListItemProps> => {

  const Accessory = (style: StyleType, index: number): React.ReactElement<CheckBoxProps> => (
    <CheckBox checked={index % 2 === 0}/>
  );

  return (
    <ListItem {...props} accessory={Accessory}/>
  );
};

export const ListItemIconAccessoryShowcase = (props?: ListItemProps): React.ReactElement<ListItemProps> => {

  const Icon = (style: StyleType, index: number): React.ReactElement<ImageProps> => (
    <Image source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>
  );

  const Accessory = (style: StyleType, index: number): React.ReactElement<CheckBoxProps> => (
    <CheckBox checked={index % 2 === 0}/>
  );

  return (
    <ListItem {...props} icon={Icon} accessory={Accessory}/>
  );
};

export const ListItemCustomContentShowcase = (props?: ListItemProps): React.ReactElement<ListItemProps> => {

  const styles: StyleType = {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: props.index % 2 === 0 ? '#f7f8fa' : '#c8cedb',
      padding: 4,
    },
    contentContainer: {
      flex: 1,
      marginHorizontal: 4,
    },
    icon: {
      width: 42,
      height: 42,
      marginHorizontal: 4,
    },
    title: {
      fontSize: 18,
      fontWeight: '500',
    },
    description: {
      fontSize: 12,
      color: 'gray',
    },
    button: {
      marginHorizontal: 4,
    },
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/play-circle-outline.png' }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to the Jungle</Text>
        <Text style={styles.description}>Guns N'Roses</Text>
      </View>
      <Button style={styles.button} status='success'>$2.99</Button>
    </View>
  );
};
