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
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  SelectOption,
  SelectOptionType,
} from './selectOption.component';
import {
  SelectOptionsList,
  SelectOptionsListElement,
} from './selectOptionsList.component';
import {
  Text,
  TextElement,
} from '../text/text.component';
import { IconElement } from '../icon/icon.component';
import { Popover } from '../popover/popover.component';
import {
  ChevronDown,
  ChevronDownElement,
  ChevronDownProps,
} from '../support/components/chevronDown.component';
import {
  allWithPrefix,
  isValidString,
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';
import { SelectService } from './select.service';

type ControlElement = React.ReactElement<TouchableOpacityProps>;
type IconProp = (style: ImageStyle, visible: boolean) => IconElement;
type SelectChildren = [SelectOptionsListElement, TextElement, ControlElement];

export type SelectOption = SelectOptionType[] | SelectOptionType;
export type KeyExtractorType = (item: SelectOptionType) => string;

export interface SelectProps extends StyledComponentProps, TouchableOpacityProps {
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
  onFocus?: () => void;
  onBlur?: () => void;
  status?: string;
  size?: string;
  keyExtractor?: KeyExtractorType;
}

export type SelectElement = React.ReactElement<SelectProps>;

interface State {
  optionsVisible: boolean;
}

/**
 * Styled `Select` component. By default, the MultiSelect compares the items by reference.
 * To specify a field from the data object which will be used for the comparison,
 * implement the `keyExtractor` property.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets options list visible.
 *
 * @method {() => void} hide - Sets options list invisible.
 *
 * @method {() => void} focus - Focuses Select and sets options list visible.
 *
 * @method {() => void} blur - Removes focus from Select and sets options list invisible.
 * This is the opposite of `focus()`.
 *
 * @method {() => boolean} isFocused - Returns true if the Select is currently focused and visible.
 *
 * @method {() => void} clear - Removes all text from the Select.
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
 * @property {(option: SelectOption, event?: GestureResponderEvent) => void} onSelect - Fires on option select.
 * Returns selected option/options.
 *
 * @property {() => void} onFocus - Fires when options list becomes visible.
 *
 * @property {() => void} onBlur - Fires when options list becomes invisible.
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
class SelectComponent extends React.Component<SelectProps, State> implements WebEventResponderCallbacks {

  static styledComponentName: string = 'Select';

  static defaultProps: Partial<SelectProps> = {
    placeholder: 'Select Option',
    multiSelect: false,
  };

  public state: State = {
    optionsVisible: false,
  };

  private popoverRef: React.RefObject<Popover> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);
  private iconAnimation: Animated.Value = new Animated.Value(0);

  private selectService: SelectService = new SelectService({
    multiSelect: this.props.multiSelect,
    keyExtractor: this.props.keyExtractor,
  });

  public show = (): void => {
    this.popoverRef.current.show();
  };

  public hide = (): void => {
    this.popoverRef.current.hide();
  };

  public focus = (): void => {
    this.setState({ optionsVisible: true }, this.onOptionsListVisible);
  };

  public blur = (): void => {
    this.setState({ optionsVisible: false }, this.onOptionsListInvisible);
  };

  public isFocused = (): boolean => {
    return this.state.optionsVisible;
  };

  public clear = (): void => {
    if (this.props.onSelect) {
      this.props.onSelect(null);
    }
  };

  // WebEventResponderCallbacks

  public onMouseEnter = (): void => {
    if (!this.state.optionsVisible) {
      this.props.dispatch([Interaction.HOVER]);
    }
  };

  public onMouseLeave = (): void => {
    if (!this.state.optionsVisible) {
      this.props.dispatch([]);
    }
  };

  public onFocus = (): void => {
    this.props.dispatch([Interaction.FOCUSED]);
  };

  public onBlur = (): void => {
    this.props.dispatch([]);
  };

  private onPress = (event: GestureResponderEvent): void => {
    this.setOptionsListVisible();

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

  private onSelect = (option: SelectOptionType, event: GestureResponderEvent): void => {
    if (this.props.onSelect) {
      const options: SelectOption = this.selectService.select(option, this.props.selectedOption);
      !this.props.multiSelect && this.setOptionsListInvisible();

      this.props.onSelect(options, event);
    }
  };

  private onOptionsListVisible = (): void => {
    this.props.dispatch([Interaction.ACTIVE]);
    this.createIconAnimation(-180).start();

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  private onOptionsListInvisible = (): void => {
    this.props.dispatch([]);
    this.createIconAnimation(0).start();

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  private setOptionsListVisible = (): void => {
    this.setState({ optionsVisible: true }, this.onOptionsListVisible);
  };

  private setOptionsListInvisible = (): void => {
    this.setState({ optionsVisible: false }, this.onOptionsListInvisible);
  };

  private isOptionSelected = (option: SelectOptionType): boolean => {
    return this.selectService.isSelected(option, this.props.selectedOption);
  };

  private isOptionGroup = (option: SelectOptionType): boolean => {
    return SelectService.isGroup(option);
  };

  private createIconAnimation = (toValue: number): Animated.CompositeAnimation => {
    return Animated.timing(this.iconAnimation, {
      toValue: toValue,
      duration: 200,
      useNativeDriver: true,
    });
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      backgroundColor,
      borderColor,
      borderWidth,
      minHeight,
      paddingHorizontal,
      paddingVertical,
      borderRadius,
    } = source;

    const iconStyles: StyleType = allWithPrefix(source, 'icon');
    const textStyles: StyleType = allWithPrefix(source, 'text');
    const placeholderStyles: StyleType = allWithPrefix(source, 'placeholder');
    const popoverStyles: StyleType = allWithPrefix(source, 'popover');
    const labelStyle: StyleType = allWithPrefix(source, 'label');

    return {
      control: {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
        minHeight: minHeight,
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
      popover: {
        maxHeight: popoverStyles.popoverMaxHeight,
        borderRadius: popoverStyles.popoverBorderRadius,
        borderColor: popoverStyles.popoverBorderColor,
        borderWidth: popoverStyles.popoverBorderWidth,
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
    return (
      <Text style={[style, this.props.labelStyle]}>
        {this.props.label}
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
        <ChevronDown
          fill={tintColor}
          {...svgStyle as ChevronDownProps}
        />
      </Animated.View>
    );
  };

  private renderIconElement = (style: ImageStyle): IconElement => {
    const iconElement: React.ReactElement = this.props.icon(style, this.state.optionsVisible);

    return React.cloneElement(iconElement, {
      style: [style, iconElement.props.style],
    });
  };

  private renderTextElement = (style: StyleType): TextElement => {
    const value: string = this.selectService.toStringOptions(this.props.selectedOption);
    const textStyle: TextStyle = value && style.text;

    return (
      <Text
        style={[styles.text, style.placeholder, textStyle, this.props.textStyle]}
        numberOfLines={1}
        ellipsizeMode='tail'>
        {value || this.props.placeholder}
      </Text>
    );
  };

  private renderOptionsListElement = (style: StyleType): SelectOptionsListElement => {
    return (
      <SelectOptionsList
        key={0}
        style={[styles.optionsList, style]}
        data={this.props.data}
        multiSelect={this.props.multiSelect}
        isOptionSelected={this.isOptionSelected}
        isOptionGroup={this.isOptionGroup}
        onSelect={this.onSelect}
        keyExtractor={this.props.keyExtractor}
      />
    );
  };

  private renderControlChildren = (style: StyleType): React.ReactNodeArray => {
    const iconElement: IconElement = this.props.icon && this.renderIconElement(style.icon);

    return [
      iconElement || this.renderDefaultIconElement(style.icon),
      this.renderTextElement(style),
    ];
  };

  private renderControlElement = (style: StyleType): ControlElement => {
    const { themedStyle, controlStyle, ...restProps } = this.props;
    const [iconElement, textElement] = this.renderControlChildren(style);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        style={[styles.control, style.control, webStyles.control, controlStyle]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {textElement}
        {iconElement}
      </TouchableOpacity>
    );
  };

  private renderComponentChildren = (style: StyleType): SelectChildren => {
    return [
      this.renderOptionsListElement(style.optionsList),
      isValidString(this.props.label) && this.renderLabelElement(style.label),
      this.renderControlElement(style),
    ];
  };

  public render(): React.ReactElement<ViewProps> {
    const { themedStyle, style } = this.props;
    const { popover, ...componentStyle }: StyleType = this.getComponentStyle(themedStyle);

    const [
      optionsListElement,
      labelElement,
      controlElement,
    ] = this.renderComponentChildren(componentStyle);

    return (
      <View style={style}>
        {labelElement}
        <Popover
          ref={this.popoverRef}
          style={[popover, styles.popover]}
          fullWidth={true}
          visible={this.state.optionsVisible}
          content={optionsListElement}
          onBackdropPress={this.setOptionsListInvisible}>
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
  optionsList: {
    flexGrow: 0,
  },
  popover: {
    overflow: 'hidden',
  },
});

const webStyles = Platform.OS === 'web' && StyleSheet.create({
  control: {
    // @ts-ignore
    outlineWidth: 0,
  },
});

export const Select = styled<SelectProps>(SelectComponent);
