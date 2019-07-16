/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  LayoutChangeEvent,
  Dimensions,
} from 'react-native';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text,
  TextProps,
} from '../text/text.component';
import { Popover } from '../popover/popover.component';
import {
  DropdownMenu,
  DropdownMenuProps,
  DropdownItemType,
} from './dropdownMenu.component';
import { Frame, PopoverPlacement } from '../popover/type';
import { MeasuredElement, MeasureNode, MeasureResult } from '../popover/measure.component';

type TextElement = React.ReactElement<TextProps>;
type IconElement = React.ReactElement<ImageProps>;
type MenuElement = React.ReactElement<DropdownMenuProps>;
type IconProp = (style: ImageStyle) => IconElement;

const { height } = Dimensions.get('screen');

interface ComponentProps {
  items: DropdownItemType[];
  selectedIndex?: number;
  textStyle?: TextStyle;
  icon?: IconProp;
  onSelect: (index: number, event?: GestureResponderEvent) => void;
}

export type DropdownProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;

interface State {
  visible: boolean;
  menuWidth: number;
  placement: 'top' | 'bottom';
}

class DropdownComponent extends React.Component<DropdownProps, State> {

  static styledComponentName: string = 'Dropdown';
  static defaultProps: Partial<DropdownProps> = {
    selectedIndex: -1,
  };

  public state: State = {
    visible: false,
    menuWidth: 0,
    placement: 'bottom',
  };

  private placeholder: string = 'Select option';

  private onItemSelect = (index: number, event: GestureResponderEvent): void => {
    this.props.onSelect(index, event);
    this.setVisibility();
  };

  private setVisibility = (): void => {
    const visible: boolean = !this.state.visible;

    this.setState({ visible });
  };

  private onPress = () => {
    this.props.dispatch([]);
    this.setVisibility();
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private getPartStyles = (source: StyleType, key: string): StyleType => {
    return Object.keys(source)
      .filter((styleName: string) => styleName.includes(key))
      .reduce((obj: StyleType, styleKey: string) => {
        return {
          ...obj,
          [styleKey]: source[styleKey],
        };
      }, {});
  };

  private onControlLayout = (event: LayoutChangeEvent): void => {
    const { width: menuWidth } = event.nativeEvent.layout;

    if (this.state.menuWidth === 0) {
      this.setState({ menuWidth });
    }
  };

  private onPopoverMeasure = (contentFrame: Frame): void => {
    const y: number = contentFrame.origin.y;
    const { height: contentHeight} = contentFrame.size;
    const restSpace: number = height - y;
    const placement: 'top' | 'bottom' = restSpace > contentHeight ? 'bottom' : 'top';

    this.setState({ placement });
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const controlStyles: StyleType = this.getPartStyles(source, 'control');
    const iconStyles: StyleType = this.getPartStyles(source, 'icon');
    const textStyles: StyleType = this.getPartStyles(source, 'text');
    const menuStyles: StyleType = this.getPartStyles(source, 'menu');

    return {
      control: {
        backgroundColor: controlStyles.controlBackgroundColor,
        borderColor: controlStyles.controlBorderColor,
        borderRadius: controlStyles.controlBorderRadius,
        borderWidth: controlStyles.controlBorderWidth,
        minHeight: controlStyles.controlMinHeight,
        minWidth: controlStyles.controlMinWidth,
        paddingHorizontal: controlStyles.controlPaddingHorizontal,
        paddingVertical: controlStyles.controlPaddingVertical,
      },
      icon: {
        height: iconStyles.iconHeight,
        width: iconStyles.iconWidth,
        marginHorizontal: iconStyles.iconMarginHorizontal,
        tintColor: iconStyles.iconTintColor,
      },
      text: {
        color: textStyles.textColor,
        fontSize: textStyles.textFontSize,
        fontWeight: textStyles.textFontWeight,
        lineHeight: textStyles.textLineHeight,
        marginHorizontal: textStyles.textMarginHorizontal,
      },
      menu: {
        maxHeight: menuStyles.menuMaxHeight,
        borderRadius: menuStyles.menuBorderRadius,
        borderColor: menuStyles.menuBorderColor,
        borderWidth: menuStyles.menuBorderWidth,
      },
    };
  };

  private renderIconElement = (style: ImageStyle): IconElement => {
    const iconElement: IconElement = this.props.icon(style);

    return React.cloneElement(iconElement, {
      style: [style, styles.icon, iconElement.props.style],
    });
  };

  private renderTextElement = (style: TextStyle): TextElement => {
    const { selectedIndex, items } = this.props;
    const selectedOption = selectedIndex === -1 ? this.placeholder : items[selectedIndex].text;

    return (
      <Text style={[style, styles.text, this.props.textStyle]}>
        {selectedOption}
      </Text>
    );
  };

  private renderMenuElement = (style: StyleType): MenuElement => {
    const { items } = this.props;
    const additionalMenuStyle: StyleType = { width: this.state.menuWidth };

    return (
      <DropdownMenu
        key={0}
        items={items}
        style={[styles.menu, style, additionalMenuStyle]}
        bounces={false}
        onSelect={this.onItemSelect}
      />
    );
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle } = this.props;
    const { visible, placement, menuWidth } = this.state;
    const { control, icon, text, menu } = this.getComponentStyle(themedStyle);

    const iconElement: IconElement = this.renderIconElement(icon);
    const textElement: TextElement = this.renderTextElement(text);
    const menuElement: MenuElement = this.renderMenuElement(menu);
    const additionalMenuStyle: StyleType = { maxWidth: menuWidth };

    return (
      <Popover
        visible={visible}
        content={menuElement}
        style={additionalMenuStyle}
        indicatorStyle={styles.indicator}
        placement={placement}
        onContentMeasure={this.onPopoverMeasure}
        onBackdropPress={this.setVisibility}>
        <TouchableOpacity
          activeOpacity={1.0}
          style={[styles.control, control]}
          onLayout={this.onControlLayout}
          onPress={this.onPress}
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}>
          {textElement}
          {iconElement}
        </TouchableOpacity>
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: 600,
  },
  text: {},
  icon: {},
  indicator: {
    width: 0,
    height: 0,
  },
  menu: {
    flexGrow: 0,
  },
});

export const Dropdown = styled<DropdownProps>(DropdownComponent);
