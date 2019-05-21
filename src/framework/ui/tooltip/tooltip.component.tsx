/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ImageProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import {
  ModalComponentCloseProps,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text,
  TextProps,
} from '../text/text.component';
import {
  Popover,
  PopoverProps,
} from '../popover/popover.component';
import { Omit } from '../support/typings';

type TextElement = React.ReactElement<TextProps>;
type IconElement = React.ReactElement<ImageProps>;
type IconProp = (style: StyleType) => IconElement;
type WrappingElement = React.ReactElement<any>;

type PopoverContentProps = Omit<PopoverProps, 'content'>;

interface ComponentProps extends PopoverContentProps, ModalComponentCloseProps {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProp;
  children: WrappingElement;
}

export type TooltipProps = StyledComponentProps & ComponentProps;

/**
 * The `Tooltip` component is a component that displays informative text when users focus on or tap an element.
 *
 * @extends React.Component
 *
 * @property {string} text - Determines the text of the tooltip
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} icon - Determines icon of the component.
 *
 * @property {React.ReactElement<any>} children - Determines the element "above" which popover will be shown.
 *
 * @property {boolean} visible - Determines whether popover is visible or not.
 *
 * @property {string | PopoverPlacement} placement - Determines the placement of the tooltip.
 * Can be 'left' | 'top' | 'right' | 'bottom' | 'left start' | 'left end' | 'top start' | 'top end' | 'right start' |
 * 'right end' | 'bottom start' | 'bottom end'.
 * By default placement is 'top'.
 *
 * @property {number} indicatorOffset - Determines the offset of indicator (arrow).
 *
 * @property ViewProps
 *
 * @property ModalComponentCloseProps
 *
 * @property StyledComponentProps
 *
 * @example Tooltip usage and API example
 *
 * ```
 * import {
 *   Tooltip,
 *   Button,
 *   Text,
 * } from '@kitten/ui';
 *
 * public state: State = {
 *   tooltipVisible: false,
 * };
 *
 * private onShowPress = () => {
 *   this.setState({ tooltipVisible: !this.state.tooltipVisible });
 * };
 *
 * public render(): React.ReactNode {
 *   return (
 *     <Tooltip
 *       style={styles.tooltipContainer}
 *       placement='left end'
 *       visible={this.state.tooltipVisible}
 *       text='Tooltip Text'
 *       textStyle={styles.tooltipText}
 *       icon={(style: StyleType) => <Image style={style} source={{ uri: '...' }}/>}
 *       onRequestClose={this.onShowPress}>
 *       <TouchableOpacity
 *         style={styles.tooltipChild}
 *         onPress={this.onShowPress}>
 *         <Text style={text}>Top Start</Text>
 *       </TouchableOpacity>
 *     </Tooltip>
 *   );
 * }
 * ```
 * */

export class TooltipComponent extends React.Component<TooltipProps> {

  static styledComponentName: string = 'Tooltip';

  static defaultProps: Partial<TooltipProps> = {
    indicatorOffset: 8,
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { style, textStyle } = this.props;

    const {
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      textMarginHorizontal,
      textFontSize,
      textLineHeight,
      textColor,
      ...containerParameters
    } = source;

    return {
      popover: {
        ...containerParameters,
        ...styles.popover,
        ...StyleSheet.flatten(style),
      },
      content: styles.content,
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
        ...styles.icon,
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        color: textColor,
        ...styles.text,
        ...StyleSheet.flatten(textStyle),
      },
    };
  };

  private renderTextElement = (style: StyleType): TextElement => {
    return (
      <Text
        key={1}
        style={style}>
        {this.props.text}
      </Text>
    );
  };

  private renderIconElement = (style: StyleType): IconElement => {
    const iconElement: IconElement = this.props.icon(style);

    return React.cloneElement(iconElement, {
      key: 0,
      style: [style, iconElement.props.style],
    });
  };

  private renderContentElementChildren = (style: StyleType): React.ReactNodeArray => {
    const { icon } = this.props;

    return [
      icon && this.renderIconElement(style.icon),
      this.renderTextElement(style.text),
    ];
  };

  private renderPopoverContentElement = (style: StyleType): React.ReactElement<ViewProps> => {
    const { content, ...childrenStyle } = style;

    const contentChildren: React.ReactNode = this.renderContentElementChildren(childrenStyle);

    return (
      <View style={content}>
        {contentChildren}
      </View>
    );
  };

  public render(): React.ReactElement<PopoverProps> {
    const { style, children, themedStyle, ...derivedProps } = this.props;
    const { popover, ...componentStyle } = this.getComponentStyle(themedStyle);

    const contentElement: React.ReactElement<TextProps> = this.renderPopoverContentElement(componentStyle);

    return (
      <Popover
        {...derivedProps}
        style={popover}
        content={contentElement}>
        {children}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  popover: {},
  content: {
    flexDirection: 'row',
  },
  icon: {},
  text: {
    alignSelf: 'center',
  },
});

export const Tooltip = styled<TooltipProps>(TooltipComponent);
