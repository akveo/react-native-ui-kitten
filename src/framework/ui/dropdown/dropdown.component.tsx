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
  StyleProp,
  View,
  ViewStyle,
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
import {
  MeasureNode,
  MeasureResult,
  MeasuringElementProps,
  MeasuringNode,
} from '../popover/measure.component';

type TextElement = React.ReactElement<TextProps>;
type IconElement = React.ReactElement<ImageProps>;
type MenuElement = React.ReactElement<DropdownMenuProps>;
type IconProp = (style: ImageStyle, visible: boolean) => IconElement;

const { height } = Dimensions.get('screen');
const MEASURED_MENU_TAG: string = 'Menu';

interface ComponentProps {
  items: DropdownItemType[];
  selectedIndex?: number;
  size?: string;
  status?: string;
  appearance?: string;
  textStyle?: TextStyle;
  placeholder?: string;
  placeholderStyle?: StyleProp<TextStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  controlStyle?: StyleProp<ViewStyle>;
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
    placeholder: 'Select Option',
  };

  public state: State = {
    visible: false,
    menuWidth: 0,
    placement: 'bottom',
  };

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

  private onMenuMeasure = (result: MeasureResult): void => {
    const y: number = result[MEASURED_MENU_TAG].origin.y;
    const contentHeight: number = result[MEASURED_MENU_TAG].size.height;
    const restSpace: number = height - y;
    const placement: 'top' | 'bottom' = restSpace > contentHeight ? 'bottom' : 'top';

    this.setState({ placement });
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { visible } = this.state;
    const controlStyles: StyleType = this.getPartStyles(source, 'control');
    const iconStyles: StyleType = this.getPartStyles(source, 'icon');
    const textStyles: StyleType = this.getPartStyles(source, 'text');
    const menuStyles: StyleType = this.getPartStyles(source, 'menu');
    const labelStyle: StyleType = this.getPartStyles(source, 'label');
    const controlBorderStyle: StyleType = {
      borderTopLeftRadius: controlStyles.controlBorderRadius,
      borderTopRightRadius: controlStyles.controlBorderRadius,
      borderBottomLeftRadius: visible ? 0 : controlStyles.controlBorderRadius,
      borderBottomRightRadius: visible ? 0 : controlStyles.controlBorderRadius,
    };

    return {
      control: {
        backgroundColor: controlStyles.controlBackgroundColor,
        borderColor: controlStyles.controlBorderColor,
        borderWidth: controlStyles.controlBorderWidth,
        minHeight: controlStyles.controlMinHeight,
        minWidth: controlStyles.controlMinWidth,
        paddingHorizontal: controlStyles.controlPaddingHorizontal,
        paddingVertical: controlStyles.controlPaddingVertical,
        ...controlBorderStyle,
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
        borderStartRadius: 0,
        borderEndRadius: menuStyles.menuBorderRadius,
        borderColor: menuStyles.menuBorderColor,
        borderWidth: menuStyles.menuBorderWidth,
      },
      label: {
        color: labelStyle.labelColor,
        marginBottom: labelStyle.labelMarginBottom,
      },
    };
  };

  private renderMeasuredMenu = (menu: MenuElement): MeasuringNode => {
    const measuringProps: MeasuringElementProps = { tag: MEASURED_MENU_TAG };
    const invisibleMenu: MenuElement = React.cloneElement(menu, {
      ...measuringProps,
      key: MEASURED_MENU_TAG,
      style: [menu.props.style, styles.invisibleMenu],
    });

    return (
      <MeasureNode onResult={this.onMenuMeasure}>
        {[invisibleMenu]}
      </MeasureNode>
    );
  };

  private renderLabelElement = (style: TextStyle): TextElement | null => {
    const { label, labelStyle } = this.props;

    return label ? (
      <Text style={[style, styles.label, labelStyle]}>
        {label}
      </Text>
    ) : null;
  };

  private renderIconElement = (style: ImageStyle): IconElement => {
    const { icon } = this.props;
    const { visible } = this.state;

    return icon && icon(style, visible);
  };

  private renderTextElement = (style: TextStyle): TextElement => {
    const { selectedIndex, items, placeholder } = this.props;
    const selectedOption = selectedIndex === -1 ? placeholder : items[selectedIndex].text;

    return (
      <Text style={[style, styles.text, this.props.textStyle]}>
        {selectedOption}
      </Text>
    );
  };

  private renderMenuElement = (style: StyleType): MenuElement => {
    const { items, selectedIndex, size } = this.props;
    const additionalMenuStyle: StyleType = { width: this.state.menuWidth };

    return (
      <DropdownMenu
        key={0}
        size={size}
        items={items}
        style={[styles.menu, style, additionalMenuStyle]}
        bounces={false}
        selectedIndex={selectedIndex}
        onSelect={this.onItemSelect}
      />
    );
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, style, controlStyle, ...restProps } = this.props;
    const { visible, placement, menuWidth } = this.state;
    const { control, icon, text, menu, label } = this.getComponentStyle(themedStyle);

    const iconElement: IconElement = this.renderIconElement(icon);
    const textElement: TextElement = this.renderTextElement(text);
    const menuElement: MenuElement = this.renderMenuElement(menu);
    const measuredMenu: MeasuringNode = this.renderMeasuredMenu(menuElement);
    const labelElement: TextElement | null = this.renderLabelElement(label);
    const additionalMenuStyle: StyleType = { maxWidth: menuWidth };

    return (
      <View style={style}>
        {labelElement}
        <Popover
          visible={visible}
          content={menuElement}
          style={additionalMenuStyle}
          indicatorStyle={styles.indicator}
          placement={placement}
          onBackdropPress={this.setVisibility}>
          <TouchableOpacity
            {...restProps}
            activeOpacity={1.0}
            style={[styles.control, control, controlStyle]}
            onLayout={this.onControlLayout}
            onPress={this.onPress}
            onPressIn={this.onPressIn}
            onPressOut={this.onPressOut}>
            {textElement}
            {iconElement}
          </TouchableOpacity>
        </Popover>
        {measuredMenu}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {},
  icon: {},
  label: {},
  indicator: {
    width: 0,
    height: 0,
  },
  menu: {
    flexGrow: 0,
  },
  invisibleMenu: {
    position: 'absolute',
    opacity: 0,
    width: 0,
  },
});

export const Dropdown = styled<DropdownProps>(DropdownComponent);
