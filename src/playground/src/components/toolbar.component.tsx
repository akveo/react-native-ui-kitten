import React from 'react';
import { ImageProps } from 'react-native';
import {
  Divider,
  OverflowMenu,
  OverflowMenuItemType,
  StyleType,
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionElement,
  TopNavigationProps,
} from 'react-native-ui-kitten';
import {
  BackIcon,
  MoreVerticalIcon,
} from '@pg/icons';

export type ToolbarMenu = OverflowMenuItemType[];

export interface ToolbarProps extends TopNavigationProps {
  menu?: ToolbarMenu;
  backIcon?: (style: StyleType) => React.ReactElement<ImageProps>;
  menuIcon?: (style: StyleType) => React.ReactElement<ImageProps>;
  onMenuItemSelect?: (index: number) => void;
  onBackPress?: () => void;
}

export const Toolbar = (props: ToolbarProps): TopNavigationActionElement => {

  const { menu, backIcon, menuIcon, onMenuItemSelect, onBackPress, ...topNavigationProps } = props;
  const [menuVisible, setMenuVisible] = React.useState(false);

  const onMenuSelect = (index: number) => {
    setMenuVisible(false);
    onMenuItemSelect && onMenuItemSelect(index);
  };

  const onMenuActionPress = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = (): TopNavigationActionElement => (
    <OverflowMenu
      visible={menuVisible}
      data={menu}
      placement='bottom end'
      onSelect={onMenuSelect}
      onBackdropPress={onMenuActionPress}>
      <TopNavigationAction
        icon={props.menuIcon || MoreVerticalIcon}
        onPress={onMenuActionPress}
      />
    </OverflowMenu>
  );

  const renderBackAction = (): TopNavigationActionElement => (
    <TopNavigationAction
      icon={props.backIcon || BackIcon}
      onPress={onBackPress}
    />
  );

  return (
    <React.Fragment>
      <TopNavigation
        {...topNavigationProps}
        leftControl={onBackPress && renderBackAction()}
        rightControls={menu && renderMenuAction()}
      />
      <Divider/>
    </React.Fragment>
  );
};
