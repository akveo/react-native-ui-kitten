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
    const { appearance, size } = this.props;

    const additionalStyle: ViewStyle = this.isLastElement(index) ? styles.lastButton : style;

    return React.cloneElement(element, {
      key: index,
      style: [element.props.style, additionalStyle],
      appearance: appearance,
      size: size,
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
