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
  StyleProp,
  View,
  ViewStyle, ListRenderItemInfo,
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
} from './dropdownMenu.component';
import { DropdownItemType } from './droppdownItem.component';
import {
  MeasureNode,
  MeasureResult,
  MeasuringElementProps,
} from '../popover/measure.component';
import {
  SelectionStrategy,
  MultiSelectStrategy,
  SingleSelectStrategy,
} from './selection.strategy';

type TextElement = React.ReactElement<TextProps>;
type IconElement = React.ReactElement<ImageProps>;
type MenuElement = React.ReactElement<DropdownMenuProps>;
type ControlElement = React.ReactElement<TouchableOpacityProps>;
type IconProp = (style: ImageStyle, visible: boolean) => IconElement;
export type SelectedOption = Array<DropdownItemType> | DropdownItemType;

const MEASURED_CONTROL_TAG: string = 'Control';

interface ComponentProps {
  items: DropdownItemType[];
  multiSelect?: boolean;
  selectedOption?: SelectedOption;
  textStyle?: TextStyle;
  placeholder?: string;
  placeholderStyle?: StyleProp<TextStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  controlStyle?: StyleProp<ViewStyle>;
  icon?: IconProp;
  onSelect: (option: SelectedOption, event?: GestureResponderEvent) => void;
  size?: string;
  status?: string;
  appearance?: string;
  renderItem?: (item: ListRenderItemInfo<DropdownItemType>) => React.ReactElement<any>;
}

export type DropdownProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;

interface State {
  visible: boolean;
  menuWidth: number;
}

class DropdownComponent extends React.Component<DropdownProps, State> {

  static styledComponentName: string = 'Dropdown';
  static defaultProps: Partial<DropdownProps> = {
    placeholder: 'Select Option',
    multiSelect: false,
  };

  public state: State = {
    visible: false,
    menuWidth: 0,
  };

  public componentWillMount(): void {
    const { multiSelect, selectedOption } = this.props;

    this.strategy = multiSelect ?
      new MultiSelectStrategy(selectedOption) : new SingleSelectStrategy(selectedOption);
  }

  private strategy: SelectionStrategy;

  private onItemSelect = (option: DropdownItemType, event: GestureResponderEvent): void => {
    const { onSelect } = this.props;

    this.strategy.select(option);
    onSelect(this.strategy.onSelect(this.setVisibility));
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

  private onControlMeasure = (result: MeasureResult): void => {
    const width: number = result[MEASURED_CONTROL_TAG].size.width;

    this.setState({ menuWidth: width });
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const controlStyles: StyleType = this.getPartStyles(source, 'control');
    const iconStyles: StyleType = this.getPartStyles(source, 'icon');
    const textStyles: StyleType = this.getPartStyles(source, 'text');
    const menuStyles: StyleType = this.getPartStyles(source, 'menu');
    const labelStyle: StyleType = this.getPartStyles(source, 'label');

    return {
      control: {
        backgroundColor: controlStyles.controlBackgroundColor,
        borderColor: controlStyles.controlBorderColor,
        borderWidth: controlStyles.controlBorderWidth,
        minHeight: controlStyles.controlMinHeight,
        minWidth: controlStyles.controlMinWidth,
        paddingHorizontal: controlStyles.controlPaddingHorizontal,
        paddingVertical: controlStyles.controlPaddingVertical,
        borderRadius: controlStyles.controlBorderRadius,
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
    const value: string = this.strategy.getPlaceholder(this.props.placeholder);

    return (
      <Text style={[style, styles.text, this.props.textStyle]}>
        {value}
      </Text>
    );
  };

  private renderMenuElement = (style: StyleType): MenuElement => {
    const { appearance, selectedOption, ...restProps } = this.props;
    const additionalMenuStyle: StyleType = { width: this.state.menuWidth };

    return (
      <DropdownMenu
        {...restProps}
        strategy={this.strategy}
        key={0}
        style={[styles.menu, style, additionalMenuStyle]}
        bounces={false}
        onSelect={this.onItemSelect}
      />
    );
  };

  private renderControlElement = (): ControlElement => {
    const { themedStyle, controlStyle, ...restProps } = this.props;
    const { control, icon, text } = this.getComponentStyle(themedStyle);

    const iconElement: IconElement = this.renderIconElement(icon);
    const textElement: TextElement = this.renderTextElement(text);

    const measuringProps: MeasuringElementProps = { tag: MEASURED_CONTROL_TAG };

    return (
      <MeasureNode onResult={this.onControlMeasure}>
        {[
          <TouchableOpacity
            {...restProps}
            {...measuringProps}
            key={MEASURED_CONTROL_TAG}
            activeOpacity={1.0}
            style={[styles.control, control, controlStyle]}
            onPress={this.onPress}
            onPressIn={this.onPressIn}
            onPressOut={this.onPressOut}>
            {textElement}
            {iconElement}
          </TouchableOpacity>,
        ]}
      </MeasureNode>
    );
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, style } = this.props;
    const { visible, menuWidth } = this.state;
    const { menu, label } = this.getComponentStyle(themedStyle);

    const menuElement: MenuElement = this.renderMenuElement(menu);
    const labelElement: TextElement | null = this.renderLabelElement(label);
    const additionalMenuStyle: StyleType = { maxWidth: menuWidth };

    const controlElement: ControlElement = this.renderControlElement();

    return (
      <View style={style}>
        {labelElement}
        <Popover
          visible={visible}
          content={menuElement}
          style={additionalMenuStyle}
          indicatorStyle={styles.indicator}
          onBackdropPress={this.setVisibility}>
          {controlElement}
        </Popover>
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
});

export const Dropdown = styled<DropdownProps>(DropdownComponent);
