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

class OverflowMenuComponent extends React.Component<OverflowMenuProps> {

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
