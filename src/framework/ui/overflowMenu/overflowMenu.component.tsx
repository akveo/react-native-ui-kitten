import React from 'react';
import {
  ViewProps,
  View,
  GestureResponderEvent,
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
import { Omit } from '../service/type';

type MenuItemElement = React.ReactElement<OverflowMenuItemProps>;

interface OverflowMenuProps {
  children: React.ReactElement<any>;
  items: OverflowMenuItemType[];
  size?: string;
  onSelect?: (event: GestureResponderEvent, index: number) => void;
}

const Popover = styled<PopoverComponent, PopoverProps>(PopoverComponent);
const OverflowMenuItem =
  styled<OverflowMenuItemComponent, OverflowMenuItemProps>(OverflowMenuItemComponent);

export type Props = & StyledComponentProps & OverflowMenuProps & Omit<PopoverProps, 'content'>;

export class OverflowMenu extends React.Component<Props> {

  private isFirstItem = (index: number): boolean => {
    return index === 0;
  };

  private isLastItem = (index: number): boolean => {
    return this.props.items.length - 1 === index;
  };

  private isSingleItem = (): boolean => {
    return this.props.items.length === 1;
  };


  private onSelect = (event: GestureResponderEvent, index: number): void => {
    if (this.props.onSelect) {
      this.props.onSelect(event, index);
    }
  };

  private getPopoverStyle = (style: StyleType): StyleType => {
    return {
      backgroundColor: style.popoverBackgroundColor,
      borderRadius: style.borderRadius,
    };
  };

  private getMenuItemStyle = (style: StyleType, index: number): StyleType => {
    const borderRadius: number = style.itemBorderRadius;

    if (this.isFirstItem(index) && !this.isSingleItem()) {
      return {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
      };
    } else if (this.isLastItem(index) && !this.isSingleItem()) {
      return {
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
      };
    } else if (this.isSingleItem()) {
      return {
        borderRadius: borderRadius,
      };
    }
  };

  private renderMenuItem = (item: OverflowMenuItemType, index: number): MenuItemElement => {
    const { size, themedStyle } = this.props;
    const itemStyle: StyleType = this.getMenuItemStyle(themedStyle, index);

    return (
      <OverflowMenuItem
        {...item}
        size={size}
        isLastItem={this.isLastItem(index)}
        style={itemStyle}
        key={index}
        index={index}
        onPress={this.onSelect}
      />
    );
  };

  private renderComponentChildren = (): MenuItemElement[] => {
    return this.props.items.map((item: OverflowMenuItemType, index: number) =>
      this.renderMenuItem(item, index));
  };

  private renderMenuContent = (): React.ReactElement<ViewProps> => {
    const menuItems: MenuItemElement[] = this.renderComponentChildren();

    return (
      <View style={this.props.style}>
        {menuItems}
      </View>
    );
  };

  public render(): React.ReactNode {
    const { children, themedStyle, ...restProps } = this.props;
    const menu: React.ReactElement<ViewProps> = this.renderMenuContent();
    const popoverStyle: StyleType = this.getPopoverStyle(themedStyle);

    return (
      <Popover
        {...restProps}
        indicatorOffset={2}
        content={menu}
        style={[popoverStyle, restProps.style]}>
        {children}
      </Popover>
    );
  }
}
