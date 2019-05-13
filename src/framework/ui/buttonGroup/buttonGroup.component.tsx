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
  children: ChildrenProp;
  size?: string;
  status?: string;
}

export type ButtonGroupProps = StyledComponentProps & ViewProps & ComponentProps;

class ButtonGroupComponent extends React.Component<ButtonGroupProps> {

  static styledComponentName: string = 'ButtonGroup';

  static Button = Button;

  private getComponentStyle = (source: StyleType): StyleType => {
    const { style } = this.props;

    const {
      buttonBorderRightColor,
      buttonBorderRightWidth,
      ...containerParameters
    } = source;

    return {
      container: {
        ...containerParameters,
        ...styles.container,
        ...StyleSheet.flatten(style),
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
