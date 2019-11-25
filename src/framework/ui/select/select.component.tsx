/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
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
  TextElement,
} from '../text/text.component';
import { IconElement } from '../icon/icon.component';
import { Popover } from '../popover/popover.component';
import {
  SelectOptionsList,
  SelectOptionsListElement,
} from './selectOptionsList.component';
import { SelectOptionType } from './selectOption.component';
import {
  MeasureNode,
  MeasureResult,
  MeasuringElementProps,
} from '../popover/measure.component';
import {
  MultiSelectStrategy,
  SelectionStrategy,
  SingleSelectStrategy,
} from './selection.strategy';
import {
  allWithPrefix,
  isValidString,
} from '../support/services';
import {
  ChevronDown,
  ChevronDownElement,
  ChevronDownProps,
} from '../support/components/chevronDown.component';

type ControlElement = React.ReactElement<TouchableOpacityProps>;
type IconProp = (style: ImageStyle, visible: boolean) => IconElement;
type SelectChildren = [SelectOptionsListElement, TextElement, ControlElement];

export type SelectOption = Array<SelectOptionType> | SelectOptionType;
export type KeyExtractorType = (item: SelectOptionType) => string;

const MEASURED_CONTROL_TAG: string = 'Control';

interface ComponentProps {
  data: SelectOptionType[];
  multiSelect?: boolean;
  selectedOption?: SelectOption;
  textStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  placeholderStyle?: StyleProp<TextStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  controlStyle?: StyleProp<ViewStyle>;
  icon?: IconProp;
  onSelect: (option: SelectOption, event?: GestureResponderEvent) => void;
  status?: string;
  size?: string;
  keyExtractor?: KeyExtractorType;
}

export type SelectProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;
export type SelectElement = React.ReactElement<SelectProps>;

interface State {
  visible: boolean;
  optionsListWidth: number;
}

/**
 * Styled `Select` component. By default, the MultiSelect compares the items by reference.
 * To specify a field from the data object which will be used for the comparison,
 * implement the `keyExtractor` property.
 *
 * @extends React.Component
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `basic`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `small`, `medium` or `large`.
 * Default is `medium`.
 *
 * @property {boolean} disabled - Determines whether component is disabled.
 * Default is `false.
 *
 * @property {boolean} multiSelect - Determines `multi-select` behavior of the Select component.
 *
 * @property {SelectOption} selectedOption - Determines selected option of the Select.
 * Can be `SelectOptionType` or `SelectOptionType[]` It depends on `multiSelect` property.
 *
 * @property {SelectOptionType[]} data - Determines items of the Select component.
 *
 * @property {(option: SelectOption, event?: GestureResponderEvent) => void} onSelect - Fires on option selection.
 * Returns selected option/options.
 *
 * @property {StyleProp<TextStyle>} label - Determines the `label` of the component.
 *
 * @property {StyleProp<TextStyle>} placeholder - Determines the `placeholder` of the component.
 * By default is `Select Option`.
 *
 * @property {StyleProp<TextStyle>} labelStyle - Determines the style of the `label`.
 *
 * @property {StyleProp<TextStyle>} placeholderStyle - Determines the style of the `placeholder`.
 *
 * @property {StyleProp<TextStyle>} textStyle - Determines the style of the selected option/options text.
 *
 * @property {StyleProp<ViewStyle>} controlStyle - Determines the style of `control`.
 *
 * @property {(style: StyleType) => ReactElement} icon - Determines icon of the component.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {KeyExtractorType} keyExtractor - Used to extract a unique key for a given item;
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example SelectSimpleUsage
 *
 * @overview-example SelectStates
 *
 * @overview-example SelectStatus
 *
 * @overview-example SelectSize
 *
 * @overview-example SelectMultiSelect
 *
 * @overview-example SelectWithGroups
 *
 * @overview-example SelectDisabledOptions
 *
 * @example SelectInitialValue
 *
 * @example SelectMultiInitialValue
 *
 * @example SelectCustomIcon
 *
 * @example SelectInlineStyling
 */
class SelectComponent extends React.Component<SelectProps, State> {

  static styledComponentName: string = 'Select';
  static defaultProps: Partial<SelectProps> = {
    placeholder: 'Select Option',
    multiSelect: false,
  };

  public state: State = {
    visible: false,
    optionsListWidth: 0,
  };

  private strategy: SelectionStrategy<SelectOption>;
  private iconAnimation: Animated.Value;

  constructor(props: SelectProps) {
    super(props);
    this.strategy = this.createSelectionStrategy();
    this.iconAnimation = new Animated.Value(0);
  }

  public componentDidUpdate(): void {
    this.strategy = this.createSelectionStrategy();
  }

  private onPress = (event: GestureResponderEvent): void => {
    this.setVisibility();

    if (this.props.onPress) {
      this.props.onPress(event);
    }
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private onItemSelect = (option: SelectOptionType, event: GestureResponderEvent): void => {
    const selectedOption: SelectOption = this.strategy.select(option, this.setVisibility);
    this.props.onSelect(selectedOption);
  };

  private onControlMeasure = (result: MeasureResult): void => {
    const width: number = result[MEASURED_CONTROL_TAG].size.width;

    this.setState({ optionsListWidth: width });
  };

  private createSelectionStrategy = (): SelectionStrategy<SelectOption> => {
    const { multiSelect, selectedOption, keyExtractor, data } = this.props;

    return multiSelect ?
      new MultiSelectStrategy(selectedOption, data, keyExtractor) :
      new SingleSelectStrategy(selectedOption, data, keyExtractor);
  };

  private setVisibility = (): void => {
    const visible: boolean = !this.state.visible;

    this.setState({ visible }, this.handleVisibleChange);
  };

  private handleVisibleChange = (): void => {
    this.dispatchActive();
    this.startIconAnimation();
  };

  private dispatchActive = (): void => {
    const { visible } = this.state;
    if (visible) {
      this.props.dispatch([Interaction.ACTIVE]);
    } else {
      this.props.dispatch([]);
    }
  };

  private startIconAnimation = (): void => {
    const { visible } = this.state;
    if (visible) {
      this.animateIcon(-180);
    } else {
      this.animateIcon(0);
    }
  };

  private animateIcon = (toValue: number): void => {
    Animated.timing(this.iconAnimation, {
      toValue: toValue,
      duration: 200,
    }).start();
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      backgroundColor,
      borderColor,
      borderWidth,
      minHeight,
      minWidth,
      paddingHorizontal,
      paddingVertical,
      borderRadius,
    } = source;

    const iconStyles: StyleType = allWithPrefix(source, 'icon');
    const textStyles: StyleType = allWithPrefix(source, 'text');
    const placeholderStyles: StyleType = allWithPrefix(source, 'placeholder');
    const optionsListStyles: StyleType = allWithPrefix(source, 'optionsList');
    const labelStyle: StyleType = allWithPrefix(source, 'label');

    return {
      control: {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
        minHeight: minHeight,
        minWidth: minWidth,
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        borderRadius: borderRadius,
      },
      icon: {
        height: iconStyles.iconHeight,
        width: iconStyles.iconWidth,
        marginHorizontal: iconStyles.iconMarginHorizontal,
        tintColor: iconStyles.iconTintColor,
      },
      text: {
        marginHorizontal: textStyles.textMarginHorizontal,
        color: textStyles.textColor,
        fontSize: textStyles.textFontSize,
        fontWeight: textStyles.textFontWeight,
        lineHeight: textStyles.textLineHeight,
        fontFamily: textStyles.textFontFamily,
      },
      placeholder: {
        marginHorizontal: placeholderStyles.placeholderMarginHorizontal,
        color: placeholderStyles.placeholderColor,
        fontSize: placeholderStyles.placeholderFontSize,
        fontWeight: placeholderStyles.placeholderFontWeight,
        lineHeight: placeholderStyles.placeholderLineHeight,
        fontFamily: placeholderStyles.placeholderFontFamily,
      },
      optionsList: {
        maxHeight: optionsListStyles.optionsListMaxHeight,
        borderRadius: optionsListStyles.optionsListBorderRadius,
        borderColor: optionsListStyles.optionsListBorderColor,
        borderWidth: optionsListStyles.optionsListBorderWidth,
      },
      label: {
        marginBottom: labelStyle.labelMarginBottom,
        color: labelStyle.labelColor,
        fontSize: labelStyle.labelFontSize,
        fontWeight: labelStyle.labelFontWeight,
        lineHeight: labelStyle.labelLineHeight,
        fontFamily: labelStyle.labelFontFamily,
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

  private renderDefaultIconElement = (style: ImageStyle): ChevronDownElement => {
    const rotateInterpolate = this.iconAnimation.interpolate({
      inputRange: [-180, 0],
      outputRange: ['-180deg', '0deg'],
    });

    const animatedStyle: StyleType = { transform: [{ rotate: rotateInterpolate }] };
    const { tintColor, ...svgStyle } = style;

    return (
      <Animated.View style={animatedStyle}>
        <ChevronDown fill={tintColor} {...svgStyle as ChevronDownProps}/>
      </Animated.View>
    );
  };

  private renderIconElement = (style: ImageStyle): IconElement => {
    const iconElement = this.props.icon(style, this.state.visible);

    return React.cloneElement(iconElement, {
      style: [style, styles.icon, iconElement.props.style],
    });
  };

  private renderTextElement = (valueStyle: TextStyle, placeholderStyle: TextStyle): TextElement => {
    const { placeholder, textStyle } = this.props;
    const value: string = this.strategy.getPlaceholder(placeholder);
    const style: TextStyle = placeholder === value ? placeholderStyle : valueStyle;

    return (
      <Text
        style={[style, styles.text, textStyle]}
        numberOfLines={1}
        ellipsizeMode='tail'>
        {value}
      </Text>
    );
  };

  private renderOptionsListElement = (style: StyleType): SelectOptionsListElement => {
    const { appearance, selectedOption, ...restProps } = this.props;
    const additionalOptionsListStyle: StyleType = { width: this.state.optionsListWidth };

    return (
      <SelectOptionsList
        {...restProps}
        strategy={this.strategy}
        key={0}
        style={[styles.optionsList, style, additionalOptionsListStyle]}
        bounces={false}
        onSelect={this.onItemSelect}
      />
    );
  };

  private renderControlChildren = (style: StyleType): React.ReactNodeArray => {
    const iconElement: IconElement = this.props.icon && this.renderIconElement(style.icon);

    return [
      iconElement || this.renderDefaultIconElement(style.icon),
      this.renderTextElement(style.text, style.placeholder),
    ];
  };

  private renderControlElement = (): ControlElement => {
    const { themedStyle, controlStyle, ...restProps } = this.props;
    const { control, ...childrenStyles } = this.getComponentStyle(themedStyle);
    const [iconElement, textElement] = this.renderControlChildren(childrenStyles);

    const measuringProps: MeasuringElementProps = { tag: MEASURED_CONTROL_TAG };

    return (
      <MeasureNode onResult={this.onControlMeasure}>
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
        </TouchableOpacity>
      </MeasureNode>
    );
  };

  private renderComponentChildren = (style: StyleType): SelectChildren => {
    return [
      this.renderOptionsListElement(style.optionsList),
      isValidString(this.props.label) && this.renderLabelElement(style.label),
      this.renderControlElement(),
    ];
  };

  public render(): SelectElement {
    const { themedStyle, style } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);
    const additionalOptionsListStyle: StyleType = { maxWidth: this.state.optionsListWidth };

    const [optionsListElement, labelElement, controlElement] = this.renderComponentChildren(componentStyle);

    return (
      <View style={style}>
        {labelElement}
        <Popover
          visible={this.state.visible}
          content={optionsListElement}
          style={additionalOptionsListStyle}
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
  text: {
    flex: 1,
  },
  icon: {},
  label: {},
  indicator: {
    width: 0,
    height: 6,
  },
  optionsList: {
    flexGrow: 0,
  },
});

export const Select = styled<SelectProps>(SelectComponent);
