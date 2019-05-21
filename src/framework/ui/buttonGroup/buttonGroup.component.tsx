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
import {
  Button,
  ButtonProps,
} from '../button/button.component';

type ButtonElement = React.ReactElement<ButtonProps>;
type ChildrenProp = ButtonElement | ButtonElement[];

interface ComponentProps {
  size?: string;
  status?: string;
  children: ChildrenProp;
}

export type ButtonGroupProps = StyledComponentProps & ViewProps & ComponentProps;

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
 * Can be 'filled' | 'outline'. By default appearance is 'filled'.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @example ButtonGroup API and usage example
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
 *       <Button icon={(style: StyleType) => <Image source={{ uri: '...' }}/>}>Left</Button>
 *       <Button icon={(style: StyleType) => <Image source={{ uri: '...' }}/>}>Mid</Button>
 *       <Button icon={(style: StyleType) => <Image source={{ uri: '...' }}/>}>Right</Button>
 *     </ButtonGroup>
 *   );
 * }
 * ```
 * */

class ButtonGroupComponent extends React.Component<ButtonGroupProps> {

  static styledComponentName: string = 'ButtonGroup';

  static Button = Button;

  private getComponentStyle = (source: StyleType): StyleType => {
    const { style } = this.props;

    const {
      dividerBackgroundColor,
      dividerWidth,
      ...containerParameters
    } = source;

    return {
      container: {
        ...containerParameters,
        ...styles.container,
        ...StyleSheet.flatten(style),
      },
      button: {
        borderRightColor: dividerBackgroundColor,
        borderRightWidth: dividerWidth,
        ...styles.button,
      },
    };
  };

  private isLastElement = (index: number): boolean => {
    const { children } = this.props;

    return index === React.Children.count(children) - 1;
  };

  private renderButtonElement = (element: ButtonElement, index: number, style: StyleType): ButtonElement => {
    const { appearance, size, status } = this.props;

    const additionalStyle: ViewStyle = this.isLastElement(index) ? styles.lastButton : style;

    return React.cloneElement(element, {
      key: index,
      appearance: appearance,
      size: size,
      status: status,
      style: [element.props.style, additionalStyle],
    });
  };

  private renderButtonElements = (source: ChildrenProp, style: StyleType): ButtonElement[] => {
    return React.Children.map(source, (element: ButtonElement, index: number): ButtonElement => {
      return this.renderButtonElement(element, index, style.button);
    });
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, children, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    const buttonElements: ButtonElement[] = this.renderButtonElements(children, componentStyles);

    return (
      <View
        {...derivedProps}
        style={container}>
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
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  lastButton: {
    borderWidth: 0,
    borderRadius: 0,
  },
});

export const ButtonGroup = styled<ButtonGroupProps>(ButtonGroupComponent);
