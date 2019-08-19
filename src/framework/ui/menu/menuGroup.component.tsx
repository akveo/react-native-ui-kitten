/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  TouchableOpacityProps,
  GestureResponderEvent,
  ViewProps,
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  MenuItem,
  MenuItemType,
  MenuItemElement,
} from './menuItem.component';
import {
  MeasureNode,
  MeasureResult,
  MeasureNodeProps,
  MeasuringElementProps,
} from '../popover/measure.component';

interface ComponentProps {
  item: MenuItemType;
  selectedItem: MenuItemType;
  separatorStyle?: StyleType;
  onSelect?: (item: MenuItemType, event?: GestureResponderEvent) => void;
}

interface ComponentState {
  subItemsVisible: boolean;
  subItemsHeight: number;
}

export type MenuGroupProps = ComponentProps & StyledComponentProps & TouchableOpacityProps;
export type MenuGroupElement = React.ReactElement<MenuGroupProps>;
type OnPressHandler = (item: MenuItemType, event?: GestureResponderEvent) => void;
const MAIN_ITEM_KEY: string = 'Main Item';
const SEPARATOR_ELEMENT_KEY: string = 'Separator';
const SUB_ITEMS_MEASURE_TAG: string = 'Sub Items';

class MenuGroupComponent extends React.Component<MenuGroupProps, ComponentState> {

  static styledComponentName: string = 'MenuGroup';

  public state: ComponentState = {
    subItemsVisible: false,
    subItemsHeight: 0,
  };

  public componentDidUpdate(prevProps: MenuGroupProps, prevState: ComponentState): void {
    if (prevState.subItemsVisible !== this.state.subItemsVisible) {
      if (this.state.subItemsVisible) {
        this.subItemsExpandAnimate(this.state.subItemsHeight);
      } else {
        this.subItemsExpandAnimate(0);
      }
    }
  }

  private subItemsAnimation: Animated.Value = new Animated.Value(0);

  private subItemsExpandAnimate = (toValue: number): void => {
    Animated.spring(this.subItemsAnimation, {
      toValue: toValue,
    }).start();
  };

  private onMainItemPress = (): void => {
    const subItemsVisible: boolean = !this.state.subItemsVisible;

    this.setState({ subItemsVisible });
  };

  private onSubItemPress = (item: MenuItemType, event: GestureResponderEvent): void => {
    if (this.props.onSelect) {
      this.props.onSelect(item, event);
    }
  };

  private getComponentStyles = (style: StyleType): StyleType => {
    const accessoryStyle: StyleType = allWithPrefix(style, 'accessory');

    return {
      subContainer: {
        paddingHorizontal: style.subItemsPaddingHorizontal,
      },
      accessory: {
        height: accessoryStyle.accessoryHeight,
        marginHorizontal: accessoryStyle.accessoryMarginHorizontal,
        tintColor: accessoryStyle.accessoryTintColor,
        width: accessoryStyle.accessoryWidth,
      },
    };
  };

  private onSubMenuMeasure = (result: MeasureResult): void => {
    const subItemsHeight: number = result[SUB_ITEMS_MEASURE_TAG].size.height;

    this.setState({ subItemsHeight });
  };

  private getIsSelected = (item: MenuItemType): boolean => {
    const { selectedItem } = this.props;
    if (selectedItem) {
      return selectedItem.title === item.title;
    }
    return false;
  };

  private renderSeparator = (style: StyleType): React.ReactElement<ViewProps> => {
    return (
      <View
        key={SEPARATOR_ELEMENT_KEY}
        style={style}
      />
    );
  };

  private renderMenuItem = (item: MenuItemType,
                            isMainItem: boolean,
                            index: number | string): MenuItemElement => {

    const onPressHandler: OnPressHandler = isMainItem ? this.onMainItemPress : this.onSubItemPress;

    return (
      <MenuItem
        title={item.title}
        icon={item.icon}
        key={index}
        onPress={onPressHandler}
      />
    );
  };

  private renderSubItemsInvisible = (subItems: React.ReactNode): React.ReactElement<MeasureNodeProps> => {
    const measuringProps: MeasuringElementProps = { tag: SUB_ITEMS_MEASURE_TAG };

    return (
      <MeasureNode onResult={this.onSubMenuMeasure}>
        {[
          <View
            {...measuringProps}
            key={SUB_ITEMS_MEASURE_TAG}
            style={styles.invisibleMenu}>
            {subItems}
          </View>,
        ]}
      </MeasureNode>
    );
  };

  private renderSubItems = (): React.ReactNode => {
    const { item, themedStyle, separatorStyle } = this.props;

    return item.subItems.map((sub: MenuItemType, index: number) => {
      const { subContainer } = this.getComponentStyles(themedStyle);
      const isSelected: boolean = this.getIsSelected(sub);

      const element: MenuItemElement = React.cloneElement(this.renderMenuItem(sub, false, index), {
        style: subContainer,
        selected: isSelected,
      });
      const separator: React.ReactElement<ViewProps> = index !== item.subItems.length - 1 ?
        this.renderSeparator(separatorStyle) : null;

      return (
        <React.Fragment key={index}>
          {element}
          {separator}
        </React.Fragment>
      );
    });
  };

  public render(): React.ReactNode {
    const { item, separatorStyle } = this.props;
    const { subItemsVisible } = this.state;
    const mainItem: MenuItemElement = this.renderMenuItem(item, true, MAIN_ITEM_KEY);
    const subItems: React.ReactNode = this.renderSubItems();
    const invisibleSubs: React.ReactElement<MeasureNodeProps> = this.renderSubItemsInvisible(subItems);
    const separator: React.ReactElement<ViewProps> = subItemsVisible ?
      this.renderSeparator(separatorStyle) : null;

    const animatedStyle: StyleType = { height: this.subItemsAnimation };

    return (
      <React.Fragment>
        {mainItem}
        {separator}
        <Animated.View style={animatedStyle}>
          {subItemsVisible && subItems}
        </Animated.View>
        {invisibleSubs}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  invisibleMenu: {
    opacity: 0,
    position: 'absolute',
  },
});

export const MenuGroup = styled<MenuGroupProps>(MenuGroupComponent);


export function allWithPrefix(source: StyleType, key: string): StyleType {
  return Object.keys(source)
    .filter((styleName: string) => styleName.includes(key))
    .reduce((obj: StyleType, styleKey: string) => {
      return {
        ...obj,
        [styleKey]: source[styleKey],
      };
    }, {});
}
