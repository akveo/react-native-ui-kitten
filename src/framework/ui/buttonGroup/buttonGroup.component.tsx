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
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { Props as ButtonProps } from '../button/button.component';

type ButtonElement = React.ReactElement<ButtonProps>;

interface ButtonGroupProps {
  children: ButtonElement | ButtonElement[];
  size?: string;
  status?: string;
}

export type Props = ButtonGroupProps & StyledComponentProps & ViewProps;

/**
 * The `ButtonGroup` component is a component for placing buttons in row.
 *
 * @extends React.Component
 *
 * @property {string} status - Determines the status of the component.
 * Can be 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'white'.
 * By default status is 'primary'.
 *
 * @property {string} size - Determines the size of the component.
 * Can be 'tiny' | 'small' | 'medium' | 'large' | 'giant'.
 * By default size is 'medium'.
 *
 * @property {React.ReactElement<ButtonProps>[]} children - Determines buttons in group. Can be passed through jsx.
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be 'filled' | 'outline'.
 * By default appearance is 'filled'.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @example ButtonGroup API example
 *
 * ```
 * import { Button, ButtonGroup } from '@kitten/ui';
 *
 * public render(): React.ReactNode {
 *   return (
 *     <ButtonGroup
 *       style={styles.buttonGroup}
 *       appearance='filled'
 *       status='danger'
 *       size='large'>
 *       <Button icon={(style: StyleType) => <Image source={{ uri: '...' }}/>}>L</Button>
 *       <Button icon={(style: StyleType) => <Image source={{ uri: '...' }}/>}>M</Button>
 *       <Button icon={(style: StyleType) => <Image source={{ uri: '...' }}/>}>R</Button>
 *     </ButtonGroup>
 *   );
 * }
 * ```
 * */

export class ButtonGroup extends React.Component<Props> {

  static styledComponentName: string = 'ButtonGroup';

  private getComponentStyle = (style: StyleType): StyleType => {
    const {
      buttonBorderRightColor,
      buttonBorderRightWidth,
      ...containerParameters
    } = style;

    return {
      container: {
        ...containerParameters,
        ...styles.container,
      },
      button: {
        borderRightColor: buttonBorderRightColor,
        borderRightWidth: buttonBorderRightWidth,
        ...styles.button,
      },
    };
  };

  private isLastElement = (index: number): boolean => {
    const { children } = this.props;

    return index === React.Children.count(children) - 1;
  };

  private renderComponentChild = (element: ButtonElement, index: number, style: StyleType): ButtonElement => {
    const { appearance, size, status } = this.props;

    const additionalStyle: ViewStyle = this.isLastElement(index) ? styles.lastButton : style;

    return React.cloneElement(element, {
      appearance: appearance,
      size: size,
      status: status,
      key: index,
      style: [element.props.style, additionalStyle],
    });
  };

  private renderComponentChildren = (source: ButtonElement | ButtonElement[], style: StyleType): ButtonElement[] => {
    return React.Children.map(source, (element: ButtonElement, index: number): ButtonElement => {
      return this.renderComponentChild(element, index, style);
    });
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, children, ...derivedProps } = this.props;
    const { container, button } = this.getComponentStyle(themedStyle);

    const componentChildren: ButtonElement[] = this.renderComponentChildren(children, button);

    return (
      <View
        {...derivedProps}
        style={[container, style]}>
        {componentChildren}
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
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  lastButton: {
    borderWidth: 0,
    borderRadius: 0,
  },
});
