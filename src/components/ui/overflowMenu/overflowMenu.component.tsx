/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Overwrite } from 'utility-types';
import { ChildrenWithProps } from '../../devsupport';
import {
  styled,
  StyleType,
} from '../../theme';
import {
  Menu,
  MenuElement,
  MenuProps,
} from '../menu/menu.component';
import { MenuItemProps } from '../menu/menuItem.component';
import {
  Popover,
  PopoverElement,
  PopoverProps,
} from '../popover/popover.component';

type OverflowMenuPopoverProps = Overwrite<PopoverProps, {
  children?: ChildrenWithProps<MenuItemProps>;
}>;

export type OverflowMenuProps = MenuProps & OverflowMenuPopoverProps;

export type OverflowMenuElement = React.ReactElement<OverflowMenuProps>;

/**
 * Displays a menu relative to another view.
 * Menu should contain MenuItem components to provide a useful component.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets menu visible.
 *
 * @method {() => void} hide - Sets menu invisible.
 *
 * @property {ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[]} children -
 * items to be rendered within menu.
 *
 * @property {() => ReactElement} anchor - A component relative to which content component will be shown.
 *
 * @property {boolean} visible - Whether menu is visible.
 * Defaults to false.
 *
 * @property {IndexPath} selectedIndex - Index of selected item.
 * IndexPath `row: number, section?: number` - position of element in sectioned list.
 * Updating this property is not required if marking items selected is not needed.
 *
 * @property {(IndexPath) => void} onSelect - Called when item is pressed.
 *
 * @property {() => void} onBackdropPress - Called when popover is visible and the underlying view was touched.
 * Useful when needed to close the modal on outside touches.
 *
 * @property {string | PopoverPlacement} placement - Position of the options list relative to the `children`.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Defaults to *bottom*.
 *
 * @property {boolean} fullWidth - Whether a menu should take the width of `anchor`.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
 **
 * @overview-example OverflowMenuSimpleUsage
 *
 * @overview-example OverflowMenuPlacement
 *
 * @overview-example OverflowMenuAccessories
 *
 * @overview-example OverflowMenuStyledBackdrop
 *
 * @overview-example OverflowMenuWithDisabledItems
 *
 * @example OverflowMenuWithoutDivider
 */
export class OverflowMenuComponent extends React.Component<OverflowMenuProps> {

  static styledComponentName: string = 'OverflowMenu';

  private popoverRef = React.createRef<Popover>();

  private get itemsCount(): number {
    return React.Children.count(this.props.children);
  }

  public show = (): void => {
    this.popoverRef.current?.show();
  };

  public hide = (): void => {
    this.popoverRef.current?.hide();
  };

  private getComponentStyle = (source: StyleType) => {
    const { indicatorBackgroundColor, ...containerParameters } = source;

    return {
      container: containerParameters,
      indicator: {
        backgroundColor: indicatorBackgroundColor,
      },
    };
  };

  private renderPopoverContentElement = (): MenuElement => {
    const { eva, children, style, ...menuProps } = this.props;

    return (
      <Menu
        {...menuProps}
        style={styles.menu}
        initialNumToRender={this.itemsCount}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {this.props.children}
      </Menu>
    );
  };

  public render(): PopoverElement {
    const { eva, style, children, appearance, ...popoverProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);
    const contentElement: MenuElement = this.renderPopoverContentElement();

    return (
      <Popover
        {...popoverProps}
        ref={this.popoverRef}
        style={[evaStyle.container, style]}>
        {contentElement}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flexGrow: 0,
  },
});

export const OverflowMenu = styled<OverflowMenuProps>(OverflowMenuComponent);
