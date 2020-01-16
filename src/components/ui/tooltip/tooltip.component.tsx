/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
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
import { IconElement } from '../icon/icon.component';
import {
  Popover,
  PopoverElement,
  PopoverProps,
} from '../popover/popover.component';
import { PopoverIndicator } from '../popover/popoverIndicator.component';

type IconProp = (style: StyleType) => IconElement;
type WrappingElement = React.ReactElement;

export interface TooltipProps extends StyledComponentProps, Omit<PopoverProps, 'content'> {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProp;
  children: WrappingElement;
}

export type TooltipElement = React.ReactElement<TooltipProps>;

/**
 * Tooltip displays informative text when users focus on or tap an element.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets Tooltip visible.
 *
 * @method {() => void} hide - Sets Tooltip invisible.
 *
 * @property {boolean} visible - Determines whether popover is visible or not.
 *
 * @property {string} text - Determines the text of the tooltip
 *
 * @property {(style: StyleType) => ReactElement} icon - Determines icon of the component.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {ReactElement} children - Determines the element "above" which popover will be shown.
 *
 * @property {string | PopoverPlacement} placement - Determines the actualPlacement of the popover.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Default is `bottom`.
 * Tip: use one of predefined placements instead of strings, e.g `PopoverPlacements.TOP`
 *
 * @property {boolean} fullWidth - Determines whether content element should have same width as child element.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Determines the style of backdrop.
 *
 * @property {() => void} onBackdropPress - Determines component's behavior when the user is
 * tapping on back-drop.
 *
 * @overview-example TooltipSimpleUsage
 *
 * @overview-example TooltipWithIcon
 *
 * @overview-example TooltipStyledBackdrop
 *
 * @overview-example TooltipPlacement
 *
 * @example TooltipWithExternalSourceIcon
 *
 * @example TooltipInlineStyling
 */
export class TooltipComponent extends React.Component<TooltipProps> {

  static styledComponentName: string = 'Tooltip';

  private popoverRef: React.RefObject<Popover> = React.createRef();

  public show = (): void => {
    this.popoverRef.current.show();
  };

  public hide = (): void => {
    this.popoverRef.current.hide();
  };

  private getComponentStyle = (source: StyleType) => {
    const {
      indicatorBackgroundColor,
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      textMarginHorizontal,
      textFontSize,
      textFontWeight,
      textLineHeight,
      textFontFamily,
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
        fontWeight: textFontWeight,
        fontFamily: textFontFamily,
        color: textColor,
      },
    };
  };

  private renderTextElement = (style: TextStyle): TextElement => {
    return (
      <Text
        key={1}
        style={[style, this.props.textStyle]}>
        {this.props.text}
      </Text>
    );
  };

  private renderIconElement = (style: ImageStyle): IconElement => {
    const iconElement: IconElement = this.props.icon(style);

    return React.cloneElement(iconElement, {
      key: 0,
      style: [style, iconElement.props.style],
    });
  };

  private renderContentElementChildren = (style: StyleType): React.ReactNodeArray => {
    return [
      this.props.icon && this.renderIconElement(style.icon),
      this.renderTextElement(style.text),
    ];
  };

  private renderPopoverIndicatorElement = (style: StyleType): React.ReactElement => {
    const { indicator } = this.getComponentStyle(this.props.themedStyle);
    return (
      <PopoverIndicator style={indicator} />
    );
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

  public render(): PopoverElement {
    const { themedStyle, style, children, ...props } = this.props;
    const { container, indicator, ...componentStyle } = this.getComponentStyle(themedStyle);

    const contentElement: TextElement = this.renderPopoverContentElement(componentStyle);

    return (
      <Popover
        {...props}
        ref={this.popoverRef}
        style={[container, style]}
        content={contentElement}
        indicator={this.renderPopoverIndicatorElement}>
        {children}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export const Tooltip = styled<TooltipProps>(TooltipComponent);
