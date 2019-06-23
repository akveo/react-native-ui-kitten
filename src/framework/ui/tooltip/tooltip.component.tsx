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
  PlatformStyleSheet,
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
 * Displays informative text when users focus on or tap an element.
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
 * @property {string | PopoverPlacement} placement - Determines the placement of the popover.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Default is `bottom`.
 *
 * @property {number} indicatorOffset - Determines the offset of indicator (arrow).
 * @property {StyleProp<ViewStyle>} indicatorStyle - Determines style of indicator (arrow).
 *
 * @property ViewProps
 *
 * @property ModalComponentCloseProps
 *
 * @property StyledComponentProps
 *
 * @example Simple usage example
 *
 * ```
 * import React from 'react';
 * import {
 *   Tooltip,
 *   Button,
 * } from 'react-native-ui-kitten';
 *
 * export class TooltipShowcase extends React.Component {
 *
 *   public state = {
 *     tooltipVisible: false,
 *   };
 *
 *   private toggleTooltip = () => {
 *     this.setState({ tooltipVisible: !this.state.tooltipVisible });
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <Tooltip
 *         visible={this.state.tooltipVisible}
 *         text='Tooltip Text'
 *         onRequestClose={this.toggleTooltip}>
 *         <Button onPress={this.toggleTooltip}>
 *           TOGGLE TOOLTIP
 *         </Button>
 *       </Tooltip>
 *     );
 *   }
 * }
 * ```
 */

export class TooltipComponent extends React.Component<TooltipProps> {

  static styledComponentName: string = 'Tooltip';

  static defaultProps: Partial<TooltipProps> = {
    indicatorOffset: 8,
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { style, indicatorStyle, textStyle } = this.props;

    const {
      indicatorBackgroundColor,
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
      indicator: {
        backgroundColor: indicatorBackgroundColor,
        ...StyleSheet.flatten(indicatorStyle),
      },
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
    const { style, themedStyle, indicatorStyle, children, ...derivedProps } = this.props;
    const { popover, indicator, ...componentStyle } = this.getComponentStyle(themedStyle);

    const contentElement: React.ReactElement<TextProps> = this.renderPopoverContentElement(componentStyle);

    return (
      <Popover
        {...derivedProps}
        style={popover}
        indicatorStyle={indicator}
        content={contentElement}>
        {children}
      </Popover>
    );
  }
}

const styles = PlatformStyleSheet.create({
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
