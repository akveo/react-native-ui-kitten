import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Divider,
  Icon,
  IconElement,
  List,
  ListItem,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

interface IListItem {
  title: string;
  description: string;
}

const BackIcon = (props): IconElement => (
  <Icon
    {...props}
    name='arrow-back'
  />
);

const SettingsIcon = (props): IconElement => (
  <Icon
    {...props}
    name='settings'
  />
);

const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

export const TopNavigationDividerShowcase = (): React.ReactElement => {

  const renderSettingsAction = (): React.ReactElement => (
    <TopNavigationAction icon={SettingsIcon} />
  );

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={BackIcon} />
  );

  const renderItemAccessory = (): React.ReactElement => (
    <Button size='tiny'>
FOLLOW
    </Button>
  );

  const renderItemIcon = (props): IconElement => (
    <Icon
      {...props}
      name='person'
    />
  );

  const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <>
      <TopNavigation
        title='Eva Application'
        accessoryLeft={renderBackAction}
        accessoryRight={renderSettingsAction}
      />
      <Divider />
      <List
        style={styles.container}
        data={data}
        renderItem={renderItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 320,
  },
});
