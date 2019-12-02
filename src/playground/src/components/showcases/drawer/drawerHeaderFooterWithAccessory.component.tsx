/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  Button,
  DrawerHeaderFooter,
  Icon,
} from '@ui-kitten/components';

const LogoutIcon = (style) => (
  <Icon {...style} name='log-out'/>
);

const LogoutButton = (style) => (
  <Button style={style} icon={LogoutIcon}/>
);

export const DrawerHeaderFooterWithAccessoryShowcase = () => (
  <DrawerHeaderFooter
    title='John Doe'
    description='React Native Developer'
    accessory={LogoutButton}
  />
);
