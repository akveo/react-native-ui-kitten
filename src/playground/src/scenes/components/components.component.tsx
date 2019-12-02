import React from 'react';
import {
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {
  Divider,
  Input,
  Layout,
  List,
  ListItem,
  ListItemElement,
} from 'react-native-ui-kitten';
import {
  SafeAreaLayout,
  SaveAreaInset,
} from '@pg/components/safeAreaLayout';
import { Toolbar } from '@pg/components/toolbar.component';
import {
  ColorPaletteIcon,
  MenuIcon,
  SearchIcon,
} from '@pg/icons';

export const routes: string[] = [
  'Avatar',
  'BottomNavigation',
  'Button',
  'ButtonGroup',
  'Calendar',
  'Card',
  'RangeCalendar',
  'CheckBox',
  'Datepicker',
  'Drawer',
  'Icon',
  'Input',
  'Layout',
  'List',
  'Menu',
  'Modal',
  'OverflowMenu',
  'Popover',
  'Radio',
  'RadioGroup',
  'Select',
  'Spinner',
  'TabView',
  'Text',
  'Toggle',
  'Tooltip',
  'TopNavigation',
];

export const ComponentsScreen = ({ navigation }): React.ReactElement => {

  const [displayComponents, setDisplayComponents] = React.useState<string[]>(routes);

  const onSearchInputTextChange = (text: string): void => {
    const nextDisplayComponents: string[] = routes.filter((component: string): boolean => {
      return component.toLowerCase().startsWith(text.toLowerCase());
    });

    setDisplayComponents(nextDisplayComponents);
  };

  const onItemPress = (index: number): void => {
    navigation.navigate(displayComponents[index]);
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
      <Input
        style={styles.searchInput}
        placeholder='Search'
        icon={SearchIcon}
        onChangeText={onSearchInputTextChange}
      />
      <List
        data={displayComponents}
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
