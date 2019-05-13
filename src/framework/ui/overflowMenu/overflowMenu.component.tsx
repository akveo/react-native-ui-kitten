/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ViewProps,
  View,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
  styled,
  ModalComponentCloseProps,
} from '@kitten/theme';
import {
  OverflowMenuItem,
  OverflowMenuItemProps,
} from './overflowMenuItem.component';
import {
  Popover,
  PopoverProps,
} from '../popover/popover.component';
import { Omit } from '../support/typings';

type MenuItemElement = React.ReactElement<OverflowMenuItemProps>;

type PopoverContentProps = Omit<PopoverProps, 'content'>;

interface ComponentProps extends PopoverContentProps, ModalComponentCloseProps {
  children: React.ReactElement<any>;
  items: OverflowMenuItemProps[];
  onSelect?: (index: number, event: GestureResponderEvent) => void;
}

export type OverflowMenuProps = & StyledComponentProps & ComponentProps;

/**
 * The `OverflowMenu` component is a component for showing menu content over the screen.
 * Component uses Popover -> ModalPanel -> Modal components "chain"
 *
 * @extends React.Component
 *
 * @property {React.ReactElement<any>} children - Determines the element above
 * which the menu will be rendered.
 *
 * @property {OverflowMenuItemType[]} items - Determines menu items.
 *
 * @property {string} size - Determines the size of the menu items components.
 * Can be 'small' | 'medium' | 'large'. By default size='medium'.
 *
 * @property {(event: GestureResponderEvent, index: number) => void} onSelect - Triggered on select value.
 *
 * @property {Omit<PopoverProps, 'content'>}
 *
 * @property StyledComponentProps
 *
 * @example Overflow menu items config example
 *
 * ```
 * const menuItems: OverflowMenuItemType[] = [
 *   {
 *     text: 'Menu Item 1',
 *     icon: (style: StyleType) => <Image source={{ uri: iconUri1 }} style={style}/>,
 *   },
 *   {
 *     text: 'Menu Item 2',
 *     icon: (style: StyleType) => <Image source={{ uri: iconUri2 }} style={style}/>,
 *     disabled: true,
 *   },
 *   {
 *     text: 'Menu Item 3',
 *   },
 * ];
 * ```
 *
 * @example OverflowMenu usage and API example
 *
 * ```
 * <OverflowMenu
 *   items={menuItems}
 *   placement='bottom start'
 *   visible={this.state.overflowMenuVisible}
 *   onSelect={this.onSelectItem}
 *   onRequestClose={this.setMenu1Visible}>
 *   <TouchableOpacity onPress={this.setMenuVisible}>
 *     <Image style={styles.icon} source={{ uri: menuIconUri }}/>
 *   </TouchableOpacity>
 * </OverflowMenu>
 * ```
 * */

export class OverflowMenuComponent extends React.Component<OverflowMenuProps> {

  static styledComponentName: string = 'OverflowMenu';

  static defaultProps: Partial<OverflowMenuProps> = {
    indicatorOffset: 12,
  };

  private onItemSelect = (index: number, event: GestureResponderEvent): void => {
    if (this.props.onSelect) {
      this.props.onSelect(index, event);
    }
  };

  private getComponentStyle = (style: StyleType): StyleType => {
    const {
      popoverBorderRadius,
      popoverBackgroundColor,
      itemBorderBottomWidth,
      itemBorderBottomColor,
    } = style;

    return {
      popover: {
        borderRadius: popoverBorderRadius,
        backgroundColor: popoverBackgroundColor,
        ...styles.popover,
      },
      item: {
        borderBottomWidth: itemBorderBottomWidth,
        borderBottomColor: itemBorderBottomColor,
        ...styles.item,
      },
    };
  };

  private isLastItem = (index: number): boolean => {
    return index === this.props.items.length - 1;
  };

  private renderItemElement = (item: OverflowMenuItemProps, index: number, style: StyleType): MenuItemElement => {
    return (
      <OverflowMenuItem
        key={index}
        style={style}
        {...item}
        index={index}
        onPress={this.onItemSelect}
      />
    );
  };

  private renderContentElementChildren = (style: StyleType): MenuItemElement[] => {
    return this.props.items.map((item: OverflowMenuItemProps, index: number) => {
      const itemElement: MenuItemElement = this.renderItemElement(item, index, style);

      const borderBottomWidth: number = this.isLastItem(index) ? 0 : style.borderBottomWidth;

      return React.cloneElement(itemElement, {
        style: [itemElement.props.style, { borderBottomWidth }],
      });
    });
  };

  private renderPopoverContentElement = (style: StyleType): React.ReactElement<ViewProps> => {
    const menuItems: MenuItemElement[] = this.renderContentElementChildren(style.item);

    return (
      <View style={this.props.style}>
        {menuItems}
      </View>
    );
  };

  public render(): React.ReactNode {
    const { style, themedStyle, children, ...restProps } = this.props;
    const { popover, ...componentStyle } = this.getComponentStyle(themedStyle);

    const contentElement: React.ReactElement<ViewProps> = this.renderPopoverContentElement(componentStyle);

    return (
      <Popover
        {...restProps}
        style={popover}
        content={contentElement}>
        {children}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  popover: {
    overflow: 'hidden',
  },
  item: {},
});

export const OverflowMenu = styled<OverflowMenuProps>(OverflowMenuComponent);
