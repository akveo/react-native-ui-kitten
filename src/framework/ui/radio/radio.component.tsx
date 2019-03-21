/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
  Interaction,
} from '@kitten/theme';
import {
  Text as TextComponent,
  Props as TextProps,
} from '../text/text.component';

/**
 * The `Radio` component is an analog of html radio button.
 *
 * @extends React.Component
 *
 * @property {boolean} checked - Determines whether component is checked.
 *
 * @property {boolean} disabled - Determines whether component is disabled.
 * By default is false.
 *
 * @property {string} status - Determines the status of the component.
 * Can be 'primary' | 'success' | 'info' | 'warning' | 'danger'.
 * By default status='primary'.
 *
 * @property {string} size - Determines whether component is disabled.
 * Can be 'small' | 'medium' | 'large'.
 * By default size='medium'.
 *
 * @property {string} text - Determines text of the component.
 *
 * @property {(checked: boolean) => void} onChange - Triggered on change value.
 *
 * @example Simple usage example
 *
 * ```tsx
 * import { Radio } from '@kitten/ui';
 * <Radio checked={true}/>
 * ```
 *
 * ### Usage
 *
 * @example
 *
 * ```tsx
 * import { Radio } from '@kitten/ui';
 *
 * state: State = {
 *   checked: false,
 * };
 *
 * private onChange = (checked: boolean): void => {
 *   this.setState({ checked: value });
 * };
 *
 * public render(): React.ReactNode {
 *   return (
 *     <Radio
 *       checked={this.state.checked}
 *       size='small'
 *       status='warning'
 *       text='Place your text'
 *       onChange={this.onChange}/>
 *   )
 * }
 * ```
 * */

interface RadioProps {
  text?: string;
  checked?: boolean;
  status?: string;
  size?: string;
  onChange?: (selected: boolean) => void;
}

const Text = styled<TextComponent, TextProps>(TextComponent);

export type Props = RadioProps & StyledComponentProps & TouchableOpacityProps;

export class Radio extends React.Component<Props> {

  private onPress = () => {
    if (this.props.onChange) {
      this.props.onChange(!this.props.checked);
    }
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

  private getComponentStyle = (style: StyleType): StyleType => {
    const {
      textColor,
      textMarginLeft,
      textFontSize,
      textFontWeight,
      selectWidth,
      selectHeight,
      selectBorderRadius,
      selectBackgroundColor,
      highlightWidth,
      highlightHeight,
      highlightBorderRadius,
      highlightBackgroundColor,
      ...containerParameters
    } = style;

    return {
      selectContainer: containerParameters,
      text: {
        color: textColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        marginLeft: textMarginLeft,
      },
      select: {
        width: selectWidth,
        height: selectHeight,
        borderRadius: selectBorderRadius,
        backgroundColor: selectBackgroundColor,
      },
      highlight: {
        width: highlightWidth,
        height: highlightHeight,
        borderRadius: highlightBorderRadius,
        backgroundColor: highlightBackgroundColor,
      },
    };
  };

  private renderTextElement = (style: StyleType): React.ReactElement<TextProps> => {
    const { text } = this.props;

    return (
      <Text style={[style, styles.text]} key={0}>{text}</Text>
    );
  };

  private renderComponentChildren = (style: StyleType): React.ReactNode => {
    const { text } = this.props;

    return [
      text ? this.renderTextElement(style.text) : undefined,
    ];
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { selectContainer, select, highlight, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <View style={[style, styles.container]}>
        <View style={styles.highlightContainer}>
          <View style={[highlight, styles.highlight]}/>
          <TouchableOpacity
            {...derivedProps}
            style={[selectContainer, styles.selectContainer]}
            activeOpacity={1.0}
            onPress={this.onPress}
            onPressIn={this.onPressIn}
            onPressOut={this.onPressOut}>
            <View style={[select, styles.select]}/>
          </TouchableOpacity>
        </View>
        {componentChildren}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {},
  highlight: {
    position: 'absolute',
  },
  text: {},
});
