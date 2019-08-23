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
  Animated,
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
  SelectionStrategy,
  MultiSelectStrategy,
  SingleSelectStrategy,
} from './selection.strategy';
import {
  allWithPrefix,
  isValidString,
} from '../support/services';
import { Chevron } from '../support/components';

type IconElement = React.ReactElement<ImageProps>;
type ControlElement = React.ReactElement<TouchableOpacityProps>;
type IconProp = (style: ImageStyle, visible: boolean) => IconElement;
type SelectChildren = [SelectOptionsListElement, TextElement, ControlElement];

export type SelectOption = Array<SelectOptionType> | SelectOptionType;

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
  renderItem?: (item: ListRenderItemInfo<SelectOptionType>) => React.ReactElement<any>;
}

export type SelectProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;
export type SelectElement = React.ReactElement<SelectProps>;

interface State {
  visible: boolean;
  menuWidth: number;
}

/**
 * Styled Select (Select) component.
 *
 * @extends React.Component
 *
 * @property {boolean} disabled - Determines whether component is disabled.
 * Default is `false`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `primary`, `success`, `info`, `warning` or `danger`.
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
 * @property {(item: ListRenderItemInfo<SelectOptionType>) => React.ReactElement<any>} renderItem - Property for
 * rendering custom select items.
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
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} icon - Determines icon of the component.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 *
 * @overview-example Simple usage example
 *
 * ```
 * import React from 'react';
 * import {
 *   Select,
 *   SelectOptionType,
 *   SelectOption,
 * } from '@kitten/ui';
 *
 * interface State {
 *   selectedOption: SelectOption;
 * }
 *
 * export class SelectContainer extends React.Component<any, State> {
 *
 *   private items: SelectOptionType[] = [
 *     { text: 'Option 1' },
 *     { text: 'Option 2' },
 *     { text: 'Option 3' },
 *     { text: 'Option 4' },
 *     { text: 'Option 5' },
 *     { text: 'Option 6' },
 *     { text: 'Option 8' },
 *   ];
 *
 *   public state: State = {
 *     selectedOption: null,
 *   };
 *
 *   private onSelect = (selectedOption: SelectOption): void => {
 *     this.setState({ selectedOption });
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <Select
 *         data={this.items}
 *         selectedOption={this.state.selectedOption}
 *         onSelect={this.onSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example MultiSelect
 *
 * ```
 * import React from 'react';
 * import {
 *   Select,
 *   SelectOptionType,
 *   SelectOption,
 * } from '@kitten/ui';
 *
 * interface State {
 *   selectedOption: SelectOption;
 * }
 *
 * export class SelectContainer extends React.Component<any, State> {
 *
 *   private items: SelectOptionType[] = [
 *     { text: 'Option 1' },
 *     { text: 'Option 2' },
 *     { text: 'Option 3' },
 *     { text: 'Option 4' },
 *     { text: 'Option 5' },
 *     { text: 'Option 6' },
 *     { text: 'Option 8' },
 *   ];
 *
 *   public state: State = {
 *     selectedOption: [],
 *   };
 *
 *   private onSelect = (selectedOption: SelectOption): void => {
 *     this.setState({ selectedOption });
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <Select
 *         data={this.items}
 *         multiSelect
 *         selectedOption={this.state.selectedOption}
 *         onSelect={this.onSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @example Eva Styling
 *
 * ```
 * import React from 'react';
 * import {
 *   Select,
 *   SelectOptionType,
 *   SelectOption,
 * } from '@kitten/ui';
 *
 * interface State {
 *   selectedOption: SelectOption;
 * }
 *
 * export class SelectContainer extends React.Component<any, State> {
 *
 *   private items: SelectOptionType[] = [
 *     { text: 'Option 1' },
 *     { text: 'Option 2' },
 *     { text: 'Option 3' },
 *     { text: 'Option 4' },
 *     { text: 'Option 5' },
 *     { text: 'Option 6' },
 *     { text: 'Option 8' },
 *   ];
 *
 *   public state: State = {
 *     selectedOption: null,
 *   };
 *
 *   private onSelect = (selectedOption: SelectOption): void => {
 *     this.setState({ selectedOption });
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <Select
 *         data={this.items}
 *         style={{ margin: 16 }}
 *         status='warning'
 *         selectedOption={this.state.selectedOption}
 *         onSelect={this.onSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @example With Icon
 *
 * ```
 * import React from 'react';
 * import {
 *   ImageProps,
 *   Image,
 * } from 'react-native';
 * import {
 *   Select,
 *   SelectOptionType,
 *   SelectOption,
 * } from '@kitten/ui';
 * import { StyleType } from '@kitten/theme';
 *
 * interface State {
 *   selectedOption: SelectOption;
 * }
 *
 * export class SelectContainer extends React.Component<any, State> {
 *
 *  private items: SelectOptionType[] = [
 *    { text: 'Option 1' },
 *    { text: 'Option 2' },
 *    { text: 'Option 3' },
 *    { text: 'Option 4' },
 *    { text: 'Option 5' },
 *    { text: 'Option 6' },
 *    { text: 'Option 8' },
 *  ];
 *
 *  public state: State = {
 *    selectedOption: null,
 *  };
 *
 *  private onSelect = (selectedOption: SelectOption): void => {
 *    this.setState({ selectedOption });
 *  };
 *
 *  private renderIcon = (style: StyleType, visible: boolean): React.ReactElement<ImageProps> => {
 *    const uri: string = visible ?
 *      'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-upward.png' :
 *      'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-downward.png';
 *    return (
 *      <Image
 *        source={{ uri }}
 *        style={style}
 *      />
 *    );
 *  };
 *
 *  public render(): React.ReactNode {
 *    return (
 *      <Select
 *        data={this.items}
 *        selectedOption={this.state.selectedOption}
 *        icon={this.renderIcon}
 *        onSelect={this.onSelect}
 *      />
 *    );
 *   }
 * }
 * ```
 *
 * @example Custom Styling
 *
 * import React from 'react';
 * import { StyleSheet } from 'react-native';
 * import {
 *   Select,
 *   SelectOptionType,
 *   SelectOption,
 * } from '@kitten/ui';
 *
 * interface State {
 *   selectedOption: SelectOption;
 * }
 *
 * export class SelectContainer extends React.Component<any, State> {
 *
 *  private items: SelectOptionType[] = [
 *    { text: 'Option 1' },
 *    { text: 'Option 2', textStyle: styles.customOptionStyle },
 *    { text: 'Option 3' },
 *    { text: 'Option 4' },
 *    { text: 'Option 5' },
 *    { text: 'Option 6' },
 *    { text: 'Option 8' },
 *  ];
 *
 *  public state: State = {
 *    selectedOption: null,
 *  };
 *
 *  private onSelect = (selectedOption: SelectOption): void => {
 *    this.setState({ selectedOption });
 *  };
 *
 *  public render(): React.ReactNode {
 *    return (
 *       <Select
 *         label='Label'
 *         labelStyle={styles.labelStyle}
 *         placeholder='Select Something'
 *         placeholderStyle={styles.placeholderStyle}
 *         controlStyle={styles.controlStyle}
 *         style={styles.select}
 *         data={this.items}
 *         selectedOption={this.state.selectedOption}
 *         onSelect={this.onSelect}
 *       />
 *     );
 *   }
 * }
 *
 * const styles = StyleSheet.create({
 *   select: {
 *     margin: 16,
 *   },
 *   customOptionStyle: {
 *     color: 'red',
 *   },
 *   labelStyle: {
 *     fontSize: 22,
 *   },
 *   placeholderStyle: {
 *     color: 'yellow',
 *   },
 *   controlStyle: {
 *     backgroundColor: 'black',
 *   },
 * });
 *
 * @example Disabled Option
 *
 * ```
 * private items: SelectOptionType[] = [
 *   { text: 'Option 1' },
 *   { text: 'Option 2', disabled: true },
 *   { text: 'Option 3' },
 *   { text: 'Option 4' },
 * ];
 * ```
 *
 * @example Select Groups
 *
 * ```
 *   private items: SelectOptionType[] = [
 *   { text: 'Option 1' },
 *   { text: 'Option 2', disabled: true },
 *   { text: 'Option 3', items: [ { text: 'Option 31' }, { text: 'Option 32' }, { text: 'Option 33' } ] },
 *   { text: 'Option 4' },
 * ];
 * ```
 *
 */

class SelectComponent extends React.Component<SelectProps, State> {

  static styledComponentName: string = 'Select';
  static defaultProps: Partial<SelectProps> = {
    placeholder: 'Select Option',
    multiSelect: false,
  };

  public state: State = {
    visible: false,
    menuWidth: 0,
  };

  private strategy: SelectionStrategy;
  private iconAnimation: Animated.Value;

  constructor(props: SelectProps) {
    super(props);
    const { multiSelect, selectedOption } = props;
    this.strategy = multiSelect ?
      new MultiSelectStrategy(selectedOption) : new SingleSelectStrategy(selectedOption);
    this.iconAnimation = new Animated.Value(-180);
  }

  private onItemSelect = (option: SelectOptionType, event: GestureResponderEvent): void => {
    const { onSelect } = this.props;

    onSelect(this.strategy.select(option, this.setVisibility));
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
      this.animateIcon(0);
    } else {
      this.animateIcon(-180);
    }
  };

  private animateIcon = (toValue: number): void => {
    Animated.timing(this.iconAnimation, {
      toValue: toValue,
      duration: 200,
    }).start();
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

  private onControlMeasure = (result: MeasureResult): void => {
    const width: number = result[MEASURED_CONTROL_TAG].size.width;

    this.setState({ menuWidth: width });
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
    const menuStyles: StyleType = allWithPrefix(source, 'menu');
    const labelStyle: StyleType = allWithPrefix(source, 'label');
    const outlineStyles: StyleType = allWithPrefix(source, 'outline');

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
        color: textStyles.textColor,
        fontSize: textStyles.textFontSize,
        fontWeight: textStyles.textFontWeight,
        lineHeight: textStyles.textLineHeight,
        marginHorizontal: textStyles.textMarginHorizontal,
      },
      placeholder: {
        color: placeholderStyles.placeholderColor,
        fontSize: placeholderStyles.placeholderFontSize,
        fontWeight: placeholderStyles.placeholderFontWeight,
        lineHeight: placeholderStyles.placeholderLineHeight,
        marginHorizontal: placeholderStyles.placeholderMarginHorizontal,
      },
      outline: {
        backgroundColor: outlineStyles.outlineBackgroundColor,
        padding: outlineStyles.outlinePadding,
        borderRadius: outlineStyles.outlineBorderRadius,
      },
      menu: {
        maxHeight: menuStyles.menuMaxHeight,
        borderRadius: menuStyles.menuBorderRadius,
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

  private renderDefaultIconElement = (style: ImageStyle): IconElement => {
    const rotateInterpolate = this.iconAnimation.interpolate({
      inputRange: [-180, 0],
      outputRange: ['-180deg', '0deg'],
    });
    const animatedStyle: StyleType = { transform: [{ rotate: rotateInterpolate }] };

    return (
      <Chevron
        style={style}
        isAnimated={true}
        animationStyle={animatedStyle}
      />
    );
  };

  private renderIconElement = (style: ImageStyle): IconElement => {
    const { icon } = this.props;
    const { visible } = this.state;

    if (icon) {
      return icon(style, visible);
    } else {
      return this.renderDefaultIconElement(style);
    }
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

  private renderMenuElement = (style: StyleType): SelectOptionsListElement => {
    const { appearance, selectedOption, ...restProps } = this.props;
    const additionalMenuStyle: StyleType = { width: this.state.menuWidth };

    return (
      <SelectOptionsList
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
      this.renderTextElement(style.text, style.placeholder),
    ];
  };

  private renderControlElement = (): ControlElement => {
    const { themedStyle, controlStyle, ...restProps } = this.props;
    const { control, outline, ...childrenStyles } = this.getComponentStyle(themedStyle);
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

  private renderComponentChildren = (style: StyleType): SelectChildren => {
    const { label } = this.props;

    return [
      this.renderMenuElement(style.menu),
      isValidString(label) && this.renderLabelElement(style.label),
      this.renderControlElement(),
    ];
  };

  public render(): SelectElement {
    const { themedStyle, style } = this.props;
    const { visible, menuWidth } = this.state;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);
    const [menuElement, labelElement, controlElement] = this.renderComponentChildren(componentStyle);
    const additionalMenuStyle: StyleType = { maxWidth: menuWidth };

    return (
      <View style={style}>
        {labelElement}
        <View style={[styles.outline, componentStyle.outline]}>
          <Popover
            visible={visible}
            content={menuElement}
            style={additionalMenuStyle}
            indicatorStyle={styles.indicator}
            onBackdropPress={this.setVisibility}>
            {controlElement}
          </Popover>
        </View>
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
  menu: {
    flexGrow: 0,
  },
  outlineContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    justifyContent: 'center',
  },
});

export const Select = styled<SelectProps>(SelectComponent);
