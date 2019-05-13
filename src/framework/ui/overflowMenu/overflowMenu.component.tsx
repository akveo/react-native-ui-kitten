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
} from '@kitten/theme';
import {
  OverflowMenuItemType,
  OverflowMenuItem as OverflowMenuItemComponent,
  Props as OverflowMenuItemProps,
} from './overflowMenuItem.component';
import {
  Popover as PopoverComponent,
  Props as PopoverProps,
} from '../popover/popover.component';
import { Omit } from '../common/type';

type MenuItemElement = React.ReactElement<OverflowMenuItemProps>;

interface OverflowMenuProps {
  children: React.ReactElement<any>;
  items: OverflowMenuItemType[];
  onSelect?: (index: number, event: GestureResponderEvent) => void;
}

const Popover = styled<PopoverProps>(PopoverComponent);
const OverflowMenuItem = styled<OverflowMenuItemProps>(OverflowMenuItemComponent);

export type Props = & StyledComponentProps & OverflowMenuProps & Omit<PopoverProps, 'content'>;

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
 * @example OverflowMenu usage example
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

export class OverflowMenu extends React.Component<Props> {

  static styledComponentName: string = 'OverflowMenu';

  static defaultProps: Partial<Props> = {
    indicatorOffset: 12,
  };

  private onSelect = (index: number, event: GestureResponderEvent): void => {
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

  private renderItemElement = (item: OverflowMenuItemType, index: number, style: StyleType): MenuItemElement => {
    return (
      <OverflowMenuItem
        style={style}
        {...item}
        key={index}
        index={index}
        onPress={this.onSelect}
      />
    );
  };

  private renderContentElementChildren = (style: StyleType): MenuItemElement[] => {
    const { items } = this.props;

    return this.props.items.map((item: OverflowMenuItemType, index: number) => {
      const itemElement: MenuItemElement = this.renderItemElement(item, index, style);

      const isLast: boolean = index === items.length - 1;
      const borderBottomWidth: number = isLast ? 0 : style.borderBottomWidth;

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
