/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { ButtonElement } from '../button/button.component';

type ChildrenProp = ButtonElement | ButtonElement[];

export interface ButtonGroupProps extends StyledComponentProps, ViewProps {
  size?: string;
  status?: string;
  children: ChildrenProp;
}

export type ButtonGroupElement = React.ReactElement<ButtonGroupProps>;

/**
 * Renders a group of `Buttons`.
 *
 * @extends React.Component
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `filled` or `outline`.
 * Default is `filled`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `primary`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Default is `medium`.
 *
 * @property {{ReactElement<ButtonProps> | ReactElement<ButtonProps>[]} children - Determines buttons in group.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example ButtonGroupSimpleUsage
 *
 * @overview-example ButtonGroupAppearance
 *
 * @overview-example ButtonGroupStatus
 *
 * @overview-example ButtonGroupSize
 *
 * @overview-example ButtonGroupOutline
 *
 * @overview-example ButtonGroupWithIcons
 *
 * @example ButtonGroupInlineStyling
 */
class ButtonGroupComponent extends React.Component<ButtonGroupProps> {

  static styledComponentName: string = 'ButtonGroup';

  private getComponentStyle = (source: StyleType): StyleType => {
    const { dividerBackgroundColor, dividerWidth, ...containerParameters } = source;

    return {
      container: {
        ...containerParameters,
        borderWidth: containerParameters.borderWidth + 0.25,
      },
      button: {
        borderWidth: dividerWidth,
        borderColor: dividerBackgroundColor,
      },
    };
  };

  private isFirstElement = (index: number): boolean => {
    return index === 0;
  };

  private isLastElement = (index: number): boolean => {
    return index === React.Children.count(this.props.children) - 1;
  };

  private renderButtonElement = (element: ButtonElement, index: number, style: StyleType): ButtonElement => {
    const { appearance, size, status } = this.props;
    const { borderRadius }: ViewStyle = style.container;
    const { borderWidth, borderColor }: ViewStyle = style.button;

    const shapeStyle: ViewStyle = !this.isLastElement(index) && {
      borderEndWidth: borderWidth,
      borderEndColor: borderColor,
    };

    const startShapeStyle: ViewStyle = this.isFirstElement(index) && {
      borderTopStartRadius: borderRadius,
      borderBottomStartRadius: borderRadius,
    };

    const endShapeStyle: ViewStyle = this.isLastElement(index) && {
      borderTopEndRadius: borderRadius,
      borderBottomEndRadius: borderRadius,
    };

    return React.cloneElement(element, {
      key: index,
      appearance: appearance,
      size: size,
      status: status,
      style: [element.props.style, styles.button, shapeStyle, startShapeStyle, endShapeStyle],
    });
  };

  private renderButtonElements = (source: ChildrenProp, style: StyleType): ButtonElement[] => {
    return React.Children.map(source, (element: ButtonElement, index: number): ButtonElement => {
      return this.renderButtonElement(element, index, style);
    });
  };

  public render(): React.ReactElement<ViewProps> {
    const { themedStyle, style, children, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    const buttonElements: ButtonElement[] = this.renderButtonElements(children, componentStyle);

    return (
      <View
        {...derivedProps}
        style={[componentStyle.container, styles.container, style]}>
        {buttonElements}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  button: {
    borderRadius: 0,
    borderWidth: 0,
  },
});

export const ButtonGroup = styled<ButtonGroupProps>(ButtonGroupComponent);
