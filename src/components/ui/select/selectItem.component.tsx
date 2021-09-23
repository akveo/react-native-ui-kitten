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
import {
  FalsyFC,
  FalsyText,
  PropsService,
  RenderProp,
  TouchableWeb,
  TouchableWebElement,
  TouchableWebProps,
  Overwrite,
  LiteralUnion,
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
  appearance?: LiteralUnion<'default' | 'grouped'>;
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
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the item.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the *title*.
 * Expected to return an Image.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the *title*.
 * Expected to return an Image.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example SelectItemSimpleUsage
 */
@styled('SelectOption')
export class SelectItem extends React.Component<SelectItemProps> {

  private get isMultiSelect(): boolean {
    if (this.props.descriptor) {
      return this.props.descriptor.multiSelect;
    }
    return false;
  }

  private onMouseEnter = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.HOVER]);
    this.props.onMouseEnter && this.props.onMouseEnter(event);
  };

  private onMouseLeave = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);
    this.props.onMouseLeave && this.props.onMouseLeave(event);
  };

  private onFocus = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.FOCUSED]);
    this.props.onFocus && this.props.onFocus(event);
  };

  private onBlur = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);
    this.props.onBlur && this.props.onBlur(event);
  };

  private onPress = (event: GestureResponderEvent): void => {
    this.props.onPress && this.props.onPress(this.props.descriptor, event);
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);
    this.props.onPressIn && this.props.onPressIn(event);
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);
    this.props.onPressOut && this.props.onPressOut(event);
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
