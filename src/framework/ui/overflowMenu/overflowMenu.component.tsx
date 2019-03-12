import React from 'react';
import {
  StyleSheet,
  ViewProps,
  View,
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
export type MenuItemType = Omit<OverflowMenuItemType, 'size'>;

interface OverflowMenuProps {
  children: React.ReactElement<any>;
  items: MenuItemType[];
  size?: string;
  onSelect?: (index: number) => void;
}

const Popover = styled<PopoverComponent, PopoverProps>(PopoverComponent);
const OverflowMenuItem =
  styled<OverflowMenuItemComponent, OverflowMenuItemProps>(OverflowMenuItemComponent);

export type Props = & StyledComponentProps & OverflowMenuProps & Omit<PopoverProps, 'content'>;

export class OverflowMenu extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    size: 'medium',
  };

  private onSelect = (index: number): void => {
    if (this.props.onSelect) {
      this.props.onSelect(index);
    }
  };

  private isFirstItem = (index: number): boolean => {
    return index === 0;
  };

  private isLastItem = (index: number): boolean => {
    return this.props.items.length - 1 === index;
  };

  private isSingleItem = (): boolean => {
    return this.props.items.length === 1;
  };

  private getPopoverStyle = (style: StyleType): StyleType => ({
    ...style.popover,
    borderRadius: style.borderRadius,
  });

  private getMenuItemStyle = (style: StyleType, index: number): StyleType => {
    const borderRadius: number = style.menuItem.borderRadius;

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
    } else {
      return null;
    }
  };

  private renderMenuItem = (item: MenuItemType, index: number): MenuItemElement => {
    const { size, themedStyle } = this.props;
    const itemStyle: StyleType = this.getMenuItemStyle(themedStyle, index);

    return (
      <OverflowMenuItem
        {...item}
        size={size}
        isLastItem={this.isLastItem(index)}
        style={itemStyle}
        key={index}
        onPress={() => this.onSelect(index)}
      />
    );
  };

  private renderMenuContent = (): React.ReactElement<ViewProps> => {
    const { items, style } = this.props;
    const menuItems: MenuItemElement[] = items
      .map((item: MenuItemType, index: number) => this.renderMenuItem(item, index));

    return (
      <View style={style}>
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
        content={menu}
        style={[popoverStyle, restProps.style]}>
        {children}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({});
