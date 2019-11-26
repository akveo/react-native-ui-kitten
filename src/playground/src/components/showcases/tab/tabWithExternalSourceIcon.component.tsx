import React from 'react';
import { Image } from 'react-native';
import { Tab } from 'react-native-ui-kitten';

const DashboardIcon = (style) => (
  <Image style={style} source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/layout.png' }}/>
);

export const TabWithExternalSourceIconShowcase = (props) => (
  <Tab title='DASHBOARD' icon={DashboardIcon}/>
);
