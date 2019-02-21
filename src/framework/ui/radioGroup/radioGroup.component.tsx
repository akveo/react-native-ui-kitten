import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { Props as RadioProps } from '../radio/radio.component';

type RadioElement = React.ReactElement<RadioProps>;

interface RadioGroupProps {
  children: RadioElement | RadioElement[];
  selectedIndex?: number;
  onChange?: (index: number) => void;
}

export type Props = RadioGroupProps & StyledComponentProps & ViewProps;

export class RadioGroup extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    selectedIndex: -1,
  };

  private onChildSelected = (index: number) => {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  };

  private getComponentStyle = (style: StyleType): StyleType => {
    return {
      container: {
        padding: style.padding,
      },
    };
  };

  private createComponentChild = (element: RadioElement, index: number): RadioElement => {
    return React.cloneElement(element, {
      ...element.props,
      key: index,
      checked: this.props.selectedIndex === index,
      onChange: () => this.onChildSelected(index),
    });
  };

  private createComponentChildren = (source: RadioElement | RadioElement[]): RadioElement[] => {
    return React.Children.map(source, this.createComponentChild);
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, children, ...derivedProps } = this.props;
    const { container }: StyleType = this.getComponentStyle(themedStyle);

    const componentChildren: RadioElement[] = this.createComponentChildren(children);

    return (
      <View
        {...derivedProps}
        style={[style, container]}>
        {componentChildren}
      </View>
    );
  }
}
