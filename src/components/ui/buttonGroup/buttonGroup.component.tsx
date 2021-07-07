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
  ChildrenWithProps,
  EvaSize,
  EvaStatus,
  Overwrite,
  LiteralUnion,
} from '../../devsupport';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import {
  ButtonElement,
  ButtonProps,
} from '../button/button.component';

type ButtonGroupStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'filled' | 'outline' | 'ghost'>;
}>;

export interface ButtonGroupProps extends ViewProps, ButtonGroupStyledProps {
  children: ChildrenWithProps<ButtonProps>;
  status?: EvaStatus;
  size?: EvaSize;
}

export type ButtonGroupElement = React.ReactElement<ButtonGroupProps>;

/**
 * A group of buttons with additional styles provided by Eva.
 * ButtonGroup should contain Button components to provide a usable component.
 *
 * @extends React.Component
 *
 * @property {ReactElement<ButtonProps> | ReactElement<ButtonProps>[]} children -
 * Buttons to be rendered within the group.
 *
 * @property {string} appearance - Appearance of the component.
 * Can be `filled`, `outline` or `ghost`.
 * Defaults to *filled*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *medium*.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example ButtonGroupSimpleUsage
 * Button Group accepts buttons as child elements.
 *
 * @overview-example ButtonGroupAppearance
 * Appearance passed to group is also applied for grouped buttons.
 *
 * @overview-example ButtonGroupStatus
 * Same for status.
 *
 * @overview-example ButtonGroupSize
 * And size.
 *
 * @overview-example ButtonGroupOutline
 *
 * @overview-example ButtonGroupWithIcons
 */

@styled('ButtonGroup')
export class ButtonGroup extends React.Component<ButtonGroupProps> {

  private getComponentStyle = (source: StyleType) => {
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

  private renderButtonElements = (source: ChildrenWithProps<ButtonProps>, style: StyleType): ButtonElement[] => {
    return React.Children.map(source, (element: ButtonElement, index: number): ButtonElement => {
      return this.renderButtonElement(element, index, style);
    });
  };

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, children, ...viewProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <View
        {...viewProps}
        style={[evaStyle.container, styles.container, style]}>
        {this.renderButtonElements(children, evaStyle)}
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
