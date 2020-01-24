/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Menu,
  MenuElement,
  MenuProps,
} from '../menu/menu.component';
import { MenuItemType } from '../menu/menuItem.component';
import {
  Popover,
  PopoverElement,
  PopoverProps,
} from '../popover/popover.component';
import { Override } from '../support/typings';

type PopoverContentProps = Omit<PopoverProps, 'content'>;
export type OverflowMenuItemType = Omit<MenuItemType, 'subItems'>;

interface ComponentProps extends PopoverContentProps {
  children: React.ReactElement;
}

type MenuBasedProps = Override<MenuProps, { data: OverflowMenuItemType[] }>;

export type OverflowMenuProps = & StyledComponentProps & ComponentProps & MenuBasedProps;
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
 * @property {boolean} visible - Determines whether popover is visible or not.
 *
 * @property {OverflowMenuItemType[]} data - Determines menu items.
 *
 * @property {ReactElement} children - Determines the element "above" which popover will be shown.
 *
 * @property {number} selectedIndex - Determines the index of currently selected item.
 *
 * @property {(index: number, event: GestureResponderEvent) => void} onSelect - Fires when selected item is changed.
 *
 * @property {string | PopoverPlacement} placement - Determines the placement of the popover.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Default is `bottom`.
 * Tip: use one of predefined placements instead of strings, e.g `PopoverPlacements.TOP`
 *
 * @property {boolean} fullWidth - Determines whether content element should have same width as child element.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Determines the style of backdrop.
 *
 * @property {() => void} onBackdropPress - Determines component's behavior when the user is
 * tapping on back-drop.
 *
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
class OverflowMenuComponent extends React.Component<OverflowMenuProps> {

  static styledComponentName: string = 'OverflowMenu';

  private popoverRef: React.RefObject<Popover> = React.createRef();

  public show = (): void => {
    this.popoverRef.current.show();
  };

  public hide = (): void => {
    this.popoverRef.current.hide();
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { indicatorBackgroundColor, ...containerParameters } = source;

    return {
      container: containerParameters,
      indicator: {
        backgroundColor: indicatorBackgroundColor,
      },
    };
  };

  private renderPopoverContentElement = (): MenuElement => {
    const { themedStyle, indicatorStyle, children, data, style, ...restProps } = this.props;

    return (
      <Menu
        {...restProps}
        style={styles.menu}
        data={data}
        initialNumToRender={data.length}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    );
  };

  public render(): PopoverElement {
    const { style, themedStyle, indicatorStyle, children, appearance, ...restProps } = this.props;
    const { container, indicator } = this.getComponentStyle(themedStyle);

    const contentElement: MenuElement = this.renderPopoverContentElement();

    return (
      <Popover
        {...restProps}
        ref={this.popoverRef}
        style={[container, style]}
        content={contentElement}>
        {children}
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
