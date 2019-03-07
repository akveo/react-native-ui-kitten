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
import {
  ButtonStyleProvider,
  ButtonStyleProviders,
} from './type';

type ButtonElement = React.ReactElement<ButtonProps>;

interface ButtonGroupProps {
  children: ButtonElement | ButtonElement[];
  size?: string;
}

export type Props = ButtonGroupProps & StyledComponentProps & ViewProps;

export class ButtonGroup extends React.Component<Props> {

  private styleProvider: ButtonStyleProvider = ButtonStyleProviders.DEFAULT;

  private getComponentStyle = (style: StyleType): StyleType => {
    const { button, ...container } = style;

    return {
      container: container,
      button: button,
    };
  };

  private getChildComponentStyle = (index: number, source: StyleType): StyleType => {
    const { children } = this.props;

    switch (index) {
      case 0:
        return this.styleProvider.start(source);
      case React.Children.count(children) - 1:
        return this.styleProvider.end(source);
      default:
        return this.styleProvider.center(source);
    }
  };

  private renderComponentChild = (element: ButtonElement, index: number, style: StyleType): ButtonElement => {
    const { appearance, size, children } = this.props;
    const { style: elementStyle, ...derivedProps } = element.props;

    const isSingle: boolean = React.Children.count(children) === 1;
    const positionedStyle: StyleType = isSingle ? style : this.getChildComponentStyle(index, style);

    return React.cloneElement(element, {
      ...derivedProps,
      style: [elementStyle, positionedStyle],
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
  },
});
