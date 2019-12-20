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
import {
  SafeAreaLayout,
  SaveAreaInset,
} from '@pg/components/safeAreaLayout';
import { Toolbar } from '@pg/components/toolbar.component';
import {
  ColorPaletteIcon,
  MenuIcon,
} from '@pg/icons';

export const routes: string[] = [
  'Use Theme',
  'Use StyleSheet',
  'With Styles',
  'Theme Provider',
  'Styled',
];

export const ServicesScreen = ({ navigation }): React.ReactElement => {

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
  searchInput: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
