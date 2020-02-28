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
  StyledComponentProps,
  StyleType,
} from '../../theme';
import {
  Menu,
  MenuElement,
} from '../menu/menu.component';
import { MenuItemProps } from '../menu/menuItem.component';
import {
  Popover,
  PopoverElement,
  PopoverProps,
} from '../popover/popover.component';

type OverflowMenuStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | string;
}>;

type OverflowMenuPopoverProps = Overwrite<PopoverProps, {
  children: ChildrenWithProps<MenuItemProps>;
}>;

export type OverflowMenuProps = OverflowMenuPopoverProps & OverflowMenuStyledProps;
export type OverflowMenuElement = React.ReactElement<OverflowMenuProps>;

/**
 * OverflowMenu renders vertical list of menu items in a modal.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets menu visible.
 *
 * @method {() => void} hide - Sets menu invisible.
 *
 * @property {boolean} visible - Determines whether menu is visible.
 *
 * @property {ReactElement} children - A component relative to which menu will be shown.
 *
 * @property {OverflowMenuItemType[]} data - Options displayed in component.
 *
 * @property {(index: number, event: GestureResponderEvent) => void} onSelect - Called when option is pressed.
 *
 * @property {number} selectedIndex - Determines the index of the selected option.
 *
 * @property {() => void} onBackdropPress - Called when backdrop is pressed.
 *
 * @property {string | PopoverPlacement} placement - Position of the options list relative to the `children`.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Default is `bottom`.
 * Tip: use one of predefined placements instead of strings, e.g `PopoverPlacements.TOP`
 *
 * @property {boolean} fullWidth - Determines whether the menu should have same width as `children`.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Determines the style of backdrop.
 **
 * @overview-example OverflowMenuSimpleUsage
 *
 * @overview-example OverflowMenuPlacement
 *
 * @overview-example OverflowMenuWithIcons
 *
 * @overview-example OverflowMenuStyledBackdrop
 *
 * @overview-example OverflowMenuWithDisabledItems
 *
 * @example OverflowMenuWithoutDivider
 *
 * @example OverflowMenuExternalSourceIcons
 */
export class OverflowMenuComponent extends React.Component<OverflowMenuProps> {

  static styledComponentName: string = 'OverflowMenu';

  private popoverRef: React.RefObject<Popover> = React.createRef();

  private get itemsCount(): number {
    return React.Children.count(this.props.children);
  }

  public show = (): void => {
    this.popoverRef.current.show();
  };

  public hide = (): void => {
    this.popoverRef.current.hide();
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
