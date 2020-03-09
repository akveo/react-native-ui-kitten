/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
} from 'react-native';
import { Overwrite } from 'utility-types';
import {
  FalsyFC,
  FalsyText,
  PropsService,
  RenderProp,
  TouchableWeb,
  TouchableWebElement,
  TouchableWebProps,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import {
  CheckBox,
  CheckBoxElement,
} from '../checkbox/checkbox.component';
import { TextProps } from '../text/text.component';
import { SelectItemDescriptor } from './select.service';

type SelectItemStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | 'grouped' | string;
}>;

type TouchableSelectProps = Overwrite<TouchableWebProps, {
  onPress?: (descriptor: SelectItemDescriptor, event?: GestureResponderEvent) => void;
}>;

export interface SelectItemProps extends TouchableSelectProps, SelectItemStyledProps {
  title?: RenderProp<TextProps> | React.ReactText;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  selected?: boolean;
  descriptor?: SelectItemDescriptor;
}

export type SelectItemElement = React.ReactElement<SelectItemProps>;

/**
 * A single item in Select.
 * Items should be rendered within Select or SelectGroup children to provide a usable component.
 *
 * @extends React.Component
 *
 * @property {ReactText | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the item.
 * If it is a function, expected to return a Text.
 *
 * @property {(ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the *title*.
 * Expected to return an Image.
 *
 * @property {(ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the *title*.
 * Expected to return an Image.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example SelectItemSimpleUsage
 */
class SelectItemComponent extends React.Component<SelectItemProps> {

  static styledComponentName: string = 'SelectOption';

  private get isMultiSelect(): boolean {
    if (this.props.descriptor) {
      return this.props.descriptor.multiSelect;
    }
    return false;
  }

  private onMouseEnter = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.HOVER]);
    this.props.onMouseEnter && this.props.onMouseEnter(e);
  };

  private onMouseLeave = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);
    this.props.onMouseLeave && this.props.onMouseLeave(e);
  };

  private onFocus = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.FOCUSED]);
    this.props.onFocus && this.props.onFocus(e);
  };

  private onBlur = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);
    this.props.onBlur && this.props.onBlur(e);
  };

  private onPress = (e: GestureResponderEvent): void => {
    this.props.onPress && this.props.onPress(this.props.descriptor, e);
  };

  private onPressIn = (e: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);
    this.props.onPressIn && this.props.onPressIn(e);
  };

  private onPressOut = (e: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);
    this.props.onPressOut && this.props.onPressOut(e);
  };

  private onAccessoryCheckedChange = (): void => {
    this.props.onPress && this.props.onPress(this.props.descriptor);
  };

  private getComponentStyle = (style: StyleType) => {
    const { paddingHorizontal, paddingLeft, paddingVertical, backgroundColor } = style;

    const textStyles = PropsService.allWithPrefix(style, 'text');
    const iconStyles = PropsService.allWithPrefix(style, 'icon');

    return {
      container: {
        paddingHorizontal: paddingHorizontal,
        paddingLeft: paddingLeft,
        paddingVertical: paddingVertical,
        backgroundColor: backgroundColor,
      },
      text: {
        marginHorizontal: textStyles.textMarginHorizontal,
        fontFamily: textStyles.textFontFamily,
        fontSize: textStyles.textFontSize,
        fontWeight: textStyles.textFontWeight,
        lineHeight: textStyles.textLineHeight,
        color: textStyles.textColor,
      },
      icon: {
        width: iconStyles.iconWidth,
        height: iconStyles.iconHeight,
        marginHorizontal: iconStyles.iconMarginHorizontal,
        tintColor: iconStyles.iconTintColor,
      },
    };
  };

  private renderAccessory = (evaStyle): CheckBoxElement => {
    if (!this.isMultiSelect) {
      return null;
    }

    return (
      <CheckBox
        style={evaStyle}
        checked={this.props.selected}
        onChange={this.onAccessoryCheckedChange}
      />
    );
  };

  public render(): TouchableWebElement {
    const { eva, style, title, accessoryLeft, accessoryRight, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <TouchableWeb
        {...touchableProps}
        style={[styles.container, evaStyle.container, style]}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <FalsyFC
          style={evaStyle.icon}
          component={accessoryLeft}
          fallback={this.renderAccessory(evaStyle.icon)}
        />
        <FalsyText
          style={[styles.text, evaStyle.text]}
          component={title}
        />
        <FalsyFC
          style={evaStyle.icon}
          component={accessoryRight}
        />
      </TouchableWeb>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    textAlign: 'left',
  },
});

export const SelectItem = styled<SelectItemProps>(SelectItemComponent);
