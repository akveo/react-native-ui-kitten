/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text,
  TextElement,
} from '../text/text.component';
import {
  Popover,
  PopoverProps,
} from '../popover/popover.component';
import {
  ModalPresentingBased,
  Omit,
} from '../support/typings';

type IconElement = React.ReactElement<ImageProps>;
type IconProp = (style: StyleType) => IconElement;
type WrappingElement = React.ReactElement<any>;

type PopoverContentProps = Omit<PopoverProps, 'content'>;

interface ComponentProps extends PopoverContentProps, ModalPresentingBased {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProp;
  children: WrappingElement;
}

export type TooltipProps = StyledComponentProps & ComponentProps;
export type TooltipElement = React.ReactElement<TooltipProps>;

/**
 * `Tooltip` displays informative text when users focus on or tap an element.
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
 * @property ModalPresentingBased
 *
 * @property StyledComponentProps
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { Tooltip, Button } from 'react-native-ui-kitten';
 *
 * export class TooltipShowcase extends React.Component {
 *
 *   state = {
 *     tooltipVisible: false,
 *   };
 *
 *   toggleTooltip = () => {
 *     const tooltipVisible = !this.state.tooltipVisible;
 *     this.setState({ tooltipVisible });
 *   };
 *
 *   render() {
 *     return (
 *       <Tooltip
 *         visible={this.state.tooltipVisible}
 *         text='Tooltip Text'
 *         onBackdropPress={this.toggleTooltip}>
 *         <Button onPress={this.toggleTooltip}>TOGGLE TOOLTIP</Button>
 *       </Tooltip>
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example With Icon
 *
 * ```
 * // IMPORTANT: To use Icon component make sure to follow this guide:
 * // https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 *
 * import React from 'react';
 * import { Tooltip, Button, Icon } from 'react-native-ui-kitten';
 *
 * const StarIcon = (style) => (
 *   <Icon {...style} name='star' />
 * );
 *
 * export class TooltipShowcase extends React.Component {
 *
 *   state = {
 *     tooltipVisible: false,
 *   };
 *
 *   toggleTooltip = () => {
 *     const tooltipVisible = !this.state.tooltipVisible;
 *     this.setState({ tooltipVisible });
 *   };
 *
 *   render() {
 *     return (
 *       <Tooltip
 *         visible={this.state.tooltipVisible}
 *         text='Tooltip Text'
 *         icon={StarIcon}
 *         onBackdropPress={this.toggleTooltip}>
 *         <Button onPress={this.toggleTooltip}> TOGGLE TOOLTIP</Button>
 *       </Tooltip>
 *     );
 *   }
 * }
 * ```
 *
 * @example Using Asset Icons
 *
 * ```
 * import React from 'react';
 * import { Image } from 'react-native';
 * import { Tooltip, Button } from 'react-native-ui-kitten';
 *
 * const StarIcon = (style) => (
 *   <Image style={style} source={require('path-to-assets/local-image.png')} />
 * );
 *
 * export class TooltipShowcase extends React.Component {
 *
 *   state = {
 *     tooltipVisible: false,
 *   };
 *
 *   toggleTooltip = () => {
 *     const tooltipVisible = !this.state.tooltipVisible;
 *     this.setState({ tooltipVisible });
 *   };
 *
 *   render() {
 *     return (
 *       <Tooltip
 *         visible={this.state.tooltipVisible}
 *         text='Tooltip Text'
 *         icon={StarIcon}
 *         onBackdropPress={this.toggleTooltip}>
 *         <Button onPress={this.toggleTooltip}>TOGGLE TOOLTIP</Button>
 *       </Tooltip>
 *     );
 *   }
 * }
 * ```
 *
 * @example Inline Styling
 *
 * ```
 * import React from 'react';
 * import { StyleSheet } from 'react-native';
 * import { Tooltip, Button } from 'react-native-ui-kitten';
 *
 * export class TooltipShowcase extends React.Component {
 *
 *   state = {
 *     tooltipVisible: false,
 *   };
 *
 *   toggleTooltip = () => {
 *     const tooltipVisible = !this.state.tooltipVisible;
 *     this.setState({ tooltipVisible });
 *   };
 *
 *   render() {
 *     return (
 *       <Tooltip
 *         visible={this.state.tooltipVisible}
 *         text='Tooltip Text'
 *         textStyle={styles.tooltipText}
 *         onBackdropPress={this.toggleTooltip}>
 *         <Button onPress={this.toggleTooltip}>TOGGLE TOOLTIP</Button>
 *       </Tooltip>
 *     );
 *   }
 * }
 *
 * const styles = StyleSheet.create({
 *   tooltipText: { color: 'white', fontSize: 18 },
 * });
 * ```
 */
export class TooltipComponent extends React.Component<TooltipProps> {

  static styledComponentName: string = 'Tooltip';

  static defaultProps: Partial<TooltipProps> = {
    indicatorOffset: 8,
  };

  private getComponentStyle = (source: StyleType): StyleType => {
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
      container: containerParameters,
      content: {},
      indicator: {
        backgroundColor: indicatorBackgroundColor,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        color: textColor,
      },
    };
  };

  private renderTextElement = (style: TextStyle): TextElement => {
    const { text, textStyle } = this.props;

    return (
      <Text
        key={1}
        style={[style, styles.text, textStyle]}>
        {text}
      </Text>
    );
  };

  private renderIconElement = (style: ImageStyle): IconElement => {
    const iconElement: IconElement = this.props.icon(style);

    return React.cloneElement(iconElement, {
      key: 0,
      style: [style, styles.icon, iconElement.props.style],
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
      <View style={[content, styles.content]}>
        {contentChildren}
      </View>
    );
  };

  public render(): React.ReactElement<PopoverProps> {
    const { themedStyle, style, indicatorStyle, children, ...derivedProps } = this.props;
    const { container, indicator, ...componentStyle } = this.getComponentStyle(themedStyle);

    const contentElement: TextElement = this.renderPopoverContentElement(componentStyle);

    return (
      <Popover
        {...derivedProps}
        style={[container, styles.container, style]}
        indicatorStyle={[indicator, indicatorStyle]}
        content={contentElement}>
        {children}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  content: {
    flexDirection: 'row',
  },
  indicator: {},
  icon: {},
  text: {
    alignSelf: 'center',
  },
});

export const Tooltip = styled<TooltipProps>(TooltipComponent);
