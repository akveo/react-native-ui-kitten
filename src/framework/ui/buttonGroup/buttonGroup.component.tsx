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
import { ButtonProps } from '../button/button.component';

type ButtonElement = React.ReactElement<ButtonProps>;
type ChildrenProp = ButtonElement | ButtonElement[];

interface ComponentProps {
  size?: string;
  status?: string;
  children: ChildrenProp;
}

export type ButtonGroupProps = StyledComponentProps & ViewProps & ComponentProps;

/**
 * Renders a group of buttons.
 *
 * @extends React.Component
 *
 * @property {string} status - Determines the status of the component.
 * Can be `primary`, `success`, `info`, `warning`, `danger` or `white`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `giant`, `large`, `medium`, `small`, or `tiny`.
 * Default is `medium`.
 *
 * @property {React.ReactElement<ButtonProps>[]} children - Determines buttons in group.
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `filled` or `outline`.
 * Default is `filled`.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @example ButtonGroup usage example
 *
 * ```
 * import React from 'react';
 * import { Button, ButtonGroup, ButtonGroupProps } from 'react-native-ui-kitten';
 *
 * export const ButtonGroupShowcase = (props?: ButtonGroupProps): React.ReactElement<ButtonGroupProps> => {
 *   return (
 *     <ButtonGroup>
 *       <Button>Left</Button>
 *       <Button>Mid</Button>
 *       <Button>Right</Button>
 *     </ButtonGroup>
 *   );
 * };
 * ```
 */

class ButtonGroupComponent extends React.Component<ButtonGroupProps> {

  static styledComponentName: string = 'ButtonGroup';

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      dividerBackgroundColor,
      dividerWidth,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      button: {
        borderEndColor: dividerBackgroundColor,
        borderEndWidth: dividerWidth,
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
      style: [element.props.style, styles.button, additionalStyle],
    });
  };

  private renderButtonElements = (source: ChildrenProp, style: StyleType): ButtonElement[] => {
    return React.Children.map(source, (element: ButtonElement, index: number): ButtonElement => {
      return this.renderButtonElement(element, index, style.button);
    });
  };

  public render(): React.ReactElement<ViewProps> {
    const { themedStyle, style, children, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    const buttonElements: ButtonElement[] = this.renderButtonElements(children, componentStyles);

    return (
      <View
        {...derivedProps}
        style={[container, styles.container, style]}>
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
