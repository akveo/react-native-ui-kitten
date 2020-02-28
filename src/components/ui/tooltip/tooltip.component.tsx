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
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { Overwrite } from 'utility-types';
import {
  FalsyFC,
  FalsyText,
  RenderProp,
} from '../../devsupport';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import {
  Popover,
  PopoverElement,
  PopoverProps,
} from '../popover/popover.component';
import { PopoverIndicator } from '../popover/popoverIndicator.component';
import { TextProps } from '../text/text.component';

type TooltipStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | string;
}>;

type TooltipPopoverProps = Overwrite<PopoverProps, {
  children: RenderProp<TextProps> | React.ReactText;
}>;

export interface TooltipProps extends TooltipPopoverProps, TooltipStyledProps {
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
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
 * @property {ReactElement} children - A component relative to which tooltip will be shown.
 *
 * @property {ReactText | (props: TextProps) => ReactElement} children - A string or a function component
 * to render within the button.
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
 * @property {() => void} onBackdropPress - Called when backdrop is pressed.
 *
 * @property {string | PopoverPlacement} placement - Position of the tooltip relative to the `children`.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Default is `bottom`.
 * Tip: use one of predefined placements instead of strings, e.g `PopoverPlacements.TOP`
 *
 * @property {boolean} fullWidth - Determines whether the tooltip should have same width as `children`.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Determines the style of backdrop.
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

  private renderPopoverIndicatorElement = (props: ViewProps): React.ReactElement => {
    const evaStyle = this.getComponentStyle(this.props.eva.style);
    return (
      <PopoverIndicator {...props} style={[props.style, evaStyle.indicator]}/>
    );
  };

  public render(): PopoverElement {
    const { eva, style, accessoryLeft, accessoryRight, children, ...popoverProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <Popover
        {...popoverProps}
        ref={this.popoverRef}
        style={[evaStyle.container, style]}
        indicator={this.renderPopoverIndicatorElement}>
        <View style={styles.content}>
          <FalsyFC
            style={evaStyle.icon}
            component={accessoryLeft}
          />
          <FalsyText
            style={evaStyle.text}
            component={children}
          />
          <FalsyFC
            style={evaStyle.icon}
            component={accessoryRight}
          />
        </View>
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
