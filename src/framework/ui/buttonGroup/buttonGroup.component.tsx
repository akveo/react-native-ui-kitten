import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
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
}

export type Props = ButtonGroupProps & StyledComponentProps & ViewProps;

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
      },
      button: {
        borderRightColor: buttonBorderRightColor,
        borderRightWidth: buttonBorderRightWidth,
      },
    };
  };

  private renderComponentChild = (element: ButtonElement, index: number, style: StyleType): ButtonElement => {
    const { appearance, size, children } = this.props;
    const { style: elementStyle, ...derivedProps } = element.props;

    const isLast: boolean = React.Children.count(children) - 1 === index;
    const testStyle = isLast ? styles.lastButton : { ...styles.button, ...style };

    return React.cloneElement(element, {
      ...derivedProps,
      style: [elementStyle, testStyle],
      key: index,
      appearance: appearance,
      size: size,
    });
  };

  private renderComponentChildren = (source: ButtonElement | ButtonElement[],
                                     style: StyleType): ButtonElement[] => {

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
        style={[container, style, styles.container]}>
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
