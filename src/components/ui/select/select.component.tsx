/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  ImageProps,
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
} from '../../theme';
import {
  FalsyFC,
  FalsyText,
  PropsService,
  RenderProp,
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../../devsupport';
import {
  SelectOption,
  SelectOptionType,
} from './selectOption.component';
import { SelectOptionsList } from './selectOptionsList.component';
import { Popover } from '../popover/popover.component';
import {
  ChevronDown,
  ChevronDownElement,
  ChevronDownProps,
} from '../shared/chevronDown.component';
import { SelectService } from './select.service';

type ControlElement = React.ReactElement<TouchableOpacityProps>;

export type SelectOption = SelectOptionType[] | SelectOptionType;
export type KeyExtractorType = (item: SelectOptionType) => string;

export interface SelectProps extends StyledComponentProps, TouchableOpacityProps {
  data: SelectOptionType[];
  multiSelect?: boolean;
  selectedOption?: SelectOption;
  placeholder?: RenderProp<TextStyle> | string;
  label?: RenderProp<TextStyle> | string;
  controlStyle?: StyleProp<ViewStyle>;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
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
 *
 * @method {() => boolean} isFocused - Returns true if the Select is currently focused and visible.
 *
 * @method {() => void} clear - Removes all text from the Select.
 *
 * @property {SelectOptionType[]} data - Determines items of the Select component.
 *
 * @property {(option: SelectOptionType | SelectOptionType[]) => void} onSelect - Called when option is pressed.
 *
 * @property {boolean} multiSelect - Determines `multi-select` behavior of the Select component.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `basic`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `small`, `medium` or `large`.
 * Default is `medium`.
 *
 * @property {SelectOption} selectedOption - Determines selected option of the Select.
 * Can be `SelectOptionType` or `SelectOptionType[]` It depends on `multiSelect` property.
 *
 * @property {string | (props: TextProps) => ReactElement} label - A string or a function component
 * to render to top of the input field.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryLeft - A function component
 * to render to start of the text.
 * Called with props provided by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryRight - A function component
 * to render to end of the text.
 * Called with props provided by Eva.
 *
 * @property {StyleProp<ViewStyle>} controlStyle - Determines the style of `control`.
 *
 * @property {KeyExtractorType} keyExtractor - Used to extract a unique key for a given item;
 *
 * @property {() => void} onFocus - Called when options list becomes visible.
 *
 * @property {() => void} onBlur - Called when options list becomes invisible.
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
      this.props.eva.dispatch([Interaction.HOVER]);
    }
  };

  public onMouseLeave = (): void => {
    if (!this.state.optionsVisible) {
      this.props.eva.dispatch([]);
    }
  };

  public onFocus = (): void => {
    this.props.eva.dispatch([Interaction.FOCUSED]);
  };

  public onBlur = (): void => {
    this.props.eva.dispatch([]);
  };

  private onPress = (event: GestureResponderEvent): void => {
    this.setOptionsListVisible();

    if (this.props.onPress) {
      this.props.onPress(event);
    }
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);

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
    this.props.eva.dispatch([Interaction.ACTIVE]);
    this.createIconAnimation(-180).start();

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  private onOptionsListInvisible = (): void => {
    this.props.eva.dispatch([]);
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
    });
  };

  private getComponentStyle = (source: StyleType) => {
    const {
      backgroundColor,
      borderColor,
      borderWidth,
      minHeight,
      paddingHorizontal,
      paddingVertical,
      borderRadius,
    } = source;

    const iconStyles: StyleType = PropsService.allWithPrefix(source, 'icon');
    const textStyles: StyleType = PropsService.allWithPrefix(source, 'text');
    const placeholderStyles: StyleType = PropsService.allWithPrefix(source, 'placeholder');
    const popoverStyles: StyleType = PropsService.allWithPrefix(source, 'popover');
    const labelStyle: StyleType = PropsService.allWithPrefix(source, 'label');

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

  private renderControlElement = (evaStyle): ControlElement => {
    const { eva, controlStyle, accessoryLeft, accessoryRight, selectedOption, ...restProps } = this.props;
    const value: string = this.selectService.toStringOptions(selectedOption);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        style={[styles.control, evaStyle.control, webStyles.control, controlStyle]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <FalsyFC
          style={evaStyle.icon}
          component={accessoryLeft}
        />
        <FalsyText
          style={[styles.text, evaStyle.placeholder, value && evaStyle.text]}
          numberOfLines={1}
          ellipsizeMode='tail'
          component={value || this.props.placeholder}
        />
        <FalsyFC
          style={evaStyle.icon}
          component={accessoryRight}
          fallback={this.renderDefaultIconElement(evaStyle.icon)}
        />
      </TouchableOpacity>
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, label } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <View style={style}>
        <FalsyText
          style={evaStyle.label}
          component={label}
        />
        <Popover
          ref={this.popoverRef}
          style={[evaStyle.popover, styles.popover]}
          fullWidth={true}
          visible={this.state.optionsVisible}
          anchor={() => this.renderControlElement(evaStyle)}
          onBackdropPress={this.setOptionsListInvisible}>
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
