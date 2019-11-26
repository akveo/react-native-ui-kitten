import React from 'react';
import {
  MenuElement,
  MenuProps,
} from 'react-native-ui-kitten';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { MenuShowcase } from './menuShowcase.component';
import {
  menuSettings,
  menuShowcase,
} from './type';

export const MenuScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: MenuProps): MenuElement => (
    <MenuShowcase {...props} />
  );

  return (
    <ShowcaseContainer
      showcase={menuShowcase}
      settings={menuSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};
