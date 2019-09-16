/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  TouchableOpacityProps,
  GestureResponderEvent,
  View,
  Animated,
  StyleSheet,
  ImageProps,
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
import { Chevron } from '../support/components';
import { DividerElement } from '../divider/divider.component';

interface ComponentProps {
  item: MenuItemType;
  selectedIndex: number;
  divider?: DividerElement;
  onSelect?: (index: number, event?: GestureResponderEvent) => void;
}

interface ComponentState {
  subItemsVisible: boolean;
  subItemsHeight: number;
}

export type SubMenuProps = ComponentProps & StyledComponentProps & TouchableOpacityProps;
export type SubMenuElement = React.ReactElement<SubMenuProps>;
type OnPressHandler = (index: number, event?: GestureResponderEvent) => void;
type IconElement = React.ReactElement<ImageProps>;

const MAIN_ITEM_KEY: string = 'Main Item';
const DIVIDER_ELEMENT_KEY: string = 'Divider';
const SUB_ITEMS_MEASURE_TAG: string = 'Sub Items';

class SubMenuComponent extends React.Component<SubMenuProps, ComponentState> {

  static styledComponentName: string = 'SubMenu';

  public state: ComponentState = {
    subItemsVisible: false,
    subItemsHeight: 0,
  };

  private subItemsAnimation: Animated.Value = new Animated.Value(0);
  private iconAnimation: Animated.Value = new Animated.Value(-180);

  public componentDidUpdate(prevProps: SubMenuProps, prevState: ComponentState): void {
    if (prevState.subItemsVisible !== this.state.subItemsVisible) {
      if (this.state.subItemsVisible) {
        this.subItemsExpandAnimate(this.state.subItemsHeight);
        this.animateIcon(0);
      } else {
        this.subItemsExpandAnimate(0);
        this.animateIcon(-180);
      }
    }
  }

  private subItemsExpandAnimate = (toValue: number): void => {
    Animated.spring(this.subItemsAnimation, {
      toValue: toValue,
    }).start();
  };

  private animateIcon = (toValue: number): void => {
    Animated.timing(this.iconAnimation, {
      toValue: toValue,
      duration: 200,
    }).start();
  };

  private onMainItemPress = (): void => {
    const subItemsVisible: boolean = !this.state.subItemsVisible;

    this.setState({ subItemsVisible });
  };

  private onSubItemPress = (index: number, event: GestureResponderEvent): void => {
    if (this.props.onSelect) {
      this.props.onSelect(index, event);
    }
  };

  private getComponentStyles = (style: StyleType): StyleType => {
    return {
      subContainer: {
        paddingHorizontal: style.subItemsPaddingHorizontal,
      },
    };
  };

  private onSubMenuMeasure = (result: MeasureResult): void => {
    const subItemsHeight: number = result[SUB_ITEMS_MEASURE_TAG].size.height;

    this.setState({ subItemsHeight });
  };

  private getIsSelected = (item: MenuItemType): boolean => {
    const { selectedIndex } = this.props;

    return selectedIndex === item.menuIndex;
  };

  private isMainItemDividerExist = (): boolean => {
    const { divider } = this.props;
    const { subItemsVisible } = this.state;

    return subItemsVisible && divider !== null;
  };

  private isSubItemDividerExist = (item: MenuItemType, index: number): boolean => {
    const { divider } = this.props;

    return (index !== item.subItems.length - 1) && (divider !== null);
  };

  private renderDivider = (): DividerElement => {
    const { divider } = this.props;

    return divider && React.cloneElement(divider, {
      key: DIVIDER_ELEMENT_KEY,
    });
  };

  private renderMainItemAccessory = (style: StyleType): IconElement => {
    const rotateInterpolate = this.iconAnimation.interpolate({
      inputRange: [-180, 0],
      outputRange: ['-180deg', '0deg'],
    });
    const animatedStyle: StyleType = { transform: [{ rotate: rotateInterpolate }] };

    return (
      <Chevron
        style={[style, animatedStyle]}
        isAnimated={true}
      />
    );
  };

  private renderMenuItem = (item: MenuItemType,
                            isMainItem: boolean,
                            index: number | string): MenuItemElement => {

    const onPressHandler: OnPressHandler = isMainItem ? this.onMainItemPress : this.onSubItemPress;
    const mainMenuItemAccessory = isMainItem ? this.renderMainItemAccessory : null;

    return (
      <MenuItem
        {...item}
        key={index}
        accessory={mainMenuItemAccessory}
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
            pointerEvents='none'
            key={SUB_ITEMS_MEASURE_TAG}
            style={styles.invisibleMenu}>
            {subItems}
          </View>,
        ]}
      </MeasureNode>
    );
  };

  private renderSubItems = (): React.ReactNode => {
    const { item, themedStyle, divider } = this.props;

    return item.subItems.map((sub: MenuItemType, index: number) => {
      const { subContainer } = this.getComponentStyles(themedStyle);
      const isSelected: boolean = this.getIsSelected(sub);

      const element: MenuItemElement = React.cloneElement(this.renderMenuItem(sub, false, index), {
        style: subContainer,
        selected: isSelected,
      });
      const dividerElement: DividerElement = this.isSubItemDividerExist(item, index) ?
        this.renderDivider() : null;

      return (
        <React.Fragment key={index}>
          {element}
          {dividerElement}
        </React.Fragment>
      );
    });
  };

  private renderComponentChildren = (): React.ReactNodeArray => {
    const { item } = this.props;

    return [
      this.renderMenuItem(item, true, MAIN_ITEM_KEY),
      this.renderSubItems(),
      this.isMainItemDividerExist() ? this.renderDivider() : null,
    ];
  };

  public render(): React.ReactNode {
    const { subItemsVisible } = this.state;
    const [mainItem, subItems, divider] = this.renderComponentChildren();
    const invisibleSubs: React.ReactElement<MeasureNodeProps> = this.renderSubItemsInvisible(subItems);

    const animatedStyle: StyleType = { height: this.subItemsAnimation };

    return (
      <React.Fragment>
        {mainItem}
        {divider}
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

export const SubMenu = styled<SubMenuProps>(SubMenuComponent);
