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
import {
  MenuItemType,
} from '../menu/menuItem.component';
import {
  Popover,
  PopoverProps,
} from '../popover/popover.component';
import {
  ModalPresentingBased,
  Omit,
  Override,
} from '../support/typings';

type PopoverContentProps = Omit<PopoverProps, 'content'>;
export type OverflowMenuItemType = Omit<MenuItemType, 'subItems'>;

interface ComponentProps extends PopoverContentProps, ModalPresentingBased {
  children: React.ReactElement<any>;
}

type MenuBasedProps = Override<MenuProps, { data: OverflowMenuItemType[] }>;

export type OverflowMenuProps = & StyledComponentProps & ComponentProps & MenuBasedProps;
export type OverflowMenuElement = React.ReactElement<OverflowMenuProps>;

/**
 * `OverflowMenu` renders vertical list of menu items in a modal.
 *
 * @extends React.Component
 *
 * @property {React.ReactElement<any>} children - Determines the element above
 * which the menu will be rendered.
 *
 * @property {OverflowMenuItemType[]} items - Determines menu items.
 *
 * @property {string} size - Determines the size of the menu items components.
 * Can be `small`, `medium` or `large`.
 * Default is `medium`.
 *
 * @property {(event: GestureResponderEvent, index: number) => void} onSelect - Fires when selected item is changed.
 *
 * @property {Omit<PopoverProps, 'content'>}
 *
 * @property StyledComponentProps
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import {
 *   OverflowMenu,
 *   Button,
 * } from 'react-native-ui-kitten';
 *
 * export class OverflowMenuShowcase extends React.Component {
 *
 *   private items: OverflowMenuItemType[] = [
 *     { text: 'Menu Item 1' },
 *     { text: 'Menu Item 2' },
 *     { text: 'Menu Item 3' },
 *   ];
 *
 *   public state = {
 *     menuVisible: false,
 *   };
 *
 *   private onItemSelect = (index: number) => {
 *     // Handle Menu Item selection
 *   };
 *
 *   private toggleMenu = () => {
 *     this.setState({ menuVisible: !this.state.menuVisible });
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <OverflowMenu
 *         items={this.items}
 *         visible={this.state.menuVisible}
 *         onSelect={this.onItemSelect}
 *         onBackdropPress={this.toggleMenu}>
 *         <Button onPress={this.toggleMenu}>
 *           TOGGLE MENU
 *         </Button>
 *       </OverflowMenu>
 *     );
 *   }
 * }
 * ```
 */

export class OverflowMenuComponent extends React.Component<OverflowMenuProps> {

  static styledComponentName: string = 'OverflowMenu';

  static defaultProps: Partial<OverflowMenuProps> = {
    indicatorOffset: 12,
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      indicatorBackgroundColor,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      indicator: {
        backgroundColor: indicatorBackgroundColor,
      },
    };
  };

  private renderPopoverContentElement = (): MenuElement => {
    const { themedStyle, indicatorStyle, children, data, ...restProps } = this.props;

    return (
      <Menu
        {...restProps}
        data={data}
        style={styles.menu}
        bounces={false}
      />
    );
  };

  public render(): React.ReactNode {
    const { themedStyle, style, indicatorStyle, children, appearance, ...restProps } = this.props;
    const { container, indicator } = this.getComponentStyle(themedStyle);

    const contentElement: MenuElement = this.renderPopoverContentElement();

    return (
      <Popover
        {...restProps}
        style={[container, styles.container, style]}
        indicatorStyle={[indicator, indicatorStyle]}
        content={contentElement}>
        {children}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  menu: {
    flexGrow: 0,
  },
});

export const OverflowMenu = styled<OverflowMenuProps>(OverflowMenuComponent);
