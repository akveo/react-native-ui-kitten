import React from 'react';
import {
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {
  Divider,
  List,
  ListItem,
  ListItemElement,
} from '@ui-kitten/components';
import { Toolbar } from '@pg/components/toolbar.component';
import {
  SafeAreaLayout,
  SaveAreaInset,
} from '@pg/components/safeAreaLayout';
import {
  ColorPaletteIcon,
  MenuIcon,
} from '@pg/icons';

export const routes: string[] = [
  'Auth',
];

export const SamplesScreen = ({ navigation }): React.ReactElement => {

  const onItemPress = (index: number): void => {
    navigation.navigate(routes[index]);
  };

  const renderItem = (info: ListRenderItemInfo<string>): ListItemElement => (
    <React.Fragment>
      <ListItem
        style={styles.item}
        title={info.item}
        onPress={() => onItemPress(info.index)}
      />
      <Divider/>
    </React.Fragment>
  );

  return (
    <SafeAreaLayout
      style={styles.container}
      insets={SaveAreaInset.TOP}>
      <Toolbar
        title='UI Kitten Playground'
        backIcon={MenuIcon}
        onBackPress={navigation.toggleDrawer}
        menuIcon={ColorPaletteIcon}
      />
      <List
        data={routes}
        renderItem={renderItem}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
