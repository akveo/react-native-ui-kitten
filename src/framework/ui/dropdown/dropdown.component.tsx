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
  ViewStyle,
  ListRenderItemInfo,
} from 'react-native';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text,
  TextElement,
} from '../text/text.component';
import { Popover } from '../popover/popover.component';
import {
  DropdownMenu,
  DropdownMenuElement,
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
import { isValidString } from '../support/services';

type IconElement = React.ReactElement<ImageProps>;
type ControlElement = React.ReactElement<TouchableOpacityProps>;
type IconProp = (style: ImageStyle, visible: boolean) => IconElement;
type DropdownChildren = [DropdownMenuElement, TextElement, ControlElement];

export type DropdownOption = Array<DropdownItemType> | DropdownItemType;

const MEASURED_CONTROL_TAG: string = 'Control';

interface ComponentProps {
  data: DropdownItemType[];
  multiSelect?: boolean;
  selectedOption?: DropdownOption;
  textStyle?: TextStyle;
  placeholder?: string;
  placeholderStyle?: StyleProp<TextStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  controlStyle?: StyleProp<ViewStyle>;
  icon?: IconProp;
  onSelect: (option: DropdownOption, event?: GestureResponderEvent) => void;
  size?: string;
  status?: string;
  appearance?: string;
  renderItem?: (item: ListRenderItemInfo<DropdownItemType>) => React.ReactElement<any>;
}

export type DropdownProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;
export type DropdownElement = React.ReactElement<DropdownProps>;

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

  private strategy: SelectionStrategy;

  constructor(props: DropdownProps) {
    super(props);
    const { multiSelect, selectedOption } = props;
    this.strategy = multiSelect ?
      new MultiSelectStrategy(selectedOption) : new SingleSelectStrategy(selectedOption);
  }

  private onItemSelect = (option: DropdownItemType, event: GestureResponderEvent): void => {
    const { onSelect } = this.props;

    onSelect(this.strategy.select(option, this.setVisibility));
  };

  private setVisibility = (): void => {
    const visible: boolean = !this.state.visible;

    this.setState({ visible });
  };

  private onPress = (event: GestureResponderEvent) => {
    this.props.dispatch([]);
    if (this.props.onPress) {
      this.props.onPress(event);
    }
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

  private renderLabelElement = (style: TextStyle): TextElement => {
    const { label, labelStyle } = this.props;

    return (
      <Text style={[style, styles.label, labelStyle]}>
        {label}
      </Text>
    );
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

  private renderMenuElement = (style: StyleType): DropdownMenuElement => {
    const { appearance, selectedOption, testID, ...restProps } = this.props;
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

  private renderControlChildren = (style: StyleType): [IconElement, TextElement] => {
    return [
      this.renderIconElement(style.icon),
      this.renderTextElement(style.text),
    ];
  };

  private renderControlElement = (): ControlElement => {
    const { themedStyle, controlStyle, ...restProps } = this.props;
    const { control, ...childrenStyles } = this.getComponentStyle(themedStyle);
    const [iconElement, textElement] = this.renderControlChildren(childrenStyles);

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

  private renderComponentChildren = (style: StyleType): DropdownChildren => {
    const { label } = this.props;

    return [
      this.renderMenuElement(style.menu),
      isValidString(label) && this.renderLabelElement(style.label),
      this.renderControlElement(),
    ];
  };

  public render(): DropdownElement {
    const { themedStyle, style } = this.props;
    const { visible, menuWidth } = this.state;
    const evaStyles: StyleType = this.getComponentStyle(themedStyle);
    const [menuElement, labelElement, controlElement] = this.renderComponentChildren(evaStyles);
    const additionalMenuStyle: StyleType = { maxWidth: menuWidth };

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